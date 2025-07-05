import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Node, Edge, NetworkData } from '../types/network';

interface NetworkCanvasProps {
  data: NetworkData;
  onNodeClick: (node: Node) => void;
  isProcessing: boolean;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({ 
  data, 
  onNodeClick, 
  isProcessing 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const nodePositions = useRef<Map<string, { x: number, y: number }>>(new Map());
  const nodeVelocities = useRef<Map<string, { vx: number, vy: number }>>(new Map());
  const particleSystem = useRef<Array<{ x: number, y: number, vx: number, vy: number, life: number, maxLife: number, color: string }>>([]);

  const initializePositions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create clusters for different node types
    const clusters = {
      company: { x: centerX - 200, y: centerY - 100, radius: 120 },
      process: { x: centerX + 200, y: centerY - 100, radius: 100 },
      data: { x: centerX, y: centerY + 150, radius: 80 },
      output: { x: centerX, y: centerY - 200, radius: 60 }
    };

    const typeGroups = data.nodes.reduce((acc, node) => {
      if (!acc[node.type]) acc[node.type] = [];
      acc[node.type].push(node);
      return acc;
    }, {} as Record<string, Node[]>);

    Object.entries(typeGroups).forEach(([type, nodes]) => {
      const cluster = clusters[type as keyof typeof clusters];
      if (!cluster) return;

      nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * 2 * Math.PI;
        const r = cluster.radius * (0.3 + Math.random() * 0.7);
        const x = cluster.x + Math.cos(angle) * r;
        const y = cluster.y + Math.sin(angle) * r;
        
        nodePositions.current.set(node.id, { 
          x: Math.max(50, Math.min(width - 50, x)), 
          y: Math.max(50, Math.min(height - 50, y)) 
        });
        nodeVelocities.current.set(node.id, { vx: 0, vy: 0 });
      });
    });
  }, [data.nodes]);

  const getNodeColor = (node: Node): { primary: string, glow: string } => {
    const colors = {
      company: { primary: '#FF6B6B', glow: '#FF6B6B40' },
      process: { primary: '#4ECDC4', glow: '#4ECDC440' },
      data: { primary: '#FFE66D', glow: '#FFE66D40' },
      output: { primary: '#00D4FF', glow: '#00D4FF40' }
    };
    return colors[node.type] || { primary: '#A8A8A8', glow: '#A8A8A840' };
  };

  const createParticle = (x: number, y: number, targetX: number, targetY: number, color: string) => {
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 2;
    
    particleSystem.current.push({
      x,
      y,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      life: 60,
      maxLife: 60,
      color
    });
  };

  const updateParticles = () => {
    particleSystem.current = particleSystem.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      return particle.life > 0;
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particleSystem.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0A0A0F');
    gradient.addColorStop(0.5, '#1A1A2E');
    gradient.addColorStop(1, '#0A0A0F');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw connections with enhanced visuals
    data.edges.forEach(edge => {
      const sourcePos = nodePositions.current.get(edge.source);
      const targetPos = nodePositions.current.get(edge.target);
      
      if (sourcePos && targetPos) {
        const sourceNode = data.nodes.find(n => n.id === edge.source);
        const targetNode = data.nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return;

        const sourceColor = getNodeColor(sourceNode);
        const targetColor = getNodeColor(targetNode);

        // Main connection line
        const gradient = ctx.createLinearGradient(
          sourcePos.x, sourcePos.y, targetPos.x, targetPos.y
        );
        gradient.addColorStop(0, `${sourceColor.primary}${Math.floor(edge.weight * 180).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${targetColor.primary}${Math.floor(edge.weight * 180).toString(16).padStart(2, '0')}`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + edge.weight * 3;
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();

        // Animated flow particles for active connections
        if (isProcessing && edge.weight > 0.6 && Math.random() < 0.1) {
          createParticle(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, sourceColor.primary);
        }

        // Connection strength indicator
        if (edge.weight > 0.8) {
          const midX = (sourcePos.x + targetPos.x) / 2;
          const midY = (sourcePos.y + targetPos.y) / 2;
          const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.6})`;
          ctx.beginPath();
          ctx.arc(midX, midY, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    });

    // Update and draw particles
    updateParticles();
    drawParticles(ctx);

    // Draw nodes with enhanced visuals
    data.nodes.forEach(node => {
      const pos = nodePositions.current.get(node.id);
      if (!pos) return;

      const isHovered = hoveredNode === node.id;
      const colors = getNodeColor(node);
      const baseRadius = 12 + node.importance * 18;
      const radius = isHovered ? baseRadius * 1.2 : baseRadius;

      // Outer glow effect
      const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius * 3);
      glowGradient.addColorStop(0, colors.glow);
      glowGradient.addColorStop(0.4, colors.glow);
      glowGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius * 3, 0, 2 * Math.PI);
      ctx.fill();

      // Main node with gradient
      const nodeGradient = ctx.createRadialGradient(
        pos.x - radius * 0.3, pos.y - radius * 0.3, 0,
        pos.x, pos.y, radius
      );
      nodeGradient.addColorStop(0, colors.primary);
      nodeGradient.addColorStop(1, colors.primary + '80');

      ctx.fillStyle = nodeGradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Node border
      ctx.strokeStyle = isHovered ? '#FFFFFF' : colors.primary;
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Processing animation ring
      if (isProcessing && node.isActive) {
        const pulse = Math.sin(Date.now() * 0.01 + node.id.length) * 0.4 + 0.6;
        const ringRadius = radius + 8 + pulse * 5;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulse * 0.8})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ringRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Node type icon (simplified)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const typeIcons = {
        company: '🏭',
        process: '⚙️',
        data: '📊',
        output: '📈'
      };
      
      ctx.fillText(typeIcons[node.type] || '●', pos.x, pos.y);

      // Node label
      if (isHovered || radius > 20) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // Text background
        const textWidth = ctx.measureText(node.label).width;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(pos.x - textWidth/2 - 4, pos.y + radius + 8, textWidth + 8, 16);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(node.label, pos.x, pos.y + radius + 12);
      }

      // Importance indicator
      if (node.importance > 0.8) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(pos.x + radius - 3, pos.y - radius + 3, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw connection statistics
    if (isProcessing) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 60);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Active Connections: ${data.edges.filter(e => e.weight > 0.7).length}`, 20, 30);
      ctx.fillText(`Network Efficiency: ${Math.round(data.efficiency * 100)}%`, 20, 50);
    }
  }, [data, hoveredNode, isProcessing]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    let hoveredNodeId: string | null = null;
    for (const node of data.nodes) {
      const pos = nodePositions.current.get(node.id);
      if (pos) {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        const radius = 12 + node.importance * 18;
        if (distance <= radius) {
          hoveredNodeId = node.id;
          break;
        }
      }
    }

    setHoveredNode(hoveredNodeId);
    canvas.style.cursor = hoveredNodeId ? 'pointer' : 'default';
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of data.nodes) {
      const pos = nodePositions.current.get(node.id);
      if (pos) {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        const radius = 12 + node.importance * 18;
        if (distance <= radius) {
          onNodeClick(node);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        initializePositions();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [initializePositions]);

  useEffect(() => {
    const animate = () => {
      if (isProcessing) {
        // Gentle organic movement for active nodes
        data.nodes.forEach(node => {
          if (!node.isActive) return;
          
          const pos = nodePositions.current.get(node.id);
          const vel = nodeVelocities.current.get(node.id);
          if (pos && vel) {
            vel.vx += (Math.random() - 0.5) * 0.05;
            vel.vy += (Math.random() - 0.5) * 0.05;
            
            vel.vx *= 0.98;
            vel.vy *= 0.98;
            
            pos.x += vel.vx;
            pos.y += vel.vy;
            
            const canvas = canvasRef.current;
            if (canvas) {
              pos.x = Math.max(30, Math.min(canvas.width - 30, pos.x));
              pos.y = Math.max(30, Math.min(canvas.height - 30, pos.y));
            }
          }
        });
      }

      drawNetwork();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawNetwork, isProcessing, data]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
};
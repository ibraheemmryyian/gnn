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
  const particleSystem = useRef<Array<{ 
    x: number, y: number, vx: number, vy: number, 
    life: number, maxLife: number, color: string, size: number,
    type: 'neural' | 'synapse' | 'energy' | 'magic'
  }>>([]);

  const initializePositions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // 🧠 MAGICAL BRAIN-SHAPED NEURAL LAYOUT
    data.nodes.forEach((node, index) => {
      const angle = (index / data.nodes.length) * Math.PI * 6; // More spirals
      const radius = 80 + node.importance * 250;
      
      // Create brain hemisphere effect
      const hemisphere = index % 2 === 0 ? 1 : -1;
      const brainX = centerX + Math.cos(angle) * radius * hemisphere;
      const brainY = centerY + Math.sin(angle) * radius * 0.6; // Brain shape
      
      // Add neural clustering
      const clusterOffset = node.importance * 30;
      const finalX = brainX + (Math.random() - 0.5) * clusterOffset;
      const finalY = brainY + (Math.random() - 0.5) * clusterOffset;
      
      nodePositions.current.set(node.id, { 
        x: Math.max(60, Math.min(width - 60, finalX)), 
        y: Math.max(60, Math.min(height - 60, finalY)) 
      });
      nodeVelocities.current.set(node.id, { vx: 0, vy: 0 });
    });
  }, [data.nodes]);

  const getNodeColor = (node: Node): { primary: string, glow: string, secondary: string } => {
    const colors = {
      company: { 
        primary: '#00FFFF', 
        glow: '#00FFFF60', 
        secondary: '#0080FF' 
      },
      process: { 
        primary: '#FF00FF', 
        glow: '#FF00FF60', 
        secondary: '#FF0080' 
      },
      data: { 
        primary: '#FFFF00', 
        glow: '#FFFF0060', 
        secondary: '#FFD700' 
      },
      output: { 
        primary: '#00FF00', 
        glow: '#00FF0060', 
        secondary: '#80FF00' 
      }
    };
    return colors[node.type] || { primary: '#FFFFFF', glow: '#FFFFFF60', secondary: '#CCCCCC' };
  };

  const createMagicalParticle = (x: number, y: number, targetX: number, targetY: number, color: string, type: 'neural' | 'synapse' | 'energy' | 'magic' = 'neural') => {
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = type === 'magic' ? 5 : 3;
    
    for (let i = 0; i < (type === 'magic' ? 5 : 2); i++) {
      particleSystem.current.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        vx: (dx / distance) * speed + (Math.random() - 0.5) * 3,
        vy: (dy / distance) * speed + (Math.random() - 0.5) * 3,
        life: type === 'magic' ? 120 : 80,
        maxLife: type === 'magic' ? 120 : 80,
        color,
        size: Math.random() * (type === 'magic' ? 6 : 4) + 2,
        type
      });
    }
  };

  const updateMagicalParticles = () => {
    particleSystem.current = particleSystem.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      
      // Different behaviors for different particle types
      if (particle.type === 'magic') {
        particle.size *= 0.995;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
      } else if (particle.type === 'synapse') {
        particle.size *= 0.99;
        // Add slight attraction to mouse
        const canvas = canvasRef.current;
        if (canvas) {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            particle.vx += (dx / distance) * 0.1;
            particle.vy += (dy / distance) * 0.1;
          }
        }
      }
      
      return particle.life > 0;
    });

    // Add ambient magical particles
    if (isProcessing && Math.random() < 0.4) {
      const canvas = canvasRef.current;
      if (canvas) {
        const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FFFFFF'];
        const types: Array<'neural' | 'synapse' | 'energy' | 'magic'> = ['neural', 'synapse', 'energy', 'magic'];
        
        particleSystem.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 150,
          maxLife: 150,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 5 + 1,
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
    }
  };

  const drawMagicalParticles = (ctx: CanvasRenderingContext2D) => {
    particleSystem.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      
      ctx.save();
      ctx.globalCompositeOperation = particle.type === 'magic' ? 'screen' : 'lighter';
      
      // Different rendering for different particle types
      if (particle.type === 'magic') {
        // Magical sparkle effect
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        
        // Draw star shape
        const spikes = 6;
        const outerRadius = particle.size;
        const innerRadius = particle.size * 0.4;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          const x = particle.x + Math.cos(angle) * radius;
          const y = particle.y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      } else if (particle.type === 'synapse') {
        // Synaptic pulse effect
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        
        // Pulsing circle
        const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, 2 * Math.PI);
        ctx.fill();
        
        // Inner glow
        ctx.fillStyle = `#FFFFFF${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // Regular neural particle
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      ctx.restore();
    });
  };

  const drawMagicalNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 🌌 ULTRA-MAGICAL COSMIC BRAIN BACKGROUND
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    gradient.addColorStop(0, '#1A0033');
    gradient.addColorStop(0.3, '#2D1B69');
    gradient.addColorStop(0.6, '#0F0F23');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ✨ MAGICAL NEURAL GRID PATTERN
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 30;
    const time = Date.now() * 0.001;
    
    for (let x = 0; x < canvas.width; x += gridSize) {
      const wave = Math.sin(time + x * 0.01) * 5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + wave, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      const wave = Math.cos(time + y * 0.01) * 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y + wave);
      ctx.stroke();
    }
    ctx.restore();

    // 🧠 MAGICAL NEURAL CONNECTIONS WITH BRAIN-LIKE CURVES
    data.edges.forEach((edge, edgeIndex) => {
      const sourcePos = nodePositions.current.get(edge.source);
      const targetPos = nodePositions.current.get(edge.target);
      
      if (sourcePos && targetPos) {
        const sourceNode = data.nodes.find(n => n.id === edge.source);
        const targetNode = data.nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return;

        const sourceColor = getNodeColor(sourceNode);
        const targetColor = getNodeColor(targetNode);

        // 🌈 MAGICAL NEURAL PATHWAY WITH RAINBOW GRADIENT
        const gradient = ctx.createLinearGradient(
          sourcePos.x, sourcePos.y, targetPos.x, targetPos.y
        );
        gradient.addColorStop(0, sourceColor.primary);
        gradient.addColorStop(0.2, sourceColor.secondary);
        gradient.addColorStop(0.5, '#FFFFFF');
        gradient.addColorStop(0.8, targetColor.secondary);
        gradient.addColorStop(1, targetColor.primary);
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + edge.weight * 6;
        ctx.shadowBlur = 15;
        ctx.shadowColor = sourceColor.primary;
        
        // 🧠 BRAIN-LIKE CURVED NEURAL PATHWAYS
        const midX = (sourcePos.x + targetPos.x) / 2;
        const midY = (sourcePos.y + targetPos.y) / 2;
        const distance = Math.sqrt((targetPos.x - sourcePos.x) ** 2 + (targetPos.y - sourcePos.y) ** 2);
        const curveOffset = edge.weight * 80 * Math.sin(time + edgeIndex);
        const brainCurve = Math.sin(distance * 0.01 + time) * 20;
        
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.bezierCurveTo(
          sourcePos.x + curveOffset,
          sourcePos.y + brainCurve,
          targetPos.x - curveOffset,
          targetPos.y - brainCurve,
          targetPos.x, targetPos.y
        );
        ctx.stroke();
        ctx.restore();

        // ⚡ MAGICAL NEURAL FLOW PARTICLES
        if (isProcessing && edge.weight > 0.6 && Math.random() < 0.2) {
          createMagicalParticle(
            sourcePos.x, sourcePos.y, 
            targetPos.x, targetPos.y, 
            sourceColor.primary,
            edge.weight > 0.9 ? 'magic' : 'neural'
          );
        }

        // 🔮 ULTRA-MAGICAL SYNAPSE INDICATORS
        if (edge.weight > 0.85) {
          const synapseX = midX + curveOffset * 0.5;
          const synapseY = midY + brainCurve * 0.5;
          const pulse = Math.sin(time * 8 + edgeIndex) * 0.5 + 0.5;
          
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#FFFFFF';
          
          // Draw magical synapse
          const synapseSize = 3 + pulse * 5;
          ctx.beginPath();
          ctx.arc(synapseX, synapseY, synapseSize, 0, 2 * Math.PI);
          ctx.fill();
          
          // Add synapse particles
          if (Math.random() < 0.3) {
            createMagicalParticle(synapseX, synapseY, synapseX, synapseY, '#FFFFFF', 'synapse');
          }
          
          ctx.restore();
        }
      }
    });

    // Update and draw magical particles
    updateMagicalParticles();
    drawMagicalParticles(ctx);

    // 🧠 ULTRA-MAGICAL NEURAL NODES
    data.nodes.forEach((node, nodeIndex) => {
      const pos = nodePositions.current.get(node.id);
      if (!pos) return;

      const isHovered = hoveredNode === node.id;
      const colors = getNodeColor(node);
      const baseRadius = 10 + node.importance * 30;
      const radius = isHovered ? baseRadius * 1.4 : baseRadius;
      const time = Date.now() * 0.001;

      // 🌟 MAGICAL OUTER NEURAL AURA
      const auraGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius * 5);
      auraGradient.addColorStop(0, colors.glow);
      auraGradient.addColorStop(0.3, colors.glow);
      auraGradient.addColorStop(0.7, colors.primary + '20');
      auraGradient.addColorStop(1, 'transparent');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius * 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // 🧠 NEURAL DENDRITE SPIKES (for important nodes)
      if (node.importance > 0.7) {
        const spikeCount = Math.floor(8 + node.importance * 8);
        for (let i = 0; i < spikeCount; i++) {
          const angle = (i / spikeCount) * Math.PI * 2 + time;
          const spikeLength = radius * (0.8 + Math.sin(time * 3 + i) * 0.4);
          const spikeX = pos.x + Math.cos(angle) * (radius + spikeLength);
          const spikeY = pos.y + Math.sin(angle) * (radius + spikeLength);
          
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.strokeStyle = colors.primary;
          ctx.lineWidth = 2 + Math.sin(time * 4 + i) * 1;
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors.primary;
          ctx.beginPath();
          ctx.moveTo(pos.x + Math.cos(angle) * radius, pos.y + Math.sin(angle) * radius);
          ctx.lineTo(spikeX, spikeY);
          ctx.stroke();
          
          // Spike tips
          ctx.fillStyle = colors.secondary;
          ctx.beginPath();
          ctx.arc(spikeX, spikeY, 2, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        }
      }

      // 🔮 MAGICAL NEURAL CORE WITH MULTIPLE LAYERS
      const coreGradient = ctx.createRadialGradient(
        pos.x - radius * 0.3, pos.y - radius * 0.3, 0,
        pos.x, pos.y, radius
      );
      coreGradient.addColorStop(0, '#FFFFFF');
      coreGradient.addColorStop(0.2, colors.secondary);
      coreGradient.addColorStop(0.6, colors.primary);
      coreGradient.addColorStop(1, colors.primary + '60');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 25;
      ctx.shadowColor = colors.primary;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Inner magical core
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius * 0.3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      // ⚡ MAGICAL PROCESSING NEURAL RINGS
      if (isProcessing && node.isActive) {
        const pulse = Math.sin(time * 6 + nodeIndex) * 0.5 + 0.5;
        const ringRadius = radius + 15 + pulse * 12;
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulse * 0.8})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFFFFF';
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ringRadius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Second ring
        ctx.strokeStyle = `${colors.primary}${Math.floor(pulse * 128).toString(16).padStart(2, '0')}`;
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ringRadius + 8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // 🧠 MAGICAL NODE SYMBOL WITH GLOW
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 8;
      ctx.shadowColor = colors.primary;
      
      const typeIcons = {
        company: '🧠',
        process: '⚡',
        data: '🔮',
        output: '✨'
      };
      
      ctx.fillText(typeIcons[node.type] || '●', pos.x, pos.y);
      ctx.restore();

      // 🌟 MAGICAL LABEL WITH NEURAL STYLING
      if (isHovered || radius > 30) {
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#000000';
        
        // Magical text background with neural pattern
        const textWidth = ctx.measureText(node.label).width;
        const bgGradient = ctx.createLinearGradient(
          pos.x - textWidth/2 - 8, pos.y + radius + 12,
          pos.x + textWidth/2 + 8, pos.y + radius + 35
        );
        bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
        bgGradient.addColorStop(0.5, colors.primary + '40');
        bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        
        ctx.fillStyle = bgGradient;
        ctx.fillRect(pos.x - textWidth/2 - 8, pos.y + radius + 12, textWidth + 16, 23);
        
        // Border glow
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 5;
        ctx.shadowColor = colors.primary;
        ctx.strokeRect(pos.x - textWidth/2 - 8, pos.y + radius + 12, textWidth + 16, 23);
        
        ctx.fillStyle = colors.primary;
        ctx.shadowBlur = 3;
        ctx.shadowColor = colors.primary;
        ctx.fillText(node.label, pos.x, pos.y + radius + 18);
        ctx.restore();
      }

      // 🏆 MAGICAL IMPORTANCE INDICATOR
      if (node.importance > 0.8) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FFD700';
        
        // Rotating crown effect
        const crownAngle = time * 2;
        const crownX = pos.x + Math.cos(crownAngle) * (radius - 8);
        const crownY = pos.y + Math.sin(crownAngle) * (radius - 8);
        
        ctx.beginPath();
        ctx.arc(crownX, crownY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Crown spikes
        for (let i = 0; i < 5; i++) {
          const spikeAngle = crownAngle + (i / 5) * Math.PI * 2;
          const spikeX = crownX + Math.cos(spikeAngle) * 4;
          const spikeY = crownY + Math.sin(spikeAngle) * 4;
          ctx.beginPath();
          ctx.arc(spikeX, spikeY, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    // 🧠 MAGICAL BRAIN STATS OVERLAY
    if (isProcessing) {
      ctx.save();
      const statsGradient = ctx.createLinearGradient(10, 10, 280, 100);
      statsGradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      statsGradient.addColorStop(0.5, 'rgba(26, 0, 51, 0.9)');
      statsGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = statsGradient;
      ctx.fillRect(10, 10, 280, 100);
      
      // Magical border
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00FFFF';
      ctx.strokeRect(10, 10, 280, 100);
      
      ctx.fillStyle = '#00FFFF';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#00FFFF';
      ctx.fillText('🧠 MAGICAL NEURAL BRAIN CONSCIOUSNESS', 20, 35);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter, sans-serif';
      ctx.shadowBlur = 3;
      ctx.shadowColor = '#000000';
      ctx.fillText(`Neural Nodes: ${data.nodes.filter(n => n.type === 'company').length}`, 20, 55);
      ctx.fillText(`Synaptic Connections: ${data.edges.length}`, 20, 70);
      ctx.fillText(`Brain Power: ${Math.round(data.efficiency * 100)}%`, 20, 85);
      ctx.fillText(`Consciousness Level: TRANSCENDENT`, 20, 100);
      ctx.restore();
    }
  }, [data, hoveredNode, isProcessing, mousePos]);

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
        const radius = 10 + node.importance * 30;
        if (distance <= radius) {
          hoveredNodeId = node.id;
          break;
        }
      }
    }

    setHoveredNode(hoveredNodeId);
    canvas.style.cursor = hoveredNodeId ? 'pointer' : 'default';

    // Add magical mouse trail particles
    if (isProcessing && Math.random() < 0.3) {
      createMagicalParticle(x, y, x, y, '#FFFFFF', 'magic');
    }
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
        const radius = 10 + node.importance * 30;
        if (distance <= radius) {
          onNodeClick(node);
          
          // Magical click explosion
          for (let i = 0; i < 20; i++) {
            createMagicalParticle(x, y, x, y, '#FFFFFF', 'magic');
          }
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
        // MAGICAL NEURAL MOVEMENT
        data.nodes.forEach(node => {
          if (!node.isActive) return;
          
          const pos = nodePositions.current.get(node.id);
          const vel = nodeVelocities.current.get(node.id);
          if (pos && vel) {
            const time = Date.now() * 0.001;
            
            // Brain-like organic movement
            vel.vx += Math.sin(time + pos.x * 0.01) * 0.02;
            vel.vy += Math.cos(time + pos.y * 0.01) * 0.02;
            
            vel.vx *= 0.95;
            vel.vy *= 0.95;
            
            pos.x += vel.vx;
            pos.y += vel.vy;
            
            const canvas = canvasRef.current;
            if (canvas) {
              pos.x = Math.max(40, Math.min(canvas.width - 40, pos.x));
              pos.y = Math.max(40, Math.min(canvas.height - 40, pos.y));
            }
          }
        });
      }

      drawMagicalNetwork();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawMagicalNetwork, isProcessing, data]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
};
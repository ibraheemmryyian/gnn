import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Html, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Node, Edge, NetworkData } from '../types/network';

interface Network3DProps {
  data: NetworkData;
  onNodeClick: (node: Node) => void;
  isProcessing: boolean;
}

interface Node3DProps {
  node: Node;
  position: THREE.Vector3;
  onClick: (node: Node) => void;
  isProcessing: boolean;
  connections: Edge[];
}

interface Connection3DProps {
  edge: Edge;
  sourcePosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  isProcessing: boolean;
}

const Node3D: React.FC<Node3DProps> = ({ node, position, onClick, isProcessing, connections }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const nodeColor = useMemo(() => {
    const colors = {
      company: '#FF6B6B',
      process: '#4ECDC4', 
      data: '#FFE66D',
      output: '#00D4FF'
    };
    return colors[node.type] || '#A8A8A8';
  }, [node.type]);

  const nodeSize = useMemo(() => {
    return 0.4 + node.importance * 0.8;
  }, [node.importance]);

  useFrame((state) => {
    if (groupRef.current) {
      // Keep the group at the EXACT position
      groupRef.current.position.copy(position);
      
      // Only animate the mesh within the group for subtle floating effect
      if (meshRef.current) {
        // Very small floating animation so connections stay aligned
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position.x) * 0.01;
        
        // Rotation based on activity
        if (node.isActive && isProcessing) {
          meshRef.current.rotation.y += 0.005;
          meshRef.current.rotation.x += 0.002;
        }

        // Very subtle pulsing effect for important nodes
        if (node.importance > 0.8) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
          meshRef.current.scale.setScalar(scale);
        }
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    onClick(node);
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={clicked ? 1.3 : hovered ? 1.15 : 1}
      >
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={hovered ? 0.4 : node.isActive ? 0.25 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer glow ring for active nodes */}
      {node.isActive && isProcessing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[nodeSize * 1.6, nodeSize * 2.0, 32]} />
          <meshBasicMaterial
            color={nodeColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Connection indicators */}
      {connections.length > 8 && (
        <mesh position={[0, nodeSize + 0.3, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      )}

      {/* Node label */}
      {(hovered || nodeSize > 0.7) && (
        <Html distanceFactor={12} position={[0, nodeSize + 0.8, 0]}>
          <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none border border-gray-600">
            <div className="font-semibold">{node.label}</div>
            <div className="text-xs text-gray-300">{node.metadata?.location}</div>
          </div>
        </Html>
      )}

      {/* Type indicator */}
      <Text
        position={[0, 0, nodeSize + 0.15]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.type === 'company' ? '🏭' : 
         node.type === 'process' ? '⚙️' : 
         node.type === 'data' ? '📊' : '📈'}
      </Text>
    </group>
  );
};

const Connection3D: React.FC<Connection3DProps> = ({ edge, sourcePosition, targetPosition, isProcessing }) => {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const points = useMemo(() => {
    // Use exact positions without any modification
    const start = sourcePosition.clone();
    const end = targetPosition.clone();
    
    // Create a very gentle curve for the connection
    const distance = start.distanceTo(end);
    const midPoint = start.clone().lerp(end, 0.5);
    
    // Much smaller curve so lines stay close to nodes
    const curveHeight = distance * 0.02 * edge.weight;
    const perpendicular = new THREE.Vector3()
      .crossVectors(start, end)
      .normalize()
      .multiplyScalar(curveHeight);
    
    midPoint.add(perpendicular);

    const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    return curve.getPoints(30);
  }, [sourcePosition, targetPosition, edge.weight]);

  useFrame((state) => {
    if (materialRef.current && isProcessing) {
      // Animated flow effect
      const time = state.clock.elapsedTime;
      const baseOpacity = 0.4 + edge.weight * 0.4;
      materialRef.current.opacity = baseOpacity + Math.sin(time * 2 + edge.weight * 8) * 0.15;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={edge.weight > 0.7 ? '#00FF88' : edge.weight > 0.4 ? '#FFAA00' : '#FF6B6B'}
        transparent
        opacity={0.4 + edge.weight * 0.4}
        linewidth={Math.max(1, edge.weight * 4)}
      />
    </line>
  );
};

const ParticleSystem: React.FC<{ isProcessing: boolean }> = ({ isProcessing }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a larger sphere around the network
      const radius = 35 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      colors[i * 3] = 0.4 + Math.random() * 0.6;
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.6;
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current && isProcessing) {
      particlesRef.current.rotation.y += 0.0008;
      particlesRef.current.rotation.x += 0.0004;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(25, 15, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

// Force-directed layout algorithm
const calculateForceDirectedLayout = (nodes: Node[], edges: Edge[]): Map<string, THREE.Vector3> => {
  const positions = new Map<string, THREE.Vector3>();
  const velocities = new Map<string, THREE.Vector3>();
  
  // Initialize random positions
  nodes.forEach(node => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 15;
    const height = (Math.random() - 0.5) * 10;
    
    positions.set(node.id, new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    ));
    velocities.set(node.id, new THREE.Vector3(0, 0, 0));
  });

  // Build adjacency map for faster lookups
  const adjacency = new Map<string, Set<string>>();
  edges.forEach(edge => {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, new Set());
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, new Set());
    adjacency.get(edge.source)!.add(edge.target);
    adjacency.get(edge.target)!.add(edge.source);
  });

  // Run force simulation
  const iterations = 300;
  const k = 8; // Optimal distance between connected nodes
  const repulsionStrength = 100;
  const attractionStrength = 0.1;
  const damping = 0.9;

  for (let iter = 0; iter < iterations; iter++) {
    const forces = new Map<string, THREE.Vector3>();
    
    // Initialize forces
    nodes.forEach(node => {
      forces.set(node.id, new THREE.Vector3(0, 0, 0));
    });

    // Repulsion forces (all nodes repel each other)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i];
        const node2 = nodes[j];
        const pos1 = positions.get(node1.id)!;
        const pos2 = positions.get(node2.id)!;
        
        const diff = pos1.clone().sub(pos2);
        const distance = Math.max(diff.length(), 0.1);
        
        const repulsion = diff.normalize().multiplyScalar(repulsionStrength / (distance * distance));
        
        forces.get(node1.id)!.add(repulsion);
        forces.get(node2.id)!.sub(repulsion);
      }
    }

    // Attraction forces (connected nodes attract each other)
    edges.forEach(edge => {
      const pos1 = positions.get(edge.source);
      const pos2 = positions.get(edge.target);
      
      if (pos1 && pos2) {
        const diff = pos2.clone().sub(pos1);
        const distance = diff.length();
        
        const attraction = diff.normalize().multiplyScalar(attractionStrength * (distance - k) * edge.weight);
        
        forces.get(edge.source)!.add(attraction);
        forces.get(edge.target)!.sub(attraction);
      }
    });

    // Apply forces and update positions
    nodes.forEach(node => {
      const force = forces.get(node.id)!;
      const velocity = velocities.get(node.id)!;
      const position = positions.get(node.id)!;
      
      // Update velocity
      velocity.add(force.multiplyScalar(0.01));
      velocity.multiplyScalar(damping);
      
      // Update position
      position.add(velocity);
      
      // Keep nodes within bounds
      const maxDistance = 30;
      if (position.length() > maxDistance) {
        position.normalize().multiplyScalar(maxDistance);
      }
    });
  }

  return positions;
};

const NetworkScene: React.FC<{ data: NetworkData; onNodeClick: (node: Node) => void; isProcessing: boolean }> = ({ 
  data, 
  onNodeClick, 
  isProcessing 
}) => {
  const nodePositions = useMemo(() => {
    console.log('🔄 Calculating force-directed layout based on actual connections...');
    
    // Use force-directed layout to position nodes based on their actual connections
    const positions = calculateForceDirectedLayout(data.nodes, data.edges);
    
    // Apply some clustering based on node types for better organization
    const typeOffsets = {
      company: new THREE.Vector3(0, 0, 0),
      process: new THREE.Vector3(0, 8, 0),
      data: new THREE.Vector3(0, -8, 0),
      output: new THREE.Vector3(0, 12, 0)
    };

    // Adjust positions based on node type
    data.nodes.forEach(node => {
      const pos = positions.get(node.id);
      if (pos) {
        const offset = typeOffsets[node.type] || new THREE.Vector3(0, 0, 0);
        pos.add(offset);
      }
    });

    console.log(`✅ Positioned ${data.nodes.length} nodes based on ${data.edges.length} connections`);
    return positions;
  }, [data.nodes, data.edges]);

  return (
    <>
      <CameraController />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={0.6} color="#4ECDC4" />
      <pointLight position={[0, 20, 0]} intensity={0.4} color="#FFE66D" />
      <directionalLight position={[8, 8, 8]} intensity={0.3} />
      
      {/* Environment */}
      <Stars radius={150} depth={80} count={4000} factor={5} saturation={0} fade speed={0.3} />
      <Environment preset="night" />
      
      {/* Particle system */}
      <ParticleSystem isProcessing={isProcessing} />
      
      {/* Connections - render first so they appear behind nodes */}
      {data.edges.map((edge, index) => {
        const sourcePos = nodePositions.get(edge.source);
        const targetPos = nodePositions.get(edge.target);
        
        if (sourcePos && targetPos) {
          return (
            <Connection3D
              key={`${edge.source}-${edge.target}-${index}`}
              edge={edge}
              sourcePosition={sourcePos}
              targetPosition={targetPos}
              isProcessing={isProcessing}
            />
          );
        }
        return null;
      })}
      
      {/* Nodes - render after connections so they appear on top */}
      {data.nodes.map((node) => {
        const position = nodePositions.get(node.id);
        if (!position) return null;
        
        const connections = data.edges.filter(e => e.source === node.id || e.target === node.id);
        
        return (
          <Node3D
            key={node.id}
            node={node}
            position={position}
            onClick={onNodeClick}
            isProcessing={isProcessing}
            connections={connections}
          />
        );
      })}
      
      {/* Central core indicator */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Grid helper for reference */}
      <gridHelper args={[60, 60, '#333333', '#333333']} position={[0, -20, 0]} />
    </>
  );
};

export const Network3D: React.FC<Network3DProps> = ({ data, onNodeClick, isProcessing }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black">
      <Canvas
        camera={{ position: [25, 15, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          autoRotate={isProcessing}
          autoRotateSpeed={0.2}
          dampingFactor={0.08}
          enableDamping={true}
        />
        
        <NetworkScene
          data={data}
          onNodeClick={onNodeClick}
          isProcessing={isProcessing}
        />
      </Canvas>
      
      {/* Enhanced 3D Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-xl text-sm border border-gray-600/30">
        <div className="space-y-2">
          <div className="text-cyan-400 font-semibold mb-2">3D Navigation</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Left drag: Orbit around network</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Right drag: Pan view</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Scroll: Zoom in/out</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Click sphere: Company details</span>
          </div>
        </div>
      </div>

      {/* Real Data Status */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl text-sm border border-gray-600/30">
        <div className="space-y-1">
          <div className="text-cyan-400 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Real Company Data
          </div>
          <div>Companies: {data.nodes.filter(n => n.type === 'company').length}</div>
          <div>Connections: {data.edges.length}</div>
          <div>Efficiency: {Math.round(data.efficiency * 100)}%</div>
          {isProcessing && (
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              AI Analysis Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
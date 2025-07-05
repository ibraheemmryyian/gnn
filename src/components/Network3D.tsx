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
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const nodeColor = useMemo(() => {
    const colors = {
      company: '#00FFFF',    // Cyan
      process: '#FF00FF',    // Magenta  
      data: '#FFFF00',       // Yellow
      output: '#00FF00'      // Green
    };
    return colors[node.type] || '#FFFFFF';
  }, [node.type]);

  const nodeSize = useMemo(() => {
    return 0.3 + node.importance * 1.2;
  }, [node.importance]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.copy(position);
      
      if (meshRef.current) {
        // MAGICAL FLOATING ANIMATION
        const time = state.clock.elapsedTime;
        meshRef.current.position.y = Math.sin(time * 2 + position.x) * 0.08;
        
        // BRAIN-LIKE PULSING
        if (node.isActive && isProcessing) {
          const pulse = 1 + Math.sin(time * 4) * 0.3;
          meshRef.current.scale.setScalar(pulse);
          
          // MAGICAL ROTATION
          meshRef.current.rotation.y += 0.02;
          meshRef.current.rotation.x += 0.01;
        }

        // NEURAL FIRING EFFECT
        if (node.importance > 0.8) {
          const neuralPulse = 1 + Math.sin(time * 6 + position.length()) * 0.4;
          meshRef.current.scale.setScalar(neuralPulse);
        }
      }

      // MAGICAL GLOW EFFECT
      if (glowRef.current) {
        const time = state.clock.elapsedTime;
        const glowIntensity = 0.5 + Math.sin(time * 3) * 0.3;
        glowRef.current.scale.setScalar(2 + glowIntensity);
        
        if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
          glowRef.current.material.opacity = 0.2 + glowIntensity * 0.3;
        }
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    onClick(node);
  };

  return (
    <group ref={groupRef} position={position}>
      {/* MAGICAL OUTER GLOW */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[nodeSize * 2, 16, 16]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* NEURAL ENERGY RINGS */}
      {node.isActive && isProcessing && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[nodeSize * 1.8, nodeSize * 2.2, 32]} />
            <meshBasicMaterial
              color={nodeColor}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[nodeSize * 1.6, nodeSize * 2.0, 32]} />
            <meshBasicMaterial
              color={nodeColor}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* MAIN NEURAL NODE */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={clicked ? 1.5 : hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={hovered ? 0.8 : node.isActive ? 0.5 : 0.3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* NEURAL SPIKES */}
      {node.importance > 0.7 && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const spikeLength = nodeSize * 0.8;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * (nodeSize + spikeLength/2),
                  0,
                  Math.sin(angle) * (nodeSize + spikeLength/2)
                ]}
                rotation={[0, angle, 0]}
              >
                <coneGeometry args={[0.02, spikeLength, 4]} />
                <meshBasicMaterial color={nodeColor} transparent opacity={0.7} />
              </mesh>
            );
          })}
        </>
      )}

      {/* CONNECTION INDICATOR */}
      {connections.length > 5 && (
        <mesh position={[0, nodeSize + 0.4, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      )}

      {/* MAGICAL LABEL */}
      {(hovered || nodeSize > 0.8) && (
        <Html distanceFactor={15} position={[0, nodeSize + 1.2, 0]}>
          <div className="bg-black/95 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap pointer-events-none border-2 border-cyan-400 shadow-2xl backdrop-blur-sm">
            <div className="font-bold text-cyan-400">{node.label}</div>
            <div className="text-xs text-gray-300">{node.metadata?.location}</div>
            <div className="text-xs text-purple-400">Neural Activity: {Math.round(node.importance * 100)}%</div>
          </div>
        </Html>
      )}

      {/* NEURAL TYPE SYMBOL */}
      <Text
        position={[0, 0, nodeSize + 0.2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.type === 'company' ? '🧠' : 
         node.type === 'process' ? '⚡' : 
         node.type === 'data' ? '🔮' : '✨'}
      </Text>
    </group>
  );
};

const Connection3D: React.FC<Connection3DProps> = ({ edge, sourcePosition, targetPosition, isProcessing }) => {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const points = useMemo(() => {
    const start = sourcePosition.clone();
    const end = targetPosition.clone();
    
    // MAGICAL CURVED NEURAL PATHWAYS
    const distance = start.distanceTo(end);
    const midPoint = start.clone().lerp(end, 0.5);
    
    // Create beautiful brain-like curves
    const curveHeight = distance * 0.15 * edge.weight;
    const perpendicular = new THREE.Vector3()
      .crossVectors(start, end)
      .normalize()
      .multiplyScalar(curveHeight);
    
    midPoint.add(perpendicular);

    // Add extra control points for more organic curves
    const curve = new THREE.CatmullRomCurve3([
      start,
      start.clone().lerp(midPoint, 0.3),
      midPoint,
      midPoint.clone().lerp(end, 0.7),
      end
    ]);
    
    return curve.getPoints(50);
  }, [sourcePosition, targetPosition, edge.weight]);

  useFrame((state) => {
    if (materialRef.current && isProcessing) {
      const time = state.clock.elapsedTime;
      
      // MAGICAL NEURAL PULSE ANIMATION
      const pulse = Math.sin(time * 3 + edge.weight * 10) * 0.5 + 0.5;
      const baseOpacity = 0.3 + edge.weight * 0.5;
      materialRef.current.opacity = baseOpacity + pulse * 0.4;
      
      // COLOR SHIFTING MAGIC
      const hue = (time * 0.1 + edge.weight * 2) % 1;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      materialRef.current.color = color;
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
        color={edge.weight > 0.8 ? '#00FFFF' : edge.weight > 0.6 ? '#FF00FF' : '#FFFF00'}
        transparent
        opacity={0.3 + edge.weight * 0.5}
        linewidth={Math.max(2, edge.weight * 8)}
      />
    </line>
  );
};

const MagicalParticleSystem: React.FC<{ isProcessing: boolean }> = ({ isProcessing }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // MAGICAL BRAIN-SHAPED DISTRIBUTION
      const radius = 40 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // RAINBOW NEURAL COLORS
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.1 + 0.02;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current && isProcessing) {
      const time = state.clock.elapsedTime;
      
      // MAGICAL SWIRLING MOTION
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
      
      // PULSING EFFECT
      const scale = 1 + Math.sin(time * 2) * 0.1;
      particlesRef.current.scale.setScalar(scale);
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
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const MagicalLightning: React.FC<{ isProcessing: boolean }> = ({ isProcessing }) => {
  const lightningRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightningRef.current && isProcessing) {
      const time = state.clock.elapsedTime;
      
      // RANDOM LIGHTNING FLASHES
      if (Math.random() < 0.02) {
        lightningRef.current.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
            child.material.opacity = Math.random() * 0.8 + 0.2;
            child.visible = Math.random() > 0.7;
          }
        });
      }
    }
  });

  const lightningBolts = useMemo(() => {
    const bolts = [];
    for (let i = 0; i < 20; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      
      const points = [start, end];
      bolts.push(points);
    }
    return bolts;
  }, []);

  return (
    <group ref={lightningRef}>
      {lightningBolts.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.1}
            linewidth={3}
          />
        </line>
      ))}
    </group>
  );
};

const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

// MAGICAL FORCE-DIRECTED LAYOUT
const calculateMagicalLayout = (nodes: Node[], edges: Edge[]): Map<string, THREE.Vector3> => {
  const positions = new Map<string, THREE.Vector3>();
  const velocities = new Map<string, THREE.Vector3>();
  
  // BRAIN-SHAPED INITIAL POSITIONING
  nodes.forEach((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 4;
    const radius = 8 + node.importance * 15;
    const height = Math.sin(angle * 2) * 8;
    
    positions.set(node.id, new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    ));
    velocities.set(node.id, new THREE.Vector3(0, 0, 0));
  });

  // MAGICAL FORCE SIMULATION
  const iterations = 200;
  const k = 12;
  const repulsionStrength = 150;
  const attractionStrength = 0.15;
  const damping = 0.85;

  for (let iter = 0; iter < iterations; iter++) {
    const forces = new Map<string, THREE.Vector3>();
    
    nodes.forEach(node => {
      forces.set(node.id, new THREE.Vector3(0, 0, 0));
    });

    // NEURAL REPULSION
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

    // NEURAL ATTRACTION
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

    // APPLY MAGICAL FORCES
    nodes.forEach(node => {
      const force = forces.get(node.id)!;
      const velocity = velocities.get(node.id)!;
      const position = positions.get(node.id)!;
      
      velocity.add(force.multiplyScalar(0.01));
      velocity.multiplyScalar(damping);
      
      position.add(velocity);
      
      // BRAIN BOUNDARY
      const maxDistance = 35;
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
    console.log('🧠 Calculating MAGICAL brain neural layout...');
    const positions = calculateMagicalLayout(data.nodes, data.edges);
    console.log(`✨ MAGICAL positioning complete for ${data.nodes.length} neural nodes`);
    return positions;
  }, [data.nodes, data.edges]);

  return (
    <>
      <CameraController />
      
      {/* MAGICAL LIGHTING SETUP */}
      <ambientLight intensity={0.3} color="#4A00E0" />
      <pointLight position={[20, 20, 20]} intensity={2} color="#00FFFF" />
      <pointLight position={[-20, -20, -20]} intensity={1.5} color="#FF00FF" />
      <pointLight position={[0, 30, 0]} intensity={1} color="#FFFF00" />
      <directionalLight position={[10, 10, 10]} intensity={0.8} color="#FFFFFF" />
      
      {/* MAGICAL ENVIRONMENT */}
      <Stars radius={200} depth={100} count={8000} factor={8} saturation={0} fade speed={0.5} />
      <Environment preset="night" />
      
      {/* MAGICAL PARTICLE SYSTEM */}
      <MagicalParticleSystem isProcessing={isProcessing} />
      
      {/* MAGICAL LIGHTNING */}
      <MagicalLightning isProcessing={isProcessing} />
      
      {/* NEURAL CONNECTIONS */}
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
      
      {/* NEURAL NODES */}
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
      
      {/* MAGICAL CENTRAL CORE */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* MAGICAL GRID */}
      <gridHelper args={[80, 80, '#00FFFF', '#FF00FF']} position={[0, -25, 0]} />
    </>
  );
};

export const Network3D: React.FC<Network3DProps> = ({ data, onNodeClick, isProcessing }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900 via-black to-blue-900">
      <Canvas
        camera={{ position: [30, 20, 30], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={15}
          maxDistance={120}
          autoRotate={isProcessing}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping={true}
        />
        
        <NetworkScene
          data={data}
          onNodeClick={onNodeClick}
          isProcessing={isProcessing}
        />
      </Canvas>
      
      {/* MAGICAL CONTROLS */}
      <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm text-white p-4 rounded-xl text-sm border-2 border-cyan-400 shadow-2xl">
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
            🧠 MAGICAL NEURAL BRAIN
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Neural pathways firing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-magenta-400 rounded-full animate-pulse"></div>
            <span>Brain synapses active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Consciousness flowing</span>
          </div>
        </div>
      </div>

      {/* MAGICAL STATUS */}
      <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm text-white p-3 rounded-xl text-sm border-2 border-purple-400 shadow-2xl">
        <div className="space-y-1">
          <div className="text-purple-400 font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            NEURAL MAGIC ACTIVE
          </div>
          <div>Neural Nodes: {data.nodes.filter(n => n.type === 'company').length}</div>
          <div>Synapses: {data.edges.length}</div>
          <div>Brain Power: {Math.round(data.efficiency * 100)}%</div>
          {isProcessing && (
            <div className="flex items-center gap-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              CONSCIOUSNESS EXPANDING
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
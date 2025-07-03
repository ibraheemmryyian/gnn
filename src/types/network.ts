export interface Node {
  id: string;
  label: string;
  type: 'company' | 'process' | 'data' | 'output';
  importance: number; // 0-1
  isActive: boolean;
  description: string;
  connections?: number;
  metadata?: Record<string, any>;
}

export interface Edge {
  source: string;
  target: string;
  weight: number; // 0-1
  type?: string;
  metadata?: {
    aiPriority?: string;
    confidence?: number;
    reasoning?: string[];
    materialCompatibility?: number;
    industrySymbiosis?: number;
    wasteSynergy?: number;
    energySynergy?: number;
    locationProximity?: number;
    aiConnection?: boolean;
  };
}

export interface NetworkData {
  nodes: Node[];
  edges: Edge[];
  efficiency: number; // 0-1
  timestamp: number;
}

export interface APIResponse {
  success: boolean;
  data?: NetworkData;
  error?: string;
}
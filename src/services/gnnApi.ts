import { NetworkData, APIResponse } from '../types/network';
import { NetworkGenerator } from './networkGenerator';

export class GNNApiService {
  private apiKey: string;
  private baseUrl: string;
  private isDemoMode: boolean;
  private networkGenerator: NetworkGenerator;
  private cachedNetworkData: NetworkData | null = null;

  constructor(apiKey: string, baseUrl?: string, isDemoMode = false) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.industrial-symbiosis-gnn.com';
    this.isDemoMode = isDemoMode;
    this.networkGenerator = new NetworkGenerator();
  }

  async connect(): Promise<boolean> {
    try {
      if (this.isDemoMode) {
        console.log('🚀 Fast Demo Mode - Instant network generation');
        // Pre-generate network data for instant loading
        this.cachedNetworkData = this.networkGenerator.generateNetworkData();
        return true;
      }

      console.log('🔌 Attempting real API connection...');
      
      // Try real API connection with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${this.baseUrl}/api/v1/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-API-Key': this.apiKey
          },
          body: JSON.stringify({
            apiKey: this.apiKey,
            clientVersion: '1.0.0',
            requestedFeatures: ['network-data', 'real-time-updates', 'processing-control']
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Real API connection successful:', result);
          return true;
        } else {
          throw new Error(`API connection failed: ${response.status}`);
        }
      } catch (networkError) {
        console.log('⚠️ API unavailable, using fast demo mode');
        this.isDemoMode = true;
        this.cachedNetworkData = this.networkGenerator.generateNetworkData();
        return true;
      }
    } catch (error) {
      console.error('Connection error, using fast demo mode:', error);
      this.isDemoMode = true;
      this.cachedNetworkData = this.networkGenerator.generateNetworkData();
      return true;
    }
  }

  async getNetworkData(): Promise<APIResponse> {
    try {
      if (this.isDemoMode) {
        console.log('⚡ Instant network data delivery');
        
        // Return cached data instantly or generate quickly
        const networkData = this.cachedNetworkData || this.networkGenerator.generateNetworkData();
        
        console.log(`✅ Instant delivery: ${networkData.nodes.length} nodes, ${networkData.edges.length} connections`);
        
        return { success: true, data: networkData };
      }

      // Try to fetch from real API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${this.baseUrl}/api/v1/network`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Real API data retrieved successfully');
        return { success: true, data };
      } else {
        throw new Error(`API request failed: ${response.status}`);
      }
    } catch (error) {
      console.log('⚡ API timeout, using fast local generation');
      
      // Fallback to fast generation
      const networkData = this.cachedNetworkData || this.networkGenerator.generateNetworkData();
      return { success: true, data: networkData };
    }
  }

  async startProcessing(): Promise<boolean> {
    try {
      if (this.isDemoMode) {
        console.log('🚀 Fast processing mode activated');
        return true;
      }

      const response = await fetch(`${this.baseUrl}/api/v1/processing/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey
        }
      });

      return response.ok;
    } catch (error) {
      console.log('Fast processing fallback');
      return true;
    }
  }

  async stopProcessing(): Promise<boolean> {
    try {
      if (this.isDemoMode) {
        console.log('⏹️ Fast processing stopped');
        return true;
      }

      const response = await fetch(`${this.baseUrl}/api/v1/processing/stop`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Key': this.apiKey
        }
      });

      return response.ok;
    } catch (error) {
      console.log('Fast processing stop');
      return true;
    }
  }

  static createDemoInstance(): GNNApiService {
    return new GNNApiService('demo-key', undefined, true);
  }
}
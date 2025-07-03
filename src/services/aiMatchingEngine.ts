export interface MaterialCompatibility {
  material1: string;
  material2: string;
  compatibility: number;
  synergyType: 'waste_to_input' | 'energy_sharing' | 'water_reuse' | 'material_exchange';
}

export interface IndustrySymbiosis {
  industry1: string;
  industry2: string;
  compatibility: number;
  description: string;
}

export interface MatchScore {
  materialCompatibility: number;
  industrySymbiosis: number;
  wasteSynergy: number;
  energySynergy: number;
  locationProximity: number;
  overallScore: number;
  confidence: number;
  reasoning: string[];
}

export class AIMatchingEngine {
  private materialCompatibilityMatrix: MaterialCompatibility[] = [
    // Plastic synergies
    { material1: 'plastic', material2: 'hdpe', compatibility: 0.95, synergyType: 'material_exchange' },
    { material1: 'plastic', material2: 'ldpe', compatibility: 0.92, synergyType: 'material_exchange' },
    { material1: 'plastic packaging', material2: 'post-consumer plastics', compatibility: 0.98, synergyType: 'waste_to_input' },
    
    // Metal synergies
    { material1: 'steel frames', material2: 'copper wiring', compatibility: 0.85, synergyType: 'material_exchange' },
    { material1: 'silicon wafers', material2: 'copper wiring', compatibility: 0.78, synergyType: 'material_exchange' },
    
    // Water synergies
    { material1: 'raw water', material2: 'sterile water', compatibility: 0.88, synergyType: 'water_reuse' },
    { material1: 'coagulants', material2: 'raw water', compatibility: 0.92, synergyType: 'water_reuse' },
    
    // Organic waste synergies
    { material1: 'fruits and vegetables', material2: 'cardboard', compatibility: 0.65, synergyType: 'waste_to_input' },
    { material1: 'organic waste', material2: 'energy', compatibility: 0.82, synergyType: 'energy_sharing' },
    
    // Wood and paper synergies
    { material1: 'plywood', material2: 'cardboard', compatibility: 0.75, synergyType: 'material_exchange' },
    { material1: 'foam padding', material2: 'plastic packaging', compatibility: 0.68, synergyType: 'waste_to_input' }
  ];

  private industrySymbiosisPatterns: IndustrySymbiosis[] = [
    {
      industry1: 'Electronics Manufacturing',
      industry2: 'Plastic Recycling',
      compatibility: 0.92,
      description: 'E-waste plastic components can be recycled into new plastic products'
    },
    {
      industry1: 'Supermarket',
      industry2: 'Plastic Recycling',
      compatibility: 0.89,
      description: 'Plastic packaging waste can be processed into recycled plastic pellets'
    },
    {
      industry1: 'Hospital',
      industry2: 'Water Treatment',
      compatibility: 0.85,
      description: 'Medical wastewater requires specialized treatment and can be reused'
    },
    {
      industry1: 'Furniture Production',
      industry2: 'Supermarket',
      compatibility: 0.72,
      description: 'Cardboard waste from supermarkets can be used for furniture packaging'
    },
    {
      industry1: 'Electronics Manufacturing',
      industry2: 'Water Treatment',
      compatibility: 0.78,
      description: 'Electronics manufacturing wastewater can be treated and reused'
    },
    {
      industry1: 'Furniture Production',
      industry2: 'Water Treatment',
      compatibility: 0.68,
      description: 'Wood processing wastewater can be treated for reuse'
    },
    {
      industry1: 'Plastic Recycling',
      industry2: 'Water Treatment',
      compatibility: 0.75,
      description: 'Plastic washing wastewater can be treated and recycled'
    }
  ];

  // TF-IDF inspired text similarity for material matching
  private calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return intersection.length / union.length;
  }

  // Advanced material compatibility scoring
  private calculateMaterialCompatibility(materials1: string[], materials2: string[]): number {
    let maxCompatibility = 0;
    const reasoning: string[] = [];

    for (const mat1 of materials1) {
      for (const mat2 of materials2) {
        // Check predefined compatibility matrix
        const matrixMatch = this.materialCompatibilityMatrix.find(
          comp => 
            (mat1.toLowerCase().includes(comp.material1) && mat2.toLowerCase().includes(comp.material2)) ||
            (mat1.toLowerCase().includes(comp.material2) && mat2.toLowerCase().includes(comp.material1))
        );

        if (matrixMatch) {
          maxCompatibility = Math.max(maxCompatibility, matrixMatch.compatibility);
          reasoning.push(`High compatibility: ${mat1} ↔ ${mat2} (${matrixMatch.synergyType})`);
        }

        // Text similarity fallback
        const textSim = this.calculateTextSimilarity(mat1, mat2);
        if (textSim > 0.3) {
          maxCompatibility = Math.max(maxCompatibility, textSim * 0.7);
          reasoning.push(`Material similarity: ${mat1} ↔ ${mat2} (${Math.round(textSim * 100)}%)`);
        }
      }
    }

    return maxCompatibility;
  }

  // Industry symbiosis pattern matching
  private calculateIndustrySymbiosis(industry1: string, industry2: string): { score: number; reasoning: string } {
    const pattern = this.industrySymbiosisPatterns.find(
      p => 
        (p.industry1 === industry1 && p.industry2 === industry2) ||
        (p.industry1 === industry2 && p.industry2 === industry1)
    );

    if (pattern) {
      return {
        score: pattern.compatibility,
        reasoning: pattern.description
      };
    }

    // Fallback: same industry has moderate compatibility
    if (industry1 === industry2) {
      return {
        score: 0.4,
        reasoning: 'Same industry - potential for resource sharing and best practices'
      };
    }

    return { score: 0.1, reasoning: 'No established symbiosis pattern' };
  }

  // Waste synergy analysis
  private calculateWasteSynergy(company1: any, company2: any): number {
    const wasteKeywords = ['waste', 'byproduct', 'scrap', 'residue'];
    const inputKeywords = ['raw', 'input', 'material', 'feedstock'];

    let synergy = 0;

    // Check if company1's outputs match company2's inputs
    const company1Materials = company1.materials?.join(' ').toLowerCase() || '';
    const company2Materials = company2.materials?.join(' ').toLowerCase() || '';

    wasteKeywords.forEach(wasteWord => {
      inputKeywords.forEach(inputWord => {
        if (company1Materials.includes(wasteWord) && company2Materials.includes(inputWord)) {
          synergy += 0.3;
        }
        if (company2Materials.includes(wasteWord) && company1Materials.includes(inputWord)) {
          synergy += 0.3;
        }
      });
    });

    // Volume compatibility bonus
    if (company1.volume && company2.volume) {
      const volumeRatio = Math.min(company1.volume, company2.volume) / Math.max(company1.volume, company2.volume);
      synergy += volumeRatio * 0.2;
    }

    return Math.min(synergy, 1);
  }

  // Energy synergy calculation
  private calculateEnergySynergy(company1: any, company2: any): number {
    const energyIntensiveIndustries = ['Electronics Manufacturing', 'Furniture Production', 'Water Treatment'];
    const energyProducingProcesses = ['biogas', 'solar', 'waste-to-energy', 'cogeneration'];

    let synergy = 0;

    // Energy sharing potential between energy-intensive industries
    if (energyIntensiveIndustries.includes(company1.industry) && 
        energyIntensiveIndustries.includes(company2.industry)) {
      synergy += 0.4;
    }

    // Check for energy production capabilities
    const company1Processes = company1.processes?.join(' ').toLowerCase() || '';
    const company2Processes = company2.processes?.join(' ').toLowerCase() || '';

    energyProducingProcesses.forEach(process => {
      if (company1Processes.includes(process) || company2Processes.includes(process)) {
        synergy += 0.3;
      }
    });

    // Geographic proximity bonus for energy sharing
    if (company1.location === company2.location) {
      synergy += 0.2;
    }

    return Math.min(synergy, 1);
  }

  // Geographic proximity calculation with EU focus
  private calculateLocationProximity(location1: string, location2: string): number {
    if (location1 === location2) return 1.0; // Same city

    const country1 = location1.split(', ')[1];
    const country2 = location2.split(', ')[1];

    if (country1 === country2) return 0.8; // Same country

    // EU regional clusters
    const clusters = {
      'Western EU': ['Netherlands', 'Belgium', 'Germany', 'Luxembourg'],
      'Nordic EU': ['Finland', 'Estonia', 'Lithuania'],
      'Central EU': ['Austria', 'Czech Republic', 'Poland', 'Slovenia'],
      'Southern EU': ['Portugal', 'Greece', 'Croatia'],
      'Eastern EU': ['Romania', 'Bulgaria']
    };

    for (const cluster of Object.values(clusters)) {
      if (cluster.includes(country1) && cluster.includes(country2)) {
        return 0.6; // Same regional cluster
      }
    }

    return 0.3; // Different EU regions
  }

  // Monte Carlo simulation for risk assessment
  private runMonteCarloSimulation(baseScore: number, iterations: number = 1000): { mean: number; confidence: number; risk: number } {
    const results: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      // Add random variations to simulate real-world uncertainties
      const marketVariation = (Math.random() - 0.5) * 0.2; // ±10% market uncertainty
      const operationalVariation = (Math.random() - 0.5) * 0.15; // ±7.5% operational uncertainty
      const regulatoryVariation = (Math.random() - 0.5) * 0.1; // ±5% regulatory uncertainty
      
      const simulatedScore = Math.max(0, Math.min(1, 
        baseScore + marketVariation + operationalVariation + regulatoryVariation
      ));
      
      results.push(simulatedScore);
    }

    const mean = results.reduce((sum, val) => sum + val, 0) / results.length;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
    const stdDev = Math.sqrt(variance);
    
    return {
      mean,
      confidence: Math.max(0, 1 - (stdDev * 2)), // Higher std dev = lower confidence
      risk: stdDev // Standard deviation as risk measure
    };
  }

  // Main matching algorithm with ensemble scoring
  public calculateMatchScore(company1: any, company2: any): MatchScore {
    const reasoning: string[] = [];

    // 1. Material Compatibility (40% weight)
    const materialCompatibility = this.calculateMaterialCompatibility(
      company1.materials || [], 
      company2.materials || []
    );
    reasoning.push(`Material compatibility: ${Math.round(materialCompatibility * 100)}%`);

    // 2. Industry Symbiosis (25% weight)
    const industryResult = this.calculateIndustrySymbiosis(company1.industry, company2.industry);
    reasoning.push(`Industry symbiosis: ${industryResult.reasoning}`);

    // 3. Waste Synergy (20% weight)
    const wasteSynergy = this.calculateWasteSynergy(company1, company2);
    reasoning.push(`Waste synergy potential: ${Math.round(wasteSynergy * 100)}%`);

    // 4. Energy Synergy (10% weight)
    const energySynergy = this.calculateEnergySynergy(company1, company2);
    reasoning.push(`Energy sharing potential: ${Math.round(energySynergy * 100)}%`);

    // 5. Location Proximity (5% weight)
    const locationProximity = this.calculateLocationProximity(company1.location, company2.location);
    reasoning.push(`Geographic proximity: ${Math.round(locationProximity * 100)}%`);

    // Weighted overall score
    const overallScore = (
      materialCompatibility * 0.40 +
      industryResult.score * 0.25 +
      wasteSynergy * 0.20 +
      energySynergy * 0.10 +
      locationProximity * 0.05
    );

    // Monte Carlo risk assessment
    const simulation = this.runMonteCarloSimulation(overallScore);

    return {
      materialCompatibility,
      industrySymbiosis: industryResult.score,
      wasteSynergy,
      energySynergy,
      locationProximity,
      overallScore: simulation.mean,
      confidence: simulation.confidence,
      reasoning
    };
  }

  // Advanced link prediction using graph neural network concepts
  public predictOptimalConnections(companies: any[], maxConnections: number = 200): Array<{
    source: string;
    target: string;
    score: MatchScore;
    priority: 'MONOPOLY AI: Perfect Symbiosis' | 'MONOPOLY AI: Exceptional Match' | 'MONOPOLY AI: Premium Quality' | 'MONOPOLY AI: High Value' | 'MONOPOLY AI: Strong Match' | 'MONOPOLY AI: Viable Match';
  }> {
    const connections: Array<{
      source: string;
      target: string;
      score: MatchScore;
      priority: string;
    }> = [];

    // Generate all possible pairs
    for (let i = 0; i < companies.length; i++) {
      for (let j = i + 1; j < companies.length; j++) {
        const score = this.calculateMatchScore(companies[i], companies[j]);
        
        // Only include viable matches (≥70%)
        if (score.overallScore >= 0.70) {
          let priority: string;
          if (score.overallScore >= 0.95) priority = 'MONOPOLY AI: Perfect Symbiosis';
          else if (score.overallScore >= 0.90) priority = 'MONOPOLY AI: Exceptional Match';
          else if (score.overallScore >= 0.85) priority = 'MONOPOLY AI: Premium Quality';
          else if (score.overallScore >= 0.80) priority = 'MONOPOLY AI: High Value';
          else if (score.overallScore >= 0.75) priority = 'MONOPOLY AI: Strong Match';
          else priority = 'MONOPOLY AI: Viable Match';

          connections.push({
            source: companies[i].id,
            target: companies[j].id,
            score,
            priority
          });
        }
      }
    }

    // Sort by overall score and confidence
    connections.sort((a, b) => {
      const scoreA = a.score.overallScore * a.score.confidence;
      const scoreB = b.score.overallScore * b.score.confidence;
      return scoreB - scoreA;
    });

    return connections.slice(0, maxConnections);
  }

  // Multi-hop symbiosis chain detection
  public findSymbiosisChains(companies: any[], maxHops: number = 3): Array<{
    chain: string[];
    totalScore: number;
    pattern: 'Linear Chain' | 'Circular Loop' | 'Hub-Spoke' | 'Cluster';
    description: string;
  }> {
    const chains: Array<{
      chain: string[];
      totalScore: number;
      pattern: string;
      description: string;
    }> = [];

    // Find linear chains
    const connections = this.predictOptimalConnections(companies, 300);
    const adjacencyMap = new Map<string, string[]>();

    // Build adjacency map
    connections.forEach(conn => {
      if (!adjacencyMap.has(conn.source)) adjacencyMap.set(conn.source, []);
      if (!adjacencyMap.has(conn.target)) adjacencyMap.set(conn.target, []);
      adjacencyMap.get(conn.source)!.push(conn.target);
      adjacencyMap.get(conn.target)!.push(conn.source);
    });

    // Find chains using DFS
    const visited = new Set<string>();
    
    companies.forEach(company => {
      if (!visited.has(company.id)) {
        const chain = this.findChainDFS(company.id, adjacencyMap, visited, maxHops);
        if (chain.length >= 3) {
          const totalScore = this.calculateChainScore(chain, connections);
          chains.push({
            chain,
            totalScore,
            pattern: this.determineChainPattern(chain, adjacencyMap),
            description: this.generateChainDescription(chain, companies)
          });
        }
      }
    });

    return chains.sort((a, b) => b.totalScore - a.totalScore).slice(0, 10);
  }

  private findChainDFS(nodeId: string, adjacencyMap: Map<string, string[]>, visited: Set<string>, maxDepth: number): string[] {
    if (maxDepth <= 0 || visited.has(nodeId)) return [nodeId];
    
    visited.add(nodeId);
    const neighbors = adjacencyMap.get(nodeId) || [];
    
    let longestChain = [nodeId];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const subChain = this.findChainDFS(neighbor, adjacencyMap, visited, maxDepth - 1);
        if (subChain.length > longestChain.length - 1) {
          longestChain = [nodeId, ...subChain];
        }
      }
    }
    
    return longestChain;
  }

  private calculateChainScore(chain: string[], connections: any[]): number {
    let totalScore = 0;
    for (let i = 0; i < chain.length - 1; i++) {
      const connection = connections.find(c => 
        (c.source === chain[i] && c.target === chain[i + 1]) ||
        (c.source === chain[i + 1] && c.target === chain[i])
      );
      if (connection) {
        totalScore += connection.score.overallScore;
      }
    }
    return totalScore / (chain.length - 1);
  }

  private determineChainPattern(chain: string[], adjacencyMap: Map<string, string[]>): string {
    if (chain.length === 3) return 'Linear Chain';
    
    // Check for circular pattern
    const firstNode = chain[0];
    const lastNode = chain[chain.length - 1];
    const firstNeighbors = adjacencyMap.get(firstNode) || [];
    
    if (firstNeighbors.includes(lastNode)) {
      return 'Circular Loop';
    }
    
    // Check for hub-spoke (one node with many connections)
    const connectionCounts = chain.map(nodeId => (adjacencyMap.get(nodeId) || []).length);
    const maxConnections = Math.max(...connectionCounts);
    
    if (maxConnections >= chain.length * 0.7) {
      return 'Hub-Spoke';
    }
    
    return 'Cluster';
  }

  private generateChainDescription(chain: string[], companies: any[]): string {
    const companyNames = chain.map(id => {
      const company = companies.find(c => c.id === id);
      return company ? company.name : id;
    });
    
    return `Symbiosis chain: ${companyNames.join(' → ')}`;
  }
}
import { NetworkData, Node, Edge } from '../types/network';
import { CompanyData, parseCompanyData } from './companyDataParser';

interface SymbiosisConnection {
  sourceId: string;
  targetId: string;
  connectionType: 'waste_to_input' | 'energy_sharing' | 'water_reuse' | 'material_exchange' | 'multi_hop';
  strength: number;
  description: string;
  priority?: string;
  hopCount?: number;
}

export class NetworkGenerator {
  private companies: CompanyData[];
  
  constructor() {
    this.companies = parseCompanyData();
  }

  private getIndustryType(industry: string): 'company' | 'process' | 'data' | 'output' {
    return 'company';
  }

  private calculateImportance(company: CompanyData): number {
    let importance = Math.min(company.volume / 100000, 1);
    
    // Enhanced industry bonuses
    if (company.industry.includes('Oil & Gas')) importance += 0.4;
    if (company.industry.includes('Petrochemicals')) importance += 0.35;
    if (company.industry.includes('Power Generation')) importance += 0.3;
    if (company.industry.includes('Water Treatment')) importance += 0.25;
    if (company.industry.includes('Recycling')) importance += 0.3;
    if (company.industry.includes('Manufacturing')) importance += 0.2;
    if (company.industry.includes('Electronics')) importance += 0.25;
    if (company.industry.includes('Hospital')) importance += 0.2;
    if (company.industry.includes('Supermarket')) importance += 0.15;
    
    // Regional bonuses
    const gulfCities = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'Kuwait City', 'Manama', 'Muscat'];
    if (gulfCities.some(city => company.location.includes(city))) {
      importance += 0.2;
    }
    
    return Math.min(importance, 1);
  }

  // FIXED: Much more conservative connection generation
  private generateOptimalConnections(): SymbiosisConnection[] {
    const connections: SymbiosisConnection[] = [];
    const companies = this.companies;
    const maxTotalConnections = Math.min(800, companies.length * 3); // Hard cap!
    
    console.log(`🎯 Target: Maximum ${maxTotalConnections} connections for ${companies.length} companies`);
    
    // Enhanced industry compatibility matrix
    const industryCompatibility: Record<string, string[]> = {
      'Oil & Gas': ['Petrochemicals', 'Power Generation'],
      'Petrochemicals': ['Plastics', 'Manufacturing'],
      'Manufacturing': ['Recycling', 'Electronics'],
      'Power Generation': ['Water Treatment', 'Manufacturing'],
      'Water Treatment': ['Agriculture', 'Hospital'],
      'Electronics': ['Recycling', 'Manufacturing'],
      'Hospital': ['Waste Management', 'Water Treatment'],
      'Supermarket': ['Food Processing', 'Waste Management'],
      'Plastic Recycling': ['Manufacturing', 'Petrochemicals'],
      'Furniture Production': ['Manufacturing', 'Recycling']
    };

    // Material keywords for better matching
    const materialKeywords = {
      metals: ['aluminum', 'steel', 'copper', 'iron', 'metal'],
      plastics: ['plastic', 'polymer', 'pet', 'hdpe'],
      organics: ['food', 'organic', 'biomass', 'waste'],
      chemicals: ['chemical', 'solvent', 'acid', 'oil'],
      water: ['water', 'wastewater', 'liquid'],
      energy: ['energy', 'heat', 'electricity', 'steam'],
      wood: ['wood', 'timber', 'sawdust'],
      electronics: ['electronic', 'circuit', 'battery']
    };

    // STRICT connection limits per company
    const connectionCounts = new Map<string, number>();
    const maxConnectionsPerCompany = 6; // Much lower!
    
    // Sort companies by importance for priority processing
    const sortedCompanies = [...companies].sort((a, b) => b.importance - a.importance);
    
    for (let i = 0; i < sortedCompanies.length && connections.length < maxTotalConnections; i++) {
      const company1 = sortedCompanies[i];
      const currentConnections = connectionCounts.get(company1.id) || 0;
      
      if (currentConnections >= maxConnectionsPerCompany) continue;
      
      // Only check a limited number of potential partners
      const maxPartnersToCheck = Math.min(20, companies.length - i - 1);
      const potentialPartners = sortedCompanies
        .slice(i + 1, i + 1 + maxPartnersToCheck)
        .filter(company2 => {
          const partner2Connections = connectionCounts.get(company2.id) || 0;
          return partner2Connections < maxConnectionsPerCompany;
        });
      
      for (const company2 of potentialPartners) {
        if (connections.length >= maxTotalConnections) break;
        if ((connectionCounts.get(company1.id) || 0) >= maxConnectionsPerCompany) break;
        if ((connectionCounts.get(company2.id) || 0) >= maxConnectionsPerCompany) continue;
        
        // Enhanced industry compatibility check
        const industry1 = company1.industry;
        const industry2 = company2.industry;
        
        let industryScore = 0;
        if (industryCompatibility[industry1]?.some(ind => industry2.includes(ind)) ||
            industryCompatibility[industry2]?.some(ind => industry1.includes(ind))) {
          industryScore = 0.4;
        }
        
        // Same industry bonus
        if (industry1 === industry2) industryScore += 0.3;
        
        // Material compatibility check
        let materialScore = 0;
        const materials1 = company1.materials.join(' ').toLowerCase();
        const materials2 = company2.materials.join(' ').toLowerCase();
        const products1 = company1.products.join(' ').toLowerCase();
        const products2 = company2.products.join(' ').toLowerCase();
        
        for (const [category, keywords] of Object.entries(materialKeywords)) {
          const has1Materials = keywords.some(keyword => materials1.includes(keyword));
          const has1Products = keywords.some(keyword => products1.includes(keyword));
          const has2Materials = keywords.some(keyword => materials2.includes(keyword));
          const has2Products = keywords.some(keyword => products2.includes(keyword));
          
          // Cross-matching: company1's products with company2's materials
          if (has1Products && has2Materials) materialScore += 0.5;
          if (has2Products && has1Materials) materialScore += 0.5;
        }
        
        // Geographic proximity bonus
        let geoBonus = 0;
        if (company1.location === company2.location) geoBonus = 0.3;
        else if (this.sameRegion(company1.location, company2.location)) geoBonus = 0.2;
        else geoBonus = 0.05;
        
        // Calculate connection strength with HIGHER threshold
        let strength = 0.5; // Higher base
        strength += industryScore;
        strength += Math.min(materialScore, 0.4);
        strength += geoBonus;
        
        // MUCH HIGHER threshold to limit connections
        if (strength > 0.85) { // Was 0.65, now 0.85!
          const connectionType = this.getConnectionType(materials1, materials2, products1, products2);
          const priority = this.getPriority(strength);
          
          connections.push({
            sourceId: company1.id,
            targetId: company2.id,
            connectionType,
            strength: Math.min(strength, 1),
            description: `${priority}: ${company1.name} ↔ ${company2.name}`,
            priority,
            hopCount: 1
          });
          
          // Update connection counts
          connectionCounts.set(company1.id, (connectionCounts.get(company1.id) || 0) + 1);
          connectionCounts.set(company2.id, (connectionCounts.get(company2.id) || 0) + 1);
        }
      }
    }

    // Add VERY LIMITED multi-hop connections
    this.addLimitedMultiHopConnections(connections, companies, maxTotalConnections);
    
    console.log(`✅ CONTROLLED generation: ${connections.length} connections (target: ${maxTotalConnections})`);
    return connections.slice(0, maxTotalConnections); // Hard cut-off
  }

  private sameRegion(location1: string, location2: string): boolean {
    const gulfCities = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'Kuwait City', 'Manama', 'Muscat'];
    const europeanCities = ['London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Brussels', 'Stockholm', 'Oslo', 'Helsinki', 'Copenhagen', 'Prague', 'Warsaw', 'Budapest', 'Lisbon', 'Athens', 'Dublin', 'Luxembourg City', 'Vilnius', 'Tallinn', 'Ljubljana', 'Zagreb', 'Sofia', 'Bucharest'];
    
    const isGulf1 = gulfCities.some(city => location1.includes(city));
    const isGulf2 = gulfCities.some(city => location2.includes(city));
    const isEurope1 = europeanCities.some(city => location1.includes(city));
    const isEurope2 = europeanCities.some(city => location2.includes(city));
    
    return (isGulf1 && isGulf2) || (isEurope1 && isEurope2);
  }

  private getConnectionType(materials1: string, materials2: string, products1: string, products2: string): SymbiosisConnection['connectionType'] {
    const combined1 = materials1 + ' ' + products1;
    const combined2 = materials2 + ' ' + products2;
    
    if (combined1.includes('water') || combined2.includes('water')) return 'water_reuse';
    if (combined1.includes('energy') || combined2.includes('energy')) return 'energy_sharing';
    if (combined1.includes('waste') || combined2.includes('waste')) return 'waste_to_input';
    return 'material_exchange';
  }

  private getPriority(strength: number): string {
    if (strength >= 0.95) return 'Perfect Symbiosis';
    if (strength >= 0.90) return 'Exceptional Match';
    if (strength >= 0.85) return 'High Quality';
    return 'Good Match';
  }

  private addLimitedMultiHopConnections(connections: SymbiosisConnection[], companies: CompanyData[], maxTotal: number): void {
    // Add VERY LIMITED multi-hop connections
    const existingPairs = new Set(connections.map(c => `${c.sourceId}-${c.targetId}`));
    const connectionMap = new Map<string, string[]>();
    
    // Build connection map
    connections.forEach(conn => {
      if (!connectionMap.has(conn.sourceId)) connectionMap.set(conn.sourceId, []);
      if (!connectionMap.has(conn.targetId)) connectionMap.set(conn.targetId, []);
      connectionMap.get(conn.sourceId)!.push(conn.targetId);
      connectionMap.get(conn.targetId)!.push(conn.sourceId);
    });
    
    // Add only a few multi-hop connections
    const maxMultiHop = Math.min(50, maxTotal - connections.length);
    let multiHopAdded = 0;
    
    for (let i = 0; i < Math.min(30, companies.length) && multiHopAdded < maxMultiHop; i++) {
      const company1 = companies[i];
      const intermediaries = (connectionMap.get(company1.id) || []).slice(0, 2); // Only 2 intermediaries
      
      for (const intermediaryId of intermediaries) {
        if (multiHopAdded >= maxMultiHop) break;
        
        const finalTargets = (connectionMap.get(intermediaryId) || []).slice(0, 1); // Only 1 final target
        
        for (const finalTargetId of finalTargets) {
          if (multiHopAdded >= maxMultiHop) break;
          
          const pairKey = `${company1.id}-${finalTargetId}`;
          
          if (!existingPairs.has(pairKey) && company1.id !== finalTargetId) {
            const finalTarget = companies.find(c => c.id === finalTargetId);
            
            if (finalTarget) {
              connections.push({
                sourceId: company1.id,
                targetId: finalTargetId,
                connectionType: 'multi_hop',
                strength: 0.75 + Math.random() * 0.15,
                description: `Multi-hop: ${company1.name} → ${finalTarget.name}`,
                priority: 'Multi-hop Chain',
                hopCount: 3
              });
              existingPairs.add(pairKey);
              multiHopAdded++;
            }
          }
        }
      }
    }
  }

  generateNetworkData(): NetworkData {
    console.log(`🚀 CONTROLLED generating network for ${this.companies.length} companies...`);
    
    const startTime = performance.now();
    
    const nodes: Node[] = this.companies.map(company => ({
      id: company.id,
      label: company.name,
      type: 'company',
      importance: this.calculateImportance(company),
      isActive: Math.random() > 0.15, // 85% active
      description: `${company.industry} company in ${company.location}. Processes ${company.volume.toLocaleString()} ${company.volumeUnit} annually.`,
      connections: 0,
      metadata: {
        industry: company.industry,
        location: company.location,
        volume: `${company.volume.toLocaleString()} ${company.volumeUnit}`,
        products: company.products.join(', '),
        materials: company.materials.join(', '),
        processes: company.processes.join(' → '),
        co2Potential: this.calculateCO2Potential(company),
        costSavings: this.calculateCostSavings(company),
        employees: Math.floor(Math.random() * 2000) + 50,
        region: this.getRegion(company.location),
        efficiency: Math.round((0.7 + Math.random() * 0.3) * 100)
      }
    }));

    const symbiosisConnections = this.generateOptimalConnections();
    
    const edges: Edge[] = symbiosisConnections.map(connection => ({
      source: connection.sourceId,
      target: connection.targetId,
      weight: connection.strength,
      type: connection.connectionType,
      metadata: {
        aiPriority: connection.priority,
        confidence: connection.strength,
        reasoning: [`Controlled matching for ${connection.connectionType}`],
        materialCompatibility: connection.strength,
        industrySymbiosis: connection.strength * 0.85,
        wasteSynergy: connection.strength * 0.9,
        energySynergy: connection.strength * 0.75,
        locationProximity: connection.strength * 0.6,
        geographicBonus: connection.strength > 0.8 ? 0.2 : 0.1,
        hopCount: connection.hopCount || 1,
        multiHop: connection.hopCount && connection.hopCount > 1
      }
    }));

    // Add only 3 AI system nodes (reduced from more)
    const aiNodes: Node[] = [
      {
        id: 'ai_engine',
        label: 'AI Matching Engine',
        type: 'process',
        importance: 0.95,
        isActive: true,
        description: 'Optimized network generation engine.',
        connections: 0,
        metadata: {
          algorithm: 'Controlled Matching v1.0',
          processingSpeed: 'Ultra-fast',
          connectionLimit: 'Optimized'
        }
      },
      {
        id: 'visual_optimizer',
        label: 'Visual Optimizer',
        type: 'data',
        importance: 0.90,
        isActive: true,
        description: 'Network layout optimization.',
        connections: 0
      },
      {
        id: 'pattern_analyzer',
        label: 'Pattern Analyzer',
        type: 'output',
        importance: 0.85,
        isActive: true,
        description: 'Connection pattern analysis.',
        connections: 0
      }
    ];

    nodes.push(...aiNodes);

    // Add VERY LIMITED AI connections
    const aiEdges: Edge[] = [];
    const topCompanies = nodes
      .filter(n => n.type === 'company')
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 15); // Only top 15 companies

    topCompanies.forEach((company, index) => {
      if (index < 8) { // Only 8 connections to AI engine
        aiEdges.push({
          source: 'ai_engine',
          target: company.id,
          weight: 0.85,
          type: 'ai_optimization',
          metadata: { aiConnection: true }
        });
      }
    });

    // Connect AI nodes (only 3 connections)
    aiEdges.push(
      {
        source: 'ai_engine',
        target: 'visual_optimizer',
        weight: 0.95,
        type: 'ai_coordination',
        metadata: { aiConnection: true }
      },
      {
        source: 'ai_engine',
        target: 'pattern_analyzer',
        weight: 0.90,
        type: 'pattern_coordination',
        metadata: { aiConnection: true }
      },
      {
        source: 'visual_optimizer',
        target: 'pattern_analyzer',
        weight: 0.88,
        type: 'analysis_coordination',
        metadata: { aiConnection: true }
      }
    );

    edges.push(...aiEdges);

    // Calculate connection counts
    const connectionCounts = new Map<string, number>();
    edges.forEach(edge => {
      connectionCounts.set(edge.source, (connectionCounts.get(edge.source) || 0) + 1);
      connectionCounts.set(edge.target, (connectionCounts.get(edge.target) || 0) + 1);
    });

    nodes.forEach(node => {
      node.connections = connectionCounts.get(node.id) || 0;
    });

    // Calculate efficiency
    const totalNodes = nodes.length;
    const actualConnections = edges.length;
    const perfectMatches = edges.filter(e => e.metadata?.aiPriority?.includes('Perfect')).length;
    const multiHopConnections = edges.filter(e => e.metadata?.multiHop).length;
    const activeNodes = nodes.filter(n => n.isActive).length;
    
    const efficiency = Math.min(
      (actualConnections / (totalNodes * 1.5)) * 0.3 + 
      (perfectMatches / Math.max(actualConnections, 1)) * 0.3 + 
      (activeNodes / totalNodes) * 0.4, 
      1
    );

    const endTime = performance.now();
    const companyCount = nodes.filter(n => n.type === 'company').length;
    
    console.log(`✅ CONTROLLED Network Generated in ${Math.round(endTime - startTime)}ms:`);
    console.log(`   Companies: ${companyCount}`);
    console.log(`   Total Connections: ${actualConnections} (CONTROLLED!)`);
    console.log(`   Perfect Matches: ${perfectMatches}`);
    console.log(`   Multi-hop Connections: ${multiHopConnections}`);
    console.log(`   Network Efficiency: ${Math.round(efficiency * 100)}%`);
    console.log(`   Avg Connections per Company: ${Math.round((actualConnections / companyCount) * 100) / 100}`);

    return {
      nodes,
      edges,
      efficiency,
      timestamp: Date.now()
    };
  }

  private getRegion(location: string): string {
    const gulfCities = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'Kuwait City', 'Manama', 'Muscat'];
    const europeanCities = ['London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Brussels', 'Stockholm', 'Oslo', 'Helsinki'];
    
    if (gulfCities.some(city => location.includes(city))) return 'Gulf';
    if (europeanCities.some(city => location.includes(city))) return 'Europe';
    return 'Other';
  }

  private calculateCO2Potential(company: CompanyData): string {
    let baseCO2 = company.volume * 0.18;
    
    if (company.industry.includes('Oil & Gas')) baseCO2 *= 1.6;
    if (company.industry.includes('Petrochemicals')) baseCO2 *= 1.4;
    if (company.industry.includes('Power Generation')) baseCO2 *= 1.5;
    if (company.industry.includes('Manufacturing')) baseCO2 *= 1.2;
    if (company.industry.includes('Hospital')) baseCO2 *= 1.1;
    
    return `${Math.round(baseCO2).toLocaleString()} tons/year potential reduction`;
  }

  private calculateCostSavings(company: CompanyData): string {
    let baseSavings = company.volume * 0.15;
    
    if (company.industry.includes('Oil & Gas')) baseSavings *= 1.5;
    if (company.industry.includes('Petrochemicals')) baseSavings *= 1.3;
    if (company.industry.includes('Manufacturing')) baseSavings *= 1.2;
    if (company.industry.includes('Electronics')) baseSavings *= 1.4;
    if (company.industry.includes('Hospital')) baseSavings *= 1.25;
    
    return `€${Math.round(baseSavings).toLocaleString()}/year potential`;
  }
}
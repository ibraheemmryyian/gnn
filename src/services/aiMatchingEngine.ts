// Optimized AI Matching Engine - High Performance & Enhanced Accuracy

interface Company {
  [key: string]: string;
}

interface SymbioticConnection {
  producer_name: string;
  producer_industry: string;
  consumer_name: string;
  consumer_industry: string;
  symbiotic_material: string;
  waste_type: string;
  match_type: string;
  confidence_score: number;
  geographic_bonus?: number;
  industry_synergy?: number;
}

interface MaterialCategory {
  category: string;
  materials: string[];
  processing_methods?: string[];
  end_uses?: string[];
  compatibility_score?: number;
}

// Optimized material categories with Gulf region specifics
function createOptimizedMaterialCategories(): MaterialCategory[] {
  return [
    {
      category: "petrochemicals",
      materials: ["crude oil", "natural gas", "petroleum", "petrochemicals", "hydrocarbons", "oil refinery waste", "gas condensate", "naphtha", "benzene", "ethylene", "propylene"],
      processing_methods: ["refining", "cracking", "distillation", "separation"],
      end_uses: ["fuel", "plastics", "chemicals", "energy"],
      compatibility_score: 0.95
    },
    {
      category: "metals_advanced",
      materials: ["aluminum", "steel", "copper", "titanium", "nickel", "zinc", "lead", "precious metals", "rare earth metals", "metal alloys", "scrap metal", "metal shavings"],
      processing_methods: ["smelting", "refining", "alloying", "casting"],
      end_uses: ["construction", "automotive", "aerospace", "electronics"],
      compatibility_score: 0.92
    },
    {
      category: "plastics_polymers_advanced",
      materials: ["polyethylene", "polypropylene", "pvc", "pet", "hdpe", "ldpe", "abs", "polystyrene", "plastic waste", "polymer waste", "packaging materials"],
      processing_methods: ["injection molding", "extrusion", "blow molding", "recycling"],
      end_uses: ["packaging", "automotive", "construction", "electronics"],
      compatibility_score: 0.88
    },
    {
      category: "organic_waste_enhanced",
      materials: ["food waste", "agricultural waste", "biomass", "organic matter", "food scraps", "crop residues", "animal waste", "palm oil waste", "date palm waste"],
      processing_methods: ["composting", "anaerobic digestion", "fermentation", "biogas production"],
      end_uses: ["fertilizer", "biogas", "biofuel", "soil amendment"],
      compatibility_score: 0.85
    },
    {
      category: "construction_materials_gulf",
      materials: ["concrete", "cement", "sand", "gravel", "limestone", "gypsum", "construction waste", "demolition debris", "building materials"],
      processing_methods: ["crushing", "screening", "mixing", "curing"],
      end_uses: ["construction", "infrastructure", "road building"],
      compatibility_score: 0.82
    },
    {
      category: "water_wastewater_advanced",
      materials: ["wastewater", "industrial water", "cooling water", "process water", "brine", "desalination waste", "produced water"],
      processing_methods: ["treatment", "filtration", "reverse osmosis", "desalination"],
      end_uses: ["irrigation", "industrial use", "cooling", "process water"],
      compatibility_score: 0.90
    },
    {
      category: "energy_thermal",
      materials: ["waste heat", "steam", "hot water", "thermal energy", "exhaust gases", "flue gases"],
      processing_methods: ["heat recovery", "cogeneration", "heat exchange"],
      end_uses: ["heating", "power generation", "process heat"],
      compatibility_score: 0.87
    },
    {
      category: "chemicals_solvents",
      materials: ["solvents", "acids", "bases", "catalysts", "chemical waste", "process chemicals", "cleaning agents"],
      processing_methods: ["distillation", "purification", "neutralization"],
      end_uses: ["manufacturing", "cleaning", "processing"],
      compatibility_score: 0.83
    }
  ];
}

// Optimized geographic proximity calculator
function calculateGeographicBonus(location1: string, location2: string): number {
  const gulfRegions = {
    "UAE": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"],
    "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Khobar", "Jubail"],
    "Qatar": ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
    "Kuwait": ["Kuwait City", "Hawalli", "Ahmadi", "Jahra"],
    "Bahrain": ["Manama", "Riffa", "Muharraq", "Hamad Town"],
    "Oman": ["Muscat", "Salalah", "Nizwa", "Sur", "Sohar"],
    "Europe": ["London", "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Vienna", "Brussels", "Stockholm", "Oslo", "Helsinki", "Dublin", "Warsaw", "Prague", "Budapest", "Lisbon", "Athens", "Zagreb", "Ljubljana", "Luxembourg City", "Vilnius", "Tallinn", "Sofia", "Bucharest", "Copenhagen", "Brno"]
  };

  // Same city = highest bonus
  if (location1 === location2) return 0.3;

  // Find regions for both locations
  let region1 = null, region2 = null;
  for (const [region, cities] of Object.entries(gulfRegions)) {
    if (cities.some(city => location1.includes(city))) region1 = region;
    if (cities.some(city => location2.includes(city))) region2 = region;
  }

  // Same region = high bonus
  if (region1 && region2 && region1 === region2) return 0.2;

  // Both in Gulf = medium bonus
  if (region1 && region2 && !["Europe"].includes(region1) && !["Europe"].includes(region2)) return 0.15;

  // Both in Europe = medium bonus
  if (region1 === "Europe" && region2 === "Europe") return 0.1;

  // Cross-region = small bonus
  return 0.05;
}

// Optimized industry synergy calculator
function calculateIndustrySynergy(industry1: string, industry2: string): number {
  const synergyMatrix = {
    "Oil & Gas": { "Petrochemicals": 0.95, "Power Generation": 0.85, "Manufacturing": 0.75 },
    "Petrochemicals": { "Plastics": 0.90, "Chemicals": 0.85, "Manufacturing": 0.80 },
    "Manufacturing": { "Recycling": 0.85, "Logistics": 0.75, "Construction": 0.70 },
    "Power Generation": { "Water Treatment": 0.80, "Manufacturing": 0.75, "Desalination": 0.85 },
    "Water Treatment": { "Agriculture": 0.90, "Manufacturing": 0.80, "Municipal": 0.85 },
    "Construction": { "Cement": 0.95, "Steel": 0.90, "Aggregates": 0.85 },
    "Food Processing": { "Agriculture": 0.95, "Packaging": 0.85, "Waste Management": 0.80 },
    "Electronics": { "Metals": 0.85, "Plastics": 0.80, "Recycling": 0.90 },
    "Textiles": { "Chemicals": 0.80, "Water Treatment": 0.75, "Recycling": 0.85 },
    "Automotive": { "Metals": 0.90, "Plastics": 0.85, "Electronics": 0.80 }
  };

  // Direct lookup
  if (synergyMatrix[industry1]?.[industry2]) {
    return synergyMatrix[industry1][industry2];
  }
  if (synergyMatrix[industry2]?.[industry1]) {
    return synergyMatrix[industry2][industry1];
  }

  // Fuzzy matching for partial industry names
  for (const [key1, synergies] of Object.entries(synergyMatrix)) {
    if (industry1.includes(key1) || key1.includes(industry1)) {
      for (const [key2, score] of Object.entries(synergies)) {
        if (industry2.includes(key2) || key2.includes(industry2)) {
          return score;
        }
      }
    }
  }

  return 0.5; // Default synergy
}

// High-performance material extraction with caching
const materialCache = new Map<string, Set<string>>();

function extractMaterialsOptimized(text: string): Set<string> {
  if (materialCache.has(text)) {
    return materialCache.get(text)!;
  }

  const materials = new Set<string>();
  if (!text) return materials;

  const cleanText = text.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Split by delimiters and process
  const parts = cleanText.split(/[,;|&+\n→]/).map(part => part.trim());
  
  for (const part of parts) {
    if (part.length > 2) {
      materials.add(part);
      
      // Add key terms for better matching
      const words = part.split(/\s+/);
      for (const word of words) {
        if (word.length > 3) {
          materials.add(word);
        }
      }
    }
  }

  materialCache.set(text, materials);
  return materials;
}

// Optimized matching algorithm with performance improvements
class OptimizedAIMatchingEngine {
  private materialCategories: MaterialCategory[];
  private materialToCategory: Map<string, string>;
  private categoryCompatibility: Map<string, Map<string, number>>;

  constructor() {
    this.materialCategories = createOptimizedMaterialCategories();
    this.materialToCategory = new Map();
    this.categoryCompatibility = new Map();
    this.initializeMappings();
  }

  private initializeMappings(): void {
    // Build material to category mapping
    for (const category of this.materialCategories) {
      for (const material of category.materials) {
        this.materialToCategory.set(material.toLowerCase(), category.category);
      }
      
      if (category.processing_methods) {
        for (const method of category.processing_methods) {
          this.materialToCategory.set(method.toLowerCase(), category.category);
        }
      }
      
      if (category.end_uses) {
        for (const use of category.end_uses) {
          this.materialToCategory.set(use.toLowerCase(), category.category);
        }
      }
    }

    // Build category compatibility matrix
    for (const cat1 of this.materialCategories) {
      const compatMap = new Map<string, number>();
      for (const cat2 of this.materialCategories) {
        if (cat1.category === cat2.category) {
          compatMap.set(cat2.category, 1.0);
        } else {
          // Calculate compatibility based on category scores
          const avgScore = ((cat1.compatibility_score || 0.5) + (cat2.compatibility_score || 0.5)) / 2;
          compatMap.set(cat2.category, avgScore * 0.8); // Cross-category penalty
        }
      }
      this.categoryCompatibility.set(cat1.category, compatMap);
    }
  }

  private findOptimizedMatches(wasteTerms: Set<string>, materialTerms: Set<string>): Array<{material: string, matchType: string, confidence: number}> {
    const matches: Array<{material: string, matchType: string, confidence: number}> = [];
    const processedPairs = new Set<string>();

    // Direct matches (highest priority)
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        const pairKey = `${waste}-${material}`;
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        if (waste === material) {
          matches.push({
            material: waste,
            matchType: 'direct',
            confidence: 0.98
          });
        }
      }
    }

    // Category matches (high priority)
    for (const waste of wasteTerms) {
      const wasteCategory = this.materialToCategory.get(waste);
      if (!wasteCategory) continue;

      for (const material of materialTerms) {
        const materialCategory = this.materialToCategory.get(material);
        if (!materialCategory) continue;

        const compatibility = this.categoryCompatibility.get(wasteCategory)?.get(materialCategory) || 0.5;
        if (compatibility > 0.7) {
          matches.push({
            material: `${waste} → ${material}`,
            matchType: 'category',
            confidence: compatibility * 0.9
          });
        }
      }
    }

    // Substring matches (medium priority)
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        if (waste.length > 4 && material.length > 4) {
          if (waste.includes(material) || material.includes(waste)) {
            const similarity = Math.min(waste.length, material.length) / Math.max(waste.length, material.length);
            if (similarity > 0.6) {
              matches.push({
                material: `${waste} ≈ ${material}`,
                matchType: 'processed',
                confidence: 0.7 + (similarity * 0.2)
              });
            }
          }
        }
      }
    }

    // Sort by confidence and return top matches
    return matches
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5); // Limit to top 5 matches per company pair
  }

  public parseCompanyData(data: string): Company[] {
    const companies: Company[] = [];
    const companyBlocks = data.trim().split(/\n\s*\n/);

    for (const block of companyBlocks) {
      const company: Company = {};
      const lines = block.split('\n');
      
      for (const line of lines) {
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(': ');
          const value = valueParts.join(': ');
          company[key.trim()] = value.trim();
        }
      }
      
      if (company.Name) {
        companies.push(company);
      }
    }
    
    return companies;
  }

  public identifySymbioticConnections(companies: Company[]): SymbioticConnection[] {
    const connections: SymbioticConnection[] = [];
    const processedPairs = new Set<string>();

    // Limit processing for performance (process in batches)
    const maxConnections = Math.min(companies.length * 3, 500); // Limit total connections
    let connectionCount = 0;

    for (let i = 0; i < companies.length && connectionCount < maxConnections; i++) {
      const producer = companies[i];
      if (!producer.Materials && !producer.Products) continue;

      // Create waste materials from products (what they produce can be waste for others)
      const wasteTerms = extractMaterialsOptimized(
        (producer.Products || '') + ' ' + (producer.Materials || '')
      );

      for (let j = i + 1; j < companies.length && connectionCount < maxConnections; j++) {
        const consumer = companies[j];
        if (!consumer.Materials) continue;

        const pairKey = `${producer.Name}-${consumer.Name}`;
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        const materialTerms = extractMaterialsOptimized(consumer.Materials);
        const matches = this.findOptimizedMatches(wasteTerms, materialTerms);

        for (const match of matches) {
          if (connectionCount >= maxConnections) break;

          // Calculate bonuses
          const geoBonus = calculateGeographicBonus(
            producer.Location || '',
            consumer.Location || ''
          );
          
          const industryBonus = calculateIndustrySynergy(
            producer.Industry || '',
            consumer.Industry || ''
          );

          // Final confidence with bonuses
          const finalConfidence = Math.min(
            match.confidence + geoBonus + (industryBonus * 0.1),
            1.0
          );

          // Only include high-quality matches
          if (finalConfidence > 0.6) {
            connections.push({
              producer_name: producer.Name || '',
              producer_industry: producer.Industry || '',
              consumer_name: consumer.Name || '',
              consumer_industry: consumer.Industry || '',
              symbiotic_material: match.material,
              waste_type: this.extractWasteType(producer.Volume || ''),
              match_type: match.matchType,
              confidence_score: finalConfidence,
              geographic_bonus: geoBonus,
              industry_synergy: industryBonus
            });
            connectionCount++;
          }
        }
      }
    }

    // Return top connections sorted by confidence
    return connections
      .sort((a, b) => b.confidence_score - a.confidence_score)
      .slice(0, Math.min(200, connections.length)); // Limit final output
  }

  private extractWasteType(volume: string): string {
    const volumeParts = volume.split(' of ');
    return volumeParts.length > 1 
      ? volumeParts[1].replace(/\n/g, '').toLowerCase()
      : 'general';
  }

  public async predictOptimalConnections(companies: Company[]): Promise<SymbioticConnection[]> {
    if (!companies || companies.length < 2) {
      return [];
    }

    console.log(`🚀 Processing ${companies.length} companies with optimized AI matching...`);
    
    const startTime = performance.now();
    const connections = this.identifySymbioticConnections(companies);
    const endTime = performance.now();
    
    console.log(`✅ Generated ${connections.length} connections in ${Math.round(endTime - startTime)}ms`);
    
    return connections;
  }

  public getMatchingStats(connections: SymbioticConnection[]): {
    byIndustry: { [key: string]: number };
    byMaterial: { [key: string]: number };
    byConfidence: { [key: string]: number };
    byRegion: { [key: string]: number };
  } {
    const byIndustry: { [key: string]: number } = {};
    const byMaterial: { [key: string]: number } = {};
    const byConfidence: { [key: string]: number } = {};
    const byRegion: { [key: string]: number } = {};

    for (const conn of connections) {
      // Industry stats
      const industryPair = `${conn.producer_industry} → ${conn.consumer_industry}`;
      byIndustry[industryPair] = (byIndustry[industryPair] || 0) + 1;
      
      // Material stats
      byMaterial[conn.symbiotic_material] = (byMaterial[conn.symbiotic_material] || 0) + 1;
      
      // Confidence stats
      const confidenceRange = conn.confidence_score >= 0.9 ? 'excellent' : 
                             conn.confidence_score >= 0.8 ? 'high' : 
                             conn.confidence_score >= 0.7 ? 'medium' : 'low';
      byConfidence[confidenceRange] = (byConfidence[confidenceRange] || 0) + 1;

      // Region stats (simplified)
      const region = conn.geographic_bonus > 0.15 ? 'gulf_region' : 
                    conn.geographic_bonus > 0.05 ? 'same_region' : 'cross_region';
      byRegion[region] = (byRegion[region] || 0) + 1;
    }

    return { byIndustry, byMaterial, byConfidence, byRegion };
  }
}

// Export optimized engine
export {
  OptimizedAIMatchingEngine as AIMatchingEngine,
  Company,
  SymbioticConnection,
  MaterialCategory
};

export default OptimizedAIMatchingEngine;
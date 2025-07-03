// Removed fs import for browser compatibility

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
  match_type: string; // 'direct', 'category', 'processed', 'energy'
  confidence_score: number; // 0-1 scale
}

interface IndustryConnectionCount {
  [key: string]: number;
}

interface MaterialCategory {
  category: string;
  materials: string[];
  processing_methods?: string[];
  end_uses?: string[];
}

function parseCompanyData(data: string): Company[] {
  const companies: Company[] = [];
  const companyBlocks = data.trim().split("\n\n");

  for (const block of companyBlocks) {
    const company: Company = {};
    const lines = block.split("\n");
    
    for (const line of lines) {
      if (line.includes(":")) {
        const [key, ...valueParts] = line.split(": ");
        const value = valueParts.join(": ");
        company[key.trim()] = value.trim();
      }
    }
    companies.push(company);
  }
  
  return companies;
}

function createMaterialCategories(): MaterialCategory[] {
  return [
    {
      category: "metals",
      materials: ["metal", "steel", "aluminum", "copper", "iron", "brass", "bronze", "zinc", "lead", "tin", "scrap metal", "metal scraps", "aluminum offcuts", "steel shavings", "copper wire", "vehicle parts", "containers", "raw metals", "pipelines", "catalysts"],
      processing_methods: ["melting", "smelting", "recycling", "refining", "processing"],
      end_uses: ["construction", "manufacturing", "automotive", "infrastructure", "packaging"]
    },
    {
      category: "plastics_polymers",
      materials: ["plastic", "polymers", "polyethylene", "polypropylene", "pvc", "pet", "hdpe", "ldpe", "plastic wraps", "single-use plastics", "water bottles", "packaging films", "off-spec products", "edge trims", "molding waste", "syringes", "iv bags", "gloves", "sterile packaging", "packaging materials"],
      processing_methods: ["melting", "shredding", "granulation", "reprocessing", "chemical recycling"],
      end_uses: ["packaging", "manufacturing", "construction", "automotive", "textiles"]
    },
    {
      category: "organic_waste",
      materials: ["food scraps", "garden waste", "coffee grounds", "food processing waste", "agricultural produce", "food waste", "organic waste", "food & beverages", "biomass"],
      processing_methods: ["composting", "anaerobic digestion", "fermentation", "biogas production"],
      end_uses: ["fertilizer", "soil amendment", "biogas", "energy", "animal feed"]
    },
    {
      category: "paper_cardboard",
      materials: ["paper", "cardboard", "newspapers", "magazines", "cardboard boxes", "office waste", "paper products", "packaging materials"],
      processing_methods: ["pulping", "deinking", "recycling", "processing"],
      end_uses: ["packaging", "printing", "construction", "insulation"]
    },
    {
      category: "wood_biomass",
      materials: ["wood", "wood scraps", "wooden pallets", "timber", "sawdust", "wood chips", "biomass"],
      processing_methods: ["chipping", "grinding", "gasification", "pyrolysis", "burning"],
      end_uses: ["fuel", "energy", "construction", "manufacturing", "landscaping"]
    },
    {
      category: "glass",
      materials: ["glass", "bottles", "jars", "recycled glass", "window glass", "container glass"],
      processing_methods: ["crushing", "melting", "reforming", "recycling"],
      end_uses: ["containers", "construction", "manufacturing", "aggregates"]
    },
    {
      category: "construction_materials",
      materials: ["concrete", "concrete rubble", "bricks", "tiles", "construction waste", "aggregate", "sand", "gravel", "plasterboard", "asphalt", "demolition waste"],
      processing_methods: ["crushing", "sorting", "screening", "processing"],
      end_uses: ["construction", "road base", "concrete production", "landscaping"]
    },
    {
      category: "textiles",
      materials: ["textile", "fabric", "clothing", "textile offcuts", "fabrics", "linens", "cotton", "polyester", "wool"],
      processing_methods: ["shredding", "cutting", "sorting", "cleaning"],
      end_uses: ["insulation", "stuffing", "rags", "new textiles", "automotive"]
    },
    {
      category: "chemicals",
      materials: ["chemicals", "solvents", "acids", "alkalis", "process chemicals", "spent solvents", "lubricants", "adhesives", "cleaning agents", "lab reagents", "cleaning supplies", "chemical coagulants", "disinfectants"],
      processing_methods: ["distillation", "purification", "neutralization", "treatment"],
      end_uses: ["manufacturing", "processing", "cleaning", "treatment"]
    },
    {
      category: "oils_petroleum",
      materials: ["oil", "petroleum", "engine oil", "hydraulic fluid", "used oil", "lubricants", "hydrocarbons", "fuel", "diesel", "gasoline"],
      processing_methods: ["refining", "re-refining", "filtering", "distillation"],
      end_uses: ["fuel", "lubricants", "energy", "heating", "manufacturing"]
    },
    {
      category: "water_wastewater",
      materials: ["water", "wastewater", "raw water", "treated water", "process water", "cooling water", "brine", "produced water"],
      processing_methods: ["treatment", "filtration", "purification", "recycling"],
      end_uses: ["process water", "irrigation", "cooling", "cleaning"]
    },
    {
      category: "energy",
      materials: ["energy", "electricity", "heat", "steam", "biogas", "fuel"],
      processing_methods: ["generation", "conversion", "distribution"],
      end_uses: ["power", "heating", "process energy", "manufacturing"]
    },
    {
      category: "rubber",
      materials: ["rubber", "tyres", "used vehicle tyres", "rubber scraps", "rubber products"],
      processing_methods: ["shredding", "granulation", "devulcanization", "pyrolysis"],
      end_uses: ["fuel", "rubber products", "playground surfaces", "road construction"]
    },
    {
      category: "sludge_residues",
      materials: ["sludge", "dewatered sludge cake", "biosolids", "chemical sludge", "drilling mud", "tank bottom sludge", "oily water treatment sludge"],
      processing_methods: ["dewatering", "composting", "incineration", "stabilization"],
      end_uses: ["fertilizer", "soil amendment", "energy", "landfill cover"]
    },
    {
      category: "filter_media",
      materials: ["filter media", "spent activated carbon", "sand filter media", "filtration media", "used filters"],
      processing_methods: ["regeneration", "cleaning", "replacement", "processing"],
      end_uses: ["filtration", "water treatment", "air purification", "aggregate"]
    }
  ];
}

function identifySymbioticConnections(companies: Company[]): SymbioticConnection[] {
  const connections: SymbioticConnection[] = [];
  const materialCategories = createMaterialCategories();
  
  // Create comprehensive mapping of materials to categories
  const materialToCategory = new Map<string, string>();
  const categoryMaterials = new Map<string, Set<string>>();
  
  for (const category of materialCategories) {
    categoryMaterials.set(category.category, new Set());
    for (const material of category.materials) {
      materialToCategory.set(material.toLowerCase(), category.category);
      categoryMaterials.get(category.category)!.add(material.toLowerCase());
    }
    
    // Add processing methods as potential materials
    if (category.processing_methods) {
      for (const method of category.processing_methods) {
        materialToCategory.set(method.toLowerCase(), category.category);
        categoryMaterials.get(category.category)!.add(method.toLowerCase());
      }
    }
    
    // Add end uses as potential materials
    if (category.end_uses) {
      for (const use of category.end_uses) {
        materialToCategory.set(use.toLowerCase(), category.category);
        categoryMaterials.get(category.category)!.add(use.toLowerCase());
      }
    }
  }

  // Enhanced material extraction and normalization
  function extractMaterials(text: string): Set<string> {
    const materials = new Set<string>();
    const cleanText = text.toLowerCase()
      .replace(/[()]/g, '') // Remove parentheses
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Split by various delimiters
    const parts = cleanText.split(/[,;|&+\n]/).map(part => part.trim());
    
    for (const part of parts) {
      if (part.length > 0) {
        materials.add(part);
        
        // Also add individual words for better matching
        const words = part.split(/\s+/);
        for (const word of words) {
          if (word.length > 2) { // Ignore very short words
            materials.add(word);
          }
        }
      }
    }
    
    return materials;
  }

  // Function to calculate match confidence
  function calculateConfidence(matchType: string, producerMat: string, consumerMat: string): number {
    if (matchType === 'direct') return 1.0;
    if (matchType === 'category') return 0.8;
    if (matchType === 'processed') return 0.6;
    if (matchType === 'energy') return 0.4;
    
    // Adjust based on material specificity
    const avgLength = (producerMat.length + consumerMat.length) / 2;
    if (avgLength > 10) return Math.min(1.0, 0.8 + (avgLength - 10) * 0.02);
    
    return 0.5;
  }

  // Function to find matches between waste and materials
  function findMatches(wasteTerms: Set<string>, materialTerms: Set<string>): Array<{material: string, matchType: string, confidence: number}> {
    const matches: Array<{material: string, matchType: string, confidence: number}> = [];
    
    // Direct matches
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        if (waste === material) {
          matches.push({
            material: waste,
            matchType: 'direct',
            confidence: calculateConfidence('direct', waste, material)
          });
        }
      }
    }
    
    // Category matches
    for (const waste of wasteTerms) {
      const wasteCategory = materialToCategory.get(waste);
      if (wasteCategory) {
        for (const material of materialTerms) {
          const materialCategory = materialToCategory.get(material);
          if (materialCategory && wasteCategory === materialCategory) {
            matches.push({
              material: `${waste} -> ${material}`,
              matchType: 'category',
              confidence: calculateConfidence('category', waste, material)
            });
          }
        }
      }
    }
    
    // Substring matches (one contains the other)
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        if (waste.includes(material) || material.includes(waste)) {
          if (Math.abs(waste.length - material.length) <= 3) { // Similar length
            matches.push({
              material: `${waste} ≈ ${material}`,
              matchType: 'processed',
              confidence: calculateConfidence('processed', waste, material)
            });
          }
        }
      }
    }
    
    // Energy potential matches
    const energyMaterials = ['biomass', 'wood', 'organic', 'waste', 'oil', 'gas', 'fuel'];
    for (const waste of wasteTerms) {
      if (energyMaterials.some(em => waste.includes(em))) {
        for (const material of materialTerms) {
          if (material.includes('energy') || material.includes('fuel') || material.includes('power')) {
            matches.push({
              material: `${waste} -> energy`,
              matchType: 'energy',
              confidence: calculateConfidence('energy', waste, material)
            });
          }
        }
      }
    }
    
    return matches;
  }

  // Main matching logic
  for (const producer of companies) {
    if (!producer["Waste Materials"]) continue;
    
    const producerWasteTerms = extractMaterials(producer["Waste Materials"]);
    
    for (const consumer of companies) {
      if (producer === consumer || !consumer["Materials"]) continue;
      
      const consumerMaterialTerms = extractMaterials(consumer["Materials"]);
      const matches = findMatches(producerWasteTerms, consumerMaterialTerms);
      
      for (const match of matches) {
        const volumeParts = producer["Volume"]?.split(" of ");
        const wasteType = volumeParts && volumeParts.length > 1 
          ? volumeParts[1].replace(/\n/g, "").toLowerCase()
          : "general";
        
        connections.push({
          producer_name: producer["Name"] || "",
          producer_industry: producer["Industry"] || "",
          consumer_name: consumer["Name"] || "",
          consumer_industry: consumer["Industry"] || "",
          symbiotic_material: match.material,
          waste_type: wasteType,
          match_type: match.matchType,
          confidence_score: match.confidence
        });
      }
    }
  }
  
  // Remove duplicates and sort by confidence
  const uniqueConnections = connections.filter((conn, index, self) => 
    index === self.findIndex(c => 
      c.producer_name === conn.producer_name &&
      c.consumer_name === conn.consumer_name &&
      c.symbiotic_material === conn.symbiotic_material
    )
  ).sort((a, b) => b.confidence_score - a.confidence_score);
  
  return uniqueConnections;
}

// Browser-compatible version - removed Node.js main function

// Main AIMatchingEngine class
class AIMatchingEngine {
  private materialCategories: MaterialCategory[];
  private materialToCategory: Map<string, string>;
  private categoryMaterials: Map<string, Set<string>>;

  constructor() {
    this.materialCategories = this.createMaterialCategories();
    this.materialToCategory = new Map<string, string>();
    this.categoryMaterials = new Map<string, Set<string>>();
    this.initializeMaterialMappings();
  }

  private createMaterialCategories(): MaterialCategory[] {
    return createMaterialCategories();
  }

  private initializeMaterialMappings(): void {
    for (const category of this.materialCategories) {
      this.categoryMaterials.set(category.category, new Set());
      for (const material of category.materials) {
        this.materialToCategory.set(material.toLowerCase(), category.category);
        this.categoryMaterials.get(category.category)!.add(material.toLowerCase());
      }
      
      if (category.processing_methods) {
        for (const method of category.processing_methods) {
          this.materialToCategory.set(method.toLowerCase(), category.category);
          this.categoryMaterials.get(category.category)!.add(method.toLowerCase());
        }
      }
      
      if (category.end_uses) {
        for (const use of category.end_uses) {
          this.materialToCategory.set(use.toLowerCase(), category.category);
          this.categoryMaterials.get(category.category)!.add(use.toLowerCase());
        }
      }
    }
  }

  public parseCompanyData(data: string): Company[] {
    return parseCompanyData(data);
  }

  public identifySymbioticConnections(companies: Company[]): SymbioticConnection[] {
    return identifySymbioticConnections(companies);
  }

  public async processCompanies(data: string | File): Promise<{
    companies: Company[];
    connections: SymbioticConnection[];
    metrics: {
      totalCompanies: number;
      totalConnections: number;
      efficiency: number;
      connectionDensity: number;
      matchTypeDistribution: { [key: string]: number };
      confidenceDistribution: {
        high: number;
        medium: number;
        low: number;
      };
    };
  }> {
    try {
      let companyDataRaw: string;
      
      if (typeof data === 'string') {
        // If it's already a string, use it directly
        companyDataRaw = data;
      } else if (data instanceof File) {
        // If it's a File object (browser), read it
        companyDataRaw = await data.text();
      } else {
        throw new Error("Invalid data type. Expected string or File object.");
      }

      const companies = this.parseCompanyData(companyDataRaw);
      const connections = this.identifySymbioticConnections(companies);

      // Calculate metrics
      const potentialProducers = companies.filter(c => c["Waste Materials"]).length;
      const potentialConsumers = companies.filter(c => c["Materials"]).length;
      const efficiency = potentialProducers > 0 && potentialConsumers > 0 
        ? (connections.length / (potentialProducers * potentialConsumers)) * 100 
        : 0;
      
      const maxPossibleConnections = companies.length * (companies.length - 1);
      const connectionDensity = maxPossibleConnections > 0 
        ? connections.length / maxPossibleConnections 
        : 0;

      const matchTypeDistribution: { [key: string]: number } = {};
      for (const conn of connections) {
        matchTypeDistribution[conn.match_type] = (matchTypeDistribution[conn.match_type] || 0) + 1;
      }

      const confidenceDistribution = {
        high: connections.filter(c => c.confidence_score >= 0.8).length,
        medium: connections.filter(c => c.confidence_score >= 0.6 && c.confidence_score < 0.8).length,
        low: connections.filter(c => c.confidence_score < 0.6).length
      };

      return {
        companies,
        connections,
        metrics: {
          totalCompanies: companies.length,
          totalConnections: connections.length,
          efficiency,
          connectionDensity,
          matchTypeDistribution,
          confidenceDistribution
        }
      };
    } catch (error) {
      console.error("Error processing companies:", error);
      throw error;
    }
  }

  public getMatchingStats(connections: SymbioticConnection[]): {
    byIndustry: { [key: string]: number };
    byMaterial: { [key: string]: number };
    byConfidence: { [key: string]: number };
  } {
    const byIndustry: { [key: string]: number } = {};
    const byMaterial: { [key: string]: number } = {};
    const byConfidence: { [key: string]: number } = {};

    for (const conn of connections) {
      const industryPair = `${conn.producer_industry} -> ${conn.consumer_industry}`;
      byIndustry[industryPair] = (byIndustry[industryPair] || 0) + 1;
      
      byMaterial[conn.symbiotic_material] = (byMaterial[conn.symbiotic_material] || 0) + 1;
      
      const confidenceRange = conn.confidence_score >= 0.8 ? 'high' : 
                             conn.confidence_score >= 0.6 ? 'medium' : 'low';
      byConfidence[confidenceRange] = (byConfidence[confidenceRange] || 0) + 1;
    }

    return { byIndustry, byMaterial, byConfidence };
  }
}

// Export the class and interfaces
export {
  AIMatchingEngine,
  parseCompanyData,
  identifySymbioticConnections,
  Company,
  SymbioticConnection,
  MaterialCategory
};

// Default export for easier importing
export default AIMatchingEngine;
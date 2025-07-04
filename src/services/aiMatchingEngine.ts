// Enhanced AI Matching Engine with Multi-Hop Symbiosis - High Performance & Maximum Connections

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
  hop_count?: number;
  chain_partners?: string[];
}

interface MaterialCategory {
  category: string;
  materials: string[];
  processing_methods?: string[];
  end_uses?: string[];
  compatibility_score?: number;
}

interface MultiHopChain {
  companies: string[];
  materials: string[];
  totalConfidence: number;
  chainType: 'linear' | 'circular' | 'hub_spoke';
}

// Enhanced material categories with broader matching
function createEnhancedMaterialCategories(): MaterialCategory[] {
  return [
    {
      category: "petrochemicals_oil_gas",
      materials: ["crude oil", "natural gas", "petroleum", "petrochemicals", "hydrocarbons", "oil refinery waste", "gas condensate", "naphtha", "benzene", "ethylene", "propylene", "diesel", "gasoline", "fuel oil", "lubricants", "bitumen", "asphalt"],
      processing_methods: ["refining", "cracking", "distillation", "separation", "fractionation", "hydroprocessing"],
      end_uses: ["fuel", "plastics", "chemicals", "energy", "transportation", "heating"],
      compatibility_score: 0.95
    },
    {
      category: "metals_alloys_advanced",
      materials: ["aluminum", "steel", "copper", "titanium", "nickel", "zinc", "lead", "precious metals", "rare earth metals", "metal alloys", "scrap metal", "metal shavings", "iron", "brass", "bronze", "stainless steel", "carbon steel"],
      processing_methods: ["smelting", "refining", "alloying", "casting", "forging", "machining", "welding"],
      end_uses: ["construction", "automotive", "aerospace", "electronics", "infrastructure", "manufacturing"],
      compatibility_score: 0.92
    },
    {
      category: "plastics_polymers_comprehensive",
      materials: ["polyethylene", "polypropylene", "pvc", "pet", "hdpe", "ldpe", "abs", "polystyrene", "plastic waste", "polymer waste", "packaging materials", "plastic films", "bottles", "containers", "bags"],
      processing_methods: ["injection molding", "extrusion", "blow molding", "recycling", "shredding", "melting", "granulation"],
      end_uses: ["packaging", "automotive", "construction", "electronics", "consumer goods", "medical devices"],
      compatibility_score: 0.88
    },
    {
      category: "organic_biomass_comprehensive",
      materials: ["food waste", "agricultural waste", "biomass", "organic matter", "food scraps", "crop residues", "animal waste", "palm oil waste", "date palm waste", "wood waste", "paper waste", "cardboard", "garden waste"],
      processing_methods: ["composting", "anaerobic digestion", "fermentation", "biogas production", "pyrolysis", "gasification"],
      end_uses: ["fertilizer", "biogas", "biofuel", "soil amendment", "energy", "heat"],
      compatibility_score: 0.85
    },
    {
      category: "construction_materials_comprehensive",
      materials: ["concrete", "cement", "sand", "gravel", "limestone", "gypsum", "construction waste", "demolition debris", "building materials", "bricks", "tiles", "glass", "insulation", "drywall"],
      processing_methods: ["crushing", "screening", "mixing", "curing", "recycling", "sorting"],
      end_uses: ["construction", "infrastructure", "road building", "landscaping", "aggregates"],
      compatibility_score: 0.82
    },
    {
      category: "water_wastewater_comprehensive",
      materials: ["wastewater", "industrial water", "cooling water", "process water", "brine", "desalination waste", "produced water", "sewage", "greywater", "stormwater", "contaminated water"],
      processing_methods: ["treatment", "filtration", "reverse osmosis", "desalination", "purification", "disinfection"],
      end_uses: ["irrigation", "industrial use", "cooling", "process water", "potable water", "cleaning"],
      compatibility_score: 0.90
    },
    {
      category: "energy_thermal_comprehensive",
      materials: ["waste heat", "steam", "hot water", "thermal energy", "exhaust gases", "flue gases", "electricity", "biogas", "solar energy", "wind energy"],
      processing_methods: ["heat recovery", "cogeneration", "heat exchange", "power generation", "energy conversion"],
      end_uses: ["heating", "power generation", "process heat", "cooling", "electricity"],
      compatibility_score: 0.87
    },
    {
      category: "chemicals_solvents_comprehensive",
      materials: ["solvents", "acids", "bases", "catalysts", "chemical waste", "process chemicals", "cleaning agents", "pharmaceuticals", "laboratory chemicals", "industrial chemicals"],
      processing_methods: ["distillation", "purification", "neutralization", "separation", "extraction"],
      end_uses: ["manufacturing", "cleaning", "processing", "research", "production"],
      compatibility_score: 0.83
    },
    {
      category: "textiles_fibers",
      materials: ["cotton", "polyester", "wool", "fabric", "textile waste", "clothing", "fibers", "yarn", "thread"],
      processing_methods: ["spinning", "weaving", "dyeing", "cutting", "recycling"],
      end_uses: ["clothing", "upholstery", "insulation", "industrial textiles"],
      compatibility_score: 0.78
    },
    {
      category: "electronics_components",
      materials: ["circuit boards", "electronic components", "batteries", "cables", "semiconductors", "processors", "memory", "displays"],
      processing_methods: ["assembly", "testing", "recycling", "refurbishment", "dismantling"],
      end_uses: ["electronics", "computers", "telecommunications", "automotive electronics"],
      compatibility_score: 0.85
    }
  ];
}

// Enhanced geographic proximity with more regions
function calculateEnhancedGeographicBonus(location1: string, location2: string): number {
  const regions = {
    "UAE": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"],
    "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Khobar", "Jubail", "Yanbu"],
    "Qatar": ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
    "Kuwait": ["Kuwait City", "Hawalli", "Ahmadi", "Jahra"],
    "Bahrain": ["Manama", "Riffa", "Muharraq", "Hamad Town"],
    "Oman": ["Muscat", "Salalah", "Nizwa", "Sur", "Sohar"],
    "Western Europe": ["London", "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Vienna", "Brussels"],
    "Northern Europe": ["Stockholm", "Oslo", "Helsinki", "Copenhagen"],
    "Eastern Europe": ["Warsaw", "Prague", "Budapest", "Bucharest", "Sofia", "Zagreb", "Ljubljana"],
    "Southern Europe": ["Athens", "Lisbon"],
    "Other Europe": ["Dublin", "Luxembourg City", "Vilnius", "Tallinn", "Brno"]
  };

  // Same city = highest bonus
  if (location1 === location2) return 0.35;

  // Find regions for both locations
  let region1 = null, region2 = null;
  for (const [region, cities] of Object.entries(regions)) {
    if (cities.some(city => location1.includes(city))) region1 = region;
    if (cities.some(city => location2.includes(city))) region2 = region;
  }

  // Same region = high bonus
  if (region1 && region2 && region1 === region2) return 0.25;

  // Gulf regions = high bonus
  const gulfRegions = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"];
  if (region1 && region2 && gulfRegions.includes(region1) && gulfRegions.includes(region2)) return 0.20;

  // European regions = medium bonus
  const europeanRegions = ["Western Europe", "Northern Europe", "Eastern Europe", "Southern Europe", "Other Europe"];
  if (region1 && region2 && europeanRegions.includes(region1) && europeanRegions.includes(region2)) return 0.15;

  // Cross-region = small bonus
  return 0.08;
}

// Enhanced industry synergy with more combinations
function calculateEnhancedIndustrySynergy(industry1: string, industry2: string): number {
  const synergyMatrix = {
    "Oil & Gas": { 
      "Petrochemicals": 0.95, "Power Generation": 0.90, "Manufacturing": 0.80, 
      "Refining": 0.98, "Chemical": 0.85, "Energy": 0.92, "Transportation": 0.75
    },
    "Petrochemicals": { 
      "Plastics": 0.95, "Chemicals": 0.90, "Manufacturing": 0.85, "Oil & Gas": 0.95,
      "Polymers": 0.92, "Refining": 0.88, "Automotive": 0.80
    },
    "Manufacturing": { 
      "Recycling": 0.90, "Logistics": 0.80, "Construction": 0.75, "Automotive": 0.85,
      "Electronics": 0.82, "Textiles": 0.78, "Metals": 0.88
    },
    "Power Generation": { 
      "Water Treatment": 0.85, "Manufacturing": 0.80, "Desalination": 0.90,
      "Energy": 0.95, "Utilities": 0.92, "Industrial": 0.85
    },
    "Water Treatment": { 
      "Agriculture": 0.95, "Manufacturing": 0.85, "Municipal": 0.90,
      "Desalination": 0.92, "Industrial": 0.88, "Environmental": 0.85
    },
    "Construction": { 
      "Cement": 0.98, "Steel": 0.95, "Aggregates": 0.90, "Real Estate": 0.85,
      "Infrastructure": 0.92, "Building Materials": 0.95
    },
    "Food Processing": { 
      "Agriculture": 0.98, "Packaging": 0.90, "Waste Management": 0.85,
      "Retail": 0.80, "Logistics": 0.82, "Beverages": 0.92
    },
    "Electronics": { 
      "Metals": 0.90, "Plastics": 0.85, "Recycling": 0.95, "Technology": 0.95,
      "Semiconductors": 0.98, "Telecommunications": 0.90
    },
    "Textiles": { 
      "Chemicals": 0.85, "Water Treatment": 0.80, "Recycling": 0.90,
      "Fashion": 0.95, "Cotton": 0.92, "Synthetic": 0.88
    },
    "Automotive": { 
      "Metals": 0.95, "Plastics": 0.90, "Electronics": 0.85, "Manufacturing": 0.85,
      "Steel": 0.92, "Rubber": 0.88, "Glass": 0.80
    }
  };

  // Enhanced fuzzy matching
  for (const [key1, synergies] of Object.entries(synergyMatrix)) {
    if (industry1.toLowerCase().includes(key1.toLowerCase()) || key1.toLowerCase().includes(industry1.toLowerCase())) {
      for (const [key2, score] of Object.entries(synergies)) {
        if (industry2.toLowerCase().includes(key2.toLowerCase()) || key2.toLowerCase().includes(industry2.toLowerCase())) {
          return score;
        }
      }
    }
  }

  // Reverse lookup
  for (const [key1, synergies] of Object.entries(synergyMatrix)) {
    if (industry2.toLowerCase().includes(key1.toLowerCase()) || key1.toLowerCase().includes(industry2.toLowerCase())) {
      for (const [key2, score] of Object.entries(synergies)) {
        if (industry1.toLowerCase().includes(key2.toLowerCase()) || key2.toLowerCase().includes(industry1.toLowerCase())) {
          return score;
        }
      }
    }
  }

  return 0.6; // Higher default synergy
}

// Enhanced material extraction with broader terms
const materialCache = new Map<string, Set<string>>();

function extractMaterialsEnhanced(text: string): Set<string> {
  if (materialCache.has(text)) {
    return materialCache.get(text)!;
  }

  const materials = new Set<string>();
  if (!text) return materials;

  const cleanText = text.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Enhanced splitting with more delimiters
  const parts = cleanText.split(/[,;|&+\n→·•-]/).map(part => part.trim());
  
  for (const part of parts) {
    if (part.length > 1) {
      materials.add(part);
      
      // Add individual words and combinations
      const words = part.split(/\s+/);
      for (let i = 0; i < words.length; i++) {
        if (words[i].length > 2) {
          materials.add(words[i]);
        }
        // Add two-word combinations
        if (i < words.length - 1 && words[i].length > 2 && words[i + 1].length > 2) {
          materials.add(`${words[i]} ${words[i + 1]}`);
        }
      }
    }
  }

  materialCache.set(text, materials);
  return materials;
}

// Multi-hop symbiosis detection
class MultiHopSymbiosisEngine {
  private companies: Company[];
  private directConnections: Map<string, Set<string>>;
  private materialFlows: Map<string, Set<string>>;

  constructor(companies: Company[]) {
    this.companies = companies;
    this.directConnections = new Map();
    this.materialFlows = new Map();
    this.buildConnectionMaps();
  }

  private buildConnectionMaps(): void {
    for (const company of this.companies) {
      const companyName = company.Name;
      this.directConnections.set(companyName, new Set());
      this.materialFlows.set(companyName, new Set());

      // Extract materials and products
      const materials = extractMaterialsEnhanced(company.Materials || '');
      const products = extractMaterialsEnhanced(company.Products || '');

      materials.forEach(material => this.materialFlows.get(companyName)!.add(`input:${material}`));
      products.forEach(product => this.materialFlows.get(companyName)!.add(`output:${product}`));
    }
  }

  public findMultiHopChains(maxHops: number = 3): MultiHopChain[] {
    const chains: MultiHopChain[] = [];
    const visited = new Set<string>();

    for (const startCompany of this.companies) {
      if (visited.has(startCompany.Name)) continue;

      const foundChains = this.exploreChains(startCompany.Name, [], new Set(), maxHops);
      chains.push(...foundChains);
      
      // Mark companies in found chains as visited to avoid duplicates
      foundChains.forEach(chain => {
        chain.companies.forEach(company => visited.add(company));
      });
    }

    return chains.sort((a, b) => b.totalConfidence - a.totalConfidence);
  }

  private exploreChains(
    currentCompany: string, 
    currentChain: string[], 
    visitedInChain: Set<string>, 
    remainingHops: number
  ): MultiHopChain[] {
    if (remainingHops <= 0 || visitedInChain.has(currentCompany)) {
      return [];
    }

    const newChain = [...currentChain, currentCompany];
    const newVisited = new Set([...visitedInChain, currentCompany]);
    const chains: MultiHopChain[] = [];

    // If we have at least 2 companies, this could be a valid chain
    if (newChain.length >= 2) {
      const confidence = this.calculateChainConfidence(newChain);
      if (confidence > 0.5) {
        chains.push({
          companies: newChain,
          materials: this.extractChainMaterials(newChain),
          totalConfidence: confidence,
          chainType: this.determineChainType(newChain)
        });
      }
    }

    // Continue exploring if we have hops remaining
    if (remainingHops > 1) {
      const nextCompanies = this.findPotentialNextCompanies(currentCompany, newVisited);
      
      for (const nextCompany of nextCompanies.slice(0, 3)) { // Limit to top 3 for performance
        const subChains = this.exploreChains(nextCompany, newChain, newVisited, remainingHops - 1);
        chains.push(...subChains);
      }
    }

    return chains;
  }

  private findPotentialNextCompanies(currentCompany: string, visited: Set<string>): string[] {
    const currentOutputs = this.materialFlows.get(currentCompany) || new Set();
    const potentialNext: Array<{company: string, score: number}> = [];

    for (const company of this.companies) {
      if (visited.has(company.Name) || company.Name === currentCompany) continue;

      const companyInputs = this.materialFlows.get(company.Name) || new Set();
      let matchScore = 0;

      // Check for material flow matches
      for (const output of currentOutputs) {
        if (output.startsWith('output:')) {
          const material = output.substring(7);
          for (const input of companyInputs) {
            if (input.startsWith('input:')) {
              const inputMaterial = input.substring(6);
              if (this.materialsMatch(material, inputMaterial)) {
                matchScore += 0.8;
              }
            }
          }
        }
      }

      // Add geographic and industry bonuses
      const geoBonus = calculateEnhancedGeographicBonus(
        this.getCompanyLocation(currentCompany),
        this.getCompanyLocation(company.Name)
      );
      const industryBonus = calculateEnhancedIndustrySynergy(
        this.getCompanyIndustry(currentCompany),
        this.getCompanyIndustry(company.Name)
      );

      matchScore += geoBonus + (industryBonus * 0.3);

      if (matchScore > 0.3) {
        potentialNext.push({ company: company.Name, score: matchScore });
      }
    }

    return potentialNext
      .sort((a, b) => b.score - a.score)
      .map(item => item.company);
  }

  private materialsMatch(material1: string, material2: string): boolean {
    // Direct match
    if (material1 === material2) return true;
    
    // Substring match
    if (material1.includes(material2) || material2.includes(material1)) return true;
    
    // Category match (simplified)
    const categories = createEnhancedMaterialCategories();
    let cat1 = null, cat2 = null;
    
    for (const category of categories) {
      if (category.materials.some(m => material1.includes(m) || m.includes(material1))) {
        cat1 = category.category;
      }
      if (category.materials.some(m => material2.includes(m) || m.includes(material2))) {
        cat2 = category.category;
      }
    }
    
    return cat1 && cat2 && cat1 === cat2;
  }

  private calculateChainConfidence(chain: string[]): number {
    if (chain.length < 2) return 0;

    let totalConfidence = 0;
    for (let i = 0; i < chain.length - 1; i++) {
      const company1 = chain[i];
      const company2 = chain[i + 1];
      
      // Calculate pairwise confidence
      const geoBonus = calculateEnhancedGeographicBonus(
        this.getCompanyLocation(company1),
        this.getCompanyLocation(company2)
      );
      const industryBonus = calculateEnhancedIndustrySynergy(
        this.getCompanyIndustry(company1),
        this.getCompanyIndustry(company2)
      );
      
      const pairConfidence = 0.6 + geoBonus + (industryBonus * 0.2);
      totalConfidence += pairConfidence;
    }

    // Apply chain length bonus/penalty
    const lengthFactor = chain.length === 2 ? 1.0 : 
                        chain.length === 3 ? 0.9 : 
                        chain.length === 4 ? 0.8 : 0.7;

    return (totalConfidence / (chain.length - 1)) * lengthFactor;
  }

  private extractChainMaterials(chain: string[]): string[] {
    const materials: string[] = [];
    for (const companyName of chain) {
      const company = this.companies.find(c => c.Name === companyName);
      if (company) {
        const companyMaterials = extractMaterialsEnhanced(company.Materials || '');
        const companyProducts = extractMaterialsEnhanced(company.Products || '');
        materials.push(...Array.from(companyMaterials), ...Array.from(companyProducts));
      }
    }
    return [...new Set(materials)].slice(0, 5); // Limit for performance
  }

  private determineChainType(chain: string[]): 'linear' | 'circular' | 'hub_spoke' {
    if (chain.length <= 2) return 'linear';
    
    // Check if first and last companies could form a circle
    const firstCompany = chain[0];
    const lastCompany = chain[chain.length - 1];
    
    const firstOutputs = this.materialFlows.get(firstCompany) || new Set();
    const lastInputs = this.materialFlows.get(lastCompany) || new Set();
    
    for (const output of firstOutputs) {
      for (const input of lastInputs) {
        if (this.materialsMatch(
          output.startsWith('output:') ? output.substring(7) : output,
          input.startsWith('input:') ? input.substring(6) : input
        )) {
          return 'circular';
        }
      }
    }
    
    return 'linear';
  }

  private getCompanyLocation(companyName: string): string {
    const company = this.companies.find(c => c.Name === companyName);
    return company?.Location || '';
  }

  private getCompanyIndustry(companyName: string): string {
    const company = this.companies.find(c => c.Name === companyName);
    return company?.Industry || '';
  }
}

// Enhanced AI Matching Engine with Multi-Hop
class EnhancedAIMatchingEngine {
  private materialCategories: MaterialCategory[];
  private materialToCategory: Map<string, string>;
  private categoryCompatibility: Map<string, Map<string, number>>;

  constructor() {
    this.materialCategories = createEnhancedMaterialCategories();
    this.materialToCategory = new Map();
    this.categoryCompatibility = new Map();
    this.initializeMappings();
  }

  private initializeMappings(): void {
    // Build enhanced material to category mapping
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

    // Build enhanced category compatibility matrix
    for (const cat1 of this.materialCategories) {
      const compatMap = new Map<string, number>();
      for (const cat2 of this.materialCategories) {
        if (cat1.category === cat2.category) {
          compatMap.set(cat2.category, 1.0);
        } else {
          // Enhanced cross-category compatibility
          const avgScore = ((cat1.compatibility_score || 0.5) + (cat2.compatibility_score || 0.5)) / 2;
          let crossCompatibility = avgScore * 0.75; // Reduced penalty
          
          // Special cross-category bonuses
          if ((cat1.category.includes('petrochemicals') && cat2.category.includes('plastics')) ||
              (cat1.category.includes('metals') && cat2.category.includes('construction')) ||
              (cat1.category.includes('organic') && cat2.category.includes('energy'))) {
            crossCompatibility += 0.15;
          }
          
          compatMap.set(cat2.category, Math.min(crossCompatibility, 0.95));
        }
      }
      this.categoryCompatibility.set(cat1.category, compatMap);
    }
  }

  private findEnhancedMatches(wasteTerms: Set<string>, materialTerms: Set<string>): Array<{material: string, matchType: string, confidence: number}> {
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

    // Enhanced substring matching
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        if (waste.length > 3 && material.length > 3) {
          const similarity = this.calculateStringSimilarity(waste, material);
          if (similarity > 0.6) {
            matches.push({
              material: `${waste} ≈ ${material}`,
              matchType: 'substring',
              confidence: 0.75 + (similarity * 0.2)
            });
          }
        }
      }
    }

    // Enhanced category matches
    for (const waste of wasteTerms) {
      const wasteCategory = this.materialToCategory.get(waste);
      if (!wasteCategory) continue;

      for (const material of materialTerms) {
        const materialCategory = this.materialToCategory.get(material);
        if (!materialCategory) continue;

        const compatibility = this.categoryCompatibility.get(wasteCategory)?.get(materialCategory) || 0.5;
        if (compatibility > 0.6) { // Lowered threshold
          matches.push({
            material: `${waste} → ${material}`,
            matchType: 'category',
            confidence: compatibility * 0.95
          });
        }
      }
    }

    // Fuzzy matching for partial terms
    for (const waste of wasteTerms) {
      for (const material of materialTerms) {
        if (waste.length > 4 && material.length > 4) {
          const words1 = waste.split(' ');
          const words2 = material.split(' ');
          
          for (const word1 of words1) {
            for (const word2 of words2) {
              if (word1.length > 3 && word2.length > 3) {
                const similarity = this.calculateStringSimilarity(word1, word2);
                if (similarity > 0.7) {
                  matches.push({
                    material: `${word1} ≈ ${word2}`,
                    matchType: 'fuzzy',
                    confidence: 0.65 + (similarity * 0.15)
                  });
                }
              }
            }
          }
        }
      }
    }

    // Sort by confidence and return more matches
    return matches
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 8); // Increased from 5 to 8
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
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

    console.log(`🔄 Processing ${companies.length} companies for enhanced symbiosis matching...`);

    // Direct connections (company-to-company)
    for (let i = 0; i < companies.length; i++) {
      const producer = companies[i];
      if (!producer.Materials && !producer.Products) continue;

      const wasteTerms = extractMaterialsEnhanced(
        (producer.Products || '') + ' ' + (producer.Materials || '')
      );

      for (let j = 0; j < companies.length; j++) {
        if (i === j) continue;
        
        const consumer = companies[j];
        if (!consumer.Materials) continue;

        const pairKey = `${producer.Name}-${consumer.Name}`;
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        const materialTerms = extractMaterialsEnhanced(consumer.Materials);
        const matches = this.findEnhancedMatches(wasteTerms, materialTerms);

        for (const match of matches) {
          const geoBonus = calculateEnhancedGeographicBonus(
            producer.Location || '',
            consumer.Location || ''
          );
          
          const industryBonus = calculateEnhancedIndustrySynergy(
            producer.Industry || '',
            consumer.Industry || ''
          );

          const finalConfidence = Math.min(
            match.confidence + geoBonus + (industryBonus * 0.15),
            1.0
          );

          // Lowered threshold for more connections
          if (finalConfidence > 0.55) {
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
              industry_synergy: industryBonus,
              hop_count: 1
            });
          }
        }
      }
    }

    console.log(`✅ Found ${connections.length} direct connections`);

    // Multi-hop connections
    const multiHopEngine = new MultiHopSymbiosisEngine(companies);
    const multiHopChains = multiHopEngine.findMultiHopChains(3);

    console.log(`🔗 Found ${multiHopChains.length} multi-hop chains`);

    // Convert multi-hop chains to connections
    for (const chain of multiHopChains.slice(0, 50)) { // Limit for performance
      for (let i = 0; i < chain.companies.length - 1; i++) {
        const producer = companies.find(c => c.Name === chain.companies[i]);
        const consumer = companies.find(c => c.Name === chain.companies[i + 1]);
        
        if (producer && consumer) {
          const pairKey = `${producer.Name}-${consumer.Name}-multihop`;
          if (!processedPairs.has(pairKey)) {
            processedPairs.add(pairKey);
            
            connections.push({
              producer_name: producer.Name || '',
              producer_industry: producer.Industry || '',
              consumer_name: consumer.Name || '',
              consumer_industry: consumer.Industry || '',
              symbiotic_material: chain.materials.slice(0, 3).join(', '),
              waste_type: 'multi-hop',
              match_type: 'multi_hop',
              confidence_score: chain.totalConfidence,
              geographic_bonus: calculateEnhancedGeographicBonus(
                producer.Location || '',
                consumer.Location || ''
              ),
              industry_synergy: calculateEnhancedIndustrySynergy(
                producer.Industry || '',
                consumer.Industry || ''
              ),
              hop_count: chain.companies.length,
              chain_partners: chain.companies
            });
          }
        }
      }
    }

    console.log(`🎯 Total connections found: ${connections.length}`);

    // Return sorted connections with higher limit
    return connections
      .sort((a, b) => b.confidence_score - a.confidence_score)
      .slice(0, Math.min(800, connections.length)); // Increased limit significantly
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

    console.log(`🚀 Enhanced AI processing ${companies.length} companies with multi-hop analysis...`);
    
    const startTime = performance.now();
    const connections = this.identifySymbioticConnections(companies);
    const endTime = performance.now();
    
    console.log(`✅ Generated ${connections.length} enhanced connections in ${Math.round(endTime - startTime)}ms`);
    
    return connections;
  }

  public getMatchingStats(connections: SymbioticConnection[]): {
    byIndustry: { [key: string]: number };
    byMaterial: { [key: string]: number };
    byConfidence: { [key: string]: number };
    byRegion: { [key: string]: number };
    byHopCount: { [key: string]: number };
  } {
    const byIndustry: { [key: string]: number } = {};
    const byMaterial: { [key: string]: number } = {};
    const byConfidence: { [key: string]: number } = {};
    const byRegion: { [key: string]: number } = {};
    const byHopCount: { [key: string]: number } = {};

    for (const conn of connections) {
      // Industry stats
      const industryPair = `${conn.producer_industry} → ${conn.consumer_industry}`;
      byIndustry[industryPair] = (byIndustry[industryPair] || 0) + 1;
      
      // Material stats
      byMaterial[conn.symbiotic_material] = (byMaterial[conn.symbiotic_material] || 0) + 1;
      
      // Confidence stats
      const confidenceRange = conn.confidence_score >= 0.9 ? 'excellent' : 
                             conn.confidence_score >= 0.8 ? 'high' : 
                             conn.confidence_score >= 0.7 ? 'medium' : 
                             conn.confidence_score >= 0.6 ? 'good' : 'fair';
      byConfidence[confidenceRange] = (byConfidence[confidenceRange] || 0) + 1;

      // Region stats
      const region = (conn.geographic_bonus || 0) > 0.2 ? 'gulf_region' : 
                    (conn.geographic_bonus || 0) > 0.1 ? 'same_region' : 'cross_region';
      byRegion[region] = (byRegion[region] || 0) + 1;

      // Hop count stats
      const hopCount = conn.hop_count || 1;
      const hopKey = hopCount === 1 ? 'direct' : `${hopCount}_hop`;
      byHopCount[hopKey] = (byHopCount[hopKey] || 0) + 1;
    }

    return { byIndustry, byMaterial, byConfidence, byRegion, byHopCount };
  }
}

// Export enhanced engine
export {
  EnhancedAIMatchingEngine as AIMatchingEngine,
  Company,
  SymbioticConnection,
  MaterialCategory,
  MultiHopChain
};

export default EnhancedAIMatchingEngine;
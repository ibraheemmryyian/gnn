import * as fs from 'fs';

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
}

interface IndustryConnectionCount {
  [key: string]: number;
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

function identifySymbioticConnections(companies: Company[]): SymbioticConnection[] {
  const connections: SymbioticConnection[] = [];
  
  // Expanded mapping of waste materials to their broader categories or synonyms
  const materialSynonyms: { [key: string]: string[] } = {
    "concrete rubble": ["concrete", "construction waste", "aggregate"],
    "bricks": ["construction waste", "aggregate"],
    "tiles": ["construction waste", "aggregate"],
    "wood scraps": ["wood", "construction waste", "biomass", "fuel"],
    "metal scraps": ["metal", "steel", "aluminum", "copper", "iron", "recycled metal"],
    "plastic wraps": ["plastic", "packaging", "polymers", "recycled plastic"],
    "cardboard boxes": ["cardboard", "packaging", "paper", "recycled paper"],
    "wooden pallets": ["wood", "packaging", "biomass", "fuel"],
    "paint cans": ["hazardous waste", "metal"],
    "solvents": ["hazardous waste", "chemicals", "recycled chemicals"],
    "adhesives": ["hazardous waste", "chemicals"],
    "asbestos (historical)": ["hazardous waste"],
    "food scraps": ["organic waste", "food waste", "compost", "biogas"],
    "garden waste": ["organic waste", "compost", "biogas", "biomass"],
    "coffee grounds": ["organic waste", "compost", "biogas"],
    "single-use plastics": ["plastic", "polymers", "recycled plastic"],
    "water bottles": ["plastic", "polymers", "recycled plastic"],
    "packaging films": ["plastic", "packaging", "polymers", "recycled plastic"],
    "newspapers": ["paper", "recycled paper"],
    "magazines": ["paper", "recycled paper"],
    "bottles": ["glass", "recycled glass"],
    "jars": ["glass", "recycled glass"],
    "aluminum offcuts": ["aluminum", "metal", "recycled metal"],
    "steel shavings": ["steel", "metal", "recycled metal"],
    "copper wire": ["copper", "metal", "recycled metal"],
    "off-spec products": ["plastic", "polymers", "recycled plastic"],
    "edge trims": ["plastic", "polymers", "recycled plastic"],
    "molding waste": ["plastic", "polymers", "recycled plastic"],
    "food processing waste": ["organic waste", "food waste", "compost", "biogas"],
    "textile offcuts": ["textile", "fabric", "recycled textiles"],
    "process chemicals": ["chemicals", "recycled chemicals"],
    "spent solvents": ["chemicals", "recycled chemicals"],
    "lubricants": ["chemicals", "oil", "recycled oil"],
    "sharps (needles, scalpels)": ["medical waste"],
    "biohazardous waste (blood, tissues)": ["medical waste"],
    "pharmaceutical waste (expired drugs)": ["medical waste", "pharmaceuticals"],
    "pathological waste": ["medical waste"],
    "contaminated ppe": ["medical waste", "plastic"],
    "syringes": ["plastic", "medical waste"],
    "iv bags": ["plastic", "medical waste"],
    "gloves": ["plastic", "medical waste"],
    "office waste": ["general waste", "paper", "recycled paper"],
    "dewatered sludge cake": ["sludge", "fertilizer", "biomass"],
    "biosolids": ["sludge", "fertilizer", "biomass"],
    "chemical sludge": ["sludge", "chemicals"],
    "spent activated carbon": ["filter media", "carbon"],
    "sand filter media": ["filter media", "sand", "aggregate"],
    "residual chemicals": ["chemicals", "recycled chemicals"],
    "cleaning agents": ["chemicals"],
    "engine oil": ["oil", "lubricants", "recycled oil"],
    "hydraulic fluid": ["oil", "lubricants", "recycled oil"],
    "used vehicle tyres": ["rubber", "recycled rubber", "fuel"],
    "vehicle parts": ["metal", "plastic", "rubber", "recycled materials"],
    "containers": ["metal", "plastic", "recycled metal", "recycled plastic"],
    "drilling mud": ["oil sludge", "chemicals"],
    "tank bottom sludge": ["oil sludge", "hydrocarbons"],
    "oily water treatment sludge": ["oil sludge", "water"],
    "brine": ["produced water", "water"],
    "hydrocarbons": ["oil", "gas", "fuel"],
    "heavy metals": ["chemicals"],
    "drill cuttings": ["solid waste", "aggregate"],
    "contaminated soil": ["solid waste", "soil"],
    "used filters": ["solid waste", "metal", "plastic", "fabric"],
    "acids": ["chemicals"],
    "alkalis": ["chemicals"],
    "catalysts": ["chemicals", "metal"],
    "pipelines": ["metal"],
    "raw metals": ["metal"],
    "polymers": ["plastic"],
    "agricultural produce": ["organic waste", "biomass"],
    "fabrics": ["textile"],
    "medical supplies": ["plastic", "textile", "medical waste"],
    "lab reagents": ["chemicals"],
    "sterile packaging": ["plastic", "paper"],
    "fuel": ["energy"],
    "water": ["water"],
    "glass": ["recycled glass"],
    "steel": ["metal", "recycled metal"],
    "aluminum": ["metal", "recycled metal"],
    "wood": ["biomass", "fuel"],
    "plasterboard": ["construction waste"],
    "linens": ["textile"],
    "cleaning supplies": ["chemicals"],
    "paper products": ["paper"],
    "food & beverages": ["organic waste"],
    "raw water": ["water"],
    "chemical coagulants": ["chemicals"],
    "disinfectants": ["chemicals"],
    "filtration media": ["sand", "carbon"],
    "packaging materials": ["plastic", "paper", "wood", "metal"]
  };

  // Function to get all related terms for a given material
  function getRelatedTerms(material: string): string[] {
    const terms = new Set<string>([material]);
    
    if (material in materialSynonyms) {
      materialSynonyms[material].forEach(term => terms.add(term));
    }
    
    // Also check if this material is a synonym for other materials
    for (const [key, synonyms] of Object.entries(materialSynonyms)) {
      if (synonyms.includes(material)) {
        terms.add(key);
      }
    }
    
    return Array.from(terms);
  }

  for (const producer of companies) {
    if ("Waste Materials" in producer) {
      const producerWasteMaterialsRaw = producer["Waste Materials"]
        .split(",")
        .map(wm => wm.trim().toLowerCase());
      
      const producerWasteTerms = new Set<string>();
      for (const pwm of producerWasteMaterialsRaw) {
        getRelatedTerms(pwm).forEach(term => producerWasteTerms.add(term));
      }

      for (const consumer of companies) {
        if (producer !== consumer && "Materials" in consumer) {
          const consumerMaterialsRaw = consumer["Materials"]
            .split(",")
            .map(mat => mat.trim().toLowerCase());
          
          const consumerMaterialTerms = new Set<string>();
          for (const cm of consumerMaterialsRaw) {
            getRelatedTerms(cm).forEach(term => consumerMaterialTerms.add(term));
          }
          
          // Check for overlap between producer's waste terms and consumer's material terms
          const commonMaterials = new Set(
            Array.from(producerWasteTerms).filter(x => consumerMaterialTerms.has(x))
          );
          
          if (commonMaterials.size > 0) {
            for (const commonMat of commonMaterials) {
              const volumeParts = producer["Volume"]?.split(" of ");
              const wasteType = volumeParts && volumeParts.length > 1 
                ? volumeParts[1].replace(/\n/g, "").toLowerCase()
                : "";
              
              connections.push({
                producer_name: producer["Name"] || "",
                producer_industry: producer["Industry"] || "",
                consumer_name: consumer["Name"] || "",
                consumer_industry: consumer["Industry"] || "",
                symbiotic_material: commonMat,
                waste_type: wasteType
              });
            }
          }
        }
      }
    }
  }
  
  return connections;
}

async function main(): Promise<void> {
  try {
    const companyDataRaw = fs.readFileSync("gulf_company_data.txt", "utf-8");
    const parsedCompanies = parseCompanyData(companyDataRaw);
    const symbioticConnections = identifySymbioticConnections(parsedCompanies);

    // Save parsed companies for later use if needed
    const companiesOutput = parsedCompanies
      .map(company => JSON.stringify(company))
      .join("\n");
    fs.writeFileSync("parsed_companies.txt", companiesOutput);

    // Save connections for analysis
    const connectionsOutput = symbioticConnections
      .map(conn => JSON.stringify(conn))
      .join("\n");
    fs.writeFileSync("symbiotic_connections.txt", connectionsOutput);
    
    console.log(`Found ${parsedCompanies.length} companies.`);
    console.log(`Identified ${symbioticConnections.length} potential symbiotic connections.`);

    // Basic analysis for GNN efficiency and connections
    const industries = new Set<string>();
    const wasteTypes = new Set<string>();
    
    for (const company of parsedCompanies) {
      industries.add(company["Industry"] || "");
      if ("Volume" in company) {
        const wasteTypeInfo = company["Volume"].split(" of ");
        if (wasteTypeInfo.length > 1) {
          wasteTypes.add(wasteTypeInfo[1].replace(/\n/g, "").toLowerCase());
        }
      }
    }

    console.log(`Unique Industries: ${industries.size}`);
    console.log(`Unique Waste Types: ${wasteTypes.size}`);

    // Further analysis for GNN efficiency and connection numbers
    // This is a simplified approach. A real GNN would require more complex feature engineering.
    // For GNN efficiency, we want to see how well it can predict these connections.
    // The number of connections directly relates to the density of the graph.

    // Let's count connections per industry pair
    const industryConnections: IndustryConnectionCount = {};
    for (const conn of symbioticConnections) {
      const pair = [conn.producer_industry, conn.consumer_industry]
        .sort()
        .join(" -> "); // Sort to avoid duplicates like (A,B) and (B,A)
      
      if (!(pair in industryConnections)) {
        industryConnections[pair] = 0;
      }
      industryConnections[pair]++;
    }

    console.log("\nConnections between industries:");
    for (const [pair, count] of Object.entries(industryConnections)) {
      console.log(`  ${pair}: ${count} connections`);
    }

    // GNN efficiency and connection numbers discussion
    // The efficiency of a GNN in this context would be its ability to accurately predict
    // these symbiotic relationships. Given the structured nature of the data and clear
    // waste/material matches, a GNN should be highly efficient.
    // The number of connections is simply the count of identified symbiotic relationships.
    // The density of the network (connections / possible connections) is also relevant.

    const numCompanies = parsedCompanies.length;
    const maxPossibleConnections = numCompanies * (numCompanies - 1); // Directed graph, no self-loops
    const connectionDensity = maxPossibleConnections > 0 
      ? symbioticConnections.length / maxPossibleConnections 
      : 0;

    console.log(`\nTotal companies: ${numCompanies}`);
    console.log(`Total potential symbiotic connections: ${symbioticConnections.length}`);
    console.log(`Connection density (actual connections / max possible connections): ${connectionDensity.toFixed(4)}`);

    // For GNN, high efficiency means it can learn these patterns well.
    // The number of connections is a direct output of this analysis.
    // The density gives an idea of how rich the symbiotic network is.

  } catch (error) {
    console.error("Error processing data:", error);
  }
}

// Export functions for use as a module
export {
  parseCompanyData,
  identifySymbioticConnections,
  Company,
  SymbioticConnection
};

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}
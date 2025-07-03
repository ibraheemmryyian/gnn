export interface CompanyData {
  id: string;
  name: string;
  industry: string;
  products: string[];
  location: string;
  volume: number;
  volumeUnit: string;
  materials: string[];
  processes: string[];
}

export const parseCompanyData = (): CompanyData[] => {
  const rawData = `Company 1
Name: Arabtec Ventures
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Oman
Volume: 44332 metric tons of packaging waste
Materials: Steel, Glass, Concrete, Wood
Processes: Structural Erection → Foundation Laying
Waste Materials: Wooden pallets, Plastic wraps

Company 2
Name: Arabian Industries Solutions
Industry: Manufacturing (General)
Products: Steel Products, Plastics
Location: Kuwait
Volume: 44567 metric tons of plastic scraps
Materials: Agricultural Produce, Fabrics
Processes: Processing → Assembly → Finishing
Waste Materials: Edge trims, Molding waste

Company 3
Name: FoodCo Holdings
Industry: Manufacturing (General)
Products: Steel Products, Plastics, Aluminum Products
Location: Bahrain
Volume: 22317 metric tons of chemical waste
Materials: Fabrics, Agricultural Produce
Processes: Assembly → Processing → Casting → Finishing
Waste Materials: Spent solvents, Process chemicals, Lubricants

Company 4
Name: Saudi German Hospital Holdings
Industry: Healthcare
Products: Medical Devices
Location: Qatar
Volume: 49647 metric tons of general waste
Materials: Pharmaceuticals, Medical Supplies, Lab Reagents, Sterile Packaging
Processes: Surgery → Diagnosis → Patient Care → Research
Waste Materials: Food waste, Office waste

Company 5
Name: Saudi German Hospital Enterprises
Industry: Healthcare
Products: Medical Devices
Location: Bahrain
Volume: 34182 metric tons of plastic waste
Materials: Pharmaceuticals, Medical Supplies, Lab Reagents
Processes: Diagnosis → Patient Care → Surgery
Waste Materials: Syringes, IV bags, Gloves

Company 6
Name: Address Hotels Industries
Industry: Tourism & Hospitality
Products: Event Management, Resort Experiences, Hotel Stays
Location: Kuwait
Volume: 32042 metric tons of plastic waste
Materials: Linens, Food & Beverages
Processes: Maintenance → Housekeeping
Waste Materials: Packaging films

Company 7
Name: TextilePro Ventures
Industry: Manufacturing (General)
Products: Textiles
Location: Kuwait
Volume: 81631 metric tons of organic by-products
Materials: Fabrics, Polymers
Processes: Casting → Finishing
Waste Materials: Food processing waste

Company 8
Name: Rotana Corp
Industry: Tourism & Hospitality
Products: Hotel Stays, Resort Experiences
Location: Bahrain
Volume: 90999 metric tons of glass waste
Materials: Food & Beverages, Linens, Cleaning Supplies, Paper Products
Processes: Guest Services → Catering
Waste Materials: Bottles, Jars

Company 9
Name: Marriott Group
Industry: Tourism & Hospitality
Products: Restaurant Services
Location: Bahrain
Volume: 45585 metric tons of paper & cardboard
Materials: Cleaning Supplies, Paper Products
Processes: Maintenance → Guest Services → Catering → Housekeeping
Waste Materials: Magazines, Cardboard boxes

Company 10
Name: Arabtec Corp
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Oman
Volume: 150471 metric tons of construction & demolition waste
Materials: Plasterboard, Concrete
Processes: Structural Erection → Foundation Laying → Finishing → Design
Waste Materials: Tiles, Metal scraps, Bricks

Company 11
Name: ADSSC Enterprises
Industry: Water Treatment
Products: Treated Wastewater
Location: Oman
Volume: 453365 cubic meters of chemical waste
Materials: Raw Water, Chemical Coagulants, Disinfectants, Filtration Media
Processes: Filtration → Disinfection → Coagulation
Waste Materials: Cleaning agents

Company 12
Name: Aluminium Gulf Enterprises
Industry: Manufacturing (General)
Products: Steel Products
Location: Saudi Arabia
Volume: 17569 metric tons of metal scraps
Materials: Fabrics, Raw Metals, Agricultural Produce, Polymers
Processes: Assembly → Casting → Molding → Finishing
Waste Materials: Copper wire, Aluminum offcuts, Steel shavings

Company 13
Name: Gulf Manufacturing Group
Industry: Manufacturing (General)
Products: Plastics, Aluminum Products
Location: United Arab Emirates
Volume: 20443 metric tons of organic by-products
Materials: Raw Metals, Fabrics, Agricultural Produce, Polymers
Processes: Processing → Assembly → Finishing
Waste Materials: Textile offcuts

Company 14
Name: DEWA Group
Industry: Water Treatment
Products: Treated Wastewater, Potable Water
Location: Saudi Arabia
Volume: 139162 cubic meters of filter media waste
Materials: Disinfectants, Filtration Media
Processes: Sludge Treatment → Disinfection
Waste Materials: Sand filter media, Spent activated carbon

Company 15
Name: Rotana Holdings
Industry: Tourism & Hospitality
Products: Hotel Stays, Restaurant Services, Resort Experiences
Location: United Arab Emirates
Volume: 95306 metric tons of glass waste
Materials: Paper Products, Food & Beverages, Cleaning Supplies, Linens
Processes: Maintenance → Catering → Housekeeping
Waste Materials: Bottles

Company 16
Name: Binladin Systems
Industry: Construction & Real Estate
Products: Commercial Towers, Hospitality Developments
Location: Oman
Volume: 178770 metric tons of hazardous waste
Materials: Glass, Aluminum
Processes: Foundation Laying → Design → Excavation → Finishing
Waste Materials: Paint cans, Asbestos (historical), Adhesives

Company 17
Name: Aramex Systems
Industry: Logistics & Transportation
Products: Freight Forwarding, Warehousing
Location: Kuwait
Volume: 23107 metric tons of scrap metal
Materials: Fuel, Vehicle Parts, Packaging Materials
Processes: Transporting → Loading → Unloading → Storage
Waste Materials: Vehicle parts, Containers

Company 18
Name: Emaar Hospitality Group
Industry: Tourism & Hospitality
Products: Restaurant Services
Location: Kuwait
Volume: 98601 metric tons of paper & cardboard
Materials: Paper Products, Food & Beverages
Processes: Maintenance → Housekeeping → Catering → Guest Services
Waste Materials: Newspapers

Company 19
Name: ADSSC Enterprises
Industry: Water Treatment
Products: Treated Wastewater
Location: Qatar
Volume: 272941 cubic meters of filter media waste
Materials: Raw Water, Filtration Media, Disinfectants, Chemical Coagulants
Processes: Coagulation → Disinfection
Waste Materials: Spent activated carbon, Sand filter media

Company 20
Name: Bahri Services
Industry: Logistics & Transportation
Products: Freight Forwarding, Delivery Services, Warehousing
Location: Oman
Volume: 50809 metric tons of packaging waste
Materials: Vehicle Parts, Fuel
Processes: Loading → Transporting
Waste Materials: Wooden pallets

Company 21
Name: Bahrain Petroleum Holdings
Industry: Oil & Gas
Products: Crude Oil, Natural Gas, Petrochemicals
Location: Bahrain
Volume: 335131 metric tons of oil sludge
Materials: Drilling Fluids, Hydrocarbons, Catalysts
Processes: Exploration → Refining → Distribution
Waste Materials: Oily water treatment sludge, Tank bottom sludge, Drilling mud

Company 22
Name: DAMAC Holdings
Industry: Construction & Real Estate
Products: Infrastructure Projects
Location: Saudi Arabia
Volume: 244381 metric tons of hazardous waste
Materials: Glass, Plasterboard, Concrete, Wood
Processes: Foundation Laying → Excavation → Structural Erection → Design
Waste Materials: Solvents

Company 23
Name: Kuwait Oil Company Systems
Industry: Oil & Gas
Products: Crude Oil, Petrochemicals, Refined Petroleum Products
Location: Qatar
Volume: 210096 metric tons of oil sludge
Materials: Pipelines, Drilling Fluids, Hydrocarbons, Catalysts
Processes: Drilling → Distribution → Exploration → Refining
Waste Materials: Drilling mud

Company 24
Name: Azizi Holdings
Industry: Construction & Real Estate
Products: Commercial Towers, Hospitality Developments
Location: Qatar
Volume: 75520 metric tons of hazardous waste
Materials: Wood, Glass, Plasterboard, Concrete
Processes: Foundation Laying → Structural Erection → Finishing
Waste Materials: Adhesives, Paint cans

Company 25
Name: Dubai Properties Services
Industry: Construction & Real Estate
Products: Residential Buildings, Hospitality Developments, Commercial Towers
Location: Saudi Arabia
Volume: 85877 metric tons of hazardous waste
Materials: Concrete, Aluminum
Processes: Finishing → Design → Structural Erection
Waste Materials: Adhesives, Solvents, Asbestos (historical)

Company 26
Name: DEWA Industries
Industry: Water Treatment
Products: Treated Wastewater
Location: Qatar
Volume: 383554 cubic meters of chemical waste
Materials: Raw Water, Filtration Media, Disinfectants
Processes: Disinfection → Sludge Treatment
Waste Materials: Residual chemicals

Company 27
Name: ADSSC Holdings
Industry: Water Treatment
Products: Treated Wastewater
Location: Kuwait
Volume: 270996 cubic meters of sludge
Materials: Filtration Media, Raw Water
Processes: Sludge Treatment → Filtration → Disinfection → Coagulation
Waste Materials: Chemical sludge, Dewatered sludge cake

Company 28
Name: Metito Systems
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater, Potable Water
Location: Bahrain
Volume: 226077 cubic meters of chemical waste
Materials: Filtration Media, Raw Water, Disinfectants
Processes: Disinfection → Coagulation → Sludge Treatment
Waste Materials: Cleaning agents, Residual chemicals

Company 29
Name: NMC Health Holdings
Industry: Healthcare
Products: Diagnostic Services, Medical Services, Medical Devices
Location: Oman
Volume: 16859 metric tons of medical waste
Materials: Lab Reagents, Pharmaceuticals, Medical Supplies, Sterile Packaging
Processes: Research → Surgery → Diagnosis
Waste Materials: Pharmaceutical waste (expired drugs)

Company 30
Name: Aramex Services
Industry: Logistics & Transportation
Products: Cargo Shipping, Warehousing
Location: United Arab Emirates
Volume: 89954 metric tons of tyre waste
Materials: Packaging Materials, Vehicle Parts
Processes: Storage → Loading → Transporting → Unloading
Waste Materials: Used vehicle tyres

Company 31
Name: EnergyCo Industries
Industry: Oil & Gas
Products: Crude Oil, Natural Gas, Petrochemicals
Location: Bahrain
Volume: 333908 metric tons of oil sludge
Materials: Catalysts, Hydrocarbons, Pipelines, Drilling Fluids
Processes: Distribution → Drilling
Waste Materials: Oily water treatment sludge, Drilling mud, Tank bottom sludge

Company 32
Name: Agility Ventures
Industry: Logistics & Transportation
Products: Cargo Shipping, Delivery Services
Location: Saudi Arabia
Volume: 49332 metric tons of tyre waste
Materials: Packaging Materials, Fuel, Vehicle Parts
Processes: Transporting → Unloading
Waste Materials: Used vehicle tyres

Company 33
Name: AquaTech Enterprises
Industry: Water Treatment
Products: Potable Water
Location: Saudi Arabia
Volume: 239435 cubic meters of chemical waste
Materials: Chemical Coagulants, Disinfectants, Filtration Media, Raw Water
Processes: Sludge Treatment → Coagulation → Disinfection
Waste Materials: Cleaning agents

Company 34
Name: AquaTech Ventures
Industry: Water Treatment
Products: Reclaimed Water, Potable Water, Treated Wastewater
Location: Qatar
Volume: 332964 cubic meters of sludge
Materials: Filtration Media, Disinfectants, Raw Water, Chemical Coagulants
Processes: Filtration → Disinfection → Coagulation
Waste Materials: Chemical sludge

Company 35
Name: Aramex Group
Industry: Logistics & Transportation
Products: Delivery Services
Location: Kuwait
Volume: 88081 metric tons of scrap metal
Materials: Fuel, Packaging Materials
Processes: Transporting → Unloading
Waste Materials: Containers

Company 36
Name: Hilton Solutions
Industry: Tourism & Hospitality
Products: Hotel Stays, Event Management, Restaurant Services
Location: Qatar
Volume: 41074 metric tons of paper & cardboard
Materials: Food & Beverages, Linens, Cleaning Supplies
Processes: Housekeeping → Catering → Maintenance
Waste Materials: Cardboard boxes, Newspapers

Company 37
Name: Saudi German Hospital Enterprises
Industry: Healthcare
Products: Medical Devices, Pharmaceuticals
Location: United Arab Emirates
Volume: 23363 metric tons of plastic waste
Materials: Lab Reagents, Pharmaceuticals
Processes: Research → Surgery → Patient Care
Waste Materials: Gloves, Packaging

Company 38
Name: Kuwait Oil Company Ventures
Industry: Oil & Gas
Products: Crude Oil, Natural Gas
Location: Saudi Arabia
Volume: 85512 metric tons of produced water
Materials: Catalysts, Pipelines, Drilling Fluids, Hydrocarbons
Processes: Exploration → Drilling
Waste Materials: Brine

Company 39
Name: Oman LNG Ventures
Industry: Oil & Gas
Products: Natural Gas
Location: Qatar
Volume: 458799 metric tons of solid waste
Materials: Pipelines, Catalysts, Hydrocarbons
Processes: Exploration → Drilling → Distribution
Waste Materials: Used filters

Company 40
Name: FedEx Holdings
Industry: Logistics & Transportation
Products: Cargo Shipping, Freight Forwarding
Location: United Arab Emirates
Volume: 72533 metric tons of tyre waste
Materials: Vehicle Parts, Fuel
Processes: Loading → Unloading → Storage → Transporting
Waste Materials: Used vehicle tyres

Company 41
Name: Aster DM Healthcare Ventures
Industry: Healthcare
Products: Diagnostic Services, Pharmaceuticals, Medical Services
Location: Kuwait
Volume: 12092 metric tons of medical waste
Materials: Medical Supplies, Pharmaceuticals, Sterile Packaging, Lab Reagents
Processes: Diagnosis → Surgery → Patient Care
Waste Materials: Contaminated PPE, Pathological waste

Company 42
Name: Emirates Global Services
Industry: Manufacturing (General)
Products: Textiles, Steel Products
Location: Bahrain
Volume: 23419 metric tons of metal scraps
Materials: Raw Metals, Fabrics, Agricultural Produce, Polymers
Processes: Finishing → Molding → Casting → Assembly
Waste Materials: Steel shavings, Aluminum offcuts

Company 43
Name: FedEx Corp
Industry: Logistics & Transportation
Products: Warehousing
Location: Saudi Arabia
Volume: 31884 metric tons of packaging waste
Materials: Fuel, Vehicle Parts
Processes: Storage → Unloading → Transporting → Loading
Waste Materials: Cardboard boxes

Company 44
Name: Saudi German Hospital Group
Industry: Healthcare
Products: Medical Devices, Diagnostic Services, Medical Services
Location: United Arab Emirates
Volume: 47687 metric tons of general waste
Materials: Sterile Packaging, Lab Reagents, Medical Supplies
Processes: Patient Care → Research
Waste Materials: Food waste, Office waste

Company 45
Name: Emirates Global Group
Industry: Manufacturing (General)
Products: Aluminum Products, Steel Products, Food Products
Location: Kuwait
Volume: 32219 metric tons of chemical waste
Materials: Agricultural Produce, Fabrics, Polymers
Processes: Molding → Assembly → Casting → Finishing
Waste Materials: Process chemicals, Lubricants

Company 46
Name: Emirates Global Ventures
Industry: Manufacturing (General)
Products: Food Products, Steel Products, Plastics
Location: Kuwait
Volume: 68102 metric tons of metal scraps
Materials: Raw Metals, Agricultural Produce, Fabrics
Processes: Assembly → Finishing → Molding
Waste Materials: Aluminum offcuts, Copper wire

Company 47
Name: Metito Ventures
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater
Location: Bahrain
Volume: 340223 cubic meters of sludge
Materials: Disinfectants, Raw Water, Filtration Media
Processes: Filtration → Coagulation
Waste Materials: Biosolids

Company 48
Name: Gulf Oil Industries
Industry: Oil & Gas
Products: Crude Oil
Location: United Arab Emirates
Volume: 480274 metric tons of chemical waste
Materials: Hydrocarbons, Catalysts
Processes: Refining → Drilling → Distribution → Exploration
Waste Materials: Acids, Alkalis

Company 49
Name: NMC Health Holdings
Industry: Healthcare
Products: Medical Services, Medical Devices, Diagnostic Services
Location: Oman
Volume: 24110 metric tons of medical waste
Materials: Pharmaceuticals, Sterile Packaging, Lab Reagents
Processes: Surgery → Research → Diagnosis
Waste Materials: Pharmaceutical waste (expired drugs)

Company 50
Name: PetroChem Ventures
Industry: Oil & Gas
Products: Refined Petroleum Products
Location: Kuwait
Volume: 381559 metric tons of oil sludge
Materials: Drilling Fluids, Hydrocarbons
Processes: Drilling → Distribution → Refining → Exploration
Waste Materials: Oily water treatment sludge, Tank bottom sludge

Company 51
Name: Aramex Enterprises
Industry: Logistics & Transportation
Products: Warehousing
Location: Kuwait
Volume: 93050 metric tons of scrap metal
Materials: Vehicle Parts, Fuel, Packaging Materials
Processes: Transporting → Unloading → Storage → Loading
Waste Materials: Containers

Company 52
Name: Nakheel Services
Industry: Construction & Real Estate
Products: Hospitality Developments, Commercial Towers
Location: Saudi Arabia
Volume: 270621 metric tons of packaging waste
Materials: Plasterboard, Glass
Processes: Foundation Laying → Finishing → Structural Erection
Waste Materials: Wooden pallets, Plastic wraps

Company 53
Name: Arabtec Solutions
Industry: Construction & Real Estate
Products: Commercial Towers, Hospitality Developments
Location: Kuwait
Volume: 56643 metric tons of hazardous waste
Materials: Plasterboard, Concrete, Aluminum
Processes: Finishing → Excavation
Waste Materials: Adhesives, Solvents, Paint cans

Company 54
Name: Arabtec Enterprises
Industry: Construction & Real Estate
Products: Residential Buildings
Location: United Arab Emirates
Volume: 182248 metric tons of packaging waste
Materials: Steel, Glass, Concrete, Wood
Processes: Excavation → Structural Erection → Foundation Laying → Design
Waste Materials: Cardboard boxes, Wooden pallets

Company 55
Name: Accor Services
Industry: Tourism & Hospitality
Products: Resort Experiences, Hotel Stays, Restaurant Services
Location: Qatar
Volume: 92779 metric tons of glass waste
Materials: Paper Products, Cleaning Supplies
Processes: Guest Services → Catering
Waste Materials: Jars

Company 56
Name: Rixos Group
Industry: Tourism & Hospitality
Products: Resort Experiences, Event Management
Location: United Arab Emirates
Volume: 84113 metric tons of organic waste
Materials: Cleaning Supplies, Food & Beverages, Paper Products
Processes: Maintenance → Catering → Guest Services
Waste Materials: Garden waste, Coffee grounds

Company 57
Name: DEWA Industries
Industry: Water Treatment
Products: Reclaimed Water, Potable Water, Treated Wastewater
Location: Kuwait
Volume: 358149 cubic meters of filter media waste
Materials: Disinfectants, Chemical Coagulants
Processes: Coagulation → Disinfection → Filtration
Waste Materials: Sand filter media, Spent activated carbon

Company 58
Name: ADSSC Enterprises
Industry: Water Treatment
Products: Potable Water, Treated Wastewater, Reclaimed Water
Location: Qatar
Volume: 122737 cubic meters of chemical waste
Materials: Filtration Media, Raw Water, Disinfectants, Chemical Coagulants
Processes: Filtration → Coagulation → Sludge Treatment
Waste Materials: Residual chemicals

Company 59
Name: Dubai Properties Solutions
Industry: Construction & Real Estate
Products: Commercial Towers, Residential Buildings
Location: Kuwait
Volume: 94868 metric tons of packaging waste
Materials: Steel, Wood
Processes: Excavation → Structural Erection
Waste Materials: Cardboard boxes, Wooden pallets, Plastic wraps

Company 60
Name: Veolia Industries
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater, Potable Water
Location: United Arab Emirates
Volume: 461575 cubic meters of sludge
Materials: Disinfectants, Filtration Media, Chemical Coagulants
Processes: Coagulation → Disinfection → Sludge Treatment
Waste Materials: Biosolids, Dewatered sludge cake

Company 61
Name: Rixos Services
Industry: Tourism & Hospitality
Products: Resort Experiences
Location: Bahrain
Volume: 20592 metric tons of glass waste
Materials: Cleaning Supplies, Paper Products, Linens
Processes: Maintenance → Housekeeping
Waste Materials: Bottles, Jars

Company 62
Name: EnergyCo Services
Industry: Oil & Gas
Products: Petrochemicals, Crude Oil, Natural Gas
Location: Oman
Volume: 247189 metric tons of solid waste
Materials: Drilling Fluids, Catalysts
Processes: Exploration → Distribution
Waste Materials: Used filters, Drill cuttings

Company 63
Name: ADNOC Ventures
Industry: Oil & Gas
Products: Refined Petroleum Products, Crude Oil
Location: Kuwait
Volume: 112927 metric tons of produced water
Materials: Hydrocarbons, Catalysts, Pipelines, Drilling Fluids
Processes: Exploration → Drilling → Distribution
Waste Materials: Brine

Company 64
Name: Emaar Hospitality Enterprises
Industry: Tourism & Hospitality
Products: Restaurant Services, Resort Experiences, Event Management
Location: Oman
Volume: 82709 metric tons of paper & cardboard
Materials: Linens, Cleaning Supplies, Paper Products
Processes: Maintenance → Catering → Housekeeping
Waste Materials: Magazines, Newspapers

Company 65
Name: Saudi Aramco Group
Industry: Oil & Gas
Products: Petrochemicals
Location: Bahrain
Volume: 298500 metric tons of solid waste
Materials: Pipelines, Hydrocarbons
Processes: Refining → Distribution → Drilling → Exploration
Waste Materials: Used filters, Drill cuttings, Contaminated soil

Company 66
Name: Aramex Enterprises
Industry: Logistics & Transportation
Products: Cargo Shipping, Freight Forwarding
Location: Qatar
Volume: 74026 metric tons of scrap metal
Materials: Packaging Materials, Fuel
Processes: Transporting → Unloading
Waste Materials: Containers, Vehicle parts

Company 67
Name: Address Hotels Services
Industry: Tourism & Hospitality
Products: Event Management, Hotel Stays, Restaurant Services
Location: Bahrain
Volume: 24658 metric tons of paper & cardboard
Materials: Linens, Food & Beverages, Cleaning Supplies
Processes: Housekeeping → Maintenance → Guest Services
Waste Materials: Cardboard boxes

Company 68
Name: Mediclinic Holdings
Industry: Healthcare
Products: Diagnostic Services, Medical Services
Location: Oman
Volume: 38921 metric tons of medical waste
Materials: Medical Supplies, Lab Reagents, Sterile Packaging, Pharmaceuticals
Processes: Patient Care → Research
Waste Materials: Pathological waste, Sharps (needles, scalpels)

Company 69
Name: Emaar Hospitality Systems
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: Qatar
Volume: 16327 metric tons of paper & cardboard
Materials: Linens, Food & Beverages, Paper Products, Cleaning Supplies
Processes: Housekeeping → Catering → Guest Services
Waste Materials: Magazines

Company 70
Name: Azizi Solutions
Industry: Construction & Real Estate
Products: Hospitality Developments, Commercial Towers, Residential Buildings
Location: Bahrain
Volume: 79011 metric tons of packaging waste
Materials: Steel, Concrete
Processes: Design → Foundation Laying
Waste Materials: Cardboard boxes

Company 71
Name: Arabtec Solutions
Industry: Construction & Real Estate
Products: Infrastructure Projects, Commercial Towers
Location: Bahrain
Volume: 99300 metric tons of packaging waste
Materials: Glass, Plasterboard, Steel, Wood
Processes: Excavation → Finishing → Foundation Laying
Waste Materials: Wooden pallets

Company 72
Name: Mediclinic Holdings
Industry: Healthcare
Products: Medical Devices, Diagnostic Services, Pharmaceuticals
Location: Saudi Arabia
Volume: 44784 metric tons of general waste
Materials: Pharmaceuticals, Medical Supplies
Processes: Surgery → Patient Care → Diagnosis → Research
Waste Materials: Food waste

Company 73
Name: Hilton Corp
Industry: Tourism & Hospitality
Products: Restaurant Services, Hotel Stays, Resort Experiences
Location: Oman
Volume: 55200 metric tons of paper & cardboard
Materials: Linens, Cleaning Supplies
Processes: Housekeeping → Catering → Maintenance → Guest Services
Waste Materials: Newspapers

Company 74
Name: Gulf Oil Holdings
Industry: Oil & Gas
Products: Refined Petroleum Products, Crude Oil, Natural Gas
Location: Qatar
Volume: 476939 metric tons of oil sludge
Materials: Drilling Fluids, Hydrocarbons, Catalysts, Pipelines
Processes: Drilling → Refining → Exploration
Waste Materials: Oily water treatment sludge, Tank bottom sludge, Drilling mud

Company 75
Name: Steel Gulf Enterprises
Industry: Manufacturing (General)
Products: Aluminum Products, Food Products
Location: Kuwait
Volume: 73850 metric tons of plastic scraps
Materials: Raw Metals, Fabrics
Processes: Molding → Finishing → Assembly → Processing
Waste Materials: Off-spec products, Molding waste, Edge trims

Company 76
Name: Dubai Properties Services
Industry: Construction & Real Estate
Products: Hospitality Developments, Infrastructure Projects, Commercial Towers
Location: Kuwait
Volume: 62775 metric tons of construction & demolition waste
Materials: Glass, Steel, Wood
Processes: Design → Finishing → Structural Erection → Excavation
Waste Materials: Wood scraps, Concrete rubble, Plasterboard

Company 77
Name: Steel Gulf Solutions
Industry: Manufacturing (General)
Products: Aluminum Products
Location: Bahrain
Volume: 76393 metric tons of plastic scraps
Materials: Polymers, Fabrics
Processes: Assembly → Molding → Finishing → Casting
Waste Materials: Molding waste

Company 78
Name: Accor Ventures
Industry: Tourism & Hospitality
Products: Resort Experiences, Hotel Stays, Restaurant Services
Location: Kuwait
Volume: 73498 metric tons of paper & cardboard
Materials: Food & Beverages, Paper Products, Cleaning Supplies, Linens
Processes: Guest Services → Catering
Waste Materials: Cardboard boxes, Magazines

Company 79
Name: Marriott Corp
Industry: Tourism & Hospitality
Products: Hotel Stays, Restaurant Services
Location: Kuwait
Volume: 31068 metric tons of glass waste
Materials: Linens, Paper Products, Cleaning Supplies
Processes: Housekeeping → Maintenance → Guest Services
Waste Materials: Jars, Bottles

Company 80
Name: Mediclinic Enterprises
Industry: Healthcare
Products: Pharmaceuticals
Location: Qatar
Volume: 30810 metric tons of plastic waste
Materials: Sterile Packaging, Lab Reagents, Medical Supplies, Pharmaceuticals
Processes: Research → Diagnosis
Waste Materials: Gloves, Syringes

Company 81
Name: Saudi German Hospital Group
Industry: Healthcare
Products: Diagnostic Services
Location: Bahrain
Volume: 33518 metric tons of plastic waste
Materials: Lab Reagents, Medical Supplies, Sterile Packaging, Pharmaceuticals
Processes: Research → Diagnosis → Surgery → Patient Care
Waste Materials: Packaging, Gloves

Company 82
Name: PetroChem Corp
Industry: Oil & Gas
Products: Petrochemicals, Refined Petroleum Products
Location: Kuwait
Volume: 182662 metric tons of oil sludge
Materials: Drilling Fluids, Catalysts, Hydrocarbons, Pipelines
Processes: Distribution → Exploration
Waste Materials: Drilling mud, Oily water treatment sludge, Tank bottom sludge

Company 83
Name: EnergyCo Services
Industry: Oil & Gas
Products: Natural Gas, Petrochemicals
Location: United Arab Emirates
Volume: 452267 metric tons of solid waste
Materials: Pipelines, Drilling Fluids
Processes: Drilling → Exploration → Distribution → Refining
Waste Materials: Drill cuttings

Company 84
Name: Aramex Solutions
Industry: Logistics & Transportation
Products: Delivery Services, Cargo Shipping, Warehousing
Location: Bahrain
Volume: 63171 metric tons of used oils & lubricants
Materials: Packaging Materials, Vehicle Parts, Fuel
Processes: Storage → Unloading
Waste Materials: Engine oil, Hydraulic fluid

Company 85
Name: Bahrain Petroleum Enterprises
Industry: Oil & Gas
Products: Crude Oil
Location: Kuwait
Volume: 209110 metric tons of produced water
Materials: Hydrocarbons, Pipelines
Processes: Distribution → Refining → Exploration → Drilling
Waste Materials: Heavy metals, Brine

Company 86
Name: American Hospital Dubai Group
Industry: Healthcare
Products: Medical Services, Pharmaceuticals, Medical Devices
Location: Oman
Volume: 34068 metric tons of plastic waste
Materials: Sterile Packaging, Medical Supplies
Processes: Research → Surgery
Waste Materials: Packaging, Gloves

Company 87
Name: Rotana Solutions
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: United Arab Emirates
Volume: 47429 metric tons of glass waste
Materials: Cleaning Supplies, Linens, Food & Beverages
Processes: Guest Services → Catering → Maintenance
Waste Materials: Bottles, Jars

Company 88
Name: Aldar Services
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Kuwait
Volume: 210139 metric tons of hazardous waste
Materials: Glass, Concrete, Plasterboard
Processes: Structural Erection → Design → Foundation Laying → Excavation
Waste Materials: Adhesives, Asbestos (historical), Paint cans

Company 89
Name: Al Futtaim Systems
Industry: Construction & Real Estate
Products: Residential Buildings, Commercial Towers, Hospitality Developments
Location: United Arab Emirates
Volume: 149787 metric tons of construction & demolition waste
Materials: Wood, Steel, Concrete
Processes: Foundation Laying → Structural Erection → Excavation → Finishing
Waste Materials: Wood scraps, Plasterboard, Concrete rubble

Company 90
Name: Arabian Industries Group
Industry: Manufacturing (General)
Products: Steel Products
Location: Bahrain
Volume: 96822 metric tons of organic by-products
Materials: Agricultural Produce, Raw Metals
Processes: Processing → Finishing → Casting → Molding
Waste Materials: Textile offcuts, Food processing waste

Company 91
Name: Aster DM Healthcare Holdings
Industry: Healthcare
Products: Diagnostic Services, Pharmaceuticals
Location: Qatar
Volume: 22847 metric tons of medical waste
Materials: Medical Supplies, Sterile Packaging
Processes: Patient Care → Surgery
Waste Materials: Pathological waste, Pharmaceutical waste (expired drugs), Contaminated PPE

Company 92
Name: Azizi Ventures
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Kuwait
Volume: 196676 metric tons of packaging waste
Materials: Plasterboard, Wood, Aluminum, Glass
Processes: Finishing → Foundation Laying → Excavation → Design
Waste Materials: Wooden pallets, Plastic wraps

Company 93
Name: DEWA Solutions
Industry: Water Treatment
Products: Reclaimed Water, Potable Water
Location: Saudi Arabia
Volume: 365604 cubic meters of sludge
Materials: Disinfectants, Raw Water, Chemical Coagulants
Processes: Sludge Treatment → Disinfection → Filtration
Waste Materials: Biosolids, Dewatered sludge cake

Company 94
Name: Aldar Industries
Industry: Construction & Real Estate
Products: Residential Buildings, Hospitality Developments, Commercial Towers
Location: United Arab Emirates
Volume: 247985 metric tons of packaging waste
Materials: Aluminum, Steel, Concrete, Wood
Processes: Finishing → Excavation → Design → Foundation Laying
Waste Materials: Wooden pallets, Cardboard boxes, Plastic wraps

Company 95
Name: DP World Group
Industry: Logistics & Transportation
Products: Delivery Services, Warehousing
Location: Qatar
Volume: 20365 metric tons of packaging waste
Materials: Vehicle Parts, Packaging Materials, Fuel
Processes: Storage → Unloading → Transporting → Loading
Waste Materials: Wooden pallets, Cardboard boxes

Company 96
Name: Aluminium Gulf Solutions
Industry: Manufacturing (General)
Products: Steel Products, Food Products, Plastics
Location: Kuwait
Volume: 86014 metric tons of plastic scraps
Materials: Polymers, Raw Metals
Processes: Finishing → Casting
Waste Materials: Molding waste, Edge trims

Company 97
Name: Gulf Manufacturing Solutions
Industry: Manufacturing (General)
Products: Aluminum Products, Food Products, Steel Products
Location: United Arab Emirates
Volume: 15515 metric tons of organic by-products
Materials: Raw Metals, Agricultural Produce, Fabrics
Processes: Assembly → Finishing → Casting
Waste Materials: Food processing waste

Company 98
Name: DEWA Corp
Industry: Water Treatment
Products: Treated Wastewater, Reclaimed Water
Location: Qatar
Volume: 372910 cubic meters of sludge
Materials: Raw Water, Disinfectants, Filtration Media, Chemical Coagulants
Processes: Disinfection → Coagulation → Sludge Treatment → Filtration
Waste Materials: Biosolids, Chemical sludge, Dewatered sludge cake

Company 99
Name: DP World Services
Industry: Logistics & Transportation
Products: Cargo Shipping
Location: Saudi Arabia
Volume: 61223 metric tons of used oils & lubricants
Materials: Fuel, Vehicle Parts
Processes: Unloading → Loading → Transporting
Waste Materials: Hydraulic fluid, Engine oil

Company 100
Name: Rotana Systems
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: Qatar
Volume: 95608 metric tons of glass waste
Materials: Linens, Food & Beverages, Paper Products, Cleaning Supplies
Processes: Housekeeping → Guest Services
Waste Materials: Bottles

Company 101
Name: PetroChem Corp
Industry: Oil & Gas
Products: Natural Gas, Petrochemicals
Location: Saudi Arabia
Volume: 90958 metric tons of produced water
Materials: Hydrocarbons, Catalysts, Drilling Fluids, Pipelines
Processes: Refining → Exploration → Distribution
Waste Materials: Heavy metals, Hydrocarbons, Brine

Company 102
Name: Gulf Manufacturing Services
Industry: Manufacturing (General)
Products: Aluminum Products, Steel Products, Plastics
Location: Qatar
Volume: 40714 metric tons of organic by-products
Materials: Raw Metals, Agricultural Produce, Fabrics, Polymers
Processes: Assembly → Processing → Casting
Waste Materials: Textile offcuts, Food processing waste

Company 103
Name: Metito Holdings
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater
Location: Bahrain
Volume: 418607 cubic meters of chemical waste
Materials: Chemical Coagulants, Filtration Media, Disinfectants
Processes: Coagulation → Sludge Treatment → Filtration → Disinfection
Waste Materials: Residual chemicals, Cleaning agents

Company 104
Name: Rixos Corp
Industry: Tourism & Hospitality
Products: Event Management
Location: Qatar
Volume: 81505 metric tons of paper & cardboard
Materials: Linens, Cleaning Supplies, Food & Beverages
Processes: Catering → Housekeeping → Maintenance → Guest Services
Waste Materials: Magazines

Company 105
Name: Rotana Ventures
Industry: Tourism & Hospitality
Products: Event Management
Location: United Arab Emirates
Volume: 64184 metric tons of glass waste
Materials: Food & Beverages, Linens, Paper Products, Cleaning Supplies
Processes: Housekeeping → Catering
Waste Materials: Jars, Bottles

Company 106
Name: Arabian Industries Group
Industry: Manufacturing (General)
Products: Food Products, Textiles, Aluminum Products
Location: Saudi Arabia
Volume: 14389 metric tons of chemical waste
Materials: Fabrics, Raw Metals
Processes: Assembly → Casting → Processing
Waste Materials: Process chemicals, Lubricants

Company 107
Name: Rixos Holdings
Industry: Tourism & Hospitality
Products: Restaurant Services, Hotel Stays
Location: Bahrain
Volume: 62367 metric tons of paper & cardboard
Materials: Food & Beverages, Linens, Paper Products
Processes: Catering → Maintenance
Waste Materials: Cardboard boxes, Newspapers, Magazines

Company 108
Name: Steel Gulf Enterprises
Industry: Manufacturing (General)
Products: Aluminum Products
Location: Saudi Arabia
Volume: 17640 metric tons of organic by-products
Materials: Raw Metals, Agricultural Produce
Processes: Processing → Finishing
Waste Materials: Food processing waste

Company 109
Name: DHL Services
Industry: Logistics & Transportation
Products: Warehousing, Delivery Services, Cargo Shipping
Location: Qatar
Volume: 84728 metric tons of packaging waste
Materials: Packaging Materials, Vehicle Parts, Fuel
Processes: Loading → Transporting → Storage
Waste Materials: Cardboard boxes

Company 110
Name: Hilton Group
Industry: Tourism & Hospitality
Products: Resort Experiences, Restaurant Services, Hotel Stays
Location: Saudi Arabia
Volume: 28794 metric tons of organic waste
Materials: Paper Products, Linens, Food & Beverages, Cleaning Supplies
Processes: Guest Services → Catering
Waste Materials: Garden waste

Company 111
Name: Binladin Solutions
Industry: Construction & Real Estate
Products: Residential Buildings, Infrastructure Projects
Location: Saudi Arabia
Volume: 267176 metric tons of packaging waste
Materials: Plasterboard, Wood
Processes: Design → Excavation → Structural Erection → Foundation Laying
Waste Materials: Cardboard boxes, Wooden pallets

Company 112
Name: Aluminium Gulf Industries
Industry: Manufacturing (General)
Products: Aluminum Products
Location: Bahrain
Volume: 99230 metric tons of metal scraps
Materials: Raw Metals, Polymers, Agricultural Produce, Fabrics
Processes: Assembly → Molding → Casting
Waste Materials: Copper wire

Company 113
Name: Azizi Group
Industry: Construction & Real Estate
Products: Infrastructure Projects, Residential Buildings
Location: United Arab Emirates
Volume: 79352 metric tons of packaging waste
Materials: Steel, Aluminum, Glass
Processes: Design → Foundation Laying → Finishing
Waste Materials: Wooden pallets, Plastic wraps, Cardboard boxes

Company 114
Name: ADNOC Ventures
Industry: Oil & Gas
Products: Petrochemicals
Location: Kuwait
Volume: 130703 metric tons of oil sludge
Materials: Hydrocarbons, Catalysts, Drilling Fluids, Pipelines
Processes: Exploration → Drilling → Refining
Waste Materials: Tank bottom sludge

Company 115
Name: NMC Health Solutions
Industry: Healthcare
Products: Pharmaceuticals, Medical Services
Location: Bahrain
Volume: 26901 metric tons of plastic waste
Materials: Medical Supplies, Pharmaceuticals, Lab Reagents, Sterile Packaging
Processes: Surgery → Diagnosis
Waste Materials: IV bags

Company 116
Name: AquaTech Corp
Industry: Water Treatment
Products: Reclaimed Water
Location: United Arab Emirates
Volume: 316854 cubic meters of sludge
Materials: Filtration Media, Chemical Coagulants
Processes: Filtration → Sludge Treatment → Coagulation
Waste Materials: Biosolids, Dewatered sludge cake, Chemical sludge

Company 117
Name: EnergyCo Industries
Industry: Oil & Gas
Products: Crude Oil, Natural Gas
Location: Saudi Arabia
Volume: 80700 metric tons of produced water
Materials: Drilling Fluids, Pipelines, Hydrocarbons, Catalysts
Processes: Drilling → Exploration
Waste Materials: Hydrocarbons, Heavy metals, Brine

Company 118
Name: Saudi Aramco Ventures
Industry: Oil & Gas
Products: Petrochemicals, Crude Oil
Location: Oman
Volume: 458792 metric tons of solid waste
Materials: Pipelines, Drilling Fluids
Processes: Exploration → Drilling → Refining
Waste Materials: Contaminated soil, Drill cuttings, Used filters

Company 119
Name: DAMAC Industries
Industry: Construction & Real Estate
Products: Infrastructure Projects
Location: Bahrain
Volume: 162658 metric tons of packaging waste
Materials: Steel, Glass, Concrete
Processes: Excavation → Finishing → Design → Structural Erection
Waste Materials: Cardboard boxes, Wooden pallets

Company 120
Name: Rixos Group
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: Oman
Volume: 28122 metric tons of paper & cardboard
Materials: Food & Beverages, Linens, Cleaning Supplies
Processes: Guest Services → Maintenance → Housekeeping → Catering
Waste Materials: Newspapers

Company 121
Name: Dubai Properties Ventures
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Saudi Arabia
Volume: 241810 metric tons of hazardous waste
Materials: Steel, Wood, Concrete
Processes: Design → Finishing
Waste Materials: Asbestos (historical)

Company 122
Name: Aster DM Healthcare Solutions
Industry: Healthcare
Products: Pharmaceuticals, Medical Services, Medical Devices
Location: Qatar
Volume: 46723 metric tons of plastic waste
Materials: Medical Supplies, Lab Reagents, Sterile Packaging, Pharmaceuticals
Processes: Research → Surgery
Waste Materials: Gloves

Company 123
Name: Emirates Global Group
Industry: Manufacturing (General)
Products: Aluminum Products, Steel Products, Plastics
Location: United Arab Emirates
Volume: 69798 metric tons of plastic scraps
Materials: Raw Metals, Fabrics, Agricultural Produce, Polymers
Processes: Processing → Finishing → Assembly
Waste Materials: Off-spec products

Company 124
Name: Gulf Oil Industries
Industry: Oil & Gas
Products: Refined Petroleum Products, Petrochemicals
Location: United Arab Emirates
Volume: 97926 metric tons of oil sludge
Materials: Catalysts, Hydrocarbons, Pipelines
Processes: Drilling → Distribution → Refining → Exploration
Waste Materials: Drilling mud

Company 125
Name: Saudi German Hospital Systems
Industry: Healthcare
Products: Pharmaceuticals, Medical Services, Medical Devices
Location: Kuwait
Volume: 24962 metric tons of general waste
Materials: Pharmaceuticals, Medical Supplies, Lab Reagents, Sterile Packaging
Processes: Patient Care → Diagnosis
Waste Materials: Office waste, Food waste

Company 126
Name: Dubai Properties Corp
Industry: Construction & Real Estate
Products: Infrastructure Projects, Hospitality Developments
Location: Kuwait
Volume: 208447 metric tons of packaging waste
Materials: Steel, Glass, Concrete, Plasterboard
Processes: Structural Erection → Foundation Laying
Waste Materials: Cardboard boxes

Company 127
Name: Saudi German Hospital Industries
Industry: Healthcare
Products: Medical Devices, Medical Services
Location: Kuwait
Volume: 31265 metric tons of medical waste
Materials: Sterile Packaging, Medical Supplies, Pharmaceuticals, Lab Reagents
Processes: Diagnosis → Research → Surgery
Waste Materials: Biohazardous waste (blood, tissues), Pathological waste

Company 128
Name: Bahrain Petroleum Solutions
Industry: Oil & Gas
Products: Natural Gas, Petrochemicals, Crude Oil
Location: Oman
Volume: 62932 metric tons of chemical waste
Materials: Drilling Fluids, Pipelines, Catalysts, Hydrocarbons
Processes: Distribution → Drilling → Exploration → Refining
Waste Materials: Spent catalysts

Company 129
Name: Aldar Industries
Industry: Construction & Real Estate
Products: Residential Buildings, Hospitality Developments, Commercial Towers
Location: United Arab Emirates
Volume: 131865 metric tons of packaging waste
Materials: Aluminum, Glass, Steel, Concrete
Processes: Excavation → Structural Erection
Waste Materials: Cardboard boxes, Plastic wraps, Wooden pallets

Company 130
Name: Mediclinic Systems
Industry: Healthcare
Products: Pharmaceuticals, Medical Services
Location: United Arab Emirates
Volume: 27211 metric tons of general waste
Materials: Medical Supplies, Sterile Packaging, Lab Reagents
Processes: Surgery → Diagnosis → Research → Patient Care
Waste Materials: Office waste, Food waste

Company 131
Name: AquaTech Ventures
Industry: Water Treatment
Products: Treated Wastewater, Potable Water
Location: Oman
Volume: 298969 cubic meters of sludge
Materials: Filtration Media, Disinfectants, Raw Water, Chemical Coagulants
Processes: Sludge Treatment → Disinfection
Waste Materials: Biosolids

Company 132
Name: Nakheel Solutions
Industry: Construction & Real Estate
Products: Residential Buildings
Location: United Arab Emirates
Volume: 160352 metric tons of construction & demolition waste
Materials: Steel, Concrete, Wood
Processes: Excavation → Structural Erection → Foundation Laying → Design
Waste Materials: Concrete rubble

Company 133
Name: Mediclinic Enterprises
Industry: Healthcare
Products: Medical Devices, Pharmaceuticals, Diagnostic Services
Location: Saudi Arabia
Volume: 10397 metric tons of medical waste
Materials: Sterile Packaging, Medical Supplies
Processes: Diagnosis → Surgery
Waste Materials: Pathological waste, Contaminated PPE

Company 134
Name: Gulf Manufacturing Systems
Industry: Manufacturing (General)
Products: Textiles, Aluminum Products, Plastics
Location: Oman
Volume: 10511 metric tons of metal scraps
Materials: Fabrics, Polymers, Raw Metals, Agricultural Produce
Processes: Finishing → Processing → Assembly
Waste Materials: Aluminum offcuts

Company 135
Name: DEWA Services
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater, Potable Water
Location: Oman
Volume: 188867 cubic meters of filter media waste
Materials: Disinfectants, Filtration Media
Processes: Sludge Treatment → Coagulation → Disinfection
Waste Materials: Spent activated carbon, Sand filter media

Company 136
Name: FedEx Group
Industry: Logistics & Transportation
Products: Delivery Services
Location: Bahrain
Volume: 63034 metric tons of scrap metal
Materials: Vehicle Parts, Fuel
Processes: Transporting → Storage → Unloading → Loading
Waste Materials: Vehicle parts, Containers

Company 137
Name: Azizi Holdings
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Oman
Volume: 195699 metric tons of construction & demolition waste
Materials: Steel, Aluminum
Processes: Finishing → Design
Waste Materials: Wood scraps

Company 138
Name: Cleveland Clinic Abu Dhabi Industries
Industry: Healthcare
Products: Medical Devices, Diagnostic Services
Location: Bahrain
Volume: 43521 metric tons of general waste
Materials: Sterile Packaging, Pharmaceuticals, Medical Supplies
Processes: Patient Care → Surgery
Waste Materials: Food waste

Company 139
Name: Metito Solutions
Industry: Water Treatment
Products: Reclaimed Water, Treated Wastewater
Location: Oman
Volume: 235103 cubic meters of chemical waste
Materials: Chemical Coagulants, Raw Water
Processes: Coagulation → Disinfection
Waste Materials: Residual chemicals

Company 140
Name: Nakheel Corp
Industry: Construction & Real Estate
Products: Commercial Towers, Residential Buildings, Hospitality Developments
Location: United Arab Emirates
Volume: 104389 metric tons of packaging waste
Materials: Steel, Concrete, Wood
Processes: Excavation → Design → Finishing → Foundation Laying
Waste Materials: Plastic wraps

Company 141
Name: ADSSC Enterprises
Industry: Water Treatment
Products: Reclaimed Water, Potable Water, Treated Wastewater
Location: United Arab Emirates
Volume: 80944 cubic meters of sludge
Materials: Chemical Coagulants, Raw Water
Processes: Coagulation → Sludge Treatment → Filtration
Waste Materials: Dewatered sludge cake, Biosolids

Company 142
Name: Saudi German Hospital Solutions
Industry: Healthcare
Products: Diagnostic Services, Medical Devices
Location: United Arab Emirates
Volume: 19590 metric tons of general waste
Materials: Lab Reagents, Medical Supplies, Pharmaceuticals, Sterile Packaging
Processes: Research → Patient Care → Diagnosis → Surgery
Waste Materials: Office waste, Food waste

Company 143
Name: Kuwait Oil Company Solutions
Industry: Oil & Gas
Products: Refined Petroleum Products
Location: Kuwait
Volume: 261648 metric tons of chemical waste
Materials: Catalysts, Hydrocarbons
Processes: Distribution → Refining → Drilling
Waste Materials: Acids

Company 144
Name: Al Futtaim Services
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Bahrain
Volume: 268948 metric tons of hazardous waste
Materials: Concrete, Wood, Plasterboard
Processes: Design → Foundation Laying
Waste Materials: Adhesives, Solvents

Company 145
Name: Cleveland Clinic Abu Dhabi Group
Industry: Healthcare
Products: Medical Services, Diagnostic Services
Location: Kuwait
Volume: 34051 metric tons of general waste
Materials: Lab Reagents, Medical Supplies
Processes: Diagnosis → Surgery → Patient Care
Waste Materials: Food waste, Office waste

Company 146
Name: Arabian Industries Group
Industry: Manufacturing (General)
Products: Textiles, Food Products
Location: Kuwait
Volume: 27808 metric tons of plastic scraps
Materials: Agricultural Produce, Polymers, Raw Metals
Processes: Finishing → Processing
Waste Materials: Edge trims, Molding waste

Company 147
Name: FoodCo Solutions
Industry: Manufacturing (General)
Products: Aluminum Products, Steel Products
Location: Qatar
Volume: 87230 metric tons of metal scraps
Materials: Raw Metals, Agricultural Produce
Processes: Casting → Assembly → Molding
Waste Materials: Aluminum offcuts, Steel shavings

Company 148
Name: QatarEnergy Systems
Industry: Oil & Gas
Products: Natural Gas, Crude Oil, Refined Petroleum Products
Location: Bahrain
Volume: 411367 metric tons of produced water
Materials: Pipelines, Catalysts, Hydrocarbons, Drilling Fluids
Processes: Distribution → Refining → Exploration
Waste Materials: Hydrocarbons, Heavy metals, Brine

Company 149
Name: Aster DM Healthcare Systems
Industry: Healthcare
Products: Medical Services, Pharmaceuticals, Medical Devices
Location: Qatar
Volume: 43172 metric tons of plastic waste
Materials: Sterile Packaging, Pharmaceuticals, Medical Supplies
Processes: Patient Care → Diagnosis
Waste Materials: Syringes, Packaging, IV bags

Company 150
Name: Mediclinic Systems
Industry: Healthcare
Products: Diagnostic Services
Location: Kuwait
Volume: 48667 metric tons of medical waste
Materials: Medical Supplies, Pharmaceuticals, Sterile Packaging
Processes: Research → Patient Care → Surgery → Diagnosis
Waste Materials: Sharps (needles, scalpels)

Company 151
Name: Rixos Holdings
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: United Arab Emirates
Volume: 37670 metric tons of paper & cardboard
Materials: Food & Beverages, Paper Products, Cleaning Supplies, Linens
Processes: Housekeeping → Catering → Maintenance → Guest Services
Waste Materials: Magazines

Company 152
Name: Rixos Ventures
Industry: Tourism & Hospitality
Products: Event Management, Restaurant Services
Location: Kuwait
Volume: 42640 metric tons of plastic waste
Materials: Cleaning Supplies, Food & Beverages, Linens
Processes: Catering → Housekeeping → Guest Services
Waste Materials: Packaging films, Water bottles

Company 153
Name: Mediclinic Systems
Industry: Healthcare
Products: Pharmaceuticals, Medical Services, Medical Devices
Location: Saudi Arabia
Volume: 41479 metric tons of general waste
Materials: Sterile Packaging, Pharmaceuticals, Medical Supplies, Lab Reagents
Processes: Diagnosis → Research → Patient Care
Waste Materials: Food waste

Company 154
Name: Emaar Ventures
Industry: Construction & Real Estate
Products: Commercial Towers
Location: United Arab Emirates
Volume: 41027 metric tons of hazardous waste
Materials: Steel, Concrete, Wood, Plasterboard
Processes: Structural Erection → Finishing
Waste Materials: Paint cans, Asbestos (historical)

Company 155
Name: Aldar Systems
Industry: Construction & Real Estate
Products: Hospitality Developments, Commercial Towers, Residential Buildings
Location: Bahrain
Volume: 197281 metric tons of construction & demolition waste
Materials: Glass, Wood
Processes: Structural Erection → Excavation
Waste Materials: Wood scraps, Bricks, Plasterboard

Company 156
Name: NMC Health Solutions
Industry: Healthcare
Products: Pharmaceuticals
Location: Kuwait
Volume: 46411 metric tons of general waste
Materials: Pharmaceuticals, Sterile Packaging, Medical Supplies
Processes: Research → Surgery
Waste Materials: Office waste, Food waste

Company 157
Name: QatarEnergy Services
Industry: Oil & Gas
Products: Natural Gas, Petrochemicals
Location: Oman
Volume: 262746 metric tons of chemical waste
Materials: Hydrocarbons, Pipelines, Drilling Fluids, Catalysts
Processes: Distribution → Exploration → Refining → Drilling
Waste Materials: Alkalis, Acids

Company 158
Name: AquaTech Group
Industry: Water Treatment
Products: Reclaimed Water, Potable Water, Treated Wastewater
Location: Qatar
Volume: 318355 cubic meters of chemical waste
Materials: Filtration Media, Raw Water, Disinfectants
Processes: Filtration → Disinfection
Waste Materials: Residual chemicals

Company 159
Name: Rixos Services
Industry: Tourism & Hospitality
Products: Resort Experiences
Location: Saudi Arabia
Volume: 47951 metric tons of glass waste
Materials: Food & Beverages, Linens, Paper Products
Processes: Housekeeping → Catering → Maintenance → Guest Services
Waste Materials: Bottles

Company 160
Name: Bahri Holdings
Industry: Logistics & Transportation
Products: Freight Forwarding, Delivery Services, Cargo Shipping
Location: Kuwait
Volume: 66655 metric tons of packaging waste
Materials: Fuel, Vehicle Parts
Processes: Storage → Loading → Unloading
Waste Materials: Wooden pallets, Plastic films, Cardboard boxes

Company 161
Name: DP World Industries
Industry: Logistics & Transportation
Products: Delivery Services, Freight Forwarding, Warehousing
Location: Saudi Arabia
Volume: 42666 metric tons of scrap metal
Materials: Fuel, Packaging Materials, Vehicle Parts
Processes: Unloading → Loading → Transporting
Waste Materials: Vehicle parts, Containers

Company 162
Name: Suez Services
Industry: Water Treatment
Products: Treated Wastewater
Location: Qatar
Volume: 189584 cubic meters of sludge
Materials: Disinfectants, Raw Water, Filtration Media, Chemical Coagulants
Processes: Sludge Treatment → Filtration → Disinfection
Waste Materials: Chemical sludge, Dewatered sludge cake, Biosolids

Company 163
Name: Mediclinic Group
Industry: Healthcare
Products: Diagnostic Services, Pharmaceuticals
Location: Bahrain
Volume: 37444 metric tons of general waste
Materials: Lab Reagents, Medical Supplies, Pharmaceuticals, Sterile Packaging
Processes: Research → Diagnosis → Surgery
Waste Materials: Office waste

Company 164
Name: Jumeirah Ventures
Industry: Tourism & Hospitality
Products: Restaurant Services, Event Management, Hotel Stays
Location: Saudi Arabia
Volume: 21871 metric tons of paper & cardboard
Materials: Cleaning Supplies, Food & Beverages
Processes: Catering → Guest Services → Housekeeping → Maintenance
Waste Materials: Magazines, Newspapers, Cardboard boxes

Company 165
Name: Address Hotels Group
Industry: Tourism & Hospitality
Products: Restaurant Services, Hotel Stays
Location: Saudi Arabia
Volume: 20512 metric tons of glass waste
Materials: Linens, Food & Beverages, Cleaning Supplies, Paper Products
Processes: Guest Services → Catering
Waste Materials: Bottles, Jars

Company 166
Name: Emirates Global Group
Industry: Manufacturing (General)
Products: Plastics, Food Products, Steel Products
Location: United Arab Emirates
Volume: 95175 metric tons of organic by-products
Materials: Polymers, Raw Metals, Agricultural Produce
Processes: Processing → Casting
Waste Materials: Textile offcuts

Company 167
Name: Aramex Corp
Industry: Logistics & Transportation
Products: Delivery Services, Freight Forwarding, Cargo Shipping
Location: Saudi Arabia
Volume: 97356 metric tons of tyre waste
Materials: Vehicle Parts, Fuel, Packaging Materials
Processes: Storage → Transporting
Waste Materials: Used vehicle tyres

Company 168
Name: Saudi Aramco Services
Industry: Oil & Gas
Products: Crude Oil, Petrochemicals
Location: Oman
Volume: 363955 metric tons of produced water
Materials: Drilling Fluids, Pipelines, Hydrocarbons
Processes: Distribution → Exploration → Refining → Drilling
Waste Materials: Heavy metals

Company 169
Name: FedEx Industries
Industry: Logistics & Transportation
Products: Delivery Services, Freight Forwarding, Warehousing
Location: Kuwait
Volume: 91787 metric tons of packaging waste
Materials: Packaging Materials, Vehicle Parts, Fuel
Processes: Transporting → Loading
Waste Materials: Plastic films

Company 170
Name: ADNOC Systems
Industry: Oil & Gas
Products: Natural Gas, Refined Petroleum Products, Crude Oil
Location: Qatar
Volume: 298381 metric tons of produced water
Materials: Pipelines, Hydrocarbons, Catalysts
Processes: Drilling → Refining → Distribution → Exploration
Waste Materials: Brine, Hydrocarbons

Company 171
Name: Cleveland Clinic Abu Dhabi Industries
Industry: Healthcare
Products: Medical Services
Location: Kuwait
Volume: 48741 metric tons of plastic waste
Materials: Pharmaceuticals, Sterile Packaging, Medical Supplies, Lab Reagents
Processes: Research → Diagnosis → Surgery → Patient Care
Waste Materials: Syringes, Packaging, Gloves

Company 172
Name: Rixos Ventures
Industry: Tourism & Hospitality
Products: Hotel Stays, Event Management
Location: United Arab Emirates
Volume: 14331 metric tons of paper & cardboard
Materials: Linens, Paper Products, Food & Beverages
Processes: Housekeeping → Guest Services
Waste Materials: Magazines, Newspapers

Company 173
Name: Veolia Systems
Industry: Water Treatment
Products: Reclaimed Water, Potable Water, Treated Wastewater
Location: Qatar
Volume: 131392 cubic meters of filter media waste
Materials: Disinfectants, Raw Water, Filtration Media
Processes: Disinfection → Sludge Treatment
Waste Materials: Spent activated carbon, Sand filter media

Company 174
Name: Marafiq Systems
Industry: Water Treatment
Products: Potable Water, Reclaimed Water
Location: Kuwait
Volume: 436564 cubic meters of filter media waste
Materials: Raw Water, Disinfectants, Chemical Coagulants, Filtration Media
Processes: Sludge Treatment → Coagulation → Disinfection → Filtration
Waste Materials: Spent activated carbon, Sand filter media

Company 175
Name: Emirates Global Systems
Industry: Manufacturing (General)
Products: Plastics, Textiles
Location: Bahrain
Volume: 10436 metric tons of chemical waste
Materials: Polymers, Raw Metals, Fabrics, Agricultural Produce
Processes: Finishing → Molding → Processing → Assembly
Waste Materials: Lubricants, Process chemicals, Spent solvents

Company 176
Name: DHL Group
Industry: Logistics & Transportation
Products: Warehousing, Cargo Shipping, Freight Forwarding
Location: Bahrain
Volume: 56884 metric tons of packaging waste
Materials: Packaging Materials, Fuel, Vehicle Parts
Processes: Storage → Loading → Unloading → Transporting
Waste Materials: Wooden pallets

Company 177
Name: Emaar Systems
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Kuwait
Volume: 288015 metric tons of hazardous waste
Materials: Concrete, Aluminum
Processes: Design → Foundation Laying → Excavation
Waste Materials: Adhesives, Paint cans

Company 178
Name: Nakheel Solutions
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Saudi Arabia
Volume: 55102 metric tons of hazardous waste
Materials: Plasterboard, Steel
Processes: Structural Erection → Finishing
Waste Materials: Adhesives, Paint cans

Company 179
Name: DHL Services
Industry: Logistics & Transportation
Products: Delivery Services, Cargo Shipping, Freight Forwarding
Location: Bahrain
Volume: 53897 metric tons of packaging waste
Materials: Packaging Materials, Vehicle Parts, Fuel
Processes: Unloading → Transporting → Storage
Waste Materials: Cardboard boxes, Wooden pallets, Plastic films

Company 180
Name: Metito Group
Industry: Water Treatment
Products: Treated Wastewater, Potable Water
Location: Bahrain
Volume: 150675 cubic meters of chemical waste
Materials: Filtration Media, Chemical Coagulants, Disinfectants, Raw Water
Processes: Filtration → Sludge Treatment
Waste Materials: Cleaning agents, Residual chemicals

Company 181
Name: Bahrain Petroleum Enterprises
Industry: Oil & Gas
Products: Natural Gas, Crude Oil, Refined Petroleum Products
Location: Saudi Arabia
Volume: 84035 metric tons of produced water
Materials: Hydrocarbons, Pipelines
Processes: Drilling → Exploration → Refining
Waste Materials: Brine

Company 182
Name: Veolia Ventures
Industry: Water Treatment
Products: Reclaimed Water
Location: Kuwait
Volume: 364829 cubic meters of chemical waste
Materials: Filtration Media, Raw Water, Disinfectants
Processes: Filtration → Disinfection → Sludge Treatment
Waste Materials: Residual chemicals, Cleaning agents

Company 183
Name: Marafiq Holdings
Industry: Water Treatment
Products: Treated Wastewater, Reclaimed Water
Location: Bahrain
Volume: 334504 cubic meters of chemical waste
Materials: Raw Water, Disinfectants
Processes: Sludge Treatment → Filtration → Disinfection → Coagulation
Waste Materials: Residual chemicals, Cleaning agents

Company 184
Name: DAMAC Systems
Industry: Construction & Real Estate
Products: Infrastructure Projects, Hospitality Developments
Location: Saudi Arabia
Volume: 293867 metric tons of hazardous waste
Materials: Wood, Glass, Steel, Concrete
Processes: Excavation → Foundation Laying
Waste Materials: Adhesives

Company 185
Name: FedEx Solutions
Industry: Logistics & Transportation
Products: Cargo Shipping, Freight Forwarding
Location: United Arab Emirates
Volume: 72872 metric tons of packaging waste
Materials: Packaging Materials, Vehicle Parts
Processes: Storage → Unloading → Loading → Transporting
Waste Materials: Plastic films

Company 186
Name: Bahri Holdings
Industry: Logistics & Transportation
Products: Freight Forwarding, Warehousing
Location: Qatar
Volume: 49326 metric tons of tyre waste
Materials: Vehicle Parts, Packaging Materials
Processes: Unloading → Transporting → Storage → Loading
Waste Materials: Used vehicle tyres

Company 187
Name: Gulf Oil Systems
Industry: Oil & Gas
Products: Crude Oil, Petrochemicals, Refined Petroleum Products
Location: Bahrain
Volume: 209734 metric tons of produced water
Materials: Catalysts, Drilling Fluids, Hydrocarbons
Processes: Distribution → Refining
Waste Materials: Heavy metals, Brine, Hydrocarbons

Company 188
Name: TextilePro Industries
Industry: Manufacturing (General)
Products: Food Products, Textiles
Location: Kuwait
Volume: 39925 metric tons of organic by-products
Materials: Fabrics, Agricultural Produce, Polymers, Raw Metals
Processes: Finishing → Molding → Assembly
Waste Materials: Textile offcuts, Food processing waste

Company 189
Name: Veolia Solutions
Industry: Water Treatment
Products: Potable Water
Location: United Arab Emirates
Volume: 75886 cubic meters of sludge
Materials: Filtration Media, Chemical Coagulants
Processes: Disinfection → Sludge Treatment → Filtration
Waste Materials: Dewatered sludge cake, Biosolids

Company 190
Name: Saudi German Hospital Ventures
Industry: Healthcare
Products: Pharmaceuticals
Location: Qatar
Volume: 42655 metric tons of medical waste
Materials: Sterile Packaging, Lab Reagents, Medical Supplies
Processes: Research → Surgery → Patient Care
Waste Materials: Contaminated PPE, Pathological waste, Sharps (needles, scalpels)

Company 191
Name: TextilePro Ventures
Industry: Manufacturing (General)
Products: Textiles
Location: Bahrain
Volume: 72588 metric tons of chemical waste
Materials: Agricultural Produce, Raw Metals
Processes: Processing → Assembly → Casting → Finishing
Waste Materials: Lubricants, Spent solvents

Company 192
Name: Cleveland Clinic Abu Dhabi Systems
Industry: Healthcare
Products: Medical Devices, Diagnostic Services
Location: Saudi Arabia
Volume: 10356 metric tons of general waste
Materials: Pharmaceuticals, Medical Supplies, Sterile Packaging
Processes: Surgery → Patient Care → Diagnosis
Waste Materials: Office waste, Food waste

Company 193
Name: Emaar Hospitality Enterprises
Industry: Tourism & Hospitality
Products: Hotel Stays
Location: Kuwait
Volume: 50574 metric tons of organic waste
Materials: Paper Products, Cleaning Supplies, Linens, Food & Beverages
Processes: Catering → Guest Services
Waste Materials: Garden waste, Coffee grounds, Food scraps

Company 194
Name: NMC Health Corp
Industry: Healthcare
Products: Medical Services, Diagnostic Services, Pharmaceuticals
Location: United Arab Emirates
Volume: 13722 metric tons of general waste
Materials: Pharmaceuticals, Medical Supplies, Lab Reagents
Processes: Patient Care → Diagnosis
Waste Materials: Food waste, Office waste

Company 195
Name: Hilton Group
Industry: Tourism & Hospitality
Products: Event Management, Hotel Stays, Restaurant Services
Location: Saudi Arabia
Volume: 97693 metric tons of plastic waste
Materials: Food & Beverages, Cleaning Supplies, Paper Products
Processes: Housekeeping → Maintenance → Catering
Waste Materials: Single-use plastics, Water bottles, Packaging films

Company 196
Name: Aramex Holdings
Industry: Logistics & Transportation
Products: Warehousing, Delivery Services
Location: Qatar
Volume: 72905 metric tons of scrap metal
Materials: Fuel, Packaging Materials, Vehicle Parts
Processes: Unloading → Transporting → Loading
Waste Materials: Vehicle parts, Containers

Company 197
Name: Address Hotels Solutions
Industry: Tourism & Hospitality
Products: Resort Experiences
Location: Oman
Volume: 81231 metric tons of glass waste
Materials: Food & Beverages, Linens, Paper Products, Cleaning Supplies
Processes: Maintenance → Guest Services → Catering → Housekeeping
Waste Materials: Jars, Bottles

Company 198
Name: DP World Services
Industry: Logistics & Transportation
Products: Delivery Services
Location: Saudi Arabia
Volume: 92443 metric tons of used oils & lubricants
Materials: Fuel, Packaging Materials, Vehicle Parts
Processes: Loading → Transporting → Unloading → Storage
Waste Materials: Hydraulic fluid, Engine oil

Company 199
Name: FoodCo Services
Industry: Manufacturing (General)
Products: Textiles, Steel Products
Location: Qatar
Volume: 63017 metric tons of chemical waste
Materials: Raw Metals, Polymers
Processes: Casting → Finishing → Assembly
Waste Materials: Lubricants, Process chemicals

Company 200
Name: Nakheel Solutions
Industry: Construction & Real Estate
Products: Hospitality Developments, Infrastructure Projects
Location: Saudi Arabia
Volume: 73130 metric tons of hazardous waste
Materials: Plasterboard, Glass, Concrete
Processes: Design → Structural Erection → Finishing
Waste Materials: Solvents, Asbestos (historical)

Company 201
Name: Hilton Holdings
Industry: Tourism & Hospitality
Products: Event Management, Restaurant Services, Resort Experiences
Location: Bahrain
Volume: 99505 metric tons of organic waste
Materials: Linens, Food & Beverages, Cleaning Supplies
Processes: Housekeeping → Guest Services
Waste Materials: Food scraps

Company 202
Name: Azizi Services
Industry: Construction & Real Estate
Products: Commercial Towers, Hospitality Developments, Infrastructure Projects
Location: Bahrain
Volume: 154375 metric tons of hazardous waste
Materials: Plasterboard, Concrete, Steel
Processes: Excavation → Foundation Laying → Structural Erection → Finishing
Waste Materials: Solvents, Asbestos (historical), Paint cans

Company 203
Name: DAMAC Solutions
Industry: Construction & Real Estate
Products: Commercial Towers
Location: United Arab Emirates
Volume: 58475 metric tons of construction & demolition waste
Materials: Steel, Concrete, Aluminum
Processes: Finishing → Structural Erection
Waste Materials: Bricks

Company 204
Name: Kuwait Oil Company Holdings
Industry: Oil & Gas
Products: Refined Petroleum Products, Crude Oil, Petrochemicals
Location: Kuwait
Volume: 405021 metric tons of solid waste
Materials: Catalysts, Pipelines, Hydrocarbons, Drilling Fluids
Processes: Distribution → Exploration → Refining
Waste Materials: Used filters, Drill cuttings, Contaminated soil

Company 205
Name: DHL Services
Industry: Logistics & Transportation
Products: Warehousing, Delivery Services
Location: Oman
Volume: 14655 metric tons of packaging waste
Materials: Fuel, Packaging Materials, Vehicle Parts
Processes: Loading → Unloading → Storage → Transporting
Waste Materials: Plastic films, Wooden pallets

Company 206
Name: PetroChem Ventures
Industry: Oil & Gas
Products: Natural Gas, Crude Oil
Location: Bahrain
Volume: 159432 metric tons of oil sludge
Materials: Pipelines, Catalysts, Hydrocarbons
Processes: Drilling → Distribution → Exploration → Refining
Waste Materials: Drilling mud, Tank bottom sludge

Company 207
Name: DEWA Holdings
Industry: Water Treatment
Products: Potable Water
Location: United Arab Emirates
Volume: 475553 cubic meters of chemical waste
Materials: Chemical Coagulants, Disinfectants
Processes: Filtration → Sludge Treatment → Coagulation
Waste Materials: Cleaning agents, Residual chemicals

Company 208
Name: Marriott Solutions
Industry: Tourism & Hospitality
Products: Resort Experiences, Hotel Stays
Location: Kuwait
Volume: 27233 metric tons of plastic waste
Materials: Linens, Paper Products, Food & Beverages, Cleaning Supplies
Processes: Maintenance → Guest Services → Housekeeping
Waste Materials: Packaging films, Single-use plastics, Water bottles

Company 209
Name: ADNOC Industries
Industry: Oil & Gas
Products: Refined Petroleum Products, Natural Gas, Crude Oil
Location: Oman
Volume: 339228 metric tons of solid waste
Materials: Drilling Fluids, Catalysts, Pipelines, Hydrocarbons
Processes: Exploration → Drilling → Refining
Waste Materials: Used filters, Drill cuttings, Contaminated soil

Company 210
Name: Accor Corp
Industry: Tourism & Hospitality
Products: Hotel Stays, Restaurant Services
Location: Bahrain
Volume: 47042 metric tons of organic waste
Materials: Paper Products, Cleaning Supplies, Food & Beverages, Linens
Processes: Housekeeping → Guest Services → Maintenance
Waste Materials: Food scraps, Garden waste

Company 211
Name: Aster DM Healthcare Corp
Industry: Healthcare
Products: Diagnostic Services, Medical Services, Pharmaceuticals
Location: Qatar
Volume: 33339 metric tons of plastic waste
Materials: Medical Supplies, Lab Reagents, Sterile Packaging
Processes: Surgery → Diagnosis
Waste Materials: Gloves, IV bags

Company 212
Name: FoodCo Ventures
Industry: Manufacturing (General)
Products: Plastics
Location: Saudi Arabia
Volume: 87896 metric tons of metal scraps
Materials: Polymers, Fabrics
Processes: Assembly → Finishing → Casting
Waste Materials: Aluminum offcuts, Steel shavings, Copper wire

Company 213
Name: NMC Health Group
Industry: Healthcare
Products: Medical Devices, Medical Services, Diagnostic Services
Location: Saudi Arabia
Volume: 46137 metric tons of general waste
Materials: Pharmaceuticals, Sterile Packaging, Medical Supplies, Lab Reagents
Processes: Diagnosis → Surgery → Research
Waste Materials: Food waste

Company 214
Name: Marafiq Solutions
Industry: Water Treatment
Products: Reclaimed Water, Potable Water
Location: Oman
Volume: 425636 cubic meters of filter media waste
Materials: Filtration Media, Disinfectants, Chemical Coagulants, Raw Water
Processes: Filtration → Disinfection → Sludge Treatment
Waste Materials: Sand filter media

Company 215
Name: FoodCo Enterprises
Industry: Manufacturing (General)
Products: Steel Products, Textiles, Aluminum Products
Location: Saudi Arabia
Volume: 29943 metric tons of organic by-products
Materials: Polymers, Fabrics, Agricultural Produce
Processes: Molding → Processing → Casting
Waste Materials: Food processing waste

Company 216
Name: Arabtec Group
Industry: Construction & Real Estate
Products: Residential Buildings, Hospitality Developments
Location: Kuwait
Volume: 265528 metric tons of hazardous waste
Materials: Wood, Steel
Processes: Finishing → Excavation
Waste Materials: Asbestos (historical), Solvents, Paint cans

Company 217
Name: Address Hotels Services
Industry: Tourism & Hospitality
Products: Resort Experiences
Location: Saudi Arabia
Volume: 33716 metric tons of paper & cardboard
Materials: Food & Beverages, Cleaning Supplies, Linens
Processes: Catering → Housekeeping → Guest Services → Maintenance
Waste Materials: Magazines

Company 218
Name: Mediclinic Ventures
Industry: Healthcare
Products: Diagnostic Services, Pharmaceuticals, Medical Devices
Location: Qatar
Volume: 41945 metric tons of plastic waste
Materials: Lab Reagents, Pharmaceuticals, Medical Supplies, Sterile Packaging
Processes: Patient Care → Surgery → Research
Waste Materials: IV bags, Gloves

Company 219
Name: Arabtec Systems
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Qatar
Volume: 64624 metric tons of packaging waste
Materials: Plasterboard, Glass, Wood
Processes: Design → Structural Erection → Finishing
Waste Materials: Wooden pallets, Cardboard boxes, Plastic wraps

Company 220
Name: Bahrain Petroleum Industries
Industry: Oil & Gas
Products: Refined Petroleum Products
Location: Saudi Arabia
Volume: 324081 metric tons of chemical waste
Materials: Pipelines, Drilling Fluids
Processes: Refining → Drilling → Distribution
Waste Materials: Spent catalysts, Acids

Company 221
Name: Arabian Industries Ventures
Industry: Manufacturing (General)
Products: Food Products, Aluminum Products
Location: Oman
Volume: 31343 metric tons of organic by-products
Materials: Fabrics, Agricultural Produce, Polymers, Raw Metals
Processes: Assembly → Molding → Finishing
Waste Materials: Textile offcuts

Company 222
Name: Gulf Oil Holdings
Industry: Oil & Gas
Products: Crude Oil
Location: Kuwait
Volume: 475453 metric tons of oil sludge
Materials: Hydrocarbons, Drilling Fluids, Pipelines
Processes: Exploration → Distribution → Refining → Drilling
Waste Materials: Drilling mud, Tank bottom sludge

Company 223
Name: Emaar Systems
Industry: Construction & Real Estate
Products: Commercial Towers, Residential Buildings
Location: Bahrain
Volume: 210462 metric tons of packaging waste
Materials: Steel, Plasterboard, Wood, Concrete
Processes: Structural Erection → Foundation Laying → Design
Waste Materials: Wooden pallets, Cardboard boxes, Plastic wraps

Company 224
Name: NMC Health Systems
Industry: Healthcare
Products: Medical Services, Medical Devices
Location: Saudi Arabia
Volume: 44324 metric tons of general waste
Materials: Lab Reagents, Sterile Packaging, Medical Supplies
Processes: Diagnosis → Research → Surgery → Patient Care
Waste Materials: Food waste, Office waste

Company 225
Name: TextilePro Solutions
Industry: Manufacturing (General)
Products: Steel Products, Plastics
Location: United Arab Emirates
Volume: 14982 metric tons of plastic scraps
Materials: Fabrics, Polymers
Processes: Molding → Processing
Waste Materials: Molding waste, Off-spec products

Company 226
Name: EnergyCo Ventures
Industry: Oil & Gas
Products: Natural Gas, Refined Petroleum Products, Petrochemicals
Location: Qatar
Volume: 171010 metric tons of chemical waste
Materials: Drilling Fluids, Catalysts, Hydrocarbons
Processes: Exploration → Distribution → Refining → Drilling
Waste Materials: Spent catalysts

Company 227
Name: Address Hotels Enterprises
Industry: Tourism & Hospitality
Products: Restaurant Services, Resort Experiences
Location: Saudi Arabia
Volume: 86782 metric tons of organic waste
Materials: Paper Products, Linens, Food & Beverages, Cleaning Supplies
Processes: Maintenance → Housekeeping → Guest Services
Waste Materials: Food scraps

Company 228
Name: Aldar Group
Industry: Construction & Real Estate
Products: Hospitality Developments
Location: Oman
Volume: 292213 metric tons of packaging waste
Materials: Concrete, Wood
Processes: Foundation Laying → Finishing
Waste Materials: Plastic wraps

Company 229
Name: QatarEnergy Enterprises
Industry: Oil & Gas
Products: Natural Gas, Petrochemicals
Location: Kuwait
Volume: 96287 metric tons of solid waste
Materials: Pipelines, Catalysts, Hydrocarbons
Processes: Refining → Exploration → Drilling
Waste Materials: Contaminated soil

Company 230
Name: NMC Health Ventures
Industry: Healthcare
Products: Medical Services, Diagnostic Services
Location: Oman
Volume: 30136 metric tons of plastic waste
Materials: Pharmaceuticals, Medical Supplies
Processes: Surgery → Diagnosis → Research
Waste Materials: IV bags, Syringes

Company 231
Name: Rixos Enterprises
Industry: Tourism & Hospitality
Products: Restaurant Services, Event Management, Resort Experiences
Location: Oman
Volume: 99826 metric tons of plastic waste
Materials: Paper Products, Food & Beverages
Processes: Guest Services → Maintenance
Waste Materials: Water bottles, Single-use plastics, Packaging films

Company 232
Name: Saudi German Hospital Corp
Industry: Healthcare
Products: Pharmaceuticals, Medical Devices
Location: Kuwait
Volume: 44540 metric tons of general waste
Materials: Pharmaceuticals, Sterile Packaging, Lab Reagents, Medical Supplies
Processes: Patient Care → Diagnosis → Research → Surgery
Waste Materials: Office waste, Food waste

Company 233
Name: Emirates Logistics Systems
Industry: Logistics & Transportation
Products: Delivery Services, Warehousing, Cargo Shipping
Location: Oman
Volume: 48575 metric tons of scrap metal
Materials: Packaging Materials, Vehicle Parts, Fuel
Processes: Unloading → Transporting
Waste Materials: Containers

Company 234
Name: Aluminium Gulf Solutions
Industry: Manufacturing (General)
Products: Textiles
Location: Bahrain
Volume: 82020 metric tons of plastic scraps
Materials: Fabrics, Agricultural Produce, Polymers, Raw Metals
Processes: Processing → Assembly → Finishing
Waste Materials: Molding waste, Off-spec products, Edge trims

Company 235
Name: Aldar Industries
Industry: Construction & Real Estate
Products: Residential Buildings
Location: Bahrain
Volume: 247242 metric tons of construction & demolition waste
Materials: Glass, Steel
Processes: Structural Erection → Excavation
Waste Materials: Plasterboard, Tiles, Concrete rubble

Company 236
Name: Marriott Group
Industry: Tourism & Hospitality
Products: Restaurant Services, Event Management
Location: Qatar
Volume: 32899 metric tons of paper & cardboard
Materials: Linens, Food & Beverages
Processes: Guest Services → Catering → Housekeeping → Maintenance
Waste Materials: Cardboard boxes, Newspapers, Magazines

Company 237
Name: Emirates Global Ventures
Industry: Manufacturing (General)
Products: Aluminum Products
Location: Oman
Volume: 75890 metric tons of organic by-products
Materials: Polymers, Raw Metals, Agricultural Produce
Processes: Molding → Processing → Casting
Waste Materials: Food processing waste, Textile offcuts

Company 238
Name: Steel Gulf Systems
Industry: Manufacturing (General)
Products: Textiles, Plastics, Steel Products
Location: Bahrain
Volume: 60065 metric tons of organic by-products
Materials: Raw Metals, Polymers
Processes: Molding → Casting → Finishing
Waste Materials: Textile offcuts, Food processing waste

Company 239
Name: Emirates Logistics Enterprises
Industry: Logistics & Transportation
Products: Cargo Shipping
Location: Saudi Arabia
Volume: 96835 metric tons of used oils & lubricants
Materials: Vehicle Parts, Packaging Materials, Fuel
Processes: Storage → Unloading → Transporting
Waste Materials: Engine oil

Company 240
Name: Saudi German Hospital Systems
Industry: Healthcare
Products: Diagnostic Services, Pharmaceuticals, Medical Services
Location: Bahrain
Volume: 34629 metric tons of plastic waste
Materials: Sterile Packaging, Lab Reagents, Pharmaceuticals
Processes: Research → Patient Care → Diagnosis
Waste Materials: Packaging, Gloves

Company 241
Name: NMC Health Services
Industry: Healthcare
Products: Pharmaceuticals, Diagnostic Services, Medical Devices
Location: Saudi Arabia
Volume: 11651 metric tons of plastic waste
Materials: Medical Supplies, Lab Reagents
Processes: Diagnosis → Patient Care → Research → Surgery
Waste Materials: IV bags, Packaging

Company 242
Name: Al Futtaim Solutions
Industry: Construction & Real Estate
Products: Commercial Towers, Infrastructure Projects
Location: Oman
Volume: 140720 metric tons of construction & demolition waste
Materials: Aluminum, Plasterboard, Wood, Glass
Processes: Foundation Laying → Structural Erection
Waste Materials: Concrete rubble

Company 243
Name: Agility Systems
Industry: Logistics & Transportation
Products: Freight Forwarding, Warehousing, Cargo Shipping
Location: Qatar
Volume: 39744 metric tons of used oils & lubricants
Materials: Packaging Materials, Fuel, Vehicle Parts
Processes: Loading → Storage
Waste Materials: Engine oil, Hydraulic fluid

Company 244
Name: Cleveland Clinic Abu Dhabi Services
Industry: Healthcare
Products: Medical Services, Pharmaceuticals
Location: United Arab Emirates
Volume: 31895 metric tons of general waste
Materials: Sterile Packaging, Pharmaceuticals, Medical Supplies
Processes: Patient Care → Surgery → Diagnosis → Research
Waste Materials: Food waste, Office waste

Company 245
Name: Aster DM Healthcare Services
Industry: Healthcare
Products: Medical Devices, Diagnostic Services
Location: United Arab Emirates
Volume: 34667 metric tons of plastic waste
Materials: Pharmaceuticals, Medical Supplies, Sterile Packaging, Lab Reagents
Processes: Diagnosis → Research → Patient Care
Waste Materials: IV bags, Gloves

Company 246
Name: Arabtec Holdings
Industry: Construction & Real Estate
Products: Commercial Towers
Location: Oman
Volume: 207150 metric tons of construction & demolition waste
Materials: Steel, Concrete, Glass, Wood
Processes: Finishing → Excavation
Waste Materials: Concrete rubble, Metal scraps

Company 247
Name: Accor Corp
Industry: Tourism & Hospitality
Products: Event Management
Location: Qatar
Volume: 33661 metric tons of plastic waste
Materials: Food & Beverages, Paper Products, Linens
Processes: Maintenance → Catering
Waste Materials: Water bottles

Company 248
Name: AquaTech Ventures
Industry: Water Treatment
Products: Treated Wastewater, Reclaimed Water, Potable Water
Location: Kuwait
Volume: 255117 cubic meters of filter media waste
Materials: Disinfectants, Raw Water, Chemical Coagulants
Processes: Coagulation → Filtration → Sludge Treatment
Waste Materials: Spent activated carbon

Company 249
Name: Kuwait Oil Company Corp
Industry: Oil & Gas
Products: Natural Gas, Refined Petroleum Products
Location: Bahrain
Volume: 135337 metric tons of chemical waste
Materials: Hydrocarbons, Pipelines
Processes: Exploration → Distribution → Drilling
Waste Materials: Spent catalysts, Alkalis

Company 250
Name: Marriott Services
Industry: Tourism & Hospitality
Products: Hotel Stays, Restaurant Services, Resort Experiences
Location: Qatar
Volume: 48547 metric tons of glass waste
Materials: Cleaning Supplies, Linens, Paper Products
Processes: Housekeeping → Guest Services → Catering → Maintenance
Waste Materials: Bottles, Jars`;

  const companies: CompanyData[] = [];
  const companyBlocks = rawData.split(/Company \d+/).filter(block => block.trim());

  companyBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n').filter(line => line.trim());
    
    if (lines.length >= 6) {
      const name = lines[0].replace('Name: ', '').trim();
      const industry = lines[1].replace('Industry: ', '').trim();
      const products = lines[2].replace('Products: ', '').split(', ').map(p => p.trim());
      const location = lines[3].replace('Location: ', '').trim();
      const volumeLine = lines[4].replace('Volume: ', '').trim();
      const materials = lines[5].replace('Materials: ', '').split(', ').map(m => m.trim());
      const processes = lines[6] ? lines[6].replace('Processes: ', '').split(' → ').map(p => p.trim()) : [];

      // Parse volume
      const volumeMatch = volumeLine.match(/(\d+(?:,\d+)*)\s*(.+)/);
      const volume = volumeMatch ? parseInt(volumeMatch[1].replace(/,/g, '')) : 0;
      const volumeUnit = volumeMatch ? volumeMatch[2] : '';

      companies.push({
        id: `company_${index + 11}`,
        name,
        industry,
        products,
        location,
        volume,
        volumeUnit,
        materials,
        processes
      });
    }
  });

  return companies;
};
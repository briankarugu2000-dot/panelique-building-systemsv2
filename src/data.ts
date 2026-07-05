import { ComparisonPoint, Product } from "./types";

export const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida/AP1WRLvzHAkMxnahqOAqHR9dNkhbWSQs5etk6wjIZsAdHQf8B2ddZwqPhSMuvGqVyRhHBTdmPI25p6ZyaPX8zfLbyWPEf6zkNFAgTYY5Su0NiKS2_k-xvivxGoXdSwLGaYD330JlFURzzqGX6At0AgixXlG8nBanMgdpK4EGisKlkl689pF8_VrWXHaLPCFikrHxcK-i9ZQMb44VkY1hmgweMg4F1A_QDc5HfBmmap6TDul5pbSfW9uyeEZMjEM",
  heroBackground: "https://lh3.googleusercontent.com/aida-public/AB6AXuAye_30LtYTLL35sEmpvS7NrCjpRAKr37PupK0cQ0s4ke0ldrjvEJsVUgbTwqI_Ae-lrsSOgrhY0kQz_uWWZCRP7JZ9AdVtrJWzkm62kBYfWS9d8fZoSkdAbIGn5t7M05Q5FdD-BOCommEESN0SKYMpVWvLooJYb9t0zIFss9cWCGFWydl5Dvd5n1YYWqOLobIaZ6MIecinEWemvkufZFQGI_LkCBbYKNKdIOCNZTEAhZZ0ifcMQU8mxjG8w3oIjwQ5zLMqrpEovn4",
  constructionWide: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK-E9GqW0_WdlphBBMDPXJGnGn0dCg59X45L1pfSQwJ2yFDAb487pPPnIfBEODXohgyOJozQH4mPxUAhuSe7tGoKsDxpyVTbVoQKM-Xu6QI9fEid5tdP7jN1dVly1ETVR303pB25i4x7r0Hy1c7m4oeSS7ajrMaraw0PvX-WlpfMe4yq3RSKx_zfzNqJKTgquBCOG-LAvli_1ubPm9QVMAXxa4HWg4Q6_Uq-cDRWnHDtoC4EqVIc9YtFzvUyDVZGhNH6PZ9NSR4KI",
  beforeAfterComparison: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUbYPGus7hbQpZ3ypDNms6Z7WR9cvKjFxQWMbpMjSyS7UGD63yuemfh1y53GEDf5Meu4t0ZjeiUh-9GUBgMYWy7v43q1zsBL0DDrg_N8TxjZC_ZClDoRrWeoNIFJMO1w_6cCJrb0eFRaoLkNKj4mGU_7qgda5-d6s42cRuZpN4ODtDLNIzzaADJu056VlHbymy8V44D6ELXCVkXGAz2ZBb2US68Qy6GrAL3-A4K9YchfmgMsnKk-rVqbzd5hdlTXFXurKksxMBYho",
  mobileComparisonDetail: "https://lh3.googleusercontent.com/aida/AP1WRLtJnpevr6_rsKRGOYSBOFeI6LaSBmqkvglkKmnuEOfW1vpjVsdi5DJAUnxTaRTWrOvoK7EnO2ZPDtBpYPAA8U1GgwDQgIQFwqFn2u2ngM0bR4UEEjSNBmTimcbiXY4WZTJPH10_pheWHUZDayOyFKYwOcxSlMMh40rOsUp-FD3RT1dwmvw3qjnhpckLWwUN6wwgXwjLSaDU1MnDWGJ0TLrOd9_Kq_qRfx2JmJtupTi5xyi1huJduFkTKkQ"
};

export const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    id: "speed",
    number: "01",
    title: "CONSTRUCTION SPEED",
    traditionalDesc: "Slow masonry. Requires heavy mortar, drying time between courses, and extensive manual labor. Susceptible to weather delays.",
    cmaxDesc: "Fast panel assembly. Pre-engineered modules snap into place. Reductions in build time by up to 40% compared to stone.",
    iconName: "Zap"
  },
  {
    id: "energy",
    number: "02",
    title: "ENERGY EFFICIENCY",
    traditionalDesc: "Poor insulation. Thermal bridging causes heat gain in summer and loss in winter. High dependence on HVAC systems.",
    cmaxDesc: "80% cooling savings. Double insulation core eliminates thermal bridges, maintaining a constant internal climate effortlessly.",
    iconName: "Thermometer"
  },
  {
    id: "eco",
    number: "03",
    title: "ECO-IMPACT",
    traditionalDesc: "Heavy quarrying. Massive carbon footprint from transportation of stone and high-cement content in mortar and blocks.",
    cmaxDesc: "60% lower emissions. Fully recyclable materials and minimal site waste make C-MAX the sustainable choice for green building.",
    iconName: "Leaf"
  },
  {
    id: "comfort",
    number: "04",
    title: "COMFORT & ACOUSTICS",
    traditionalDesc: "Sound and heat leaks. Vibrations travel easily through rigid stone structures, reducing acoustic privacy between rooms.",
    cmaxDesc: "High-grade soundproofing. EPS core acts as a natural dampener, providing superior sound insulation for serene living spaces.",
    iconName: "VolumeX"
  },
  {
    id: "quality",
    number: "05",
    title: "QUALITY CONTROL",
    traditionalDesc: "Variable quality. Dependent on artisan skill at each site. Inconsistent stone quality and mortar mixing lead to structural variances.",
    cmaxDesc: "KEBS-certified, Emmedue tech. Factory-precision manufacturing ensures every panel meets strict international safety standards.",
    iconName: "ShieldCheck"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "wall-panels",
    categoryNumber: "01",
    title: "Wall Panels",
    description: "Available in both high load-bearing and partition configurations for maximum architectural flexibility.",
    iconName: "Ruler",
    specifications: [
      { label: "Panel Thickness", value: "80mm - 160mm" },
      { label: "Polystyrene Density", value: "15 kg/m³ - 25 kg/m³" },
      { label: "Steel Mesh Wire", value: "2.5mm high-tensile galvanized" },
      { label: "Load Capacity", value: "Up to 15 tons per linear meter" }
    ],
    benefits: ["Replaces traditional load-bearing brickwork", "Fast interlocking tracking channels", "Includes pre-configured conduits"]
  },
  {
    id: "structural-slab",
    categoryNumber: "02",
    title: "Structural Slab",
    description: "Perfect for lightweight, highly durable floor systems and double-slab structural floors.",
    iconName: "Layers",
    specifications: [
      { label: "Span Capabilities", value: "Up to 8.5 meters without support" },
      { label: "Self-Weight Reduction", value: "Up to 40% vs standard concrete slab" },
      { label: "Insulation Level", value: "U-Value: 0.35 W/m²K" },
      { label: "Sound Insulation", value: "Rw: 52 dB reduction" }
    ],
    benefits: ["Significantly reduces foundation loads", "Perfect for multi-story residential", "Saves crane & formwork expenses"]
  },
  {
    id: "sandwich-panels",
    categoryNumber: "03",
    title: "Sandwich Panels",
    description: "High-performance insulation panels specialized for external cladding, cold-rooms, and perimeter skins.",
    iconName: "Package",
    specifications: [
      { label: "Core Material", value: "Expanded Polystyrene (EPS) self-extinguishing" },
      { label: "Cladding Sheet", value: "Double concrete spray layers (assembled)" },
      { label: "Thermal Conductivity", value: "0.033 W/mK" },
      { label: "Fire Resistance", value: "REI 120 (Up to 120 minutes)" }
    ],
    benefits: ["Ideal for temperature-controlled units", "Zero thermal bridging junctions", "Extreme weather-resistance coating compatible"]
  }
];

export const KENYAN_CONTACTS = {
  phone: "+254 799 684 613",
  phoneFormatted: "+254799684613",
  email: "briankarugu2000@gmail.com",
  office: "Thika Super Highway, Exit 10 (next to Kenya Clay LTD) Ruiru, P.O.Box 45155-00100 Nairobi, Kenya"
};


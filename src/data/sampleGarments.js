// Pre-configured photorealistic clothing donation samples for ReWear AI
export const SAMPLE_GARMENTS = [
  {
    id: "sample-parka",
    name: "Heavy-Duty Down Winter Parka",
    thumbnail: "/samples/winter-parka.jpg",
    description: "Dark olive green winter parka with down insulation, heavy-duty brass zipper, deep utility cargo pockets, and faux-fur trimmed hood.",
    category: "Outerwear",
    fabric: "100% Water-Resistant Nylon Shell, 700-Fill Goose Down, Acrylic Faux-Fur",
    colors: ["Olive Green", "Deep Forest", "Brass"],
    conditionScore: 96,
    conditionGrade: "Grade A (Like New)",
    gradeColor: "emerald",
    sizing: {
      estimatedSize: "Adult L (Men's / Unisex)",
      chestEstimate: "42 - 44 inches",
      fitType: "Regular Oversized Winter Fit",
      season: "Sub-Zero Winter"
    },
    defects: [
      "No structural tears or holes detected",
      "Minor superficial dust on lower hem (easily laundered)",
      "All heavy-duty snaps and central zipper 100% operational"
    ],
    agency: {
      name: "St. Jude Crisis Homeless Shelter — Winter Warmth Drive",
      type: "Crisis Shelter",
      matchScore: 98,
      urgency: "Critical / Immediate Need",
      urgencyColor: "red",
      reason: "High-spec thermal insulation matches acute freezing weather shelter shortage in Zone 4."
    },
    binId: "BIN-WINTER-A04",
    impact: {
      waterSavedLiters: 3200,
      co2AvoidedKg: 6.8,
      landfillDivertedKg: 2.1,
      taxDeductionValue: 85
    },
    defectsHotspots: [
      { x: 50, y: 38, label: "Zipper & Placket: Pristine Condition" },
      { x: 50, y: 18, label: "Faux-Fur Hood: Full Loft, Zero Matting" },
      { x: 38, y: 72, label: "Cargo Pocket: Snaps Intact" }
    ]
  },
  {
    id: "sample-blazer",
    name: "Tailored Navy Worsted Wool Blazer",
    thumbnail: "/samples/formal-blazer.jpg",
    description: "Classic single-breasted two-button navy blue suit jacket with notched lapels and flap pockets, ideal for corporate or interview wear.",
    category: "Business / Formal",
    fabric: "90% Worsted Virgin Wool, 10% Cashmere, Cupro Silk Lining",
    colors: ["Navy Blue", "Midnight Blue"],
    conditionScore: 94,
    conditionGrade: "Grade A (Executive Ready)",
    gradeColor: "emerald",
    sizing: {
      estimatedSize: "Men's 40 Regular",
      chestEstimate: "40 inches",
      fitType: "Classic Tailored Fit",
      season: "All-Season Formal"
    },
    defects: [
      "Zero moth holes or fabric abrasions",
      "Sleeve buttons fully attached with secure anchor thread",
      "Inner lining smooth with no underarm perspiration discoloration"
    ],
    agency: {
      name: "Dress for Success & Career Pathways Closet",
      type: "Workforce Career Closet",
      matchScore: 97,
      urgency: "High Priority",
      urgencyColor: "blue",
      reason: "High-tier tailored corporate attire suitable for job interviews and client-facing employment programs."
    },
    binId: "BIN-CAREER-C12",
    impact: {
      waterSavedLiters: 2800,
      co2AvoidedKg: 5.2,
      landfillDivertedKg: 1.4,
      taxDeductionValue: 120
    },
    defectsHotspots: [
      { x: 45, y: 32, label: "Notch Lapel: Crisp Press, No Shine" },
      { x: 50, y: 58, label: "Horn Button: Secure Hand-Stitched Anchor" },
      { x: 35, y: 68, label: "Flap Pocket: Factory Basting Intact" }
    ]
  },
  {
    id: "sample-kids-raincoat",
    name: "Toddler Hooded Yellow Rain Jacket",
    thumbnail: "/samples/kids-raincoat.jpg",
    description: "Cheerful bright sunflower yellow waterproof hooded rain jacket with snap buttons, soft cotton inner jersey lining, and cute bear ears.",
    category: "Children & Toddler",
    fabric: "100% Polyurethane Water-repellent Exterior, 100% Breathable Cotton Lining",
    colors: ["Sunflower Yellow", "White"],
    conditionScore: 91,
    conditionGrade: "Grade A- (Gently Used)",
    gradeColor: "emerald",
    sizing: {
      estimatedSize: "Kids / Toddler 4T - 5T",
      chestEstimate: "24 inches",
      fitType: "Comfortable Layering Fit",
      season: "Spring / Monsoon / Wet Weather"
    },
    defects: [
      "Clean waterproof membrane with zero peeling or delamination",
      "Inner name tag label blank (unwritten - high hygiene rating)",
      "Minor microscopic rub mark near left elbow cuff"
    ],
    agency: {
      name: "Little Stars Foster Youth & Family Crisis Depot",
      type: "Children & Foster Support",
      matchScore: 99,
      urgency: "High Priority",
      urgencyColor: "amber",
      reason: "Essential weather protection for toddler foster placements and low-income daycare programs."
    },
    binId: "BIN-KIDS-K02",
    impact: {
      waterSavedLiters: 1450,
      co2AvoidedKg: 2.8,
      landfillDivertedKg: 0.7,
      taxDeductionValue: 35
    },
    defectsHotspots: [
      { x: 50, y: 22, label: "Hood Membrane: Flexible, Zero Cracking" },
      { x: 50, y: 55, label: "Snap Buttons: Child-Safe & Firm" },
      { x: 58, y: 54, label: "Pocket Patch: Clean Embroidery" }
    ]
  },
  {
    id: "sample-worn-jeans",
    name: "Distressed Vintage Indigo Denim Jeans",
    thumbnail: "/samples/worn-denim.jpg",
    description: "Faded indigo blue 5-pocket denim jeans showing knee blowouts, cuff fraying, and extensive natural fabric wear.",
    category: "Textile Recycling & Upcycling",
    fabric: "100% Heavyweight Ringspun Cotton Denim (13.5 oz)",
    colors: ["Washed Indigo", "Faded Denim Blue"],
    conditionScore: 46,
    conditionGrade: "Grade D (Textile Reclamation)",
    gradeColor: "amber",
    sizing: {
      estimatedSize: "Waist 32 / Inseam 30",
      chestEstimate: "N/A",
      fitType: "Straight Leg (Distressed)",
      season: "Reclamation Only"
    },
    defects: [
      "Bilateral structural tears on knee panels (unsuitable for formal wear)",
      "Severe fraying along both bottom leg cuffs",
      "High-value pure 100% natural cotton fiber — prime candidate for mechanical fiber shredding"
    ],
    agency: {
      name: "Circular Threads Fiber Shredding & Insulation Plant",
      type: "Circular Textile Recycler",
      matchScore: 94,
      urgency: "Standard Batching",
      urgencyColor: "purple",
      reason: "Unfit for direct wearing, but 100% pure cotton content makes it premium feed for recycled acoustic insulation and automotive underfelt."
    },
    binId: "BIN-RECYCLE-R09",
    impact: {
      waterSavedLiters: 4100,
      co2AvoidedKg: 4.6,
      landfillDivertedKg: 1.1,
      taxDeductionValue: 12
    },
    defectsHotspots: [
      { x: 38, y: 56, label: "Left Knee Tear: Fiber Shredding Recommended" },
      { x: 62, y: 54, label: "Right Knee Distress: Frayed Warp Threads" },
      { x: 50, y: 15, label: "Waistband: 100% Cotton Structural Tag" }
    ]
  }
];

export const INITIAL_AGENCIES = [
  {
    id: "agency-1",
    name: "St. Jude Crisis Homeless Shelter",
    type: "Crisis Shelter",
    focus: "Immediate survival, cold weather outerwear, waterproof boots, durable layers",
    currentNeed: "Critical",
    capacityPct: 35,
    neededItems: ["Heavy Winter Coats", "Thermal Parkas", "Wool Socks", "Waterproof Pants"],
    contact: "intake@stjudecrisis.org",
    location: "Downtown Logistics Depot, Zone 4",
    totalReceived: 412
  },
  {
    id: "agency-2",
    name: "Dress for Success & Career Pathways",
    type: "Workforce Career Closet",
    focus: "Interview-ready business attire, tailored blazers, formal trousers, clean dress shoes",
    currentNeed: "High",
    capacityPct: 48,
    neededItems: ["Mens & Womens Blazers", "Button-Down Shirts", "Pencil Skirts", "Dress Shoes"],
    contact: "donations@careercloset.ngo",
    location: "Midtown Civic Center, Suite 210",
    totalReceived: 286
  },
  {
    id: "agency-3",
    name: "Little Stars Foster Youth & Family Depot",
    type: "Children & Foster Support",
    focus: "Clean toddler and children apparel, school outfits, rainwear, baby onesies",
    currentNeed: "High",
    capacityPct: 62,
    neededItems: ["Kids Raincoats", "School Sweaters (4T-12)", "Toddler Pants", "Baby Winter Gear"],
    contact: "care@littlestarsfoster.org",
    location: "Eastside Community Center",
    totalReceived: 518
  },
  {
    id: "agency-4",
    name: "Circular Threads Fiber Reclamation Plant",
    type: "Circular Textile Recycler",
    focus: "Torn, stained, unwearable garments converted to industrial insulation & yarn",
    currentNeed: "Continuous",
    capacityPct: 80,
    neededItems: ["100% Cotton Rags", "Worn Denim Jeans", "Scrap Sweaters", "Damaged Towels"],
    contact: "logistics@circularthreads.tech",
    location: "Green Industrial Park, Dock 9",
    totalReceived: 1840
  }
];

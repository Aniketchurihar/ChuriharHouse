// Each space with multiple images - each image has src, caption, and info

export const spaces = [
  // Ground Floor
  {
    id: "parking",
    name: "Parking",
    floor: "Ground",
    description: "Dedicated parking space for convenience.",
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", caption: "Main entrance", info: "Driveway with space for multiple vehicles." },
      { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", caption: "Covered area", info: "Shaded parking protects your vehicles from the elements." },
      { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", caption: "Approach", info: "Easy access from the main road." },
    ],
  },
  {
    id: "mini-theatre",
    name: "Mini Theatre",
    floor: "Ground",
    description: "Private home theatre for films and family entertainment.",
    images: [
      { src: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80", caption: "Screen view", info: "Projection with surround sound." },
      { src: "https://images.unsplash.com/photo-1545634731-e46c8cad9b73?w=800&q=80", caption: "Seating", info: "Tiered seating." },
      { src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", caption: "Ambient lighting", info: "Adjustable lighting." },
    ],
  },
  {
    id: "drawing-room",
    name: "Drawing Room",
    floor: "Ground",
    description: "Space for gatherings and conversation.",
    images: [
      { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", caption: "Main seating", info: "Spacious layout for hosting guests with refined finishes." },
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", caption: "Natural light", info: "Large windows bring in abundant daylight throughout the day." },
      { src: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80", caption: "Evening view", info: "Evening lighting." },
    ],
  },
  {
    id: "guest-room-g",
    name: "Guest Room",
    floor: "Ground",
    description: "Ground-floor accommodation for guests.",
    images: [
      { src: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80", caption: "Sleeping area", info: "Cozy bedroom with quality bedding and storage." },
      { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", caption: "Furnished space", info: "Bedroom with storage." },
    ],
  },
  {
    id: "office",
    name: "Office",
    floor: "Ground",
    description: "Quiet home office for focused work.",
    images: [
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", caption: "Workstation", info: "Dedicated desk space with natural light." },
      { src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80", caption: "Study view", info: "Quiet corner away from the main living areas." },
    ],
  },
  {
    id: "hall",
    name: "Hall",
    floor: "Ground",
    description: "Spacious entrance hall welcoming you home.",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", caption: "Entryway", info: "Entrance with high ceilings and natural light." },
      { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", caption: "Circulation", info: "Open flow connecting all ground-floor spaces." },
    ],
  },
  {
    id: "garden",
    name: "Garden",
    floor: "Ground",
    description: "A huge garden space for outdoor relaxation.",
    images: [
      { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80", caption: "Green expanse", info: "Garden with plants and lawn." },
      { src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80", caption: "Plantings", info: "Landscaped areas with seasonal flowers and shrubs." },
      { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", caption: "Outdoor seating", info: "Seating area in the garden." },
    ],
  },
  // First Floor
  {
    id: "double-height-hall",
    name: "Double Height Hall",
    floor: "First",
    designHighlight: true,
    description: "Double-height living space with natural light.",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", caption: "Full height", info: "Double-height ceiling." },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", caption: "Light & air", info: "Floor-to-ceiling windows flood the space with natural light." },
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    floor: "First",
    description: "Two well-appointed bedrooms, each with balcony and attached bathroom.",
    images: [
      { src: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80", caption: "Bedroom one", info: "Bedroom with balcony access." },
      { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", caption: "Bedroom two", info: "Second bedroom with attached bathroom and balcony." },
      { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80", caption: "Balcony view", info: "Each bedroom opens to a private outdoor space." },
    ],
  },
  {
    id: "master-bedroom",
    name: "Master Bedroom",
    floor: "First",
    description: "Master suite with balcony and en-suite bathroom.",
    images: [
      { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", caption: "Master suite", info: "Master bedroom." },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", caption: "En-suite", info: "Attached bathroom." },
      { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", caption: "Private balcony", info: "Balcony with garden views." },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    floor: "First",
    description: "Modern kitchen with attached balcony for outdoor dining.",
    images: [
      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", caption: "Main kitchen", info: "Fully equipped modern kitchen with ample counter space." },
      { src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", caption: "Cooking zone", info: "Efficient layout for cooking and prep." },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", caption: "Balcony access", info: "Step outside for alfresco dining and morning coffee." },
    ],
  },
  {
    id: "pooja-room",
    name: "Pooja Room",
    floor: "First",
    description: "Dedicated prayer room for spiritual practice.",
    images: [
      { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80", caption: "Sanctum", info: "Prayer room for daily worship." },
      { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", caption: "Natural light", info: "Natural light from windows." },
    ],
  },
  // Stairs (Highlight)
  {
    id: "floating-stairs",
    name: "Floating Stairs",
    floor: "Highlight",
    designHighlight: true,
    description: "Sculptural floating staircase connecting all three levels.",
    images: [
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", caption: "Staircase view", info: "Floating staircase design." },
      { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", caption: "From below", info: "View looking up through the levels." },
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", caption: "Light & shadow", info: "Natural light on the staircase." },
    ],
  },
  // Second Floor
  {
    id: "guest-room-s",
    name: "Guest Room",
    floor: "Second",
    description: "Second-floor guest room with terrace access.",
    images: [
      { src: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80", caption: "Guest quarters", info: "Private room with direct terrace garden access." },
      { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", caption: "Terrace view", info: "Wake up to views of the terrace garden." },
    ],
  },
  {
    id: "gazebo",
    name: "Gazebo",
    floor: "Second",
    designHighlight: true,
    description: "Outdoor gazebo with views of the terrace garden.",
    images: [
      { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", caption: "Gazebo structure", info: "Shaded outdoor retreat on the terrace." },
      { src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80", caption: "Garden views", info: "Surrounded by greenery and fresh air." },
    ],
  },
  {
    id: "terrace-garden",
    name: "Terrace Garden",
    floor: "Second",
    description: "Rooftop terrace garden for outdoor living.",
    images: [
      { src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80", caption: "Rooftop oasis", info: "Terrace garden with planted beds." },
      { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80", caption: "Open sky", info: "Unobstructed views." },
    ],
  },
  {
    id: "sunset-viewpoint",
    name: "Sunset Viewpoint",
    floor: "Second",
    description: "Prime spot to enjoy evening sunsets.",
    images: [
      { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", caption: "Sunset view", info: "Westward orientation for sunset views." },
      { src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80", caption: "Evening sky", info: "Sunset views." },
    ],
  },
];

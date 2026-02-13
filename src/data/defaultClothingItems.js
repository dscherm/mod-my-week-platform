const defaultClothingItems = [
  // --- Original items ---
  {
    name: 'Red Hoodie',
    description: 'A cozy red hoodie',
    cost: 120,
    icon: '🧥',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#CC3333',
    clothingStyle: 'hoodie'
  },
  {
    name: 'Green Jacket',
    description: 'A fresh green jacket',
    cost: 150,
    icon: '🧥',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#2E7D32',
    clothingStyle: 'jacket'
  },
  {
    name: 'Khaki Pants',
    description: 'Classic khaki pants',
    cost: 80,
    icon: '👖',
    isActive: true,
    clothingType: 'bottom',
    clothingColor: '#C8A96E',
    clothingStyle: 'khakis'
  },
  {
    name: 'Shorts',
    description: 'Comfortable shorts for warm days',
    cost: 60,
    icon: '🩳',
    isActive: true,
    clothingType: 'bottom',
    clothingColor: '#555555',
    clothingStyle: 'shorts'
  },
  {
    name: 'White Sneakers',
    description: 'Clean white kicks',
    cost: 90,
    icon: '👟',
    isActive: true,
    clothingType: 'shoes',
    clothingColor: '#EEEEEE',
    clothingStyle: 'sneakers'
  },
  {
    name: 'Baseball Cap',
    description: 'A classic baseball cap',
    cost: 70,
    icon: '🧢',
    isActive: true,
    clothingType: 'hat',
    clothingColor: '#1565C0',
    clothingStyle: 'cap'
  },

  // --- Cyberpunk items ---
  // Tops
  {
    name: 'Tactical Vest',
    description: 'Armored tactical vest with buckle straps',
    cost: 200,
    icon: '🦺',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#2F2F2F',
    clothingStyle: 'vest'
  },
  {
    name: 'Neon Vest',
    description: 'Cyberpunk vest with neon green trim',
    cost: 250,
    icon: '🦺',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#39FF14',
    clothingStyle: 'vest'
  },
  {
    name: 'Cyber Jacket',
    description: 'High-collar jacket with LED accent strips',
    cost: 300,
    icon: '🧥',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#1A1A2E',
    clothingStyle: 'cyberjacket'
  },
  {
    name: 'Neon Cyber Jacket',
    description: 'Glowing cyberpunk jacket in hot pink',
    cost: 350,
    icon: '🧥',
    isActive: true,
    clothingType: 'top',
    clothingColor: '#FF1493',
    clothingStyle: 'cyberjacket'
  },
  // Bottoms
  {
    name: 'Cargo Pants',
    description: 'Tactical cargo pants with knee pads',
    cost: 120,
    icon: '👖',
    isActive: true,
    clothingType: 'bottom',
    clothingColor: '#3D3D3D',
    clothingStyle: 'cargopants'
  },
  {
    name: 'Olive Cargo Pants',
    description: 'Military-style cargo pants',
    cost: 120,
    icon: '👖',
    isActive: true,
    clothingType: 'bottom',
    clothingColor: '#556B2F',
    clothingStyle: 'cargopants'
  },
  // Shoes
  {
    name: 'Combat Boots',
    description: 'Heavy-duty combat boots with buckles',
    cost: 130,
    icon: '🥾',
    isActive: true,
    clothingType: 'shoes',
    clothingColor: '#2F2F2F',
    clothingStyle: 'boots'
  },
  {
    name: 'Cyber Boots',
    description: 'Armored boots with neon sole lights',
    cost: 200,
    icon: '🥾',
    isActive: true,
    clothingType: 'shoes',
    clothingColor: '#333344',
    clothingStyle: 'cyberboots'
  },
  // Hats
  {
    name: 'Beanie',
    description: 'A warm knit beanie with pom-pom',
    cost: 60,
    icon: '🧶',
    isActive: true,
    clothingType: 'hat',
    clothingColor: '#8B0000',
    clothingStyle: 'beanie'
  },
  {
    name: 'Cyber Visor',
    description: 'Holographic head-mounted visor with antenna',
    cost: 220,
    icon: '🥽',
    isActive: true,
    clothingType: 'hat',
    clothingColor: '#00FFFF',
    clothingStyle: 'cybervisor'
  },
  // Face
  {
    name: 'Dark Shades',
    description: 'Sleek black sunglasses',
    cost: 100,
    icon: '🕶️',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#222222',
    clothingStyle: 'sunglasses'
  },
  {
    name: 'Neon Shades',
    description: 'Sunglasses with glowing cyan lenses',
    cost: 150,
    icon: '🕶️',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#00FFFF',
    clothingStyle: 'sunglasses'
  },
  {
    name: 'Holo Visor',
    description: 'Full-face holographic scanner visor',
    cost: 280,
    icon: '🥽',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#FF00FF',
    clothingStyle: 'cybervisor_face'
  },
  {
    name: 'Silver Piercings',
    description: 'Nose ring, ear studs, lip ring, and eyebrow bar',
    cost: 80,
    icon: '💎',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#C0C0C0',
    clothingStyle: 'piercings'
  },
  {
    name: 'Gold Piercings',
    description: 'Flashy gold facial piercings set',
    cost: 120,
    icon: '💎',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#FFD700',
    clothingStyle: 'piercings'
  },
  {
    name: 'Respirator Mask',
    description: 'Cyberpunk respirator with filter canister',
    cost: 180,
    icon: '😷',
    isActive: true,
    clothingType: 'face',
    clothingColor: '#444444',
    clothingStyle: 'mask'
  },
  // Cyborg
  {
    name: 'Chrome Cyber Arm',
    description: 'Mechanical arm replacement with neon accents',
    cost: 400,
    icon: '🦾',
    isActive: true,
    clothingType: 'cyborg',
    clothingColor: '#8899AA',
    clothingStyle: 'cyber_arm'
  },
  {
    name: 'Gold Cyber Arm',
    description: 'Luxury gold-plated mechanical arm',
    cost: 500,
    icon: '🦾',
    isActive: true,
    clothingType: 'cyborg',
    clothingColor: '#B8860B',
    clothingStyle: 'cyber_arm'
  },
  {
    name: 'Cyber Eye - Red',
    description: 'Cybernetic eye implant with red scanner',
    cost: 350,
    icon: '👁️',
    isActive: true,
    clothingType: 'cyborg',
    clothingColor: '#FF0044',
    clothingStyle: 'cyber_eye'
  },
  {
    name: 'Cyber Eye - Cyan',
    description: 'Cybernetic eye implant with cyan glow',
    cost: 350,
    icon: '👁️',
    isActive: true,
    clothingType: 'cyborg',
    clothingColor: '#00FFFF',
    clothingStyle: 'cyber_eye'
  },
  {
    name: 'Chrome Jaw',
    description: 'Mechanical jaw implant with vent slits',
    cost: 450,
    icon: '🤖',
    isActive: true,
    clothingType: 'cyborg',
    clothingColor: '#778899',
    clothingStyle: 'cyber_jaw'
  },
];

export default defaultClothingItems;

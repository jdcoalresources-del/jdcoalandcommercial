export interface CoalProduct {
  id: string
  name: string
  shortName: string
  gcv: string
  moisture: string
  ash: string
  applications: string[]
  description: string
  icon: string
  badge?: string
}

export interface Industry {
  id: string
  name: string
  icon: string
  description: string
}

export const coalProducts: CoalProduct[] = [
  {
    id: 'steam-coal',
    name: 'Steam Coal',
    shortName: 'Steam Coal',
    gcv: '5000–6500 kcal/kg',
    moisture: '8–12%',
    ash: '10–15%',
    applications: ['Thermal Power Plants', 'Cement Plants', 'Industrial Boilers'],
    description: 'High-quality steam coal sourced from Indonesia and South Africa. Ideal for power generation with consistent GCV and low sulphur content.',
    icon: '🔥',
    badge: 'Most Popular',
  },
  {
    id: 'coking-coal',
    name: 'Coking Coal',
    shortName: 'Coking Coal',
    gcv: '6500–7200 kcal/kg',
    moisture: '5–8%',
    ash: '8–12%',
    applications: ['Steel Plants', 'Metallurgical Use', 'Coke Ovens'],
    description: 'Premium metallurgical coking coal with excellent coking properties. Critical for iron and steel manufacturing with low impurities.',
    icon: '⚙️',
    badge: 'Premium Grade',
  },
  {
    id: 'pet-coke',
    name: 'Petroleum Coke',
    shortName: 'Pet Coke',
    gcv: '7800–8200 kcal/kg',
    moisture: '3–6%',
    ash: '0.5–1%',
    applications: ['Cement Plants', 'Aluminium Smelters', 'Calciners'],
    description: 'High calorific value petroleum coke with ultra-low ash content. Cost-effective alternative to coal for high-temperature industrial processes.',
    icon: '💎',
  },
  {
    id: 'coal-fines',
    name: 'Coal Fines / Slack Coal',
    shortName: 'Coal Fines',
    gcv: '4000–5200 kcal/kg',
    moisture: '10–15%',
    ash: '18–25%',
    applications: ['Brick Kilns', 'Lime Kilns', 'Small Boilers'],
    description: 'Economical coal fines and slack coal for budget-conscious industries. Perfect for brick kilns and ceramic production with steady heat output.',
    icon: '🪨',
  },
  {
    id: 'lignite-coal',
    name: 'Lignite Coal',
    shortName: 'Lignite',
    gcv: '2500–3500 kcal/kg',
    moisture: '20–35%',
    ash: '15–20%',
    applications: ['Power Plants', 'Textile Mills', 'Paper Mills'],
    description: 'Domestic lignite coal for industries requiring lower calorific value fuel. Available in bulk quantities with consistent quality.',
    icon: '⛏️',
  },
  {
    id: 'imported-coal',
    name: 'Imported Coal',
    shortName: 'Imported Coal',
    gcv: '5500–7000 kcal/kg',
    moisture: '6–10%',
    ash: '8–14%',
    applications: ['All Industries', 'Export Quality', 'Premium Users'],
    description: 'Premium imported coal from Australia, South Africa and Indonesia. Consistent quality, certified by international labs, delivered to your doorstep.',
    icon: '🚢',
    badge: 'International',
  },
]

export const industries: Industry[] = [
  {
    id: 'power-plants',
    name: 'Power Plants',
    icon: '⚡',
    description: 'Reliable coal supply for thermal power generation',
  },
  {
    id: 'steel-plants',
    name: 'Steel Plants',
    icon: '🏭',
    description: 'Metallurgical coal for iron & steel manufacturing',
  },
  {
    id: 'cement-plants',
    name: 'Cement Plants',
    icon: '🏗️',
    description: 'High GCV coal & pet coke for kiln operations',
  },
  {
    id: 'textile-mills',
    name: 'Textile Mills',
    icon: '🧵',
    description: 'Consistent heat supply for dyeing & processing',
  },
  {
    id: 'brick-kilns',
    name: 'Brick Kilns',
    icon: '🧱',
    description: 'Affordable coal fines for brick manufacturing',
  },
  {
    id: 'paper-mills',
    name: 'Paper Mills',
    icon: '📄',
    description: 'Steady fuel supply for pulp & paper processing',
  },
  {
    id: 'ceramic-industries',
    name: 'Ceramic Industries',
    icon: '🏺',
    description: 'High-temp coal for ceramic & tile manufacturing',
  },
  {
    id: 'chemical-plants',
    name: 'Chemical Plants',
    icon: '⚗️',
    description: 'Process coal for chemical & petrochemical industries',
  },
]

export const stats = [
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'MT Monthly Supply', value: 50000, suffix: '+' },
  { label: 'Happy Clients', value: 500, suffix: '+' },
  { label: 'States Covered', value: 15, suffix: '+' },
]

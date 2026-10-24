import { MAP_W } from './worldPath'

export interface Place { code?: string, name: string, lat: number, lon: number }

// Public commercial Regions from the AWS region list (checked 2026-10-24). GovCloud is omitted.
// Coordinates are the metro area of each Region, not exact data-center sites.
export const REGIONS: Required<Place>[] = [
  { code: 'us-east-1', name: 'N. Virginia', lat: 38.9, lon: -77.4 },
  { code: 'us-east-2', name: 'Ohio', lat: 40.0, lon: -83.0 },
  { code: 'us-west-1', name: 'N. California', lat: 37.4, lon: -122.0 },
  { code: 'us-west-2', name: 'Oregon', lat: 45.8, lon: -119.7 },
  { code: 'ca-central-1', name: 'Canadá (Central)', lat: 45.5, lon: -73.6 },
  { code: 'ca-west-1', name: 'Calgary', lat: 51.0, lon: -114.1 },
  { code: 'mx-central-1', name: 'México (Central)', lat: 20.6, lon: -100.4 },
  { code: 'sa-east-1', name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { code: 'eu-west-1', name: 'Irlanda', lat: 53.3, lon: -6.3 },
  { code: 'eu-west-2', name: 'Londres', lat: 51.5, lon: -0.1 },
  { code: 'eu-west-3', name: 'París', lat: 48.9, lon: 2.4 },
  { code: 'eu-central-1', name: 'Fráncfort', lat: 50.1, lon: 8.7 },
  { code: 'eu-central-2', name: 'Zúrich', lat: 47.4, lon: 8.5 },
  { code: 'eu-north-1', name: 'Estocolmo', lat: 59.3, lon: 18.1 },
  { code: 'eu-south-1', name: 'Milán', lat: 45.5, lon: 9.2 },
  { code: 'eu-south-2', name: 'España', lat: 41.6, lon: -0.9 },
  { code: 'eusc-de-east-1', name: 'Nube Soberana Europea', lat: 52.4, lon: 13.1 },
  { code: 'il-central-1', name: 'Tel Aviv', lat: 32.1, lon: 34.8 },
  { code: 'me-south-1', name: 'Baréin', lat: 26.2, lon: 50.6 },
  { code: 'me-central-1', name: 'Emiratos Árabes', lat: 25.2, lon: 55.3 },
  { code: 'af-south-1', name: 'Ciudad del Cabo', lat: -33.9, lon: 18.4 },
  { code: 'ap-south-1', name: 'Bombay', lat: 19.1, lon: 72.9 },
  { code: 'ap-south-2', name: 'Hyderabad', lat: 17.4, lon: 78.5 },
  { code: 'ap-east-1', name: 'Hong Kong', lat: 22.3, lon: 114.2 },
  { code: 'ap-east-2', name: 'Taipéi', lat: 25.0, lon: 121.5 },
  { code: 'ap-northeast-1', name: 'Tokio', lat: 35.7, lon: 139.7 },
  { code: 'ap-northeast-2', name: 'Seúl', lat: 37.6, lon: 127.0 },
  { code: 'ap-northeast-3', name: 'Osaka', lat: 34.7, lon: 135.5 },
  { code: 'ap-southeast-1', name: 'Singapur', lat: 1.4, lon: 103.8 },
  { code: 'ap-southeast-2', name: 'Sídney', lat: -33.9, lon: 151.2 },
  { code: 'ap-southeast-3', name: 'Yakarta', lat: -6.2, lon: 106.8 },
  { code: 'ap-southeast-4', name: 'Melbourne', lat: -37.8, lon: 145.0 },
  { code: 'ap-southeast-5', name: 'Malasia', lat: 3.1, lon: 101.7 },
  { code: 'ap-southeast-6', name: 'Nueva Zelanda', lat: -36.8, lon: 174.8 },
  { code: 'ap-southeast-7', name: 'Tailandia', lat: 13.8, lon: 100.5 },
]

// Announced, not launched (global infrastructure page, 2026-10-24).
export const PLANNED: Place[] = [
  { name: 'Chile', lat: -33.4, lon: -70.7 },
  { name: 'Arabia Saudita', lat: 24.7, lon: 46.7 },
]

// ponytail: illustrative only. Real Edge Locations are 750+ points of presence; these are big cities
// where such points are typical, never a list of actual sites.
export const EDGE_CITIES: Place[] = [
  ['Nueva York', 40.7, -74.0], ['Los Ángeles', 34.0, -118.2], ['Chicago', 41.9, -87.6], ['Dallas', 32.8, -96.8],
  ['Miami', 25.8, -80.2], ['Toronto', 43.7, -79.4], ['Ciudad de México', 19.4, -99.1], ['Bogotá', 4.7, -74.1],
  ['Lima', -12.0, -77.0], ['Santiago', -33.4, -70.7], ['Buenos Aires', -34.6, -58.4], ['Río de Janeiro', -22.9, -43.2],
  ['Londres', 51.5, -0.1], ['París', 48.9, 2.4], ['Madrid', 40.4, -3.7], ['Fráncfort', 50.1, 8.7],
  ['Milán', 45.5, 9.2], ['Estocolmo', 59.3, 18.1], ['Varsovia', 52.2, 21.0], ['Estambul', 41.0, 29.0],
  ['Dubái', 25.2, 55.3], ['Bombay', 19.1, 72.9], ['Delhi', 28.6, 77.2], ['Chennai', 13.1, 80.3],
  ['Bangkok', 13.8, 100.5], ['Singapur', 1.4, 103.8], ['Yakarta', -6.2, 106.8], ['Manila', 14.6, 121.0],
  ['Hong Kong', 22.3, 114.2], ['Taipéi', 25.0, 121.5], ['Seúl', 37.6, 127.0], ['Tokio', 35.7, 139.7],
  ['Osaka', 34.7, 135.5], ['Sídney', -33.9, 151.2], ['Melbourne', -37.8, 145.0], ['Auckland', -36.8, 174.8],
  ['Johannesburgo', -26.2, 28.0], ['Ciudad del Cabo', -33.9, 18.4], ['Lagos', 6.5, 3.4], ['Nairobi', -1.3, 36.8],
  ['El Cairo', 30.0, 31.2], ['Denver', 39.7, -105.0], ['Seattle', 47.6, -122.3], ['Atlanta', 33.7, -84.4],
].map(([name, lat, lon]) => ({ name, lat, lon }) as Place)

export const ECUADOR: Place = { name: 'Ecuador (Quito)', lat: -0.2, lon: -78.5 }

// Same projection the land path was generated with: equirectangular, top latitude 80.
export const project = (p: Place) => ({
  x: ((p.lon + 180) / 360) * MAP_W,
  y: ((80 - p.lat) / 360) * MAP_W,
})

export const km = (a: Place, b: Place) => {
  const rad = (d: number) => (d * Math.PI) / 180
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2
    + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2
  return Math.round(12742 * Math.asin(Math.sqrt(h)))
}

// Self-check: Quito to São Paulo is ~4,300 km great-circle; project() pins Greenwich/equator mid-map.
console.assert(Math.abs(km(ECUADOR, REGIONS.find(r => r.code === 'sa-east-1')!) - 4300) < 300, 'km() off')
console.assert(Math.round(project({ name: '', lat: 0, lon: 0 }).x) === MAP_W / 2, 'project() off')

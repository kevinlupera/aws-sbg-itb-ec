<script setup lang="ts">
// Zoom from the map into one Region to explain Availability Zones.
// ponytail: schematic layout. AWS does not publish where its data centers are, so AZ positions are illustrative.
const regions = REGIONS.filter(inNorthAmerica)
const selected = ref('us-east-1')
const region = computed(() => regions.find(r => r.code === selected.value)!)

const tl = project({ name: '', lat: NA_VIEW.north, lon: NA_VIEW.west })
const br = project({ name: '', lat: NA_VIEW.south, lon: NA_VIEW.east })
const vw = br.x - tl.x
const vh = br.y - tl.y
const view = `${tl.x} ${tl.y} ${vw} ${vh}`

// Thumbnail of North America on the left, the "lens" on the right.
const T = { x: 10, y: 120, w: 340 }
const thumbH = (T.w * vh) / vw
const dot = computed(() => {
  const p = project(region.value)
  return { x: T.x + ((p.x - tl.x) / vw) * T.w, y: T.y + ((p.y - tl.y) / vh) * thumbH, mx: p.x, my: p.y }
})
const LENS = { cx: 640, cy: 200, r: 180 }
const edge = (deg: number) => ({ x: LENS.cx - LENS.r * Math.cos((deg * Math.PI) / 180), y: LENS.cy - LENS.r * Math.sin((deg * Math.PI) / 180) })
const up = edge(35)
const down = edge(-35)

const AZS = [
  { id: 'a', x: 568, y: 168 },
  { id: 'b', x: 712, y: 148 },
  { id: 'c', x: 648, y: 280 },
]
// Each AZ is one or more data centers: drawn as a small cluster.
const BUILDINGS = [[-14, -6], [2, -12], [-4, 8]]
const active = ref<string | null>(null)
const links = [[0, 1], [1, 2], [2, 0]]
</script>

<template>
  <div class="zoom">
    <div class="chips">
      <button v-for="r in regions" :key="r.code" class="ghost" :aria-pressed="r.code === selected" @click="selected = r.code">{{ r.name }}</button>
    </div>

    <svg viewBox="0 0 900 400" role="img" :aria-label="`Zonas de Disponibilidad dentro de la Región ${region.name}`">
      <!-- North America thumbnail with the chosen Region pinged. -->
      <svg :x="T.x" :y="T.y" :width="T.w" :height="thumbH" :viewBox="view">
        <path :d="WORLD_PATH" class="land" />
        <circle :cx="dot.mx" :cy="dot.my" r="3" class="dot" />
        <circle :cx="dot.mx" :cy="dot.my" r="3" class="ping" />
      </svg>
      <line :x1="dot.x" :y1="dot.y" :x2="up.x" :y2="up.y" class="beam" />
      <line :x1="dot.x" :y1="dot.y" :x2="down.x" :y2="down.y" class="beam" />

      <!-- Lens: the Region up close. -->
      <circle :cx="LENS.cx" :cy="LENS.cy" :r="LENS.r" class="lens" />
      <circle :cx="LENS.cx" :cy="LENS.cy" r="120" class="ring" />
      <circle :cx="LENS.cx" :cy="LENS.cy" r="60" class="ring" />
      <text :x="LENS.cx" :y="LENS.cy - LENS.r + 22" text-anchor="middle" class="ring-label">dentro de 100 km</text>
      <text :x="LENS.cx" :y="LENS.cy + LENS.r - 34" text-anchor="middle" class="region-label">{{ region.name }} · {{ region.code }}</text>

      <line v-for="[a, b] in links" :key="`${a}-${b}`" :x1="AZS[a]!.x" :y1="AZS[a]!.y" :x2="AZS[b]!.x" :y2="AZS[b]!.y" class="fiber" />

      <g v-for="az in AZS" :key="az.id" class="az" :class="{ on: active === az.id }" @click="active = active === az.id ? null : az.id">
        <circle :cx="az.x" :cy="az.y" r="34" class="az-hit" />
        <rect v-for="([dx, dy], i) in BUILDINGS" :key="i" :x="az.x + dx - 7" :y="az.y + dy - 7" width="14" height="14" rx="2.5" class="dc" />
        <text :x="az.x" :y="az.y + 36" text-anchor="middle" class="az-label">AZ {{ az.id }}</text>
      </g>
    </svg>

    <div class="panel">
      <template v-if="active">
        <p class="title"><b>AZ {{ active }}</b> en {{ region.name }}</p>
        <p class="sub">Uno o más centros de datos con energía, red y conectividad redundantes. Si esta AZ falla, las otras siguen.</p>
      </template>
      <template v-else>
        <p class="title"><b>{{ region.name }}</b> <code>{{ region.code }}</code></p>
        <p class="sub">Cada grupo de cuadros es una AZ (uno o más centros de datos). Las líneas son la fibra privada que las une. Toca una AZ.</p>
      </template>
      <p class="note">Esquema ilustrativo: AWS no publica la ubicación exacta de sus centros de datos.</p>
    </div>
  </div>
</template>

<style scoped>
.zoom { display: grid; gap: 0.6rem; padding: 0.9rem; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); }
.chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.chips button { padding: 0.25rem 0.7rem; font-size: 0.8rem; }
svg { width: 100%; height: auto; max-height: 42vh; }
.land { fill: var(--line); }
.dot { fill: var(--accent); stroke: var(--panel); stroke-width: 1; }
.ping { fill: none; stroke: var(--accent); stroke-width: 1; transform-box: fill-box; transform-origin: center; animation: ping 1.8s ease-out infinite; }
.beam { stroke: var(--accent); stroke-width: 1.2; stroke-dasharray: 4 4; opacity: 0.45; }
.lens { fill: var(--accent-dim); stroke: var(--accent); stroke-width: 2.5; }
.ring { fill: none; stroke: var(--accent); stroke-width: 1; stroke-dasharray: 3 5; opacity: 0.4; }
.ring-label, .region-label { fill: var(--muted); font: 600 12px var(--font-mono); }
.region-label { fill: var(--fg); }
.fiber { stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 6; animation: flow 1.2s linear infinite; }
.az { cursor: pointer; }
.az-hit { fill: transparent; }
.dc { fill: var(--panel); stroke: var(--accent); stroke-width: 2; transition: fill 0.15s; }
.az:hover .dc, .az.on .dc { fill: var(--accent); }
.az-label { fill: var(--fg); font: 700 15px var(--font-mono); }

.panel { min-height: 4.6rem; }
.title { margin: 0; font-size: 1.05rem; }
.title code { font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; margin-left: 0.4rem; }
.sub { margin: 0.15rem 0; font-size: 0.88rem; color: var(--muted); }
.note { margin: 0.3rem 0 0; font-size: 0.75rem; color: var(--muted-dim); }

@keyframes ping { to { transform: scale(4); opacity: 0; } }
@keyframes flow { to { stroke-dashoffset: -12; } }
@media (prefers-reduced-motion: reduce) { .ping, .fiber { animation: none; } }
</style>

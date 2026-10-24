<script setup lang="ts">
// Interactive world map for the Region / Edge Location slides.
const props = defineProps<{ mode: 'region' | 'edge' | 'choose' }>()

// Region and Edge slides zoom to North America; the "choose" slide keeps the world so Ecuador is visible.
const zoom = props.mode !== 'choose'
const tl = project({ name: '', lat: NA_VIEW.north, lon: NA_VIEW.west })
const br = project({ name: '', lat: NA_VIEW.south, lon: NA_VIEW.east })
const view = zoom ? `${tl.x} ${tl.y} ${br.x - tl.x} ${br.y - tl.y}` : `0 0 ${MAP_W} ${MAP_H}`
// Marks are drawn in map units, so shrink them when zoomed in.
const k = zoom ? 0.5 : 1

// Enlarged view: the map fills the screen over the slide. Esc closes it.
const big = ref(false)
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') big.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const naRegions = REGIONS.filter(inNorthAmerica).length
const naEdge = EDGE_CITIES.filter(inNorthAmerica).length

const showEdge = ref(props.mode === 'edge')
const showRegions = ref(true)
const selected = ref<string | null>(props.mode === 'region' ? 'us-east-1' : null)

const sel = computed(() => REGIONS.find(r => r.code === selected.value))
const eco = project(ECUADOR)
const withDistance = REGIONS.map(r => ({ ...r, km: km(ECUADOR, r) })).sort((a, b) => a.km - b.km)
const nearest = withDistance.slice(0, 3)
const fmt = (n: number) => n.toLocaleString('es-EC')
const pt = (p: Place) => project(p)
</script>

<template>
  <div class="map" :class="{ big }">
    <div class="bar">
      <template v-if="mode === 'edge'">
        <button class="ghost" :aria-pressed="showRegions" @click="showRegions = !showRegions">Regiones ({{ REGIONS.length }})</button>
        <button class="ghost" :aria-pressed="showEdge" @click="showEdge = !showEdge">Edge Locations (ilustrativo)</button>
      </template>
      <button class="ghost grow" :aria-pressed="big" @click="big = !big">{{ big ? 'Cerrar (Esc)' : '⤢ Agrandar' }}</button>
    </div>

    <svg :viewBox="view" :style="{ '--k': k }" role="img" aria-label="Mapa mundial con las Regiones de AWS">
      <path :d="WORLD_PATH" class="land" />

      <g v-if="showEdge">
        <circle v-for="c in EDGE_CITIES" :key="c.name" :cx="pt(c).x" :cy="pt(c).y" :r="3.4 * k" class="edge" />
      </g>

      <g v-if="showRegions">
        <g v-for="p in zoom ? [] : PLANNED" :key="p.name">
          <circle :cx="pt(p).x" :cy="pt(p).y" r="5" class="planned" />
        </g>
        <line v-if="sel && !zoom" :x1="eco.x" :y1="eco.y" :x2="pt(sel).x" :y2="pt(sel).y" class="link" />
        <g v-for="r in REGIONS" :key="r.code" class="region" :class="{ on: r.code === selected }" @click="selected = r.code">
          <circle :cx="pt(r).x" :cy="pt(r).y" :r="11 * k" class="hit" />
          <circle :cx="pt(r).x" :cy="pt(r).y" :r="5 * k" class="dot" />
          <title>{{ r.name }} · {{ r.code }}</title>
        </g>
      </g>

      <g v-if="!zoom">
        <circle :cx="eco.x" :cy="eco.y" r="4" class="you" />
        <text :x="eco.x + 8" :y="eco.y - 6" class="you-label">Ecuador</text>
      </g>
    </svg>

    <div class="panel">
      <template v-if="sel">
        <p class="title"><b>{{ sel.name }}</b> <code>{{ sel.code }}</code></p>
        <p class="sub">≈ {{ fmt(km(ECUADOR, sel)) }} km en línea recta desde Ecuador</p>
        <svg class="azs" viewBox="0 0 150 30" aria-hidden="true">
          <line x1="34" y1="15" x2="60" y2="15" /><line x1="90" y1="15" x2="116" y2="15" />
          <g v-for="(x, i) in [4, 60, 116]" :key="x">
            <rect :x="x" y="3" width="30" height="24" rx="5" />
            <text :x="x + 15" y="19" text-anchor="middle">AZ {{ 'abc'[i] }}</text>
          </g>
        </svg>
        <p class="sub">Cada Región agrupa varias Zonas de Disponibilidad</p>
      </template>
      <template v-else-if="mode === 'edge'">
        <p class="title"><b>Edge Locations</b></p>
        <p class="sub">Los puntos verdes son un ejemplo ilustrativo: hay más de 750 puntos de presencia, muchos más que Regiones.</p>
        <p class="sub">Guardan copias del contenido cerca de ti. Activa «Regiones» para comparar. Toca una Región para ver su detalle.</p>
      </template>
      <template v-else>
        <p class="title"><b>Más cercanas a Ecuador</b></p>
        <ol class="near">
          <li v-for="r in nearest" :key="r.code" @click="selected = r.code"><b>{{ r.name }}</b> <span>≈ {{ fmt(r.km) }} km</span></li>
        </ol>
        <p class="sub">Toca una Región. Cercanía no es lo único: también cuentan costo, servicios y cumplimiento.</p>
      </template>
    </div>

    <p class="legend">
      <span v-if="zoom" class="zoom">Zoom: América del Norte · {{ naRegions }} Regiones{{ showEdge ? ` y ${naEdge} Edge Locations de ejemplo` : '' }}</span>
      <span class="k dotk"></span>Región
      <span v-if="!zoom"><span class="k plannedk"></span>Anunciada ({{ PLANNED.map(p => p.name).join(', ') }})</span>
      <span v-if="showEdge"><span class="k edgek"></span>Edge Location (ilustrativo)</span>
    </p>
  </div>
</template>

<style scoped>
.map { display: grid; gap: 0.6rem; padding: 0.9rem; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); }
.bar { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.bar button { padding: 0.3rem 0.8rem; font-size: 0.85rem; }
.grow { margin-left: auto; }
svg { width: 100%; height: auto; max-height: 34vh; }
.map.big { position: fixed; inset: 1rem; z-index: 50; overflow: auto; padding: 1.4rem; box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.55); }
.map.big svg { max-height: 68vh; }
.map.big .title { font-size: 1.3rem; }
.map.big .sub, .map.big .near { font-size: 1rem; }
.map.big .zoom { font-family: var(--font-mono); }
.legend { font-size: 0.9rem; }
.land { fill: var(--line); }
.edge { fill: var(--ok); opacity: 0.75; }
.planned { fill: none; stroke: var(--accent); stroke-width: 1.6; stroke-dasharray: 3 2; }
.link { stroke: var(--danger); stroke-width: 1.2; stroke-dasharray: 4 3; opacity: 0.8; }
.region { cursor: pointer; }
.hit { fill: transparent; }
.dot { fill: var(--accent); stroke: var(--panel); stroke-width: calc(1.5px * var(--k)); transition: r 0.15s; }
.region:hover .dot, .region.on .dot { r: calc(7.5px * var(--k)); }
.region.on .dot { stroke: var(--fg); }
.you { fill: var(--danger); stroke: var(--panel); stroke-width: 1.5; }
.you-label { fill: var(--danger); font: 700 12px var(--font-body); paint-order: stroke; stroke: var(--panel); stroke-width: 3px; }

.panel { min-height: 4.8rem; }
.title { margin: 0; font-size: 1.05rem; }
.title code { font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; margin-left: 0.4rem; }
.sub { margin: 0.15rem 0; font-size: 0.85rem; color: var(--muted); }
.azs { width: 150px; height: 30px; margin: 0.3rem 0; }
.azs line { stroke: var(--accent); stroke-width: 1.5; }
.azs rect { fill: var(--accent-dim); stroke: var(--accent); stroke-width: 1.5; }
.azs text { fill: var(--fg); font: 600 9px var(--font-mono); }
.near { margin: 0.2rem 0; padding-left: 1.2rem; font-size: 0.95rem; }
.near li { cursor: pointer; }
.near span { color: var(--muted-dim); font-family: var(--font-mono); font-size: 0.85rem; }

.legend { margin: 0; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; font-size: 0.78rem; color: var(--muted-dim); }
.k { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 0.35rem; }
.dotk { background: var(--accent); }
.plannedk { border: 1.5px dashed var(--accent); }
.edgek { background: var(--ok); width: 7px; height: 7px; }
</style>

<script setup lang="ts">
// One day of traffic (users per hour, in thousands). Peak at night: the "match" hour.
const BASE = [2, 1, 1, 1, 1, 2, 3, 5, 6, 6, 7, 7, 8, 7, 6, 6, 7, 8, 10, 12, 14, 12, 7, 4]

const spike = ref(1)
const capacity = ref(10)
const elastic = ref(false)

const demand = computed(() => BASE.map((d, h) => (h >= 18 && h <= 21 ? d * spike.value : d)))
// Elastic capacity tracks demand with a small headroom.
const cap = computed(() => demand.value.map(d => (elastic.value ? d * 1.1 : capacity.value)))
const idle = computed(() => Math.round(demand.value.reduce((s, d, i) => s + Math.max(cap.value[i]! - d, 0), 0)))
const dropped = computed(() => Math.round(demand.value.reduce((s, d, i) => s + Math.max(d - cap.value[i]!, 0), 0)))

const W = 720, H = 220, MAX = 45
const x = (i: number) => (i / BASE.length) * W
const y = (v: number) => H - (Math.min(v, MAX) / MAX) * H
const bw = W / BASE.length - 4
const capPath = computed(() => cap.value.map((c, i) => `${i ? 'L' : 'M'}${x(i)},${y(c)} L${x(i + 1)},${y(c)}`).join(' '))
</script>

<template>
  <div class="widget">
    <div class="controls">
      <label>Pico de la noche: ×{{ spike.toFixed(1) }}<input v-model.number="spike" type="range" min="1" max="3" step="0.1" /></label>
      <label :class="{ off: elastic }">Servidores fijos: {{ capacity }}<input v-model.number="capacity" type="range" min="2" max="45" :disabled="elastic" /></label>
      <div class="modes">
        <button class="ghost" :aria-pressed="!elastic" @click="elastic = false">Capacidad fija</button>
        <button class="ghost" :aria-pressed="elastic" @click="elastic = true">Elástica</button>
      </div>
    </div>

    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" role="img" aria-label="Demanda por hora frente a capacidad">
      <rect
        v-for="(d, i) in demand"
        :key="i"
        :x="x(i) + 2"
        :y="y(d)"
        :width="bw"
        :height="H - y(d)"
        :class="d > cap[i]! ? 'over' : 'bar'"
        rx="3"
      />
      <path :d="capPath" class="cap" />
    </svg>

    <div class="stats">
      <p><b class="warn">{{ dropped }}k</b> usuarios sin atender</p>
      <p><b>{{ idle }}k</b> de capacidad pagada y ociosa</p>
    </div>
  </div>
</template>

<style scoped>
.widget { display: grid; gap: 1rem; padding: 1.2rem; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); }
.controls { display: grid; grid-template-columns: 1fr 1fr auto; gap: 1.2rem; align-items: end; font-size: 0.9rem; color: var(--muted); }
.off { opacity: 0.4; }
.modes { display: flex; gap: 0.5rem; }
svg { width: 100%; height: 160px; }
.bar { fill: var(--accent); opacity: 0.55; }
.over { fill: var(--danger); }
.cap { fill: none; stroke: var(--fg); stroke-width: 2.5; stroke-dasharray: 6 4; vector-effect: non-scaling-stroke; }
.stats { display: flex; gap: 2rem; flex-wrap: wrap; }
.stats p { margin: 0; color: var(--muted); }
.stats b { font-family: var(--font-mono); font-size: 1.4rem; color: var(--fg); }
.stats b.warn { color: var(--danger); }
@media (max-width: 640px) { .controls { grid-template-columns: 1fr; } }
</style>

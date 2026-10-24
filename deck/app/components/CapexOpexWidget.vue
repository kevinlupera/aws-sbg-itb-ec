<script setup lang="ts">
// ponytail: illustrative prices only, never real AWS pricing. Tune them on stage if asked.
const SERVER_PRICE = 5000 // USD upfront per server
const UPKEEP = 100 // USD per server per month: power, cooling, repairs
const HOURLY = 0.3 // USD per server-hour in the cloud
const HOURS = 730 // hours in a month

const peak = ref(10)
const usage = ref(30)
const months = ref(36)

// CapEx sizes for the peak; OpEx pays only for the average actually used.
const capex = computed(() => peak.value * SERVER_PRICE + peak.value * UPKEEP * months.value)
const opex = computed(() => Math.round(peak.value * (usage.value / 100) * HOURLY * HOURS * months.value))
const upfront = computed(() => peak.value * SERVER_PRICE)
const max = computed(() => Math.max(capex.value, opex.value))
const usd = (n: number) => n.toLocaleString('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
</script>

<template>
  <div class="widget">
    <div class="controls">
      <label>Servidores para el pico: {{ peak }}<input v-model.number="peak" type="range" min="1" max="50" /></label>
      <label>Uso promedio: {{ usage }} %<input v-model.number="usage" type="range" min="5" max="100" step="5" /></label>
      <label>Plazo: {{ months }} meses<input v-model.number="months" type="range" min="6" max="60" step="6" /></label>
    </div>

    <div class="bars">
      <div class="row">
        <span class="name">CapEx · comprar</span>
        <div class="track"><span class="fill capex" :style="{ width: `${(capex / max) * 100}%` }"></span></div>
        <b>{{ usd(capex) }}</b>
      </div>
      <div class="row">
        <span class="name">OpEx · pagar por uso</span>
        <div class="track"><span class="fill opex" :style="{ width: `${(opex / max) * 100}%` }"></span></div>
        <b>{{ usd(opex) }}</b>
      </div>
    </div>

    <p class="foot">
      Con CapEx pagas <b>{{ usd(upfront) }}</b> el día uno. Con OpEx, <b>{{ usd(0) }}</b>.
      <span class="muted">Cifras ilustrativas, no son precios reales.</span>
    </p>
  </div>
</template>

<style scoped>
.widget { display: grid; gap: 1.2rem; padding: 1.2rem; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); }
.controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; font-size: 0.9rem; color: var(--muted); }
.bars { display: grid; gap: 0.8rem; }
.row { display: grid; grid-template-columns: 12rem 1fr 8rem; gap: 1rem; align-items: center; }
.name { color: var(--muted); }
.track { height: 1.4rem; border-radius: 6px; background: var(--panel-2); overflow: hidden; }
.fill { display: block; height: 100%; border-radius: 6px; transition: width 0.2s; }
.capex { background: var(--fg); opacity: 0.75; }
.opex { background: var(--accent); }
.row b { font-family: var(--font-mono); text-align: right; }
.foot { margin: 0; }
.muted { display: block; font-size: 0.8rem; color: var(--muted-dim); }
@media (max-width: 640px) {
  .controls { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; gap: 0.3rem; }
  .row b { text-align: left; }
}
</style>

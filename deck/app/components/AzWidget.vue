<script setup lang="ts">
const AZS = ['AZ a', 'AZ b', 'AZ c']

const down = ref<Set<string>>(new Set())
const multiAz = ref(false)

// Single-AZ deployments live only in the first AZ.
const hosting = computed(() => (multiAz.value ? AZS : AZS.slice(0, 1)))
const serving = computed(() => hosting.value.filter(az => !down.value.has(az)))
const up = computed(() => serving.value.length > 0)

const toggle = (az: string) => {
  const next = new Set(down.value)
  next.has(az) ? next.delete(az) : next.add(az)
  down.value = next
}
</script>

<template>
  <div class="widget">
    <div class="modes">
      <button class="ghost" :aria-pressed="!multiAz" @click="multiAz = false">Una sola AZ</button>
      <button class="ghost" :aria-pressed="multiAz" @click="multiAz = true">Varias AZ</button>
      <span class="hint">Haz clic en una AZ para simular un corte de energía</span>
    </div>

    <div class="region">
      <span class="label">Región · sa-east-1</span>
      <div class="azs">
        <button
          v-for="az in AZS"
          :key="az"
          class="az"
          :class="{ down: down.has(az), host: hosting.includes(az) }"
          :aria-pressed="down.has(az)"
          @click="toggle(az)"
        >
          <span class="az-name">{{ az }}</span>
          <span class="az-state">{{ down.has(az) ? '⚡ sin energía' : hosting.includes(az) ? '🍳 app aquí' : 'disponible' }}</span>
        </button>
      </div>
    </div>

    <p class="status" :class="up ? 'ok' : 'ko'">
      {{ up ? `App en línea · atendiendo desde ${serving.join(', ')}` : 'App caída · ningún usuario es atendido' }}
    </p>
  </div>
</template>

<style scoped>
.widget { display: grid; gap: 1rem; padding: 1.2rem; border: 1px solid var(--line); border-radius: 12px; background: var(--panel); }
.modes { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.hint { font-size: 0.85rem; color: var(--muted-dim); margin-left: 0.5rem; }
.region { position: relative; padding: 1.8rem 1rem 1rem; border: 2px dashed var(--line); border-radius: 12px; }
.label { position: absolute; top: 0.5rem; left: 1rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }
.azs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.az {
  display: grid;
  gap: 0.3rem;
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel-2);
  color: var(--fg);
  text-align: left;
}
.az.host { border-color: var(--accent); background: var(--accent-dim); }
.az.down { border-color: var(--danger); background: var(--danger-dim); opacity: 0.7; }
.az-name { font-family: var(--font-mono); font-size: 1.05rem; }
.az-state { font-weight: 400; font-size: 0.85rem; color: var(--muted); }
.status { margin: 0; padding: 0.7rem 1rem; border-radius: 8px; font-weight: 600; }
.status.ok { color: var(--ok); background: var(--ok-dim); }
.status.ko { color: var(--danger); background: var(--danger-dim); }
@media (max-width: 640px) { .azs { grid-template-columns: 1fr; } }
</style>

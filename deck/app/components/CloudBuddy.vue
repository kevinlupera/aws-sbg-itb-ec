<script setup lang="ts">
// Decorative line-art cloud that glides along the bottom of every slide.
const props = defineProps<{ step: number; talking: boolean }>()

// Small lift on every slide change.
const hopping = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
watch(() => props.step, () => {
  hopping.value = false
  clearTimeout(timer)
  requestAnimationFrame(() => (hopping.value = true))
  timer = setTimeout(() => (hopping.value = false), 500)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="track" aria-hidden="true">
    <div class="walker">
      <div class="hop" :class="{ on: hopping }">
        <svg v-if="talking" class="bubble" viewBox="0 0 28 22" width="28" height="22">
          <path d="M5 2h18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H12l-5 4v-4H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" />
          <circle cx="9" cy="9" r="1.4" /><circle cx="14" cy="9" r="1.4" /><circle cx="19" cy="9" r="1.4" />
        </svg>
        <div class="turn">
          <svg viewBox="0 0 80 52" width="80" height="52">
            <g class="float">
              <!-- Data packets trailing behind the cloud. -->
              <rect class="packet p1" x="2" y="33" width="4" height="4" rx="1" />
              <rect class="packet p2" x="9" y="33" width="4" height="4" rx="1" />
              <path class="cloud" d="M22 44h38a12 12 0 0 0 1-24a18 18 0 0 0-34-4a12 12 0 0 0-5 28z" />
              <!-- Activity LEDs, like a server rack. -->
              <circle class="led l1" cx="34" cy="33" r="2" />
              <circle class="led l2" cx="42" cy="33" r="2" />
              <circle class="led l3" cx="50" cy="33" r="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.track { container-type: inline-size; height: 64px; pointer-events: none; }
.walker { width: 80px; animation: walk 48s linear infinite; }
.hop { position: relative; padding-top: 12px; }
.hop.on { animation: hop 0.5s ease-out; }
.turn { animation: turn 48s step-end infinite; }

.cloud { fill: var(--panel); stroke: var(--accent); stroke-width: 2.5; stroke-linejoin: round; }
.led { fill: var(--accent); animation: led 1.8s ease-in-out infinite; }
.l2 { animation-delay: 0.3s; }
.l3 { animation-delay: 0.6s; }
.packet { fill: var(--accent); animation: packet 1.6s linear infinite; }
.p2 { animation-delay: 0.8s; }
.float { animation: float 3s ease-in-out infinite; }

.bubble { position: absolute; top: -12px; left: 54px; animation: pop 2s ease-in-out infinite; }
.bubble path { fill: var(--panel); stroke: var(--accent); stroke-width: 1.5; stroke-linejoin: round; }
.bubble circle { fill: var(--accent); }

/* Glide the full width of the slide and back, turning around at each edge. */
@keyframes walk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(calc(100cqw - 80px)); }
}
@keyframes turn {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
}
@keyframes float { 50% { transform: translateY(-2px); } }
@keyframes led { 0%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
@keyframes packet { 0% { opacity: 0; transform: translateX(6px); } 30% { opacity: 0.7; } 100% { opacity: 0; transform: translateX(-6px); } }
@keyframes hop { 40% { transform: translateY(-10px); } }
@keyframes pop { 50% { transform: translateY(-2px); } }

@media (prefers-reduced-motion: reduce) {
  .walker, .turn, .float, .led, .packet, .bubble, .hop.on { animation: none; }
}
</style>

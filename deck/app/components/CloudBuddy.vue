<script setup lang="ts">
// Decorative mascot that strolls along the bottom of every slide.
const props = defineProps<{ step: number; talking: boolean }>()

// Small hop on every slide change.
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
        <span v-if="talking" class="bubble">💬</span>
        <div class="turn">
          <svg viewBox="0 0 80 64" width="72" height="58">
            <g class="bob">
              <g class="outline">
                <circle cx="24" cy="34" r="14" />
                <circle cx="40" cy="25" r="18" />
                <circle cx="56" cy="34" r="14" />
                <rect x="10" y="32" width="60" height="20" rx="10" />
              </g>
              <g class="fill">
                <circle cx="24" cy="34" r="14" />
                <circle cx="40" cy="25" r="18" />
                <circle cx="56" cy="34" r="14" />
                <rect x="10" y="32" width="60" height="20" rx="10" />
              </g>
              <circle class="cheek" cx="28" cy="42" r="3" />
              <circle class="cheek" cx="52" cy="42" r="3" />
              <ellipse class="eye" cx="34" cy="36" rx="2.6" ry="3.4" />
              <ellipse class="eye" cx="46" cy="36" rx="2.6" ry="3.4" />
              <path class="smile" d="M36 43 Q40 47 44 43" />
            </g>
            <ellipse class="foot left" cx="31" cy="58" rx="5" ry="3" />
            <ellipse class="foot right" cx="49" cy="58" rx="5" ry="3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.track { container-type: inline-size; height: 64px; pointer-events: none; }
.walker { width: 72px; animation: walk 40s linear infinite; }
.hop { position: relative; }
.hop.on { animation: hop 0.5s ease-out; }
.turn { animation: turn 40s step-end infinite; }

.outline > * { fill: var(--accent); stroke: var(--accent); stroke-width: 5; }
.fill > * { fill: var(--panel); }
.cheek { fill: var(--accent); opacity: 0.3; }
.eye { fill: var(--fg); transform-box: fill-box; transform-origin: center; animation: blink 4s infinite; }
.smile { fill: none; stroke: var(--fg); stroke-width: 2; stroke-linecap: round; }
.foot { fill: var(--accent); }
.foot.left { animation: step 0.6s ease-in-out infinite; }
.foot.right { animation: step 0.6s ease-in-out infinite reverse; }
.bob { animation: bob 0.6s ease-in-out infinite; }

.bubble { position: absolute; top: -1.4rem; left: 50%; font-size: 1.3rem; animation: pop 1.6s ease-in-out infinite; }

/* Walk the full width of the slide and back, turning around at each edge. */
@keyframes walk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(calc(100cqw - 72px)); }
}
@keyframes turn {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
}
@keyframes bob { 50% { transform: translateY(-2px); } }
@keyframes step { 50% { transform: translateY(-2px); } }
@keyframes blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
@keyframes hop { 40% { transform: translateY(-14px); } }
@keyframes pop { 50% { transform: translateY(-3px) scale(1.08); } }

@media (prefers-reduced-motion: reduce) {
  .walker, .turn, .bob, .foot, .eye, .bubble, .hop.on { animation: none; }
}
</style>

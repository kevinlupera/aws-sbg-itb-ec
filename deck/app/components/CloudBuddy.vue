<script setup lang="ts">
// Decorative footer scene: a dog in a bowler hat (homage to "This is fine") strolls along the
// slides chased by flames. On the last slide an AWS cloud rains on the fire and the dog sits down.
// ponytail: original SVG drawing, not the comic artwork — the deck is public.
const props = defineProps<{ step: number; talking: boolean; finale: boolean }>()

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

const FLAMES = [
  { x: 0, y: 26, s: 0.85 },
  { x: 20, y: 18, s: 1.05 },
  { x: 44, y: 28, s: 0.8 },
]
const RAIN = [6, 16, 26, 36, 46, 56]
</script>

<template>
  <div class="track" :class="{ finale }" aria-hidden="true">
    <div class="walker">
      <div class="hop" :class="{ on: hopping }">
        <template v-if="finale">
          <svg class="aws" viewBox="0 0 80 52" width="76" height="50">
            <path class="cloud" d="M22 44h38a12 12 0 0 0 1-24a18 18 0 0 0-34-4a12 12 0 0 0-5 28z" />
            <text x="41" y="37" text-anchor="middle">AWS</text>
          </svg>
          <svg class="rain" viewBox="0 0 64 40" width="64" height="40">
            <line v-for="(x, i) in RAIN" :key="x" :x1="x" y1="0" :x2="x - 3" y2="10" :style="{ animationDelay: `${i * 0.12}s` }" />
          </svg>
          <p class="fine">This is fine.</p>
        </template>

        <div class="turn">
          <!-- Inside .turn so it stays over the dog, never over the flames. -->
          <svg v-if="talking && !finale" class="chat" viewBox="0 0 28 22" width="28" height="22">
            <path d="M5 2h18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H12l-5 4v-4H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" />
            <circle cx="9" cy="9" r="1.4" /><circle cx="14" cy="9" r="1.4" /><circle cx="19" cy="9" r="1.4" />
          </svg>
          <svg viewBox="0 0 150 70" width="150" height="70">
            <!-- Flames chasing from behind. -->
            <g v-for="(f, i) in FLAMES" :key="i" :transform="`translate(${f.x} ${f.y}) scale(${f.s})`">
              <g class="flame" :style="{ animationDelay: `${i * 0.15}s` }">
                <path class="outer" d="M12 40C2 40 0 30 4 22c2 6 5 6 5 2C8 16 12 8 16 0c0 10 8 16 8 28 0 8-5 12-12 12z" />
                <path class="inner" d="M12 40c-5 0-6-5-4-9 1 3 3 3 3 1 0-4 2-8 4-11 0 6 4 9 4 13 0 4-3 6-7 6z" />
              </g>
            </g>

            <!-- The dog. -->
            <g transform="translate(70 2)">
              <g class="dog">
              <g v-if="finale" class="chair">
                <rect x="10" y="30" width="4" height="22" rx="1" />
                <rect x="10" y="48" width="34" height="4" rx="1" />
                <rect x="13" y="52" width="3" height="12" />
                <rect x="38" y="52" width="3" height="12" />
              </g>
              <rect class="leg l" x="22" y="50" width="6" height="12" rx="3" />
              <rect class="leg r" x="36" y="50" width="6" height="12" rx="3" />
              <ellipse class="fur" cx="32" cy="44" rx="16" ry="12" />
              <ellipse class="fur" cx="36" cy="24" rx="13" ry="12" />
              <ellipse class="fur" cx="50" cy="28" rx="10" ry="6" />
              <ellipse class="ink" cx="25" cy="27" rx="5" ry="9" transform="rotate(15 25 27)" />
              <circle class="eye" cx="40" cy="21" r="5" />
              <circle class="ink" cx="42" cy="21" r="2.6" />
              <ellipse class="ink" cx="59" cy="27" rx="4" ry="3.5" />
              <path class="line" d="M46 33q4 3 8 0" />
              <path class="hat" d="M27 12a7 7 0 0 1 14 0z" />
              <rect class="ink" x="27" y="10" width="14" height="2" />
              <ellipse class="hat" cx="34" cy="12.5" rx="11" ry="2.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.track { container-type: inline-size; height: 76px; pointer-events: none; }
.walker { width: 150px; animation: walk 48s linear infinite; }
.hop { position: relative; }
.hop.on { animation: hop 0.5s ease-out; }
.turn { position: relative; animation: turn 48s step-end infinite; }

.fur { fill: #f0a830; stroke: #2b1d0e; stroke-width: 1.6; }
.ink { fill: #2b1d0e; }
.eye { fill: #fff; stroke: #2b1d0e; stroke-width: 1.6; }
.line { fill: none; stroke: #2b1d0e; stroke-width: 1.6; stroke-linecap: round; }
.hat { fill: #d98a1c; stroke: #2b1d0e; stroke-width: 1.4; }
.leg { fill: #f0a830; stroke: #2b1d0e; stroke-width: 1.4; }
.leg.l { animation: step 0.4s ease-in-out infinite; }
.leg.r { animation: step 0.4s ease-in-out infinite reverse; }
.dog { animation: trot 0.4s ease-in-out infinite; }
.chair > * { fill: #c47a2c; stroke: #2b1d0e; stroke-width: 1.2; }

.flame { transform-box: fill-box; transform-origin: bottom center; animation: flicker 0.5s ease-in-out infinite alternate; }
.outer { fill: #f6a01a; stroke: #c2410c; stroke-width: 1.2; }
.inner { fill: #fde047; }

.chat { position: absolute; top: -18px; right: 6px; animation: pop 2s ease-in-out infinite; }
.chat path { fill: var(--panel); stroke: var(--accent); stroke-width: 1.5; stroke-linejoin: round; }
.chat circle { fill: var(--accent); }

/* Finale: centered scene, AWS cloud rains, flames die out, the dog sits and is fine. */
.track.finale { height: 150px; }
.finale .walker { animation: fade 0.6s ease-out; transform: translateX(calc(50cqw - 75px)); padding-top: 80px; }
.finale .turn, .finale .dog, .finale .leg { animation: none; }
.finale .flame { animation: flicker 0.5s ease-in-out infinite alternate, out 0.9s ease-in 1.6s forwards; }
.aws { position: absolute; top: 0; left: -6px; animation: drop 0.7s ease-out both; }
.aws .cloud { fill: var(--panel); stroke: var(--accent); stroke-width: 2.5; stroke-linejoin: round; }
.aws text { fill: var(--accent); font: 700 13px var(--font-mono); }
.rain { position: absolute; top: 46px; left: 0; opacity: 0; animation: rain 3.2s 0.4s forwards; }
.rain line { stroke: #60a5fa; stroke-width: 2; stroke-linecap: round; animation: fall 0.5s linear infinite; }
.fine {
  position: absolute;
  top: 6px;
  left: 146px;
  margin: 0;
  padding: 0.2rem 0.7rem;
  white-space: nowrap;
  border: 1.5px solid var(--fg);
  border-radius: 10px;
  background: var(--panel);
  font-weight: 700;
  font-size: 0.95rem;
  opacity: 0;
  animation: show 0.4s 2.6s forwards;
}

/* Walk the full width of the slide and back, turning around at each edge. */
@keyframes walk {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(calc(100cqw - 150px)); }
}
@keyframes turn {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
}
@keyframes trot { 50% { transform: translateY(-1.5px); } }
@keyframes step { 50% { transform: translateY(-2px); } }
@keyframes flicker { from { transform: scale(1, 1) skewX(-3deg); } to { transform: scale(0.94, 1.1) skewX(3deg); } }
@keyframes out { to { transform: scale(0); opacity: 0; } }
@keyframes hop { 40% { transform: translateY(-10px); } }
@keyframes pop { 50% { transform: translateY(-2px); } }
@keyframes drop { from { transform: translateY(-30px); opacity: 0; } }
@keyframes show { to { opacity: 1; } }
@keyframes rain { 15%, 80% { opacity: 1; } }
@keyframes fall { from { transform: translateY(-6px); opacity: 1; } to { transform: translateY(18px); opacity: 0; } }
@keyframes fade { from { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .walker, .turn, .dog, .leg, .flame, .chat, .hop.on, .aws, .rain line { animation: none; }
  .finale .flame { animation: none; opacity: 0; }
  .finale .fine { animation: none; opacity: 1; }
}
</style>

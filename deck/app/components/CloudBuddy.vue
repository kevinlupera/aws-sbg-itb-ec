<script setup lang="ts">
// Decorative footer scene: a dog in a bowler hat (homage to "This is fine") strolls along the
// slides running away from classic on-premises problems, shown in one bubble that changes word and
// color. On the last slide the flames appear, an AWS cloud rains on them and the dog sits down.
// ponytail: original SVG drawing, not the comic artwork — the deck is public.
const props = defineProps<{ step: number; finale: boolean }>()

// Small hop on every slide change.
const hopping = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
watch(() => props.step, () => {
  hopping.value = false
  clearTimeout(timer)
  requestAnimationFrame(() => (hopping.value = true))
  timer = setTimeout(() => (hopping.value = false), 500)
})

// The bubble cycles through common on-premises problems.
const ERRORS = [
  { text: 'Disco lleno', color: '#dc2626' },
  { text: 'Servidor caído', color: '#ea580c' },
  { text: 'Sin energía', color: '#ca8a04' },
  { text: 'Parche pendiente', color: '#9333ea' },
  { text: 'Hardware obsoleto', color: '#0d9488' },
  { text: 'Backup fallido', color: '#2563eb' },
  { text: 'Sobrecarga', color: '#db2777' },
]
const err = ref(0)
let cycle: ReturnType<typeof setInterval> | undefined
onMounted(() => (cycle = setInterval(() => (err.value = (err.value + 1) % ERRORS.length), 2500)))
onBeforeUnmount(() => { clearTimeout(timer); clearInterval(cycle) })

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
          <!-- Inside .turn so it chases from behind; .err counter-flips so the text never mirrors. -->
          <div v-if="!finale" class="err">
            <span :key="err" class="pill" :style="{ '--c': ERRORS[err]!.color }">{{ ERRORS[err]!.text }}</span>
          </div>
          <svg viewBox="0 0 150 70" width="150" height="70">
            <g>
            <g v-for="(f, i) in FLAMES" :key="i" :transform="`translate(${f.x} ${f.y}) scale(${f.s})`">
              <g class="flame" :style="{ animationDelay: `${i * 0.15}s` }">
                <path class="outer" d="M12 40C2 40 0 30 4 22c2 6 5 6 5 2C8 16 12 8 16 0c0 10 8 16 8 28 0 8-5 12-12 12z" />
                <path class="inner" d="M12 40c-5 0-6-5-4-9 1 3 3 3 3 1 0-4 2-8 4-11 0 6 4 9 4 13 0 4-3 6-7 6z" />
              </g>
            </g>
            </g>

            <!-- The dog. -->
            <g transform="translate(70 2)">
              <g class="dog">
                <g v-if="finale" class="chair">
                  <rect x="8" y="28" width="4" height="24" rx="1" />
                  <rect x="8" y="48" width="38" height="4" rx="1" />
                  <rect x="11" y="52" width="3" height="12" />
                  <rect x="41" y="52" width="3" height="12" />
                </g>
                <rect class="leg l" x="20" y="52" width="7" height="11" rx="3.5" />
                <rect class="leg r" x="36" y="52" width="7" height="11" rx="3.5" />
                <!-- Body and floppy ear. -->
                <ellipse class="fur" cx="30" cy="44" rx="17" ry="14" />
                <ellipse class="belly" cx="36" cy="48" rx="8" ry="8" />
                <ellipse class="ink" cx="23" cy="26" rx="6" ry="11" transform="rotate(14 23 26)" />
                <!-- Head and long snout. -->
                <ellipse class="fur" cx="37" cy="24" rx="15" ry="14" />
                <ellipse class="fur" cx="55" cy="29" rx="13" ry="6.5" />
                <ellipse class="ink" cx="67" cy="26.5" rx="5" ry="4.5" />
                <ellipse class="glint" cx="68.5" cy="24.5" rx="1.6" ry="1" />
                <path class="line" d="M49 33.5q9 4.5 17-.5" />
                <rect class="tooth" x="57" y="34" width="3" height="3.4" rx="0.8" />
                <!-- Big worried eyes: pupils look back at the chasers, sideways in the finale. -->
                <circle class="eye" cx="33" cy="21" r="7.5" />
                <circle class="eye" cx="47" cy="20" r="6.5" />
                <circle class="ink" :cx="finale ? 36 : 30.5" cy="21.5" r="3.6" />
                <circle class="ink" :cx="finale ? 49.5 : 44" cy="20.5" r="3.2" />
                <circle class="glint" :cx="finale ? 37 : 31.5" cy="20" r="1.1" />
                <!-- Tilted bowler hat. -->
                <g transform="rotate(-9 36 11)">
                  <path class="hat" d="M26 12a10 9.5 0 0 1 20 0z" />
                  <rect class="band" x="26" y="9.6" width="20" height="2.6" />
                  <ellipse class="hat" cx="36" cy="12.5" rx="13.5" ry="3" />
                </g>
                <!-- Cold sweat while running away. -->
                <path v-if="!finale" class="sweat" d="M25 8q-3 5 0 7q3-2 0-7z" />
                <!-- Coffee cup, finale only. -->
                <g v-if="finale" class="mug">
                  <rect x="55" y="40" width="11" height="12" rx="2" />
                  <path d="M66 43q5 0 5 4t-5 4" />
                  <ellipse class="fur" cx="53" cy="47" rx="5" ry="3.6" />
                </g>
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
.walker { width: 150px; margin: 0 70px; animation: walk 48s linear infinite; }
.hop { position: relative; }
.hop.on { animation: hop 0.5s ease-out; }
.turn { position: relative; animation: turn 48s step-end infinite; }

.fur { fill: #f5a623; stroke: #2b1d0e; stroke-width: 1.6; }
.belly { fill: #fbc55a; }
.ink { fill: #2b1d0e; }
.eye { fill: #fff; stroke: #2b1d0e; stroke-width: 1.8; }
.glint { fill: #fff; }
.line { fill: none; stroke: #2b1d0e; stroke-width: 1.7; stroke-linecap: round; }
.tooth { fill: #fff; stroke: #2b1d0e; stroke-width: 1; }
.hat { fill: #e08a14; stroke: #2b1d0e; stroke-width: 1.5; }
.band { fill: #2b1d0e; }
.leg { fill: #f5a623; stroke: #2b1d0e; stroke-width: 1.5; }
.leg.l { animation: step 0.4s ease-in-out infinite; }
.leg.r { animation: step 0.4s ease-in-out infinite reverse; }
.sweat { fill: #7dd3fc; stroke: #0284c7; stroke-width: 1; animation: drip 1.2s ease-in infinite; }
.mug rect { fill: #fff; stroke: #2b1d0e; stroke-width: 1.6; }
.mug path { fill: none; stroke: #2b1d0e; stroke-width: 1.6; }
.dog { animation: trot 0.4s ease-in-out infinite; }
.chair > * { fill: #c47a2c; stroke: #2b1d0e; stroke-width: 1.2; }

.flame { transform-box: fill-box; transform-origin: bottom center; animation: flicker 0.5s ease-in-out infinite alternate; }
.outer { fill: #f6a01a; stroke: #c2410c; stroke-width: 1.2; }
.inner { fill: #fde047; }

/* Floats above the chasing flames; width grows away from the dog. */
.err { position: absolute; right: 60px; top: -14px; animation: turn 48s step-end infinite; }
.pill {
  display: inline-block;
  padding: 0.25rem 0.8rem;
  white-space: nowrap;
  border: 2px solid var(--c);
  border-radius: 999px;
  background: var(--panel);
  color: var(--c);
  font-weight: 700;
  font-size: 0.85rem;
  animation: pop-in 0.35s ease-out;
}

/* Finale: centered scene, AWS cloud rains, flames die out, the dog sits and is fine. */
.track.finale { height: 150px; }
.finale .walker { margin: 0; animation: fade 0.6s ease-out; transform: translateX(calc(50cqw - 75px)); padding-top: 80px; }
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
  50% { transform: translateX(calc(100cqw - 290px)); }
}
@keyframes turn {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
}
@keyframes drip { 0% { transform: translateY(-2px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(6px); opacity: 0; } }
@keyframes trot { 50% { transform: translateY(-1.5px); } }
@keyframes step { 50% { transform: translateY(-2px); } }
@keyframes flicker { from { transform: scale(1, 1) skewX(-3deg); } to { transform: scale(0.94, 1.1) skewX(3deg); } }
@keyframes out { to { transform: scale(0); opacity: 0; } }
@keyframes hop { 40% { transform: translateY(-10px); } }
@keyframes pop-in { from { transform: scale(0.7); opacity: 0; } }
@keyframes drop { from { transform: translateY(-30px); opacity: 0; } }
@keyframes show { to { opacity: 1; } }
@keyframes rain { 15%, 80% { opacity: 1; } }
@keyframes fall { from { transform: translateY(-6px); opacity: 1; } to { transform: translateY(18px); opacity: 0; } }
@keyframes fade { from { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .walker, .turn, .err, .pill, .dog, .leg, .sweat, .flame, .hop.on, .aws, .rain line { animation: none; }
  .finale .flame { animation: none; opacity: 0; }
  .finale .fine { animation: none; opacity: 1; }
}
</style>

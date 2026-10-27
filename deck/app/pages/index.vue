<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const total = SLIDES.length
const clamp = (n: number) => Math.min(Math.max(n, 0), total - 1)

// ?s= is 1-based so the URL matches what the speaker reads on screen.
const index = ref(clamp((Number(route.query.s) || 1) - 1))
const slide = computed(() => SLIDES[index.value]!)
const showNotes = ref(false)
const revealed = ref(false)

const go = (n: number) => {
  index.value = clamp(n)
  revealed.value = false
  router.replace({ query: { ...route.query, s: String(index.value + 1) } })
}

const onKey = (e: KeyboardEvent) => {
  // Widgets have inputs; don't hijack arrows while the speaker drags a slider.
  if ((e.target as HTMLElement).closest('input, select, textarea')) return
  const k = e.key
  if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') go(index.value + 1)
  else if (k === 'ArrowLeft' || k === 'PageUp') go(index.value - 1)
  else if (k === 'Home') go(0)
  else if (k === 'End') go(total - 1)
  else if (k === 'n' || k === 'N') showNotes.value = !showNotes.value
  else if (k === 'r' || k === 'R') revealed.value = !revealed.value
  else return
  e.preventDefault()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const base = useRuntimeConfig().app.baseURL
const photoFailed = ref(false)
const initials = SPEAKER.name.split(' ').map(w => w[0]).join('').slice(0, 2)

const isMap = computed(() => slide.value.widget?.startsWith('map-') ?? false)

const letter = (i: number) => String.fromCharCode(65 + i)
</script>

<template>
  <div class="deck">
    <header class="top">
      <span class="brand"><span class="mark" aria-hidden="true"></span>Fundamentos de la nube</span>
      <span class="block">{{ slide.block }}</span>
      <img v-if="!slide.logo" class="top-logo" :src="`${base}sbg-itb-logo.png`" alt="AWS Student Builder Group at ITB" />
    </header>

    <main class="slide" :class="{ split: isMap || slide.widget === 'az-map' }" :key="index">
      <img v-if="slide.logo" class="logo" :src="`${base}sbg-itb-logo.png`" alt="AWS Student Builder Group at ITB" />
      <h1>{{ slide.title }}</h1>

      <section v-if="slide.speaker" class="speaker">
        <img v-if="!photoFailed" :src="`${base}speaker.jpg`" alt="" class="photo" @error="photoFailed = true" />
        <span v-else class="photo initials">{{ initials }}</span>
        <div>
          <p class="name">{{ SPEAKER.name }}</p>
          <p class="role">{{ SPEAKER.role }}</p>
          <ul class="points"><li v-for="f in SPEAKER.facts" :key="f">{{ f }}</li></ul>
          <p class="contact">{{ SPEAKER.contact }}</p>
        </div>
        <div class="badges">
          <img v-for="b in SPEAKER.badges" :key="b.file" :src="`${base}certs/${b.file}`" :alt="b.label" :title="b.label" width="96" height="96" />
        </div>
      </section>

      <ul v-if="slide.points" class="points">
        <li v-for="p in slide.points" :key="p">{{ p }}</li>
      </ul>

      <p v-if="slide.analogy" class="analogy"><span class="tag">Analogía</span>{{ slide.analogy }}</p>

      <ElasticityWidget v-if="slide.widget === 'elasticity'" />
      <CapexOpexWidget v-else-if="slide.widget === 'capex-opex'" />
      <AzWidget v-else-if="slide.widget === 'az'" />
      <AzZoom v-else-if="slide.widget === 'az-map'" class="wmap" />
      <WorldMap v-else-if="isMap" :key="slide.widget" class="wmap" :mode="slide.widget!.replace('map-', '') as 'region' | 'edge' | 'choose'" />

      <section v-if="slide.quiz" class="quiz">
        <p class="question">{{ slide.quiz.question }}</p>
        <ol>
          <li
            v-for="(opt, i) in slide.quiz.options"
            :key="opt"
            :class="{ right: revealed && i === slide.quiz.answer, dim: revealed && i !== slide.quiz.answer }"
          >
            <b>{{ letter(i) }}</b>{{ opt }}
          </li>
        </ol>
        <p v-if="revealed" class="why">{{ slide.quiz.why }}</p>
        <button v-else class="ghost" @click="revealed = true">Revelar respuesta (R)</button>
      </section>

      <section v-if="slide.qr" class="qr">
        <img :src="`${base}linktree-qr.svg`" alt="Código QR de mi Linktree" width="132" height="132" />
        <div>
          <p class="qr-title">Mis redes, slides, blog, charlas y mucho más!!! :)</p>
          <p class="qr-url">{{ LINKTREE.replace('https://', '') }}</p>
        </div>
      </section>

      <p v-if="slide.chat" class="chat">💬 <b>Responde en el chat:</b> {{ slide.chat }}</p>
    </main>

    <aside v-if="showNotes" class="notes"><span class="tag">Notas · min {{ slide.minute }}</span>{{ slide.notes }}</aside>

    <CloudBuddy :step="index" :finale="index === total - 1" />

    <footer class="bottom">
      <button class="ghost" :disabled="index === 0" @click="go(index - 1)" aria-label="Anterior">←</button>
      <div class="progress" aria-hidden="true"><span :style="{ width: `${((index + 1) / total) * 100}%` }"></span></div>
      <span class="count">{{ index + 1 }} / {{ total }}</span>
      <button class="ghost" :disabled="index === total - 1" @click="go(index + 1)" aria-label="Siguiente">→</button>
    </footer>
  </div>
</template>

<style scoped>
.deck {
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.85rem; position: relative; }
.top-logo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); height: 1.6rem; padding: 0.25rem 0.5rem; border-radius: 6px; background: #0b1120; opacity: 0.85; }
@media (max-width: 700px) { .top-logo { display: none; } }
.brand { display: inline-flex; align-items: center; gap: 0.6rem; font-weight: 600; }
.mark { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: var(--accent); }
.block {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.slide { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 1.4rem; animation: in 0.25s ease; }
/* Map slides: text on the left, map on the right. */
.slide.split { display: grid; grid-template-columns: 5fr 7fr; column-gap: 2rem; align-content: center; align-items: start; }
.slide.split > h1 { grid-column: 1 / -1; }
.slide.split > :not(h1):not(.wmap) { grid-column: 1; }
.slide.split > .wmap { grid-column: 2; grid-row: 2 / span 5; }
@media (max-width: 900px) { .slide.split { display: flex; } }
@keyframes in { from { opacity: 0; transform: translateY(6px); } }
h1 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
}
.points { margin: 0; padding-left: 1.2rem; font-size: clamp(1.1rem, 2vw, 1.45rem); color: var(--muted); }
.points li { margin: 0.35rem 0; }
.points li::marker { color: var(--accent); }

.tag {
  display: inline-block;
  margin-right: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.speaker { display: flex; gap: 2.5rem; align-items: center; }
.badges { display: grid; grid-template-columns: repeat(2, 96px); gap: 0.6rem; margin-left: auto; flex: none; }
.logo { width: min(420px, 80%); padding: 0.8rem 1.2rem; border-radius: 12px; background: #0b1120; align-self: flex-start; }
.photo { width: 220px; height: 220px; flex: none; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); }
.initials { display: grid; place-items: center; background: var(--accent-dim); color: var(--accent); font: 700 4rem var(--font-display); }
.name { margin: 0; font-size: 1.8rem; font-weight: 700; }
.role { margin: 0 0 0.6rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; }
.qr { display: flex; gap: 1.2rem; align-items: center; }
/* White tile so the code scans in dark mode too. */
.qr img { border-radius: 10px; border: 1px solid var(--line); background: #fff; }
.qr-title { margin: 0; font-size: 1.3rem; font-weight: 700; }
.qr-url { margin: 0; font-family: var(--font-mono); color: var(--accent); }
.contact { margin: 0.8rem 0 0; font-family: var(--font-mono); font-size: 0.95rem; color: var(--muted-dim); }
@media (max-width: 900px) { .badges { margin-left: 0; } }
@media (max-width: 640px) { .speaker { flex-direction: column; align-items: flex-start; } }

.analogy {
  margin: 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--accent);
  border-radius: 0 10px 10px 0;
  background: var(--accent-dim);
  font-size: 1.15rem;
}

.quiz { display: flex; flex-direction: column; gap: 0.9rem; align-items: flex-start; }
.question { margin: 0; font-size: 1.4rem; font-weight: 600; }
.quiz ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; width: 100%; }
.quiz li {
  display: flex;
  gap: 0.9rem;
  align-items: baseline;
  padding: 0.85rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel);
  font-size: 1.15rem;
  transition: opacity 0.2s, border-color 0.2s;
}
.quiz li b { font-family: var(--font-mono); color: var(--accent); }
.quiz li.right { border-color: var(--ok); background: var(--ok-dim); }
.quiz li.dim { opacity: 0.45; }
.why { margin: 0; color: var(--ok); font-weight: 600; }

.chat {
  margin: 0;
  padding: 0.9rem 1.2rem;
  border: 1px dashed var(--accent);
  border-radius: 10px;
  font-size: 1.15rem;
}

.notes {
  padding: 0.9rem 1.2rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel-2);
  color: var(--muted);
  font-size: 0.95rem;
}

.bottom { display: flex; align-items: center; gap: 1rem; }
.bottom button { padding: 0.35rem 0.9rem; }
.bottom button:disabled { opacity: 0.35; cursor: default; }
.progress { flex: 1; height: 4px; border-radius: 2px; background: var(--line); overflow: hidden; }
.progress span { display: block; height: 100%; background: var(--accent); transition: width 0.25s; }
.count { font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted-dim); }

@media (max-width: 640px) { .deck { padding: 1rem; } }
</style>

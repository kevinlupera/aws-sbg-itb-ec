export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  // ponytail: SPA deck, the slide index lives in ?s= and is only known in the browser
  ssr: false,
  app: { head: { htmlAttrs: { lang: 'es' }, title: 'Fundamentos de la nube con AWS' } },
})

// ponytail: link-preview crawlers need absolute URLs; update SITE if the deck moves.
const SITE = 'https://kevinlupera.github.io/aws-sbg-itb-ec/'
const TITLE = 'La nube sin humo: fundamentos de AWS'
const DESCRIPTION = 'Qué es la nube, cuánto cuesta (CapEx vs OpEx) y dónde vive: Regiones, Zonas de Disponibilidad y Edge Locations.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },
  // ponytail: SPA deck, the slide index lives in ?s= and is only known in the browser
  ssr: false,
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: TITLE,
      meta: [
        { name: 'description', content: DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:url', content: SITE },
        { property: 'og:image', content: `${SITE}og.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'es_EC' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: DESCRIPTION },
        { name: 'twitter:image', content: `${SITE}og.png` },
      ],
    },
  },
})

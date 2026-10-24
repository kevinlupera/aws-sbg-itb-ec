# La nube sin humo — fundamentos de AWS

Deck web interactivo para una charla **virtual de 60 minutos** dirigida a estudiantes y personas que empiezan en AWS y tecnología.
Sienta las bases de la nube **sin entrar a servicios específicos**: qué es Cloud Computing, economía en la nube (CapEx vs OpEx) e Infraestructura Global (Regiones, Zonas de Disponibilidad y Edge Locations).

La audiencia participa por el **chat de la sesión**: hay una pregunta o quiz cada ~8 minutos, y tres widgets que el speaker opera en pantalla compartida.

## Correrlo

```bash
cd deck
pnpm install
pnpm dev                 # http://localhost:3000
pnpm generate            # sitio estático en deck/.output/public
```

## Controles

| Tecla | Acción |
|---|---|
| `→` · `Espacio` · `PageDown` | Siguiente slide |
| `←` · `PageUp` | Slide anterior |
| `Home` · `End` | Primera · última |
| `R` | Revelar la respuesta del quiz |
| `N` | Mostrar/ocultar notas del speaker |

`?s=N` abre directo la slide N (por ejemplo `/?s=21` es el widget de AZs).

> Las notas (`N`) se ven en pantalla: si compartes esta pestaña, no las abras en vivo. Úsalas para ensayar o ten este README abierto en otra ventana.

## Hilo conductor: montar tu negocio de comida

| Concepto | Analogía |
|---|---|
| On-premises | Construir tu propia cocina industrial antes de vender un plato |
| Cloud Computing | La luz eléctrica: te conectas y pagas lo que consumes |
| Elasticidad | Meseros extra solo el sábado del partido |
| Agilidad | Probar el menú nuevo en un food truck alquilado mañana |
| Alta disponibilidad | Dos cocinas en barrios distintos |
| CapEx | Comprar el carro de reparto |
| OpEx | Pedir taxi por viaje |
| Región | La ciudad donde abres tu negocio |
| Zona de Disponibilidad | Cocinas separadas en la misma ciudad, cada una con su luz y agua |
| Edge Location | Lockers de retiro cerca de tu casa |

## Guion

| Min | Bloque | Slides | Pregunta al chat |
|---|---|---|---|
| 0–5 | Apertura | 1–4 | ¿Desde qué ciudad nos ves y qué estudias o a qué te dedicas? |
| 5–12 | El problema | 5–6 | ¿Alguna vez una web o app se cayó justo cuando más la necesitabas? |
| 12–25 | Cloud Computing | 7–13 | Quiz Black Friday (A/B/C) · widget de elasticidad |
| 25–37 | Economía en la nube | 14–18 | ¿Comprar carro o pedir taxi por app? · widget CapEx vs OpEx |
| 37–50 | Infraestructura Global | 19–24 | ¿Qué Región elegirías para una app en Ecuador? · widget de AZs |
| 50–55 | Recap | 25–29 | Quiz relámpago de 3 preguntas |
| 55–60 | Preguntas | 30 | Preguntas acumuladas del chat |

Las respuestas esperadas y el puente al siguiente tema de cada slide están en `notes`, dentro de `deck/app/utils/slides.ts`.

### Widgets

- **Elasticidad** (slide 9): con capacidad fija, sube el pico y aparecen usuarios sin atender (en rojo); baja la capacidad y crece lo ocioso. Con «Elástica», ambos se acercan a cero.
- **CapEx vs OpEx** (slide 17): servidores para el pico, uso promedio y plazo. Con uso bajo, OpEx gana claro. Con 100 % de uso y 60 meses, CapEx compite: la nube no es magia, es flexibilidad. Las cifras son ilustrativas.
- **Zonas de Disponibilidad** (slide 21): con «Una sola AZ», apaga la AZ a y la app se cae. Con «Varias AZ», apaga una y la app sigue en línea.
- **AZ dentro de una Región** (slide 22, `deck/app/components/AzZoom.vue`): amplía una Región de Norteamérica y muestra 3 AZ (cada una, un grupo de centros de datos) unidas por fibra. Es un **esquema ilustrativo**: AWS no publica dónde están sus centros de datos.
- **Mapa mundial** (slides 20, 23 y 24, `deck/app/components/WorldMap.vue`): puntos de las Regiones (toca uno para ver su código, la distancia a Ecuador y sus AZ), las anunciadas en línea punteada y un modo Edge Locations. En la slide 24 lista las 3 Regiones más cercanas a Ecuador. Las slides 20 y 23 hacen zoom a América del Norte; la 24 muestra el mundo para ver Ecuador. La slide 20 solo muestra Regiones; el interruptor de Edge Locations existe solo en la 23. El botón «Agrandar» abre el mapa a pantalla casi completa (Esc lo cierra). Las Edge Locations son **ilustrativas** (grandes ciudades), no una lista real. Datos en `deck/app/utils/geo.ts`; la silueta sale de Natural Earth (dominio público) vía `world-atlas`.

## Editar la charla

Tu foto y datos están en `SPEAKER` (`deck/app/utils/slides.ts`); la foto va en `deck/public/speaker.jpg`.

Todo el contenido vive en `deck/app/utils/slides.ts`: cada slide es un objeto con `title`, `points`, `analogy`, `chat`, `quiz`, `widget` y `notes`. La interfaz solo lo renderiza.

Las cifras de infraestructura (39 Regiones, 124 AZs, 750+ puntos de presencia; Chile y Arabia Saudita anunciadas) se verificaron el **24 de octubre de 2026** en [aws.amazon.com/about-aws/global-infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/). Vuelve a revisarlas antes de cada evento y actualiza `INFRA_AS_OF`.

## Presentarlo

Versión publicada: **https://kevinlupera.github.io/aws-sbg-itb-ec/** — cada push a `main` la vuelve a desplegar con `.github/workflows/pages.yml`.

También se presenta desde tu máquina con `pnpm dev`, o con un build fijo: `pnpm generate && npx serve .output/public`.

## Contribuir

Commits con [Conventional Commits](https://www.conventionalcommits.org/). Gestor de paquetes: `pnpm`.

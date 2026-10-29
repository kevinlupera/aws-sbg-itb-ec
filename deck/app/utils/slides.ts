export type Widget = 'elasticity' | 'capex-opex' | 'az' | 'az-map' | 'map-region' | 'map-edge' | 'map-choose'

export interface Quiz {
  question: string
  options: string[]
  /** Index into `options`. */
  answer: number
  why: string
}

export interface Slide {
  block: string
  /** Planned minute range in the 60-minute session. */
  minute: string
  title: string
  points?: string[]
  /** The thread analogy: running your own food business. */
  analogy?: string
  /** Question the audience answers in the session chat. */
  chat?: string
  quiz?: Quiz
  widget?: Widget
  /** Renders the speaker card (photo + bio) from SPEAKER. */
  speaker?: boolean
  /** Shows the Linktree QR (deck/public/linktree-qr.svg). */
  qr?: boolean
  /** Shows the AWS Student Builder Group logo (deck/public/sbg-itb-logo.png). */
  logo?: boolean
  /** Speaker notes: expected answers and the bridge to the next slide. */
  notes: string
}

// Speaker card. Put the photo at deck/public/speaker.jpg (square works best); without it, initials show.
export const LINKTREE = 'https://linktr.ee/kevinlupera'

export const SPEAKER = {
  name: 'Kevin Lupera',
  role: 'Engineering Manager en Alegra',
  facts: [
    'AWS Community Builder',
    'AWS Certified x4',
    'Busca comunidades: me han dado personas increíbles, aprendizaje y oportunidades :)',
    'Compartir errores en charlas o posts',
  ],
  contact: 'LinkedIn · @kevinlupera',
  // Files live in deck/public/certs/.
  badges: [
    { file: 'cloud-practitioner.png', label: 'AWS Certified Cloud Practitioner' },
    { file: 'solutions-architect-associate.png', label: 'AWS Certified Solutions Architect – Associate' },
    { file: 'developer-associate.png', label: 'AWS Certified Developer – Associate' },
    { file: 'solutions-architect-professional.png', label: 'AWS Certified Solutions Architect – Professional' },
  ],
}

// Verified on aws.amazon.com/about-aws/global-infrastructure — update before each event.
export const INFRA_AS_OF = '24 de octubre de 2026'

export const SLIDES: Slide[] = [
  // ── Apertura (0–5) ──────────────────────────────────────────────
  {
    block: 'Apertura',
    minute: '0–1',
    title: 'La nube sin humo: fundamentos de AWS',
    logo: true,
    points: ['Qué es la nube, cuánto cuesta y dónde vive físicamente', 'Sin servicios todavía: primero los cimientos'],
    notes: 'Presentación personal en 30 segundos. Promesa: al final podrás explicarle la nube a tu familia con una analogía.',
  },
  {
    block: 'Apertura',
    minute: '1–2',
    title: 'Quién soy',
    speaker: true,
    notes: 'Presentación en 30 segundos: quién eres, por qué te importa la nube y qué se llevan hoy.',
  },
  {
    block: 'Apertura',
    minute: '2–4',
    title: 'Esta charla se juega en el chat',
    points: ['Cada ~8 minutos te hago una pregunta', 'Responde con una palabra, una letra o un emoji', 'Las dudas déjalas en el chat: las leemos al final'],
    chat: '¿Desde qué ciudad nos ves y qué estudias o a qué te dedicas?',
    notes: 'Lee 3 o 4 respuestas en voz alta con el nombre. Rompe el hielo y confirma que el chat funciona.',
  },
  {
    block: 'Apertura',
    minute: '4–5',
    title: 'El mapa de hoy',
    points: ['1 · ¿Qué es la nube y por qué importa?', '2 · ¿Cómo se paga? CapEx vs OpEx', '3 · ¿Dónde está? Regiones, Zonas de Disponibilidad y Edge Locations'],
    analogy: 'Todo el camino lo vamos a recorrer montando un negocio de comida.',
    notes: 'Presenta el hilo conductor: cada concepto tendrá su equivalente en el negocio de comida.',
  },

  // ── El problema (5–12) ──────────────────────────────────────────
  {
    block: 'El problema',
    minute: '5–9',
    title: 'Antes de vender un plato, construye la cocina',
    points: [
      'Comprar servidores y esperar semanas a que lleguen',
      'Espacio, electricidad, aire acondicionado, seguridad física',
      'Instalar, mantener, reparar… y renovar cada pocos años',
      'Todo eso antes de que llegue el primer usuario',
    ],
    analogy: 'On-premises = construir tu propia cocina industrial antes de saber si a alguien le gusta tu comida.',
    notes: 'Pregunta retórica: ¿cuánto tiempo pasa desde la idea hasta el primer cliente? Meses.',
  },
  {
    block: 'El problema',
    minute: '9–12',
    title: 'El dilema de adivinar',
    points: ['Compras de menos → el día importante tu app se cae', 'Compras de más → pagas máquinas que pasan apagadas', 'Casi nunca aciertas: la demanda real no avisa'],
    chat: '¿Alguna vez una web o app se cayó justo cuando más la necesitabas? ¿Cuál?',
    notes: 'Respuestas típicas: matrículas de la universidad, venta de entradas, bancos en quincena. Puente: «eso es adivinar capacidad y perder».',
  },

  // ── Cloud Computing (12–25) ─────────────────────────────────────
  {
    block: 'Cloud Computing',
    minute: '12–14',
    title: '¿Qué es Cloud Computing?',
    points: ['Recursos de TI bajo demanda', 'Entregados por internet', 'Pagas solo por lo que usas'],
    analogy: 'Como la luz eléctrica: no construyes una planta generadora, te conectas y pagas tu consumo.',
    notes: 'Definición de AWS: entrega bajo demanda de recursos de TI a través de internet con precios de pago por uso.',
  },
  {
    block: 'Cloud Computing',
    minute: '14–16',
    title: '¿Cuánto haces tú y cuánto hace el proveedor?',
    points: [
      'On-premises · cocinas todo: compras el local, el horno y los ingredientes',
      'IaaS · alquilas la cocina equipada y tú cocinas',
      'PaaS · te dan el horno listo y la masa; tú pones la receta',
      'SaaS · pides la pizza a domicilio y solo la disfrutas',
    ],
    notes: 'Una sola slide de modelos, sin nombres de servicios. La idea: a más abajo, menos cosas administras tú.',
  },
  {
    block: 'Cloud Computing',
    minute: '16–19',
    title: 'Elasticidad',
    points: ['Crecer cuando la demanda sube', 'Achicarse cuando baja', 'Automático y en minutos'],
    analogy: 'Contratas meseros extra solo el sábado del partido y el lunes vuelves a tu equipo normal.',
    widget: 'elasticity',
    notes: 'Demo: con capacidad fija sube el pico y muestra usuarios sin atender; baja la capacidad y muestra lo ocioso. Luego activa «Elástica».',
  },
  {
    block: 'Cloud Computing',
    minute: '19–20',
    title: 'Black Friday',
    quiz: {
      question: 'Tu tienda online triplica su tráfico solo el día del Black Friday. ¿Qué haces?',
      options: ['Comprar 3× servidores para todo el año', 'Escalar en la nube ese día y reducir al siguiente', 'Esperar y cruzar los dedos'],
      answer: 1,
      why: 'Pagas el pico solo el día del pico. Comprar 3× es pagar 364 días de máquinas ociosas.',
    },
    chat: 'Vota A, B o C en el chat',
    notes: 'Cuenta votos en voz alta y luego presiona R para revelar.',
  },
  {
    block: 'Cloud Computing',
    minute: '20–22',
    title: 'Agilidad',
    points: ['De la idea al experimento en minutos, no en meses', 'Si falla, lo apagas y no perdiste una inversión', 'Más experimentos = más aprendizaje'],
    analogy: 'Pruebas tu menú nuevo en un food truck alquilado mañana, no después de 6 meses de obra.',
    notes: 'Para estudiantes: puedes construir un proyecto de portafolio con infraestructura real desde tu laptop.',
  },
  {
    block: 'Cloud Computing',
    minute: '22–24',
    title: 'Alta disponibilidad',
    points: ['Diseñar para que el sistema siga funcionando aunque algo falle', 'Redundancia: no depender de un único punto', '«Todo falla, todo el tiempo» — Werner Vogels, CTO de Amazon'],
    analogy: 'Dos cocinas en barrios distintos: si a una se le va la luz, la otra sigue despachando pedidos.',
    notes: 'Deja la semilla: en el bloque de infraestructura veremos cómo AWS hace posible esto con las Zonas de Disponibilidad.',
  },
  {
    block: 'Cloud Computing',
    minute: '24–25',
    title: 'Las 6 ventajas de la nube según AWS',
    points: [
      'Cambiar gasto de capital por gasto variable',
      'Beneficiarte de economías de escala masivas',
      'Dejar de adivinar la capacidad',
      'Aumentar la velocidad y la agilidad',
      'Dejar de gastar en mantener centros de datos',
      'Volverte global en minutos',
    ],
    notes: 'Fuente: whitepaper «Overview of Amazon Web Services». Puente: la primera ventaja es dinero → siguiente bloque.',
  },

  // ── Economía (25–37) ────────────────────────────────────────────
  {
    block: 'Economía en la nube',
    minute: '25–28',
    title: 'CapEx · gasto de capital',
    points: ['Pago grande al inicio', 'Compras un activo que se deprecia con los años', 'Lo dimensionas para el pico: apuestas a la demanda futura'],
    analogy: 'Comprar el carro de reparto: pagas todo hoy, aunque lo uses dos horas al día.',
    notes: 'CapEx = Capital Expenditure. Ejemplo: comprar servidores para tu propio centro de datos.',
  },
  {
    block: 'Economía en la nube',
    minute: '28–30',
    title: 'OpEx · gasto operativo',
    points: ['Sin inversión inicial', 'Pagas por uso, como una factura mensual', 'Si dejas de usarlo, dejas de pagarlo'],
    analogy: 'Pedir taxi por viaje: pagas cada carrera y nada más.',
    notes: 'OpEx = Operational Expenditure. La nube convierte infraestructura en un gasto operativo variable.',
  },
  {
    block: 'Economía en la nube',
    minute: '30–31',
    title: '¿Carro o taxi?',
    chat: 'Para ir a la universidad o al trabajo: ¿comprar carro o pedir taxi por app? ¿Por qué?',
    notes: 'No hay respuesta única: depende de cuánto lo uses. Esa es exactamente la lección de CapEx vs OpEx → vamos a los números.',
  },
  {
    block: 'Economía en la nube',
    minute: '31–35',
    title: 'Hagamos números',
    widget: 'capex-opex',
    notes: 'Cifras ilustrativas, no precios reales. Muestra: con uso bajo OpEx gana claro; sube uso al 100 % y plazo a 60 meses para ver que CapEx puede competir.',
  },
  {
    block: 'Economía en la nube',
    minute: '35–37',
    title: 'Lo que nadie te dice',
    points: [
      'Economías de escala: AWS compra a una escala que ninguna empresa alcanza sola',
      'Pagar por uso solo ahorra si apagas lo que no usas',
      'Cargas constantes 24/7 tienen modelos de compromiso con descuento',
      'La nube no es «más barata» por arte de magia: es más flexible',
    ],
    notes: 'Mensaje honesto: el ahorro viene de la elasticidad y la disciplina, no de mudarse sin pensar.',
  },

  // ── Infraestructura Global (37–50) ──────────────────────────────
  {
    block: 'Infraestructura Global',
    minute: '37–39',
    title: '¿Dónde vive la nube?',
    points: ['39 Regiones', '124 Zonas de Disponibilidad', '750+ puntos de presencia (Edge)', 'Anunciadas: Chile y Arabia Saudita'],
    analogy: 'La nube no es una nube: son edificios reales, con servidores reales, en ciudades reales.',
    notes: `Datos al ${INFRA_AS_OF}, aws.amazon.com/about-aws/global-infrastructure. Verifica antes del evento.`,
  },
  {
    block: 'Infraestructura Global',
    minute: '39–41',
    title: 'Región',
    points: ['Un área geográfica del mundo', 'Contiene varias Zonas de Disponibilidad aisladas entre sí', 'Tus datos se quedan en la Región que tú elijas'],
    analogy: 'Una ciudad donde decides abrir tu negocio: São Paulo, Virginia, Ciudad de México…',
    widget: 'map-region',
    notes: 'Ejemplos de código: sa-east-1 (São Paulo), us-east-1 (Virginia del Norte), mx-central-1 (México).',
  },
  {
    block: 'Infraestructura Global',
    minute: '41–43',
    title: 'Zona de Disponibilidad (AZ)',
    points: [
      'Uno o más centros de datos con energía, red y conectividad redundantes',
      'Separadas por kilómetros, pero a menos de 100 km entre sí',
      'Unidas por red privada de baja latencia',
      'Si falla una, las otras siguen',
    ],
    analogy: 'Varias cocinas separadas dentro de la misma ciudad, cada una con su luz y su agua, unidas por una vía rápida privada.',
    widget: 'az',
    notes: 'Demo: con «Una sola AZ» apaga la AZ donde vive la app → caída. Cambia a «Varias AZ» y apaga una → la app sigue. Esa es la alta disponibilidad.',
  },
  {
    block: 'Infraestructura Global',
    minute: '43–45',
    title: 'Las AZ dentro de una Región',
    points: [
      'Cada grupo de cuadros es una AZ: uno o más centros de datos',
      'Separadas por kilómetros: una inundación o un corte no las afecta a todas',
      'Unidas por fibra privada: tu app puede vivir en varias a la vez',
    ],
    analogy: 'En la ciudad (Región), cada cocina (AZ) tiene su propio medidor de luz y de agua.',
    widget: 'az-map',
    notes: 'Cambia de Región con los botones y toca cada AZ. Aclara que es un esquema: AWS no publica dónde están sus centros de datos. Puente: el último concepto es Edge Locations.',
  },
  {
    block: 'Infraestructura Global',
    minute: '45–47',
    title: 'Edge Locations',
    points: ['Puntos muy cerca de los usuarios finales', 'Guardan copias del contenido (caché)', 'Menos distancia = respuestas más rápidas'],
    analogy: 'Lockers de retiro cerca de tu casa: el pedido ya está ahí y lo recoges en minutos.',
    widget: 'map-edge',
    notes: 'Hay muchas más Edge Locations que Regiones: por eso llegan a ciudades donde no hay una Región.',
  },
  {
    block: 'Infraestructura Global',
    minute: '47–50',
    title: '¿Cómo elegir una Región?',
    points: ['Cumplimiento: ¿qué leyes aplican a tus datos?', 'Cercanía: ¿dónde están tus usuarios?', 'Servicios: ¿está disponible lo que necesitas?', 'Precio: varía entre Regiones'],
    chat: 'Si tu app es para usuarios en Ecuador, ¿qué Región elegirías y por qué?',
    widget: 'map-choose',
    notes: 'No hay Región en Ecuador. Candidatas: São Paulo (cercanía en Sudamérica), Virginia del Norte (más servicios), México. Chile está anunciada. Lo correcto: medir la latencia real desde tus usuarios.',
  },

  // ── Recap (50–55) ───────────────────────────────────────────────
  {
    block: 'Recap',
    minute: '50–51',
    title: '3 ideas para llevarte',
    points: [
      'La nube es TI bajo demanda, como la luz: te conectas y pagas lo que usas',
      'Cambias CapEx por OpEx: no apuestas a la demanda, la sigues',
      'Región → Zonas de Disponibilidad → Edge: de lo global a lo cercano',
    ],
    notes: 'Repite las analogías: luz, carro vs taxi, ciudad → cocinas → lockers.',
  },
  {
    block: 'Recap',
    minute: '51–52',
    title: 'Quiz relámpago 1/3',
    quiz: {
      question: '¿Qué es una Zona de Disponibilidad?',
      options: ['Un país donde AWS vende servicios', 'Uno o más centros de datos aislados dentro de una Región', 'Una copia de tu app en tu laptop'],
      answer: 1,
      why: 'Cada AZ tiene energía y red propias; varias AZs forman una Región.',
    },
    chat: 'Vota A, B o C',
    notes: 'R para revelar.',
  },
  {
    block: 'Recap',
    minute: '52–53',
    title: 'Quiz relámpago 2/3',
    quiz: {
      question: 'Comprar 10 servidores para tu propio centro de datos es…',
      options: ['CapEx', 'OpEx', 'Elasticidad'],
      answer: 0,
      why: 'Pago grande inicial por un activo que se deprecia: gasto de capital.',
    },
    chat: 'Vota A, B o C',
    notes: 'R para revelar.',
  },
  {
    block: 'Recap',
    minute: '53–54',
    title: 'Quiz relámpago 3/3',
    quiz: {
      question: 'Tu web carga lento para usuarios en otro continente. ¿Qué ayuda más?',
      options: ['Agregar más Zonas de Disponibilidad', 'Servir el contenido desde Edge Locations', 'Comprar un servidor más grande'],
      answer: 1,
      why: 'Las Edge Locations acercan el contenido al usuario; las AZs dan disponibilidad, no cercanía.',
    },
    chat: 'Vota A, B o C',
    notes: 'R para revelar. Felicita a quienes acertaron las tres.',
  },
  {
    block: 'Recap',
    minute: '54–55',
    title: 'Tus siguientes pasos',
    points: [
      'AWS Skill Builder: cursos gratuitos para empezar',
      'Certificación AWS Certified Cloud Practitioner',
      'Capa gratuita de AWS: revisa las condiciones vigentes en aws.amazon.com/free',
      'Únete a tu AWS User Group local',
    ],
    notes: 'Comparte los enlaces en el chat mientras hablas.',
  },

  // ── Q&A (55–60) ─────────────────────────────────────────────────
  {
    block: 'Preguntas',
    minute: '55–60',
    title: '¿Preguntas?',
    qr: true,
    chat: 'Escribe tu pregunta en el chat',
    notes: 'Lee las preguntas acumuladas en orden. Si no alcanza el tiempo, ofrece responder por LinkedIn.',
  },
]

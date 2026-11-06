import { 
  Service, 
  User, 
  Appointment, 
  Bono, 
  GiftCard, 
  Referral, 
  LoyaltyReward, 
  Campaign, 
  AutomationRule, 
  BusinessConfig,
  CommercialClientNote,
  HealthAssessmentRecord 
} from '@/types';

export const initialBusinessConfig: BusinessConfig = {
  name: "M&H BIENESTAR",
  legalName: "Centro Parasanitario M&H",
  address: "Calle San José, 2",
  city: "Orcera",
  postalCode: "23370",
  province: "Jaén",
  phone: "651 30 87 38",
  whatsapp: "34651308738",
  email: "info@quirosteopatiamh.es",
  openingHours: {
    weekdays: "09:30 - 13:30 | 16:30 - 20:30",
    saturdays: "09:30 - 13:30 (Citas concertadas)",
    sundays: "Cerrado",
  },
  cancellationNoticeHours: 24,
  referralRewardPointsReferrer: 150, // Equivale a 15€ de descuento
  referralRewardPointsReferee: 100,  // Equivale a 10€ de descuento de bienvenida
};

export const initialServices: Service[] = [
  {
    id: "srv-reeducacion",
    name: "Reeducación Corporal",
    slug: "reeducacion-corporal",
    category: "manual",
    shortDescription: "Evaluación postural y técnicas manuales para recuperar la alineación, movilidad y aliviar sobrecargas musculares.",
    fullDescription: "La reeducación corporal en M&H Bienestar combina técnicas manuales profundas y suaves de liberación miofascial y equilibrio biomecánico. Diseñado para personas con hábitos posturales exigentes, sobreesfuerzos laborales o rigidez acumulada, buscando una armonía física duradera.",
    scopeAndBenefits: [
      "Alivio de tensiones y sobrecargas musculares crónicas",
      "Mejora sustancial del rango de movimiento y flexibilidad",
      "Conciencia postural en el día a día y en el trabajo",
      "Sensación inmediata de ligereza y descompresión"
    ],
    durationMinutes: 60,
    price: 45,
    available: true,
    professionalName: "Especialista M&H",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    badge: "Más Solicitado",
    featured: true,
    faqs: [
      {
        question: "¿Es una técnica dolorosa?",
        answer: "En absoluto. Trabajamos siempre dentro del umbral de confort del cliente, adaptando la presión al estado de sus tejidos."
      },
      {
        question: "¿Cuántas sesiones suelen ser recomendables?",
        answer: "Muchos clientes sienten gran alivio desde la primera sesión; para consolidar pautas posturales se suele recomendar un ciclo de 3 a 5 sesiones."
      }
    ]
  },
  {
    id: "srv-craneosacral",
    name: "Técnica Craneosacral Suave",
    slug: "tecnica-craneosacral-suave",
    category: "craneal",
    shortDescription: "Toque sutil y profundo que armoniza el ritmo craneosacral, calmando el sistema nervioso y reduciendo el estrés.",
    fullDescription: "Una de las terapias manuales más refinadas y relajantes. A través de un contacto manual extraordinariamente suave sobre el cráneo, la columna y el sacro, facilitamos la liberación de tensiones meníngeas y la autorregulación natural del organismo.",
    scopeAndBenefits: [
      "Profunda relajación del sistema nervioso central",
      "Alivio del estrés, insomnio y estados de hiperalerta",
      "Alivio en molestias cefálicas tensionales y mandíbula (bruxismo)",
      "Recuperación de la serenidad mental y claridad"
    ],
    durationMinutes: 50,
    price: 45,
    available: true,
    professionalName: "Especialista M&H",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    badge: "Bienestar Nervioso",
    featured: true,
    faqs: [
      {
        question: "¿Qué se siente durante la sesión?",
        answer: "Una calma muy profunda. La mayoría de clientes entran en un estado de duermevela o meditación espontánea mientras las tensiones se disuelven."
      }
    ]
  },
  {
    id: "srv-visceral",
    name: "Bienestar Visceral",
    slug: "bienestar-visceral",
    category: "visceral",
    shortDescription: "Terapia manual suave en la zona abdominal y diafragmática para favorecer la movilidad orgánica y la distensión.",
    fullDescription: "Las tensiones emocionales y las malas posturas a menudo se somatizan en el diafragma y la cavidad abdominal. Mediante manipulaciones suaves y respetuosas, ayudamos a liberar adherencias funcionales, mejorando la respiración y la digestión relajada.",
    scopeAndBenefits: [
      "Descompresión del diafragma y mejora de la capacidad respiratoria",
      "Alivio de la pesadez y distensión abdominal funcional",
      "Armonización de reflejos somatoviscerales que causan dolor lumbar",
      "Gran ligereza en la zona media del cuerpo"
    ],
    durationMinutes: 50,
    price: 45,
    available: true,
    professionalName: "Especialista M&H",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    badge: "Equilibrio Interno",
    featured: true,
    faqs: [
      {
        question: "¿Se realiza sobre ropa?",
        answer: "Se puede trabajar con ropa cómoda de algodón o directamente sobre la zona con maniobras muy sutiles."
      }
    ]
  },
  {
    id: "srv-nutricion",
    name: "Asesoramiento Nutricional y Hábitos",
    slug: "nutricion",
    category: "salud",
    shortDescription: "Pautas de alimentación consciente, equilibrio inflamatorio y energía vital para tu rutina diaria.",
    fullDescription: "Orientación nutricional parasanitaria y educativa enfocada a potenciar tu vitalidad natural, mejorar el descanso y optimizar la digestión mediante alimentos limpios y hábitos sostenibles.",
    scopeAndBenefits: [
      "Plan adaptado a tu estilo de vida en Orcera y comarca",
      "Pautas antiinflamatorias para el cuidado osteoarticular",
      "Energía sostenida sin picos de cansancio"
    ],
    durationMinutes: 45,
    price: 40,
    available: false,
    statusNote: "Sujeto a disponibilidad — Próxima apertura de agenda. Consúltanos para lista de espera prioritaria.",
    professionalName: "Equipo Nutrición M&H",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    badge: "Próximamente",
    featured: false,
    faqs: [
      {
        question: "¿Cuándo estará disponible?",
        answer: "Estamos organizando los grupos y fechas. Puedes apuntarte a la lista de espera para recibir la primera cita con condición especial."
      }
    ]
  },
  {
    id: "srv-pilates",
    name: "Pilates Suave y Conciencia Corporal",
    slug: "pilates",
    category: "movilidad",
    shortDescription: "Sesiones individuales o en grupos muy reducidos enfocadas en el fortalecimiento del core y la higiene postural.",
    fullDescription: "Movimiento controlado, respiración sincronizada y elongación axial para mantener los beneficios de las terapias manuales a lo largo del tiempo.",
    scopeAndBenefits: [
      "Fortalecimiento suave de la faja abdominal y suelo pélvico",
      "Prevención de recidivas en molestias de espalda",
      "Mayor agilidad y elegancia motriz en la vida cotidiana"
    ],
    durationMinutes: 55,
    price: 35,
    available: false,
    statusNote: "Sujeto a disponibilidad y cupo de grupo reducido — Consulta disponibilidad actual en recepción.",
    professionalName: "Instructor Certificado M&H",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    badge: "Grupos Reducidos",
    featured: false,
    faqs: [
      {
        question: "¿Se requieren conocimientos previos?",
        answer: "Para nada. El método se adapta a la condición individual de cada persona."
      }
    ]
  },
  {
    id: "srv-mindfulness",
    name: "Mindfulness y Respiración Consciente",
    slug: "mindfulness",
    category: "salud",
    shortDescription: "Técnicas de regulación atencional y reducción del estrés mediante la respiración guiada.",
    fullDescription: "Aprende herramientas prácticas de meditación y presencia corporal para desactivar la sobrecarga mental y mejorar la calidad del sueño.",
    scopeAndBenefits: [
      "Reducción inmediata de la ansiedad cotidiana",
      "Mejora del descanso nocturno y claridad mental",
      "Herramientas autónomas aplicables en cualquier momento"
    ],
    durationMinutes: 45,
    price: 35,
    available: false,
    statusNote: "Sujeto a disponibilidad según talleres programados — Consulta próximas convocatorias.",
    professionalName: "Facilitador M&H",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    badge: "Talleres Especiales",
    featured: false,
    faqs: [
      {
        question: "¿Son sesiones individuales o grupales?",
        answer: "Ofrecemos ambas modalidades según la temporada y la demanda de nuestros usuarios."
      }
    ]
  }
];

export const initialUsers: User[] = [
  {
    id: "usr-admin-1",
    name: "Dirección M&H",
    email: "admin@mh-bienestar.es",
    phone: "651308738",
    role: "admin",
    createdAt: "2025-01-10T10:00:00Z",
    referralCode: "MH-DIREC",
    loyaltyPoints: 1200
  },
  {
    id: "usr-client-1",
    name: "María García Gómez",
    email: "maria.garcia@email.com",
    phone: "644112233",
    role: "client",
    createdAt: "2025-03-15T11:20:00Z",
    referralCode: "MH-MARIA-82",
    referredBy: "MH-DIREC",
    loyaltyPoints: 340,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usr-client-2",
    name: "Carlos Ruiz Segura",
    email: "carlos.ruiz@email.com",
    phone: "677998877",
    role: "client",
    createdAt: "2025-05-20T16:30:00Z",
    referralCode: "MH-CARLOS-14",
    loyaltyPoints: 180,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usr-client-3",
    name: "Elena Sánchez Castillo",
    email: "elena.sanchez@email.com",
    phone: "622554433",
    role: "client",
    createdAt: "2025-07-02T09:40:00Z",
    referralCode: "MH-ELENA-99",
    loyaltyPoints: 90
  },
  {
    id: "usr-client-4",
    name: "Antonio Romero Morales",
    email: "antonio.romero@email.com",
    phone: "688223344",
    role: "client",
    createdAt: "2024-11-12T14:10:00Z",
    referralCode: "MH-ANTONIO-55",
    loyaltyPoints: 20
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-101",
    clientId: "usr-client-1",
    clientName: "María García Gómez",
    clientEmail: "maria.garcia@email.com",
    clientPhone: "644112233",
    serviceId: "srv-reeducacion",
    serviceName: "Reeducación Corporal",
    date: "2026-11-06",
    timeSlot: "11:00",
    durationMinutes: 60,
    price: 45,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "bizum",
    notes: "Sesión de mantenimiento postural mensual.",
    isFirstVisit: false,
    createdAt: "2026-11-01T10:15:00Z",
    reminderSent: true
  },
  {
    id: "apt-102",
    clientId: "usr-client-2",
    clientName: "Carlos Ruiz Segura",
    clientEmail: "carlos.ruiz@email.com",
    clientPhone: "677998877",
    serviceId: "srv-craneosacral",
    serviceName: "Técnica Craneosacral Suave",
    date: "2026-11-06",
    timeSlot: "17:00",
    durationMinutes: 50,
    price: 45,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "tarjeta",
    notes: "Tensión acumulada en cuello y bruxismo.",
    isFirstVisit: false,
    createdAt: "2026-11-02T12:00:00Z",
    reminderSent: true
  },
  {
    id: "apt-103",
    clientId: "usr-client-3",
    clientName: "Elena Sánchez Castillo",
    clientEmail: "elena.sanchez@email.com",
    clientPhone: "622554433",
    serviceId: "srv-visceral",
    serviceName: "Bienestar Visceral",
    date: "2026-11-07",
    timeSlot: "10:30",
    durationMinutes: 50,
    price: 45,
    status: "confirmed",
    paymentStatus: "unpaid",
    notes: "Primera sesión recomendada por María García.",
    isFirstVisit: true,
    createdAt: "2026-11-04T09:30:00Z",
    reminderSent: false
  },
  {
    id: "apt-104",
    clientId: "usr-client-1",
    clientName: "María García Gómez",
    clientEmail: "maria.garcia@email.com",
    clientPhone: "644112233",
    serviceId: "srv-reeducacion",
    serviceName: "Reeducación Corporal",
    date: "2026-10-15",
    timeSlot: "16:30",
    durationMinutes: 60,
    price: 45,
    status: "completed",
    paymentStatus: "bono",
    paymentMethod: "bono",
    notes: "Trabajo en cadena posterior.",
    isFirstVisit: false,
    createdAt: "2026-10-10T14:00:00Z",
    postReviewRequested: true
  },
  {
    id: "apt-105",
    clientId: "usr-client-4",
    clientName: "Antonio Romero Morales",
    clientEmail: "antonio.romero@email.com",
    clientPhone: "688223344",
    serviceId: "srv-reeducacion",
    serviceName: "Reeducación Corporal",
    date: "2025-08-10",
    timeSlot: "18:00",
    durationMinutes: 60,
    price: 45,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "efectivo",
    notes: "Cliente inactivo desde hace más de 6 meses.",
    isFirstVisit: false,
    createdAt: "2025-08-01T11:00:00Z"
  }
];

export const initialBonos: Bono[] = [
  {
    id: "bno-201",
    clientId: "usr-client-1",
    clientName: "María García Gómez",
    serviceId: "srv-reeducacion",
    serviceName: "Reeducación Corporal (Bono 5)",
    totalSessions: 5,
    remainingSessions: 3,
    pricePaid: 200, // Descuento de 25€ sobre sesiones sueltas
    purchaseDate: "2026-09-15",
    expiresAt: "2027-03-15",
    status: "active"
  },
  {
    id: "bno-202",
    clientId: "usr-client-2",
    clientName: "Carlos Ruiz Segura",
    serviceId: "srv-craneosacral",
    serviceName: "Técnica Craneosacral (Bono 3)",
    totalSessions: 3,
    remainingSessions: 1,
    pricePaid: 125,
    purchaseDate: "2026-08-01",
    expiresAt: "2027-02-01",
    status: "active"
  }
];

export const initialGiftCards: GiftCard[] = [
  {
    id: "gc-301",
    code: "REGALO-MH-2026-789",
    amount: 90,
    balance: 90,
    senderName: "Lucía Fernández",
    senderEmail: "lucia@email.com",
    recipientName: "Beatriz Moreno",
    recipientEmail: "beatriz.moreno@email.com",
    message: "¡Para que te des un respiro y disfrutes del bienestar que te mereces! Un abrazo enorme.",
    issuedAt: "2026-10-20T10:00:00Z",
    expiresAt: "2027-10-20T23:59:59Z",
    isRedeemed: false
  }
];

export const initialReferrals: Referral[] = [
  {
    id: "ref-401",
    referrerClientId: "usr-client-1",
    referrerName: "María García Gómez",
    referredEmail: "elena.sanchez@email.com",
    referredName: "Elena Sánchez Castillo",
    codeUsed: "MH-MARIA-82",
    status: "registered",
    rewardApplied: false,
    rewardPointsEarned: 150,
    createdAt: "2026-11-04T09:20:00Z"
  }
];

export const initialLoyaltyRewards: LoyaltyReward[] = [
  {
    id: "rew-1",
    title: "10€ de Descuento Directo",
    description: "Descuento aplicable en tu próxima sesión individual en el centro.",
    pointsRequired: 100,
    discountValue: 10,
    type: "euro_discount",
    active: true
  },
  {
    id: "rew-2",
    title: "20€ de Descuento Especial",
    description: "Descuento acumulable en cualquier sesión o adquisición de bono.",
    pointsRequired: 180,
    discountValue: 20,
    type: "euro_discount",
    active: true
  },
  {
    id: "rew-3",
    title: "Sesión Completa Gratuita",
    description: "Una sesión de 50-60 min a tu elección para premiar tu confianza incondicional.",
    pointsRequired: 350,
    discountValue: 45,
    type: "free_session",
    active: true
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: "cmp-1",
    title: "Bienvenida M&H Orcera",
    code: "BIENVENIDA10",
    discountPercent: 10,
    discountAmount: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    targetAudience: "nuevos",
    active: true,
    usedCount: 28,
    maxUses: 100,
    description: "10% de descuento en la primera cita para nuevos clientes de la Sierra de Segura."
  },
  {
    id: "cmp-2",
    title: "Reactivación y Cuidado de Otoño",
    code: "OTONO26",
    discountAmount: 10,
    startDate: "2026-10-01",
    endDate: "2026-11-30",
    targetAudience: "inactivos",
    active: true,
    usedCount: 7,
    maxUses: 50,
    description: "10€ de descuento para clientes que no nos visitan desde hace más de 60 días."
  }
];

export const initialAutomationRules: AutomationRule[] = [
  {
    id: "aut-1",
    name: "Confirmación Inmediata de Reserva (WhatsApp + Email)",
    triggerType: "booking_confirmed",
    channel: "whatsapp",
    messageTemplate: "¡Hola {{nombre}}! Tu cita para {{servicio}} en M&H Bienestar (Orcera) ha sido confirmada para el {{fecha}} a las {{hora}}. Ubicación: C/ San José, 2. Si necesitas modificarla con 24h de antelación, pulsa en tu enlace: {{link}}. ¡Te esperamos!",
    active: true,
    executionCount: 142
  },
  {
    id: "aut-2",
    name: "Recordatorio Preventivo 24 Horas Antes",
    triggerType: "reminder_24h",
    channel: "whatsapp",
    messageTemplate: "Hola {{nombre}}, te recordamos tu cita de mañana {{fecha}} a las {{hora}} para {{servicio}} en M&H Bienestar Orcera. Recuerda traer ropa cómoda. Tel: 651 30 87 38.",
    active: true,
    executionCount: 129
  },
  {
    id: "aut-3",
    name: "Agradecimiento y Solicitud Ética de Reseña en Google",
    triggerType: "post_session",
    channel: "whatsapp",
    messageTemplate: "Esperamos que la sesión de hoy en M&H te haya aportado alivio y bienestar {{nombre}}. Si deseas compartir tu experiencia honesta para ayudar a otros vecinos de Orcera y la Sierra de Segura, nos encantaría leerte aquí: https://quirosteopatiamh.es/resenas. ¡Gracias!",
    active: true,
    executionCount: 95
  },
  {
    id: "aut-4",
    name: "Reactivación de Clientes Inactivos (60 días)",
    triggerType: "inactive_60d",
    channel: "email",
    messageTemplate: "Hola {{nombre}}, hace dos meses que cuidamos de tu bienestar en Orcera. ¿Cómo siente tu espalda y tu descanso? Tienes a tu disposición el cupón OTONO26 con 10€ de descuento si deseas una sesión de mantenimiento.",
    active: true,
    executionCount: 38
  },
  {
    id: "aut-5",
    name: "Alerta de Bono Próximo a Caducar o Última Sesión",
    triggerType: "bono_expiring",
    channel: "whatsapp",
    messageTemplate: "Aviso M&H Bienestar: Hola {{nombre}}, te queda {{sesiones_restantes}} sesión de tu bono. Recuerda agendarla antes de su fecha límite ({{fecha_caducidad}}) desde tu portal cliente.",
    active: true,
    executionCount: 19
  }
];

export const initialCommercialNotes: CommercialClientNote[] = [
  {
    id: "cn-1",
    clientId: "usr-client-1",
    date: "2026-10-15",
    author: "Recepción",
    content: "Prefiere citas siempre a partir de las 17:00 h por su horario laboral. Muy satisfecha con la atención recibida."
  },
  {
    id: "cn-2",
    clientId: "usr-client-2",
    date: "2026-08-01",
    author: "Recepción",
    content: "Suele pagar con tarjeta o Bizum. Viene desde Beas de Segura."
  }
];

export const initialHealthRecords: HealthAssessmentRecord[] = [
  {
    id: "hr-1",
    clientId: "usr-client-1",
    clientName: "María García Gómez",
    encryptedParasanitaryNotes: "[ENCRIPTADO / SEGURO]: Tensión paravertebral lumbar secundaria a sedestación prolongada. Sin patología radicular comunicada.",
    mobilityConcerns: "Rigidez matutina en región lumbar baja y trapecios.",
    posturalHabits: "Trabajo administrativo frente a ordenador 7 horas diarias.",
    contraindications: "Ninguna conocida. No refiere prótesis ni cirugías recientes.",
    rgpdConsentSigned: true,
    consentSignedDate: "2025-03-15T11:25:00Z",
    updatedAt: "2026-10-15T16:45:00Z",
    accessAuditedBy: "admin@mh-bienestar.es"
  }
];

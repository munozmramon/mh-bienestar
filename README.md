# M&H BIENESTAR — Plataforma Digital Integral (PWA)

Plataforma digital profesional y Progressive Web App (PWA) diseñada para el **Centro Parasanitario M&H**, ubicado en Orcera (Jaén).

- **Web Oficial de Referencia:** https://quirosteopatiamh.es/
- **Ubicación:** Calle San José, 2, 23370 Orcera (Jaén)
- **Teléfono & WhatsApp:** 651 30 87 38
- **Email:** info@quirosteopatiamh.es
- **Marca Comercial:** M&H BIENESTAR

---

## 🌟 Características Principales

### 1. Identidad Visual Premium & Mobile-First
- Paleta natural inspirada en el bienestar y la Sierra de Segura: **Verde bosque** (`#233D2D`), **Verde salvia** (`#8A9A86`), **Beige cálido** (`#FAF8F5`), **Blanco roto** y **Detalles dorados discretos** (`#C5A880`).
- Tipografía editorial elegante (*Cormorant Garamond / Playfair Display*) combinada con *Inter* para máxima legibilidad.
- PWA instalable en iOS y Android con icono propio, navegación nativa y soporte offline via Service Worker (`public/sw.js`).

### 2. Catálogo de Servicios & Terapias Manuales
- **Reeducación corporal** (60 min · 45€ · Más solicitado)
- **Técnica craneosacral suave** (50 min · 45€)
- **Bienestar visceral** (50 min · 45€)
- **Nutrición, Pilates y Mindfulness** (etiquetados con *Sujeto a disponibilidad y confirmación de grupo* y lista de espera).
- Fichas individuales con alcance, beneficios, FAQs y botón de reserva directa.
- CRUD completo desde el panel administrativo para añadir y modificar servicios sin tocar código.

### 3. Agenda Inteligente & Sistema de Reservas
- Calendario en tiempo real con comprobación instantánea de disponibilidad.
- Bloqueo automático de horarios ocupados para evitar reservas duplicadas.
- Aplicación de cupones de descuento (ej. `BIENVENIDA10`, `OTONO26`) y códigos de referidos.
- Generación de resumen de cita con enlace directo a WhatsApp Business para recordatorio.
- Cancelación y reprogramación sujeta a la política de 24 horas del centro.

### 4. Portal del Cliente ("Mi Cuenta")
- Resumen de perfil y tarjeta virtual de fidelidad.
- Próximas citas agendadas con opciones de cancelación o cambio de fecha.
- Control de **Bonos Multisesión** (contador visual de sesiones restantes y fecha de caducidad).
- **Programa Viral de Referidos:**
  - Código único personal por cliente (ej. `MH-MARIA-82`).
  - Generador dinámico de **Código QR** para mostrar en persona.
  - Botón directo para compartir por **WhatsApp** con texto preconfigurado.
  - 100 puntos (10€) para el invitado + 150 puntos (15€) para el recomendador al completar la primera sesión.
  - Catálogo de premios de fidelización canjeables con 1 clic.
- **Centro de Privacidad RGPD:**
  - Descarga de datos personales en formato JSON (Portabilidad).
  - Ejercicio del derecho al olvido / supresión definitiva de cuenta.

### 5. Panel Administrativo Completo (CRM & Gestión)
- **Dashboard en tiempo real:** Citas de hoy, citas pendientes, ingresos del mes, servicios más demandados y control de clientes inactivos (>60 días).
- **CRM de Clientes:** Búsqueda, filtros, historial comercial, notas de recepción (sin datos de salud).
- **Módulo Aislado de Salud (RGPD Especial):**
  - Registro de valoración parasanitaria, movilidad, hábitos y notas del terapeuta.
  - Separado de las notas comerciales y protegido con trazabilidad de auditoría.
- **Agenda de Mostrador:** Alta rápida de citas desde recepción para clientes telefónicos o presenciales.
- **Gestión Económica:** Registro de cobros (Efectivo, Tarjeta, Bizum, Bono) y exportación a informe CSV.
- **Centro de Marketing & Redes Sociales:**
  - Creación de campañas y cupones temporales.
  - Plantillas de contenido para Instagram y Facebook con textos y hashtags oficiales de M&H.
- **Motor de Automatizaciones:** Disparadores configurables para confirmación, recordatorio 24h, solicitud de reseña ética en Google y felicitaciones.

---

## 🔐 Credenciales de Demostración

El selector de perfiles integrado en la barra de navegación permite alternar entre perfiles con 1 clic:

| Rol | Nombre | Email | Notas |
|---|---|---|---|
| **Administrador** | Dirección M&H | `admin@mh-bienestar.es` | Acceso completo al Panel de Control y CRM |
| **Cliente Habitual** | María García Gómez | `maria.garcia@email.com` | Tiene citas, 1 bono activo y 340 puntos |
| **Cliente** | Carlos Ruiz Segura | `carlos.ruiz@email.com` | Cliente con cita programada y bono 3 sesiones |

---

## 🗄️ Base de Datos & Seguridad (Supabase + RLS)

El archivo `supabase-schema.sql` contiene la definición completa de:
- Tablas: `profiles`, `services`, `appointments`, `bonos`, `gift_cards`, `referrals`, `loyalty_rewards`, `campaigns`, `automation_rules`, `client_commercial_notes`, `health_assessment_records`, `audit_logs`.
- Políticas de Row Level Security (RLS) para proteger los datos de clientes y blindar el acceso a los datos de valoración física.
- Fallback local resiliente en `src/lib/store/useStore.tsx` para operar de manera autónoma y sincronizar con Supabase cuando se configuren las variables de entorno:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=tu-url-supabase
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
  ```

---

## 🚀 Comandos de Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

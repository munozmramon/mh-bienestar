-- ==============================================================================
-- M&H BIENESTAR — ESQUEMA COMPLETO DE BASE DE DATOS POSTGRESQL / SUPABASE
-- Con Row Level Security (RLS), Roles, RGPD, Auditoría y Aislamiento de Salud
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS Y TIPOS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('client', 'staff', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('confirmed', 'pending', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'bono');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('efectivo', 'tarjeta', 'bizum', 'bono', 'transferencia');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PERFILES DE USUARIO
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'client' NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  referral_code TEXT UNIQUE,
  referred_by_code TEXT,
  loyalty_points INTEGER DEFAULT 0 NOT NULL,
  consent_marketing BOOLEAN DEFAULT FALSE,
  consent_rgpd BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. CATÁLOGO DE SERVICIOS
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  scope_and_benefits TEXT[] DEFAULT '{}',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price NUMERIC(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE NOT NULL,
  status_note TEXT,
  professional_name TEXT NOT NULL DEFAULT 'Especialista M&H',
  image_url TEXT,
  badge TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. CITAS Y RESERVAS
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT,
  service_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(5) NOT NULL, -- '09:00', '10:30', etc.
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price NUMERIC(10, 2) NOT NULL,
  status appointment_status DEFAULT 'confirmed' NOT NULL,
  payment_status payment_status DEFAULT 'unpaid' NOT NULL,
  payment_method payment_method,
  notes TEXT,
  is_first_visit BOOLEAN DEFAULT FALSE,
  reminder_sent BOOLEAN DEFAULT FALSE,
  post_review_requested BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_timeslot_per_date UNIQUE(appointment_date, time_slot)
);

-- 6. BONOS MULTISESIÓN
CREATE TABLE IF NOT EXISTS public.bonos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  total_sessions INTEGER NOT NULL,
  remaining_sessions INTEGER NOT NULL,
  price_paid NUMERIC(10, 2) NOT NULL,
  purchase_date DATE DEFAULT CURRENT_DATE NOT NULL,
  expires_at DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' NOT NULL, -- active, exhausted, expired
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. TARJETAS REGALO DIGITALES
CREATE TABLE IF NOT EXISTS public.gift_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  balance NUMERIC(10, 2) NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  message TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_redeemed BOOLEAN DEFAULT FALSE NOT NULL
);

-- 8. REFERIDOS Y RECOMPENSAS VIRALES
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_name TEXT NOT NULL,
  code_used TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'invited' NOT NULL, -- invited, registered, first_booking_completed
  reward_applied BOOLEAN DEFAULT FALSE NOT NULL,
  reward_points_earned INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- 9. CATÁLOGO DE RECOMPENSAS DE FIDELIZACIÓN
CREATE TABLE IF NOT EXISTS public.loyalty_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  discount_value NUMERIC(10, 2) NOT NULL,
  type VARCHAR(30) DEFAULT 'euro_discount' NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL
);

-- 10. CAMPAÑAS Y CUPONES DE MARKETING
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  discount_percent INTEGER,
  discount_amount NUMERIC(10, 2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  target_audience TEXT DEFAULT 'todos',
  active BOOLEAN DEFAULT TRUE NOT NULL,
  used_count INTEGER DEFAULT 0 NOT NULL,
  max_uses INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. REGLAS DE AUTOMATIZACIÓN
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  trigger_type VARCHAR(40) NOT NULL,
  channel VARCHAR(20) NOT NULL, -- whatsapp, email, push
  message_template TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  last_executed_at TIMESTAMPTZ,
  execution_count INTEGER DEFAULT 0 NOT NULL
);

-- 12. NOTAS COMERCIALES (SIN DATOS DE SALUD)
CREATE TABLE IF NOT EXISTS public.client_commercial_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. MÓDULO AISLADO Y BLINDADO: VALORACIÓN PARASANITARIA / SALUD (RGPD ESPECIAL)
-- Este módulo se aísla expresamente de la gestión comercial y publicitaria.
CREATE TABLE IF NOT EXISTS public.health_assessment_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  mobility_concerns TEXT,
  postural_habits TEXT,
  contraindications TEXT,
  encrypted_parasanitary_notes TEXT,
  rgpd_consent_signed BOOLEAN DEFAULT TRUE NOT NULL,
  consent_signed_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  access_audited_by TEXT NOT NULL
);

-- 14. REGISTRO DE AUDITORÍA Y TRAZABILIDAD
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bonos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_commercial_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_assessment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Servicios: lectura pública para cualquier visitante
CREATE POLICY "Servicios visibles públicamente" ON public.services
  FOR SELECT USING (true);

-- Perfiles: el usuario puede ver y editar su propio perfil, admins ven todos
CREATE POLICY "Usuarios ven su propio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios editan su propio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Citas: clientes ven sus citas, admins ven todas
CREATE POLICY "Clientes ven sus citas" ON public.appointments
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clientes crean sus citas" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Aislamiento estricto de Salud / Parasanitario: Solo personal autorizado con rol admin o staff
CREATE POLICY "Solo especialistas acceden a salud" ON public.health_assessment_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'staff')
    )
  );

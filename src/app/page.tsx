'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Star, 
  Gift, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  Zap,
  Flame,
  Award
} from 'lucide-react';
import PainPointSelector from '@/components/PainPointSelector';
import LastMinuteDeals from '@/components/LastMinuteDeals';
import BodyTensionQuiz from '@/components/BodyTensionQuiz';
import WelcomeRewardWheel from '@/components/WelcomeRewardWheel';

export default function HomePage() {
  const { services, businessConfig, currentUser } = useStore();
  const activeServices = services.filter(s => s.available);
  const upcomingServices = services.filter(s => !s.available);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-obsidian-900 text-slate-900 dark:text-obsidian-100 transition-colors duration-300">
      
      {/* 1. HERO DE ALTO IMPACTO & CONVERSIÓN */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] dark:from-obsidian-950 dark:via-obsidian-900 dark:to-obsidian-950 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 dark:border-white/10">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#10B981]/15 to-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#044E39] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Centro Parasanitario · Calle San José, 2, Orcera (Jaén)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                Alivia el dolor, libera la tensión y <span className="text-[#10B981] dark:text-[#34D399] italic font-normal">recupera tu bienestar</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-obsidian-300 max-w-2xl leading-relaxed">
                En <strong>M&amp;H Bienestar Integral</strong> combinamos reeducación corporal, técnicas manuales profundas y descompresión articular. Un trato humano, sereno y sin prisas en la comarca de la Sierra de Segura.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#10B981] hover:bg-[#059669] active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Pedir Cita Online</span>
                </Link>

                <a
                  href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%20M%26H%20Bienestar%2C%20quisiera%20consultar%20disponibilidad%20para%20una%20cita%20en%20Orcera.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-slate-800 dark:text-obsidian-100 bg-white dark:bg-obsidian-800 hover:bg-slate-50 dark:hover:bg-obsidian-750 border border-slate-200 dark:border-white/10 shadow-sm transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">4.9 / 5 en Opiniones</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Vecinos de Orcera y comarca</p>
                </div>

                <div>
                  <p className="text-lg font-serif font-bold text-[#044E39] dark:text-[#34D399]">100%</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Atención Individual</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">En cabina privada sin prisas</p>
                </div>

                <div>
                  <p className="text-lg font-serif font-bold text-[#10B981]">24h</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Gestión Flexible</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Cancela o mueve tu cita gratis</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-obsidian-800 p-3">
                  <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80"
                      alt="Reeducación corporal y bienestar en Orcera M&H"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-[#10B981] text-white mb-2 shadow-sm">
                        Sesión Estrella
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        Reeducación Corporal &amp; Movilidad
                      </h3>
                      <p className="text-xs text-slate-200 mt-1">
                        60 minutos de evaluación anatómica y descarga manual profunda.
                      </p>
                    </div>
                  </div>

                  {/* Quick Card Badge */}
                  <div className="p-4 flex items-center justify-between text-xs text-slate-600 dark:text-obsidian-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-[#10B981]" />
                      <span>C/ San José, 2 · Orcera</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-[#10B981]" />
                      <span>De Lunes a Sábado</span>
                    </div>
                  </div>
                </div>

                {/* Floating promo badge */}
                <div className="absolute -bottom-5 -left-3 bg-white dark:bg-obsidian-850 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 shadow-xl max-w-[260px] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Cupón BIENVENIDA10</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">10% dto. en tu primera reserva</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SELECTOR VISUAL DE DOLENCIAS EN 1 TOQUE ("¿Qué necesitas aliviar hoy?") */}
      <PainPointSelector />

      {/* 3. HUECOS DE ÚLTIMA HORA CON DESCUENTO (-15%) */}
      <LastMinuteDeals />

      {/* 4. EVALUADOR DE TENSIÓN CORPORAL EN 30 SEGUNDOS (TEST + 10€) */}
      <section className="py-12 bg-white dark:bg-obsidian-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BodyTensionQuiz />
        </div>
      </section>

      {/* 5. CATÁLOGO DE TRATAMIENTOS PRINCIPALES */}
      <section className="py-16 bg-[#F9FAFB] dark:bg-obsidian-950 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#10B981] dark:text-[#34D399] uppercase">
              Catálogo de Especialidades
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              Tratamientos diseñados para tu salud integral
            </h2>
            <p className="text-sm text-slate-600 dark:text-obsidian-300">
              Cada sesión se adapta específicamente a tu fisionomía, hábitos y nivel de tensión para ofrecer resultados duraderos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <div 
                key={service.id}
                className="group rounded-3xl bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#10B981] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      {service.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-obsidian-900/95 text-[#044E39] dark:text-[#34D399] shadow-sm border border-emerald-100">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-slate-950/85 text-white px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/10">
                      {service.price}€ <span className="text-slate-300 font-normal">/ {service.durationMinutes} min</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-slate-950 dark:text-white group-hover:text-[#044E39] dark:group-hover:text-[#34D399] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-obsidian-300 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2">
                      <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                        Beneficios comprobados:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-obsidian-300">
                        {service.scopeAndBenefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3 mt-4">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-xs font-medium text-slate-600 dark:text-obsidian-300 hover:text-slate-900 dark:hover:text-white underline"
                  >
                    Detalles y preguntas
                  </Link>

                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] transition-colors shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservar Cita</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PACKS MULTISESIÓN CON AHORRO VISIBLE */}
      <section className="py-16 bg-white dark:bg-obsidian-900 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
              🔥 Máximo Ahorro &amp; Tratamiento Continuado
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-950 dark:text-white">
              Bonos Multisesión M&amp;H
            </h3>
            <p className="text-sm text-slate-600 dark:text-obsidian-300">
              Asegura tu continuidad de tratamiento ahorrando hasta 50€ respecto a sesiones individuales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Bono 3 */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 dark:bg-obsidian-850 border-2 border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-obsidian-750 text-slate-800 dark:text-white mb-2">
                  Bono 3 Sesiones
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Pack Recuperación Funcional
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Ideal para resolver bloqueos agudos de cuello o lumbares en 3 etapas progresivas.
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                  🎁 Incluye: Pauta personalizada de ejercicios posturales para casa
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                <div>
                  <span className="text-xs text-slate-400 line-through">150€</span>
                  <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">125€</p>
                  <span className="text-[11px] font-bold text-emerald-600">Ahorras 25€</span>
                </div>

                <Link
                  href="/bonos-y-regalos"
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-[#044E39] hover:bg-[#023325] shadow-sm"
                >
                  Comprar Bono 3 →
                </Link>
              </div>
            </div>

            {/* Bono 5 (Destacado) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#044E39] to-emerald-950 text-white border-2 border-[#10B981] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Más Popular
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/30 text-[#34D399] border border-[#10B981]/40 mb-2">
                  Bono 5 Sesiones
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Pack Bienestar Total &amp; Salud
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                  Reeducación integral y mantenimiento mensual sin dolor ni recaídas.
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/20 text-xs text-emerald-100 font-semibold">
                  🎁 Incluye: Sesión exprés extra de 30 min transferible a un familiar
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs text-emerald-200 line-through">250€</span>
                  <p className="font-serif text-3xl font-bold text-white">200€</p>
                  <span className="text-[11px] font-bold text-[#34D399]">Ahorras 50€ directos</span>
                </div>

                <Link
                  href="/bonos-y-regalos"
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-950 bg-[#10B981] hover:bg-[#34D399] shadow-lg"
                >
                  Comprar Bono 5 →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. OPINIONES REALES & COMPROMISO ÉTICO */}
      <section className="py-16 bg-[#F9FAFB] dark:bg-obsidian-950 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase">
              Opiniones Transparentes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              La confianza de quienes cuidan su cuerpo con nosotros
            </h2>
            <p className="text-sm text-slate-600 dark:text-obsidian-300">
              Solicitamos valoraciones honestas a cada usuario tras su visita. Sin condicionar, con total transparencia ética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-obsidian-200 leading-relaxed italic">
                &ldquo;Acudí por una sobrecarga constante en la zona lumbar y desde la primera sesión de reeducación corporal noté una descompresión increíble. La tranquilidad que se respira en el centro de Orcera es inigualable.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">María G.</p>
                  <p className="text-slate-500 dark:text-obsidian-400">Orcera (Jaén)</p>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Cliente habitual</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-obsidian-200 leading-relaxed italic">
                &ldquo;La terapia craneosacral suave me ayudó muchísimo con la tensión mandibular y el estrés laboral. El trato es extraordinariamente respetuoso y delicado. Un lujo tener este nivel en la comarca.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Carlos R.</p>
                  <p className="text-slate-500 dark:text-obsidian-400">Beas de Segura</p>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Reeducación corporal</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-obsidian-200 leading-relaxed italic">
                &ldquo;Poder reservar cita desde el móvil en un minuto y recibir el recordatorio por WhatsApp es comodísimo. Y los bonos con descuento se amortizan solísimos si vienes con regularidad.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Ana Belén M.</p>
                  <p className="text-slate-500 dark:text-obsidian-400">Segura de la Sierra</p>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Club M&amp;H</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. RULETA DE PREMIOS FLOTANTE (GAMIFICACIÓN Y RETENCIÓN) */}
      <WelcomeRewardWheel />

    </div>
  );
}
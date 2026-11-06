'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const { services, businessConfig, currentUser } = useStore();
  const activeServices = services.filter(s => s.available);
  const upcomingServices = services.filter(s => !s.available);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-100 via-warm-50 to-warm-100 pt-12 pb-20 md:pt-20 md:pb-32 border-b border-warm-200">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#8A9A86_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sage-100 text-forest-800 border border-sage-300/80 shadow-soft-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Centro Parasanitario · Calle San José, 2, Orcera (Jaén)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-[1.12]">
                Recupera la ligereza y el <span className="text-gold-700 italic font-normal">equilibrio natural</span> de tu cuerpo.
              </h1>

              <p className="text-base sm:text-lg text-forest-700/90 max-w-2xl leading-relaxed">
                En <strong>M&amp;H Bienestar</strong> combinamos reeducación corporal, técnicas manuales profundas y armonización craneosacral suave. Un trato humano, sereno y personalizado en la comarca de la Sierra de Segura.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-white bg-forest-800 hover:bg-forest-700 active:scale-[0.98] transition-all shadow-soft-lg hover:shadow-soft-xl border border-gold-400/30"
                >
                  <Calendar className="w-5 h-5 text-gold-300" />
                  <span>Reservar Cita Online</span>
                </Link>

                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-forest-900 bg-white/80 hover:bg-white border border-warm-300 shadow-soft-sm transition-all"
                >
                  <span>Explorar Servicios</span>
                  <ArrowRight className="w-4 h-4 text-sage-600" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-warm-300/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-gold-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-gold-500" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-forest-900 mt-1">4.9 / 5 en Opiniones</p>
                  <p className="text-[11px] text-forest-600">Clientes de Orcera y comarca</p>
                </div>

                <div>
                  <p className="text-lg font-serif font-bold text-forest-900">100%</p>
                  <p className="text-xs font-semibold text-forest-900">Atención Individual</p>
                  <p className="text-[11px] text-forest-600">Sin prisas ni interrupciones</p>
                </div>

                <div>
                  <p className="text-lg font-serif font-bold text-forest-900">24h</p>
                  <p className="text-xs font-semibold text-forest-900">Gestión Flexible</p>
                  <p className="text-[11px] text-forest-600">Cancelación fácil desde tu móvil</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-sage-200/50 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gold-200/40 rounded-full filter blur-3xl -z-10"></div>

                <div className="rounded-3xl overflow-hidden shadow-soft-xl border border-warm-300/80 bg-white p-3">
                  <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80"
                      alt="Reeducación corporal y bienestar en Orcera M&H"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-gold-500/90 text-forest-950 mb-2">
                        Sesión destacada
                      </span>
                      <h3 className="font-serif text-xl font-bold text-warm-50">
                        Reeducación Corporal &amp; Movilidad
                      </h3>
                      <p className="text-xs text-warm-200 mt-0.5">
                        60 minutos de evaluación postural y trabajo manual profundo.
                      </p>
                    </div>
                  </div>

                  {/* Quick Card Badge */}
                  <div className="p-4 flex items-center justify-between text-xs text-forest-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-600" />
                      <span>C/ San José, 2 · Orcera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-600" />
                      <span>Citas de Lunes a Sábado</span>
                    </div>
                  </div>
                </div>

                {/* Floating promo badge */}
                <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md border border-warm-300 rounded-2xl p-3.5 shadow-soft-lg max-w-[260px] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-forest-900">Cupón BIENVENIDA10</p>
                    <p className="text-[11px] text-forest-600">10% dto. en tu primera reserva</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DE TRATAMIENTOS ACTIVOS */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-gold-700 uppercase">
              Terapias y Servicios Principales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Tratamientos diseñados para tu salud integral
            </h2>
            <p className="text-sm sm:text-base text-forest-700/80">
              Cada sesión se adapta específicamente a tu fisionomía, hábitos posturales y nivel de tensión para ofrecer resultados tangibles y duraderos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <div 
                key={service.id}
                className="group rounded-3xl bg-white border border-warm-300/80 overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative h-56 w-full overflow-hidden bg-forest-900">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      {service.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-forest-800 shadow-soft-sm">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-forest-900/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm">
                      {service.price}€ <span className="text-warm-300 font-normal">/ {service.durationMinutes} min</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-forest-700/80 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2">
                      <p className="text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
                        Beneficios clave:
                      </p>
                      <ul className="space-y-1.5 text-xs text-forest-700">
                        {service.scopeAndBenefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-warm-100 flex items-center justify-between gap-3 mt-4">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-xs font-medium text-forest-700 hover:text-forest-900 underline"
                  >
                    Detalles y preguntas
                  </Link>

                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 transition-colors shadow-soft-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-300" />
                    <span>Reservar</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

          {/* Servicios en desarrollo / Sujetos a disponibilidad */}
          <div className="mt-16 pt-12 border-t border-warm-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  Próximas Disciplinas &amp; Talleres
                </h3>
                <p className="text-xs sm:text-sm text-forest-600">
                  Sujetos a disponibilidad y grupos reducidos hasta confirmación de agenda por recepción.
                </p>
              </div>
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%20M%26H%2C%20quisiera%20apuntarme%20a%20la%20lista%20de%20espera%20de%20Nutrici%C3%B3n%2C%20Pilates%20o%20Mindfulness.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-forest-800 bg-warm-200/80 px-4 py-2 rounded-xl hover:bg-warm-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Lista de Espera Prioritaria</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingServices.map((service) => (
                <div key={service.id} className="p-5 rounded-2xl bg-warm-100/70 border border-warm-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sage-200 text-forest-800">
                        {service.badge || "En Preparación"}
                      </span>
                      <span className="text-xs text-forest-500 font-medium">
                        Desde {service.price}€
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-forest-900">{service.name}</h4>
                    <p className="text-xs text-forest-700/80 mt-1 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-warm-200/60 text-[11px] text-sage-700 italic">
                    {service.statusNote}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. PROGRAMA DE FIDELIZACIÓN & REFERIDOS VIRALES */}
      <section className="py-20 bg-forest-900 text-warm-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-forest-800/40 rounded-l-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest-800 text-gold-300 border border-gold-400/30">
                <HeartHandshake className="w-3.5 h-3.5" />
                Programa Exclusivo M&amp;H Amigos
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-50 tracking-tight leading-snug">
                Tu bienestar compartido tiene <span className="text-gold-400">recompensa mutua</span>.
              </h2>

              <p className="text-sm sm:text-base text-sage-200/90 leading-relaxed">
                Cada cliente en M&amp;H dispone de un código de recomendación personal. Invita a tus familiares y conocidos de Orcera, Beas de Segura y comarca:
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-forest-800/60 border border-forest-700/80">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-warm-100">Comparte tu enlace o código</h4>
                    <p className="text-xs text-sage-300">Directamente por WhatsApp con un solo toque desde tu portal cliente.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-forest-800/60 border border-forest-700/80">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-warm-100">Ellos reciben 100 puntos (10€ de dto.)</h4>
                    <p className="text-xs text-sage-300">Aplicable en su primera sesión en nuestro centro.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-forest-800/60 border border-forest-700/80">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-warm-100">Tú sumas 150 puntos (15€) automáticamente</h4>
                    <p className="text-xs text-sage-300">Canjeables por descuentos directos o sesiones gratuitas completas.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/mi-cuenta"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-forest-950 bg-gold-400 hover:bg-gold-300 transition-colors shadow-soft-md"
                >
                  <Users className="w-4 h-4" />
                  <span>Obtener Mi Código de Amigo</span>
                </Link>
              </div>

            </div>

            {/* Loyalty preview visual */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-forest-800/80 border border-forest-700 p-6 sm:p-8 space-y-6 shadow-soft-xl">
                <div className="flex items-center justify-between pb-4 border-b border-forest-700">
                  <div>
                    <p className="text-xs text-sage-300 font-medium">Tarjeta de Fidelidad Virtual</p>
                    <p className="font-serif text-lg font-bold text-warm-50">M&amp;H Club Bienestar</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-400/40">
                    Nivel Oro
                  </div>
                </div>

                {/* Example Point Balance */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-sage-300">Tus puntos acumulados</span>
                    <p className="text-3xl font-serif font-bold text-gold-300">340 <span className="text-sm font-sans font-normal text-warm-300">pts</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-sage-300">Valor aproximado</span>
                    <p className="text-xl font-bold text-warm-100">34€ <span className="text-xs font-normal text-sage-300">en sesiones</span></p>
                  </div>
                </div>

                {/* Redeemable Rewards list */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-sage-300 uppercase tracking-wider">Premios listos para canjear:</p>
                  
                  <div className="p-3 rounded-xl bg-forest-700/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-warm-100">10€ de Descuento Inmediato</p>
                      <p className="text-sage-300">Para tu próxima cita</p>
                    </div>
                    <span className="font-bold text-gold-300">100 pts</span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-700/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-warm-100">20€ de Descuento Especial</p>
                      <p className="text-sage-300">En sesiones o bonos</p>
                    </div>
                    <span className="font-bold text-gold-300">180 pts</span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-700/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-warm-100">Sesión Completa Gratuita (60 min)</p>
                      <p className="text-sage-300">Reeducación o Craneosacral</p>
                    </div>
                    <span className="font-bold text-gold-300">350 pts</span>
                  </div>
                </div>

                <p className="text-[11px] text-sage-400 text-center italic">
                  Tus puntos nunca caducan mientras mantengas al menos 1 visita al año.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OPINIONES REALES & COMPROMISO ÉTICO */}
      <section className="py-20 bg-warm-100/60 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-gold-700 uppercase">
              Opiniones Transparentes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              La confianza de quienes cuidan su cuerpo con nosotros
            </h2>
            <p className="text-sm text-forest-700/80">
              Solicitamos reseñas honestas a cada usuario tras su visita. Sin condicionar valoraciones, con total transparencia ética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white border border-warm-300/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-forest-800 leading-relaxed italic">
                &ldquo;Acudí por una sobrecarga constante en la zona lumbar y desde la primera sesión de reeducación corporal noté una descompresión increíble. La tranquilidad que se respira en el centro de Orcera es inigualable.&rdquo;
              </p>
              <div className="pt-2 border-t border-warm-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-forest-900">María G.</p>
                  <p className="text-forest-600">Orcera (Jaén)</p>
                </div>
                <span className="text-sage-600 font-medium">Cliente habitual</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-warm-300/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-forest-800 leading-relaxed italic">
                &ldquo;La terapia craneosacral suave me ayudó muchísimo con la tensión mandibular y el estrés laboral. El trato es extraordinariamente respetuoso y delicado. Un lujo tener este nivel en la comarca.&rdquo;
              </p>
              <div className="pt-2 border-t border-warm-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-forest-900">Carlos R.</p>
                  <p className="text-forest-600">Beas de Segura</p>
                </div>
                <span className="text-sage-600 font-medium">Bono 3 sesiones</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-warm-300/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-forest-800 leading-relaxed italic">
                &ldquo;Reservar desde la web es comodísimo, te llegan los avisos al móvil y la atención en consulta es puntual, sin prisas. Muy recomendable el bienestar visceral si sufres de pesadez o tensión diafragmática.&rdquo;
              </p>
              <div className="pt-2 border-t border-warm-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-forest-900">Elena S.</p>
                  <p className="text-forest-600">Orcera</p>
                </div>
                <span className="text-sage-600 font-medium">Recomendada</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://quirosteopatiamh.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-forest-800 hover:text-gold-700 underline"
            >
              <span>Ver ficha y opiniones en Google Business Profile de M&amp;H</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 5. UBICACIÓN & CONTACTO */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-warm-300 p-8 sm:p-12 shadow-soft-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-gold-700 tracking-wider uppercase">
                En el Corazón de Orcera
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
                Un entorno tranquilo para tu descanso
              </h2>
              <p className="text-sm sm:text-base text-forest-700/80 leading-relaxed">
                Nos encontramos en <strong>Calle San José, 2</strong>, en pleno centro de Orcera (Jaén), con fácil aparcamiento en las inmediaciones y acceso adaptado.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-forest-800">
                <div className="p-3.5 rounded-2xl bg-warm-100/70 border border-warm-200">
                  <p className="font-semibold text-forest-900">Dirección</p>
                  <p className="text-xs text-forest-600 mt-0.5">{businessConfig.address}, {businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-warm-100/70 border border-warm-200">
                  <p className="font-semibold text-forest-900">Teléfono &amp; WhatsApp</p>
                  <p className="text-xs text-forest-600 mt-0.5">{businessConfig.phone}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/reservar"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-forest-800 hover:bg-forest-700 transition-colors shadow-soft-sm"
                >
                  Pedir Cita Online
                </Link>
                <a
                  href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20consultar%20una%20duda%20sobre%20mi%20cita%20en%20Orcera.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden border border-warm-300 relative shadow-soft-md">
              <iframe
                title="Ubicación Centro Parasanitario M&H Orcera"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.4523955611186!2d-2.663199623547371!3d38.31800167185011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd68ac483ba00001%3A0x1b4168fa2f4fa9b0!2sC.%20San%20Jos%C3%A9%2C%202%2C%2023370%20Orcera%2C%20Ja%C3%A9n!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

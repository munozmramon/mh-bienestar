'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  MessageCircle,
  Tag
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { services, businessConfig } = useStore();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-warm-50 dark:bg-obsidian-900">
        <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-white mb-2">Servicio no encontrado</h2>
        <p className="text-sm text-forest-600 dark:text-obsidian-400 mb-6">El tratamiento que buscas no existe o ha sido actualizado.</p>
        <Link
          href="/servicios"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forest-800 dark:bg-neon-lime dark:text-obsidian-950 font-bold"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-obsidian-900 text-forest-900 dark:text-obsidian-100 py-10 md:py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-forest-600 dark:text-obsidian-400">
          <Link href="/servicios" className="hover:text-forest-900 dark:hover:text-neon-lime inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Todos los servicios</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-forest-900 dark:text-white">{service.name}</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white dark:bg-obsidian-800 border border-warm-300 dark:border-white/10 overflow-hidden shadow-soft-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Visual Cover */}
            <div className="md:col-span-5 relative h-72 md:h-auto min-h-[320px] bg-forest-900 dark:bg-obsidian-950">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 dark:from-obsidian-950/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-gold-500 dark:bg-neon-lime text-forest-950 dark:text-obsidian-950 mb-2">
                  {service.badge || "M&H Calidad"}
                </span>
                <p className="text-xs text-warm-200 dark:text-obsidian-300">Centro Parasanitario M&amp;H Orcera</p>
              </div>
            </div>

            {/* Main Info */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-gold-700 dark:text-neon-lime tracking-wider uppercase">
                    Terapia de Bienestar
                  </span>
                  
                  {service.available ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-neon-lime/20 text-emerald-800 dark:text-neon-lime border dark:border-neon-lime/30">
                      Disponible para reserva
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border dark:border-amber-700">
                      Sujeto a disponibilidad
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 dark:text-white">
                  {service.name}
                </h1>

                <p className="text-sm text-forest-700 dark:text-obsidian-300 leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Specs Pill List */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-warm-100/80 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10">
                    <span className="text-forest-500 dark:text-obsidian-400 font-medium">Duración de la sesión</span>
                    <p className="font-bold text-forest-900 dark:text-white text-sm mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-forest-600 dark:text-neon-lime" />
                      {service.durationMinutes} minutos
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-warm-100/80 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10">
                    <span className="text-forest-500 dark:text-obsidian-400 font-medium">Tarifa individual</span>
                    <p className="font-bold text-gold-700 dark:text-neon-lime text-sm mt-0.5 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-gold-600 dark:text-neon-lime" />
                      {service.price}€ / sesión
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-forest-600 dark:text-obsidian-300">
                  <UserCheck className="w-4 h-4 text-sage-600 dark:text-neon-lime shrink-0" />
                  <span>Atendido por: <strong className="text-forest-900 dark:text-white">{service.professionalName}</strong></span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-warm-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-3">
                {service.available ? (
                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white dark:text-obsidian-950 bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:hover:bg-[#d8ff68] transition-all shadow-soft-sm dark:shadow-neon-lime"
                  >
                    <Calendar className="w-4 h-4 text-gold-300 dark:text-obsidian-950" />
                    <span>Reservar Esta Sesión</span>
                  </Link>
                ) : (
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20apuntarme%20a%20la%20lista%20de%20espera%20para%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-forest-900 dark:text-neon-lime bg-warm-200 dark:bg-obsidian-850 hover:bg-warm-300 dark:hover:bg-obsidian-750 border dark:border-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-neon-lime" />
                    <span>Consultar Próxima Apertura</span>
                  </a>
                )}

                <Link
                  href="/bonos-y-regalos"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-semibold text-forest-800 dark:text-obsidian-200 hover:bg-warm-100 dark:hover:bg-obsidian-700 border border-warm-300 dark:border-white/10 transition-colors text-center"
                >
                  Ver Bonos con Descuento
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Scope, Benefits and FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Scope & Benefits Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-obsidian-800 border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-600 dark:text-neon-lime" />
              <span>Alcance e Indicaciones</span>
            </h3>
            <p className="text-xs text-forest-600 dark:text-obsidian-400">
              ¿Qué experimentará tu cuerpo a lo largo de este tratamiento en M&amp;H?
            </p>

            <ul className="space-y-3 pt-2 text-sm text-forest-800 dark:text-obsidian-200">
              {service.scopeAndBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 dark:text-neon-lime shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-2xl bg-warm-100 dark:bg-obsidian-850 border dark:border-white/10 text-xs text-forest-700 dark:text-obsidian-300 mt-4 leading-relaxed">
              <strong>Nota de transparencia:</strong> Este tratamiento parasanitario no sustituye diagnósticos ni prescripciones médicas. Su objetivo es la optimización biomecánica, la reducción de sobrecargas y la relajación corporal.
            </div>
          </div>

          {/* FAQs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-obsidian-800 border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-forest-700 dark:text-neon-lime" />
              <span>Preguntas Frecuentes</span>
            </h3>

            <div className="space-y-4 pt-2">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-warm-50 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10">
                  <h4 className="text-sm font-bold text-forest-950 dark:text-white mb-1.5">{faq.question}</h4>
                  <p className="text-xs text-forest-700/80 dark:text-obsidian-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-forest-600 dark:text-obsidian-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-600 dark:text-neon-lime shrink-0" />
              <span>Atención en Calle San José, 2, 23370 Orcera (Jaén)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

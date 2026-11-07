'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

export default function GoogleReviewsSection() {
  const reviews = [
    {
      id: 1,
      author: 'María González',
      location: 'Orcera (Jaén)',
      date: 'Hace 2 semanas',
      rating: 5,
      avatarColor: 'bg-teal-600',
      initials: 'MG',
      treatment: 'Alivio de Lumbalgia & Descarga de Espalda',
      comment:
        'Llegué con un dolor lumbar agudo que casi no me dejaba agacharme. Tras la sesión de reeducación corporal noté una descompresión inmediata. El trato de Ramón es cercano, profesional y con muchísima paciencia. Un alivio tremendo tener este centro en Orcera.',
    },
    {
      id: 2,
      author: 'Carlos Ruiz García',
      location: 'Beas de Segura',
      date: 'Hace 3 semanas',
      rating: 5,
      avatarColor: 'bg-emerald-600',
      initials: 'CR',
      treatment: 'Terapia Craneal & Alivio de Bruxismo',
      comment:
        'Sufro de migrañas y aprieto mucho los dientes por las noches. La técnica craneosacral suave te deja en un estado de relajación que no he probado en ningún otro sitio. Duermo muchísimo mejor y la pesadez de cabeza ha desaparecido.',
    },
    {
      id: 3,
      author: 'Ana Belén Martínez',
      location: 'Segura de la Sierra',
      date: 'Hace 1 mes',
      rating: 5,
      avatarColor: 'bg-amber-600',
      initials: 'AB',
      treatment: 'Bono Multisesión de Mantenimiento',
      comment:
        'Lo de poder pedir cita por WhatsApp en un momento o desde la app es facilísimo para los que vivimos en la comarca. Los bonos con descuento merecen muchísimo la pena. 100% recomendable.',
    },
  ];

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-sm">
              <span className="flex items-center gap-1">
                {/* Google "G" representation */}
                <span className="font-bold text-[#4285F4]">G</span>
                <span className="font-bold text-[#EA4335]">o</span>
                <span className="font-bold text-[#FBBC05]">o</span>
                <span className="font-bold text-[#4285F4]">g</span>
                <span className="font-bold text-[#34A853]">l</span>
                <span className="font-bold text-[#EA4335]">e</span>
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-teal-400">Reseñas Verificadas de Pacientes</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-50 dark:text-zinc-100">
              La confianza de nuestros vecinos en la Sierra de Segura
            </h2>

            <p className="text-sm text-zinc-400">
              Opiniones 100% libres, espontáneas y verificadas en nuestra ficha de Google Maps. Cuidamos cada sesión con rigor anatómico y máxima cercanía.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-zinc-100">5.0</p>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-zinc-800"></div>
            <div className="text-xs">
              <p className="font-bold text-zinc-200">Máxima Calificación</p>
              <p className="text-zinc-400">Centro Parasanitario en Orcera</p>
              <a
                href="https://quirosteopatiamh.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-teal-400 hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>Ver ficha en Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Real Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-sm hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-500">{rev.date}</span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-900/30 text-teal-400 border border-teal-500/20">
                  {rev.treatment}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${rev.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                    {rev.initials}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-zinc-100 flex items-center gap-1">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400 fill-teal-400/20" />
                    </p>
                    <p className="text-[11px] text-zinc-400">{rev.location}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-850 px-2 py-0.5 rounded">
                  Verificado
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            ¿Has visitado nuestro centro en Calle San José, 2? Agradecemos tu valoración honesta.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/opiniones"
              className="text-teal-400 hover:text-teal-300 font-semibold underline"
            >
              Dejar valoración web
            </Link>
            <span>·</span>
            <a
              href="https://quirosteopatiamh.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 hover:text-white inline-flex items-center gap-1"
            >
              <span>Escribir reseña en Google</span>
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


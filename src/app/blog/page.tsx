'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      id: 'art-1',
      title: 'Reeducación Corporal en la Sierra de Segura: Por qué tus hábitos posturales dictan tu vitalidad',
      category: 'Biomecánica & Postura',
      date: '4 de Noviembre, 2026',
      readTime: '4 min de lectura',
      summary: 'El sedentarismo y las tareas repetitivas en el campo o la oficina generan bloqueos miofasciales silenciosos. Descubre cómo las técnicas manuales suaves devuelven la alineación a tu columna en Orcera.',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-2',
      title: 'Terapia Craneosacral Suave: Calmar el sistema nervioso en tiempos de hiperalerta',
      category: 'Bienestar Nervioso',
      date: '28 de Octubre, 2026',
      readTime: '5 min de lectura',
      summary: 'El bruxismo nocturno, las cefaleas tensionales y la dificultad para conciliar el sueño tienen un origen común: la sobrecarga del sistema simpático. Explicamos cómo el tacto sutil restaura el ritmo natural.',
      imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-3',
      title: 'El Diafragma y la Esfera Visceral: El centro de gravedad de tu respiración y digestión',
      category: 'Equilibrio Visceral',
      date: '15 de Octubre, 2026',
      readTime: '3 min de lectura',
      summary: '¿Sabías que una tensión diafragmática acumulada puede ser la causa oculta de una molestia lumbar persistente? La manipulación visceral suave promueve la movilidad funcional orgánica.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-forest-800 border border-sage-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Divulgación &amp; Estilo de Vida · M&amp;H Orcera</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950">
            Cuaderno de Bienestar &amp; Salud
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/80 leading-relaxed">
            Pautas anatómicas, consejos preventivos y artículos sobre movilidad y terapias manuales para los vecinos de Orcera y la provincia de Jaén.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="rounded-3xl bg-white border border-warm-300 overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-forest-900">
                  <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 text-forest-800 shadow-soft-sm">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-forest-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {art.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-forest-950 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-forest-700/80 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-warm-100 flex items-center justify-between mt-4">
                <span className="text-[11px] font-semibold text-gold-700">Por Especialista M&amp;H</span>
                <Link
                  href="/reservar"
                  className="text-xs font-semibold text-forest-800 hover:text-forest-950 inline-flex items-center gap-1 underline"
                >
                  <span>Pedir cita</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Local Community Notice */}
        <div className="p-8 rounded-3xl bg-white border border-warm-300 shadow-soft-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-forest-950">
              ¿Vives en Orcera, Segura de la Sierra, Beas o Siles?
            </h3>
            <p className="text-xs sm:text-sm text-forest-600">
              Atendemos con cita concertada para garantizar que disfrutes de tu sesión con el máximo recogimiento e intimidad.
            </p>
          </div>

          <Link
            href="/reservar"
            className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 transition-colors shrink-0 shadow-soft-sm"
          >
            Reservar Cita Ahora
          </Link>
        </div>

      </div>
    </div>
  );
}

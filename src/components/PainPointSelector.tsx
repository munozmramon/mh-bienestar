'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Zap,
  MessageCircle
} from 'lucide-react';

interface PainPoint {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  symptoms: string[];
  recommendedServiceId: string;
  recommendedServiceName: string;
  duration: number;
  price: number;
  badge: string;
}

export default function PainPointSelector() {
  const [selectedPainId, setSelectedPainId] = useState<string>('espalda');

  const painPoints: PainPoint[] = [
    {
      id: 'espalda',
      emoji: '💥',
      title: 'Dolor de Espalda o Cuello',
      subtitle: 'Cervicales, lumbares, ciática o bloqueos vertebrales',
      symptoms: ['Pinchazos al sentarte', 'Cuello rígido por pantallas', 'Sobrecarga lumbar al levantarte'],
      recommendedServiceId: 'reeducacion-corporal-y-movilidad',
      recommendedServiceName: 'Reeducación Corporal & Movilidad',
      duration: 60,
      price: 50,
      badge: 'Tratamiento Más Solicitado'
    },
    {
      id: 'estres',
      emoji: '🧘',
      title: 'Estrés, Bruxismo o Migrañas',
      subtitle: 'Tensión en mandíbula, cefaleas o dificultad para desconectar',
      symptoms: ['Aprietas los dientes de noche', 'Pesadez constante en la cabeza', 'Sensación de cansancio acumulado'],
      recommendedServiceId: 'terapia-craneosacral-biodinamica',
      recommendedServiceName: 'Terapia Craneosacral & Relajación Profunda',
      duration: 50,
      price: 45,
      badge: 'Alivio del Sistema Nervioso'
    },
    {
      id: 'sobrecarga',
      emoji: '🏃',
      title: 'Sobrecarga Muscular y Fatiga',
      subtitle: 'Piernas pesadas, contracturas deportivas o esfuerzo físico',
      symptoms: ['Piernas cansadas o hinchadas', 'Nudos y contracturas profundas', 'Recuperación tras jornadas duras'],
      recommendedServiceId: 'reeducacion-corporal-y-movilidad',
      recommendedServiceName: 'Descarga Miofascial & Terapia Manual',
      duration: 60,
      price: 50,
      badge: 'Alivio Muscular Rápido'
    },
    {
      id: 'postura',
      emoji: '🪷',
      title: 'Postura, Prevención y Movilidad',
      subtitle: 'Corregir hábitos posturales y recuperar agilidad corporal',
      symptoms: ['Hombros caídos hacia delante', 'Falta de flexibilidad al agacharte', 'Prevención de lesiones futuras'],
      recommendedServiceId: 'pilates-clinico-y-reeducacion-postural',
      recommendedServiceName: 'Pilates Clínico & Reeducación Postural',
      duration: 55,
      price: 40,
      badge: 'Salud a Largo Plazo'
    }
  ];

  const currentSelection = painPoints.find(p => p.id === selectedPainId) || painPoints[0];

  return (
    <section className="py-10 sm:py-14 bg-zinc-950 text-zinc-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-900/40 text-teal-600 dark:text-teal-300 border border-teal-500/30 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
            <span>Guía Rápida en 1 Toque</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-50 dark:text-zinc-100 tracking-tight">
            ¿Qué necesitas <span className="text-teal-600 dark:text-teal-400">aliviar hoy</span>?
          </h2>

          <p className="text-sm text-zinc-400">
            Toca tu principal molestia para ver de inmediato la solución recomendada por el especialista de Orcera.
          </p>
        </div>

        {/* 4 Large Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {painPoints.map((point) => {
            const isSelected = selectedPainId === point.id;
            return (
              <button
                key={point.id}
                onClick={() => setSelectedPainId(point.id)}
                className={`flex flex-col text-left p-4 sm:p-5 rounded-3xl transition-all duration-200 border relative ${
                  isSelected
                    ? 'bg-zinc-900 border-teal-500 shadow-xl ring-2 ring-teal-500/30 -translate-y-1'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-zinc-800 border border-zinc-700/60">
                    {point.emoji}
                  </span>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      ✓
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-zinc-700 text-transparent flex items-center justify-center text-xs">
                      •
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-zinc-100 leading-tight mb-1">
                  {point.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {point.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Panel */}
        <div className="rounded-3xl bg-zinc-900 text-zinc-100 p-6 sm:p-8 shadow-2xl border border-zinc-800 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Solution Explanation */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-900/40 text-teal-400 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{currentSelection.badge}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-50 dark:text-zinc-100 leading-tight">
                {currentSelection.recommendedServiceName}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Diseñado específicamente para aliviar de raíz la molestia de <strong>{currentSelection.title.toLowerCase()}</strong> mediante técnicas manuales precisas, descompresión articular y reeducación funcional.
              </p>

              {/* Symptoms Checklist */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
                  Indicado si experimentas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentSelection.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-200 bg-zinc-800/80 p-2 rounded-xl border border-zinc-700/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Price & Instant Booking Action */}
            <div className="lg:col-span-5 bg-zinc-850/80 backdrop-blur-md rounded-2xl p-5 border border-zinc-750 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-750">
                <div>
                  <span className="text-xs text-zinc-400">Tarifa en Consulta</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold font-serif text-zinc-50 dark:text-zinc-100">{currentSelection.price}€</span>
                    <span className="text-xs text-zinc-400">/ {currentSelection.duration} min</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold">
                    Atención 1 a 1
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Orcera (Jaén)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/reservar?servicio=${currentSelection.recommendedServiceId}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-600/25 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar Día y Hora en la Web →</span>
                </Link>

                <a
                  href={`https://wa.me/34651308738?text=Hola%20M%26H%20Bienestar%2C%20he%20visto%20en%20la%20app%20el%20tratamiento%20para%20${encodeURIComponent(currentSelection.title)}%20(${encodeURIComponent(currentSelection.recommendedServiceName)}).%20%C2%BFQu%C3%A9%20d%C3%ADa%20y%20hora%20ten%C3%A9is%20disponible%20en%20Orcera%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir Cita Directa por WhatsApp</span>
                </a>

                <p className="text-[11px] text-center text-zinc-400">
                  ⚡ Elige día y hora online o escríbenos directamente sin esperas
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

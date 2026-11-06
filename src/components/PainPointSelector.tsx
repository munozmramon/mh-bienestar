'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Zap,
  Activity,
  Heart,
  ChevronRight
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
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-[#F9FAFB] to-white dark:from-obsidian-900 dark:via-obsidian-950 dark:to-obsidian-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#044E39] dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
            <span>Guía Rápida en 1 Toque</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            ¿Qué necesitas <span className="text-[#10B981] dark:text-[#34D399]">aliviar hoy</span>?
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
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
                    ? 'bg-white dark:bg-obsidian-800 border-[#10B981] shadow-soft-lg ring-2 ring-[#10B981]/30 -translate-y-1'
                    : 'bg-white/80 dark:bg-obsidian-850/70 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-50 dark:bg-obsidian-750 border border-slate-100 dark:border-white/5">
                    {point.emoji}
                  </span>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-white/20 text-transparent flex items-center justify-center text-xs">
                      •
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight mb-1">
                  {point.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {point.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Panel (Immediate Conversion Box) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#044E39] to-[#022A1E] text-white p-6 sm:p-8 shadow-soft-xl border border-emerald-900 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Solution Explanation */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{currentSelection.badge}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentSelection.recommendedServiceName}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                Diseñado específicamente para aliviar de raíz la molestia de <strong>{currentSelection.title.toLowerCase()}</strong> mediante técnicas manuales precisas, descompresión articular y reeducación funcional.
              </p>

              {/* Symptoms Checklist */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-2">
                  Indicado si experimentas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentSelection.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-100 bg-white/5 p-2 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                      <span className="truncate">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Price & Instant Booking Action */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs text-emerald-200">Tarifa en Consulta</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold font-serif text-white">{currentSelection.price}€</span>
                    <span className="text-xs text-emerald-200">/ {currentSelection.duration} min</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                    Atención 1 a 1
                  </span>
                  <p className="text-[10px] text-emerald-200 mt-0.5">Orcera (Jaén)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/reservar?servicio=${currentSelection.recommendedServiceId}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-[#059669] active:scale-[0.98] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar Este Tratamiento →</span>
                </Link>

                <p className="text-[11px] text-center text-emerald-200/80">
                  ⚡ Elige día y hora en 2 pasos · Sin esperas
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

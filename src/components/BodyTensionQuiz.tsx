'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Gift, 
  RefreshCw, 
  Clock, 
  X,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BodyTensionQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      title: '1. ¿Cuántas horas al día pasas en la misma postura?',
      subtitle: 'Frente al ordenador, al volante o de pie continuo.',
      options: [
        { label: 'Menos de 4 horas diarias', points: 1 },
        { label: 'Entre 4 y 7 horas diarias', points: 2 },
        { label: 'Más de 8 horas diarias continuas', points: 3 },
      ]
    },
    {
      title: '2. ¿Qué sensación predomina en tu cuerpo al terminar el día?',
      subtitle: 'En cuello, trapecios, zona lumbar o piernas.',
      options: [
        { label: 'Cansancio normal, sin dolor limitante', points: 1 },
        { label: 'Nudos, pesadez o sobrecarga muscular constante', points: 2 },
        { label: 'Pinchazos agudos, bloqueo o dolor que me quita energía', points: 3 },
      ]
    },
    {
      title: '3. ¿Cómo sientes tu cuello y mandíbula al despertar?',
      subtitle: 'Indicador directo de tensión nocturna o bruxismo.',
      options: [
        { label: 'Descansado y con buena movilidad', points: 1 },
        { label: 'Cuello rígido y sensación de no haber descansado', points: 2 },
        { label: 'Aprieto los dientes (bruxismo) o sufro cefaleas tensionales', points: 3 },
      ]
    }
  ];

  const handleSelectOption = (points: number) => {
    const updated = [...answers, points];
    setAnswers(updated);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalPoints = answers.reduce((a, b) => a + b, 0);

  let resultLevel = 'Sobrecarga Funcional Moderada';
  let resultDescription = 'Tu musculatura lumbar y cervical está compensando malas posturas diarias. Una sesión de reeducación corporal liberará la presión antes de que derive en contracturas crónicas.';
  let badgeColor = 'text-amber-700 bg-amber-100 border-amber-300';

  if (totalPoints <= 4) {
    resultLevel = 'Tensión Muscular Leve / Preventiva';
    resultDescription = 'Tu nivel de movilidad es bueno, pero conviene realizar mantenimiento periódico para evitar rigidez acumulada.';
    badgeColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
  } else if (totalPoints >= 8) {
    resultLevel = 'Nivel de Tensión y Bloqueo Alto';
    resultDescription = 'Existe sobrecarga acumulada en fascia y articulaciones. Se aconseja una descompresión profunda y evaluación postural presencial en Orcera sin demora.';
    badgeColor = 'text-red-700 bg-red-100 border-red-300';
  }

  return (
    <>
      {/* Quiz Promo Banner (Zen Ciruela & Lavanda) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#3B1238] via-[#2A0B27] to-[#1F0820] p-6 sm:p-8 text-white shadow-2xl border border-purple-900/60 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/25 text-[#DDD6FE] border border-[#7C3AED]/35">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Interactivo de 30 Segundos</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              ¿Cuál es tu nivel de sobrecarga corporal?
            </h3>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Responde 3 preguntas rápidas sobre tus hábitos y recibe un diagnóstico funcional preliminar junto a un <strong>Cupón Exclusivo de 10€</strong> para tu primera sesión en Orcera.
            </p>
          </div>

          <button
            onClick={() => {
              resetQuiz();
              setIsOpen(true);
            }}
            className="px-6 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all active:scale-[0.98] shrink-0 flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>Hacer Test &amp; Conseguir 10€ →</span>
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#1A132E] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!showResult ? (
              <div className="space-y-5">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-purple-300">
                    <span>Pregunta {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-[#7C3AED] transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {questions[currentStep].title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {questions[currentStep].subtitle}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {questions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.points)}
                      className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-white/10 hover:border-[#7C3AED] transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA]">
                        {option.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Result & Coupon */
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#A78BFA] flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8" />
                </div>

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${badgeColor}`}>
                    {resultLevel}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Diagnóstico Preliminar M&amp;H
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {resultDescription}
                  </p>
                </div>

                {/* Coupon Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 dark:from-white/5 dark:to-white/10 border-2 border-dashed border-[#D97706] text-left flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Tu Cupón de 10€ de Descuento</p>
                      <p className="text-[11px] font-mono font-bold text-[#7C3AED] dark:text-[#A78BFA]">CÓDIGO: TEST10</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded bg-[#7C3AED] text-white font-bold">
                    -10€ Activo
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href="/reservar?coupon=TEST10"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-bold shadow-lg shadow-purple-500/25 transition-all"
                  >
                    <span>Reservar Cita y Aplicar 10€ Dto. →</span>
                  </Link>

                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Repetir el test</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

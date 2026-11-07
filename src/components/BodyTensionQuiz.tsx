'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Gift, 
  RefreshCw, 
  X,
  MessageCircle
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
  let badgeColor = 'text-amber-400 bg-amber-500/20 border-amber-500/30';

  if (totalPoints <= 4) {
    resultLevel = 'Tensión Muscular Leve / Preventiva';
    resultDescription = 'Tu nivel de movilidad es bueno, pero conviene realizar mantenimiento periódico para evitar rigidez acumulada.';
    badgeColor = 'text-teal-300 bg-teal-900/40 border-teal-500/30';
  } else if (totalPoints >= 8) {
    resultLevel = 'Nivel de Tensión y Bloqueo Alto';
    resultDescription = 'Existe sobrecarga acumulada en fascia y articulaciones. Se aconseja una descompresión profunda y evaluación postural presencial en Orcera sin demora.';
    badgeColor = 'text-rose-400 bg-rose-500/20 border-rose-500/30';
  }

  return (
    <>
      {/* Quiz Promo Banner */}
      <div className="rounded-3xl bg-zinc-900 p-6 sm:p-8 text-zinc-100 shadow-2xl border border-zinc-800 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-xl">
            {/* Friendly Avatar Icon */}
            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-teal-950 text-teal-400 border border-teal-500/30 items-center justify-center text-2xl shrink-0 shadow-inner">
              🧘
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-900/40 text-teal-400 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test Interactivo de 30 Segundos</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-50 dark:text-zinc-100">
                ¿Cuál es tu nivel de sobrecarga corporal?
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Responde 3 preguntas rápidas sobre tus hábitos y recibe un diagnóstico funcional preliminar junto a un <strong>Cupón Exclusivo de 10€</strong> para tu primera sesión en Orcera.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              resetQuiz();
              setIsOpen(true);
            }}
            className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition-all active:scale-[0.98] shrink-0 flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>Hacer Test &amp; Conseguir 10€ →</span>
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-zinc-800 shadow-2xl relative text-zinc-100">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!showResult ? (
              <div className="space-y-5">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                    <span>Pregunta {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-zinc-50 dark:text-zinc-100">
                    {questions[currentStep].title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {questions[currentStep].subtitle}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {questions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.points)}
                      className="w-full text-left p-4 rounded-2xl bg-zinc-850/70 hover:bg-zinc-800 border border-zinc-800 hover:border-teal-500/50 transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-teal-400 transition-colors">
                        {option.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Result & Coupon */
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-900/40 text-teal-400 flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8" />
                </div>

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${badgeColor}`}>
                    {resultLevel}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">
                    Diagnóstico Preliminar M&amp;H
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                    {resultDescription}
                  </p>
                </div>

                {/* Coupon Box */}
                <div className="p-4 rounded-2xl bg-zinc-850 border-2 border-dashed border-teal-500/50 text-left flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-100">Tu Cupón de 10€ de Descuento</p>
                      <p className="text-[11px] font-mono font-bold text-teal-400">CÓDIGO: TEST10</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold">
                    -10€ Activo
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href="/reservar?coupon=TEST10"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-600/25 transition-all"
                  >
                    <span>Reservar Cita y Aplicar 10€ Dto. Online →</span>
                  </Link>

                  <a
                    href="https://wa.me/34651308738?text=Hola%20M%26H%20Bienestar%2C%20he%20realizado%20el%20test%20de%20tensi%C3%B3n%20en%20la%20app%20y%20tengo%20el%20cup%C3%B3n%20TEST10%20(-10%E2%82%AC).%20%C2%BFQu%C3%A9%20d%C3%ADa%20y%20hora%20ten%C3%A9is%20libre%20en%20Orcera%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                    <span>Pedir Cita y Canjear 10€ por WhatsApp</span>
                  </a>

                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
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

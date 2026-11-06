'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, X, Sparkles, Share2, ArrowRight, Award, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Prize {
  id: string;
  label: string;
  code: string;
  desc: string;
  color: string;
}

export default function WelcomeRewardWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const prizes: Prize[] = [
    { id: '1', label: '5€ Descuento', code: 'RULETA5', desc: '5€ directos en tu primera reserva online.', color: '#10B981' },
    { id: '2', label: '+10 min Craneal', code: 'CRANEAL10', desc: '10 minutos extra de relajación craneosacral en cabina.', color: '#044E39' },
    { id: '3', label: '50 Puntos Club', code: 'CLUB50', desc: '50 puntos de fidelidad acreditados en tu cuenta.', color: '#D4AF37' },
    { id: '4', label: '10% Pase Amigo', code: 'AMIGO10', desc: '10% de descuento para regalar a un familiar en Orcera.', color: '#059669' },
    { id: '5', label: '15€ Dto. en Bono', code: 'BONO15', desc: '15€ de ahorro en tu bono multisesión.', color: '#0F766E' },
    { id: '6', label: 'Crema Alivio Free', code: 'CREMAFREE', desc: 'Muestra de crema de fitoterapia en tu visita.', color: '#D97706' },
  ];

  const handleSpin = () => {
    if (spinning || alreadyPlayed) return;
    setSpinning(true);

    // Pick random prize index
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prizeSliceAngle = 360 / prizes.length;
    // 5 full rotations + landing slice
    const totalRotation = rotation + (360 * 5) + (360 - (prizeIndex * prizeSliceAngle) - (prizeSliceAngle / 2));
    
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(prizes[prizeIndex]);
      setAlreadyPlayed(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 4000);
  };

  const shareOnWhatsApp = () => {
    if (!wonPrize) return;
    const msg = `¡Acabo de ganar "${wonPrize.label}" en la app del Centro de Bienestar M&H en Orcera! Prueba tu tirada gratis aquí: https://quirosteopatiamh.es`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* Floating Pill Trigger (Mobile and Desktop) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-soft-xl border border-white/50 active:scale-95 transition-all group"
      >
        <span className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-amber-700 shrink-0 group-hover:rotate-12 transition-transform">
          🎁
        </span>
        <span className="tracking-tight">Ruleta de Premios (Tira Gratis)</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-obsidian-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative text-center">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Premios Exclusivos M&amp;H</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Ruleta de Bienvenida
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Gira la ruleta y llévate un premio garantizado para tu bienestar.
              </p>
            </div>

            {/* Wheel Canvas / SVG representation */}
            <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
              {/* Pointer Marker */}
              <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 drop-shadow-md"></div>

              {/* Rotating Circle */}
              <div
                className="w-full h-full rounded-full border-4 border-slate-900 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div 
                  className="w-full h-full rounded-full relative"
                  style={{
                    background: 'conic-gradient(#10B981 0deg 60deg, #044E39 60deg 120deg, #D4AF37 120deg 180deg, #059669 180deg 240deg, #0F766E 240deg 300deg, #D97706 300deg 360deg)'
                  }}
                >
                  {prizes.map((p, idx) => (
                    <div
                      key={p.id}
                      className="absolute top-1/2 left-1/2 text-[10px] font-bold text-white uppercase origin-left pl-7 select-none"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${idx * 60 + 30}deg)`
                      }}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Cap */}
              <button
                onClick={handleSpin}
                disabled={spinning || alreadyPlayed}
                className="absolute z-10 w-16 h-16 rounded-full bg-white dark:bg-obsidian-850 shadow-xl border-4 border-slate-900 flex flex-col items-center justify-center active:scale-95 disabled:opacity-80 font-bold text-xs text-slate-900 dark:text-white hover:bg-slate-100 transition-colors"
              >
                {spinning ? '...' : alreadyPlayed ? 'Listo' : 'GIRAR'}
              </button>
            </div>

            {/* Win Display */}
            {wonPrize ? (
              <div className="space-y-4 animate-scale-in">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                      ¡Enhorabuena! Has ganado:
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      {wonPrize.code}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-emerald-950 dark:text-emerald-100 mt-1">
                    {wonPrize.label}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {wonPrize.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/reservar?coupon=${wonPrize.code}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-soft-sm transition-all"
                  >
                    <span>Canjear Premio al Reservar Cita →</span>
                  </Link>

                  <button
                    onClick={shareOnWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-slate-100 dark:bg-obsidian-800 hover:bg-slate-200 dark:hover:bg-obsidian-750 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-white/10 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir Premio por WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={handleSpin}
                  disabled={spinning || alreadyPlayed}
                  className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-98 transition-all disabled:opacity-50"
                >
                  {spinning ? 'Girando ruleta...' : '¡Girar Ruleta Ahora! 🎯'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

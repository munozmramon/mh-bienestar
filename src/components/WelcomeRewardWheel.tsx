'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, X, Sparkles, Share2, ArrowRight } from 'lucide-react';
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
    { id: '1', label: '5€ DTO', code: 'RULETA5', desc: '5€ directos de descuento en tu primera reserva online.', color: '#044E39' },
    { id: '2', label: '+10 MIN RELAX', code: 'CRANEAL10', desc: '10 minutos extra de relajación craneosacral en cabina.', color: '#10B981' },
    { id: '3', label: '50 PUNTOS', code: 'CLUB50', desc: '50 puntos de fidelidad acreditados en tu cuenta del Club.', color: '#D4AF37' },
    { id: '4', label: '10% AMIGO', code: 'AMIGO10', desc: '10% de descuento para regalar a un familiar en Orcera.', color: '#059669' },
    { id: '5', label: '15€ EN BONO', code: 'BONO15', desc: '15€ de ahorro en la compra de tu bono multisesión.', color: '#0F766E' },
    { id: '6', label: 'CREMA RELAX', code: 'CREMAFREE', desc: 'Muestra de crema de fitoterapia y alivio muscular en tu visita.', color: '#D97706' },
  ];

  const handleSpin = () => {
    if (spinning || alreadyPlayed) return;
    setSpinning(true);

    // Pick random prize index (0 to 5)
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    
    // The top pointer is at 270 degrees (12 o'clock).
    // Slice mid-angle = prizeIndex * 60 + 30.
    // Target angle modulo 360 needed so that (mid-angle + targetAngle) % 360 = 270.
    const sliceMidAngle = prizeIndex * 60 + 30;
    const targetAngle = (270 - sliceMidAngle + 360) % 360;
    
    // Spin 5 full turns (1800 deg) forward + target alignment
    const currentBase = Math.ceil(rotation / 360) * 360;
    const totalRotation = currentBase + 1800 + targetAngle;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(prizes[prizeIndex]);
      setAlreadyPlayed(true);
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 4000);
  };

  const shareOnWhatsApp = () => {
    if (!wonPrize) return;
    const msg = `¡Acabo de ganar "${wonPrize.label}" en la app de M&H Bienestar en Orcera! Gira tu ruleta gratis aquí: https://mh-bienestar.vercel.app`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* Floating Pill Trigger (Positioned cleanly on bottom-right, separated from Viral button) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-soft-xl border border-white/50 active:scale-95 transition-all group"
      >
        <span className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-amber-700 shrink-0 group-hover:rotate-12 transition-transform">
          🎯
        </span>
        <span className="tracking-tight">Ruleta de Premios (Tira Gratis)</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-obsidian-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-2xl relative text-center max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label="Cerrar ruleta"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Premios Exclusivos M&amp;H</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Ruleta de Bienvenida
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gira la ruleta y llévate un premio directo para tu bienestar.
              </p>
            </div>

            {/* SVG Wheel (Mathematical Precision, Centered Text, No Overlap) */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 flex items-center justify-center">
              
              {/* Top Pointer Arrow */}
              <div className="absolute -top-3 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-red-600 drop-shadow-md"></div>

              {/* Rotating Wheel Container */}
              <div
                className="w-full h-full rounded-full border-4 border-slate-900 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1.0)"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {prizes.map((p, idx) => {
                    const startAngle = (idx * 60) * Math.PI / 180;
                    const endAngle = ((idx + 1) * 60) * Math.PI / 180;
                    const x1 = 150 + 145 * Math.cos(startAngle);
                    const y1 = 150 + 145 * Math.sin(startAngle);
                    const x2 = 150 + 145 * Math.cos(endAngle);
                    const y2 = 150 + 145 * Math.sin(endAngle);
                    const midAngleDeg = idx * 60 + 30;

                    return (
                      <g key={p.id}>
                        {/* Sector Wedge */}
                        <path
                          d={`M 150 150 L ${x1} ${y1} A 145 145 0 0 1 ${x2} ${y2} Z`}
                          fill={p.color}
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                        />
                        
                        {/* Text Centered Perfectly in Sector */}
                        <g transform={`rotate(${midAngleDeg} 150 150)`}>
                          <text
                            x="220"
                            y="154"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontWeight="800"
                            textAnchor="middle"
                            letterSpacing="0.04em"
                            className="select-none pointer-events-none drop-shadow-sm font-sans"
                          >
                            {p.label}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Outer Gold Ring */}
                  <circle
                    cx="150"
                    cy="150"
                    r="145"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="5"
                  />
                </svg>
              </div>

              {/* Center Cap Button */}
              <button
                onClick={handleSpin}
                disabled={spinning || alreadyPlayed}
                className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-obsidian-850 shadow-2xl border-4 border-slate-900 flex flex-col items-center justify-center active:scale-95 disabled:opacity-90 font-bold text-xs text-slate-900 dark:text-white hover:bg-slate-50 transition-all cursor-pointer"
              >
                {spinning ? (
                  <span className="text-[11px] animate-pulse">...</span>
                ) : alreadyPlayed ? (
                  <span className="text-[11px] font-bold text-emerald-600">¡Listo!</span>
                ) : (
                  <>
                    <span className="text-[12px] font-extrabold text-[#044E39] dark:text-[#34D399]">GIRAR</span>
                    <span className="text-[9px] text-slate-500 font-semibold">Toca aquí</span>
                  </>
                )}
              </button>
            </div>

            {/* Win Display */}
            {wonPrize ? (
              <div className="space-y-3 pt-1 animate-scale-in">
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                      ¡Enhorabuena! Has ganado:
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      {wonPrize.code}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-emerald-100 mt-0.5">
                    {wonPrize.label}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    {wonPrize.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/reservar?coupon=${wonPrize.code}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-soft-sm transition-all"
                  >
                    <span>Canjear Premio al Reservar Cita →</span>
                  </Link>

                  <button
                    onClick={shareOnWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-2xl bg-slate-100 dark:bg-obsidian-800 hover:bg-slate-200 dark:hover:bg-obsidian-750 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-white/10 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir Premio por WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-1">
                <button
                  onClick={handleSpin}
                  disabled={spinning || alreadyPlayed}
                  className="w-full py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-98 transition-all disabled:opacity-50"
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
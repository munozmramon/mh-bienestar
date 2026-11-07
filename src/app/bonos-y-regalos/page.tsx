'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Copy, 
  Clock, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import confetti from 'canvas-confetti';

export default function BonosYRegalosPage() {
  const { purchaseBono, purchaseGiftCard, verifyAndApplyGiftCard, currentUser } = useStore();

  // State for gift card customizer
  const [giftAmount, setGiftAmount] = useState<number>(50);
  const [recipientName, setRecipientName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('Disfruta de este momento de salud y relajación.');
  const [createdCard, setCreatedCard] = useState<any>(null);

  // State for balance checker
  const [checkCode, setCheckCode] = useState<string>('');
  const [checkResult, setCheckResult] = useState<{ valid: boolean; balance?: number; message: string } | null>(null);

  // State for purchased bono success feedback
  const [bonoSuccess, setBonoSuccess] = useState<any>(null);

  const handleBuyBono = (sessions: number) => {
    const bono = purchaseBono(
      currentUser?.id || 'anon',
      'reeducacion-corporal-y-movilidad',
      sessions,
      sessions === 3 ? 125 : 200
    );
    setBonoSuccess(bono);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleCreateGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !senderName) return;

    const card = purchaseGiftCard({
      amount: giftAmount,
      recipientName,
      recipientEmail: 'regalo@quirosteopatiamh.es',
      senderName,
      senderEmail: currentUser?.email || 'contacto@quirosteopatiamh.es',
      message: giftMessage,
    });
    setCreatedCard(card);
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.7 } });
    } catch (e) {}
  };

  const handleCheckCode = () => {
    if (!checkCode) return;
    const res = verifyAndApplyGiftCard(checkCode);
    setCheckResult(res);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/40 text-teal-600 dark:text-teal-400 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Bienestar Compartido · Orcera</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-50 dark:text-zinc-100">
            Bonos Multisesión &amp; Tarjetas Regalo
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Ahorra en tus tratamientos continuados con nuestros bonos o regala momentos de salud y relajación a tus seres queridos.
          </p>
        </div>

        {/* 1. BONOS SECTION */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">
              Bonos Multisesión (Ahorro Garantizado)
            </h2>
            <p className="text-xs text-zinc-400">
              Válidos para cualquier sesión manual de 50 a 60 min. Sin caducidad prematura (6 meses de vigencia).
            </p>
          </div>

          {bonoSuccess && (
            <div className="p-5 rounded-2xl bg-teal-900/30 border border-teal-500/40 text-zinc-100 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-300">¡Bono adquirido con éxito!</p>
                <p>Se han añadido {bonoSuccess.totalSessions} sesiones a tu cuenta ({bonoSuccess.serviceName}).</p>
              </div>
              <Link
                href="/mi-cuenta"
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors"
              >
                Ver en Mi Cuenta
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bono 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-900/40 text-teal-400 border border-teal-500/30">
                    Ciclo de Inicio
                  </span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                    Ahorras 10€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">Bono 3 Sesiones</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ideal para abordar una sobrecarga puntual o experimentar la transición de bienestar y alineación postural.
                </p>

                <div className="p-4 rounded-2xl bg-zinc-850 border border-zinc-750 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-zinc-50 dark:text-zinc-100">125€</span>
                  <span className="text-xs text-zinc-400 line-through">135€</span>
                  <span className="text-xs text-zinc-400">(41,6€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>3 sesiones completas de 50 a 60 minutos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Caducidad a los 6 meses desde la compra</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Control de sesiones consumidas desde tu portal móvil</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(3)}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-zinc-100 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 transition-colors shadow-sm"
              >
                Adquirir Bono 3 Sesiones (125€)
              </button>
            </div>

            {/* Bono 5 (Recomendado) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border-2 border-teal-500 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-600 text-white">
                    Tratamiento Integral
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    Ahorras 25€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">Bono 5 Sesiones</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  La opción más elegida para consolidar cambios posturales duraderos y mantenimiento preventivo mensual.
                </p>

                <div className="p-4 rounded-2xl bg-zinc-850 border border-zinc-750 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-zinc-50 dark:text-zinc-100">200€</span>
                  <span className="text-xs text-zinc-400 line-through">225€</span>
                  <span className="text-xs text-zinc-400">(40€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>5 sesiones individuales con evaluación continua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Transferible a un familiar si lo deseas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Prioridad en agenda para horarios de tarde</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(5)}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-lg shadow-teal-600/30 relative z-10"
              >
                Adquirir Bono 5 Sesiones (200€)
              </button>
            </div>

          </div>
        </div>

        {/* 2. TARJETAS REGALO DIGITALES */}
        <div className="pt-10 border-t border-zinc-800 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">
              Personaliza tu Tarjeta Regalo Digital
            </h2>
            <p className="text-xs text-zinc-400">
              Genera una tarjeta elegante al instante para enviar por WhatsApp o correo electrónico con tu dedicatoria.
            </p>
          </div>

          {/* Visual Gift Showcase Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 via-zinc-900 to-amber-950/30 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🎁
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-zinc-100">
                  Un Regalo Inolvidable de Salud y Desconexión en Orcera
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Tu ser querido recibe una tarjeta con tu dedicatoria, canjeable en cabina privada de quiromasaje y bienestar.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="text-[11px] font-bold text-teal-300 bg-teal-950 px-3 py-1 rounded-full border border-teal-500/30">
                Envío por WhatsApp o Email
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <form onSubmit={handleCreateGiftCard} className="lg:col-span-6 bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-sm space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Importe del Regalo
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[45, 90, 125, 200].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setGiftAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        giftAmount === amt
                          ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                          : 'bg-zinc-850 text-zinc-300 border-zinc-750 hover:bg-zinc-800'
                      }`}
                    >
                      {amt}€
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">De parte de (Remitente)</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Para (Destinatario)</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nombre de la persona"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Dedicatoria personalizada</label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/25 transition-all"
              >
                Generar Tarjeta Regalo ({giftAmount}€)
              </button>
            </form>

            {/* Live Visual Card Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-zinc-100 shadow-2xl border border-zinc-800 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-600/50 flex items-center justify-center text-teal-300 font-serif font-bold text-sm">
                      M&amp;H
                    </div>
                    <div>
                      <p className="font-serif font-bold text-zinc-100 text-sm">M&amp;H BIENESTAR</p>
                      <p className="text-[10px] text-teal-400">Tarjeta Regalo de Bienestar</p>
                    </div>
                  </div>

                  <span className="font-serif text-2xl font-bold text-teal-400">{giftAmount}€</span>
                </div>

                <div className="py-6 space-y-3">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Para:</span>
                    <p className="font-serif text-xl font-bold text-zinc-100">{recipientName || 'Nombre del destinatario'}</p>
                  </div>

                  <p className="text-xs text-zinc-300 italic bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                    &ldquo;{giftMessage}&rdquo;
                  </p>

                  <div className="flex justify-between text-[11px] text-zinc-400 pt-2">
                    <span>De: <strong className="text-zinc-200">{senderName || 'Tu nombre'}</strong></span>
                    <span>Válida por 1 año en Orcera</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-zinc-400">Código canjeable al reservar:</span>
                  <span className="font-mono font-bold text-amber-400 tracking-wider">
                    {createdCard ? createdCard.code : 'REGALO-MH-2026-XXXX'}
                  </span>
                </div>
              </div>

              {createdCard && (
                <div className="p-4 rounded-2xl bg-teal-900/30 border border-teal-500/40 text-xs text-zinc-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-teal-300">¡Tarjeta Regalo creada con código: {createdCard.code}!</p>
                    <p className="text-[11px] text-zinc-300">Ya puedes enviárselo al afortunado/a.</p>
                  </div>
                  <a
                    href={`https://wa.me/?text=¡Hola%20${encodeURIComponent(recipientName)}!%20Te%20he%20regalado%20una%20tarjeta%20de%20bienestar%20en%20M%26H%20Bienestar%20Orcera%20por%20valor%20de%20${giftAmount}€.%20Código:%20${createdCard.code}.%20Reserva%20aquí:%20https://mh-bienestar.vercel.app/reservar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-colors"
                  >
                    Enviar WhatsApp
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. COMPROBADOR DE SALDO */}
        <div className="max-w-md mx-auto p-6 bg-zinc-900 rounded-3xl border border-zinc-800 text-center space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-zinc-50 dark:text-zinc-100">
            ¿Tienes una Tarjeta Regalo? Consulta su saldo
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. REGALO-MH-2026-789"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleCheckCode}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              Comprobar
            </button>
          </div>

          {checkResult && (
            <p className={`text-xs font-medium ${checkResult.valid ? 'text-teal-400' : 'text-rose-400'}`}>
              {checkResult.message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

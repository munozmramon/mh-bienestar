'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Send, 
  Check, 
  Search,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BonosYRegalosPage() {
  const { 
    currentUser, 
    services, 
    purchaseBono, 
    purchaseGiftCard, 
    verifyAndApplyGiftCard 
  } = useStore();

  // Bono selection
  const [selectedBonoSessions, setSelectedBonoSessions] = useState<3 | 5>(5);
  const [bonoSuccess, setBonoSuccess] = useState<any>(null);

  // Gift Card State
  const [giftAmount, setGiftAmount] = useState<number>(45);
  const [senderName, setSenderName] = useState<string>(currentUser?.name || '');
  const [senderEmail, setSenderEmail] = useState<string>(currentUser?.email || '');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('¡Disfruta de este momento de calma y bienestar para ti!');
  const [createdCard, setCreatedCard] = useState<any>(null);

  // Card Balance Checker
  const [checkCode, setCheckCode] = useState<string>('');
  const [checkResult, setCheckResult] = useState<any>(null);

  const availableServices = services.filter(s => s.available);

  // Buy Bono
  const handleBuyBono = (sessions: 3 | 5) => {
    if (!currentUser) {
      alert("Por favor, identifícate en el portal cliente para vincular tu bono.");
      return;
    }

    const price = sessions === 3 ? 125 : 200;
    const defaultService = availableServices[0] || services[0];
    const newBono = purchaseBono(currentUser.id, defaultService.id, sessions, price);
    setBonoSuccess(newBono);

    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (e) {}
  };

  // Buy Gift Card
  const handleCreateGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !senderName) {
      alert("Por favor, completa los nombres de remitente y destinatario.");
      return;
    }

    const card = purchaseGiftCard({
      amount: giftAmount,
      senderName,
      senderEmail: senderEmail || 'cliente@mh-bienestar.es',
      recipientName,
      recipientEmail: recipientEmail || 'amigo@mh-bienestar.es',
      message: giftMessage
    });

    setCreatedCard(card);
    try {
      confetti({ particleCount: 80, spread: 80 });
    } catch (e) {}
  };

  // Check Card
  const handleCheckCode = () => {
    if (!checkCode) return;
    const res = verifyAndApplyGiftCard(checkCode);
    setCheckResult(res);
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] dark:bg-[#0F0A1C] text-slate-900 dark:text-purple-100 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-[#3B1238] dark:text-purple-200 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Bienestar Compartido · Orcera</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B1238] dark:text-white">
            Bonos Multisesión &amp; Tarjetas Regalo
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-purple-300/80 leading-relaxed">
            Ahorra en tus tratamientos continuados con nuestros bonos o regala momentos de salud y relajación a tus seres queridos.
          </p>
        </div>

        {/* 1. BONOS SECTION */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold text-[#3B1238] dark:text-white">
              Bonos Multisesión (Ahorro Garantizado)
            </h2>
            <p className="text-xs text-slate-600 dark:text-purple-300/80">
              Válidos para cualquier sesión manual de 50 a 60 min. Sin caducidad prematura (6 meses de vigencia).
            </p>
          </div>

          {bonoSuccess && (
            <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold">¡Bono adquirido con éxito!</p>
                <p>Se han añadido {bonoSuccess.totalSessions} sesiones a tu cuenta ({bonoSuccess.serviceName}).</p>
              </div>
              <Link
                href="/mi-cuenta"
                className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold"
              >
                Ver en Mi Cuenta
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bono 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A132E] border border-slate-200 dark:border-purple-900/40 shadow-soft-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#3B1238] dark:text-purple-200">
                    Ciclo de Inicio
                  </span>
                  <span className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 font-bold">
                    Ahorras 10€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#3B1238] dark:text-white">Bono 3 Sesiones</h3>
                <p className="text-xs text-slate-600 dark:text-purple-300/80 leading-relaxed">
                  Ideal para abordar una sobrecarga puntual o experimentar la transición de bienestar y alineación postural.
                </p>

                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#3B1238] dark:text-white">125€</span>
                  <span className="text-xs text-slate-400 line-through">135€</span>
                  <span className="text-xs text-slate-500 dark:text-purple-300/70">(41,6€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-purple-300/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>3 sesiones completas de 50 a 60 minutos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Caducidad a los 6 meses desde la compra</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Control de sesiones consumidas desde tu portal móvil</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(3)}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#3B1238] hover:bg-[#270925] transition-colors shadow-soft-sm"
              >
                Adquirir Bono 3 Sesiones (125€)
              </button>
            </div>

            {/* Bono 5 (Recomendado) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#3B1238] to-[#1A132E] text-white shadow-soft-xl border-2 border-[#7C3AED] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950">
                    Tratamiento Integral
                  </span>
                  <span className="text-xs font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded border border-amber-300/30">
                    Ahorras 25€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white">Bono 5 Sesiones</h3>
                <p className="text-xs text-purple-200/90 leading-relaxed">
                  La opción más elegida para consolidar cambios posturales duraderos y mantenimiento preventivo mensual.
                </p>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-white">200€</span>
                  <span className="text-xs text-purple-200 line-through">225€</span>
                  <span className="text-xs text-purple-200/80">(40€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-purple-200/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>5 sesiones individuales con evaluación continua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Transferible a un familiar si lo deseas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Prioridad en agenda para horarios de tarde</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(5)}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors shadow-lg shadow-purple-900/40 relative z-10"
              >
                Adquirir Bono 5 Sesiones (200€)
              </button>
            </div>

          </div>
        </div>

        {/* 2. TARJETAS REGALO DIGITALES */}
        <div className="pt-10 border-t border-slate-200 dark:border-purple-900/30 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1238] dark:text-white">
              Personaliza tu Tarjeta Regalo Digital
            </h2>
            <p className="text-xs text-slate-600 dark:text-purple-300/80">
              Genera una tarjeta elegante al instante para enviar por WhatsApp o correo electrónico con tu dedicatoria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <form onSubmit={handleCreateGiftCard} className="lg:col-span-6 bg-white dark:bg-[#1A132E] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-purple-900/40 shadow-soft-sm space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-purple-200 uppercase tracking-wider mb-2">
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
                          ? 'bg-[#7C3AED] text-white border-[#7C3AED] font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-[#0F0A1C] text-slate-700 dark:text-purple-200 border-slate-200 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                      }`}
                    >
                      {amt}€
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">De parte de (Remitente)</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Para (Destinatario)</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nombre de la persona"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">Dedicatoria personalizada</label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-600/30 transition-all"
              >
                Generar Tarjeta Regalo ({giftAmount}€)
              </button>
            </form>

            {/* Live Visual Card Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#3B1238] via-[#270925] to-[#1A132E] text-white shadow-soft-xl border border-purple-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-purple-800/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-600/50 flex items-center justify-center text-amber-300 font-serif font-bold text-sm">
                      M&amp;H
                    </div>
                    <div>
                      <p className="font-serif font-bold text-white text-sm">M&amp;H BIENESTAR</p>
                      <p className="text-[10px] text-purple-300">Tarjeta Regalo de Bienestar</p>
                    </div>
                  </div>

                  <span className="font-serif text-2xl font-bold text-amber-300">{giftAmount}€</span>
                </div>

                <div className="py-6 space-y-3">
                  <div>
                    <span className="text-[10px] text-purple-300 uppercase tracking-wider">Para:</span>
                    <p className="font-serif text-xl font-bold text-white">{recipientName || 'Nombre del destinatario'}</p>
                  </div>

                  <p className="text-xs text-purple-200/90 italic bg-white/10 p-3 rounded-xl border border-purple-800/60">
                    &ldquo;{giftMessage}&rdquo;
                  </p>

                  <div className="flex justify-between text-[11px] text-purple-300 pt-2">
                    <span>De: <strong>{senderName || 'Tu nombre'}</strong></span>
                    <span>Válida por 1 año en Orcera</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-800/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-purple-300">Código canjeable al reservar:</span>
                  <span className="font-mono font-bold text-amber-300 tracking-wider">
                    {createdCard ? createdCard.code : 'REGALO-MH-2026-XXXX'}
                  </span>
                </div>
              </div>

              {createdCard && (
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-950 dark:text-purple-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold">¡Tarjeta Regalo creada con código: {createdCard.code}!</p>
                    <p className="text-[11px]">Ya puedes enviárselo al afortunado/a.</p>
                  </div>
                  <a
                    href={`https://wa.me/?text=¡Hola%20${encodeURIComponent(recipientName)}!%20Te%20he%20regalado%20una%20tarjeta%20de%20bienestar%20en%20M%26H%20Bienestar%20Orcera%20por%20valor%20de%20${giftAmount}€.%20Código:%20${createdCard.code}.%20Reserva%20aquí:%20https://mh-bienestar.vercel.app/reservar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold"
                  >
                    Enviar WhatsApp
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. COMPROBADOR DE SALDO */}
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#1A132E] rounded-3xl border border-slate-200 dark:border-purple-900/40 text-center space-y-4 shadow-soft-sm">
          <h3 className="font-serif text-lg font-bold text-[#3B1238] dark:text-white">
            ¿Tienes una Tarjeta Regalo? Consulta su saldo
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. REGALO-MH-2026-789"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
            <button
              onClick={handleCheckCode}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
            >
              Comprobar
            </button>
          </div>

          {checkResult && (
            <p className={`text-xs font-medium ${checkResult.valid ? 'text-[#7C3AED] dark:text-[#A78BFA]' : 'text-rose-700 dark:text-rose-400'}`}>
              {checkResult.message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

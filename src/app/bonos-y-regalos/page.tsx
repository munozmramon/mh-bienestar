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
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-forest-800 border border-sage-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Bienestar Compartido · Orcera</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950">
            Bonos Multisesión &amp; Tarjetas Regalo
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/80 leading-relaxed">
            Ahorra en tus tratamientos continuados con nuestros bonos o regala momentos de salud y relajación a tus seres queridos.
          </p>
        </div>

        {/* 1. BONOS SECTION */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Bonos Multisesión (Ahorro Garantizado)
            </h2>
            <p className="text-xs text-forest-600">
              Válidos para cualquier sesión manual de 50 a 60 min. Sin caducidad prematura (6 meses de vigencia).
            </p>
          </div>

          {bonoSuccess && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold">¡Bono adquirido con éxito!</p>
                <p>Se han añadido {bonoSuccess.totalSessions} sesiones a tu cuenta ({bonoSuccess.serviceName}).</p>
              </div>
              <Link
                href="/mi-cuenta"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white font-semibold"
              >
                Ver en Mi Cuenta
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bono 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-warm-300 shadow-soft-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-warm-100 text-forest-800">
                    Ciclo de Inicio
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Ahorras 10€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-forest-950">Bono 3 Sesiones</h3>
                <p className="text-xs text-forest-700 leading-relaxed">
                  Ideal para abordar una sobrecarga puntual o experimentar la transición de bienestar y alineación postural.
                </p>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-forest-950">125€</span>
                  <span className="text-xs text-forest-500 line-through">135€</span>
                  <span className="text-xs text-forest-600">(41,6€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-forest-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                    <span>3 sesiones completas de 50 a 60 minutos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                    <span>Caducidad a los 6 meses desde la compra</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                    <span>Control de sesiones consumidas desde tu portal móvil</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(3)}
                className="w-full py-3.5 rounded-xl text-xs font-semibold text-forest-900 bg-warm-200 hover:bg-warm-300 transition-colors shadow-soft-sm"
              >
                Adquirir Bono 3 Sesiones (125€)
              </button>
            </div>

            {/* Bono 5 (Recomendado) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-warm-100 shadow-soft-xl border border-forest-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold-500 text-forest-950">
                    Tratamiento Integral
                  </span>
                  <span className="text-xs font-bold text-gold-300 bg-forest-800 px-2 py-0.5 rounded border border-gold-400/30">
                    Ahorras 25€
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-warm-50">Bono 5 Sesiones</h3>
                <p className="text-xs text-sage-200 leading-relaxed">
                  La opción más elegida para consolidar cambios posturales duraderos y mantenimiento preventivo mensual.
                </p>

                <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-700 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-gold-300">200€</span>
                  <span className="text-xs text-sage-400 line-through">225€</span>
                  <span className="text-xs text-sage-200">(40€ / sesión)</span>
                </div>

                <ul className="space-y-2 text-xs text-sage-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>5 sesiones individuales con evaluación continua</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>Transferible a un familiar si lo deseas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>Prioridad en agenda para horarios de tarde</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleBuyBono(5)}
                className="w-full py-3.5 rounded-xl text-xs font-semibold text-forest-950 bg-gold-400 hover:bg-gold-300 transition-colors shadow-soft-md relative z-10"
              >
                Adquirir Bono 5 Sesiones (200€)
              </button>
            </div>

          </div>
        </div>

        {/* 2. TARJETAS REGALO DIGITALES */}
        <div className="pt-10 border-t border-warm-300 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Personaliza tu Tarjeta Regalo Digital
            </h2>
            <p className="text-xs text-forest-600">
              Genera una tarjeta elegante al instante para enviar por WhatsApp o correo electrónico con tu dedicatoria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <form onSubmit={handleCreateGiftCard} className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-warm-300 shadow-soft-sm space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-2">
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
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-warm-50 text-forest-700 border-warm-300 hover:bg-warm-100'
                      }`}
                    >
                      {amt}€
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-700 mb-1">De parte de (Remitente)</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-700 mb-1">Para (Destinatario)</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nombre de la persona"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Dedicatoria personalizada</label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm transition-all"
              >
                Generar Tarjeta Regalo ({giftAmount}€)
              </button>
            </form>

            {/* Live Visual Card Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 text-warm-100 shadow-soft-xl border border-gold-400/40 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-forest-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-forest-800 border border-gold-400/50 flex items-center justify-center text-gold-300 font-serif font-bold text-sm">
                      M&amp;H
                    </div>
                    <div>
                      <p className="font-serif font-bold text-warm-50 text-sm">M&amp;H BIENESTAR</p>
                      <p className="text-[10px] text-sage-300">Tarjeta Regalo de Bienestar</p>
                    </div>
                  </div>

                  <span className="font-serif text-2xl font-bold text-gold-300">{giftAmount}€</span>
                </div>

                <div className="py-6 space-y-3">
                  <div>
                    <span className="text-[10px] text-sage-400 uppercase tracking-wider">Para:</span>
                    <p className="font-serif text-xl font-bold text-warm-100">{recipientName || 'Nombre del destinatario'}</p>
                  </div>

                  <p className="text-xs text-sage-200/90 italic bg-white/5 p-3 rounded-xl border border-forest-700/60">
                    &ldquo;{giftMessage}&rdquo;
                  </p>

                  <div className="flex justify-between text-[11px] text-sage-400 pt-2">
                    <span>De: <strong>{senderName || 'Tu nombre'}</strong></span>
                    <span>Válida por 1 año en Orcera</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-forest-700 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-sage-400">Código canjeable al reservar:</span>
                  <span className="font-mono font-bold text-gold-300 tracking-wider">
                    {createdCard ? createdCard.code : 'REGALO-MH-2026-XXXX'}
                  </span>
                </div>
              </div>

              {createdCard && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                  <div>
                    <p className="font-bold">¡Tarjeta Regalo creada con código: {createdCard.code}!</p>
                    <p className="text-[11px]">Ya puedes enviárselo al afortunado/a.</p>
                  </div>
                  <a
                    href={`https://wa.me/?text=¡Hola%20${encodeURIComponent(recipientName)}!%20Te%20he%20regalado%20una%20tarjeta%20de%20bienestar%20en%20M%26H%20Bienestar%20Orcera%20por%20valor%20de%20${giftAmount}€.%20Código:%20${createdCard.code}.%20Reserva%20aquí:%20https://quirosteopatiamh.es/reservar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold"
                  >
                    Enviar WhatsApp
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. COMPROBADOR DE SALDO */}
        <div className="max-w-md mx-auto p-6 bg-white rounded-3xl border border-warm-300 text-center space-y-4 shadow-soft-sm">
          <h3 className="font-serif text-lg font-bold text-forest-950">
            ¿Tienes una Tarjeta Regalo? Consulta su saldo
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. REGALO-MH-2026-789"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900 uppercase font-mono"
            />
            <button
              onClick={handleCheckCode}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white hover:bg-forest-700"
            >
              Comprobar
            </button>
          </div>

          {checkResult && (
            <p className={`text-xs font-medium ${checkResult.valid ? 'text-emerald-700' : 'text-rose-700'}`}>
              {checkResult.message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

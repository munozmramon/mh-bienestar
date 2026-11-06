'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  User as UserIcon, 
  Calendar, 
  Clock, 
  Gift, 
  Users, 
  QrCode, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  Trash2, 
  AlertTriangle,
  Award,
  Sparkles,
  ChevronRight,
  MessageCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import QRCode from 'qrcode';

export default function MiCuentaPage() {
  const { 
    currentUser, 
    loginAs,
    appointments, 
    bonos, 
    referrals, 
    loyaltyRewards, 
    redeemLoyaltyReward,
    cancelAppointment, 
    rescheduleAppointment,
    exportClientDataJSON,
    deleteClientDataRGPD,
    businessConfig 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'citas' | 'bonos' | 'referidos' | 'privacidad'>('citas');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('2026-11-09');
  const [newSlot, setNewSlot] = useState('11:00');
  const [actionMessage, setActionMessage] = useState<string>('');

  // If no user is logged in, show demo selector or quick login
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-forest-800 text-gold-300 flex items-center justify-center mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">Portal de Clientes M&amp;H</h2>
        <p className="text-sm text-forest-600 max-w-md mb-6">
          Inicia sesión para gestionar tus próximas citas, revisar tus bonos activos y canjear tus puntos de fidelización.
        </p>

        <div className="space-y-3 w-full max-w-xs">
          <button
            onClick={() => loginAs('maria.garcia@email.com')}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm transition-all"
          >
            Acceder como María García (Cliente Demo)
          </button>
          <button
            onClick={() => loginAs('carlos.ruiz@email.com')}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-forest-800 bg-warm-200 hover:bg-warm-300 transition-all"
          >
            Acceder como Carlos Ruiz (Cliente Demo)
          </button>
        </div>
      </div>
    );
  }

  // Filter user records
  const userAppointments = appointments.filter(a => a.clientId === currentUser.id);
  const upcomingAppointments = userAppointments.filter(a => a.status === 'confirmed');
  const pastAppointments = userAppointments.filter(a => a.status === 'completed' || a.status === 'cancelled');
  const userBonos = bonos.filter(b => b.clientId === currentUser.id);
  const userReferrals = referrals.filter(r => r.referrerClientId === currentUser.id);

  // Generate Referral QR Code
  const referralCode = currentUser.referralCode || `MH-${currentUser.name.split(' ')[0].toUpperCase()}-26`;
  const referralUrl = `https://quirosteopatiamh.es/reservar?ref=${referralCode}`;

  useEffect(() => {
    QRCode.toDataURL(referralUrl, { width: 220, margin: 1, color: { dark: '#1C2F23', light: '#FAF8F5' } })
      .then(url => setQrDataUrl(url))
      .catch(err => console.warn(err));
  }, [referralUrl]);

  const copyToClipboard = (text: string, isLink: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCancel = (appointmentId: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita? Recuerda la política de 24h de aviso.')) {
      const res = cancelAppointment(appointmentId);
      setActionMessage(res.message);
    }
  };

  const handleReschedule = () => {
    if (!showRescheduleModal) return;
    const res = rescheduleAppointment(showRescheduleModal, newDate, newSlot);
    setActionMessage(res.message);
    if (res.success) {
      setShowRescheduleModal(null);
    }
  };

  const handleDownloadData = () => {
    const jsonStr = exportClientDataJSON(currentUser.id);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mh-bienestar-datos-${currentUser.id}.json`;
    a.click();
  };

  const handleDeleteAccount = () => {
    if (confirm('ATENCIÓN: Se eliminarán de forma definitiva todos tus datos, historial y puntos según el RGPD. ¿Confirmar supresión?')) {
      deleteClientDataRGPD(currentUser.id);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Header Card */}
        <div className="rounded-3xl bg-white border border-warm-300 p-6 sm:p-8 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-800 text-gold-300 flex items-center justify-center font-serif text-2xl font-bold border border-gold-400/30">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                  Socio M&amp;H
                </span>
              </div>
              <p className="text-xs text-forest-600 mt-0.5">
                {currentUser.email} · Tel: {currentUser.phone}
              </p>
            </div>
          </div>

          {/* Points & Level Widget */}
          <div className="flex items-center gap-4 bg-warm-100/80 p-3.5 sm:p-4 rounded-2xl border border-warm-200">
            <div>
              <span className="text-[11px] font-medium text-forest-600 uppercase tracking-wider">
                Puntos Acumulados
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-700">
                {currentUser.loyaltyPoints || 0} <span className="text-xs font-sans text-forest-600">pts</span>
              </p>
            </div>

            <button
              onClick={() => setActiveTab('referidos')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 transition-colors shadow-soft-sm"
            >
              Canjear Premios
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="p-4 rounded-2xl bg-sage-100 border border-sage-300 text-forest-800 text-xs flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage('')} className="font-bold">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-warm-300 pb-2 overflow-x-auto">
          {[
            { id: 'citas', label: `Mis Citas (${upcomingAppointments.length})`, icon: Calendar },
            { id: 'bonos', label: `Mis Bonos (${userBonos.length})`, icon: Gift },
            { id: 'referidos', label: 'Invita & Gana (Puntos)', icon: Users },
            { id: 'privacidad', label: 'Privacidad RGPD', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-soft-sm'
                    : 'bg-white text-forest-700 hover:bg-warm-200 border border-warm-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: CITAS */}
        {activeTab === 'citas' && (
          <div className="space-y-8">
            
            {/* Próximas Citas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-forest-950">Próximas Sesiones Agendadas</h3>
                <Link
                  href="/reservar"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-gold-700 underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Pedir nueva cita</span>
                </Link>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="p-8 rounded-3xl bg-white border border-warm-300 text-center space-y-3">
                  <p className="text-xs text-forest-600">No tienes citas programadas actualmente.</p>
                  <Link
                    href="/reservar"
                    className="inline-block px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest-800"
                  >
                    Agendar mi próxima sesión
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Confirmada
                          </span>
                          <span className="text-xs font-bold text-forest-900">{apt.price}€</span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-forest-950">{apt.serviceName}</h4>
                        <div className="text-xs text-forest-600 space-y-1">
                          <p className="flex items-center gap-1.5 font-medium text-forest-900">
                            <Calendar className="w-3.5 h-3.5 text-gold-600" />
                            {apt.date} a las {apt.timeSlot} h
                          </p>
                          <p className="text-[11px]">Ubicación: Calle San José, 2, Orcera</p>
                          {apt.notes && <p className="italic text-[11px]">Nota: &ldquo;{apt.notes}&rdquo;</p>}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-warm-200 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => {
                            setShowRescheduleModal(apt.id);
                            setNewDate(apt.date);
                          }}
                          className="px-3 py-1.5 rounded-lg text-forest-800 bg-warm-100 hover:bg-warm-200 font-medium inline-flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reprogramar</span>
                        </button>
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 font-medium inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Cancelar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Historial Pasado */}
            {pastAppointments.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-warm-300">
                <h3 className="font-serif text-xl font-bold text-forest-950">Historial de Visitas</h3>
                <div className="bg-white rounded-2xl border border-warm-300 overflow-hidden text-xs">
                  <div className="divide-y divide-warm-200">
                    {pastAppointments.map((apt) => (
                      <div key={apt.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-forest-900">{apt.serviceName}</p>
                          <p className="text-forest-600 text-[11px]">{apt.date} a las {apt.timeSlot} h</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            apt.status === 'completed' ? 'bg-sage-100 text-forest-800' : 'bg-warm-100 text-warm-500 line-through'
                          }`}>
                            {apt.status === 'completed' ? 'Realizada' : 'Cancelada'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: BONOS */}
        {activeTab === 'bonos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-950">Tus Bonos Multisesión</h3>
                <p className="text-xs text-forest-600">Control de sesiones consumidas y caducidad.</p>
              </div>
              <Link
                href="/bonos-y-regalos"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm"
              >
                Comprar Nuevo Bono
              </Link>
            </div>

            {userBonos.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border border-warm-300 text-center space-y-3">
                <p className="text-xs text-forest-600">Actualmente no dispones de ningún bono activo.</p>
                <Link
                  href="/bonos-y-regalos"
                  className="inline-block px-5 py-2.5 rounded-xl text-xs font-semibold text-forest-900 bg-gold-400 hover:bg-gold-300"
                >
                  Ver Bonos de 3 y 5 Sesiones (con descuento)
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userBonos.map((bono) => {
                  const used = bono.totalSessions - bono.remainingSessions;
                  const progressPct = Math.round((used / bono.totalSessions) * 100);

                  return (
                    <div key={bono.id} className="p-6 rounded-3xl bg-white border border-warm-300 shadow-soft-sm space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-100 text-gold-800 uppercase">
                            Bono {bono.totalSessions} Sesiones
                          </span>
                          <h4 className="font-serif text-lg font-bold text-forest-950 mt-1">{bono.serviceName}</h4>
                        </div>
                        <span className="text-xs font-bold text-forest-900">{bono.remainingSessions} disponibles</span>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-forest-600 mb-1">
                          <span>Sesiones usadas: {used} de {bono.totalSessions}</span>
                          <span className="font-semibold">{bono.remainingSessions} restantes</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-warm-200 overflow-hidden">
                          <div
                            className="h-full bg-forest-800 rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-xs text-forest-500 flex justify-between pt-2 border-t border-warm-100">
                        <span>Adquirido: {bono.purchaseDate}</span>
                        <span>Caduca: <strong>{bono.expiresAt}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REFERIDOS & PUNTOS VIRALES (PRIORITARIO) */}
        {activeTab === 'referidos' && (
          <div className="space-y-8">
            
            {/* Viral Share Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-warm-100 shadow-soft-xl border border-forest-800">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest-800 text-gold-300 border border-gold-400/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tu Enlace de Amigo M&amp;H</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warm-50">
                    Gana 15€ (150 pts) por cada amigo que cuide su bienestar
                  </h3>

                  <p className="text-xs sm:text-sm text-sage-200 leading-relaxed">
                    Comparte tu código personal. Tu amigo recibirá <strong>10€ de bienvenida</strong> en su primera sesión en Orcera, y cuando la complete, tú sumarás <strong>150 puntos</strong> automáticos.
                  </p>

                  {/* Share code box */}
                  <div className="p-3 rounded-2xl bg-forest-950/80 border border-forest-700/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-sage-400 uppercase tracking-wider">Tu Código Exclusivo</span>
                      <p className="font-mono text-lg font-bold text-gold-300">{referralCode}</p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(referralCode, false)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-forest-800 hover:bg-forest-700 text-warm-100 inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  {/* 1-Click WhatsApp Share */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/?text=¡Hola!%20Te%20recomiendo%20Centro%20Parasanitario%20M%26H%20Bienestar%20en%20Orcera.%20Con%20mi%20código%20${referralCode}%20tienes%2010€%20de%20descuento%20en%20tu%20primera%20reserva%20desde%20su%20web:%20${encodeURIComponent(referralUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-soft-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Compartir por WhatsApp</span>
                    </a>

                    <button
                      onClick={() => copyToClipboard(referralUrl, true)}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium bg-forest-800 hover:bg-forest-700 text-sage-200 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copiedLink ? 'Enlace copiado' : 'Copiar enlace directo'}</span>
                    </button>
                  </div>
                </div>

                {/* QR Code Presentation */}
                <div className="md:col-span-5 flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-forest-700">
                  <p className="text-xs font-semibold text-gold-300 mb-2 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4" />
                    <span>Muestra este QR en persona</span>
                  </p>
                  {qrDataUrl && (
                    <div className="p-3 bg-warm-50 rounded-2xl shadow-soft-md">
                      <img src={qrDataUrl} alt="QR Código Amigo M&H" className="w-36 h-36" />
                    </div>
                  )}
                  <p className="text-[11px] text-sage-300 mt-2 max-w-[200px]">
                    Tu amigo solo tiene que enfocar con la cámara de su móvil para reservar.
                  </p>
                </div>

              </div>
            </div>

            {/* Loyalty Rewards Catalog */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-forest-950">
                Catálogo de Premios Canjeables con Puntos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loyaltyRewards.map((reward) => {
                  const currentPoints = currentUser.loyaltyPoints || 0;
                  const canRedeem = currentPoints >= reward.pointsRequired;

                  return (
                    <div
                      key={reward.id}
                      className="p-5 rounded-3xl bg-white border border-warm-300 shadow-soft-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                            {reward.pointsRequired} Puntos
                          </span>
                          <Award className="w-4 h-4 text-gold-500" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-forest-950">{reward.title}</h4>
                        <p className="text-xs text-forest-600 leading-relaxed">{reward.description}</p>
                      </div>

                      <button
                        disabled={!canRedeem}
                        onClick={() => {
                          const res = redeemLoyaltyReward(currentUser.id, reward.id);
                          setActionMessage(res.message);
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          canRedeem
                            ? 'bg-forest-800 text-white hover:bg-forest-700 shadow-soft-sm'
                            : 'bg-warm-100 text-warm-400 cursor-not-allowed'
                        }`}
                      >
                        {canRedeem ? 'Canjear Premio' : `Faltan ${reward.pointsRequired - currentPoints} pts`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Referred Friends Tracking */}
            <div className="space-y-4 pt-4 border-t border-warm-300">
              <h3 className="font-serif text-xl font-bold text-forest-950">Amigos Recomendados</h3>
              {userReferrals.length === 0 ? (
                <p className="text-xs text-forest-600">Aún no has invitado a ningún conocido. ¡Comparte tu código arriba!</p>
              ) : (
                <div className="bg-white rounded-2xl border border-warm-300 divide-y divide-warm-200 text-xs">
                  {userReferrals.map((ref) => (
                    <div key={ref.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-forest-900">{ref.referredName}</p>
                        <p className="text-forest-500 text-[11px]">{ref.referredEmail}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sage-100 text-forest-800">
                          {ref.status === 'first_booking_completed' ? 'Cita completada (+150 pts)' : 'Registrado (Pendiente cita)'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: PRIVACIDAD Y RGPD */}
        {activeTab === 'privacidad' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-warm-300 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                <span>Tus Derechos de Privacidad (RGPD &amp; LOPDGDD)</span>
              </h3>
              <p className="text-xs text-forest-600 mt-1 leading-relaxed">
                En el Centro Parasanitario M&amp;H custodiamos tus datos con máxima confidencialidad y control absoluto por tu parte.
              </p>
            </div>

            {/* Portability / Export */}
            <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-forest-900">Derecho a la Portabilidad</p>
                <p className="text-[11px] text-forest-600">Descarga un archivo JSON estructurado con todos tus datos, citas y bonos.</p>
              </div>
              <button
                onClick={handleDownloadData}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-warm-300 hover:bg-warm-100 text-forest-800 inline-flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>
            </div>

            {/* Right to be forgotten */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-rose-900">Derecho de Supresión (Al Olvido)</p>
                <p className="text-[11px] text-rose-700">Elimina tu perfil, citas e historial comercial de nuestros servidores de forma irrevocable.</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white inline-flex items-center gap-1.5 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar mis datos</span>
              </button>
            </div>

            <div className="text-[11px] text-forest-500 space-y-1">
              <p>Responsable del tratamiento: Centro Parasanitario M&amp;H (Orcera, Jaén).</p>
              <p>Para ejercitar otros derechos o contactar con el delegado de protección de datos: info@quirosteopatiamh.es.</p>
            </div>
          </div>
        )}

      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-soft-xl border border-warm-300">
            <h4 className="font-serif text-lg font-bold text-forest-900">Reprogramar Cita</h4>
            <p className="text-xs text-forest-600">Elige nueva fecha y hora para tu sesión:</p>
            
            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Nueva Fecha</label>
              <input
                type="date"
                value={newDate}
                min="2026-11-06"
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Nueva Hora</label>
              <select
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              >
                <option value="09:30">09:30 h</option>
                <option value="11:00">11:00 h</option>
                <option value="12:30">12:30 h</option>
                <option value="16:30">16:30 h</option>
                <option value="18:00">18:00 h</option>
                <option value="19:30">19:30 h</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowRescheduleModal(null)}
                className="px-3 py-2 rounded-xl text-xs text-forest-700 hover:bg-warm-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white hover:bg-forest-700"
              >
                Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


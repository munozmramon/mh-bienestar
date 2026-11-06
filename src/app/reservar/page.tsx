'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User as UserIcon, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

function ReservarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialServiceId = searchParams.get('servicio') || '';

  const { 
    services, 
    currentUser, 
    isSlotAvailable, 
    bookAppointment, 
    validateCoupon,
    businessConfig 
  } = useStore();

  const availableServices = services.filter(s => s.available);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || (availableServices[0]?.id || ''));
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-07');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>(currentUser?.name || '');
  const [clientEmail, setClientEmail] = useState<string>(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState<string>(currentUser?.phone || '');
  const [notes, setNotes] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | 'bizum' | 'bono'>('efectivo');

  // UI state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-fill from currentUser when logged in
  useEffect(() => {
    if (currentUser) {
      if (!clientName) setClientName(currentUser.name);
      if (!clientEmail) setClientEmail(currentUser.email);
      if (!clientPhone) setClientPhone(currentUser.phone);
    }
  }, [currentUser]);

  const selectedService = services.find(s => s.id === selectedServiceId) || availableServices[0];

  // If service ID param or coupon param changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }

    const couponParam = searchParams.get('coupon') || searchParams.get('cupon');
    if (couponParam) {
      setCouponCode(couponParam);
      const currentPrice = selectedService ? selectedService.price : 45;
      const res = validateCoupon(couponParam, currentPrice);
      if (res.valid) {
        setAppliedDiscount(res.discountAmount);
        setCouponMessage(res.message);
      }
    }

    const timeParam = searchParams.get('time');
    if (timeParam) {
      // e.g. "18:30 h" or "18:30"
      const cleanTime = timeParam.replace(' h', '').trim();
      setSelectedSlot(cleanTime);
    }
  }, [initialServiceId, searchParams, selectedService]);

  // Daily time slots
  const possibleSlots = [
    '09:30',
    '11:00',
    '12:30',
    '16:30',
    '18:00',
    '19:30'
  ];

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    const currentPrice = selectedService ? selectedService.price : 45;
    const res = validateCoupon(couponCode, currentPrice);
    if (res.valid) {
      setAppliedDiscount(res.discountAmount);
      setCouponMessage(res.message);
    } else {
      setAppliedDiscount(0);
      setCouponMessage(res.message);
    }
  };

  // Final Price Calculation
  const basePrice = selectedService ? selectedService.price : 45;
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  // Submit Booking
  const handleConfirmBooking = () => {
    setErrorMessage('');
    if (!clientName || !clientEmail || !clientPhone) {
      setErrorMessage('Por favor, completa tus datos de contacto (nombre, email y teléfono).');
      return;
    }

    if (!selectedSlot) {
      setErrorMessage('Por favor, selecciona una hora para tu cita.');
      return;
    }

    setIsSubmitting(true);

    const result = bookAppointment({
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService.id,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes,
      couponCode: couponCode || undefined,
      referralCode: referralCode || undefined,
      paymentMethod
    });

    setIsSubmitting(false);

    if (result.success && result.appointment) {
      setConfirmedBooking(result.appointment);
      setStep(3);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] dark:bg-[#0F0A1C] text-slate-900 dark:text-purple-100 py-10 md:py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-[#7C3AED] dark:text-[#A78BFA] tracking-wider uppercase">
            Agenda Inteligente M&amp;H
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B1238] dark:text-white">
            Reserva tu Cita de Bienestar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-purple-300/80">
            Comprobación de disponibilidad en tiempo real. Sin pagos por adelantado obligatorios ni esperas.
          </p>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                step === 1 
                  ? 'bg-[#7C3AED] text-white shadow-soft-sm font-bold' 
                  : 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60'
              }`}
            >
              <span>1. Tratamiento &amp; Horario</span>
            </button>
            <span className="text-purple-300 dark:text-purple-700">→</span>
            <button
              onClick={() => {
                if (selectedSlot) setStep(2);
                else setErrorMessage('Selecciona una hora para avanzar.');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                step === 2 
                  ? 'bg-[#7C3AED] text-white shadow-soft-sm font-bold' 
                  : 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60'
              }`}
            >
              <span>2. Datos &amp; Confirmación</span>
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: SERVICE & CALENDAR */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Service Selection */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3B1238] dark:text-white flex items-center gap-2">
                <span>1. Selecciona el servicio</span>
              </h3>

              <div className="space-y-3">
                {availableServices.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected 
                          ? 'bg-white dark:bg-[#1A132E] border-[#7C3AED] dark:border-[#7C3AED] shadow-soft-md ring-2 ring-[#7C3AED]/20' 
                          : 'bg-white/90 dark:bg-[#1A132E]/60 border-purple-100 dark:border-purple-900/30 hover:bg-white dark:hover:bg-[#1A132E]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-serif font-bold text-[#3B1238] dark:text-white text-sm">{service.name}</p>
                        <p className="text-xs text-slate-500 dark:text-purple-300/80 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#7C3AED] dark:text-[#A78BFA]" />
                            {service.durationMinutes} min
                          </span>
                          <span>·</span>
                          <span>{service.professionalName}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-[#3B1238] dark:text-[#A78BFA] text-base">{service.price}€</span>
                        {service.badge && (
                          <p className="text-[10px] font-bold text-[#7C3AED] dark:text-purple-200 bg-purple-100 dark:bg-purple-950/80 px-1.5 py-0.5 rounded">
                            {service.badge}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 text-xs text-[#3B1238] dark:text-purple-200 space-y-1">
                <p className="font-semibold text-[#3B1238] dark:text-white">Ubicación de tu sesión:</p>
                <p>Calle San José, 2, 23370 Orcera (Jaén) · Sala privada individual.</p>
              </div>
            </div>

            {/* Date & Time Slot Selection */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3B1238] dark:text-white flex items-center gap-2">
                <span>2. Fecha y hora disponible</span>
              </h3>

              <div className="bg-white dark:bg-[#1A132E] p-5 rounded-3xl border border-slate-200 dark:border-purple-900/40 shadow-soft-sm space-y-4">
                
                {/* Quick Date Chips (1-tap mobile experience) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-purple-200 uppercase tracking-wider mb-2">
                    Selecciona el día
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {[
                      { label: 'Hoy', date: '2026-11-07', sub: 'Sáb' },
                      { label: 'Lun 9', date: '2026-11-09', sub: 'Nov' },
                      { label: 'Mar 10', date: '2026-11-10', sub: 'Nov' },
                      { label: 'Mié 11', date: '2026-11-11', sub: 'Nov' },
                      { label: 'Jue 12', date: '2026-11-12', sub: 'Nov' },
                      { label: 'Vie 13', date: '2026-11-13', sub: 'Nov' },
                      { label: 'Sáb 14', date: '2026-11-14', sub: 'Nov' },
                    ].map((d) => {
                      const isDaySelected = selectedDate === d.date;
                      return (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d.date);
                            setSelectedSlot('');
                          }}
                          className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[62px] text-xs transition-all border shrink-0 ${
                            isDaySelected
                              ? 'bg-[#7C3AED] dark:bg-[#7C3AED] text-white border-[#7C3AED] font-bold shadow-md scale-105'
                              : 'bg-slate-50 dark:bg-purple-950/40 hover:bg-purple-50 text-slate-700 dark:text-purple-200 border-slate-200 dark:border-purple-900/30'
                          }`}
                        >
                          <span className="font-bold">{d.label}</span>
                          <span className="text-[10px] opacity-80">{d.sub}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual date picker fallback */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-purple-300/70">
                    <span>O elige otra fecha:</span>
                    <input
                      type="date"
                      value={selectedDate}
                      min="2026-11-06"
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot('');
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Slots Grid grouped by Morning / Afternoon */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-purple-200 uppercase tracking-wider mb-2">
                    Horas disponibles ({selectedDate})
                  </label>

                  <div className="space-y-3">
                    {/* Morning */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-purple-300/70 block mb-1.5">
                        🌅 Mañana
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:30', '11:00', '12:30'].map((slot) => {
                          const available = isSlotAvailable(selectedDate, slot);
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!available}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border ${
                                !available
                                  ? 'bg-slate-100 dark:bg-[#0F0A1C] text-slate-400 dark:text-purple-900/60 border-slate-200 dark:border-purple-900/20 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] font-bold shadow-soft-sm'
                                  : 'bg-slate-50 dark:bg-purple-950/40 text-slate-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/40 border-slate-200 dark:border-purple-900/30'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-purple-300/70 block mb-1.5">
                        🌇 Tarde
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {['16:30', '18:00', '19:30'].map((slot) => {
                          const available = isSlotAvailable(selectedDate, slot);
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!available}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border ${
                                !available
                                  ? 'bg-slate-100 dark:bg-[#0F0A1C] text-slate-400 dark:text-purple-900/60 border-slate-200 dark:border-purple-900/20 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] font-bold shadow-soft-sm'
                                  : 'bg-slate-50 dark:bg-purple-950/40 text-slate-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/40 border-slate-200 dark:border-purple-900/30'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSlot && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-xs text-[#3B1238] dark:text-purple-200 flex items-center justify-between">
                    <span className="font-semibold">Horario seleccionado:</span>
                    <span className="font-bold text-[#7C3AED] dark:text-[#A78BFA]">{selectedDate} a las {selectedSlot} h</span>
                  </div>
                )}

                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedSlot 
                      ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-soft-md font-bold' 
                      : 'bg-purple-100 dark:bg-purple-950/30 text-purple-400 dark:text-purple-600 cursor-not-allowed'
                  }`}
                >
                  <span>Continuar con mis datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        )}

        {/* STEP 2: CLIENT DETAILS & CONFIRMATION */}
        {step === 2 && (
          <div className="bg-white dark:bg-[#1A132E] rounded-3xl border border-slate-200 dark:border-purple-900/40 p-6 sm:p-10 shadow-soft-lg space-y-8">
            
            {/* Summary Banner */}
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-purple-600 dark:text-purple-300 font-medium">Tratamiento elegido</span>
                <p className="font-serif font-bold text-[#3B1238] dark:text-white text-base">{selectedService?.name}</p>
                <p className="text-slate-600 dark:text-purple-300/80">{selectedDate} a las {selectedSlot} h ({selectedService?.durationMinutes} min)</p>
              </div>

              <div className="sm:text-right">
                <span className="text-purple-600 dark:text-purple-300 font-medium">Total a abonar</span>
                <p className="font-serif font-bold text-[#7C3AED] dark:text-[#A78BFA] text-xl">{finalPrice}€</p>
                {appliedDiscount > 0 && (
                  <span className="text-[10px] text-white font-bold bg-[#7C3AED] px-1.5 py-0.5 rounded">
                    Descuento -{appliedDiscount}€ aplicado
                  </span>
                )}
              </div>
            </div>

            {/* Client Inputs Form */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3B1238] dark:text-white">
                Tus datos de reserva
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                    Teléfono Móvil (para recordatorio WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. 651 30 87 38"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                    Correo Electrónico (para confirmación) *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                    Observaciones o notas previas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Sobrecarga en hombro derecho, dificultad para dormir..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>
            </div>

            {/* Coupons and Referral Code */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-900/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                  ¿Tienes un cupón de descuento?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej. BIENVENIDA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold"
                  >
                    Aplicar
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] font-medium mt-1 text-[#7C3AED] dark:text-[#A78BFA]">{couponMessage}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-purple-200 mb-1">
                  Código de amigo / recomendación
                </label>
                <input
                  type="text"
                  placeholder="Ej. MH-MARIA-82"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0F0A1C] border border-slate-300 dark:border-purple-900/40 text-slate-900 dark:text-white uppercase"
                />
                <p className="text-[10px] text-slate-500 dark:text-purple-300/70 mt-1">
                  Recibirás 100 puntos extra al completar tu cita.
                </p>
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-purple-200 uppercase tracking-wider">
                Preferencia de pago (en el centro)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'efectivo', label: 'Efectivo en consulta' },
                  { id: 'tarjeta', label: 'Tarjeta' },
                  { id: 'bizum', label: 'Bizum' },
                  { id: 'bono', label: 'Tengo un Bono' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      paymentMethod === item.id
                        ? 'bg-[#7C3AED] text-white border-[#7C3AED] font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-[#0F0A1C] text-slate-700 dark:text-purple-200 border-slate-200 dark:border-purple-900/30 hover:bg-white dark:hover:bg-purple-950/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-purple-700 dark:text-purple-300 hover:text-[#3B1238] dark:hover:text-white underline order-2 sm:order-1"
              >
                ← Cambiar fecha o servicio
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] transition-all shadow-lg shadow-purple-600/30 order-1 sm:order-2"
              >
                {isSubmitting ? 'Confirmando...' : `Confirmar Reserva (${finalPrice}€)`}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
        {step === 3 && confirmedBooking && (
          <div className="bg-white dark:bg-[#1A132E] rounded-3xl border border-slate-200 dark:border-purple-900/40 p-8 sm:p-12 shadow-soft-xl text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#7C3AED] dark:text-[#A78BFA] flex items-center justify-center mx-auto border-2 border-purple-300 dark:border-purple-800">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#7C3AED] dark:text-[#A78BFA] uppercase tracking-wider">
                ¡Cita Confirmada con Éxito!
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#3B1238] dark:text-white">
                Gracias, {confirmedBooking.clientName}
              </h2>
              <p className="text-sm text-slate-600 dark:text-purple-300/80 max-w-lg mx-auto">
                Tu cita para <strong>{confirmedBooking.serviceName}</strong> ha quedado registrada en la agenda del Centro Parasanitario M&amp;H Orcera.
              </p>
            </div>

            {/* Appointment Ticket */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40 text-left space-y-3 shadow-soft-sm">
              <div className="flex items-center justify-between pb-3 border-b border-purple-200 dark:border-purple-900/30 text-xs">
                <span className="font-semibold text-slate-700 dark:text-purple-300">Identificador</span>
                <span className="font-mono font-bold text-[#7C3AED] dark:text-[#A78BFA]">{confirmedBooking.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-purple-300/70">Fecha</span>
                  <p className="font-bold text-[#3B1238] dark:text-white">{confirmedBooking.date}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-purple-300/70">Hora</span>
                  <p className="font-bold text-[#3B1238] dark:text-white">{confirmedBooking.timeSlot} h</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-purple-300/70">Importe</span>
                  <p className="font-bold text-[#7C3AED] dark:text-[#A78BFA]">{confirmedBooking.price}€</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-purple-300/70">Ubicación</span>
                  <p className="font-bold text-[#3B1238] dark:text-white">C/ San José, 2, Orcera</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20acabo%20de%20reservar%20cita%20(${confirmedBooking.id})%20para%20${encodeURIComponent(confirmedBooking.serviceName)}%20el%20${confirmedBooking.date}%20a%20las%20${confirmedBooking.timeSlot}h.%20Soy%20${encodeURIComponent(confirmedBooking.clientName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors shadow-soft-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir recordatorio en WhatsApp</span>
              </a>

              <Link
                href="/mi-cuenta"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-800 dark:text-white bg-purple-100 dark:bg-purple-950/60 hover:bg-purple-200 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/40 transition-colors"
              >
                Ver en Mi Portal Cliente
              </Link>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-purple-300/70">
              ¿Necesitas modificar la cita? Puedes hacerlo con al menos 24h de antelación desde tu cuenta o llamando al 651 30 87 38.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ReservarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xs text-[#7C3AED] font-semibold">Cargando agenda de reservas...</p>
      </div>
    }>
      <ReservarContent />
    </Suspense>
  );
}

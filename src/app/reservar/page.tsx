'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
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
      const cleanTime = timeParam.replace(' h', '').trim();
      setSelectedSlot(cleanTime);
    }
  }, [initialServiceId, searchParams, selectedService]);

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 md:py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-wider uppercase">
            Agenda Inteligente M&amp;H
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-50 dark:text-zinc-100">
            Reserva tu Cita de Bienestar
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Comprobación de disponibilidad en tiempo real. Sin pagos por adelantado obligatorios ni esperas.
          </p>
        </div>

        {/* Fast Lane WhatsApp Callout for Rural/Senior Users */}
        <div className="mb-8 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-zinc-100">
                ¿Prefieres pedir tu cita directamente por WhatsApp sin formularios?
              </p>
              <p className="text-xs text-zinc-400">
                Atención personal directa con el centro en Orcera · 651 30 87 38
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/34651308738?text=Hola%20M%26H%20Bienestar%2C%20quisiera%20pedir%20cita%20directamente%20para%20Orcera."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
          >
            Abrir WhatsApp →
          </a>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                step === 1 
                  ? 'bg-teal-600 text-white shadow-md font-bold' 
                  : 'bg-zinc-850 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <span>1. Tratamiento &amp; Horario</span>
            </button>
            <span className="text-zinc-600">→</span>
            <button
              onClick={() => {
                if (selectedSlot) setStep(2);
                else setErrorMessage('Selecciona una hora para avanzar.');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                step === 2 
                  ? 'bg-teal-600 text-white shadow-md font-bold' 
                  : 'bg-zinc-850 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <span>2. Datos &amp; Confirmación</span>
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: SERVICE & CALENDAR */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Service Selection */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-50 dark:text-zinc-100 flex items-center gap-2">
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
                          ? 'bg-zinc-900 border-teal-500 shadow-md ring-2 ring-teal-500/20' 
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-serif font-bold text-zinc-100 text-sm">{service.name}</p>
                        <p className="text-xs text-zinc-400 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-teal-400" />
                            {service.durationMinutes} min
                          </span>
                          <span>·</span>
                          <span>{service.professionalName}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-zinc-50 dark:text-zinc-100 text-base">{service.price}€</span>
                        {service.badge && (
                          <p className="text-[10px] font-bold text-teal-400 bg-teal-900/40 px-1.5 py-0.5 rounded border border-teal-500/30">
                            {service.badge}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <p className="font-semibold text-zinc-200">Ubicación de tu sesión:</p>
                <p>Calle San José, 2, 23370 Orcera (Jaén) · Sala privada individual.</p>
              </div>
            </div>

            {/* Date & Time Slot Selection */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-50 dark:text-zinc-100 flex items-center gap-2">
                <span>2. Fecha y hora disponible</span>
              </h3>

              <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 shadow-sm space-y-4">
                
                {/* Quick Date Chips */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
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
                              ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-md scale-105'
                              : 'bg-zinc-850 text-zinc-300 border-zinc-750 hover:bg-zinc-800'
                          }`}
                        >
                          <span className="font-bold">{d.label}</span>
                          <span className="text-[10px] opacity-80">{d.sub}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual date picker fallback */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                    <span>O elige otra fecha:</span>
                    <input
                      type="date"
                      value={selectedDate}
                      min="2026-11-06"
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot('');
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs bg-zinc-850 border border-zinc-750 text-zinc-100"
                    />
                  </div>
                </div>

                {/* Slots Grid grouped by Morning / Afternoon */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Horas disponibles ({selectedDate})
                  </label>

                  <div className="space-y-3">
                    {/* Morning */}
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
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
                                  ? 'bg-zinc-850/40 text-zinc-600 border-zinc-800 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                                  : 'bg-zinc-850 text-zinc-200 hover:bg-zinc-800 border-zinc-750'
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
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
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
                                  ? 'bg-zinc-850/40 text-zinc-600 border-zinc-800 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                                  : 'bg-zinc-850 text-zinc-200 hover:bg-zinc-800 border-zinc-750'
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
                  <div className="p-3 rounded-xl bg-teal-900/30 border border-teal-500/40 text-xs text-zinc-100 flex items-center justify-between">
                    <span className="font-semibold text-zinc-300">Horario seleccionado:</span>
                    <span className="font-bold text-teal-400">{selectedDate} a las {selectedSlot} h</span>
                  </div>
                )}

                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedSlot 
                      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/25 font-bold' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
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
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Summary Banner */}
            <div className="p-4 rounded-2xl bg-zinc-850 border border-zinc-750 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-teal-400 font-medium">Tratamiento elegido</span>
                <p className="font-serif font-bold text-zinc-50 dark:text-zinc-100 text-base">{selectedService?.name}</p>
                <p className="text-zinc-400">{selectedDate} a las {selectedSlot} h ({selectedService?.durationMinutes} min)</p>
              </div>

              <div className="sm:text-right">
                <span className="text-teal-400 font-medium">Total a abonar</span>
                <p className="font-serif font-bold text-teal-400 text-xl">{finalPrice}€</p>
                {appliedDiscount > 0 && (
                  <span className="text-[10px] text-white font-bold bg-teal-600 px-1.5 py-0.5 rounded">
                    Descuento -{appliedDiscount}€ aplicado
                  </span>
                )}
              </div>
            </div>

            {/* Client Inputs Form */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-50 dark:text-zinc-100">
                Tus datos de reserva
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Teléfono Móvil (para recordatorio WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. 651 30 87 38"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Correo Electrónico (para confirmación) *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Observaciones o notas previas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Sobrecarga en hombro derecho, dificultad para dormir..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Coupons and Referral Code */}
            <div className="p-4 rounded-2xl bg-zinc-850 border border-zinc-750 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  ¿Tienes un cupón de descuento?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej. BIENVENIDA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-zinc-900 border border-zinc-700 text-zinc-100 uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] font-medium mt-1 text-teal-400">{couponMessage}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Código de amigo / recomendación
                </label>
                <input
                  type="text"
                  placeholder="Ej. MH-MARIA-82"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-900 border border-zinc-700 text-zinc-100 uppercase"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Recibirás 100 puntos extra al completar tu cita.
                </p>
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
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
                        ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                        : 'bg-zinc-850 text-zinc-300 border-zinc-750 hover:bg-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline order-2 sm:order-1 transition-colors"
              >
                ← Cambiar fecha o servicio
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-lg shadow-teal-600/30 order-1 sm:order-2"
              >
                {isSubmitting ? 'Confirmando...' : `Confirmar Reserva (${finalPrice}€)`}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
        {step === 3 && confirmedBooking && (
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-teal-900/40 text-teal-400 flex items-center justify-center mx-auto border-2 border-teal-500/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                ¡Cita Confirmada con Éxito!
              </span>
              <h2 className="font-serif text-3xl font-bold text-zinc-50 dark:text-zinc-100">
                Gracias, {confirmedBooking.clientName}
              </h2>
              <p className="text-sm text-zinc-300 max-w-lg mx-auto">
                Tu cita para <strong>{confirmedBooking.serviceName}</strong> ha quedado registrada en la agenda del Centro Parasanitario M&amp;H Orcera.
              </p>
            </div>

            {/* Visual Welcome & Hospitality Banner */}
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-zinc-750 relative shadow-lg">
              <div className="relative h-44 w-full">
                <img
                  src="/images/hero-bienestar-orcera.jpg"
                  alt="Tu camilla de bienestar en Orcera te espera"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/30">
                    Hospitalidad M&amp;H Orcera
                  </span>
                  <p className="text-xs text-zinc-100 font-semibold mt-1">
                    ☕ Tu camilla está preparada. Te recibiremos con una infusión relajante para que comiences a desconectar desde el primer minuto.
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Ticket */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-zinc-850 border border-zinc-750 text-left space-y-3 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-750 text-xs">
                <span className="font-semibold text-zinc-300">Identificador</span>
                <span className="font-mono font-bold text-teal-400">{confirmedBooking.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-400">Fecha</span>
                  <p className="font-bold text-zinc-100">{confirmedBooking.date}</p>
                </div>
                <div>
                  <span className="text-zinc-400">Hora</span>
                  <p className="font-bold text-zinc-100">{confirmedBooking.timeSlot} h</p>
                </div>
                <div>
                  <span className="text-zinc-400">Importe</span>
                  <p className="font-bold text-teal-400">{confirmedBooking.price}€</p>
                </div>
                <div>
                  <span className="text-zinc-400">Ubicación</span>
                  <p className="font-bold text-zinc-100">C/ San José, 2, Orcera</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20acabo%20de%20reservar%20cita%20(${confirmedBooking.id})%20para%20${encodeURIComponent(confirmedBooking.serviceName)}%20el%20${confirmedBooking.date}%20a%20las%20${confirmedBooking.timeSlot}h.%20Soy%20${encodeURIComponent(confirmedBooking.clientName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir recordatorio en WhatsApp</span>
              </a>

              <Link
                href="/mi-cuenta"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 transition-colors"
              >
                Ver en Mi Portal Cliente
              </Link>
            </div>

            <p className="text-[11px] text-zinc-400">
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
      <div className="min-h-[60vh] flex items-center justify-center bg-zinc-950">
        <p className="text-xs text-teal-400 font-semibold">Cargando agenda de reservas...</p>
      </div>
    }>
      <ReservarContent />
    </Suspense>
  );
}

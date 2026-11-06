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

  // If service ID param changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  const selectedService = services.find(s => s.id === selectedServiceId) || availableServices[0];

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
    <div className="min-h-screen bg-warm-50 dark:bg-obsidian-900 text-forest-900 dark:text-obsidian-100 py-10 md:py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-gold-700 dark:text-neon-lime tracking-wider uppercase">
            Agenda Inteligente M&amp;H
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 dark:text-white">
            Reserva tu Cita de Bienestar
          </h1>
          <p className="text-xs sm:text-sm text-forest-600 dark:text-obsidian-300">
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
                  ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 shadow-soft-sm font-bold' 
                  : 'bg-warm-200 dark:bg-obsidian-800 text-forest-700 dark:text-obsidian-300 hover:bg-warm-300 dark:hover:bg-obsidian-750'
              }`}
            >
              <span>1. Tratamiento &amp; Horario</span>
            </button>
            <span className="text-warm-400 dark:text-obsidian-500">→</span>
            <button
              onClick={() => {
                if (selectedSlot) setStep(2);
                else setErrorMessage('Selecciona una hora para avanzar.');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                step === 2 
                  ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 shadow-soft-sm font-bold' 
                  : 'bg-warm-200 dark:bg-obsidian-800 text-forest-700 dark:text-obsidian-300 hover:bg-warm-300 dark:hover:bg-obsidian-750'
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
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-white flex items-center gap-2">
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
                          ? 'bg-white dark:bg-obsidian-800 border-forest-800 dark:border-neon-lime shadow-soft-md ring-2 ring-forest-800/20 dark:ring-neon-lime/30' 
                          : 'bg-white/80 dark:bg-obsidian-850 border-warm-300 dark:border-white/10 hover:bg-white dark:hover:bg-obsidian-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-serif font-bold text-forest-900 dark:text-white text-sm">{service.name}</p>
                        <p className="text-xs text-forest-600 dark:text-obsidian-300 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sage-600 dark:text-neon-lime" />
                            {service.durationMinutes} min
                          </span>
                          <span>·</span>
                          <span>{service.professionalName}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-forest-900 dark:text-neon-lime text-base">{service.price}€</span>
                        {service.badge && (
                          <p className="text-[10px] font-bold text-gold-700 dark:text-obsidian-950 bg-gold-50 dark:bg-neon-lime px-1.5 py-0.5 rounded">
                            {service.badge}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-2xl bg-warm-100 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10 text-xs text-forest-700 dark:text-obsidian-300 space-y-1">
                <p className="font-semibold text-forest-900 dark:text-white">Ubicación de tu sesión:</p>
                <p>Calle San José, 2, 23370 Orcera (Jaén) · Sala privada individual.</p>
              </div>
            </div>

            {/* Date & Time Slot Selection */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-white flex items-center gap-2">
                <span>2. Fecha y hora disponible</span>
              </h3>

              <div className="bg-white dark:bg-obsidian-800 p-5 rounded-3xl border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
                
                {/* Date Picker Input */}
                <div>
                  <label className="block text-xs font-bold text-forest-800 dark:text-obsidian-200 uppercase tracking-wider mb-1.5">
                    Fecha de la cita
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-11-06"
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot('');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-warm-50 dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime"
                  />
                  <p className="text-[11px] text-forest-500 dark:text-obsidian-400 mt-1">
                    Atención de Lunes a Sábado. Domingos cerrado.
                  </p>
                </div>

                {/* Slots Grid */}
                <div>
                  <label className="block text-xs font-bold text-forest-800 dark:text-obsidian-200 uppercase tracking-wider mb-2">
                    Horarios para el {selectedDate}
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    {possibleSlots.map((slot) => {
                      const available = isSlotAvailable(selectedDate, slot);
                      const isSelected = selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          disabled={!available}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                            !available
                              ? 'bg-warm-100 dark:bg-obsidian-900 text-warm-400 dark:text-obsidian-600 border-warm-200 dark:border-white/5 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 border-forest-800 dark:border-neon-lime font-bold shadow-soft-sm'
                              : 'bg-warm-50 dark:bg-obsidian-850 text-forest-800 dark:text-obsidian-200 hover:bg-forest-50 dark:hover:bg-obsidian-700 border-warm-300 dark:border-white/10'
                          }`}
                        >
                          {slot}
                          {!available && <span className="block text-[9px]">Ocupado</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSlot && (
                  <div className="p-3 rounded-xl bg-sage-50 dark:bg-obsidian-850 border border-sage-200 dark:border-neon-lime/30 text-xs text-forest-800 dark:text-obsidian-100 flex items-center justify-between">
                    <span className="font-semibold">Horario seleccionado:</span>
                    <span className="font-bold text-forest-950 dark:text-neon-lime">{selectedDate} a las {selectedSlot} h</span>
                  </div>
                )}

                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedSlot 
                      ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 hover:bg-forest-700 dark:hover:bg-[#d8ff68] shadow-soft-md dark:shadow-neon-lime font-bold' 
                      : 'bg-warm-200 dark:bg-obsidian-850 text-warm-400 dark:text-obsidian-600 cursor-not-allowed'
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
          <div className="bg-white dark:bg-obsidian-800 rounded-3xl border border-warm-300 dark:border-white/10 p-6 sm:p-10 shadow-soft-lg space-y-8">
            
            {/* Summary Banner */}
            <div className="p-4 rounded-2xl bg-warm-100/80 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-forest-500 dark:text-obsidian-400 font-medium">Tratamiento elegido</span>
                <p className="font-serif font-bold text-forest-900 dark:text-white text-base">{selectedService?.name}</p>
                <p className="text-forest-600 dark:text-obsidian-300">{selectedDate} a las {selectedSlot} h ({selectedService?.durationMinutes} min)</p>
              </div>

              <div className="sm:text-right">
                <span className="text-forest-500 dark:text-obsidian-400 font-medium">Total a abonar</span>
                <p className="font-serif font-bold text-gold-700 dark:text-neon-lime text-xl">{finalPrice}€</p>
                {appliedDiscount > 0 && (
                  <span className="text-[10px] text-emerald-700 dark:text-obsidian-950 font-bold bg-emerald-50 dark:bg-neon-lime px-1.5 py-0.5 rounded">
                    Descuento -{appliedDiscount}€ aplicado
                  </span>
                )}
              </div>
            </div>

            {/* Client Inputs Form */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-white">
                Tus datos de reserva
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                    Teléfono Móvil (para recordatorio WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. 651 30 87 38"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                    Correo Electrónico (para confirmación) *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                    Observaciones o notas previas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Sobrecarga en hombro derecho, dificultad para dormir..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-warm-50 dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>
            </div>

            {/* Coupons and Referral Code */}
            <div className="p-4 rounded-2xl bg-warm-50 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                  ¿Tienes un cupón de descuento?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej. BIENVENIDA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 hover:bg-forest-700 dark:hover:bg-[#d8ff68] font-bold"
                  >
                    Aplicar
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] font-medium mt-1 text-forest-700 dark:text-neon-lime">{couponMessage}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                  Código de amigo / recomendación
                </label>
                <input
                  type="text"
                  placeholder="Ej. MH-MARIA-82"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-obsidian-900 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white uppercase"
                />
                <p className="text-[10px] text-forest-500 dark:text-obsidian-400 mt-1">
                  Recibirás 100 puntos extra al completar tu cita.
                </p>
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-forest-800 dark:text-obsidian-200 uppercase tracking-wider">
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
                        ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 border-forest-800 dark:border-neon-lime font-bold'
                        : 'bg-warm-50 dark:bg-obsidian-900 text-forest-700 dark:text-obsidian-300 border-warm-300 dark:border-white/10 hover:bg-white dark:hover:bg-obsidian-850'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-warm-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-forest-700 dark:text-obsidian-300 hover:text-forest-900 dark:hover:text-white underline order-2 sm:order-1"
              >
                ← Cambiar fecha o servicio
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white dark:text-obsidian-950 bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:hover:bg-[#d8ff68] active:scale-[0.98] transition-all shadow-soft-md dark:shadow-neon-lime order-1 sm:order-2"
              >
                {isSubmitting ? 'Confirmando...' : `Confirmar Reserva (${finalPrice}€)`}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
        {step === 3 && confirmedBooking && (
          <div className="bg-white dark:bg-obsidian-800 rounded-3xl border border-warm-300 dark:border-white/10 p-8 sm:p-12 shadow-soft-xl text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-neon-lime/20 text-emerald-800 dark:text-neon-lime flex items-center justify-center mx-auto border-2 border-emerald-300 dark:border-neon-lime">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-700 dark:text-neon-lime uppercase tracking-wider">
                ¡Cita Confirmada con Éxito!
              </span>
              <h2 className="font-serif text-3xl font-bold text-forest-950 dark:text-white">
                Gracias, {confirmedBooking.clientName}
              </h2>
              <p className="text-sm text-forest-700/80 dark:text-obsidian-300 max-w-lg mx-auto">
                Tu cita para <strong>{confirmedBooking.serviceName}</strong> ha quedado registrada en la agenda del Centro Parasanitario M&amp;H Orcera.
              </p>
            </div>

            {/* Appointment Ticket */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-warm-50 dark:bg-obsidian-850 border border-warm-300 dark:border-white/10 text-left space-y-3 shadow-soft-sm">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200 dark:border-white/10 text-xs">
                <span className="font-semibold text-forest-700 dark:text-obsidian-400">Identificador</span>
                <span className="font-mono font-bold text-forest-900 dark:text-neon-lime">{confirmedBooking.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-forest-500 dark:text-obsidian-400">Fecha</span>
                  <p className="font-bold text-forest-900 dark:text-white">{confirmedBooking.date}</p>
                </div>
                <div>
                  <span className="text-forest-500 dark:text-obsidian-400">Hora</span>
                  <p className="font-bold text-forest-900 dark:text-white">{confirmedBooking.timeSlot} h</p>
                </div>
                <div>
                  <span className="text-forest-500 dark:text-obsidian-400">Importe</span>
                  <p className="font-bold text-forest-900 dark:text-neon-lime">{confirmedBooking.price}€</p>
                </div>
                <div>
                  <span className="text-forest-500 dark:text-obsidian-400">Ubicación</span>
                  <p className="font-bold text-forest-900 dark:text-white">C/ San José, 2, Orcera</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20acabo%20de%20reservar%20cita%20(${confirmedBooking.id})%20para%20${encodeURIComponent(confirmedBooking.serviceName)}%20el%20${confirmedBooking.date}%20a%20las%20${confirmedBooking.timeSlot}h.%20Soy%20${encodeURIComponent(confirmedBooking.clientName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white dark:text-obsidian-950 bg-emerald-700 dark:bg-neon-lime hover:bg-emerald-600 dark:hover:bg-[#d8ff68] transition-colors shadow-soft-sm dark:shadow-neon-lime"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir recordatorio en WhatsApp</span>
              </a>

              <Link
                href="/mi-cuenta"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-forest-900 dark:text-obsidian-100 bg-warm-200 dark:bg-obsidian-850 hover:bg-warm-300 dark:hover:bg-obsidian-750 border dark:border-white/10 transition-colors"
              >
                Ver en Mi Portal Cliente
              </Link>
            </div>

            <p className="text-[11px] text-forest-500 dark:text-obsidian-400">
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
        <p className="text-xs text-forest-600 font-semibold">Cargando agenda de reservas...</p>
      </div>
    }>
      <ReservarContent />
    </Suspense>
  );
}

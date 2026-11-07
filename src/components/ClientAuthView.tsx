'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Gift,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClientAuthViewProps {
  onSuccess?: () => void;
  initialMode?: 'login' | 'register';
}

export default function ClientAuthView({ onSuccess, initialMode = 'login' }: ClientAuthViewProps) {
  const { loginAs, registerClient, users } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = loginAs(loginEmail.trim());
    if (success) {
      if (onSuccess) onSuccess();
    } else {
      setErrorMessage('Correo o contraseña incorrectos. Por favor, revisa tus datos o regístrate si no tienes cuenta.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!acceptPrivacy) {
      setErrorMessage('Debes aceptar la Política de Privacidad para continuar.');
      return;
    }

    try {
      const user = registerClient(name, email, phone, referralCode || undefined);
      if (user) {
        setSuccessMessage('¡Cuenta creada con éxito! Se han sumado 50 puntos a tu saldo.');
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'No se pudo crear la cuenta.');
    }
  };

  const handleQuickDemoLogin = (emailToUse: string) => {
    const success = loginAs(emailToUse);
    if (success && onSuccess) {
      onSuccess();
    } else if (!success) {
      setErrorMessage('No encontramos ninguna cuenta con ese correo electrónico. Si es tu primera vez, puedes registrarte.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header Icon & Brand */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-white p-1 border-2 border-teal-500/40 shadow-md">
            <img 
              src="/logo.png" 
              alt="Centro Parasanitario M&H" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 dark:text-zinc-100">
            Portal de Clientes
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            {mode === 'login' 
              ? 'Accede a tu historial, citas activas y puntos de fidelización' 
              : 'Regístrate en M&H Bienestar y recibe 50 puntos de bienvenida'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex rounded-2xl bg-zinc-850 p-1 border border-zinc-750">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'bg-zinc-900 text-zinc-50 dark:text-zinc-100 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'bg-zinc-900 text-zinc-50 dark:text-zinc-100 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            Crear Cuenta (Registro)
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="rounded-2xl p-3.5 bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="rounded-2xl p-3.5 bg-teal-900/40 border border-teal-500/40 text-xs text-teal-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-zinc-900 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 transition-colors">
          
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-zinc-700 text-teal-600 focus:ring-teal-500" />
                  <span>Recordar sesión</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => alert("Para restablecer tu acceso, puedes contactarnos por WhatsApp o al centro directamente.")}
                  className="hover:underline text-teal-400"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-md shadow-teal-600/25 flex items-center justify-center gap-2"
              >
                <span>Acceder a Mi Cuenta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Nombre y Apellidos <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Elena Romero"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Teléfono Móvil (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="651 30 87 38"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Para confirmar citas y avisarte de recordatorios.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Correo Electrónico <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.romero@email.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Contraseña de Acceso <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>Código de amigo o recomendación</span>
                  <span className="text-[10px] text-amber-400 font-normal">Opcional (+50 pts)</span>
                </label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Ej: MH-MARIA-26"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-850 text-sm font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* RGPD Consents */}
              <div className="pt-2 space-y-2 border-t border-zinc-800">
                <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-0.5 rounded border-zinc-700 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <Link href="/privacidad-rgpd" target="_blank" className="underline text-teal-400 font-semibold">
                      Política de Privacidad y RGPD
                    </Link>{' '}
                    del Centro Parasanitario M&amp;H. <span className="text-rose-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-0.5 rounded border-zinc-700 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    Deseo recibir confirmaciones de cita, recordatorios y ofertas exclusivas de bienestar por WhatsApp y email.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 px-4 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-md shadow-teal-600/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Registrarme y Obtener 50 Puntos</span>
              </button>
            </form>
          )}

          {/* Quick Demo Access Switcher */}
          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <button
              type="button"
              onClick={() => setShowDemoSelector(!showDemoSelector)}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors underline flex items-center justify-center gap-1.5 mx-auto"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{showDemoSelector ? 'Ocultar cuentas de prueba' : 'Probar con cuentas de demostración'}</span>
            </button>

            {showDemoSelector && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left animate-in fade-in">
                <button
                  type="button"
                  onClick={() => { loginAs('maria.garcia@email.com'); if (onSuccess) onSuccess(); }}
                  className="p-2.5 rounded-xl border border-zinc-750 bg-zinc-850 hover:bg-zinc-800 text-xs transition-colors"
                >
                  <p className="font-semibold text-zinc-100">María García</p>
                  <p className="text-[11px] text-teal-400">Cliente habitual (250 pts)</p>
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('carlos.ruiz@email.com'); if (onSuccess) onSuccess(); }}
                  className="p-2.5 rounded-xl border border-zinc-750 bg-zinc-850 hover:bg-zinc-800 text-xs transition-colors"
                >
                  <p className="font-semibold text-zinc-100">Carlos Ruiz</p>
                  <p className="text-[11px] text-teal-400">Cliente nuevo (50 pts)</p>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Security / Privacy badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Tus datos están protegidos conforme al RGPD &amp; LOPDGDD</span>
        </div>

      </div>
    </div>
  );
}

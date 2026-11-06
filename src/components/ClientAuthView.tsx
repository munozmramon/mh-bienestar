'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Lock, 
  Gift, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface ClientAuthViewProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export default function ClientAuthView({ initialMode = 'login', onSuccess }: ClientAuthViewProps) {
  const { loginAs, registerClient, users } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Registration form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status & error messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, introduce tu nombre y apellidos.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!phone.trim() || phone.replace(/\s+/g, '').length < 9) {
      setErrorMessage('Por favor, introduce un número de teléfono válido.');
      return;
    }
    if (!acceptPrivacy) {
      setErrorMessage('Debes aceptar la política de privacidad y términos del centro para registrarte.');
      return;
    }

    // Check if user already exists
    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setErrorMessage('Ya existe una cuenta con este correo. Por favor, inicia sesión.');
      setMode('login');
      setLoginEmail(email);
      return;
    }

    try {
      const newUser = registerClient(name.trim(), email.trim(), phone.trim(), referralCode.trim() || undefined);
      setSuccessMessage(`¡Bienvenido a M&H Bienestar, ${newUser.name}! Tu cuenta ha sido creada con éxito (+50 pts de fidelización).`);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMessage('Hubo un error al registrar tu cuenta. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginEmail.trim()) {
      setErrorMessage('Por favor, introduce tu correo electrónico.');
      return;
    }

    const ok = loginAs(loginEmail.trim());
    if (ok) {
      setSuccessMessage('¡Sesión iniciada con éxito!');
      if (onSuccess) onSuccess();
    } else {
      setErrorMessage('No encontramos ninguna cuenta con ese correo electrónico. Si es tu primera vez, puedes registrarte.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header Icon & Brand */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-white dark:bg-obsidian-850 p-1 border-2 border-forest-600/30 dark:border-neon-lime/40 shadow-soft-md">
            <img 
              src="/logo.png" 
              alt="Centro Parasanitario M&H" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-forest-950 dark:text-white">
            Portal de Clientes
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-forest-700/80 dark:text-obsidian-300">
            {mode === 'login' 
              ? 'Accede a tu historial, citas activas y puntos de fidelización' 
              : 'Regístrate en M&H Bienestar y recibe 50 puntos de bienvenida'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex rounded-2xl bg-warm-200/70 dark:bg-obsidian-850 p-1 border border-warm-300/80 dark:border-white/10">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-obsidian-700 text-forest-950 dark:text-white shadow-soft-sm'
                : 'text-forest-700 dark:text-obsidian-400 hover:text-forest-950 dark:hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-obsidian-700 text-forest-950 dark:text-white shadow-soft-sm'
                : 'text-forest-700 dark:text-obsidian-400 hover:text-forest-950 dark:hover:text-white'
            }`}
          >
            Crear Cuenta (Registro)
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="rounded-2xl p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="rounded-2xl p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-white/90 dark:bg-obsidian-850/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-soft-xl border border-warm-300/80 dark:border-white/10 transition-colors">
          
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-forest-600 dark:text-obsidian-400 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-warm-300 text-forest-800 focus:ring-forest-600" />
                  <span>Recordar sesión</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => alert("Para restablecer tu acceso, puedes contactarnos por WhatsApp o al centro directamente.")}
                  className="hover:underline text-forest-800 dark:text-neon-lime"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-full text-sm font-semibold text-white bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:text-obsidian-950 dark:hover:bg-neon-lime/90 active:scale-[0.98] transition-all shadow-soft-sm flex items-center justify-center gap-2"
              >
                <span>Acceder a Mi Cuenta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Nombre y Apellidos <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Elena Romero"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Teléfono Móvil (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="651 30 87 38"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
                <p className="text-[11px] text-forest-500 dark:text-obsidian-400 mt-1">
                  Para confirmar citas y avisarte de recordatorios.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Correo Electrónico <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.romero@email.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5">
                  Contraseña de Acceso <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-forest-400 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-obsidian-200 mb-1.5 flex items-center justify-between">
                  <span>Código de amigo o recomendación</span>
                  <span className="text-[10px] text-gold-600 dark:text-neon-lime font-normal">Opcional (+50 pts)</span>
                </label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-gold-500 dark:text-neon-lime absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Ej: MH-MARIA-26"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50/50 dark:bg-obsidian-800 text-sm font-mono text-forest-950 dark:text-white placeholder:text-warm-400 dark:placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-forest-600 dark:focus:ring-neon-lime"
                  />
                </div>
              </div>

              {/* RGPD Consents */}
              <div className="pt-2 space-y-2 border-t border-warm-200 dark:border-white/10">
                <label className="flex items-start gap-2 text-xs text-forest-700 dark:text-obsidian-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-0.5 rounded border-warm-300 text-forest-800 focus:ring-forest-600"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <Link href="/privacidad-rgpd" target="_blank" className="underline text-forest-900 dark:text-neon-lime font-semibold">
                      Política de Privacidad y RGPD
                    </Link>{' '}
                    del Centro Parasanitario M&amp;H. <span className="text-rose-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-2 text-xs text-forest-700 dark:text-obsidian-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-0.5 rounded border-warm-300 text-forest-800 focus:ring-forest-600"
                  />
                  <span>
                    Deseo recibir confirmaciones de cita, recordatorios y ofertas exclusivas de bienestar por WhatsApp y email.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 px-4 rounded-full text-sm font-semibold text-white bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:text-obsidian-950 dark:hover:bg-neon-lime/90 active:scale-[0.98] transition-all shadow-soft-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold-300 dark:text-obsidian-950" />
                <span>Registrarme y Obtener 50 Puntos</span>
              </button>
            </form>
          )}

          {/* Quick Demo Access Switcher */}
          <div className="mt-6 pt-5 border-t border-warm-200 dark:border-white/10 text-center">
            <button
              type="button"
              onClick={() => setShowDemoSelector(!showDemoSelector)}
              className="text-xs text-forest-600 dark:text-obsidian-400 hover:text-forest-900 dark:hover:text-white transition-colors underline flex items-center justify-center gap-1.5 mx-auto"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{showDemoSelector ? 'Ocultar cuentas de prueba' : 'Probar con cuentas de demostración'}</span>
            </button>

            {showDemoSelector && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left animate-in fade-in">
                <button
                  type="button"
                  onClick={() => { loginAs('maria.garcia@email.com'); if (onSuccess) onSuccess(); }}
                  className="p-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-100/60 dark:bg-obsidian-800 hover:bg-warm-200 dark:hover:bg-obsidian-750 text-xs transition-colors"
                >
                  <p className="font-semibold text-forest-900 dark:text-white">María García</p>
                  <p className="text-[11px] text-forest-600 dark:text-obsidian-400">Cliente habitual (250 pts)</p>
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('carlos.ruiz@email.com'); if (onSuccess) onSuccess(); }}
                  className="p-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-100/60 dark:bg-obsidian-800 hover:bg-warm-200 dark:hover:bg-obsidian-750 text-xs transition-colors"
                >
                  <p className="font-semibold text-forest-900 dark:text-white">Carlos Ruiz</p>
                  <p className="text-[11px] text-forest-600 dark:text-obsidian-400">Cliente nuevo (50 pts)</p>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Security / Privacy badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-forest-600 dark:text-obsidian-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-neon-lime" />
          <span>Tus datos están protegidos conforme al RGPD &amp; LOPDGDD</span>
        </div>

      </div>
    </div>
  );
}


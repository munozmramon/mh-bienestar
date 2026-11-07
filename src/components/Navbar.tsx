'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useTheme } from '@/lib/theme/ThemeContext';
import { 
  Calendar, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  MessageCircle, 
  Gift, 
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Home,
  Star,
  Phone,
  Smartphone,
  Download,
  Share2,
  QrCode
} from 'lucide-react';
import QRCode from 'qrcode';
import ViralShareModal from './ViralShareModal';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, loginAs, logout, businessConfig } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [viralModalOpen, setViralModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  React.useEffect(() => {
    QRCode.toDataURL('https://mh-bienestar.vercel.app', {
      width: 220,
      margin: 1.5,
      color: {
        dark: '#022c22',
        light: '#ffffff'
      }
    }).then(setQrCodeDataUrl).catch(console.error);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleOpenInstall = () => setInstallModalOpen(true);
    const handleOpenViral = () => setViralModalOpen(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('open-pwa-install', handleOpenInstall);
    window.addEventListener('open-viral-share', handleOpenViral);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('open-pwa-install', handleOpenInstall);
      window.removeEventListener('open-viral-share', handleOpenViral);
    };
  }, []);

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setInstallModalOpen(false);
        }
      } catch (err) {}
      setDeferredPrompt(null);
    } else {
      setInstallModalOpen(true);
    }
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Bonos & Regalos', href: '/bonos-y-regalos' },
    { name: 'Opiniones', href: '/opiniones' },
  ];

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'staff';

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-soft-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-soft-sm group-hover:scale-105 transition-all border border-teal-500/40 shrink-0">
              <img 
                src="/logo.png" 
                alt="Centro Parasanitario M&H" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-2xl font-bold tracking-tight text-zinc-50 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                M&amp;H <span className="text-teal-600 dark:text-teal-400 font-sans font-medium text-sm sm:text-lg tracking-widest uppercase">Bienestar</span>
              </span>
              <span className="hidden sm:block text-[11px] font-serif italic text-zinc-500 dark:text-zinc-400">
                Tu bienestar, nuestra esencia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-teal-700 dark:text-teal-300 bg-teal-900/30 dark:bg-teal-950/80 border border-teal-500/40 font-bold shadow-soft-sm'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-zinc-800/30'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Theme Toggle Button: Día / Noche (Estilo OrceraTour) */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white shadow-soft-sm transition-all"
              title={theme === 'dark' ? 'Cambiar a Modo Día' : 'Cambiar a Modo Noche'}
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-400 font-bold">Noche</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="text-zinc-100 font-bold">Día</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp button */}
            <a
              href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%20M%26H%20Bienestar%2C%20quisiera%20consultar%20sobre%20sus%20servicios%20en%20Orcera.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-forest-700 dark:text-obsidian-200 hover:text-emerald-700 dark:hover:text-neon-emerald hover:bg-emerald-50 dark:hover:bg-obsidian-800 transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-white/10"
              title="WhatsApp Directo"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Client Access / User Profile */}
            {!currentUser ? (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-warm-300 dark:border-white/10 bg-white/70 dark:bg-obsidian-800 hover:bg-white dark:hover:bg-obsidian-700 text-forest-800 dark:text-obsidian-100 shadow-soft-sm transition-all"
              >
                <UserIcon className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
                <span>Acceso Clientes</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-warm-300 dark:border-white/10 bg-white/70 dark:bg-obsidian-800 hover:bg-white dark:hover:bg-obsidian-700 text-forest-800 dark:text-obsidian-100 shadow-soft-sm transition-all"
                >
                  {isAdmin ? (
                    <span className="flex items-center gap-1.5 text-gold-700 dark:text-neon-lime font-semibold">
                      <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-neon-lime" />
                      Admin M&amp;H
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-forest-700 dark:text-obsidian-100 font-semibold">
                      <UserIcon className="w-4 h-4 text-sage-600 dark:text-neon-lime" />
                      {currentUser.name.split(' ')[0]}
                    </span>
                  )}
                  {!isAdmin && (
                    <span className="text-[10px] bg-sage-100 dark:bg-obsidian-700 text-forest-800 dark:text-neon-lime px-1.5 py-0.5 rounded-full font-bold">
                      {currentUser.loyaltyPoints || 0} pts
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-forest-500 dark:text-obsidian-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-obsidian-850 shadow-soft-xl border border-warm-300 dark:border-white/10 p-2 text-sm z-50 text-forest-900 dark:text-obsidian-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2.5 border-b border-warm-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-500 dark:text-obsidian-400">
                          {isAdmin ? '🛡️ Administrador' : '👤 Cliente Registrado'}
                        </span>
                        {!isAdmin && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-neon-lime bg-emerald-50 dark:bg-obsidian-700 px-2 py-0.5 rounded-full">
                            {currentUser.loyaltyPoints || 0} pts
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-forest-900 dark:text-white truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-sage-600 dark:text-neon-lime truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <div className="py-1.5 space-y-1">
                      {isAdmin ? (
                        <>
                          <Link
                            href="/admin"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-gold-700 dark:text-neon-lime font-medium text-xs transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-neon-lime shrink-0" />
                            <span>Panel Administrativo &amp; Fichas</span>
                          </Link>
                          <Link
                            href="/mi-cuenta"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-forest-800 dark:text-obsidian-100 transition-colors font-medium text-xs"
                          >
                            <UserIcon className="w-4 h-4 text-forest-600 dark:text-neon-lime shrink-0" />
                            <span>Vista Previa Portal Cliente</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/mi-cuenta"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-forest-800 dark:text-obsidian-100 transition-colors font-medium text-xs"
                          >
                            <UserIcon className="w-4 h-4 text-emerald-600 dark:text-neon-lime shrink-0" />
                            <span>🌿 Mi Historia &amp; Citas (Privado)</span>
                          </Link>
                          <Link
                            href="/mi-cuenta?tab=bonos"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-forest-800 dark:text-obsidian-100 transition-colors font-medium text-xs"
                          >
                            <Gift className="w-4 h-4 text-gold-600 dark:text-neon-lime shrink-0" />
                            <span>Mis Bonos y Puntos</span>
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="pt-1.5 border-t border-warm-200 dark:border-white/10">
                      <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium text-xs text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Viral Share Quick CTA */}
            <button
              onClick={() => setViralModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-forest-900 dark:text-neon-lime bg-gold-100/90 dark:bg-obsidian-800 hover:bg-gold-200 dark:hover:bg-obsidian-750 border border-gold-300 dark:border-neon-lime/30 shadow-soft-sm transition-all"
              title="Invita a un amigo y gana 15€"
            >
              <Gift className="w-3.5 h-3.5 text-gold-600 dark:text-neon-lime animate-pulse" />
              <span>Gana 15€</span>
            </button>

            {/* Direct Booking CTA (OrceraTour Teal) */}
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-md shadow-teal-600/25 hover:shadow-teal-500/40"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Pedir Cita</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Compartir, App, Tema, Menú */}
          <div className="flex md:hidden items-center gap-1 sm:gap-1.5">
            {/* Botón 1-Clic Compartir */}
            <button
              onClick={() => setViralModalOpen(true)}
              className="px-2 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
              title="Compartir M&H Bienestar"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px]">Compartir</span>
            </button>

            {/* Botón Instalar App en el Móvil */}
            <button
              onClick={handleTriggerInstall}
              className="px-2 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
              title="Instalar App M&H Bienestar"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[10px]">App</span>
            </button>

            {/* Selector de Tema */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 shadow-sm transition-colors"
              title={theme === 'dark' ? 'Modo Día' : 'Modo Noche'}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-teal-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            </button>

            {/* Menú Maestro de Navegación */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-zinc-100 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 shadow-sm transition-all"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-4 h-4 text-teal-400" />
              <span className="text-[11px] font-semibold">Menú</span>
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Off-Canvas Slide Drawer (Rendered at root outside <header> to avoid CSS clipping) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Lateral Slide-Over Panel */}
          <div className="relative w-full max-w-[320px] bg-zinc-950 text-zinc-100 h-[100dvh] border-l border-zinc-800 shadow-2xl p-5 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-250">
            
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-teal-500/40 shrink-0">
                    <img src="/logo.png" alt="M&H" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold text-white block">M&amp;H Bienestar</span>
                    <span className="text-[10px] text-teal-400 font-serif italic block">Centro en Orcera</span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links with Elegant Icons */}
              <div className="space-y-1.5">
                {[
                  { name: 'Inicio', href: '/', icon: Home },
                  { name: 'Servicios & Masajes', href: '/servicios', icon: Sparkles },
                  { name: 'Bonos & Regalos', href: '/bonos-y-regalos', icon: Gift },
                  { name: 'Opiniones en Orcera', href: '/opiniones', icon: Star },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-teal-900/40 text-teal-300 border border-teal-500/30'
                          : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-zinc-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Patient / Admin Area Card (Clean & Refined) */}
              <div className="pt-2">
                {!currentUser ? (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-teal-500/40 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-950 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-100 group-hover:text-teal-300 transition-colors">
                        Acceso Pacientes (Mi Ficha)
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Inicia sesión o regístrate (+50 pts)
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        {isAdmin ? '🛡️ Administrador' : '👤 Paciente'}
                      </span>
                      {!isAdmin && (
                        <span className="text-[10px] font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-500/20">
                          {currentUser.loyaltyPoints || 0} pts
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-950/40 text-amber-300 border border-amber-600/30"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Panel Administrativo &amp; Fichas</span>
                      </Link>
                    )}

                    <Link
                      href="/mi-cuenta"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200"
                    >
                      <UserIcon className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{isAdmin ? 'Vista Portal Paciente' : '🌿 Mi Historia & Citas'}</span>
                    </Link>

                    <button
                      onClick={() => { setMobileMenuOpen(false); logout(); }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 text-left pt-1 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Referral Promotion (Sober & Elegant) */}
              <button
                onClick={() => { setMobileMenuOpen(false); setViralModalOpen(true); }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-semibold text-zinc-200">Invita un amigo y gana 15€</span>
                </div>
                <span className="text-[10px] font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-500/20">150 pts</span>
              </button>

              {/* Install PWA Button */}
              <button
                onClick={() => { setMobileMenuOpen(false); setInstallModalOpen(true); }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-teal-950/40 hover:bg-teal-950/60 border border-teal-500/30 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-semibold text-teal-200">Descargar App en mi Móvil</span>
                </div>
                <span className="text-[10px] font-bold text-teal-300 bg-teal-900/80 px-2 py-0.5 rounded-full border border-teal-500/20">Instalar</span>
              </button>

            </div>

            {/* Drawer Footer with Quick Action Grid (Compartir & Instalar App) & Clinic Contact */}
            <div className="pt-4 border-t border-zinc-850 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setViralModalOpen(true); }}
                  className="w-full py-2.5 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Compartir</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleTriggerInstall(); }}
                  className="w-full py-2.5 px-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  <span>Instalar App</span>
                </button>
              </div>

              <div className="text-center text-xs text-zinc-400 space-y-1">
                <p className="text-[11px] font-medium text-zinc-300">
                  📍 Calle San José, 2 · Orcera (Jaén)
                </p>
                <a
                  href={`tel:${businessConfig.phone ? businessConfig.phone.replace(/\s+/g, '') : '651308738'}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{businessConfig.phone || '651 30 87 38'}</span>
                </a>
                <p className="text-[10px] text-zinc-500">
                  Atención presencial bajo cita previa
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Global Referral Viral Modal */}
      <ViralShareModal isOpen={viralModalOpen} onClose={() => setViralModalOpen(false)} />

      {/* Install Guidance Modal (Arquitectura Oliversia) */}
      {installModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full shadow-2xl text-zinc-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Cabecera */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white p-0.5 border border-teal-500/40 shrink-0 shadow-md">
                  <img src="/logo.png" alt="M&H Bienestar" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-white leading-tight">Instalar M&amp;H Bienestar</h3>
                  <p className="text-[10.5px] text-teal-400 font-mono">En tu pantalla como App Nativa</p>
                </div>
              </div>
              <button
                onClick={() => setInstallModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-sm transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Badge informativa estilo Oliversia */}
              <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/40 text-emerald-100 space-y-1 leading-relaxed">
                <div className="font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Sin pasar por App Store ni Google Play</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Instala M&amp;H Bienestar directamente en tu dispositivo: no ocupa memoria, arranca a pantalla completa y se actualiza sola al instante.
                </p>
              </div>

              {/* Botón Nativo Directo para Android / Chrome */}
              <div className="space-y-2">
                <button
                  onClick={handleTriggerInstall}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-teal-950/60 transition active:scale-[0.99] text-sm"
                >
                  <Download className="w-5 h-5 text-white" />
                  <span>📲 Instalar App en este Dispositivo</span>
                </button>
              </div>

              {/* Guía Paso a Paso para iPhone / iPad (Safari) */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="text-base">🍏</span>
                  <span>¿Usas iPhone o iPad (Safari)? Sigue estos 3 pasos:</span>
                </div>
                <ol className="space-y-2.5 text-[11px] text-zinc-300 list-none">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">1</span>
                    <div>
                      Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba en la barra inferior de Safari).
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">2</span>
                    <div>
                      Desplaza hacia abajo y pulsa <strong>«Añadir a la pantalla de inicio»</strong> (icono de cuadrado con símbolo +).
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">3</span>
                    <div>
                      Pulsa <strong>«Añadir»</strong> arriba a la derecha. ¡Listo! M&amp;H Bienestar aparecerá como una app en tu pantalla.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Guía Paso a Paso para Android (Chrome / Samsung) */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="text-base">📱</span>
                  <span>¿Usas Android (Chrome o Samsung Internet)?</span>
                </div>
                <ol className="space-y-2.5 text-[11px] text-zinc-300 list-none">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">1</span>
                    <div>
                      Toca los <strong>3 puntos (⋮)</strong> arriba a la derecha en Chrome.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">2</span>
                    <div>
                      Pulsa en <strong>«Instalar aplicación»</strong> o <strong>«Añadir a la pantalla principal»</strong>.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold shrink-0 text-xs">3</span>
                    <div>
                      Pulsa <strong>«Instalar»</strong> para confirmar. ¡Quedará fija en tu móvil!
                    </div>
                  </li>
                </ol>
              </div>

              {/* Enviar enlace a WhatsApp o Escanear si está en PC */}
              <div className="pt-2 border-t border-zinc-800 space-y-3">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  ¿Estás en tu ordenador? Pásala a tu móvil:
                </span>

                <a
                  href="https://api.whatsapp.com/send?text=Abre%20e%20instala%20la%20App%20de%20M%26H%20Bienestar%20en%20tu%20m%C3%B3vil%3A%20https%3A%2F%2Fmh-bienestar.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                  <span>Enviar enlace a mi móvil por WhatsApp</span>
                </a>

                {qrCodeDataUrl && (
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
                    <p className="text-[11px] text-zinc-300">
                      O apunta con la <strong>cámara del móvil</strong> a este código:
                    </p>
                    <div className="bg-white p-1.5 rounded-xl inline-block shadow-md">
                      <img src={qrCodeDataUrl} alt="Escanear con el móvil para instalar" className="w-28 h-28 mx-auto" />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Pie */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-center text-[10px] text-zinc-500 font-mono">
              Compatible con iOS (iPhone/iPad), Android, Windows y Mac
            </div>

          </div>
        </div>
      )}
    </>
  );
}

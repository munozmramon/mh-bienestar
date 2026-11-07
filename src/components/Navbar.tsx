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
  Moon
} from 'lucide-react';
import ViralShareModal from './ViralShareModal';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, loginAs, logout, businessConfig } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [viralModalOpen, setViralModalOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Bonos & Regalos', href: '/bonos-y-regalos' },
    { name: 'Opiniones', href: '/opiniones' },
  ];

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'staff';

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-soft-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-soft-sm group-hover:scale-105 transition-all border border-teal-500/40 shrink-0">
              <img 
                src="/logo.png" 
                alt="Centro Parasanitario M&H" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-zinc-50 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                M&amp;H <span className="text-teal-600 dark:text-teal-400 font-sans font-medium text-lg tracking-widest uppercase">Bienestar Integral</span>
              </span>
              <span className="text-[11px] font-serif italic text-zinc-500 dark:text-zinc-400">
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

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-300 bg-zinc-900 border border-zinc-800"
              title="Cambiar tema"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4 text-teal-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
            <Link
              href="/reservar"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-teal-600 shadow-sm"
            >
              Pedir Cita
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-forest-700 dark:text-obsidian-100 hover:bg-warm-200 dark:hover:bg-obsidian-800"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-warm-100 dark:bg-obsidian-900 border-b border-warm-300 dark:border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-base font-medium text-forest-800 dark:text-obsidian-100 hover:bg-warm-200 dark:hover:bg-obsidian-800"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-warm-200 dark:border-white/10 space-y-2">
            {!currentUser ? (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 dark:text-teal-300 bg-emerald-50 dark:bg-obsidian-800 border border-emerald-200 dark:border-white/10"
              >
                <UserIcon className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
                Acceso Clientes / Iniciar Sesión
              </Link>
            ) : (
              <>
                <div className="px-3 py-2 bg-white/70 dark:bg-obsidian-800 rounded-xl border border-warm-200 dark:border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-forest-500 dark:text-obsidian-400 font-semibold">
                    {isAdmin ? '🛡️ Administrador' : '👤 Cliente Registrado'}
                  </p>
                  <p className="font-semibold text-forest-900 dark:text-white text-sm truncate">{currentUser.name}</p>
                </div>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-gold-800 dark:text-neon-lime bg-gold-100/70 dark:bg-obsidian-800 border border-gold-300 dark:border-neon-lime/30"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold-700 dark:text-neon-lime" />
                    Panel Administrativo &amp; Fichas
                  </Link>
                )}

                <Link
                  href="/mi-cuenta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-forest-800 dark:text-obsidian-100 bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10"
                >
                  <UserIcon className="w-4 h-4 text-sage-600 dark:text-neon-lime" />
                  {isAdmin ? 'Vista Previa Portal Cliente' : '🌿 Mi Historia & Citas (Privado)'}
                </Link>

                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 text-left transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  Cerrar Sesión
                </button>
              </>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); setViralModalOpen(true); }}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-forest-900 dark:text-neon-lime bg-gold-100/70 dark:bg-obsidian-800 border border-gold-300 dark:border-neon-lime/30"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-gold-600 dark:text-neon-lime" />
                <span>Invita a un Amigo y Gana 15€</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gold-200 text-gold-900 dark:bg-neon-lime/20 dark:text-neon-lime text-[10px] font-bold">150 pts</span>
            </button>

            <div className="pt-2">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium text-emerald-800 dark:text-obsidian-950 bg-emerald-100/80 dark:bg-neon-lime font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp M&amp;H: {businessConfig.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Referral Viral Modal */}
      <ViralShareModal isOpen={viralModalOpen} onClose={() => setViralModalOpen(false)} />
    </header>
  );
}

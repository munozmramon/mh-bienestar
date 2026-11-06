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

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, loginAs, logout, businessConfig } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Bonos & Regalos', href: '/bonos-y-regalos' },
    { name: 'Opiniones', href: '/opiniones' },
    { name: 'Blog', href: '/blog' },
  ];

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'staff';

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-warm-300/60 dark:border-white/10 shadow-soft-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-soft-sm group-hover:scale-105 transition-all border border-warm-300 dark:border-neon-lime/50 shrink-0">
              <img 
                src="/logo.png" 
                alt="Centro Parasanitario M&H" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-900 dark:text-white group-hover:text-forest-700 dark:group-hover:text-neon-lime transition-colors">
                M&amp;H <span className="text-gold-600 dark:text-neon-lime font-sans font-medium text-lg tracking-widest uppercase">Bienestar</span>
              </span>
              <span className="text-[11px] font-medium tracking-wider text-sage-600 dark:text-obsidian-300 uppercase">
                Centro Parasanitario · Orcera
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
                      ? 'text-forest-800 dark:text-obsidian-950 bg-warm-200/80 dark:bg-neon-lime font-semibold shadow-soft-sm'
                      : 'text-forest-700/80 dark:text-obsidian-200 hover:text-forest-900 dark:hover:text-neon-lime hover:bg-warm-200/40 dark:hover:bg-obsidian-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Theme Toggle Button: Día / Noche Moderno */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-warm-300 dark:border-white/10 bg-white/70 dark:bg-obsidian-800 text-forest-800 dark:text-obsidian-100 hover:bg-white dark:hover:bg-obsidian-700 shadow-soft-sm transition-all"
              title={theme === 'dark' ? 'Cambiar a Modo Día (Orgánico)' : 'Cambiar a Modo Noche (Moderno)'}
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4 text-neon-lime" />
                  <span className="text-neon-lime font-bold">Noche</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Día</span>
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

            {/* Quick Demo Switcher / Profile */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-warm-300 dark:border-white/10 bg-white/70 dark:bg-obsidian-800 hover:bg-white dark:hover:bg-obsidian-700 text-forest-800 dark:text-obsidian-100 shadow-soft-sm transition-all"
              >
                {isAdmin ? (
                  <span className="flex items-center gap-1.5 text-gold-700 dark:text-neon-lime font-semibold">
                    <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-neon-lime" />
                    Admin
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-forest-700 dark:text-obsidian-100 font-semibold">
                    <UserIcon className="w-4 h-4 text-sage-600 dark:text-neon-lime" />
                    {currentUser ? currentUser.name.split(' ')[0] : 'Acceder'}
                  </span>
                )}
                {currentUser && (
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
                  <div className="px-3 py-2 border-b border-warm-200 dark:border-white/10">
                    <p className="text-xs text-forest-500 dark:text-obsidian-400 font-medium">Sesión actual</p>
                    <p className="font-semibold text-forest-900 dark:text-white truncate">
                      {currentUser ? currentUser.name : 'No identificado'}
                    </p>
                    <p className="text-xs text-sage-600 dark:text-neon-lime truncate">
                      {currentUser ? currentUser.email : 'Visita pública'}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/mi-cuenta"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-forest-800 dark:text-obsidian-100 transition-colors font-medium text-xs"
                    >
                      <UserIcon className="w-4 h-4 text-forest-600 dark:text-neon-lime" />
                      Mi Portal de Cliente &amp; Puntos
                    </Link>

                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warm-100 dark:hover:bg-obsidian-750 text-forest-800 dark:text-obsidian-100 transition-colors font-medium text-xs"
                    >
                      <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-neon-lime" />
                      Panel Administrativo &amp; CRM
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-warm-200 dark:border-white/10">
                    <p className="px-3 text-[11px] font-bold text-forest-400 dark:text-obsidian-400 uppercase tracking-wider mb-1">
                      Cambio rápido de perfil (Demo)
                    </p>
                    <button
                      onClick={() => loginAs('maria.garcia@email.com')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-sage-50 dark:hover:bg-obsidian-700 text-forest-700 dark:text-obsidian-200 flex justify-between"
                    >
                      <span>María García (Cliente habitual)</span>
                      <span className="text-sage-600 dark:text-neon-lime">340 pts</span>
                    </button>
                    <button
                      onClick={() => loginAs('admin@mh-bienestar.es')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-gold-50 dark:hover:bg-obsidian-700 text-gold-800 dark:text-neon-lime font-medium flex justify-between"
                    >
                      <span>Dirección M&amp;H (Administrador)</span>
                      <span className="text-gold-600 dark:text-neon-lime">Admin</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Booking CTA */}
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:text-obsidian-950 dark:hover:bg-[#d8ff68] active:scale-[0.98] transition-all shadow-soft-md hover:shadow-soft-lg dark:shadow-neon-lime border border-gold-400/20 dark:border-transparent font-bold"
            >
              <Calendar className="w-4 h-4 text-gold-300 dark:text-obsidian-950" />
              <span>Pedir Cita</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-forest-700 dark:text-neon-lime bg-white/70 dark:bg-obsidian-800 border border-warm-300 dark:border-white/10"
              title="Cambiar tema"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link
              href="/reservar"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-forest-800 dark:bg-neon-lime dark:text-obsidian-950 shadow-soft-sm font-bold"
            >
              Cita
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
            <Link
              href="/mi-cuenta"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-forest-800 dark:text-obsidian-100 bg-white dark:bg-obsidian-800 border dark:border-white/10"
            >
              <UserIcon className="w-4 h-4 text-sage-600 dark:text-neon-lime" />
              Portal Cliente (Mi Cuenta)
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-forest-900 dark:text-neon-lime bg-gold-100/70 dark:bg-obsidian-800 border border-gold-300 dark:border-neon-lime/30"
            >
              <ShieldCheck className="w-4 h-4 text-gold-700 dark:text-neon-lime" />
              Panel Administrativo
            </Link>

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
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Sparkles, 
  User, 
  MessageCircle, 
  ArrowRight, 
  ChevronRight, 
  Heart, 
  Bell, 
  Activity, 
  CheckCircle2, 
  Share2, 
  ShieldCheck,
  TrendingUp,
  Sliders,
  FileText
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import ViralShareModal from './ViralShareModal';

export default function MobileMockupHero() {
  const { currentUser, businessConfig } = useStore();
  const [viralModalOpen, setViralModalOpen] = useState(false);
  const [wellnessTipModal, setWellnessTipModal] = useState(false);

  // 4 specialties from the mockup
  const specialties = [
    {
      title: 'Osteopatía y Quiromasaje',
      icon: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          {/* Stylized vertebrae / spine */}
          <path d="M12 2v20M9 5h6M8 8h8M7 11h10M8 14h8M9 17h6M10 20h4" strokeLinecap="round" />
        </svg>
      ),
      href: '/servicios'
    },
    {
      title: 'Pilates y Movimiento',
      icon: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          {/* Stylized yoga / meditating person */}
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 9v5m-4 2 4 4 4-4M6 13l6-2 6 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      href: '/servicios'
    },
    {
      title: 'Salud y Equilibrio',
      icon: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          {/* Stylized lotus flower */}
          <path d="M12 3c-2 4-2 8 0 12 2-4 2-8 0-12zM7 8c1 3 3 6 5 7-2 1-5 0-7-2 0-2 1-4 2-5zM17 8c-1 3-3 6-5 7 2 1 5 0 7-2 0-2-1-4-2-5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      href: '/servicios'
    },
    {
      title: 'Cuidado Personal',
      icon: <Heart className="w-6 h-6 stroke-[1.8]" />,
      href: '/servicios'
    }
  ];

  // Quick services list from the second phone screen in mockup
  const quickServices = [
    {
      name: 'Osteopatía y Quiromasaje',
      desc: 'Alivio de bloqueos y contracturas profundas',
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=80',
      href: '/servicios/reeducacion-corporal-y-movilidad'
    },
    {
      name: 'Pilates y Movimiento Consciente',
      desc: 'Control postural, core y elongación activa',
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80',
      href: '/servicios/pilates-clinico-y-reeducacion-postural'
    },
    {
      name: 'Terapias Manuales & Fisioterapia',
      desc: 'Recuperación funcional y descompresión articular',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80',
      href: '/servicios'
    },
    {
      name: 'Salud Integral & Armonía',
      desc: 'Bienestar neurovegetativo y equilibrio visceral',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80',
      href: '/servicios/terapia-craneosacral-biodinamica'
    },
    {
      name: 'Asesoramiento Personalizado',
      desc: 'Pautas de ergonomía diaria y autocuidado',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      href: '/servicios'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F7F2] via-warm-50 to-[#F8F7F2] dark:from-obsidian-950 dark:via-obsidian-900 dark:to-obsidian-950 pt-4 pb-12 border-b border-warm-200 dark:border-white/10 transition-colors">
      
      {/* Container matching mobile and responsive desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* TOP BRAND HEADER (Centered logo + Slogan)                 */}
        {/* ========================================================= */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center justify-center gap-3 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white p-1 border-2 border-[#D4AF7C] shadow-soft-md shrink-0">
              <img 
                src="/logo.png" 
                alt="M&H Bienestar Integral" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="text-left">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#3B1238] dark:text-white">
                M&amp;H <span className="font-sans font-light text-xl sm:text-2xl text-[#D4AF7C] dark:text-neon-lime uppercase tracking-widest">BIENESTAR INTEGRAL</span>
              </h1>
              <p className="font-serif italic text-sm sm:text-base text-forest-700/80 dark:text-obsidian-300">
                Tu bienestar, nuestra esencia
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4 SPECIALTY PILLS (Row with custom icons)                  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          {specialties.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 hover:border-[#D4AF7C] hover:shadow-soft-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#3B1238]/10 dark:bg-neon-lime/20 text-[#3B1238] dark:text-neon-lime flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-forest-900 dark:text-white leading-tight">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* ========================================================= */}
        {/* MAIN 3-COLUMN / PHONE SHOWCASE LAYOUT                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* PHONE 1 (CENTER IN MOCKUP): HERO CARD + 2x2 ACTION GRID */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* HERO CARD (Exact replica of mobile mockup hero) */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-warm-300/80 dark:border-white/10 bg-white dark:bg-obsidian-850 group">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
                  alt="Cuida tu cuerpo, equilibra tu mente - M&H Bienestar Integral Orcera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20"></div>

                {/* Top Logo Watermark in Hero */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/40 shadow-soft-sm">
                  <div className="w-5 h-5 rounded-full overflow-hidden">
                    <img src="/logo.png" alt="M&H" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-forest-900 dark:text-white tracking-wide">
                    M&amp;H Orcera
                  </span>
                </div>

                {/* Hero Bottom Content from Mockup */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4AF7C] dark:text-neon-lime block mb-1">
                      Centro Parasanitario
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md leading-tight">
                      Cuida tu cuerpo,<br />
                      <span className="italic font-normal">equilibra tu mente</span>
                    </h2>
                  </div>

                  <Link
                    href="/reservar"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#3B1238] bg-[#F8F7F2] hover:bg-white active:scale-95 transition-all shadow-soft-lg shrink-0 border border-[#D4AF7C]/40"
                  >
                    <span>Reservar cita</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF7C]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2x2 QUICK ACTION CARDS (Exact replica of mockup) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Card 1: Nuestros Servicios */}
              <Link
                href="/servicios"
                className="flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 hover:border-[#D4AF7C] shadow-soft-sm hover:shadow-soft-md transition-all text-center group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#3B1238]/10 dark:bg-neon-lime/20 text-[#3B1238] dark:text-neon-lime flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950 dark:text-white">
                  Nuestros Servicios
                </h3>
                <p className="text-[11px] text-forest-600 dark:text-obsidian-400 mt-0.5">
                  Catálogo y tarifas
                </p>
              </Link>

              {/* Card 2: Reservar Cita */}
              <Link
                href="/reservar"
                className="flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 hover:border-[#D4AF7C] shadow-soft-sm hover:shadow-soft-md transition-all text-center group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF7C]/20 dark:bg-[#D4AF7C]/30 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950 dark:text-white">
                  Reservar Cita
                </h3>
                <p className="text-[11px] text-forest-600 dark:text-obsidian-400 mt-0.5">
                  Elige día y hora
                </p>
              </Link>

              {/* Card 3: Tu Perfil */}
              <Link
                href="/mi-cuenta"
                className="flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 hover:border-[#D4AF7C] shadow-soft-sm hover:shadow-soft-md transition-all text-center group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#A7B89F]/20 dark:bg-neon-lime/20 text-[#3B1238] dark:text-neon-lime flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950 dark:text-white">
                  Tu Perfil
                </h3>
                <p className="text-[11px] text-forest-600 dark:text-obsidian-400 mt-0.5">
                  Historia RH y citas
                </p>
              </Link>

              {/* Card 4: Consejos de Bienestar */}
              <button
                onClick={() => setWellnessTipModal(true)}
                className="flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 hover:border-[#D4AF7C] shadow-soft-sm hover:shadow-soft-md transition-all text-center group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 dark:bg-neon-lime/20 text-emerald-700 dark:text-neon-lime flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950 dark:text-white">
                  Consejos de Bienestar
                </h3>
                <p className="text-[11px] text-forest-600 dark:text-obsidian-400 mt-0.5">
                  Pautas y hábitos
                </p>
              </button>

            </div>

          </div>

          {/* PHONE 2 & 3 (SECONDARY SCREENS FROM MOCKUP): SERVICIOS + MI PERFIL */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SECONDARY SCREEN: NUESTROS SERVICIOS LIST */}
            <div className="rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-300/80 dark:border-white/10 p-5 shadow-soft-lg">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-warm-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF7C]" />
                  <h3 className="font-serif font-bold text-base text-forest-950 dark:text-white">
                    Nuestros Servicios
                  </h3>
                </div>
                <Link
                  href="/servicios"
                  className="text-xs font-semibold text-[#3B1238] dark:text-neon-lime hover:underline"
                >
                  Ver todos →
                </Link>
              </div>

              <div className="space-y-2.5">
                {quickServices.map((srv, idx) => (
                  <Link
                    key={idx}
                    href={srv.href}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F8F7F2]/80 dark:bg-obsidian-800 hover:bg-white dark:hover:bg-obsidian-750 border border-warm-200/70 dark:border-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-warm-300 dark:border-white/10">
                        <img src={srv.img} alt={srv.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-forest-900 dark:text-white leading-tight">
                          {srv.name}
                        </p>
                        <p className="text-[10px] text-forest-600 dark:text-obsidian-400 mt-0.5">
                          {srv.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-forest-400 dark:text-obsidian-400 group-hover:text-[#3B1238] dark:group-hover:text-neon-lime group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* TERTIARY SCREEN: MI PERFIL PREVIEW */}
            <div className="rounded-3xl bg-[#F8F7F2] dark:bg-obsidian-850 border border-warm-300/80 dark:border-white/10 p-5 shadow-soft-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#3B1238] dark:text-neon-lime uppercase tracking-wider">
                  Acceso Cliente · Mi Historia RH
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#D4AF7C]/20 text-[#D4AF7C] font-bold">
                  👑 Cliente Premium
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-warm-200 border-2 border-[#D4AF7C] shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    alt="Cliente M&H"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-white">
                    {currentUser ? currentUser.name : 'María López'}
                  </h4>
                  <p className="text-[11px] text-forest-600 dark:text-obsidian-400">
                    Socio Club Bienestar M&amp;H
                  </p>
                </div>
              </div>

              {/* Menu items matching mockup tertiary screen */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/mi-cuenta"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 hover:border-[#D4AF7C] transition-colors"
                >
                  <span className="font-semibold text-forest-800 dark:text-white">📅 Mis Citas</span>
                  <ChevronRight className="w-3.5 h-3.5 text-forest-400" />
                </Link>

                <Link
                  href="/mi-cuenta"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 hover:border-[#D4AF7C] transition-colors"
                >
                  <span className="font-semibold text-forest-800 dark:text-white">📋 Historia RH</span>
                  <ChevronRight className="w-3.5 h-3.5 text-forest-400" />
                </Link>

                <Link
                  href="/mi-cuenta"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 hover:border-[#D4AF7C] transition-colors"
                >
                  <span className="font-semibold text-forest-800 dark:text-white">⚙️ Preferencias</span>
                  <ChevronRight className="w-3.5 h-3.5 text-forest-400" />
                </Link>

                <Link
                  href="/mi-cuenta?tab=notificaciones"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 hover:border-[#D4AF7C] transition-colors"
                >
                  <span className="font-semibold text-forest-800 dark:text-white">🔔 Notificaciones</span>
                  <ChevronRight className="w-3.5 h-3.5 text-forest-400" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION FROM MOCKUP: PALETTE & APLICACIONES EN LA APP */}
        {/* ========================================================= */}
        <div className="mt-12 pt-8 border-t border-warm-300/80 dark:border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Paleta de Colores */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-[11px] font-bold text-forest-600 dark:text-obsidian-400 uppercase tracking-wider block">
                Paleta de Colores M&amp;H
              </span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#3B1238] border border-white/60 shadow-soft-xs"></div>
                  <span className="text-[10px] font-semibold text-forest-800 dark:text-obsidian-300 mt-1">Verde Salud</span>
                  <span className="text-[9px] text-forest-500 dark:text-obsidian-400">#3B1238</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#A7B89F] border border-white/60 shadow-soft-xs"></div>
                  <span className="text-[10px] font-semibold text-forest-800 dark:text-obsidian-300 mt-1">Verde Natural</span>
                  <span className="text-[9px] text-forest-500 dark:text-obsidian-400">#A7B89F</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF7C] border border-white/60 shadow-soft-xs"></div>
                  <span className="text-[10px] font-semibold text-forest-800 dark:text-obsidian-300 mt-1">Dorado</span>
                  <span className="text-[9px] text-forest-500 dark:text-obsidian-400">#D4AF7C</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#F8F7F2] border border-warm-300 shadow-soft-xs"></div>
                  <span className="text-[10px] font-semibold text-forest-800 dark:text-obsidian-300 mt-1">Crema</span>
                  <span className="text-[9px] text-forest-500 dark:text-obsidian-400">#F8F7F2</span>
                </div>
              </div>
            </div>

            {/* Aplicaciones en la App */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-[11px] font-bold text-forest-600 dark:text-obsidian-400 uppercase tracking-wider block">
                Aplicaciones en la App
              </span>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 flex items-center justify-center text-[#3B1238] dark:text-neon-lime mb-1 shadow-soft-xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-[9.5px] font-medium text-forest-800 dark:text-obsidian-300 leading-tight">Reservas Online</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 flex items-center justify-center text-[#3B1238] dark:text-neon-lime mb-1 shadow-soft-xs">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-[9.5px] font-medium text-forest-800 dark:text-obsidian-300 leading-tight">Notificaciones</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 flex items-center justify-center text-[#3B1238] dark:text-neon-lime mb-1 shadow-soft-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[9.5px] font-medium text-forest-800 dark:text-obsidian-300 leading-tight">Programas</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 flex items-center justify-center text-[#3B1238] dark:text-neon-lime mb-1 shadow-soft-xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[9.5px] font-medium text-forest-800 dark:text-obsidian-300 leading-tight">Seguimiento</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 flex items-center justify-center text-[#D4AF7C] dark:text-neon-lime mb-1 shadow-soft-xs">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-[9.5px] font-medium text-forest-800 dark:text-obsidian-300 leading-tight">Promociones</span>
                </div>
              </div>
            </div>

            {/* Checkmark Bullets */}
            <div className="md:col-span-3 bg-white/80 dark:bg-obsidian-850 p-4 rounded-2xl border border-warm-200 dark:border-white/10 space-y-1.5 shadow-soft-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-forest-900 dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#3B1238] dark:text-neon-lime shrink-0" />
                <span>Marca premium y cercana</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-forest-900 dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#3B1238] dark:text-neon-lime shrink-0" />
                <span>Experiencia integral de bienestar</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-forest-900 dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#3B1238] dark:text-neon-lime shrink-0" />
                <span>Conexión continua con tus cuidados</span>
              </div>
            </div>

          </div>

          {/* Slogan Banner */}
          <div className="mt-6 py-2.5 px-4 rounded-xl bg-[#3B1238] text-white text-center font-serif tracking-widest text-xs uppercase shadow-soft-sm">
            M&amp;H BIENESTAR INTEGRAL · CUIDAMOS DE TI, CUERPO Y MENTE
          </div>
        </div>

      </div>

      {/* Wellness Tips Modal */}
      {wellnessTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-obsidian-900 rounded-3xl max-w-lg w-full p-6 border border-warm-300 dark:border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-neon-lime/20 text-emerald-800 dark:text-neon-lime flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-lg text-forest-950 dark:text-white">
                  Consejos de Bienestar M&amp;H
                </h3>
              </div>
              <button
                onClick={() => setWellnessTipModal(false)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-warm-100 hover:bg-warm-200 dark:bg-obsidian-800 dark:text-white"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-forest-700 dark:text-obsidian-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#F8F7F2] dark:bg-obsidian-800 border border-warm-200 dark:border-white/10">
                <h4 className="font-serif font-bold text-forest-950 dark:text-white mb-1">🌿 1. Descompresión Cervical al Trabajar</h4>
                <p>Cada 45 minutos frente a la pantalla, relaja hombros y realiza 3 respiraciones diafragmáticas lentas mirando al horizonte.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F7F2] dark:bg-obsidian-800 border border-warm-200 dark:border-white/10">
                <h4 className="font-serif font-bold text-forest-950 dark:text-white mb-1">🦴 2. Movilidad Lumbar Matutina</h4>
                <p>Antes de levantarte de la cama, flexiona ambas rodillas suavemente hacia el pecho durante 30 segundos para liberar la zona sacra.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F7F2] dark:bg-obsidian-800 border border-warm-200 dark:border-white/10">
                <h4 className="font-serif font-bold text-forest-950 dark:text-white mb-1">🪷 3. Sueño Reparador y Mandíbula</h4>
                <p>Si aprietas los dientes por estrés (bruxismo), coloca la lengua en el paladar detrás de los incisivos para separar la mordida antes de dormir.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Link
                href="/reservar"
                onClick={() => setWellnessTipModal(false)}
                className="w-full text-center py-3 rounded-2xl bg-[#3B1238] hover:bg-[#270925] text-white text-xs font-bold shadow-soft-sm"
              >
                Reservar Consulta con Terapeuta
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Viral Modal */}
      <ViralShareModal isOpen={viralModalOpen} onClose={() => setViralModalOpen(false)} />

    </section>
  );
}

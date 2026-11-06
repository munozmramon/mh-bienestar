'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  Bell, 
  Menu, 
  User, 
  Sparkles, 
  X, 
  Gift, 
  MessageCircle, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import ViralShareModal from './ViralShareModal';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { currentUser, businessConfig } = useStore();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const [viralModalOpen, setViralModalOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'staff';

  const navItems = [
    { name: 'Inicio', href: '/', icon: Home, isDrawer: false },
    { name: 'Agenda', href: '/reservar', icon: Calendar, isDrawer: false },
    { name: 'Notificaciones', href: '/mi-cuenta?tab=notificaciones', icon: Bell, isDrawer: false },
    { name: 'Más', href: '#menu', icon: Menu, isDrawer: true },
  ];

  return (
    <>
      {/* Floating Bottom Nav (Mobile Only) */}
      <nav aria-label="Navegación móvil inferior" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0F0A1C]/95 backdrop-blur-xl border-t border-slate-200 dark:border-purple-900/30 px-2 py-1.5 shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isDrawer && (
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('?')[0])
            );

            if (item.isDrawer) {
              return (
                <button
                  key="more-menu-btn"
                  onClick={() => setMoreDrawerOpen(true)}
                  className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-slate-600 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  <div className="p-1.5 rounded-xl bg-transparent active:bg-purple-100 dark:active:bg-purple-950/50">
                    <Menu className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-[10.5px] mt-0.5 tracking-tight font-medium">Más</span>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#7C3AED] dark:text-[#A78BFA] font-bold scale-105'
                    : 'text-slate-500 dark:text-purple-300/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#EDE9FE] dark:bg-purple-950/60' 
                    : 'bg-transparent'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
                <span className="text-[10.5px] mt-0.5 tracking-tight font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Drawer for "Más" */}
      {moreDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setMoreDrawerOpen(false)}
          />
          <div className="relative bg-[#FAF7FD] dark:bg-[#1A132E] rounded-t-3xl border-t border-purple-200 dark:border-purple-900/40 p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 border border-purple-200 dark:border-purple-800">
                  <img src="/logo.png" alt="M&H" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#3B1238] dark:text-white">M&amp;H Bienestar Integral</h3>
                  <p className="text-[11px] text-purple-700/80 dark:text-purple-300 italic">Tu bienestar, nuestra esencia</p>
                </div>
              </div>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/40 text-[#3B1238] dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/servicios"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 shadow-soft-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] dark:bg-purple-900/50 dark:text-[#A78BFA] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3B1238] dark:text-white">Servicios</p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-300">Ver terapias</p>
                </div>
              </Link>

              <Link
                href="/mi-cuenta"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 shadow-soft-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C3AED] dark:bg-purple-900/50 dark:text-[#A78BFA] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3B1238] dark:text-white">Tu Perfil</p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-300">Historia RH</p>
                </div>
              </Link>

              <Link
                href="/bonos-y-regalos"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 shadow-soft-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3B1238] dark:text-white">Bonos</p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-300">Tarjetas regalo</p>
                </div>
              </Link>

              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  setViralModalOpen(true);
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-300 dark:border-purple-800 shadow-soft-xs text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3B1238] dark:text-white">Gana 15€</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">Invita amigos</p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-purple-100 dark:border-purple-900/30 space-y-2">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%20M%26H%20Bienestar%20Integral%2C%20quisiera%20hacer%20una%20consulta.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-soft-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Centro Orcera (651 30 87 38)</span>
              </a>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#3B1238] dark:bg-purple-950/80 text-white text-xs font-bold border border-purple-800/40"
                >
                  <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                  <span>Panel de Administración RH</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Viral Modal Triggered from More Drawer */}
      <ViralShareModal isOpen={viralModalOpen} onClose={() => setViralModalOpen(false)} />
    </>
  );
}

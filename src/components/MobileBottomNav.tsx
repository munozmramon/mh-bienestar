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
      <nav aria-label="Navegación móvil inferior" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-2 py-1.5 shadow-2xl safe-area-pb">
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
                  className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-zinc-400 hover:text-zinc-100 transition-all"
                >
                  <div className="p-1.5 rounded-xl bg-transparent active:bg-zinc-800">
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
                    ? 'text-teal-600 dark:text-teal-400 font-bold scale-105'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-teal-900/40 text-teal-600 dark:text-teal-400' 
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
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0"
            onClick={() => setMoreDrawerOpen(false)}
          />
          <div className="relative bg-zinc-900 rounded-t-3xl border-t border-zinc-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 border border-zinc-700">
                  <img src="/logo.png" alt="M&H" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-zinc-50 dark:text-zinc-100">M&amp;H Bienestar Integral</h3>
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 italic">Tu bienestar, nuestra esencia</p>
                </div>
              </div>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/servicios"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-850/60 hover:bg-zinc-800 border border-zinc-800 transition-all shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-900/40 text-teal-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Servicios</p>
                  <p className="text-[10px] text-zinc-400">Ver terapias</p>
                </div>
              </Link>

              <Link
                href="/mi-cuenta"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-850/60 hover:bg-zinc-800 border border-zinc-800 transition-all shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-900/40 text-teal-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Tu Perfil</p>
                  <p className="text-[10px] text-zinc-400">Historia RH</p>
                </div>
              </Link>

              <Link
                href="/bonos-y-regalos"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-850/60 hover:bg-zinc-800 border border-zinc-800 transition-all shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Bonos</p>
                  <p className="text-[10px] text-zinc-400">Tarjetas regalo</p>
                </div>
              </Link>

              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  setViralModalOpen(true);
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-850/60 hover:bg-zinc-800 border border-teal-500/30 transition-all shadow-sm text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Gana 15€</p>
                  <p className="text-[10px] text-teal-400 font-medium">Invita amigos</p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <a
                href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%20M%26H%20Bienestar%20Integral%2C%20quisiera%20hacer%20una%20consulta.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Centro Orcera (651 30 87 38)</span>
              </a>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-750 text-teal-300 text-xs font-bold border border-zinc-700 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
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

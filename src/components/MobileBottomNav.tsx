'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export default function MobileBottomNav() {
  const { businessConfig } = useStore();
  const whatsappNumber = businessConfig.whatsapp || '34651308738';
  const phoneClean = businessConfig.phone ? businessConfig.phone.replace(/\s+/g, '') : '651308738';
  const defaultMessage = 'Hola M&H Bienestar, quisiera consultar disponibilidad o pedir cita para Orcera.';

  return (
    <nav 
      aria-label="Acceso rápido móvil" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/90 px-3.5 py-2.5 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-between max-w-md mx-auto gap-3">
        
        {/* Direct Contact Options (WhatsApp + Call) */}
        <div className="flex items-center gap-2.5">
          {/* WhatsApp Direct 1-tap button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp directamente con el centro en Orcera"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white shadow-md shadow-emerald-950/30 transition-all shrink-0"
            title="WhatsApp directo"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
          </a>

          {/* Quick Call details */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-zinc-400 font-medium leading-tight">Orcera · Cita previa</span>
            <a 
              href={`tel:${phoneClean}`}
              className="text-xs font-bold text-zinc-100 hover:text-teal-400 active:text-teal-300 transition-colors flex items-center gap-1 mt-0.5"
            >
              <Phone className="w-3 h-3 text-teal-400 shrink-0" />
              <span>{businessConfig.phone || '651 30 87 38'}</span>
            </a>
          </div>
        </div>

        {/* Highlighted Booking Button (OrceraTour Teal) */}
        <Link
          href="/reservar"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 active:scale-95 transition-all shadow-md shadow-teal-600/30 shrink-0"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Pedir Cita</span>
        </Link>

      </div>
    </nav>
  );
}

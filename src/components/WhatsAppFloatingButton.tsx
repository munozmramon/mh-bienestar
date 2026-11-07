'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export default function WhatsAppFloatingButton() {
  const { businessConfig } = useStore();
  const whatsappNumber = businessConfig.whatsapp || '34651308738';
  const defaultMessage = 'Hola M&H Bienestar, quisiera consultar disponibilidad o pedir cita para Orcera.';

  return (
    <div className="hidden md:block fixed md:bottom-6 md:right-6 z-40">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp directamente con el centro en Orcera"
        className="group relative flex items-center gap-2.5 py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-950/20 active:scale-95 transition-all duration-300 font-bold text-xs sm:text-sm"
      >
        {/* Subtle Ping Animation */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366] shrink-0" />
        <span className="tracking-tight">
          Pedir Cita por WhatsApp <span className="hidden sm:inline font-normal opacity-90">· 651 30 87 38</span>
        </span>
      </a>
    </div>
  );
}


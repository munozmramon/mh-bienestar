'use client';

import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import ViralShareModal from './ViralShareModal';

export default function ViralFloatingButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 md:right-auto z-40">
        <button
          onClick={() => setModalOpen(true)}
          className="group relative flex items-center gap-2 py-2 px-3 sm:py-2.5 sm:px-4 rounded-full bg-zinc-900 text-teal-300 border border-teal-500/40 shadow-xl shadow-teal-950/30 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Recomendar centro y ganar recompensas"
        >
          {/* Subtle pulse effect */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>

          <Gift className="w-4 h-4 animate-bounce text-amber-400" />
          <span className="text-xs font-bold tracking-tight">
            Gana 15€ <span className="hidden sm:inline font-normal opacity-90">· Invita Amigos</span>
          </span>
        </button>
      </div>

      <ViralShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}


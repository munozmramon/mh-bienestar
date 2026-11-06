'use client';

import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import ViralShareModal from './ViralShareModal';

export default function ViralFloatingButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setModalOpen(true)}
          className="group relative flex items-center gap-2.5 py-2.5 px-4 rounded-full bg-forest-900 text-gold-300 dark:bg-neon-lime dark:text-obsidian-950 border border-gold-400/40 dark:border-neon-lime shadow-soft-xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Recomendar centro y ganar recompensas"
        >
          {/* Subtle pulse effect */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-emerald"></span>
          </span>

          <Gift className="w-4 h-4 animate-bounce" />
          <span className="text-xs font-bold tracking-tight">
            Gana 15€ <span className="hidden sm:inline font-normal opacity-90">· Invita Amigos</span>
          </span>
        </button>
      </div>

      <ViralShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}


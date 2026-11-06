'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // check if dismissed recently
      const dismissed = localStorage.getItem('mh_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("Para instalar en iPhone: pulsa el botón Compartir (cuadrado con flecha hacia arriba) y selecciona 'Añadir a la pantalla de inicio'.");
    }
  };

  const dismiss = () => {
    setShowBanner(false);
    localStorage.setItem('mh_pwa_dismissed', 'true');
  };

  if (!showBanner && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md rounded-3xl shadow-soft-xl border border-warm-300 dark:border-white/10 p-4 transition-all animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-obsidian-800 p-0.5 border border-forest-600/30 dark:border-neon-lime/40 shrink-0 shadow-soft-sm">
          <img 
            src="/logo.png" 
            alt="M&H Bienestar" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-forest-900 dark:text-white">App M&amp;H Bienestar</h4>
            <span className="text-[10px] bg-forest-100 dark:bg-neon-lime/20 text-forest-800 dark:text-neon-lime px-2 py-0.5 rounded-full font-semibold">PWA</span>
          </div>
          <p className="text-xs text-forest-700/80 dark:text-obsidian-300 mt-0.5 leading-snug">
            Instala la aplicación en tu pantalla de inicio para reservar en 1 clic.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-warm-500 hover:text-forest-900 dark:text-obsidian-400 dark:hover:text-white p-1 rounded-full hover:bg-warm-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:text-obsidian-950 dark:hover:bg-neon-lime/90 active:scale-[0.98] transition-all shadow-soft-sm"
        >
          <Download className="w-4 h-4 text-gold-300 dark:text-obsidian-950" />
          <span>Instalar Aplicación</span>
        </button>
        <button
          onClick={dismiss}
          className="py-2.5 px-4 rounded-full text-xs font-medium text-forest-700 dark:text-obsidian-300 hover:bg-warm-100 dark:hover:bg-white/10 transition-colors"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}


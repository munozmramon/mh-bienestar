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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-xl border border-warm-300 p-4 transition-all animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-300 flex items-center justify-center shrink-0 border border-gold-400/30">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-forest-900">App M&amp;H Bienestar</h4>
            <span className="text-[10px] bg-gold-100 text-gold-800 px-1.5 py-0.5 rounded font-semibold">PWA</span>
          </div>
          <p className="text-xs text-forest-700/80 mt-0.5 leading-snug">
            Instala la aplicación en tu móvil para reservar en 1 clic y recibir avisos de tu cita.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-warm-500 hover:text-forest-900 p-1"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 active:scale-[0.98] transition-all shadow-soft-sm"
        >
          <Download className="w-3.5 h-3.5 text-gold-300" />
          <span>Instalar en mi móvil</span>
        </button>
        <button
          onClick={dismiss}
          className="py-2 px-3 rounded-xl text-xs font-medium text-forest-700 hover:bg-warm-100 transition-colors"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}


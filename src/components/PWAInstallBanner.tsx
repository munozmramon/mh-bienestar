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
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setShowBanner(false);
        }
      } catch (err) {}
      setDeferredPrompt(null);
    } else {
      window.dispatchEvent(new CustomEvent('open-pwa-install'));
      setShowBanner(false);
    }
  };

  const dismiss = () => {
    setShowBanner(false);
    localStorage.setItem('mh_pwa_dismissed', 'true');
  };

  if (!showBanner && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 bg-zinc-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-zinc-800 p-4 transition-all animate-in fade-in slide-in-from-bottom-4 text-zinc-100">
      <div className="flex items-center justify-between gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-teal-500/40 shrink-0 shadow-sm">
          <img 
            src="/logo.png" 
            alt="M&H Bienestar" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-zinc-50 dark:text-zinc-100">App M&amp;H Bienestar</h4>
            <span className="text-[10px] bg-teal-900/40 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold">PWA</span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
            Instala la aplicación en tu pantalla de inicio para reservar en 1 clic.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-zinc-400 hover:text-zinc-100 p-1 rounded-full hover:bg-zinc-800 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-md shadow-teal-600/25"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Instalar Aplicación</span>
        </button>
        <button
          onClick={dismiss}
          className="py-2.5 px-4 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}


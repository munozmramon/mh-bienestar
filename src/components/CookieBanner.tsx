'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isConsentGiven = localStorage.getItem('mh_cookies_accepted');
    if (!isConsentGiven) {
      setAccepted(false);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('mh_cookies_accepted', 'all');
    setAccepted(true);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('mh_cookies_accepted', 'essential');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-zinc-950/95 backdrop-blur-md text-zinc-300 border-t border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            En M&amp;H Bienestar utilizamos cookies técnicas indispensables para el funcionamiento del portal y la gestión de reservas. Con tu permiso, también utilizamos analítica anónima para mejorar el servicio conforme al RGPD y la LOPDGDD.{' '}
            <Link href="/politica-cookies" className="text-teal-400 underline hover:text-teal-300">
              Más información y configuración
            </Link>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={handleEssentialOnly}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-850 border border-zinc-750 transition-colors"
          >
            Solo necesarias
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-md shadow-teal-600/25"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Aceptar todas</span>
          </button>
        </div>
      </div>
    </div>
  );
}

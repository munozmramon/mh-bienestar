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
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-forest-950/95 backdrop-blur-md text-warm-100 border-t border-forest-800 shadow-soft-xl animate-in fade-in slide-in-from-bottom-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-sage-200/90 leading-relaxed">
            En M&amp;H Bienestar utilizamos cookies técnicas indispensables para el funcionamiento del portal y la gestión de reservas. Con tu permiso, también utilizamos analítica anónima para mejorar el servicio conforme al RGPD y la LOPDGDD.{' '}
            <Link href="/politica-cookies" className="text-gold-300 underline hover:text-gold-200">
              Más información y configuración
            </Link>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={handleEssentialOnly}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-medium text-sage-200 bg-forest-800/80 hover:bg-forest-800 border border-forest-700 transition-colors"
          >
            Solo necesarias
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gold-600 hover:bg-gold-500 transition-colors shadow-soft-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Aceptar todas</span>
          </button>
        </div>
      </div>
    </div>
  );
}

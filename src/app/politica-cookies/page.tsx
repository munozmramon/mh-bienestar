'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-warm-300 shadow-soft-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
        <h1 className="font-serif text-3xl font-bold text-forest-950">Política de Cookies</h1>
        <div className="space-y-4 text-xs sm:text-sm text-forest-800 leading-relaxed">
          <p>En M&amp;H Bienestar utilizamos cookies técnicas indispensables para mantener la sesión de cliente activa y procesar el calendario de reservas.</p>
          <p><strong>Cookies Técnicas / Esenciales:</strong> Necesarias para el funcionamiento del portal (almacenamiento de citas y preferencias).</p>
          <p><strong>Cookies de Rendimiento:</strong> Estadísticas de tráfico anónimas para evaluar qué servicios son más solicitados en la comarca de Orcera.</p>
          <p>Puedes desactivar las cookies en cualquier momento a través de la configuración de tu navegador.</p>
        </div>
      </div>
    </div>
  );
}


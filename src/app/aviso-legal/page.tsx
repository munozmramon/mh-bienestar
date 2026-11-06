'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-warm-300 shadow-soft-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
        <h1 className="font-serif text-3xl font-bold text-forest-950">Aviso Legal</h1>
        <div className="space-y-4 text-xs sm:text-sm text-forest-800 leading-relaxed">
          <p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):</p>
          <p><strong>Denominación Social:</strong> Centro Parasanitario M&amp;H</p>
          <p><strong>Dirección:</strong> Calle San José, 2, 23370 Orcera (Jaén)</p>
          <p><strong>Teléfono:</strong> 651 30 87 38 | <strong>Email:</strong> info@quirosteopatiamh.es</p>
          <p><strong>Naturaleza de la actividad:</strong> Centro parasanitario dedicado al bienestar físico, técnicas manuales, reeducación postural y optimización motriz. Las terapias ofrecidas no constituyen actos médicos ni pretenden curar patologías de competencia médica exclusiva.</p>
        </div>
      </div>
    </div>
  );
}


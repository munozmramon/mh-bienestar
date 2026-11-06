'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-warm-300 shadow-soft-sm">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-950 underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="space-y-3 pb-6 border-b border-warm-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-forest-800">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Marco Legal RGPD (UE 2016/679) &amp; LOPDGDD 3/2018</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Política de Privacidad y Protección de Datos
          </h1>
          <p className="text-xs text-forest-500">Última actualización: Noviembre 2026 · Orcera (Jaén)</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-forest-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-forest-950">1. Responsable del Tratamiento</h2>
            <p><strong>Titular:</strong> Centro Parasanitario M&amp;H</p>
            <p><strong>Ubicación:</strong> Calle San José, 2, 23370 Orcera (Jaén)</p>
            <p><strong>Contacto:</strong> info@quirosteopatiamh.es | Tel: 651 30 87 38</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-forest-950">2. Finalidad del Tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestión y confirmación de citas de reeducación corporal y terapias manuales.</li>
              <li>Envío de recordatorios operativos preventivos (WhatsApp, SMS, Email).</li>
              <li>Administración de bonos multisesión y sistema de fidelización / puntos.</li>
              <li>Custodia de valoraciones parasanitarias bajo consentimiento expreso.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-forest-950">3. Tratamiento de Datos Especiales (Salud / Parasanitarios)</h2>
            <p>
              Cualquier dato relativo a limitaciones de movilidad, intervenciones previas o dolor referido se almacena en un módulo aislado con acceso restringido exclusivamente al especialista responsable. En ningún caso estos datos se utilizan para segmentación comercial o publicidad.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-forest-950">4. Tus Derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar, limitar, portar (descarga JSON) y suprimir tus datos en cualquier momento desde tu panel de usuario o comunicándolo por correo electrónico a info@quirosteopatiamh.es.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}


'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { businessConfig } = useStore();

  return (
    <footer className="bg-forest-900 text-warm-200 pt-16 pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Identity & Concept */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-800 border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-lg">
                M&amp;H
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-warm-50 tracking-tight">
                  M&amp;H <span className="text-gold-400 font-sans text-sm tracking-widest uppercase">Bienestar</span>
                </span>
                <p className="text-xs text-sage-300">Centro Parasanitario</p>
              </div>
            </div>
            
            <p className="text-sm text-sage-200/80 leading-relaxed">
              Especialistas en reeducación corporal, técnicas manuales, armonización craneosacral suave y bienestar visceral. Un espacio sereno en la Sierra de Segura para recuperar tu movilidad natural y equilibrio.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-forest-800/80 text-gold-300 border border-gold-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cumplimiento RGPD &amp; LOPDGDD
              </span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 border-b border-forest-800 pb-2">
              Contacto &amp; Ubicación
            </h3>
            
            <ul className="space-y-3 text-sm text-sage-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100">{businessConfig.address}</p>
                  <p>{businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
                  <a
                    href="https://maps.google.com/?q=Calle+San+Jose+2+23370+Orcera+Jaen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 mt-0.5 underline"
                  >
                    Ver en Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`} className="hover:text-warm-100 transition-colors">
                  {businessConfig.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-warm-100 transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 border-b border-forest-800 pb-2">
              Horario de Atención
            </h3>
            
            <ul className="space-y-2.5 text-sm text-sage-200/90">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100">Lunes a Viernes</p>
                  <p className="text-xs text-sage-300">{businessConfig.openingHours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100">Sábados</p>
                  <p className="text-xs text-sage-300">{businessConfig.openingHours.saturdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100">Domingos</p>
                  <p className="text-xs text-sage-300">{businessConfig.openingHours.sundays}</p>
                </div>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-forest-800/50 border border-forest-700/60 text-xs text-sage-300">
              Atención presencial bajo cita previa para garantizar máxima intimidad y tiempo sin interrupciones.
            </div>
          </div>

          {/* Quick Access & Legal */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 border-b border-forest-800 pb-2">
              Ecosistema Digital
            </h3>

            <div className="flex flex-col space-y-2 text-sm text-sage-200/90">
              <Link href="/servicios" className="hover:text-gold-300 transition-colors">Catálogo de Servicios</Link>
              <Link href="/reservar" className="hover:text-gold-300 transition-colors">Sistema de Reservas</Link>
              <Link href="/bonos-y-regalos" className="hover:text-gold-300 transition-colors">Bonos &amp; Tarjetas Regalo</Link>
              <Link href="/mi-cuenta" className="hover:text-gold-300 transition-colors">Portal Cliente &amp; Puntos</Link>
              <Link href="/admin" className="hover:text-gold-300 transition-colors">Acceso Profesional / Admin</Link>
            </div>

            <div className="pt-2 text-xs text-sage-400 space-y-1">
              <p>Centro Parasanitario M&amp;H — NIF B-XXXXXXXX</p>
              <p>No se realizan afirmaciones médicas no verificadas. Terapias orientadas a la optimización del bienestar natural.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-forest-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-sage-400 gap-4">
          <p>© {new Date().getFullYear()} M&amp;H BIENESTAR. Todos los derechos reservados. Orcera (Jaén).</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad-rgpd" className="hover:text-sage-200 underline">Política de Privacidad RGPD</Link>
            <span>·</span>
            <Link href="/aviso-legal" className="hover:text-sage-200 underline">Aviso Legal</Link>
            <span>·</span>
            <Link href="/politica-cookies" className="hover:text-sage-200 underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

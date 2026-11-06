'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { businessConfig } = useStore();

  return (
    <footer className="bg-forest-900 dark:bg-obsidian-950 text-warm-200 dark:text-obsidian-300 pt-16 pb-12 border-t border-forest-800 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Identity & Concept */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-gold-400/40 dark:border-neon-lime/40 shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Centro Parasanitario M&H" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-warm-50 dark:text-white tracking-tight">
                  M&amp;H <span className="text-[#D4AF7C] dark:text-neon-lime font-sans text-sm tracking-widest uppercase">Bienestar Integral</span>
                </span>
                <p className="text-xs font-serif italic text-sage-300 dark:text-obsidian-400">Tu bienestar, nuestra esencia</p>
              </div>
            </div>
            
            <p className="text-sm text-sage-200/80 dark:text-obsidian-300 leading-relaxed">
              Especialistas en reeducación corporal, técnicas manuales, armonización craneosacral suave y bienestar visceral. Un espacio sereno en la Sierra de Segura para recuperar tu movilidad natural y equilibrio.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-forest-800/80 dark:bg-obsidian-800 text-gold-300 dark:text-neon-lime border border-gold-400/30 dark:border-neon-lime/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cumplimiento RGPD &amp; LOPDGDD
              </span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 dark:text-white border-b border-forest-800 dark:border-white/10 pb-2">
              Contacto &amp; Ubicación
            </h3>
            
            <ul className="space-y-3 text-sm text-sage-200/90 dark:text-obsidian-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100 dark:text-white">{businessConfig.address}</p>
                  <p>{businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
                  <a
                    href="https://maps.google.com/?q=Calle+San+Jose+2+23370+Orcera+Jaen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold-300 dark:text-neon-lime hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    Ver en Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0" />
                <a href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`} className="hover:text-warm-100 dark:hover:text-white transition-colors">
                  {businessConfig.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-warm-100 dark:hover:text-white transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 dark:text-white border-b border-forest-800 dark:border-white/10 pb-2">
              Horario de Atención
            </h3>
            
            <ul className="space-y-2.5 text-sm text-sage-200/90 dark:text-obsidian-300">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100 dark:text-white">Lunes a Viernes</p>
                  <p className="text-xs text-sage-300 dark:text-obsidian-400">{businessConfig.openingHours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100 dark:text-white">Sábados</p>
                  <p className="text-xs text-sage-300 dark:text-obsidian-400">{businessConfig.openingHours.saturdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 dark:text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-warm-100 dark:text-white">Domingos</p>
                  <p className="text-xs text-sage-300 dark:text-obsidian-400">{businessConfig.openingHours.sundays}</p>
                </div>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-forest-800/50 dark:bg-obsidian-850 border border-forest-700/60 dark:border-white/10 text-xs text-sage-300 dark:text-obsidian-400">
              Atención presencial bajo cita previa para garantizar máxima intimidad y tiempo sin interrupciones.
            </div>
          </div>

          {/* Quick Access & Legal */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warm-100 dark:text-white border-b border-forest-800 dark:border-white/10 pb-2">
              Ecosistema Digital
            </h3>

            <div className="flex flex-col space-y-2 text-sm text-sage-200/90 dark:text-obsidian-300">
              <Link href="/servicios" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Catálogo de Servicios</Link>
              <Link href="/reservar" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Sistema de Reservas</Link>
              <Link href="/bonos-y-regalos" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Bonos &amp; Tarjetas Regalo</Link>
              <Link href="/opiniones" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Opiniones &amp; Reseñas</Link>
              <Link href="/mi-cuenta" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Portal Cliente &amp; Puntos</Link>
              <Link href="/admin" className="hover:text-gold-300 dark:hover:text-neon-lime transition-colors">Acceso Profesional / Admin</Link>
            </div>

            <div className="pt-2 text-xs text-sage-400 dark:text-obsidian-400 space-y-1">
              <p>Centro Parasanitario M&amp;H — Orcera (Jaén)</p>
              <p>No se realizan afirmaciones médicas no verificadas. Terapias orientadas a la optimización del bienestar natural.</p>
            </div>
          </div>

        </div>

        {/* Mockup Slogan Footer Banner */}
        <div className="mt-8 py-3 rounded-2xl bg-[#3B1238]/60 dark:bg-[#1A132E] border border-purple-800/40 dark:border-purple-900/30 text-center">
          <p className="font-serif tracking-widest uppercase text-xs font-semibold text-white">
            M&amp;H BIENESTAR INTEGRAL · CUIDAMOS DE TI, CUERPO Y MENTE
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-forest-800/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-sage-400 dark:text-obsidian-400 gap-4">
          <p>© {new Date().getFullYear()} M&amp;H BIENESTAR. Todos los derechos reservados. Orcera (Jaén).</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad-rgpd" className="hover:text-sage-200 dark:hover:text-neon-lime underline">Política de Privacidad RGPD</Link>
            <span>·</span>
            <Link href="/aviso-legal" className="hover:text-sage-200 dark:hover:text-neon-lime underline">Aviso Legal</Link>
            <span>·</span>
            <Link href="/politica-cookies" className="hover:text-sage-200 dark:hover:text-neon-lime underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

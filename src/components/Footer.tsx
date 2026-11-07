'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { businessConfig } = useStore();

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-10 md:pt-16 pb-28 md:pb-12 border-t border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= MOBILE FOOTER (STREAMLINED & CLEAN) ================= */}
        <div className="block md:hidden space-y-6 mb-8 text-center">
          
          {/* Identity & Mission */}
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-white p-0.5 border border-teal-500/40">
              <img 
                src="/logo.png" 
                alt="Centro Parasanitario M&H" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-zinc-100 tracking-tight block">
                M&amp;H Bienestar Integral
              </span>
              <p className="text-xs font-serif italic text-teal-400">Tu bienestar, nuestra esencia · Orcera (Jaén)</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed pt-1">
              Reeducación corporal, técnicas manuales suaves y bienestar visceral en la Sierra de Segura.
            </p>
          </div>

          {/* Quick Access Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs">
            <Link href="/servicios" className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-400 transition-colors">
              Servicios
            </Link>
            <Link href="/reservar" className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-400 transition-colors">
              Pedir Cita
            </Link>
            <Link href="/bonos-y-regalos" className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-400 transition-colors">
              Bonos
            </Link>
            <Link href="/opiniones" className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-400 transition-colors">
              Opiniones
            </Link>
            <Link href="/mi-cuenta" className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-400 transition-colors">
              Mi Cuenta
            </Link>
          </div>

          {/* Location & Hours Card */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 space-y-2.5 text-left">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-200">{businessConfig.address}, {businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
                <a
                  href="https://maps.google.com/?q=Calle+San+Jose+2+23370+Orcera+Jaen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-teal-400 underline inline-flex items-center gap-1 mt-0.5"
                >
                  Ver en Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-800/80">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <p className="text-[11px] text-zinc-300">
                L-V: {businessConfig.openingHours.weekdays} · Sáb: {businessConfig.openingHours.saturdays}
              </p>
            </div>
          </div>

          {/* RGPD Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-900 text-teal-400 border border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Centro Parasanitario · Cumplimiento RGPD</span>
          </div>

          {/* Legal Links & Copyright */}
          <div className="pt-2 text-center text-xs text-zinc-500 space-y-2 border-t border-zinc-900">
            <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400 flex-wrap">
              <Link href="/privacidad-rgpd" className="hover:text-teal-400 underline">Privacidad RGPD</Link>
              <span>·</span>
              <Link href="/aviso-legal" className="hover:text-teal-400 underline">Aviso Legal</Link>
              <span>·</span>
              <Link href="/politica-cookies" className="hover:text-teal-400 underline">Cookies</Link>
            </div>
            <p className="text-[11px]">© {new Date().getFullYear()} M&amp;H BIENESTAR. Todos los derechos reservados. Orcera (Jaén).</p>
          </div>

        </div>

        {/* ================= DESKTOP FOOTER (FULL 4 COLUMNS) ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Identity & Concept */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-teal-500/40 shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Centro Parasanitario M&H" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-zinc-50 dark:text-zinc-100 tracking-tight">
                  M&amp;H <span className="text-teal-600 dark:text-teal-400 font-sans text-sm tracking-widest uppercase">Bienestar Integral</span>
                </span>
                <p className="text-xs font-serif italic text-teal-600 dark:text-teal-400">Tu bienestar, nuestra esencia</p>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              Especialistas en reeducación corporal, técnicas manuales, armonización craneosacral suave y bienestar visceral. Un espacio sereno en la Sierra de Segura para recuperar tu movilidad natural y equilibrio.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-900 text-teal-400 border border-zinc-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cumplimiento RGPD &amp; LOPDGDD
              </span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-zinc-100 border-b border-zinc-800 pb-2">
              Contacto &amp; Ubicación
            </h3>
            
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-200">{businessConfig.address}</p>
                  <p>{businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
                  <a
                    href="https://maps.google.com/?q=Calle+San+Jose+2+23370+Orcera+Jaen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    Ver en Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`} className="hover:text-zinc-100 transition-colors">
                  {businessConfig.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-zinc-100 transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-zinc-100 border-b border-zinc-800 pb-2">
              Horario de Atención
            </h3>
            
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-200">Lunes a Viernes</p>
                  <p className="text-xs text-zinc-400">{businessConfig.openingHours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-200">Sábados</p>
                  <p className="text-xs text-zinc-400">{businessConfig.openingHours.saturdays}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-200">Domingos</p>
                  <p className="text-xs text-zinc-400">{businessConfig.openingHours.sundays}</p>
                </div>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              Atención presencial bajo cita previa para garantizar máxima intimidad y tiempo sin interrupciones.
            </div>
          </div>

          {/* Quick Access & Legal */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-zinc-100 border-b border-zinc-800 pb-2">
              Ecosistema Digital
            </h3>

            <div className="flex flex-col space-y-2 text-sm text-zinc-400">
              <Link href="/servicios" className="hover:text-teal-400 transition-colors">Catálogo de Servicios</Link>
              <Link href="/reservar" className="hover:text-teal-400 transition-colors">Sistema de Reservas</Link>
              <Link href="/bonos-y-regalos" className="hover:text-teal-400 transition-colors">Bonos &amp; Tarjetas Regalo</Link>
              <Link href="/opiniones" className="hover:text-teal-400 transition-colors">Opiniones &amp; Reseñas</Link>
              <Link href="/mi-cuenta" className="hover:text-teal-400 transition-colors">Portal Cliente &amp; Puntos</Link>
              <Link href="/admin" className="hover:text-teal-400 transition-colors">Acceso Profesional / Admin</Link>
            </div>

            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <p>Centro Parasanitario M&amp;H — Orcera (Jaén)</p>
              <p>No se realizan afirmaciones médicas no verificadas. Terapias orientadas a la optimización del bienestar natural.</p>
            </div>
          </div>

        </div>

        {/* Slogan Footer Banner (Desktop) */}
        <div className="hidden md:block mt-8 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
          <p className="font-serif tracking-widest uppercase text-xs font-semibold text-teal-400">
            M&amp;H BIENESTAR INTEGRAL · CUIDAMOS DE TI, CUERPO Y MENTE
          </p>
        </div>

        {/* Bottom Bar (Desktop) */}
        <div className="hidden md:flex pt-8 border-t border-zinc-800 flex-col md:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} M&amp;H BIENESTAR. Todos los derechos reservados. Orcera (Jaén).</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad-rgpd" className="hover:text-teal-400 underline">Política de Privacidad RGPD</Link>
            <span>·</span>
            <Link href="/aviso-legal" className="hover:text-teal-400 underline">Aviso Legal</Link>
            <span>·</span>
            <Link href="/politica-cookies" className="hover:text-teal-400 underline">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

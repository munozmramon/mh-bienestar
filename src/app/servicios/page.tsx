'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Info,
  ShieldCheck,
  Search,
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';

export default function ServiciosPage() {
  const { services, businessConfig } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'compact' | 'grid'>('compact');

  const categories = [
    { id: 'all', label: 'Todos los Servicios' },
    { id: 'manual', label: 'Reeducación & Manual' },
    { id: 'craneal', label: 'Craneosacral' },
    { id: 'visceral', label: 'Bienestar Visceral' },
    { id: 'movilidad', label: 'Movilidad & Pilates' },
    { id: 'salud', label: 'Nutrición & Mindfulness' },
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCat = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-obsidian-900 text-forest-900 dark:text-obsidian-100 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-obsidian-800 text-forest-800 dark:text-neon-lime border border-sage-300 dark:border-neon-lime/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-neon-lime" />
            <span>Centro Parasanitario M&amp;H · Orcera</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 dark:text-white tracking-tight">
            Catálogo Integral de Cuidados &amp; Terapias
          </h1>

          <p className="text-sm sm:text-base text-forest-700/80 dark:text-obsidian-300 leading-relaxed">
            Sesiones diseñadas con rigor anatómico y sensibilidad manual. Consulta tarifas, duración y disponibilidad para elegir la atención que tu cuerpo necesita.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-forest-800 dark:bg-neon-lime text-white dark:text-obsidian-950 shadow-soft-sm font-bold'
                    : 'bg-white dark:bg-obsidian-800 text-forest-700 dark:text-obsidian-200 hover:bg-warm-200 dark:hover:bg-obsidian-700 border border-warm-300 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box & View Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-forest-500 dark:text-obsidian-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por tratamiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-obsidian-800 border border-warm-300 dark:border-white/10 text-forest-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-forest-700 dark:focus:ring-neon-lime shadow-soft-sm"
              />
            </div>

            <div className="flex items-center bg-white dark:bg-obsidian-800 border border-warm-300 dark:border-white/10 rounded-xl p-0.5 shadow-soft-sm shrink-0">
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-[#7C3AED] dark:bg-neon-lime text-white dark:text-obsidian-950 font-bold'
                    : 'text-forest-600 dark:text-obsidian-300 hover:text-forest-900'
                }`}
                title="Vista Lista Móvil (Diseño M&H)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#7C3AED] dark:bg-neon-lime text-white dark:text-obsidian-950 font-bold'
                    : 'text-forest-600 dark:text-obsidian-300 hover:text-forest-900'
                }`}
                title="Vista Cuadrícula Completa"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* COMPACT VIEW (Exact layout from Mockup Secondary Phone Screen) */}
        {viewMode === 'compact' ? (
          <div className="max-w-3xl mx-auto space-y-3.5 mb-16">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl bg-white dark:bg-obsidian-850 border border-warm-200/90 dark:border-white/10 p-3 sm:p-4 shadow-soft-sm hover:shadow-soft-md hover:border-[#D4AF7C] transition-all flex items-center justify-between gap-3"
              >
                <Link href={`/servicios/${service.slug}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-forest-900 dark:bg-obsidian-900 border border-warm-200 dark:border-white/10">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-forest-950 dark:text-white truncate group-hover:text-[#7C3AED] dark:group-hover:text-neon-lime transition-colors">
                        {service.name}
                      </h3>
                      {service.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF7C]/20 text-[#7C3AED] dark:text-neon-lime border border-[#D4AF7C]/40">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-forest-600 dark:text-obsidian-300 line-clamp-1 mt-0.5">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-forest-500 dark:text-obsidian-400 font-medium">
                      <span className="text-[#7C3AED] dark:text-neon-lime font-bold">{service.price}€</span>
                      <span>·</span>
                      <span>{service.durationMinutes} min</span>
                      {!service.available && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700 dark:text-amber-400 italic">Sujeto a lista de espera</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] dark:bg-neon-lime dark:text-obsidian-950 transition-colors shadow-soft-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservar</span>
                  </Link>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="w-9 h-9 rounded-full bg-[#F8F7F2] dark:bg-obsidian-800 hover:bg-white dark:hover:bg-obsidian-700 border border-warm-200 dark:border-white/10 flex items-center justify-center text-forest-600 dark:text-obsidian-300 group-hover:text-[#7C3AED] dark:group-hover:text-neon-lime transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* GRID VIEW (Traditional Grid Cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl bg-white dark:bg-obsidian-800 border overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between ${
                service.available ? 'border-warm-300 dark:border-white/10' : 'border-dashed border-warm-400/80 dark:border-white/20 opacity-95'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-forest-900 dark:bg-obsidian-950">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {service.badge && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-obsidian-900/95 text-forest-800 dark:text-neon-lime shadow-soft-sm border dark:border-neon-lime/30">
                        {service.badge}
                      </span>
                    )}
                    {!service.available && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-soft-sm">
                        Sujeto a disponibilidad
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-forest-900/90 dark:bg-obsidian-900/90 text-white dark:text-neon-lime px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border dark:border-white/10">
                    {service.price}€ <span className="text-warm-300 dark:text-obsidian-300 font-normal">/ {service.durationMinutes} min</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest-950 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-xs text-sage-600 dark:text-neon-lime font-medium mt-0.5">
                      Profesional: {service.professionalName}
                    </p>
                  </div>

                  <p className="text-sm text-forest-700/80 dark:text-obsidian-300 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-forest-900 dark:text-white uppercase tracking-wider mb-2">
                      Alcance del tratamiento:
                    </p>
                    <ul className="space-y-1.5 text-xs text-forest-700 dark:text-obsidian-300">
                      {service.scopeAndBenefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 dark:text-neon-lime shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.statusNote && (
                    <div className="p-3 rounded-xl bg-warm-100 dark:bg-obsidian-850 border border-warm-200 dark:border-white/10 text-xs text-forest-700 dark:text-neon-emerald flex items-start gap-2">
                      <Info className="w-4 h-4 text-gold-600 dark:text-neon-emerald shrink-0 mt-0.5" />
                      <span>{service.statusNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 border-t border-warm-100 dark:border-white/10 flex items-center justify-between gap-3 mt-4">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="text-xs font-semibold text-forest-700 dark:text-obsidian-300 hover:text-forest-950 dark:hover:text-white underline inline-flex items-center gap-1"
                >
                  <span>Ver ficha y FAQs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {service.available ? (
                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white dark:text-obsidian-950 bg-forest-800 hover:bg-forest-700 dark:bg-neon-lime dark:hover:bg-[#d8ff68] transition-colors shadow-soft-sm dark:shadow-neon-lime"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-300 dark:text-obsidian-950" />
                    <span>Reservar Cita</span>
                  </Link>
                ) : (
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20para%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-forest-800 dark:text-neon-lime bg-warm-200 dark:bg-obsidian-800 hover:bg-warm-300 dark:hover:bg-obsidian-750 border dark:border-white/10 transition-colors"
                  >
                    <span>Lista de espera</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
        )}

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-forest-900 dark:bg-obsidian-850 text-warm-100 dark:text-white border border-forest-800 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-lg">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-warm-50 dark:text-white">
              ¿No tienes claro qué sesión se ajusta mejor a tu situación?
            </h3>
            <p className="text-xs sm:text-sm text-sage-200 dark:text-obsidian-300">
              Llámanos al {businessConfig.phone} o escríbenos por WhatsApp para asesorarte de manera personalizada antes de tu primera visita.
            </p>
          </div>

          <a
            href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20no%20s%C3%A9%20qu%C3%A9%20tratamiento%20es%20el%20m%C3%A1s%20adecuado%20para%20m%C3%AD.%20%C2%BFMe%20podr%C3%ADais%20orientar%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-forest-950 dark:text-obsidian-950 bg-gold-400 dark:bg-neon-lime hover:bg-gold-300 dark:hover:bg-[#d8ff68] transition-colors shrink-0 shadow-soft-sm dark:shadow-neon-lime"
          >
            Orientación Gratuita
          </a>
        </div>

      </div>
    </div>
  );
}

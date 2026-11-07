'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  Search,
  ChevronRight,
  LayoutGrid,
  List,
  MessageCircle
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/40 text-teal-600 dark:text-teal-400 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Centro Parasanitario M&amp;H · Orcera</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-50 dark:text-zinc-100 tracking-tight">
            Catálogo Integral de Cuidados &amp; Terapias
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
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
                    ? 'bg-teal-600 text-white shadow-md font-bold'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-850 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box & View Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por tratamiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>

            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-0.5 shadow-sm shrink-0">
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
                title="Vista Lista Móvil"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
                title="Vista Cuadrícula Completa"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* COMPACT VIEW */}
        {viewMode === 'compact' ? (
          <div className="max-w-3xl mx-auto space-y-3.5 mb-16">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl bg-zinc-900 border border-zinc-800 p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all flex items-center justify-between gap-3"
              >
                <Link href={`/servicios/${service.slug}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-zinc-800 border border-zinc-700">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-100 truncate group-hover:text-teal-400 transition-colors">
                        {service.name}
                      </h3>
                      {service.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-900/40 text-teal-400 border border-teal-500/30">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-zinc-400 font-medium">
                      <span className="text-teal-400 font-bold">{service.price}€</span>
                      <span>·</span>
                      <span>{service.durationMinutes} min</span>
                      {!service.available && (
                        <>
                          <span>·</span>
                          <span className="text-amber-400 italic">Sujeto a lista de espera</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20pedir%20cita%20para%20${encodeURIComponent(service.name)}%20en%20Orcera.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                    title="Pedir cita por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                  </a>
                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-sm shadow-teal-600/25"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservar</span>
                  </Link>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:text-teal-400 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl bg-zinc-900 border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                service.available ? 'border-zinc-800 hover:border-teal-500/50' : 'border-dashed border-zinc-700 opacity-95'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-800">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {service.badge && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-900/90 text-teal-400 shadow-sm border border-teal-500/30">
                        {service.badge}
                      </span>
                    )}
                    {!service.available && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm">
                        Sujeto a disponibilidad
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-zinc-900/90 text-teal-400 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border border-zinc-700">
                    {service.price}€ <span className="text-zinc-400 font-normal">/ {service.durationMinutes} min</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-zinc-100">
                      {service.name}
                    </h3>
                    <p className="text-xs text-teal-400 font-medium mt-0.5">
                      Profesional: {service.professionalName}
                    </p>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-2">
                      Alcance del tratamiento:
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-400">
                      {service.scopeAndBenefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.statusNote && (
                    <div className="p-3 rounded-xl bg-zinc-850 border border-zinc-750 text-xs text-zinc-300 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{service.statusNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 border-t border-zinc-800 flex items-center justify-between gap-3 mt-4">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-100 underline inline-flex items-center gap-1"
                >
                  <span>Ver ficha y FAQs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {service.available ? (
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20pedir%20cita%20para%20${encodeURIComponent(service.name)}%20en%20Orcera.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                      title="Pedir cita por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                    </a>
                    <Link
                      href={`/reservar?servicio=${service.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-md shadow-teal-600/25"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>Reservar Cita</span>
                    </Link>
                  </div>
                ) : (
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20para%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-400 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 transition-colors"
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
        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 text-zinc-100 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-zinc-50 dark:text-zinc-100">
              ¿No tienes claro qué sesión se ajusta mejor a tu situación?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Llámanos al {businessConfig.phone} o escríbenos por WhatsApp para asesorarte de manera personalizada antes de tu primera visita.
            </p>
          </div>

          <a
            href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20no%20s%C3%A9%20qu%C3%A9%20tratamiento%20es%20el%20m%C3%A1s%20adecuado%20para%20m%C3%AD.%20%C2%BFMe%20podr%C3%ADais%20orientar%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors shrink-0 shadow-md shadow-teal-600/25"
          >
            Orientación Gratuita
          </a>
        </div>

      </div>
    </div>
  );
}

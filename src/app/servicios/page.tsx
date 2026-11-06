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
  Search
} from 'lucide-react';

export default function ServiciosPage() {
  const { services, businessConfig } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 text-forest-800 border border-sage-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Centro Parasanitario M&amp;H · Orcera</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            Catálogo Integral de Cuidados &amp; Terapias
          </h1>

          <p className="text-sm sm:text-base text-forest-700/80 leading-relaxed">
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
                    ? 'bg-forest-800 text-white shadow-soft-sm'
                    : 'bg-white text-forest-700 hover:bg-warm-200 border border-warm-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-forest-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tratamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-warm-300 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-700 shadow-soft-sm"
            />
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl bg-white border overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between ${
                service.available ? 'border-warm-300' : 'border-dashed border-warm-400/80 opacity-95'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-forest-900">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {service.badge && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-forest-800 shadow-soft-sm">
                        {service.badge}
                      </span>
                    )}
                    {!service.available && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-soft-sm">
                        Sujeto a disponibilidad
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-forest-900/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm">
                    {service.price}€ <span className="text-warm-300 font-normal">/ {service.durationMinutes} min</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest-950">
                      {service.name}
                    </h3>
                    <p className="text-xs text-sage-600 font-medium mt-0.5">
                      Profesional: {service.professionalName}
                    </p>
                  </div>

                  <p className="text-sm text-forest-700/80 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
                      Alcance del tratamiento:
                    </p>
                    <ul className="space-y-1.5 text-xs text-forest-700">
                      {service.scopeAndBenefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.statusNote && (
                    <div className="p-3 rounded-xl bg-warm-100 border border-warm-200 text-xs text-forest-700 flex items-start gap-2">
                      <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{service.statusNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 border-t border-warm-100 flex items-center justify-between gap-3 mt-4">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="text-xs font-semibold text-forest-700 hover:text-forest-950 underline inline-flex items-center gap-1"
                >
                  <span>Ver ficha y FAQs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {service.available ? (
                  <Link
                    href={`/reservar?servicio=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 transition-colors shadow-soft-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-300" />
                    <span>Reservar Cita</span>
                  </Link>
                ) : (
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20para%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-forest-800 bg-warm-200 hover:bg-warm-300 transition-colors"
                  >
                    <span>Lista de espera</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-forest-900 text-warm-100 border border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-warm-50">
              ¿No tienes claro qué sesión se ajusta mejor a tu situación?
            </h3>
            <p className="text-xs sm:text-sm text-sage-200">
              Llámanos al {businessConfig.phone} o escríbenos por WhatsApp para asesorarte de manera personalizada antes de tu primera visita.
            </p>
          </div>

          <a
            href={`https://wa.me/${businessConfig.whatsapp}?text=Hola%2C%20no%20s%C3%A9%20qu%C3%A9%20tratamiento%20es%20el%20m%C3%A1s%20adecuado%20para%20m%C3%AD.%20%C2%BFMe%20podr%C3%ADais%20orientar%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-forest-950 bg-gold-400 hover:bg-gold-300 transition-colors shrink-0 shadow-soft-sm"
          >
            Orientación Gratuita
          </a>
        </div>

      </div>
    </div>
  );
}

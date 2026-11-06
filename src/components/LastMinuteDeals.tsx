'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Zap, ArrowRight, Flame, MapPin } from 'lucide-react';

export default function LastMinuteDeals() {
  const deals = [
    {
      id: 'deal-1',
      serviceId: 'reeducacion-corporal-y-movilidad',
      serviceName: 'Reeducación Corporal & Movilidad',
      date: 'Hoy (Tarde)',
      time: '18:30 h',
      originalPrice: 50,
      discountedPrice: 42,
      discountPct: 15,
      spotsLeft: 1
    },
    {
      id: 'deal-2',
      serviceId: 'terapia-craneosacral-biodinamica',
      serviceName: 'Terapia Craneosacral & Calma',
      date: 'Mañana (Mañana)',
      time: '11:30 h',
      originalPrice: 45,
      discountedPrice: 38,
      discountPct: 15,
      spotsLeft: 1
    },
    {
      id: 'deal-3',
      serviceId: 'reeducacion-corporal-y-movilidad',
      serviceName: 'Descarga Muscular Profunda',
      date: 'Mañana (Tarde)',
      time: '17:00 h',
      originalPrice: 50,
      discountedPrice: 42,
      discountPct: 15,
      spotsLeft: 1
    }
  ];

  return (
    <section className="py-8 bg-white dark:bg-obsidian-900 border-y border-slate-100 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Flame Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-bounce" />
              <span>Oportunidades de Hoy y Mañana</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Huecos de Última Hora con Descuento (-15%)
            </h3>
          </div>

          <Link
            href="/reservar"
            className="text-xs font-bold text-[#10B981] dark:text-[#34D399] hover:underline flex items-center gap-1"
          >
            <span>Ver toda la agenda de la semana</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Urgent Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="rounded-3xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-white/10 p-5 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                    Solo {deal.spotsLeft} hueco libre
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                    -{deal.discountPct}% Dto
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white group-hover:text-[#044E39] dark:group-hover:text-[#34D399] transition-colors">
                    {deal.serviceName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{deal.date} a las <strong>{deal.time}</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Calle San José, 2 · Orcera
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1.5">{deal.originalPrice}€</span>
                  <span className="font-serif text-2xl font-bold text-slate-900 dark:text-white">{deal.discountedPrice}€</span>
                </div>

                <Link
                  href={`/reservar?servicio=${deal.serviceId}&time=${deal.time}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#059669] shadow-soft-sm active:scale-95 transition-all"
                >
                  Aprovechar →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

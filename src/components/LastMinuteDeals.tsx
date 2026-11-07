'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Flame, MessageCircle } from 'lucide-react';

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
    <section className="py-10 bg-zinc-950 border-y border-zinc-800 transition-colors text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Flame Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
              <span>Oportunidades de Hoy y Mañana</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-50 dark:text-zinc-100">
              Huecos de Última Hora con Descuento (-15%)
            </h3>
          </div>

          <Link
            href="/reservar"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1 transition-colors"
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
              className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    Solo {deal.spotsLeft} hueco libre
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-600 text-white">
                    -{deal.discountPct}% Dto
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-zinc-100 group-hover:text-teal-400 transition-colors">
                    {deal.serviceName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 mt-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{deal.date} a las <strong>{deal.time}</strong></span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Calle San José, 2 · Orcera
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 line-through mr-1.5">{deal.originalPrice}€</span>
                  <span className="font-serif text-2xl font-bold text-zinc-50 dark:text-zinc-100">{deal.discountedPrice}€</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/34651308738?text=Hola%20M%26H%20Bienestar%2C%20quisiera%20reservar%20el%20hueco%20de%20%C3%BAltima%20hora%20para%20${encodeURIComponent(deal.serviceName)}%20(${encodeURIComponent(deal.date)}%20a%20las%20${deal.time})%20por%20${deal.discountedPrice}%E2%82%AC.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                    title="Aprovechar por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white stroke-[#25D366]" />
                  </a>

                  <Link
                    href={`/reservar?servicio=${deal.serviceId}&time=${deal.time}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-sm shadow-teal-600/25 active:scale-95 transition-all"
                  >
                    Reservar →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

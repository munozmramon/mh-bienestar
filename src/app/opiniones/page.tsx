'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ArrowLeft, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export default function OpinionesPage() {
  const { currentUser } = useStore();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [sessionAttended, setSessionAttended] = useState('Reeducación Corporal');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !clientName) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 underline transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 sm:p-12 shadow-xl space-y-6">
          
          <div className="space-y-3 pb-6 border-b border-zinc-800">
            <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">
              Opiniones Éticas &amp; Transparentes
            </span>
            <h1 className="font-serif text-3xl font-bold text-zinc-50 dark:text-zinc-100">
              Comparte tu Experiencia en M&amp;H Bienestar
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Tu opinión sincera nos ayuda a seguir cuidando con máxima delicadeza el bienestar de nuestros vecinos en Orcera y la Sierra de Segura. Solicitamos valoraciones libres y honestas, sin condicionar recompensas por opiniones positivas.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-teal-900/30 border border-teal-500/40 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-teal-800/50 text-teal-300 flex items-center justify-center mx-auto border border-teal-500/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100">¡Muchísimas gracias, {clientName}!</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Hemos recibido tu valoración con gratitud. Si además deseas publicarla en nuestra ficha pública de Google para que otros vecinos nos conozcan, te dejamos el enlace directo:
              </p>
              <div className="pt-2">
                <a
                  href="https://quirosteopatiamh.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-sm shadow-teal-600/25 transition-colors"
                >
                  <span>Publicar en Google Business Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  ¿Cómo calificarías tu sesión?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star ? 'fill-current text-amber-400' : 'text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-zinc-300 ml-2">
                    {rating} de 5 estrellas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Tratamiento Realizado</label>
                  <select
                    value={sessionAttended}
                    onChange={(e) => setSessionAttended(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Reeducación Corporal">Reeducación Corporal</option>
                    <option value="Técnica Craneosacral Suave">Técnica Craneosacral Suave</option>
                    <option value="Bienestar Visceral">Bienestar Visceral</option>
                    <option value="Otra consulta">Otra sesión personalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Tu Comentario / Experiencia *</label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo sintió tu cuerpo la sesión, la atención recibida en el centro..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-zinc-850 border border-zinc-750 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-850 border border-zinc-750 text-xs text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Tu testimonio se revisará internamente y se tratará conforme a la política de privacidad.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/25 transition-all"
              >
                Enviar Mi Opinión
              </button>
            </form>
          )}

          {/* Direct Google Review Callout */}
          <div className="pt-6 border-t border-zinc-800 text-center space-y-2">
            <p className="text-xs text-zinc-400">
              ¿Prefieres dejarnos una reseña directamente en Google Maps?
            </p>
            <a
              href="https://quirosteopatiamh.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 underline"
            >
              <span>Abrir Google Business Profile de M&amp;H Bienestar (Orcera)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

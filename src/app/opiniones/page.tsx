'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MessageCircle, ArrowLeft, Send, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export default function OpinionesPage() {
  const { currentUser, businessConfig } = useStore();
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
    <div className="min-h-screen bg-warm-50 py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-950 underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="bg-white rounded-3xl border border-warm-300 p-8 sm:p-12 shadow-soft-sm space-y-6">
          
          <div className="space-y-3 pb-6 border-b border-warm-200">
            <span className="text-xs font-bold text-gold-700 tracking-wider uppercase">
              Opiniones Éticas &amp; Transparentes
            </span>
            <h1 className="font-serif text-3xl font-bold text-forest-950">
              Comparte tu Experiencia en M&amp;H Bienestar
            </h1>
            <p className="text-xs sm:text-sm text-forest-600 leading-relaxed">
              Tu opinión sincera nos ayuda a seguir cuidando con máxima delicadeza el bienestar de nuestros vecinos en Orcera y la Sierra de Segura. Solicitamos valoraciones libres y honestas, sin condicionar recompensas por opiniones positivas.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-emerald-950">¡Muchísimas gracias, {clientName}!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Hemos recibido tu valoración con gratitud. Si además deseas publicarla en nuestra ficha pública de Google para que otros vecinos nos conozcan, te dejamos el enlace directo:
              </p>
              <div className="pt-2">
                <a
                  href="https://quirosteopatiamh.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm"
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
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-2">
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
                      className="p-1 text-gold-500 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star ? 'fill-current text-gold-500' : 'text-warm-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-forest-700 ml-2">
                    {rating} de 5 estrellas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-700 mb-1">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 border border-warm-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-700 mb-1">Tratamiento Realizado</label>
                  <select
                    value={sessionAttended}
                    onChange={(e) => setSessionAttended(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 border border-warm-300"
                  >
                    <option value="Reeducación Corporal">Reeducación Corporal</option>
                    <option value="Técnica Craneosacral Suave">Técnica Craneosacral Suave</option>
                    <option value="Bienestar Visceral">Bienestar Visceral</option>
                    <option value="Otra consulta">Otra sesión personalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Tu Comentario / Experiencia *</label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo sintió tu cuerpo la sesión, la atención recibida en el centro..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-warm-100 border border-warm-200 text-xs text-forest-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Tu testimonio se revisará internamente y se tratará conforme a la política de privacidad.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm transition-all"
              >
                Enviar Mi Opinión
              </button>
            </form>
          )}

          {/* Direct Google Review Callout */}
          <div className="pt-6 border-t border-warm-200 text-center space-y-2">
            <p className="text-xs text-forest-600">
              ¿Prefieres dejarnos una reseña directamente en Google Maps?
            </p>
            <a
              href="https://quirosteopatiamh.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 underline"
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


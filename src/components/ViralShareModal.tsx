'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';
import { 
  Gift, 
  Share2, 
  MessageCircle, 
  Copy, 
  Check, 
  Sparkles, 
  X, 
  QrCode, 
  Award,
  Users,
  Smartphone
} from 'lucide-react';
import QRCode from 'qrcode';

interface ViralShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ViralShareModal({ isOpen, onClose }: ViralShareModalProps) {
  const { currentUser } = useStore();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Generate unique referral code: either user's personal code or guest default
  const referralCode = currentUser?.referralCode || 'MH-AMIGO-26';
  const shareUrl = `https://mh-bienestar.vercel.app/reservar?ref=${referralCode}`;

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Te recomiendo el Centro Parasanitario M&H Bienestar en Orcera. Son especialistas en reeducación corporal y técnicas manuales. Si reservas desde mi enlace te regalan 10€ de bienvenida en tu primera sesión:\n\n${shareUrl}`
  );

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: '#16281E',
          light: '#FAF8F5'
        }
      })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error('Error generating QR:', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'M&H Bienestar — 10€ de regalo en tu primera sesión',
          text: 'Descubre el Centro Parasanitario M&H Bienestar en Orcera. Usa mi enlace para recibir 10€ de descuento.',
          url: shareUrl,
        });
      } catch (err) {
        // cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-forest-950 text-warm-100 rounded-3xl max-w-lg w-full border border-forest-800 shadow-soft-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-gold-500 via-neon-lime to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-forest-900 hover:bg-forest-800 text-warm-300 hover:text-white transition-colors border border-forest-700"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-800/80 text-neon-lime border border-neon-lime/30">
              <Sparkles className="w-3.5 h-3.5 text-neon-lime" />
              <span>Programa Viral de Recomendación M&amp;H</span>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warm-50 tracking-tight">
              Regala 10€ a tus amigos y gana 15€ en puntos
            </h3>
            
            <p className="text-xs sm:text-sm text-sage-200/90 leading-relaxed max-w-md mx-auto">
              Cada amigo que reserve con tu código recibe <strong>10€ de descuento</strong> de bienvenida en Orcera. Cuando termine su sesión, tú recibes <strong>150 puntos (15€)</strong> para tus tratamientos o bonos.
            </p>
          </div>

          {/* Quick Share Buttons */}
          <div className="space-y-3">
            
            {/* Primary Action: Direct WhatsApp */}
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-full text-sm font-bold text-obsidian-950 bg-neon-emerald hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-soft-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Compartir por WhatsApp (1 Clic)</span>
            </a>

            {/* Native Mobile Share (Instagram, Telegram, SMS, etc.) */}
            <button
              onClick={handleNativeShare}
              className="w-full py-3 px-5 rounded-full text-xs sm:text-sm font-semibold text-white bg-forest-800 hover:bg-forest-750 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-forest-700"
            >
              <Share2 className="w-4 h-4 text-neon-lime" />
              <span>Compartir en Redes (Instagram, Facebook, Más)</span>
            </button>
          </div>

          {/* Personal Code & Link Box */}
          <div className="p-4 rounded-2xl bg-forest-900/90 border border-forest-800 space-y-3">
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-sage-300 font-medium">Tu Código de Amigo:</span>
              <button
                onClick={handleCopyCode}
                className="font-mono font-bold text-sm text-gold-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>{referralCode}</span>
                {copiedCode ? <Check className="w-3.5 h-3.5 text-neon-lime" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="pt-2 border-t border-forest-800 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-forest-950 px-3 py-2 rounded-xl text-xs font-mono text-sage-200 border border-forest-800 truncate focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-forest-800 hover:bg-forest-700 text-warm-100 flex items-center gap-1.5 shrink-0 border border-forest-700 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neon-lime" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic QR Section for In-Person Sharing */}
          {qrCodeUrl && (
            <div className="p-4 rounded-2xl bg-forest-900/50 border border-forest-800/80 flex items-center gap-4 text-left">
              <div className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 shadow-soft-sm">
                <img src={qrCodeUrl} alt="Código QR de recomendación" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-warm-50 flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-neon-lime" />
                  <span>Código QR para Escaneo Directo</span>
                </h4>
                <p className="text-[11px] text-sage-300 leading-tight">
                  Muéstrale esta pantalla a tu amigo o familiar en Orcera para que apunte con la cámara de su móvil y reserve al instante.
                </p>
              </div>
            </div>
          )}

          {/* Social Proof Footer */}
          <div className="text-center text-[11px] text-sage-400 pt-1 border-t border-forest-800/80 flex items-center justify-center gap-2">
            <Users className="w-3.5 h-3.5 text-gold-400" />
            <span>Sin límites: recomienda a tantos amigos como quieras y acumula sesiones gratuitas.</span>
          </div>

        </div>
      </div>
    </div>
  );
}

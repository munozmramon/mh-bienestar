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
          dark: '#3B1238',
          light: '#FFFFFF'
        }
      })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error('Error generating QR:', err));
    }
  }, [isOpen, shareUrl]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A132E] text-white rounded-3xl max-w-lg w-full border border-purple-900/50 shadow-2xl relative max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-[#1A132E]/95 backdrop-blur-md border-b border-purple-900/60 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-ping" />
            <span className="text-xs font-bold text-[#A78BFA]">Invita y Gana 15€</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/80 hover:bg-purple-900 text-white font-bold text-xs border border-purple-800/80 transition-colors shadow-sm"
            aria-label="Cerrar ventana"
          >
            <span>Cerrar</span>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Regala 10€ a tus amigos y gana 15€ en puntos
            </h3>
            
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-md mx-auto">
              Cada amigo que reserve con tu código recibe <strong>10€ de descuento</strong> en su primera sesión en Orcera. Al terminarla, tú recibes <strong>150 puntos (15€)</strong> acumulables para tus citas.
            </p>
          </div>

          {/* Quick Share Buttons */}
          <div className="space-y-2.5">
            
            {/* Primary Action: Direct WhatsApp */}
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-md shadow-emerald-900/30"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Compartir por WhatsApp (1 Clic)</span>
            </a>

            {/* Native Mobile Share (Instagram, Telegram, SMS, etc.) */}
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-purple-900/40 hover:bg-purple-900/70 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-purple-700/50"
            >
              <Share2 className="w-4 h-4 text-[#A78BFA]" />
              <span>Compartir en Redes (Instagram, Facebook, Más)</span>
            </button>
          </div>

          {/* Personal Code & Link Box */}
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-900/50 space-y-2.5">
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300 font-medium">Tu Código de Amigo:</span>
              <button
                onClick={handleCopyCode}
                className="font-mono font-bold text-sm text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>{referralCode}</span>
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#A78BFA]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="pt-2 border-t border-purple-900/40 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-[#0F0A1C] px-3 py-2 rounded-xl text-xs font-mono text-purple-200 border border-purple-900/50 truncate focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
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
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-900/40 flex items-center gap-3.5 text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-xl shrink-0 shadow-soft-sm">
                <img src={qrCodeUrl} alt="Código QR de recomendación" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Código QR para Escaneo Directo</span>
                </h4>
                <p className="text-[11px] text-purple-200/80 leading-tight">
                  Muéstrale esta pantalla a tu amigo o familiar en Orcera para que apunte con la cámara de su móvil y reserve al instante.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Close Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-all active:scale-[0.98]"
            >
              Cerrar Ventana ✕
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


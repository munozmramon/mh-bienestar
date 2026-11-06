'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  RefreshCw, 
  Layers, 
  Share2, 
  Smartphone, 
  Palette, 
  Tag, 
  ChevronRight,
  Sliders,
  Type
} from 'lucide-react';

interface PresetTopic {
  id: string;
  name: string;
  category: 'reeducacion' | 'craneosacral' | 'visceral' | 'promocion' | 'consejo';
  headlinePost: string;
  subtitlePost: string;
  headlineReel: string;
  subtitleReel: string;
  hook0_3s: string;
  bodyScript: string;
  ctaText: string;
  caption: string;
  suggestedImage: string;
}

const TOPICS: PresetTopic[] = [
  {
    id: 'postural-espalda',
    name: 'Dolor Lumbar y Sedestación',
    category: 'reeducacion',
    headlinePost: '¿Espalda cargada tras horas sentado?',
    subtitlePost: 'Reeducación Corporal y Descompresión en Orcera',
    headlineReel: '3 SEÑALES DE QUE TU COLUMNA PIDE AYUDA',
    subtitleReel: 'No normalices la tensión lumbar diaria',
    hook0_3s: 'Muestra a cámara cómo te sientas frente al ordenador y cómo se arquea la espalda baja. Texto en pantalla: "Si te duele al levantarte de la silla, esto es para ti".',
    bodyScript: 'Explica que la sedestación continua bloquea la pelvis y acorta los flexores de cadera. Muestra una técnica suave de elongación articular de las que aplicas en cabina.',
    ctaText: 'Recupera tu movilidad natural en Orcera. Citas online en enlace de la bio.',
    caption: `🌿 ¿Te levantas con la sensación de tener una losa en las lumbares tras horas de trabajo?

En el Centro Parasanitario M&H Bienestar (Orcera) tratamos la causa profunda: evaluamos la alineación de tu columna y aplicamos maniobras miofasciales de descarga para que tu cuerpo vuelva a fluir sin rigidez.

✨ Atención 100% individual y sin prisas en la comarca de Segura.
📍 Calle San José, 2 · 23370 Orcera (Jaén)
📲 Cita online en 1 minuto: https://mh-bienestar.vercel.app/reservar

#ReeducacionCorporal #DolorDeEspalda #Orcera #Jaen #SierraDeSegura #BienestarNatural #MHBienestar`,
    suggestedImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'craneosacral-estres',
    name: 'Bruxismo, Migrañas y Estrés',
    category: 'craneosacral',
    headlinePost: 'Bruxismo, Tensión Mandibular y Cefaleas',
    subtitlePost: 'Armonización Craneosacral Suave · Calma Profunda',
    headlineReel: '¿APRIETAS LOS DIENTES AL DORMIR?',
    subtitleReel: 'El estrés se acumula en tus sienes y mandíbula',
    hook0_3s: 'Plano corto tocando suavemente la zona temporomandibular y las sienes. Texto grande: "El bruxismo no es solo dental, es tu sistema nervioso pidiendo pausa".',
    bodyScript: 'Explica qué es la técnica craneosacral suave: presiones de menos de 5 gramos sobre suturas craneales y sacro para inducir descanso profundo del sistema nervioso parasimpático.',
    ctaText: 'Siente la verdadera desconexión en Orcera. Pide tu cita en quirosteopatiamh.es',
    caption: `✨ ¿Te despiertas con dolor de cabeza, tensión en la mandíbula o cuello rígido?

El ritmo craneosacral refleja directamente el estado de alerta de tu mente. Con nuestro toque suave y respetuoso liberamos las microtensiones de las fascias craneales para que tu cuerpo recupere el sueño reparador.

🌸 Espacio sereno y privado en Orcera (Jaén).
📲 Reserva tu sesión craneosacral en nuestra web oficial: https://mh-bienestar.vercel.app/reservar

#TerapiaCraneosacral #Bruxismo #CalmaMental #OrceraJaen #BienestarIntegral #MHBienestar`,
    suggestedImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bienestar-visceral',
    name: 'Digestiones Pesadas y Diafragma',
    category: 'visceral',
    headlinePost: 'Pesadez Abdominal y Diafragma Tenso',
    subtitlePost: 'Técnicas de Bienestar Visceral en Orcera',
    headlineReel: '¿SABÍAS QUE LA ANSIEDAD SE BLOQUEA EN TU DIAFRAGMA?',
    subtitleReel: 'Libera la tensión abdominal para volver a respirar',
    hook0_3s: 'Coloca las manos bajo las costillas mostrando la respiración alta y superficial. Texto: "Si sientes un nudo en el estómago constante, mira esto".',
    bodyScript: 'Demuestra cómo la tensión diafragmática comprime las vísceras digestivas y provoca dolor lumbar referido. Muestra maniobra manual suave de relajación del diafragma.',
    ctaText: 'Mejora tu digestión y descanso. Consulta disponibilidad en Orcera.',
    caption: `🌱 ¿Sabías que un diafragma contraído por estrés bloquea el tránsito digestivo y sobrecarga la espalda?

En M&H Bienestar trabajamos la armonización visceral mediante técnicas manuales sutiles para devolver la movilidad a los órganos digestivos y aliviar la pesadez abdominal.

🌿 Centro Parasanitario M&H · Calle San José, 2, Orcera
📍 Reserva online o por WhatsApp (651 30 87 38)

#BienestarVisceral #Diafragma #SaludDigestiva #Orcera #SierraDeSegura #MHBienestar`,
    suggestedImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'promo-referidos',
    name: 'Regalo 10€ de Bienvenida',
    category: 'promocion',
    headlinePost: 'Regala 10€ a tus Amigos en Orcera',
    subtitlePost: 'Y gana 15€ en puntos por cada recomendación',
    headlineReel: '¿AÚN NO CONOCES NUESTRO CLUB DE BIENESTAR?',
    subtitleReel: '10€ de descuento directo para nuevos clientes',
    hook0_3s: 'Sosteniendo el móvil con la app de M&H abierta en la pantalla. Texto: "Comparte salud con tu familia y ahorra en tus tratamientos".',
    bodyScript: 'Explica en 15 segundos el programa de fidelización: cada nuevo cliente tiene 10€ de bienvenida con código amigo, y tú acumulas puntos para sesiones gratis.',
    ctaText: 'Entra a tu cuenta en mh-bienestar.vercel.app y comparte tu código por WhatsApp.',
    caption: `🎁 ¿Quieres probar una sesión de reeducación corporal en Orcera con 10€ de descuento?

Usa el código de recomendación de cualquier amigo cliente de M&H Bienestar o regístrate en nuestra web para conseguir 50 puntos de bienvenida inmediatos.

✨ Cuidar de tu cuerpo en la Sierra de Segura ahora tiene recompensa.
📲 Reserva tu cita: https://mh-bienestar.vercel.app/reservar

#Orcera #PromocionBienestar #DescuentoOrcera #CentroParasanitario #Jaen`,
    suggestedImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pack-bonos',
    name: 'Bonos Multisesión (Ahorro)',
    category: 'promocion',
    headlinePost: 'Packs de Bienestar Continuo M&H',
    subtitlePost: 'Bonos de 3 y 5 Sesiones con Tarifa Reducida',
    headlineReel: 'EL VERDADERO CAMBIO SE CONSIGUE CON CONSTANCIA',
    subtitleReel: 'Asegura tu rutina de mantenimiento corporal',
    hook0_3s: 'Primer plano del especialista preparando la camilla y los aceites naturales. Texto: "No esperes a que el dolor te pare".',
    bodyScript: 'Comenta los beneficios del mantenimiento preventivo mensual para evitar recaídas y contracturas repetitivas con nuestros bonos transferibles.',
    ctaText: 'Consulta nuestros bonos en quirosteopatiamh.es/bonos-y-regalos',
    caption: `🌿 La constancia es el secreto para no volver a sufrir bloqueos en la espalda.

Con nuestros Bonos de 3 y 5 sesiones de Reeducación Corporal aseguras un seguimiento continuo a un precio especial. Además, son transferibles para compartir con tu pareja o familiares.

📍 Centro Parasanitario M&H · Orcera (Jaén)
📲 Disponibles en nuestra app web: https://mh-bienestar.vercel.app/bonos-y-regalos

#BonosBienestar #MantenimientoCorporal #Orcera #Jaen #SaludPreventiva`,
    suggestedImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  }
];

const STOCK_IMAGES = [
  { label: 'Aceites y Masaje', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Terapia Manual', url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Calma y Velas', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Columna y Estiramiento', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Piedras y Armonía', url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80' }
];

export default function SocialContentStudio() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('postural-espalda');
  const [format, setFormat] = useState<'post' | 'reel'>('post');
  const [styleTheme, setStyleTheme] = useState<'sage-gold' | 'obsidian-neon' | 'forest-warm'>('sage-gold');
  
  const currentTopic = TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0];
  
  // Custom editable fields
  const [headline, setHeadline] = useState(currentTopic.headlinePost);
  const [subtitle, setSubtitle] = useState(currentTopic.subtitlePost);
  const [ctaText, setCtaText] = useState(currentTopic.ctaText);
  const [caption, setCaption] = useState(currentTopic.caption);
  const [hookScript, setHookScript] = useState(currentTopic.hook0_3s);
  const [bodyScript, setBodyScript] = useState(currentTopic.bodyScript);
  const [selectedImage, setSelectedImage] = useState(currentTopic.suggestedImage);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeBadge, setIncludeBadge] = useState(true);

  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [generatingDownload, setGeneratingDownload] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync when topic or format changes
  useEffect(() => {
    if (format === 'post') {
      setHeadline(currentTopic.headlinePost);
      setSubtitle(currentTopic.subtitlePost);
    } else {
      setHeadline(currentTopic.headlineReel);
      setSubtitle(currentTopic.subtitleReel);
    }
    setCtaText(currentTopic.ctaText);
    setCaption(currentTopic.caption);
    setHookScript(currentTopic.hook0_3s);
    setBodyScript(currentTopic.bodyScript);
    setSelectedImage(currentTopic.suggestedImage);
  }, [selectedTopicId, format]);

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, isCaption: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCaption) {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  // High-Resolution Image Export via HTML5 Canvas
  const downloadImagePNG = () => {
    setGeneratingDownload(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = format === 'post' ? 1080 : 1080;
    const height = format === 'post' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = new Image();
    bg.crossOrigin = 'anonymous';
    bg.onload = () => {
      // 1. Draw Background Image covering canvas
      const scale = Math.max(width / bg.width, height / bg.height);
      const x = (width / 2) - (bg.width / 2) * scale;
      const y = (height / 2) - (bg.height / 2) * scale;
      ctx.drawImage(bg, x, y, bg.width * scale, bg.height * scale);

      // 2. Add Dark/Gradient Overlay based on theme
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      if (styleTheme === 'obsidian-neon') {
        grad.addColorStop(0, 'rgba(14, 15, 18, 0.45)');
        grad.addColorStop(0.5, 'rgba(14, 15, 18, 0.75)');
        grad.addColorStop(1, 'rgba(14, 15, 18, 0.95)');
      } else if (styleTheme === 'forest-warm') {
        grad.addColorStop(0, 'rgba(18, 32, 24, 0.4)');
        grad.addColorStop(0.5, 'rgba(18, 32, 24, 0.7)');
        grad.addColorStop(1, 'rgba(18, 32, 24, 0.95)');
      } else {
        // sage-gold
        grad.addColorStop(0, 'rgba(23, 38, 29, 0.4)');
        grad.addColorStop(0.6, 'rgba(23, 38, 29, 0.78)');
        grad.addColorStop(1, 'rgba(15, 27, 20, 0.96)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Border Frame
      ctx.lineWidth = 14;
      ctx.strokeStyle = styleTheme === 'obsidian-neon' ? '#C8FF3E' : '#D4AF37';
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // 4. Draw Logo if enabled
      if (includeLogo) {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
          const logoSize = format === 'post' ? 140 : 160;
          const logoX = (width - logoSize) / 2;
          const logoY = format === 'post' ? 80 : 160;

          // Circular white background backing for logo
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 6, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.lineWidth = 4;
          ctx.strokeStyle = styleTheme === 'obsidian-neon' ? '#C8FF3E' : '#D4AF37';
          ctx.stroke();

          ctx.save();
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
          ctx.restore();

          finishCanvasDrawing();
        };
        logo.onerror = () => finishCanvasDrawing();
        logo.src = '/logo.png';
      } else {
        finishCanvasDrawing();
      }

      function finishCanvasDrawing() {
        if (!ctx || !canvas) return;
        // 5. Draw Top Brand Badge
        if (includeBadge) {
          const badgeY = format === 'post' ? 260 : 370;
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillStyle = styleTheme === 'obsidian-neon' ? '#C8FF3E' : '#E8D5A3';
          ctx.fillText('CENTRO PARASANITARIO · ORCERA (JAÉN)', width / 2, badgeY);
        }

        // 6. Draw Headline (word wrap)
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = format === 'post' ? 'bold 64px serif' : 'bold 76px serif';

        const words = headline.split(' ');
        let line = '';
        const lines = [];
        const maxWidth = width - 180;
        const lineHeight = format === 'post' ? 76 : 90;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        const startY = format === 'post' ? 420 : 680;
        for (let k = 0; k < lines.length; k++) {
          ctx.fillText(lines[k].trim(), width / 2, startY + (k * lineHeight));
        }

        // 7. Draw Subtitle / Hook Text
        const subY = startY + (lines.length * lineHeight) + 30;
        ctx.font = '32px sans-serif';
        ctx.fillStyle = styleTheme === 'obsidian-neon' ? '#A2FFAA' : '#F4ECE1';
        ctx.fillText(subtitle, width / 2, subY);

        // 8. Draw Bottom CTA Badge
        const ctaBoxY = format === 'post' ? height - 160 : height - 260;
        const boxW = 540;
        const boxH = 70;
        const boxX = (width - boxW) / 2;

        ctx.fillStyle = styleTheme === 'obsidian-neon' ? '#C8FF3E' : '#233D2D';
        ctx.beginPath();
        ctx.roundRect(boxX, ctaBoxY, boxW, boxH, 35);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = styleTheme === 'obsidian-neon' ? '#3DDC84' : '#D4AF37';
        ctx.stroke();

        ctx.font = 'bold 26px sans-serif';
        ctx.fillStyle = styleTheme === 'obsidian-neon' ? '#0E0F12' : '#FFFFFF';
        ctx.fillText('📲 Pide tu Cita en quirosteopatiamh.es', width / 2, ctaBoxY + 44);

        // 9. Location & Phone in footer
        ctx.font = '22px sans-serif';
        ctx.fillStyle = '#CBD5E1';
        ctx.fillText('Calle San José, 2 · Tel: 651 30 87 38', width / 2, ctaBoxY + 105);

        // Trigger Download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `mh-bienestar-${format}-${selectedTopicId}.png`;
        link.href = dataUrl;
        link.click();
        setGeneratingDownload(false);
      }
    };
    bg.onerror = () => {
      alert('No se pudo cargar la imagen de fondo. Por favor, selecciona otra foto.');
      setGeneratingDownload(false);
    };
    bg.src = selectedImage;
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-800 dark:bg-neon-lime/20 dark:text-neon-lime border border-forest-300 dark:border-neon-lime/30 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estudio Gráfico &amp; Generador Viral M&amp;H</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-white">
            Generador de Contenidos &amp; Diseños para Redes
          </h2>
          <p className="text-xs text-forest-600 dark:text-obsidian-300">
            Crea imágenes de marca y guiones para Instagram, Facebook, Reels, Stories y WhatsApp con el logo oficial.
          </p>
        </div>

        {/* Quick Format Switcher */}
        <div className="flex items-center rounded-2xl bg-warm-200/80 dark:bg-obsidian-800 p-1 border border-warm-300 dark:border-white/10 self-start">
          <button
            type="button"
            onClick={() => setFormat('post')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              format === 'post'
                ? 'bg-white dark:bg-obsidian-700 text-forest-950 dark:text-white shadow-soft-sm'
                : 'text-forest-700 dark:text-obsidian-400'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Post / Etiqueta (1:1)</span>
          </button>
          <button
            type="button"
            onClick={() => setFormat('reel')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              format === 'reel'
                ? 'bg-white dark:bg-obsidian-700 text-forest-950 dark:text-white shadow-soft-sm'
                : 'text-forest-700 dark:text-obsidian-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Reel / Story (9:16)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Generator (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Theme & Topic Selector */}
          <div className="bg-white dark:bg-obsidian-850 p-6 rounded-3xl border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-forest-900 dark:text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-forest-700 dark:text-neon-lime" />
                <span>1. Elige la Temática de la Publicación:</span>
              </label>
              <span className="text-[11px] text-gold-600 dark:text-neon-lime font-medium">5 Plantillas Estratégicas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                    selectedTopicId === topic.id
                      ? 'bg-forest-800 text-white border-forest-900 shadow-soft-sm dark:bg-neon-lime dark:text-obsidian-950 dark:border-neon-lime'
                      : 'bg-warm-50 dark:bg-obsidian-800 border-warm-200 dark:border-white/10 text-forest-850 dark:text-obsidian-200 hover:bg-warm-100 dark:hover:bg-obsidian-750'
                  }`}
                >
                  <p className="font-bold">{topic.name}</p>
                  <p className={`text-[11px] mt-0.5 truncate ${selectedTopicId === topic.id ? 'opacity-90' : 'text-forest-500 dark:text-obsidian-400'}`}>
                    {topic.headlinePost}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Custom Text & Headlines */}
          <div className="bg-white dark:bg-obsidian-850 p-6 rounded-3xl border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-forest-900 dark:text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-forest-700 dark:text-neon-lime" />
                <span>2. Textos de la Imagen (Editables en tiempo real):</span>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                  Titular Principal en Portada:
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50 dark:bg-obsidian-800 text-xs text-forest-950 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-forest-700 dark:text-obsidian-300 mb-1">
                  Subtítulo / Gancho Secundario:
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50 dark:bg-obsidian-800 text-xs text-forest-950 dark:text-white"
                />
              </div>
            </div>

            {/* Design Options: Colors, Logo & Badges */}
            <div className="pt-3 border-t border-warm-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-forest-700 dark:text-obsidian-300 mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Estilo Visual:</span>
                </label>
                <select
                  value={styleTheme}
                  onChange={(e: any) => setStyleTheme(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 dark:border-white/10 bg-warm-50 dark:bg-obsidian-800 text-xs text-forest-900 dark:text-white"
                >
                  <option value="sage-gold">Salvia &amp; Dorado (Elegante Orgánico)</option>
                  <option value="obsidian-neon">Obsidian &amp; Neón (Moderno UGC)</option>
                  <option value="forest-warm">Bosque &amp; Crema (Intensidad Natural)</option>
                </select>
              </div>

              <div className="flex flex-col justify-end space-y-1.5 text-xs text-forest-700 dark:text-obsidian-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    className="rounded border-warm-300 text-forest-800 focus:ring-forest-600"
                  />
                  <span>Incluir Emblema Circular Oficial</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBadge}
                    onChange={(e) => setIncludeBadge(e.target.checked)}
                    className="rounded border-warm-300 text-forest-800 focus:ring-forest-600"
                  />
                  <span>Sello: Centro Parasanitario Orcera</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Background Image Selector & Upload */}
          <div className="bg-white dark:bg-obsidian-850 p-6 rounded-3xl border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-forest-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-forest-700 dark:text-neon-lime" />
                <span>3. Fotografía de Fondo:</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-warm-200 dark:bg-obsidian-700 text-forest-900 dark:text-white hover:bg-warm-300 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Foto Propia</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Gallery Picker */}
            <div className="grid grid-cols-5 gap-2.5">
              {STOCK_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.url
                      ? 'border-forest-800 dark:border-neon-lime scale-105 shadow-soft-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white p-0.5 text-center truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Video Script & Copywriter Section */}
          <div className="bg-white dark:bg-obsidian-850 p-6 rounded-3xl border border-warm-300 dark:border-white/10 shadow-soft-sm space-y-4">
            
            {format === 'reel' ? (
              /* REEL SCRIPT SECTION */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-forest-950 dark:text-white flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-neon-emerald" />
                    <span>Guión Paso a Paso para Grabar el Reel:</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`GANCHO (0-3s):\n${hookScript}\n\nDESARROLLO (3-20s):\n${bodyScript}\n\nLLAMADA A LA ACCIÓN (20-30s):\n${ctaText}`, false)}
                    className="text-xs text-forest-700 dark:text-neon-lime font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? '¡Guión Copiado!' : 'Copiar Guión'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-1">
                    <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                      <span>⚡ Gancho Visual (0 a 3 segundos):</span>
                    </span>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">{hookScript}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-warm-50 dark:bg-obsidian-800 border border-warm-200 dark:border-white/10 space-y-1">
                    <span className="font-bold text-forest-900 dark:text-white">🎬 Desarrollo Explicativo en Cabina (3 a 20 seg):</span>
                    <p className="text-forest-700 dark:text-obsidian-300 leading-relaxed">{bodyScript}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-1">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300">🎯 Cierre / Llamada a la Acción (20 a 30 seg):</span>
                    <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">{ctaText}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* TEXT COPY / CAPTION FOR POST / REEL */}
            <div className="space-y-2 pt-2 border-t border-warm-200 dark:border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-forest-950 dark:text-white">
                  Texto (Pie de Foto / Copywriting) con Hashtags:
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard(caption, true)}
                  className="text-xs text-forest-700 dark:text-neon-lime font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaption ? '¡Copiado!' : 'Copiar Texto para Publicar'}</span>
                </button>
              </div>

              <textarea
                rows={7}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-warm-300 dark:border-white/10 bg-warm-50/70 dark:bg-obsidian-800 text-xs font-mono text-forest-900 dark:text-obsidian-200 leading-relaxed focus:outline-none"
              />
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Live Graphic Preview & Download (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="sticky top-24 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-600 dark:text-obsidian-300">
                Vista Previa en Vivo ({format === 'post' ? 'Post 1:1' : 'Reel 9:16'})
              </span>
              <span className="text-[11px] text-forest-500 dark:text-obsidian-400">Listo para descargar en PNG</span>
            </div>

            {/* THE VISUAL CANVAS CARD PREVIEW */}
            <div 
              className={`relative mx-auto rounded-3xl overflow-hidden shadow-soft-2xl border-4 transition-all duration-300 ${
                format === 'post' ? 'aspect-square w-full max-w-[420px]' : 'aspect-[9/16] w-full max-w-[340px]'
              } ${
                styleTheme === 'obsidian-neon' 
                  ? 'border-neon-lime/80 shadow-neon-lime bg-obsidian-950' 
                  : 'border-gold-400/80 shadow-soft-xl bg-forest-950'
              }`}
            >
              {/* Background Photo */}
              <img 
                src={selectedImage} 
                alt="Vista previa fondo" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Theme Tint */}
              <div 
                className={`absolute inset-0 ${
                  styleTheme === 'obsidian-neon'
                    ? 'bg-gradient-to-b from-obsidian-950/40 via-obsidian-950/75 to-obsidian-950/95'
                    : styleTheme === 'forest-warm'
                    ? 'bg-gradient-to-b from-forest-950/40 via-forest-950/70 to-forest-950/95'
                    : 'bg-gradient-to-b from-forest-950/40 via-forest-900/78 to-forest-950/96'
                }`}
              />

              {/* Inner Decorative Golden/Neon Border */}
              <div className={`absolute inset-3 rounded-2xl border pointer-events-none ${
                styleTheme === 'obsidian-neon' ? 'border-neon-lime/40' : 'border-gold-400/40'
              }`} />

              {/* Graphic Content Container */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-7 text-center z-10">
                
                {/* Top Section: Logo & Center Badge */}
                <div className="space-y-2 flex flex-col items-center">
                  {includeLogo && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-0.5 border-2 border-gold-400 shadow-soft-md">
                      <img src="/logo.png" alt="M&H Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                  )}

                  {includeBadge && (
                    <div className="pt-1">
                      <span className={`text-[10px] tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                        styleTheme === 'obsidian-neon'
                          ? 'bg-obsidian-900/80 text-neon-lime border-neon-lime/40'
                          : 'bg-forest-900/80 text-gold-300 border-gold-400/40'
                      }`}>
                        Centro Parasanitario · Orcera
                      </span>
                    </div>
                  )}
                </div>

                {/* Middle Section: Main Headline & Subtitle */}
                <div className="space-y-2 py-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                    {headline}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm ${
                    styleTheme === 'obsidian-neon' ? 'text-neon-emerald' : 'text-warm-100'
                  }`}>
                    {subtitle}
                  </p>
                </div>

                {/* Bottom Section: Booking CTA Pill & Location */}
                <div className="space-y-2">
                  <div className={`py-2 px-4 rounded-full text-xs font-bold shadow-soft-md mx-auto inline-flex items-center justify-center gap-1.5 ${
                    styleTheme === 'obsidian-neon'
                      ? 'bg-neon-lime text-obsidian-950 border border-neon-emerald'
                      : 'bg-forest-800 text-white border border-gold-400/50'
                  }`}>
                    <span>📲 Pide tu Cita en quirosteopatiamh.es</span>
                  </div>

                  <p className="text-[10px] text-warm-200/90 drop-shadow-sm">
                    Calle San José, 2 · Tel: 651 30 87 38
                  </p>
                </div>

              </div>
            </div>

            {/* Action Buttons: Download PNG & Copy */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={downloadImagePNG}
                disabled={generatingDownload}
                className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-forest-800 hover:bg-forest-750 dark:bg-neon-lime dark:text-obsidian-950 dark:hover:bg-neon-lime/90 active:scale-[0.98] transition-all shadow-soft-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-gold-300 dark:text-obsidian-950" />
                <span>{generatingDownload ? 'Generando Imagen PNG...' : 'Descargar Imagen en Alta Calidad (PNG)'}</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(caption, true)}
                className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-forest-800 dark:text-obsidian-200 bg-warm-200 dark:bg-obsidian-800 hover:bg-warm-300 dark:hover:bg-obsidian-750 border border-warm-300 dark:border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCaption ? '¡Texto Copiado para Pegar en Instagram!' : 'Copiar Texto para el Pie de Foto'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, ArrowRight, ExternalLink, X, RotateCw, 
  Orbit, ArrowUpDown, ChevronUp, ChevronDown,
  Car, Wrench, Truck, ParkingCircle, Zap, ShieldAlert,
  Smartphone, Globe, Radio, Search, Building2, Activity,
  Cpu, Compass, Eye, Sparkles, Navigation, CheckCircle2,
  FileText, Shield, AlertTriangle, Radar, Flame, Gavel,
  Lock, LifeBuoy, FileCheck, Layers, GitFork, Award, Scan
} from 'lucide-react';
import { serviceCategoriesData, ServiceCategory, ServiceItem } from '../data/servicesData';
import { ServicePDFIcon, ServiceRepresentingPhoto } from './ServicePDFAssets';

interface ThreeSaaedGlobeProps {
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onSelectService: (service: ServiceItem, category: ServiceCategory) => void;
}

type LayoutShape = 'cluster' | 'spiral' | 'orbit' | 'grid';

// Dual-tone border gradient definitions for each category pillar (replacing dots with elegant gradient borders)
const pillarGradients: Record<string, { from: string; to: string }> = {
  all: { from: '#2563eb', to: '#4f46e5' }, // Blue to Indigo
  road_transport: { from: '#0284c7', to: '#06b6d4' }, // Sky to Cyan
  smart_parking: { from: '#d97706', to: '#ea580c' }, // Amber to Orange
  smart_tech: { from: '#dc2626', to: '#db2777' }, // Red to Pink
  inspection: { from: '#7c3aed', to: '#4f46e5' }, // Purple to Indigo
  gov_services: { from: '#059669', to: '#0d9488' }, // Emerald to Teal
};

export const ThreeSaaedGlobe: React.FC<ThreeSaaedGlobeProps> = ({ lang, isRtl, onSelectService }) => {
  const [shape, setShape] = useState<LayoutShape>('cluster');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [itemCount, setItemCount] = useState<number>(24);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isStackDismissed, setIsStackDismissed] = useState<boolean>(false);
  const [deckIndex, setDeckIndex] = useState<number>(0);
  const [swapAnimKey, setSwapAnimKey] = useState<number>(0);

  const bigCardRef = useRef<HTMLDivElement>(null);

  // Flatten all services with their parent category
  const allServices = useMemo(() => {
    const list: { service: ServiceItem; category: ServiceCategory; color: string; id: string }[] = [];
    serviceCategoriesData.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          service: item,
          category: cat,
          color: cat.color || '#2563eb',
          id: item.id
        });
      });
    });
    return list;
  }, []);

  // Filtered list
  const filteredServices = useMemo(() => {
    let result = allServices;
    if (activeFilter !== 'all') {
      result = result.filter(s => s.category.id === activeFilter);
    }
    return result.slice(0, itemCount);
  }, [allServices, activeFilter, itemCount]);

  const totalFiltered = filteredServices.length;
  const safeDeckIndex = totalFiltered > 0 ? ((deckIndex % totalFiltered) + totalFiltered) % totalFiltered : 0;
  
  // Three active cards in the stack for visual depth & swapping
  const currentFeatured = filteredServices[safeDeckIndex] || null;
  const stackCard2 = totalFiltered > 1 ? filteredServices[(safeDeckIndex + 1) % totalFiltered] : null;
  const stackCard3 = totalFiltered > 2 ? filteredServices[(safeDeckIndex + 2) % totalFiltered] : null;

  const swapNext = useCallback(() => {
    if (totalFiltered <= 1) return;
    setDeckIndex(prev => (prev + 1) % totalFiltered);
    setSwapAnimKey(k => k + 1);
  }, [totalFiltered]);

  const swapPrev = useCallback(() => {
    if (totalFiltered <= 1) return;
    setDeckIndex(prev => (prev - 1 + totalFiltered) % totalFiltered);
    setSwapAnimKey(k => k + 1);
  }, [totalFiltered]);

  // Keep deck state reactive without blocking page scroll
  // The user can swap cards using the controls or clicking adjacent cards smoothly

  // Dedicated Boxicons 2D vector icons representing each service precisely
  const getService2DIcon = (id: string) => {
    switch (id) {
      case 'acc_recon': return <i className="bx bx-car text-sm text-blue-600 dark:text-blue-400" />;
      case 'delivery_platform': return <i className="bx bx-layer text-sm text-indigo-600 dark:text-indigo-400" />;
      case 'heavy_trucks': return <i className="bx bx-traffic-cone text-sm text-amber-600 dark:text-amber-400" />;
      case 'vehicle_towing': return <i className="bx bx-wrench text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'school_zones': return <i className="bx bx-shield-quarter text-sm text-purple-600 dark:text-purple-400" />;
      case 'events_traffic': return <i className="bx bx-compass text-sm text-blue-600 dark:text-blue-400" />;
      case 'road_patrols': return <i className="bx bx-radar text-sm text-sky-600 dark:text-sky-400" />;
      case 'smart_parking': return <i className="bx bx-parking text-sm text-blue-600 dark:text-blue-400" />;
      case 'parking_systems': return <i className="bx bx-bolt-circle text-sm text-amber-600 dark:text-amber-400" />;
      case 'parking_surveillance': return <i className="bx bx-cctv text-sm text-indigo-600 dark:text-indigo-400" />;
      case 'parking_app': return <i className="bx bx-credit-card text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'ev_charging_mgmt': return <i className="bx bxs-zap text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'impound_mgmt': return <i className="bx bx-lock-alt text-sm text-red-600 dark:text-red-400" />;
      case 'smart_impound': return <i className="bx bx-shield-minus text-sm text-indigo-600 dark:text-indigo-400" />;
      case 'vehicle_release': return <i className="bx bx-check-circle text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'vehicle_auction': return <i className="bx bx-gavel text-sm text-purple-600 dark:text-purple-400" />;
      case 'saaedi_service': return <i className="bx bx-devices text-sm text-indigo-600 dark:text-indigo-400" />;
      case 'safe_city': return <i className="bx bx-globe text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'c4i_centers': return <i className="bx bx-broadcast text-sm text-blue-600 dark:text-blue-400" />;
      case 'tvr_radars': return <i className="bx bx-scan text-sm text-purple-600 dark:text-purple-400" />;
      case 'smart_patrols_unit': return <i className="bx bxs-car text-sm text-blue-600 dark:text-blue-400" />;
      case 'smart_gates': return <i className="bx bx-door-open text-sm text-teal-600 dark:text-teal-400" />;
      case 'road_assistance': return <i className="bx bx-support text-sm text-amber-600 dark:text-amber-400" />;
      case 'traffic_diversions': return <i className="bx bx-git-branch text-sm text-orange-600 dark:text-orange-400" />;
      case 'incident_clearing': return <i className="bx bx-error-circle text-sm text-red-600 dark:text-red-400" />;
      case 'traffic_consulting': return <i className="bx bx-file text-sm text-blue-600 dark:text-blue-400" />;
      case 'safety_audits': return <i className="bx bx-check-shield text-sm text-emerald-600 dark:text-emerald-400" />;
      case 'driver_awareness': return <i className="bx bx-award text-sm text-purple-600 dark:text-purple-400" />;
      default: return <i className="bx bx-grid-alt text-sm text-blue-600 dark:text-blue-400" />;
    }
  };

  // Translations
  const t = {
    title: {
      en: 'Spatial Service Ecosystem',
      ar: 'منظومة الخدمات المكانية الذكية',
      ur: 'اسپيشل سروسز نیٹ ورک',
      ru: 'Пространственная экосистема услуг'
    },
    countLabel: {
      en: 'Services Count',
      ar: 'العدد',
      ur: 'تعداد',
      ru: 'Услуги'
    },
    clickToSpiral: {
      en: 'Click to change layout',
      ar: 'انقر لتغيير التوزيع المكاني',
      ur: 'شکل تبدیل کرنے کیلئے کلک کریں',
      ru: 'Нажмите для изменения схемы'
    },
    tryService: {
      en: 'Explore Service',
      ar: 'استكشف تفاصيل الخدمة',
      ur: 'سروس دیکھیں',
      ru: 'Перейти к услуге'
    },
    connectBtn: {
      en: 'EXPLORE ALL 28 SERVICES',
      ar: 'استكشف كافة الخدمات (28 خدمة)',
      ur: 'تمام 28 خدمات دریافت کریں',
      ru: 'ВСЕ 28 УСЛУГ СИСТЕМЫ'
    },
    allCategories: {
      en: 'All Pillars',
      ar: 'جميع الركائز',
      ur: 'تمام شعبے',
      ru: 'Все направления'
    },
    swapHint: {
      en: 'Scroll mouse up / down to swap',
      ar: 'مرر الفأرة للأعلى أو الأسفل للتبديل',
      ur: 'تبدیل کرنے کیلئے ماؤس اسکرول کریں',
      ru: 'Прокрутите колесо мыши для смены'
    },
    activeStatus: {
      en: '24/7 ACTIVE',
      ar: 'نشط 24/7',
      ur: '24/7 فعال',
      ru: 'АКТИВНО 24/7'
    },
    slaLabel: {
      en: 'SLA: < 7.2 min',
      ar: 'الاستجابة: < 7.2 دقيقة',
      ur: 'جوابی وقت: 7.2 منٹ',
      ru: 'SLA: < 7.2 мин'
    },
    neuralNet: {
      en: 'C4i Neural Network',
      ar: 'الشبكة العصبية الذكية C4i',
      ur: 'C4i نیورل نیٹ ورک',
      ru: 'Нейросеть C4i'
    }
  };

  // Increased circular radius R (increased width of spatial circle)
  const getCardPosition = (index: number, total: number, shapeMode: LayoutShape) => {
    // Generously expanded radius for wide spatial field
    const R = 280;

    if (shapeMode === 'cluster') {
      const goldenAngle = 2.39996;
      const r = Math.sqrt((index + 0.5) / total) * (R * 0.88);
      const theta = index * goldenAngle;
      return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
        scale: 0.95 + (index % 3) * 0.04,
        rotation: ((index % 5) - 2) * 1.5
      };
    } 
    
    if (shapeMode === 'spiral') {
      const turns = 2.2;
      const progress = index / total;
      const r = progress * R * 0.92 + 30;
      const theta = progress * Math.PI * 2 * turns;
      return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
        scale: 0.92 + progress * 0.12,
        rotation: (theta * 180) / Math.PI * 0.08
      };
    }

    if (shapeMode === 'orbit') {
      const ringIndex = index % 3;
      const ringRadius = [85, 175, 265][ringIndex];
      const itemsInRing = Math.ceil(total / 3);
      const posInRing = Math.floor(index / 3);
      const angle = (posInRing / itemsInRing) * Math.PI * 2 + ringIndex * 0.5;
      return {
        x: Math.cos(angle) * ringRadius,
        y: Math.sin(angle) * ringRadius,
        scale: 1 - ringIndex * 0.05,
        rotation: 0
      };
    }

    // Grid layout
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const spacing = 72;
    const startX = -((cols - 1) * spacing) / 2;
    const startY = -((Math.ceil(total / cols) - 1) * spacing) / 2;
    return {
      x: startX + col * spacing,
      y: startY + row * spacing,
      scale: 1,
      rotation: 0
    };
  };

  const cycleShape = () => {
    const shapes: LayoutShape[] = ['cluster', 'spiral', 'orbit', 'grid'];
    const nextIndex = (shapes.indexOf(shape) + 1) % shapes.length;
    setShape(shapes[nextIndex]);
  };

  // Pre-calculate positions of all filtered services for the Neural Network layer
  const calculatedPositions = useMemo(() => {
    return filteredServices.map((item, idx) => ({
      item,
      pos: getCardPosition(idx, filteredServices.length, shape),
      idx
    }));
  }, [filteredServices, shape]);

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`w-full min-h-[660px] lg:min-h-[760px] bg-[#f8f9fa] dark:bg-[#111317] text-zinc-900 dark:text-white rounded-3xl p-4 sm:p-7 relative overflow-hidden flex flex-col items-center justify-between border border-zinc-200/90 dark:border-zinc-800 shadow-sm select-none ${isRtl ? 'text-right' : 'text-left'}`}
    >
      
      {/* Background Organic Topographic Paths & Soft Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="organicDots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="18" r="1.5" fill="#a1a1aa" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organicDots)" />
          <path d="M-100,200 C300,100 500,400 900,250 S1400,300 1800,150" fill="none" stroke="#d4d4d8" strokeWidth="28" strokeLinecap="round" opacity="0.35" />
          <path d="M-50,650 C400,550 700,750 1200,600 S1600,700 2000,550" fill="none" stroke="#e4e4e7" strokeWidth="40" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

      {/* Centered Pillar Tabs - No status dot */}
      <div className="relative z-20 w-full flex items-center justify-center mb-3">
        {/* Pillar Tabs: Centered, less rounded corners (rounded-lg), NO color dots, Dual-tone GRADIENT BORDERS */}
        <div className="flex items-center justify-center flex-wrap gap-2 py-1 max-w-4xl mx-auto">
          
          {/* All Pillars Tab */}
          <button
            onClick={() => {
              setActiveFilter('all');
              setDeckIndex(0);
            }}
            className={`p-[1.5px] rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? 'shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40'
                : 'hover:opacity-100 opacity-80'
            }`}
            style={{
              backgroundImage: activeFilter === 'all'
                ? 'linear-gradient(135deg, #2563eb, #4f46e5)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(79, 70, 229, 0.4))'
            }}
          >
            <div className={`px-3 py-1.5 rounded-[6.5px] text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}>
              <span>{t.allCategories[lang]}</span>
            </div>
          </button>

          {/* Category Tabs with Gradient Border and Less Rounded Corners */}
          {serviceCategoriesData.map(cat => {
            const grad = pillarGradients[cat.id] || { from: '#2563eb', to: '#4f46e5' };
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setDeckIndex(0);
                }}
                className={`p-[1.5px] rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40'
                    : 'hover:opacity-100 opacity-80'
                }`}
                style={{
                  backgroundImage: isActive
                    ? `linear-gradient(135deg, ${grad.from}, ${grad.to})`
                    : `linear-gradient(135deg, ${grad.from}55, ${grad.to}55)`
                }}
              >
                <div className={`px-3 py-1.5 rounded-[6.5px] text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}>
                  <span>{cat.title[lang]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Spatial Stage Container */}
      <div className="relative w-full flex-1 flex items-center justify-center my-2">
        
        {/* Helper Hint Text */}
        <div 
          onClick={cycleShape}
          className={`absolute top-1 ${isRtl ? 'left-4 sm:left-12' : 'right-4 sm:right-12'} z-20 text-[11px] font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer transition-colors flex items-center gap-1.5 select-none`}
        >
          <span>{t.clickToSpiral[lang]}</span>
          <RotateCw size={12} className="text-zinc-400" />
        </div>

        {/* Central Expanded Circular Stage (Increased width for wide, uncrowded spatial layout) */}
        <div className="relative w-[360px] h-[360px] sm:w-[560px] sm:h-[560px] md:w-[650px] md:h-[650px] lg:w-[720px] lg:h-[720px] flex items-center justify-center">
          
          {/* Circular Orbit Boundaries with Concentric Holographic Rings */}
          <div className="absolute inset-0 rounded-full border border-zinc-300/60 dark:border-zinc-700/50 shadow-sm pointer-events-none" />
          <div className="absolute inset-[70px] rounded-full border border-dashed border-zinc-200/60 dark:border-zinc-800/60 pointer-events-none" />
          <div className="absolute inset-[150px] rounded-full border border-zinc-200/40 dark:border-zinc-800/40 pointer-events-none" />

          {/* Left Orbital Handle: Count */}
          <div className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5">
            <span className="text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap hidden sm:inline">
              {t.countLabel[lang]}
            </span>
            <button
              onClick={() => setItemCount(prev => prev === 28 ? 14 : prev === 14 ? 20 : 28)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center justify-center text-xs font-black text-zinc-800 dark:text-zinc-200 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              {filteredServices.length}
            </button>
          </div>

          {/* Top Orbital Anchor: SAAED Core Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Right Orbital Control: Shape toggle */}
          <div className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5">
            <button
              onClick={cycleShape}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center gap-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Orbit size={13} className="text-blue-600 animate-spin-slow" />
              <span className="capitalize">{shape}</span>
            </button>
          </div>

          {/* ANIMATED NEURAL NETWORK LAYER (Synapses, Axons & Pulse Currents) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" 
            viewBox="-360 -360 720 720"
          >
            <defs>
              <radialGradient id="neuralCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="activeSynapseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
              </linearGradient>

              <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Central Neural Hub Concentric Energy Waves */}
            <circle cx="0" cy="0" r="12" fill="url(#neuralCoreGlow)" />
            <circle cx="0" cy="0" r="28" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="animate-spin-slow" />
            <circle cx="0" cy="0" r="54" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.25" />

            {/* Synaptic Axon Connections: Central Hub to each Service Node */}
            {calculatedPositions.map(({ item, pos, idx }) => {
              const isHovered = hoveredServiceId === item.service.id;
              const isSelected = selectedServiceId === item.service.id || currentFeatured?.service.id === item.service.id;
              const isActiveNode = isHovered || isSelected;

              return (
                <g key={`synapse-${item.service.id}`}>
                  {/* Neural Line */}
                  <line
                    x1="0"
                    y1="0"
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isActiveNode ? 'url(#activeSynapseGrad)' : '#a1a1aa'}
                    strokeWidth={isActiveNode ? 2.2 : 0.9}
                    strokeDasharray={isActiveNode ? 'none' : '3 4'}
                    opacity={isActiveNode ? 0.95 : 0.22}
                    filter={isActiveNode ? 'url(#neuralGlow)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Mid-axon Synaptic Neuron Junction */}
                  <circle
                    cx={pos.x * 0.5}
                    cy={pos.y * 0.5}
                    r={isActiveNode ? 2.5 : 1.5}
                    fill={isActiveNode ? '#38bdf8' : '#cbd5e1'}
                    opacity={isActiveNode ? 0.9 : 0.4}
                  />

                  {/* Interconnecting Synapse between adjacent nodes in cluster */}
                  {idx > 0 && (
                    <line
                      x1={calculatedPositions[idx - 1].pos.x}
                      y1={calculatedPositions[idx - 1].pos.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={isActiveNode ? '#38bdf8' : '#94a3b8'}
                      strokeWidth={isActiveNode ? 1.4 : 0.6}
                      opacity={isActiveNode ? 0.6 : 0.12}
                    />
                  )}

                  {/* Dynamic Action Potential: Light pulse traveling on active/hovered node */}
                  {isActiveNode && (
                    <motion.circle
                      r={3.5}
                      fill="#00f0ff"
                      filter="url(#neuralGlow)"
                      animate={{
                        cx: [0, pos.x * 0.5, pos.x],
                        cy: [0, pos.y * 0.5, pos.y],
                        opacity: [0.2, 1, 0.4]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'easeInOut'
                      }}
                    />
                  )}

                  {/* Ambient Autonomous Data Pulses on select nodes */}
                  {idx % 4 === 0 && !isActiveNode && (
                    <motion.circle
                      r={2}
                      fill="#3b82f6"
                      animate={{
                        cx: [0, pos.x],
                        cy: [0, pos.y],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.8 + (idx % 3),
                        delay: (idx % 5) * 0.4,
                        ease: 'easeInOut'
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* DYNAMIC SPATIAL SERVICE CARDS: Crisp 2D Icon + Compact Title (reduced font size, no crowding) */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            {calculatedPositions.map(({ item, pos, idx }) => {
              const isHovered = hoveredServiceId === item.service.id;
              const isSelected = (selectedServiceId === item.service.id) || (currentFeatured?.service.id === item.service.id);

              return (
                <motion.div
                  key={item.service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: isHovered || isSelected ? 1.14 : pos.scale,
                    rotate: pos.rotation,
                    opacity: 1,
                    zIndex: isHovered || isSelected ? 40 : 10 + (idx % 10),
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 95,
                    damping: 15,
                    mass: 0.7
                  }}
                  whileHover={{ scale: 1.18, zIndex: 50 }}
                  onMouseEnter={() => {
                    setHoveredServiceId(item.service.id);
                    setDeckIndex(idx);
                    setSwapAnimKey(k => k + 1);
                  }}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  onClick={() => {
                    setSelectedServiceId(item.service.id);
                    setDeckIndex(idx);
                    setIsStackDismissed(false);
                    setSwapAnimKey(k => k + 1);
                  }}
                  onDoubleClick={() => onSelectService(item.service, item.category)}
                  className="absolute cursor-pointer select-none group"
                  style={{ transformOrigin: 'center center' }}
                >
                  {/* Compact Sleek Card with 2D icon + reduced font size */}
                  <div 
                    className={`w-[84px] sm:w-[92px] px-1.5 py-1 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 backdrop-blur-md ${
                      isSelected || isHovered
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 ring-2 ring-blue-500 shadow-xl scale-105'
                        : 'bg-white/95 dark:bg-zinc-850/95 text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-700/80 hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    {/* Specialized PDF extracted vector icon */}
                    <div className="shrink-0 w-5 h-5 rounded-md bg-blue-50/90 dark:bg-zinc-800 flex items-center justify-center p-0.5">
                      <ServicePDFIcon serviceId={item.service.id} className="w-4 h-4 object-contain" />
                    </div>
                    {/* Reduced font size for clean, elegant scannability */}
                    <span className={`text-[8px] sm:text-[8.5px] font-bold tracking-tight leading-[1.2] line-clamp-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {item.service.name[lang]}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT-HAND FLOATING STACKED CARD DECK WITH MOUSE WHEEL SCROLLING */}
        <AnimatePresence>
          {!isStackDismissed && currentFeatured && (
            <motion.div
              ref={bigCardRef}
              data-scroll-isolated="true"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute right-2 sm:right-6 lg:right-8 bottom-4 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-30 w-72 sm:w-80 cursor-ns-resize`}
            >
              {/* Stack Container */}
              <div className="relative">
                
                {/* Background Card 3 (Interactive Peeking Layer) */}
                {stackCard3 && (
                  <motion.div 
                    onClick={swapNext}
                    whileHover={{ scale: 0.95, y: -16 }}
                    className="absolute inset-0 bg-white/50 dark:bg-zinc-800/50 rounded-3xl -translate-y-4 translate-x-1.5 scale-[0.92] border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm cursor-pointer transition-transform"
                  />
                )}

                {/* Background Card 2 (Interactive Peeking Layer) */}
                {stackCard2 && (
                  <motion.div 
                    onClick={swapNext}
                    whileHover={{ scale: 0.98, y: -8 }}
                    className="absolute inset-0 bg-white/75 dark:bg-zinc-800/75 rounded-3xl -translate-y-2 translate-x-1 scale-[0.96] border border-zinc-200/70 dark:border-zinc-700/70 shadow-sm cursor-pointer transition-transform"
                  />
                )}

                {/* Foreground Featured Card with Swapping Animation */}
                <motion.div 
                  key={swapAnimKey}
                  initial={{ opacity: 0.75, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative z-10 bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-2xl space-y-3.5 ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  
                  {/* Top Bar with Arrows Controls & Dismiss - Clean header without dots */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {currentFeatured.category.title[lang]}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-semibold">
                        {safeDeckIndex + 1}/{totalFiltered}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Interactive Swap Controls */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          swapPrev();
                        }}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          swapNext();
                        }}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsStackDismissed(true);
                        }}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Service Representing Photo from PDF */}
                  <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-sm border border-zinc-100 dark:border-zinc-800">
                    <ServiceRepresentingPhoto 
                      serviceId={currentFeatured.service.id} 
                      title={currentFeatured.service.name[lang]} 
                      categoryColor={currentFeatured.category.color} 
                      className="w-full h-32" 
                    />
                  </div>

                  {/* Title & Description with Authentic PDF Icon */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 p-1 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm mt-0.5">
                      <ServicePDFIcon serviceId={currentFeatured.service.id} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
                        {currentFeatured.service.name[lang]}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mt-1.5">
                        {currentFeatured.service.description[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Operational Status Indicators */}
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] font-semibold text-zinc-500">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <i className="bx bx-check-shield text-xs text-emerald-600" />
                      <span>{t.activeStatus[lang]}</span>
                    </div>
                    <span>{t.slaLabel[lang]}</span>
                  </div>

                  {/* Primary Action Button */}
                  <button
                    onClick={() => onSelectService(currentFeatured.service, currentFeatured.category)}
                    className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>{t.tryService[lang]}</span>
                    <ExternalLink size={13} className={isRtl ? 'rotate-180' : ''} />
                  </button>

                  {/* Interactive Swap Hint Badge */}
                  <div className="flex items-center justify-center gap-1.5 text-[9.5px] font-medium text-zinc-400 dark:text-zinc-500 pt-0.5 select-none bg-zinc-50 dark:bg-zinc-800/50 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <ArrowUpDown size={12} className="text-blue-500 animate-bounce" />
                    <span>{t.swapHint[lang]}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Center Organic Call-to-Action Pill */}
      <div className="relative z-20 mt-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            const el = document.getElementById('services-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs sm:text-sm tracking-wider shadow-lg shadow-lime-500/20 uppercase transition-all cursor-pointer flex items-center gap-2 border border-black/10"
        >
          <span>{t.connectBtn[lang]}</span>
          <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
        </motion.button>
      </div>

    </div>
  );
};

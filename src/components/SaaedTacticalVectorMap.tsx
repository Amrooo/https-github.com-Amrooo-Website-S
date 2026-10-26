import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ServiceRepresentingPhoto } from './ServicePDFAssets';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export interface SaaedServiceProjectCard {
  id: string;
  serviceId?: string; // Maps to ServiceRepresentingPhoto asset
  name: { en: string; ar: string };
  // Ultra-concise reduced text (2 to 3 words max as requested)
  tag: { en: string; ar: string };
}

export interface EmirateBoundary {
  id: 'abudhabi' | 'dubai' | 'sharjah' | 'ajman' | 'uaq' | 'rak' | 'fujairah';
  name: { en: string; ar: string };
  capital: { en: string; ar: string };
  pathD: string;
  enclavePathD?: string;
  centerCoords: { x: number; y: number };
  labelCoords: { x: number; y: number };
  // Theme grey degrees
  darkGreyDegree: string;
  lightGreyDegree: string;
  // Colored highlights on hover
  hoverColor: string;
  hoverStroke: string;
  glowColor: string;
  items: SaaedServiceProjectCard[];
}

// ==========================================
// 2. CALM & AMBIENT WEB AUDIO SYNTHESIZER
// ==========================================

class TacticalAudioSynth {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playHoverChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(520, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.22); // E5

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Ignore audio error
    }
  }
}

const audioSynth = new TacticalAudioSynth();

// ==========================================
// 3. UAE EMIRATES DATA
// ==========================================

export const UAE_EMIRATES: EmirateBoundary[] = [
  {
    id: 'abudhabi',
    name: { en: 'Abu Dhabi', ar: 'أبوظبي' },
    capital: { en: 'Abu Dhabi City', ar: 'مدينة أبوظبي' },
    darkGreyDegree: '#1e2634',
    lightGreyDegree: '#dbe4ee',
    hoverColor: '#eab308',
    hoverStroke: '#fde047',
    glowColor: 'rgba(234, 179, 8, 0.55)',
    pathD: `
      M 50 480 
      L 110 410 L 170 390 L 250 400 L 330 410 L 380 400 L 450 370 L 480 360 L 540 350 L 580 340 
      L 740 460 L 770 520 L 760 450 L 730 430 L 680 410 
      L 680 710 L 200 680 L 50 480 Z
    `,
    centerCoords: { x: 420, y: 520 },
    labelCoords: { x: 440, y: 510 },
    items: [
      {
        id: 'ad-1',
        serviceId: 'acc_recon',
        name: { en: 'Accident Reconstruction', ar: 'إعادة بناء الحوادث' },
        tag: { en: '3D Forensics', ar: 'معاينة ثلاثية' }
      },
      {
        id: 'ad-2',
        serviceId: 'road_patrols',
        name: { en: 'Traffic Patrols', ar: 'دوريات السير' },
        tag: { en: 'Rapid Response', ar: 'استجابة فورية' }
      },
      {
        id: 'ad-3',
        serviceId: 'vehicle_towing',
        name: { en: 'Smart Towing', ar: 'أسطول السحب' },
        tag: { en: '24/7 Recovery', ar: 'سحب متواصل' }
      },
      {
        id: 'ad-4',
        serviceId: 'tvr_radars',
        name: { en: 'Radar Calibration', ar: 'معايرة الرادارات' },
        tag: { en: 'Laser Accuracy', ar: 'دقة ليزرية' }
      }
    ]
  },
  {
    id: 'dubai',
    name: { en: 'Dubai', ar: 'دبي' },
    capital: { en: 'Dubai', ar: 'دبي' },
    darkGreyDegree: '#374151',
    lightGreyDegree: '#cbd5e1',
    hoverColor: '#059669',
    hoverStroke: '#34d399',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    pathD: `
      M 580 340 
      L 630 330 L 680 320 L 730 310 L 735 340 L 720 370 L 680 410 L 730 430 L 760 450 L 740 460 L 580 340 
      Z
    `,
    enclavePathD: `
      M 790 380 L 830 375 L 835 410 L 800 420 Z
    `,
    centerCoords: { x: 670, y: 360 },
    labelCoords: { x: 670, y: 355 },
    items: [
      {
        id: 'dxb-1',
        serviceId: 'road_patrols',
        name: { en: 'Smart Patrols', ar: 'دوريات ذكية' },
        tag: { en: 'Autonomous Fleet', ar: 'أسطول ذكي' }
      },
      {
        id: 'dxb-2',
        serviceId: 'circuit_racing',
        name: { en: 'Circuit Escorts', ar: 'تأمين الحلبات' },
        tag: { en: 'Event Logistics', ar: 'تأمين المسارات' }
      },
      {
        id: 'dxb-3',
        serviceId: 'smart_parking',
        name: { en: 'Smart Parking', ar: 'المواقف الذكية' },
        tag: { en: 'Sensor Guidance', ar: 'مستشعرات رقمية' }
      },
      {
        id: 'dxb-4',
        serviceId: 'heavy_trucks',
        name: { en: 'Cargo Escort', ar: 'مرافقة الحمولات' },
        tag: { en: 'Abnormal Freight', ar: 'شحنات ضخمة' }
      }
    ]
  },
  {
    id: 'sharjah',
    name: { en: 'Sharjah', ar: 'الشارقة' },
    capital: { en: 'Sharjah', ar: 'الشارقة' },
    darkGreyDegree: '#2d3748',
    lightGreyDegree: '#bcccdc',
    hoverColor: '#ea580c',
    hoverStroke: '#fb923c',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    pathD: `
      M 690 310 
      L 730 260 L 760 250 L 780 260 L 810 260 L 820 290 L 795 300 L 770 340 L 735 340 L 730 310 
      Z
    `,
    centerCoords: { x: 745, y: 295 },
    labelCoords: { x: 745, y: 290 },
    items: [
      {
        id: 'shj-1',
        serviceId: 'chassis_scanner',
        name: { en: 'Underbody Scanner', ar: 'مسح الشاسيه' },
        tag: { en: 'Laser Inspection', ar: 'فحص ليزري' }
      },
      {
        id: 'shj-2',
        serviceId: 'tvr_radars',
        name: { en: 'Highway Radars', ar: 'رادارات الطرق' },
        tag: { en: 'Speed Safety', ar: 'ضبط السرعة' }
      },
      {
        id: 'shj-3',
        serviceId: 'heavy_trucks',
        name: { en: 'Freight Convoy', ar: 'قوافل الشحن' },
        tag: { en: 'Convoy Escort', ar: 'مرافقة القوافل' }
      },
      {
        id: 'shj-4',
        serviceId: 'weigh_in_motion',
        name: { en: 'Weigh Checkpoint', ar: 'منفذ الأوزان' },
        tag: { en: 'Axle Weighing', ar: 'وزن المحاور' }
      }
    ]
  },
  {
    id: 'ajman',
    name: { en: 'Ajman', ar: 'عجمان' },
    capital: { en: 'Ajman', ar: 'عجمان' },
    darkGreyDegree: '#4a5568',
    lightGreyDegree: '#e2e8f0',
    hoverColor: '#4f46e5',
    hoverStroke: '#818cf8',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    pathD: `
      M 728 260 
      L 745 235 L 755 245 L 740 265 
      Z
    `,
    enclavePathD: `
      M 795 330 L 815 325 L 820 345 L 800 350 Z
    `,
    centerCoords: { x: 740, y: 248 },
    labelCoords: { x: 700, y: 240 },
    items: [
      {
        id: 'ajm-1',
        serviceId: 'acc_recon',
        name: { en: 'Accident Dispatch', ar: 'توجيه الحوادث' },
        tag: { en: 'Unified Hub', ar: 'مركز موحد' }
      },
      {
        id: 'ajm-2',
        serviceId: 'road_patrols',
        name: { en: 'Collision Triage', ar: 'معاينة ميدانية' },
        tag: { en: 'Rapid Triage', ar: 'معاينة سريعة' }
      },
      {
        id: 'ajm-3',
        serviceId: 'vehicle_towing',
        name: { en: 'Vehicle Transport', ar: 'نقل وسحب' },
        tag: { en: 'Flatbed Fleet', ar: 'أسطول نقل' }
      },
      {
        id: 'ajm-4',
        serviceId: 'smart_parking',
        name: { en: 'Smart Bays', ar: 'مواقف ذكية' },
        tag: { en: 'E-Payment', ar: 'سداد ذكي' }
      }
    ]
  },
  {
    id: 'uaq',
    name: { en: 'Umm Al Quwain', ar: 'أم القيوين' },
    capital: { en: 'Umm Al Quwain', ar: 'أم القيوين' },
    darkGreyDegree: '#2b3442',
    lightGreyDegree: '#cfd8dc',
    hoverColor: '#0284c7',
    hoverStroke: '#38bdf8',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    pathD: `
      M 745 235 
      L 765 190 L 780 200 L 760 250 
      Z
    `,
    centerCoords: { x: 745, y: 206 },
    labelCoords: { x: 742, y: 200 },
    items: [
      {
        id: 'uaq-1',
        serviceId: 'tvr_radars',
        name: { en: 'Coastal Radars', ar: 'رادارات السواحل' },
        tag: { en: 'Corridor Safety', ar: 'أمان الطرق' }
      },
      {
        id: 'uaq-2',
        serviceId: 'heavy_trucks',
        name: { en: 'Pilot Escort', ar: 'مرافقة الشاحنات' },
        tag: { en: 'Safety Patrol', ar: 'تأمين مروري' }
      },
      {
        id: 'uaq-3',
        serviceId: 'weigh_in_motion',
        name: { en: 'Load Validator', ar: 'فحص الحمولات' },
        tag: { en: 'Axle Gates', ar: 'بوابات ذكية' }
      },
      {
        id: 'uaq-4',
        serviceId: 'evg_portal',
        name: { en: 'EVG Gate Portal', ar: 'بوابة المركبات' },
        tag: { en: 'Federal Testing', ar: 'فحص وطني' }
      }
    ]
  },
  {
    id: 'rak',
    name: { en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
    capital: { en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
    darkGreyDegree: '#3b4452',
    lightGreyDegree: '#d6dce5',
    hoverColor: '#e11d48',
    hoverStroke: '#fb7185',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    pathD: `
      M 752 182 
      L 800 80 L 825 45 L 840 110 L 810 190 L 778 200 
      Z
    `,
    enclavePathD: `
      M 780 260 L 810 260 L 820 290 L 795 300 Z
    `,
    centerCoords: { x: 800, y: 130 },
    labelCoords: { x: 785, y: 125 },
    items: [
      {
        id: 'rak-1',
        serviceId: 'road_patrols',
        name: { en: 'Mountain Patrols', ar: 'دوريات جبل جيس' },
        tag: { en: 'Alpine Safety', ar: 'أمان جبلي' }
      },
      {
        id: 'rak-2',
        serviceId: 'smart_gates',
        name: { en: 'Smart Checkpoints', ar: 'بوابات ذكية' },
        tag: { en: 'Auto Tollways', ar: 'عبور ذكي' }
      },
      {
        id: 'rak-3',
        serviceId: 'ai_solutions',
        name: { en: 'AI Modeling', ar: 'نمذجة تنبؤية' },
        tag: { en: 'Predictive Hub', ar: 'ذكاء استباقي' }
      },
      {
        id: 'rak-4',
        serviceId: 'uae_pass',
        name: { en: 'UAE PASS Sync', ar: 'الهوية الرقمية' },
        tag: { en: 'Biometric Auth', ar: 'مصادقة رقمية' }
      }
    ]
  },
  {
    id: 'fujairah',
    name: { en: 'Fujairah', ar: 'الفجيرة' },
    capital: { en: 'Fujairah', ar: 'الفجيرة' },
    darkGreyDegree: '#242f3d',
    lightGreyDegree: '#b0bec5',
    hoverColor: '#0d9488',
    hoverStroke: '#2dd4bf',
    glowColor: 'rgba(20, 184, 166, 0.45)',
    pathD: `
      M 810 190 
      L 860 195 L 850 330 L 820 290 L 810 260 L 780 260 L 810 190 
      Z
    `,
    centerCoords: { x: 830, y: 250 },
    labelCoords: { x: 865, y: 270 },
    items: [
      {
        id: 'fuj-1',
        serviceId: 'chassis_scanner',
        name: { en: 'Port Scanner', ar: 'مسح الموانئ' },
        tag: { en: 'Port Security', ar: 'أمن الموانئ' }
      },
      {
        id: 'fuj-2',
        serviceId: 'vehicle_towing',
        name: { en: 'Coast Rescue', ar: 'إنقاذ الساحل' },
        tag: { en: 'East Patrol', ar: 'تدخل سريع' }
      },
      {
        id: 'fuj-3',
        serviceId: 'tech_security',
        name: { en: 'Thermal Cameras', ar: 'كاميرات حرارية' },
        tag: { en: 'Surveillance', ar: 'مراقبة ذكية' }
      },
      {
        id: 'fuj-4',
        serviceId: 'icp_emirates_id',
        name: { en: 'Federal Identity', ar: 'الهوية الاتحادية' },
        tag: { en: 'ICP Sync', ar: 'مزامنة وطنية' }
      }
    ]
  }
];

// ==========================================
// 4. MAIN COMPONENT: SaaedTacticalVectorMap
// ==========================================

export const SaaedTacticalVectorMap: React.FC<{
  lang?: string;
  className?: string;
  isDark?: boolean;
}> = ({ lang = 'en', className = '', isDark = true }) => {
  const isRtl = lang === 'ar' || lang === 'ur';
  const langKey: 'en' | 'ar' = lang === 'ar' ? 'ar' : 'en';

  const [hoveredEmirateId, setHoveredEmirateId] = useState<string | null>(null);
  const [selectedEmirateId, setSelectedEmirateId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isInsidePanel, setIsInsidePanel] = useState<boolean>(false);

  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioSynth.isMuted = isAudioMuted;
  }, [isAudioMuted]);

  // Hover only updates map path highlight; clicking sets selectedEmirateId to open side drawer
  const handleEmirateHover = (id: string | null) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    if (id) {
      setHoveredEmirateId(id);
      audioSynth.playHoverChime();
    } else {
      leaveTimeoutRef.current = setTimeout(() => {
        setHoveredEmirateId(null);
      }, 200);
    }
  };

  const handleClosePanel = () => {
    setSelectedEmirateId(null);
    setHoveredEmirateId(null);
  };

  const activeEmirateId = hoveredEmirateId || selectedEmirateId;
  const activeEmirate = UAE_EMIRATES.find(e => e.id === selectedEmirateId);

  return (
    <div 
      className={`w-full font-sans relative my-2 select-none ${className}`} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-3 mb-3 relative z-20 px-2">
        <div className="flex items-center gap-2.5">
          <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {isDark 
              ? (isRtl ? 'خريطة الإمارات التكتيكية (الوضع الليلي • درجات رمادية)' : 'TACTICAL UAE MAP (DARK MODE • SHADES OF GREY)')
              : (isRtl ? 'خريطة الإمارات التفاعلية (الوضع النهاري الأبيض)' : 'TACTICAL UAE MAP (LIGHT WHITE MODE)')
            }
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-sm ${
              isDark 
                ? 'bg-zinc-950/90 hover:bg-zinc-800 border border-zinc-800 text-slate-300' 
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs'
            }`}
            title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isAudioMuted ? (isRtl ? 'صامت' : 'Muted') : (isRtl ? 'صوت' : 'Audio')}</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className={`relative w-full h-[580px] sm:h-[660px] lg:h-[720px] rounded-3xl border flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-[#090d16] border-zinc-800/80 shadow-2xl shadow-black/80' 
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60'
      }`}>

        {/* SVG Cartographic Projection Canvas */}
        <svg 
          viewBox="0 0 1000 780" 
          className="w-full h-full object-contain relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dynamic Hover Glow Filter */}
            <filter id="emirate-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#38bdf8" floodOpacity="0.45" />
            </filter>
            <filter id="dark-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity={isDark ? "0.7" : "0.15"} />
            </filter>
          </defs>

          {/* Water Body Metallic Labels */}
          <g className={`water-labels pointer-events-none select-none transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-60'}`}>
            <text 
              x="290" 
              y="135" 
              fill={isDark ? "#64748b" : "#94a3b8"} 
              fontSize="14" 
              fontWeight="800" 
              letterSpacing="4" 
              transform="rotate(-5, 290, 135)"
              className="font-sans"
            >
              ARABIAN GULF ( الخليج العربي )
            </text>

            <text 
              x="870" 
              y="500" 
              fill={isDark ? "#64748b" : "#94a3b8"} 
              fontSize="12" 
              fontWeight="800" 
              letterSpacing="3" 
              transform="rotate(68, 870, 500)"
              className="font-sans"
            >
              GULF OF OMAN ( بحر عمان )
            </text>
          </g>

          {/* 7 Emirates Vector Polygons */}
          <g className="emirates-polygons">
            {UAE_EMIRATES.map(emirate => {
              const isHovered = activeEmirateId === emirate.id;
              const baseFill = isDark ? emirate.darkGreyDegree : emirate.lightGreyDegree;
              const baseStroke = isDark ? '#475569' : '#94a3b8';

              return (
                <g key={emirate.id} className="transition-all duration-300">
                  {/* Primary Territory Path */}
                  <path
                    d={emirate.pathD}
                    fill={isHovered ? emirate.hoverColor : baseFill}
                    stroke={isHovered ? emirate.hoverStroke : baseStroke}
                    strokeWidth={isHovered ? '3.2' : '1.5'}
                    filter={isHovered ? 'url(#emirate-glow)' : 'url(#dark-shadow)'}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      transformOrigin: `${emirate.centerCoords.x}px ${emirate.centerCoords.y}px`,
                      transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0px)'
                    }}
                    onMouseEnter={() => handleEmirateHover(emirate.id)}
                    onMouseLeave={() => handleEmirateHover(null)}
                    onClick={() => {
                      setSelectedEmirateId(emirate.id);
                      audioSynth.playHoverChime();
                    }}
                  />

                  {/* Secondary Enclave Path */}
                  {emirate.enclavePathD && (
                    <path
                      d={emirate.enclavePathD}
                      fill={isHovered ? emirate.hoverColor : baseFill}
                      stroke={isHovered ? emirate.hoverStroke : baseStroke}
                      strokeWidth={isHovered ? '3.2' : '1.5'}
                      filter={isHovered ? 'url(#emirate-glow)' : 'url(#dark-shadow)'}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        transformOrigin: `${emirate.centerCoords.x}px ${emirate.centerCoords.y}px`,
                        transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0px)'
                      }}
                      onMouseEnter={() => handleEmirateHover(emirate.id)}
                      onMouseLeave={() => handleEmirateHover(null)}
                      onClick={() => {
                        setSelectedEmirateId(emirate.id);
                        audioSynth.playHoverChime();
                      }}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Emirate Name Labels */}
          <g className="emirate-labels font-sans pointer-events-none select-none">
            {UAE_EMIRATES.map(emirate => {
              const isHovered = activeEmirateId === emirate.id;
              
              const defaultColor = isDark ? '#cbd5e1' : '#1e293b';
              const activeColor = isDark ? '#ffffff' : '#0f172a';

              return (
                <text
                  key={`lbl-${emirate.id}`}
                  x={emirate.labelCoords.x}
                  y={emirate.labelCoords.y}
                  fill={isHovered ? activeColor : defaultColor}
                  fontSize="13"
                  fontWeight="900"
                  textAnchor="start"
                  className="transition-colors duration-200 drop-shadow-sm"
                >
                  {emirate.name.en} • {emirate.name.ar}
                </text>
              );
            })}
          </g>

        </svg>

        {/* SIDE PANEL: SLIDES ON CLICK */}
        <AnimatePresence>
          {activeEmirate && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`absolute top-0 bottom-0 left-0 border-r z-30 w-[310px] sm:w-[340px] md:w-[365px] h-full flex flex-col font-sans shadow-2xl backdrop-blur-3xl transition-colors duration-300 ${
                isDark 
                  ? 'bg-zinc-950/95 border-zinc-800/90 text-white shadow-[20px_0_60px_rgba(0,0,0,0.9)]' 
                  : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-[20px_0_50px_rgba(0,0,0,0.15)]'
              }`}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Drawer Header */}
              <div className={`p-4 border-b flex items-center justify-between gap-3 shrink-0 ${
                isDark ? 'border-zinc-800/80 bg-zinc-900/80' : 'border-slate-200 bg-slate-50/90'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight truncate tracking-tight">
                      {activeEmirate.name[langKey]} • {activeEmirate.capital[langKey]}
                    </h3>
                    <p className={`text-xs font-semibold mt-0.5 truncate ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {isRtl ? 'المشاريع والوحدات الميدانية' : 'Field Projects & Operational Units'}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClosePanel}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    isDark 
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-slate-300 hover:text-white' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                  title={isRtl ? 'إغلاق' : 'Close'}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Content: Cards with Gradient Bordered Project Photos */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider opacity-80 px-1 pb-1 border-b border-zinc-200/50 dark:border-zinc-800/50">
                  <span>{isRtl ? 'المشاريع الميدانية' : 'Field Projects'}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[11px]">{activeEmirate.items.length}</span>
                </div>

                {activeEmirate.items.map((item) => (
                  <div
                    key={item.id}
                    className={`group relative rounded-2xl p-3 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-3.5 overflow-hidden ${
                      isDark 
                        ? 'bg-zinc-900/90 border-zinc-800/90 hover:border-blue-500/50 hover:bg-zinc-900' 
                        : 'bg-slate-50/90 border-slate-200/90 hover:border-blue-500/50 hover:bg-white'
                    }`}
                  >
                    {/* ENLARGED PHOTO WITH VIBRANT GRADIENT BORDER */}
                    <div className="p-[2px] rounded-xl bg-gradient-to-tr from-amber-400 via-blue-500 to-emerald-400 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-[10px] overflow-hidden bg-black/10 relative">
                        <ServiceRepresentingPhoto
                          serviceId={item.serviceId || item.id}
                          title={item.name[langKey]}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* NAME ONLY */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm sm:text-base font-extrabold leading-snug line-clamp-2 transition-colors ${
                        isDark 
                          ? 'text-white group-hover:text-blue-400' 
                          : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {item.name[langKey]}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 mt-1">
                        <span>{isRtl ? 'وحدة نشطة' : 'Active Deployment'}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className={`p-3 border-t text-center text-xs font-bold shrink-0 ${
                isDark ? 'border-zinc-800/80 text-zinc-400 bg-zinc-900/60' : 'border-slate-200 text-slate-600 bg-slate-50/80'
              }`}>
                {isRtl ? 'شبكة ساعد الوطنية للسلامة المرورية' : 'SAAED National Safety Network'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SaaedTacticalVectorMap;

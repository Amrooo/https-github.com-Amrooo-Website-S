import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  FileText, 
  X, 
  Download, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Compass,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Search
} from 'lucide-react';
import saaedLogo from './proud2.jpg';

export interface OperationalProjectItem {
  id: string; // e.g. 'SAE-PRJ-01'
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  emirate: {
    en: string;
    ar: string;
  };
  benefit: string; // e.g. '> 1,830,000 AED'
  color: string; // hex or tailwind class for route/indicator dot
  badgeColor: string;
  coordinates: { x: number; y: number }; // SVG Map percentage position
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  specs: {
    mandate: string;
    deployments: string;
    responseRate: string;
    techStack: string;
  };
}

const PROJECTS_DATA: OperationalProjectItem[] = [
  {
    id: 'SAE-PRJ-01',
    title: {
      en: 'Saaed SkyPatrol™',
      ar: 'ساعد سكاي باترول™'
    },
    subtitle: {
      en: 'Autonomous DiaB Drone Highway Response (<3 min response)',
      ar: 'استجابة طائرات بدون طيار ذاتية القيادة للطرق السريعة (<3 دقائق)'
    },
    emirate: {
      en: 'Dubai',
      ar: 'دبي'
    },
    benefit: '> 1,830,000 AED',
    color: '#2563eb', // Blue
    badgeColor: 'bg-blue-600',
    coordinates: { x: 48, y: 32 },
    category: {
      en: 'Aerial Surveillance & Emergency',
      ar: 'المراقبة الجوية والطوارئ'
    },
    description: {
      en: 'Autonomous Drone-in-a-Box (DiaB) grid deployed along the E11 & E311 arterial highways for instant crash assessment, traffic congestion live telemetry, and automated scene perimeter securing.',
      ar: 'شبكة طائرات مسيّرة ذاتية التمركز على امتداد شرياني E11 و E311 للتقييم الفوري للحوادث والمسح المباشر للاختناقات المرورية وتأمين محيط الحادث تلقائياً.'
    },
    specs: {
      mandate: 'Traffic Safety & Rapid Aviation Patrol',
      deployments: '24 Docking Stations',
      responseRate: '< 2.8 Mins Avg Arrival',
      techStack: 'Autonomous DiaB, Thermal Optical Sensor, AI Perimeter Beacon'
    }
  },
  {
    id: 'SAE-PRJ-02',
    title: {
      en: 'Saaed YardScan™',
      ar: 'ساعد يارد سكان™'
    },
    subtitle: {
      en: 'Robotic Quadruped Impound Yard Inventory & Tamper Detection',
      ar: 'إدارة وحراسة شبكات ساحات الحجز بالروبوتات الرباعية والذكاء الاصطناعي'
    },
    emirate: {
      en: 'Abu Dhabi',
      ar: 'أبوظبي'
    },
    benefit: '> 2,450,000 AED',
    color: '#d97706', // Orange
    badgeColor: 'bg-amber-600',
    coordinates: { x: 28, y: 68 },
    category: {
      en: 'Robotic Impound Asset Security',
      ar: 'حراسة وأتمتة ساحات الحجز'
    },
    description: {
      en: 'Robotic quadruped patrols integrated with LiDAR inventory mapping for 24/7 impound vehicle integrity audit, unauthorized entry detection, and continuous chassis scanning.',
      ar: 'دوريات روبوتية رباعية الأرجل متصلة بالماسحات الضوئية LiDAR لمراجعة سلامة المركبات المحجوزة على مدار الساعة ورصد محاولات العبث والتسلل.'
    },
    specs: {
      mandate: 'Vehicle Impound Security & Inventory Auditing',
      deployments: '8 Federal Storage Yards',
      responseRate: '100% Automated Audit',
      techStack: 'Quadruped Autonomous Robotics, 3D LiDAR, Vehicle VIN OCR'
    }
  },
  {
    id: 'SAE-PRJ-03',
    title: {
      en: 'Saaed Rapid-Triage™',
      ar: 'ساعد رابيد تراياج™'
    },
    subtitle: {
      en: 'Sub-Minute Remote Crash Assessment & Instant e-Reconstruction',
      ar: 'تقييم الحوادث عن بُعد في أقل من دقيقة وإعادة بناء المخطط الرقمي'
    },
    emirate: {
      en: 'Abu Dhabi',
      ar: 'أبوظبي'
    },
    benefit: '> 3,100,000 AED',
    color: '#2563eb', // Blue
    badgeColor: 'bg-blue-600',
    coordinates: { x: 38, y: 48 },
    category: {
      en: 'AI Crash Analysis & Triage',
      ar: 'التحقيق الرقمي وفحص الحوادث'
    },
    description: {
      en: 'AI-powered computer vision system analyzing live dashcam and roadside feeds to generate instant multi-vehicle collision reports, fault assignment, and e-claims dispatch.',
      ar: 'منظومة رؤية حاسوبية مدعومة بالذكاء الاصطناعي لتحليل الكاميرات المرورية وإصدار تخطيط الحادث وتحديد المسؤولية وإرسال المطالبة التأمينية فورا.'
    },
    specs: {
      mandate: 'Automated Accident Investigation',
      deployments: 'Abu Dhabi & Al Ain Command Center',
      responseRate: '< 45 Seconds AI Analysis',
      techStack: 'Multi-View Computer Vision, Photogrammetry Reconstruction'
    }
  },
  {
    id: 'SAE-PRJ-04',
    title: {
      en: 'Saaed InfraScan™',
      ar: 'ساعد إنفرا سكان™'
    },
    subtitle: {
      en: 'Millimeter-Grade Road Surface & Pothole Defect AI Mapping',
      ar: 'مسح بالذكاء الاصطناعي لعيوب الطرق والحفر بدقة المليمتر'
    },
    emirate: {
      en: 'Abu Dhabi',
      ar: 'أبوظبي'
    },
    benefit: '> 1,650,000 AED',
    color: '#059669', // Emerald/Green
    badgeColor: 'bg-emerald-600',
    coordinates: { x: 50, y: 44 },
    category: {
      en: 'Smart Infrastructure & Maintenance',
      ar: 'البنية التحتية الذكية واستدامة الطرق'
    },
    description: {
      en: 'Mobile-mounted laser scanners and edge AI inference units continuous scan highways for road erosion, cracks, and safety barriers damage, notifying maintenance teams autonomously.',
      ar: 'وحدات مسح ليزري متنقلة مجهزة بالذكاء الاصطناعي لرصد هبوط وتشققات الأسفلت وتلف الحواجز الوقائية وإرسال بلاغات الصيانة الآلية لمجلس المرور.'
    },
    specs: {
      mandate: 'Road Network Integrity & Preventative Maintenance',
      deployments: '1,200 KM Highway Coverage',
      responseRate: 'Real-time Anomaly Tagging',
      techStack: 'Edge AI LiDAR, Pothole Convolutional Model'
    }
  },
  {
    id: 'SAE-PRJ-05',
    title: {
      en: 'Saaed SmartPark™',
      ar: 'ساعد سمارت بارك™'
    },
    subtitle: {
      en: 'Autonomous Parking Space Enforcement & Electronic Permit Gate',
      ar: 'أتمتة الرقابة على المواقف وإدارة التصاريح الذكية للخدمات الخاصة'
    },
    emirate: {
      en: 'Dubai',
      ar: 'دبي'
    },
    benefit: '> 1,980,000 AED',
    color: '#7c3aed', // Purple
    badgeColor: 'bg-purple-600',
    coordinates: { x: 42, y: 52 },
    category: {
      en: 'Smart Urban Parking Control',
      ar: 'إدارة وتنظيم المواقف الذكية'
    },
    description: {
      en: 'Mobile LPR surveillance patrol vehicles cross-referencing reserved handicap and commercial loading zones to eliminate unauthorized parking and ensure urban mobility flow.',
      ar: 'دوريات مسح مرئي ذكية لمطابقة استخدام مواقف أصحاب الهمم والمناطق التجارية والتحقق الآلي من التصاريح لمنع التعدي والتكدس.'
    },
    specs: {
      mandate: 'Urban Parking Efficiency & People of Determination Reserved Spaces',
      deployments: '6 Urban Zones in Dubai',
      responseRate: '3,000 Plates/Hour Scan Capacity',
      techStack: 'High-Speed LPR Cameras, Cloud Permit Validator'
    }
  },
  {
    id: 'SAE-PRJ-06',
    title: {
      en: 'Saaed SafeSchool™',
      ar: 'ساعد سيف سكوول™'
    },
    subtitle: {
      en: 'AI Smart Bus Zone Camera Surveillance & Automated Safety Shields',
      ar: 'منظومة حماية النقل المدرسي الذكي والكاميرات الآلية لرموز التوقف'
    },
    emirate: {
      en: 'Sharjah',
      ar: 'الشارقة'
    },
    benefit: '> 1,220,000 AED',
    color: '#059669', // Emerald/Green
    badgeColor: 'bg-emerald-600',
    coordinates: { x: 52, y: 28 },
    category: {
      en: 'Student Transport Safety',
      ar: 'سلامة حافلات النقل المدرسي'
    },
    description: {
      en: 'AI optical safety sensors installed on school buses enforcing stop-arm compliance and monitoring driver alertness around designated student pick-up points.',
      ar: 'حساسات بصرية ذكية مثبتة على الحافلات المدرسية لرصد عدم الالتزام بضرورة التوقف الذراع الإشعاري وتأمين عبور الطلاب في المدارس.'
    },
    specs: {
      mandate: 'Child Safety & School Zone Pedestrian Protection',
      deployments: '450 School Buses',
      responseRate: 'Instant Safety Arm Violation Record',
      techStack: 'Stop-Arm AI Optical Vision, Driver Alertness Sensor'
    }
  },
  {
    id: 'SAE-PRJ-07',
    title: {
      en: 'Saaed EcoPatrol™',
      ar: 'ساعد إيكو باترول™'
    },
    subtitle: {
      en: 'EV Fleet Dispatch & Zero-Emission Rapid Incident Patrol',
      ar: 'دوريات كهربائية صديقة للبيئة للاستجابة السريعة الخالية من الانبعاثات'
    },
    emirate: {
      en: 'Ras Al Khaimah',
      ar: 'رأس الخيمة'
    },
    benefit: '> 1,150,000 AED',
    color: '#d97706', // Amber
    badgeColor: 'bg-amber-600',
    coordinates: { x: 58, y: 16 },
    category: {
      en: 'Green Mobility & Patrols',
      ar: 'الدوريات الخضراء الصديقة للبيئة'
    },
    description: {
      en: 'Zero-emission electric patrol fleet outfitted with solar auxiliary battery packs for silent operational monitoring, reduced carbon footprint, and fast highway dispatch.',
      ar: 'أسطول دوريات كهربائية ذات انبعاثات صفرية مجهزة بألواح شمسية للمراقبة الميدانية الصامتة ودعم الاستجابة السريعة على الطرق الخارجية.'
    },
    specs: {
      mandate: 'Sustainable Rapid Patrols',
      deployments: '35 Electric Patrols',
      responseRate: '100% Zero-Emission Patrol',
      techStack: 'EV Rapid Charger Fleet, Solar Auxiliary Power'
    }
  },
  {
    id: 'SAE-PRJ-08',
    title: {
      en: 'Saaed TunnelGuard™',
      ar: 'ساعد تونل جارد™'
    },
    subtitle: {
      en: 'Mountain Tunnel Thermal Fire & Smoke AI Early Detector',
      ar: 'الكشف الحراري والإنذار المبكر للأنفاق الجبلية بالذكاء الاصطناعي'
    },
    emirate: {
      en: 'Fujairah',
      ar: 'الفجيرة'
    },
    benefit: '> 2,100,000 AED',
    color: '#2563eb', // Blue
    badgeColor: 'bg-blue-600',
    coordinates: { x: 62, y: 32 },
    category: {
      en: 'Mountain Tunnel Safety',
      ar: 'سلامة الأنفاق الجبلية'
    },
    description: {
      en: 'Thermal infrared and acoustic sensor matrix in mountain highway tunnels for immediate heat spike detection, vehicular stall warnings, and automated ventilation activation.',
      ar: 'مصفوفة حساسات حرارية وصوتية داخل الأنفاق الجبلية لرصد الاكتظاظ والارتفاع الحراري المفاجئ والتعطل وتفعيل أنظمة التهوية وتغيير المسارات تلقائياً.'
    },
    specs: {
      mandate: 'Critical Highway Tunnel Security',
      deployments: '12 Highway Mountain Tunnels',
      responseRate: '< 5 Seconds Thermal Warning',
      techStack: 'Infrared Thermal Vision, Acoustic Vehicle Sensor'
    }
  }
];

export const OperationalProjectsSection: React.FC<{
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl?: boolean;
}> = ({ lang, isRtl = false }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('SAE-PRJ-01');
  const [activeTab, setActiveTab] = useState<'projects' | 'services'>('projects');
  const [filterEmirate, setFilterEmirate] = useState<string | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  const activeProject = PROJECTS_DATA.find(p => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const filteredProjects = filterEmirate 
    ? PROJECTS_DATA.filter(p => p.emirate.en === filterEmirate || p.emirate.ar === filterEmirate)
    : PROJECTS_DATA;

  // UAE Map Emirates List
  const emiratesList = [
    { nameEn: 'Abu Dhabi', nameAr: 'أبوظبي', x: 28, y: 68 },
    { nameEn: 'Dubai', nameAr: 'دبي', x: 48, y: 40 },
    { nameEn: 'Sharjah', nameAr: 'الشارقة', x: 50, y: 34 },
    { nameEn: 'Ajman', nameAr: 'عجمان', x: 49, y: 28 },
    { nameEn: 'Umm Al Quwain', nameAr: 'أم القيوين', x: 51, y: 24 },
    { nameEn: 'Ras Al Khaimah', nameAr: 'رأس الخيمة', x: 57, y: 16 },
    { nameEn: 'Fujairah', nameAr: 'الفجيرة', x: 63, y: 32 },
  ];

  return (
    <section id="operational-projects" className="py-16 sm:py-24 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Ambient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
              <span>{lang === 'ar' ? 'البنية التحتية والقطاعات الوطنية' : 'Federal Infrastructure & Projects'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {lang === 'ar' ? 'المشاريع التشغيلية الوطنية' : 'Operational Projects'}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 mt-2 max-w-2xl font-normal">
              {lang === 'ar' 
                ? 'تفويضات تشغيلية عبر 5 قطاعات حيوية تدعم منظومة المرور والسلامة الميدانية في دولة الإمارات'
                : '5-Sector Operational Mandates driving autonomous traffic, safety, and security across the UAE'}
            </p>
          </div>

          {/* Filter Pills / Emirate Quick Reset */}
          {filterEmirate && (
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 px-4 py-2 rounded-2xl">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
                {lang === 'ar' ? `المستعرض: ${filterEmirate}` : `Showing: ${filterEmirate}`}
              </span>
              <button 
                onClick={() => setFilterEmirate(null)} 
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <X size={14} />
                {lang === 'ar' ? 'إلغاء التصفية' : 'Show All'}
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Left Map Box + Right Projects List Box (Matching Screenshot Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLUMNS: Interactive UAE Map & Transport Corridor Routes Container */}
          <div className="lg:col-span-7 bg-slate-50/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[560px] sm:min-h-[620px] group">
            
            {/* Background Map Water Body Labels */}
            <div className="absolute top-12 left-12 text-slate-400/60 dark:text-zinc-600/60 font-extrabold text-xs tracking-widest pointer-events-none uppercase">
              ARABIAN GULF (الخليج العربي)
            </div>
            <div className="absolute bottom-20 right-8 text-slate-400/60 dark:text-zinc-600/60 font-extrabold text-xs tracking-widest pointer-events-none uppercase rotate-90">
              GULF OF OMAN (بحر عمان)
            </div>

            {/* Top Interactive Banner Header */}
            <div className="flex items-center justify-between z-20 pb-4 border-b border-slate-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Compass size={22} className="animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'خريطة الشبكة والمسارات الميدانية' : 'UAE Operational Corridor Network'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    {lang === 'ar' ? 'انقر على أجهزة المسح والإمارات لمشاهدة التفاصيل' : 'Click nodes or corridors to inspect live deployments'}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-700 dark:text-zinc-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {lang === 'ar' ? 'الشبكة متصلة الآن' : 'Live Network Connected'}
              </div>
            </div>

            {/* UAE Interactive Vector Map Container */}
            <div className="relative w-full h-[380px] sm:h-[440px] my-4 flex items-center justify-center">
              
              {/* SVG Map Lines & Outlines */}
              <svg className="w-full h-full max-w-[580px] max-h-[420px] overflow-visible" viewBox="0 0 600 400" fill="none">
                
                {/* UAE Coastline & Boundary Vector Paths */}
                <path 
                  d="M 50,220 C 80,220 180,210 260,190 C 290,185 300,170 330,120 C 350,90 380,50 410,30 C 430,20 460,50 480,90 C 490,110 500,150 460,200 C 420,240 380,280 270,350 C 180,390 100,340 50,220 Z" 
                  className="fill-slate-200/50 dark:fill-zinc-800/60 stroke-slate-300 dark:stroke-zinc-700" 
                  strokeWidth="2" 
                />

                {/* Geometric Radar Grid Lines */}
                <circle cx="330" cy="120" r="80" className="stroke-blue-500/10 dark:stroke-blue-500/20" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="330" cy="120" r="140" className="stroke-blue-500/10 dark:stroke-blue-500/20" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="330" cy="120" r="200" className="stroke-blue-500/5 dark:stroke-blue-500/10" strokeWidth="1" strokeDasharray="4 4" />

                {/* Corridor 1: E11 Skyway (Blue Dashed Route) */}
                <motion.path 
                  d="M 230,190 Q 290,150 340,110 T 430,40" 
                  className="stroke-blue-600 dark:stroke-blue-400" 
                  strokeWidth="3.5" 
                  strokeDasharray="6 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Corridor 2: E311 Logistics (Orange Route) */}
                <motion.path 
                  d="M 235,198 Q 295,158 345,118 T 435,48" 
                  className="stroke-amber-500 dark:stroke-amber-400" 
                  strokeWidth="3" 
                  strokeDasharray="5 3"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Corridor 3: E84 Mountain Transit (Green Route) */}
                <path 
                  d="M 230,190 Q 350,195 440,110" 
                  className="stroke-emerald-500 dark:stroke-emerald-400" 
                  strokeWidth="2.5" 
                  strokeDasharray="4 4"
                />

                {/* Secondary Corridor (Purple Route) */}
                <path 
                  d="M 230,190 L 380,215" 
                  className="stroke-purple-500/80 dark:stroke-purple-400/80" 
                  strokeWidth="2" 
                  strokeDasharray="3 3"
                />

                {/* Connecting Node Dots */}
                <circle cx="230" cy="190" r="6" className="fill-blue-600 stroke-white" strokeWidth="2" />
                <circle cx="340" cy="110" r="8" className="fill-blue-600 stroke-white animate-pulse" strokeWidth="2" />
                <circle cx="430" cy="40" r="6" className="fill-amber-500 stroke-white" strokeWidth="2" />
                <circle cx="440" cy="110" r="6" className="fill-emerald-500 stroke-white" strokeWidth="2" />
                <circle cx="380" cy="215" r="5" className="fill-purple-500 stroke-white" strokeWidth="2" />

                {/* Selected Active Project Map Highlight Indicator */}
                {activeProject && (
                  <g transform={`translate(${activeProject.coordinates.x * 5.5}, ${activeProject.coordinates.y * 3.5})`}>
                    <circle r="18" className="fill-blue-500/20 stroke-blue-600 animate-ping" strokeWidth="1.5" />
                    <circle r="8" className="fill-blue-600 stroke-white shadow-lg" strokeWidth="2" />
                    <text y="-14" textAnchor="middle" className="fill-blue-900 dark:fill-blue-200 text-[10px] font-black uppercase">
                      {activeProject.id}
                    </text>
                  </g>
                )}

              </svg>

              {/* Interactive Emirate Hotspot Buttons Overlay */}
              {emiratesList.map((e, idx) => {
                const isSelected = filterEmirate === e.nameEn || filterEmirate === e.nameAr;
                return (
                  <button
                    key={idx}
                    onClick={() => setFilterEmirate(filterEmirate === e.nameEn ? null : (lang === 'ar' ? e.nameAr : e.nameEn))}
                    style={{ left: `${e.x}%`, top: `${e.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all duration-300 flex items-center gap-1 shadow-md cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-500/30' 
                        : 'bg-white/90 dark:bg-zinc-800/90 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                    <span>{lang === 'ar' ? e.nameAr : e.nameEn}</span>
                  </button>
                );
              })}

            </div>

            {/* Bottom Bar: Legend Pills + Instructional Text (Matching Screenshot) */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 z-20">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1.5 rounded-xl shadow-xs text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>E11 Skyway: <strong>165 km</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1.5 rounded-xl shadow-xs text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>E311 Logistics: <strong>140 km</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1.5 rounded-xl shadow-xs text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>E84 Mountain Transit: <strong>95 km</strong></span>
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                {lang === 'ar' ? 'حرك المؤشر فوق أي إمارة لمشاهدة المشاريع' : 'Hover over any Emirate to inspect'}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Operational Projects List & Active Summary Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Header Card: SAAED Logo + Title + Services/Projects Tab Toggle */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.2rem] p-5 shadow-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={saaedLogo} 
                  alt="SAAED Logo" 
                  className="w-10 h-10 rounded-xl object-contain border border-slate-200 dark:border-zinc-700 p-0.5 bg-slate-50 dark:bg-zinc-800" 
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {lang === 'ar' ? 'المشاريع التشغيلية' : 'Operational Projects'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    {lang === 'ar' ? 'تفويضات تشغيلية عبر 5 قطاعات' : '5-Sector Operational Mandates'}
                  </p>
                </div>
              </div>

              {/* Tab Toggle: Services (34) | Projects (16) */}
              <div className="bg-slate-100 dark:bg-zinc-800 p-1 rounded-2xl flex items-center gap-1 border border-slate-200 dark:border-zinc-700">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'services' 
                      ? 'bg-blue-900 text-white shadow-sm' 
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'الخدمات (34)' : 'Services (34)'}
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'projects' 
                      ? 'bg-blue-900 text-white shadow-sm' 
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'المشاريع (16)' : 'Projects (16)'}
                </button>
              </div>
            </div>

            {/* Scrollable List of Operational Project Cards */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-custom">
              {filteredProjects.map((prj) => {
                const isSelected = prj.id === selectedProjectId;
                return (
                  <div
                    key={prj.id}
                    onClick={() => setSelectedProjectId(prj.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
                      isSelected 
                        ? 'bg-blue-900 dark:bg-blue-950 text-white border-blue-600 shadow-xl scale-[1.01]' 
                        : 'bg-white dark:bg-zinc-900/80 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-blue-600'}`} />
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                        }`}>
                          {prj.id}
                        </span>
                        <h4 className={`text-sm font-extrabold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          {prj.title[lang] || prj.title.en}
                        </h4>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800'
                      }`}>
                        {prj.emirate[lang] || prj.emirate.en}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed line-clamp-1 ${
                      isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-zinc-400'
                    }`}>
                      {prj.subtitle[lang] || prj.subtitle.en}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/10 dark:border-zinc-800/60">
                      <span className={`text-[11px] font-extrabold ${
                        isSelected ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {prj.benefit}
                      </span>

                      <div className={`text-[10px] font-bold flex items-center gap-1 ${
                        isSelected ? 'text-white hover:underline' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        <span>{lang === 'ar' ? 'عرض الفحص' : 'Inspect'}</span>
                        <ChevronRight size={12} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Selected Project Summary Dossier Card (Matching Screenshot Bottom Card) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.2rem] p-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-900 text-white rounded-md text-xs font-extrabold">
                    {activeProject.id}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                    {activeProject.emirate[lang] || activeProject.emirate.en}
                  </span>
                </div>

                <div className="text-right rtl:text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {lang === 'ar' ? 'الفائدة السنوية المتوقعة' : 'Annual Benefit'}
                  </div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {activeProject.benefit}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
                {activeProject.title[lang] || activeProject.title.en}
              </h3>

              <button
                onClick={() => setIsDossierModalOpen(true)}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3.5 px-6 rounded-2xl text-xs font-extrabold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
              >
                <span>{lang === 'ar' ? 'فتح الملف التشغيلي الكامل للمشروع' : 'Open Full Operational Project Dossier'}</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Full Operational Project Dossier Detail Modal */}
      <AnimatePresence>
        {isDossierModalOpen && activeProject && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-blue-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {activeProject.id}
                      </span>
                      <span className="text-xs font-bold text-blue-200">
                        {activeProject.emirate[lang] || activeProject.emirate.en}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold mt-0.5">
                      {activeProject.title[lang] || activeProject.title.en}
                    </h3>
                  </div>
                </div>

                <button 
                  onClick={() => setIsDossierModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto scrollbar-custom text-left rtl:text-right">
                
                {/* Category & Annual Benefit Row */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase">
                      {lang === 'ar' ? 'القطاع والمجال' : 'Sector Category'}
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                      {activeProject.category[lang] || activeProject.category.en}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase">
                      {lang === 'ar' ? 'العائد والتأثير السنوي' : 'Annual Economic Impact'}
                    </div>
                    <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      {activeProject.benefit}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-2 tracking-wider">
                    {lang === 'ar' ? 'ملخص النطاق التشغيلي' : 'Operational Scope & Objectives'}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {activeProject.description[lang] || activeProject.description.en}
                  </p>
                </div>

                {/* Technical Specifications Specs Grid */}
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-wider">
                    {lang === 'ar' ? 'المواصفات الفنية والانتشار' : 'Technical Specifications & Deployment'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Mandate</div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 mt-0.5">
                        {activeProject.specs.mandate}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Deployments</div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 mt-0.5">
                        {activeProject.specs.deployments}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Response Rate</div>
                      <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                        {activeProject.specs.responseRate}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Tech Architecture</div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 mt-0.5">
                        {activeProject.specs.techStack}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => alert(lang === 'ar' ? 'جاري تحميل التقرير المعتمد للمشروع' : 'Downloading Official Operational Project Dossier PDF')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-extrabold hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  <Download size={14} />
                  <span>{lang === 'ar' ? 'تحميل التقرير الرسمي PDF' : 'Download Dossier PDF'}</span>
                </button>

                <button
                  onClick={() => setIsDossierModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

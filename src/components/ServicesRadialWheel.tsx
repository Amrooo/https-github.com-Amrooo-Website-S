import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, ParkingCircle, Zap, Search, Landmark, ArrowRight, CheckCircle2, Sparkles,
  ShieldCheck, Activity, Truck, Wrench, Globe, Building2, FileText, Smartphone,
  ShieldAlert, Radio, Cpu, Eye, MapPin, Compass, Layers, ExternalLink, Info,
  Check, ChevronRight
} from 'lucide-react';
import { serviceCategoriesData, ServiceCategory, ServiceItem } from '../data/servicesData';
import { ServicePDFIcon } from './ServicePDFAssets';

interface RadialWheelProps {
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onSelectService: (service: ServiceItem, category: ServiceCategory) => void;
}

export const ServicesRadialWheel: React.FC<RadialWheelProps> = ({ lang, isRtl, onSelectService }) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('smart_tech');
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'infographic' | 'explorer'>('infographic');
  const [partnerFilter, setPartnerFilter] = useState<string>('');

  const selectedCategory = serviceCategoriesData.find(c => c.id === selectedCatId) || serviceCategoriesData[0];
  const serviceCentersCategory = serviceCategoriesData.find(c => c.id === 'service_centers') || serviceCategoriesData[4];

  // 14 Connected Radial Nodes mapped to real services
  const radialNodes = [
    {
      id: 'node_patrol_officer',
      serviceId: 'acc_recon',
      categoryId: 'road_transport',
      sectorColor: '#EF4444', // Red (Patrols & Investigation)
      label: { en: 'Accident Patrol & Field Investigation', ar: 'دورية الحوادث والتحقيق الميداني', ur: 'حادثات کی پیٹرول اور تفتیش', ru: 'Патруль ДТП и расследование' },
      angle: -70,
      radiusPercent: 46,
      iconType: 'acc_recon'
    },
    {
      id: 'node_heavy_truck',
      serviceId: 'heavy_trucks',
      categoryId: 'road_transport',
      sectorColor: '#F97316', // Orange (Heavy Transport & Towing)
      label: { en: 'Heavy Fleet & Commercial Transport', ar: 'إدارة أساطيل النقل الثقيل والشاحنات', ur: 'ہیوی ٹرانسپورٹ فلیٹ', ru: 'Тяжелый и грузовой транспорт' },
      angle: -40,
      radiusPercent: 44,
      iconType: 'heavy_trucks'
    },
    {
      id: 'node_flatbed_towing',
      serviceId: 'vehicle_towing',
      categoryId: 'road_transport',
      sectorColor: '#F97316', // Orange
      label: { en: 'Rapid Hydraulic Vehicle Towing', ar: 'خدمات ونش وسحب المركبات السريع', ur: 'گاڑیوں کو کھینچنے کی سروس', ru: 'Быстрая эвакуация авто' },
      angle: -10,
      radiusPercent: 46,
      iconType: 'vehicle_towing'
    },
    {
      id: 'node_highway_gantry',
      serviceId: 'smart_gates',
      categoryId: 'smart_tech',
      sectorColor: '#10B981', // Green (Smart Highway & Environment)
      label: { en: 'Smart Highway Overhead Gantry', ar: 'بوابات الطرق الذكية الحيوية', ur: 'اسمارٹ ہائی وے گیٹس', ru: 'Умные дорожные арки' },
      angle: 20,
      radiusPercent: 45,
      iconType: 'smart_gates'
    },
    {
      id: 'node_traffic_marshal',
      serviceId: 'events_traffic',
      categoryId: 'road_transport',
      sectorColor: '#EF4444', // Red
      label: { en: 'Traffic Marshals & Crowd Regulation', ar: 'تنظيم حركة السير والمشاة والفعاليات', ur: 'ٹریفک ریگولیشن اور پیادہ رو', ru: 'Регулирование движения и пешеходов' },
      angle: 50,
      radiusPercent: 46,
      iconType: 'events_traffic'
    },
    {
      id: 'node_patrol_matrix',
      serviceId: 'road_patrols',
      categoryId: 'road_transport',
      sectorColor: '#EF4444', // Red
      label: { en: 'Digital Warning Matrix Patrol Units', ar: 'دوريات اللوحات الرقمية التحذيرية', ur: 'ڈیجیٹل الرٹ پیٹرول', ru: 'Патрули с LED-матрицами' },
      angle: 80,
      radiusPercent: 44,
      iconType: 'road_patrols'
    },
    {
      id: 'node_parking_sign',
      serviceId: 'smart_parking',
      categoryId: 'smart_parking',
      sectorColor: '#1E293B', // Navy (Smart Parking)
      label: { en: 'Automated Smart Parking Systems', ar: 'أنظمة المواقف الذكية العامة والخاصة', ur: 'خودکار اسمارٹ پارکنگ', ru: 'Умные парковочные системы' },
      angle: 110,
      radiusPercent: 45,
      iconType: 'smart_parking'
    },
    {
      id: 'node_anpr_car',
      serviceId: 'parking_systems',
      categoryId: 'smart_parking',
      sectorColor: '#1E293B', // Navy
      label: { en: 'Mobile ANPR Sensor Patrol Car', ar: 'مركبات رصد المواقف الذكية وقراءة اللوحات', ur: 'موبائل ANPR پارکنگ کار', ru: 'Мобильный мониторинг парковок' },
      angle: 140,
      radiusPercent: 46,
      iconType: 'parking_systems'
    },
    {
      id: 'node_safe_city_eye',
      serviceId: 'safe_city',
      categoryId: 'smart_tech',
      sectorColor: '#2563EB', // Blue (AI & Smart Cities)
      label: { en: 'Safe City Surveillance AI Matrix', ar: 'منظومة مراقبة المدينة الآمنة والذكاء الاصطناعي', ur: 'سیف سٹی اے آئی کیمرے', ru: 'Безопасный город и AI-видео' },
      angle: 170,
      radiusPercent: 44,
      iconType: 'safe_city'
    },
    {
      id: 'node_skyline_towers',
      serviceId: 'c4i_centers',
      categoryId: 'smart_tech',
      sectorColor: '#2563EB', // Blue
      label: { en: 'Central C4i Integrated Command Hub', ar: 'مركز القيادة والتحكم الموحد C4i', ur: 'مرکزی کمانڈ سینٹر C4i', ru: 'Единый командный центр C4i' },
      angle: 200,
      radiusPercent: 46,
      iconType: 'c4i_centers'
    },
    {
      id: 'node_tvr_radars',
      serviceId: 'tvr_radars',
      categoryId: 'smart_tech',
      sectorColor: '#2563EB', // Blue
      label: { en: 'TVR High-Precision Speed Radars', ar: 'أبراج رادارات السرعة والتقاطعات الذكية', ur: 'تیز رفتار ٹی وی آر ریڈارز', ru: 'Интеллектуальные радары TVR' },
      angle: 230,
      radiusPercent: 44,
      iconType: 'tvr_radars'
    },
    {
      id: 'node_parking_kiosk',
      serviceId: 'impound_mgmt',
      categoryId: 'smart_parking',
      sectorColor: '#1E293B', // Navy
      label: { en: 'Smart Payment & Impound Management', ar: 'محطات الدفع الذكي وإدارة الحجز الرقمي', ur: 'اسمارٹ ادائیگی اور تحویل انتظام', ru: 'Умная оплата и штрафплощадки' },
      angle: 260,
      radiusPercent: 46,
      iconType: 'impound_mgmt'
    },
    {
      id: 'node_interactive_kiosk',
      serviceId: 'saaedi_service',
      categoryId: 'smart_tech',
      sectorColor: '#10B981', // Green
      label: { en: 'Saaedi Citizen Self-Service Kiosks', ar: 'أجهزة الخدمة الذاتية وتطبيق ساعدي', ur: 'شہریوں کے لیے سیلف سروس کیوسک', ru: 'Терминалы самообслуживания' },
      angle: 290,
      radiusPercent: 44,
      iconType: 'saaedi_service'
    },
    {
      id: 'node_evg_platform',
      serviceId: 'delivery_platform',
      categoryId: 'road_transport',
      sectorColor: '#F97316', // Orange
      label: { en: 'Emirates Vehicle Gate (EVG) Fleet Hub', ar: 'بوابة الإمارات للمركبات EVG وتراخيص النقل', ur: 'ای وی جی امارات وہیکل گیٹ', ru: 'Emirates Vehicle Gate (EVG)' },
      angle: 320,
      radiusPercent: 46,
      iconType: 'delivery_platform'
    }
  ];

  // 5 Segments of the Donut Wheel from Document.svg
  const wheelSectors = [
    {
      id: 'safety_env',
      catId: 'inspections',
      color: '#10B981', // Green
      name: { en: 'Safety & Environment', ar: 'السلامة والبيئة المدرسية', ur: 'حفاظت اور ماحول', ru: 'Безопасность и среда' },
      startAngle: 216,
      endAngle: 288
    },
    {
      id: 'road_towing',
      catId: 'road_transport',
      color: '#F97316', // Orange
      name: { en: 'Road Fleet & Towing', ar: 'أسطول الطرق والإنقاذ', ur: 'روڈ فلیٹ اور ٹوونگ', ru: 'Транспорт и эвакуация' },
      startAngle: 288,
      endAngle: 360
    },
    {
      id: 'patrols_recon',
      catId: 'road_transport',
      color: '#EF4444', // Red
      name: { en: 'Accidents & Patrols', ar: 'الحوادث والتحقيق الميداني', ur: 'حادثات اور پیٹرولز', ru: 'ДТП и патрулирование' },
      startAngle: 0,
      endAngle: 72
    },
    {
      id: 'smart_parking',
      catId: 'smart_parking',
      color: '#1E293B', // Dark Navy
      name: { en: 'Smart Parking Mobility', ar: 'أنظمة المواقف الذكية', ur: 'اسمارٹ پارکنگ سسٹمز', ru: 'Умные парковки' },
      startAngle: 72,
      endAngle: 144
    },
    {
      id: 'tech_ai',
      catId: 'smart_tech',
      color: '#2563EB', // Blue
      name: { en: 'Smart Tech & TVR Radars', ar: 'التقنيات ورادارات TVR', ur: 'ٹیکنالوجی اور ریڈارز', ru: 'Технологии и радары' },
      startAngle: 144,
      endAngle: 216
    }
  ];

  const filteredPartners = serviceCentersCategory.items.filter(item => {
    if (!partnerFilter) return true;
    const query = partnerFilter.toLowerCase();
    return (
      item.name.en.toLowerCase().includes(query) ||
      item.name.ar.includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  });

  const selectedPartnerItem = serviceCentersCategory.items.find(item => item.id === selectedPartnerId);

  const handleNodeClick = (node: typeof radialNodes[0]) => {
    setSelectedCatId(node.categoryId);
    const category = serviceCategoriesData.find(c => c.id === node.categoryId) || serviceCategoriesData[0];
    const service = category.items.find(s => s.id === node.serviceId) || category.items[0];
    if (service) {
      onSelectService(service, category);
    }
  };

  const handlePartnerClick = (item: ServiceItem) => {
    setSelectedPartnerId(item.id);
    onSelectService(item, serviceCentersCategory);
  };

  return (
    <div className="w-full bg-white/95 dark:bg-zinc-950/95 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 p-5 md:p-8 shadow-2xl backdrop-blur-xl">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Sparkles size={13} className="animate-pulse text-blue-500" />
              {lang === 'ar' ? 'منظومة ساعد المتكاملة والشركاء' : lang === 'ur' ? 'ساعد اسمارٹ ایکو سسٹم' : lang === 'ru' ? 'Экосистема SAAED' : 'SAAED Ecosystem & Partners Map'}
            </span>
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
              21 {lang === 'ar' ? 'جهة وهيئة حكومية' : 'Government Authorities'} • 14 {lang === 'ar' ? 'خدمة ميدانية وتقنية' : 'Operational Nodes'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            {lang === 'ar' ? 'مخطط الخدمات الذكية والشراكات الاستراتيجية' : lang === 'ur' ? 'اسمارٹ سروسز اور اسٹریٹجک شراکت دار' : lang === 'ru' ? 'Карта государственных услуг и технологий' : 'Integrated Smart Services & Strategic Partnerships'}
          </h3>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('infographic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'infographic'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers size={15} />
            <span>{lang === 'ar' ? 'المخطط البصري الأصلي' : 'Infographic Map'}</span>
          </button>
          <button
            onClick={() => setViewMode('explorer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'explorer'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Search size={15} />
            <span>{lang === 'ar' ? 'مستكشف القطاعات' : 'Sector Explorer'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'infographic' ? (
        /* ============================================================ */
        /* EXACT INFOGRAPHIC LAYOUT (DOCUMENT.SVG 1:1 IMPLEMENTATION)  */
        /* ============================================================ */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* LEFT: 21 Government & Partner Cards Matrix (3 columns x 7 rows) */}
          <div className="xl:col-span-5 flex flex-col bg-zinc-50/80 dark:bg-zinc-900/60 p-4 md:p-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm md:text-base font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Landmark size={17} className="text-blue-600 dark:text-blue-400" />
                  <span>{lang === 'ar' ? 'المراكز والجهات الحكومية الشريكة (21)' : 'Strategic Partner Authorities (21)'}</span>
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {lang === 'ar' ? 'انقر على أي جهة لاستعراض وإنجاز المعاملات الرسمية فوراً' : 'Click any authority to view and request integrated services'}
                </p>
              </div>

              {/* Quick Filter */}
              <div className="relative w-36 sm:w-44">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={partnerFilter}
                  onChange={(e) => setPartnerFilter(e.target.value)}
                  placeholder={lang === 'ar' ? 'بحث سريع...' : 'Filter...'}
                  className="w-full pl-7 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 3-Column x 7-Row Grid of Cards */}
            <div className="grid grid-cols-3 gap-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredPartners.map((item, index) => {
                const isSelected = selectedPartnerId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePartnerClick(item)}
                    className={`p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-zinc-950 border transition-all cursor-pointer flex flex-col items-center text-center relative group shadow-sm hover:shadow-md ${
                      isSelected 
                        ? 'border-blue-600 ring-2 ring-blue-500/40 bg-blue-50/50 dark:bg-blue-950/40' 
                        : 'border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                  >
                    {/* Index Badge */}
                    <span className="absolute top-1 left-1.5 text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-600">
                      #{index + 1}
                    </span>

                    {/* Logo Graphic */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-1 mb-1.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                      <ServicePDFIcon serviceId={item.id} className="w-full h-full object-contain" />
                    </div>

                    {/* Partner Title */}
                    <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name[lang]}
                    </span>
                    <span className="text-[9px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-mono uppercase mt-0.5">
                      {item.name.en}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CENTER & RIGHT: SAAED 5-Color Wheel & 14 Connected Surrounding Nodes */}
          <div className="xl:col-span-7 flex flex-col items-center justify-center relative p-4 sm:p-8 bg-gradient-to-b from-blue-50/30 via-white to-slate-50/30 dark:from-zinc-900/40 dark:via-zinc-950 dark:to-zinc-900/40 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden min-h-[640px]">
            {/* Background High-Tech Grid & Concentric Rings */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-500/15 dark:border-blue-400/10 pointer-events-none" />
            <div className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-blue-500/20 dark:border-blue-400/10 animate-spin-slow pointer-events-none" />

            {/* Central SAAED Wheel Hub Area */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              {/* SVG Connecting Dashed Lines to the 14 Nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="-210 -210 420 420">
                {radialNodes.map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const innerRadius = 90; // outer edge of wheel
                  const outerRadius = 165; // position of surrounding node
                  const x1 = Math.cos(rad) * innerRadius;
                  const y1 = Math.sin(rad) * innerRadius;
                  const x2 = Math.cos(rad) * outerRadius;
                  const y2 = Math.sin(rad) * outerRadius;
                  const isHovered = activeHoverNode === node.id;

                  return (
                    <g key={node.id}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isHovered ? node.sectorColor : '#94A3B8'}
                        strokeWidth={isHovered ? '2.5' : '1.5'}
                        strokeDasharray={isHovered ? 'none' : '4 4'}
                        opacity={isHovered ? 1 : 0.4}
                        className="transition-all duration-300"
                      />
                      <circle cx={x2} cy={y2} r={isHovered ? 4 : 2.5} fill={node.sectorColor} />
                    </g>
                  );
                })}
              </svg>

              {/* 5-Colored Segments Donut Wheel (Document.svg replica) */}
              <svg className="absolute inset-0 w-full h-full z-20" viewBox="-110 -110 220 220">
                {wheelSectors.map((sector, idx) => {
                  // Draw Donut segment arc
                  const rInner = 55;
                  const rOuter = 82;
                  const startRad = (sector.startAngle * Math.PI) / 180;
                  const endRad = (sector.endAngle * Math.PI) / 180;
                  
                  const x1 = Math.cos(startRad) * rOuter;
                  const y1 = Math.sin(startRad) * rOuter;
                  const x2 = Math.cos(endRad) * rOuter;
                  const y2 = Math.sin(endRad) * rOuter;
                  const x3 = Math.cos(endRad) * rInner;
                  const y3 = Math.sin(endRad) * rInner;
                  const x4 = Math.cos(startRad) * rInner;
                  const y4 = Math.sin(startRad) * rInner;
                  
                  const path = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
                  const isSelected = selectedCatId === sector.catId;

                  return (
                    <path
                      key={sector.id}
                      d={path}
                      fill={sector.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      onClick={() => setSelectedCatId(sector.catId)}
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected ? 'filter drop-shadow(0 0 8px rgba(37,99,235,0.6)) opacity-100 scale-105' : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      <title>{sector.name[lang]}</title>
                    </path>
                  );
                })}
              </svg>

              {/* Center Core SAAED Hub (Document.svg Center) */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                className="relative z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white dark:bg-zinc-950 border-4 border-blue-600 shadow-2xl flex flex-col items-center justify-center p-2 text-center cursor-pointer group"
                onClick={() => setSelectedCatId('smart_tech')}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center p-1.5 mb-0.5">
                  <ServicePDFIcon serviceId="saaed_eservices" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs sm:text-sm font-black text-blue-950 dark:text-blue-100 tracking-tight leading-none">
                  {lang === 'ar' ? 'ساعد' : 'SAAED'}
                </span>
                <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                  Smart Hub
                </span>
              </motion.div>

              {/* 14 Orbiting Operational Service Nodes */}
              {radialNodes.map((node) => {
                const angle = node.angle;
                const rad = (angle * Math.PI) / 180;
                const radius = 175; // distance in px from center
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                const isHovered = activeHoverNode === node.id;

                return (
                  <motion.div
                    key={node.id}
                    onMouseEnter={() => setActiveHoverNode(node.id)}
                    onMouseLeave={() => setActiveHoverNode(null)}
                    onClick={() => handleNodeClick(node)}
                    whileHover={{ scale: 1.2, zIndex: 40 }}
                    className={`absolute z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-zinc-900 border-2 transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center p-1.5 group ${
                      isHovered
                        ? 'border-blue-500 shadow-blue-500/40 ring-4 ring-blue-500/20 scale-110'
                        : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <ServicePDFIcon serviceId={node.iconType} className="w-full h-full object-contain" />
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom 5 Sector Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 z-30 max-w-xl">
              {wheelSectors.map((sector) => {
                const isSelected = selectedCatId === sector.catId;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedCatId(sector.catId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                      isSelected
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md scale-105'
                        : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sector.color }} />
                    <span>{sector.name[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* EXPLORER VIEW (DEEP DIVE CATEGORY LIST & SERVICES)          */
        /* ============================================================ */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Category Tabs on Left */}
          <div className="lg:col-span-4 flex flex-col gap-2 bg-zinc-50/80 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              {lang === 'ar' ? 'قطاعات منظومة ساعد' : 'Ecosystem Sectors'}
            </h4>
            {serviceCategoriesData.map((cat) => {
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-3 rounded-2xl text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-950 border-blue-500 shadow-md'
                      : 'bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-zinc-900 dark:text-white">
                        {cat.title[lang]}
                      </h5>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        {cat.items.length} {lang === 'ar' ? 'خدمات معتمدة' : 'Services'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`text-zinc-400 ${isSelected ? 'text-blue-600' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Services Grid on Right */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selectedCategory.color }} />
                <h4 className="font-extrabold text-lg text-zinc-900 dark:text-white">
                  {selectedCategory.title[lang]}
                </h4>
              </div>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {selectedCategory.items.length} {lang === 'ar' ? 'خدمة معتمدة' : 'Verified Services'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
              {selectedCategory.items.map((service, i) => (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service, selectedCategory)}
                  className="group p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center p-1">
                        <ServicePDFIcon serviceId={service.id} className="w-6 h-6 object-contain" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                        #{String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.name[lang]}
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {service.description[lang]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-900">
                    <span>{lang === 'ar' ? 'عرض التفاصيل والطلب' : 'View Details & Request'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


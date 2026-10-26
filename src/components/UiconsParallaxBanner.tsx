import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ServiceCategory, ServiceItem, serviceCategoriesData } from '../data/servicesData';
import { ServicePDFIcon } from './ServicePDFAssets';

interface UiconsParallaxBannerProps {
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onSelectService?: (service: ServiceItem, category: ServiceCategory) => void;
}

interface IconCardItem {
  id: string;
  name: { en: string; ar: string; ur: string; ru: string };
  categoryTitle: { en: string; ar: string; ur: string; ru: string };
  icon: React.ReactNode;
  color: string;
  bgGrad: string;
}

export const UiconsParallaxBanner: React.FC<UiconsParallaxBannerProps> = ({ lang, isRtl, onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Direct hardware-accelerated parallax transforms for normal, silky-smooth scrolling
  // Row 1 drifts smoothly on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', isRtl ? '24%' : '-24%']);
  // Row 2 drifts in opposite direction for depth
  const x2 = useTransform(scrollYProgress, [0, 1], [isRtl ? '24%' : '-24%', '0%']);
  // Row 3 drifts smoothly
  const x3 = useTransform(scrollYProgress, [0, 1], ['-4%', isRtl ? '20%' : '-28%']);

  // Parallax subtle tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 3, 0]);

  // Curated 2D Boxicons array representing SAAED's multi-layered service pillars
  const row1Icons: IconCardItem[] = [
    {
      id: 'acc_recon',
      name: { en: 'Accident Reconstruction', ar: 'تخطيط الحوادث الذكي', ur: 'حادثات کی ری کنسٹرکشن', ru: 'Реконструкция ДТП' },
      categoryTitle: { en: 'Road Safety', ar: 'السلامة المرورية', ur: 'روڈ سیفٹی', ru: 'Безопасность' },
      icon: <i className="bx bx-car text-xl text-blue-600 dark:text-blue-400" />,
      color: '#2563eb',
      bgGrad: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      id: 'vehicle_towing',
      name: { en: 'Emergency Fleet Towing', ar: 'سحب ونقل المركبات', ur: 'گاڑیوں کا انخلا', ru: 'Эвакуация авто' },
      categoryTitle: { en: 'Transport', ar: 'النقل', ur: 'نقل و حمل', ru: 'Транспорт' },
      icon: <i className="bx bx-wrench text-xl text-emerald-600 dark:text-emerald-400" />,
      color: '#059669',
      bgGrad: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      id: 'road_patrols',
      name: { en: 'Smart Traffic Patrols', ar: 'الدوريات المرورية الذكية', ur: 'اسمارٹ پیٹرولنگ', ru: 'Умные патрули' },
      categoryTitle: { en: 'Surveillance', ar: 'المراقبة', ur: 'نگرانی', ru: 'Патрулирование' },
      icon: <i className="bx bx-radar text-xl text-sky-600 dark:text-sky-400" />,
      color: '#0284c7',
      bgGrad: 'from-sky-500/10 to-blue-500/10'
    },
    {
      id: 'c4i_centers',
      name: { en: 'C4i Command & Control', ar: 'مراكز القيادة والتحكم C4i', ur: 'کمانڈ اینڈ کنٹرول', ru: 'Командный центр C4i' },
      categoryTitle: { en: 'Smart Tech', ar: 'التقنيات الذكية', ur: 'اسمارٹ ٹیکنالوجی', ru: 'Технологии' },
      icon: <i className="bx bx-broadcast text-xl text-purple-600 dark:text-purple-400" />,
      color: '#7c3aed',
      bgGrad: 'from-purple-500/10 to-indigo-500/10'
    },
    {
      id: 'safe_city',
      name: { en: 'Safe City Platform', ar: 'منصة المدينة الآمنة', ur: 'محفوظ شہر کا پلیٹ فارم', ru: 'Безопасный город' },
      categoryTitle: { en: 'Smart Tech', ar: 'التقنيات الذكية', ur: 'اسمارٹ ٹیکنالوجی', ru: 'Технологиي' },
      icon: <i className="bx bx-globe text-xl text-teal-600 dark:text-teal-400" />,
      color: '#0d9488',
      bgGrad: 'from-teal-500/10 to-emerald-500/10'
    },
    {
      id: 'school_zones',
      name: { en: 'School Zone Security', ar: 'تأمين النطاقات المدرسية', ur: 'اسکول زون سیکیورٹی', ru: 'Безопасность школ' },
      categoryTitle: { en: 'Road Safety', ar: 'السلامة المرورية', ur: 'روڈ سیفٹی', ru: 'Безопасность' },
      icon: <i className="bx bx-shield-quarter text-xl text-blue-600 dark:text-blue-400" />,
      color: '#2563eb',
      bgGrad: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'heavy_trucks',
      name: { en: 'Heavy Truck Tracking', ar: 'تتبع وإدارة الشاحنات الثقيلة', ur: 'ہیوی ٹرک مانیٹرنگ', ru: 'Контроль грузовиков' },
      categoryTitle: { en: 'Transport', ar: 'النقل', ur: 'نقل و حمل', ru: 'Транспорт' },
      icon: <i className="bx bx-traffic-cone text-xl text-amber-600 dark:text-amber-400" />,
      color: '#d97706',
      bgGrad: 'from-amber-500/10 to-orange-500/10'
    }
  ];

  const row2Icons: IconCardItem[] = [
    {
      id: 'smart_parking',
      name: { en: 'Mawaqif Smart Parking', ar: 'إدارة المواقف الذكية (مواقف)', ur: 'اسمارٹ پارکنگ مینجمنٹ', ru: 'Умные парковки Mawaqif' },
      categoryTitle: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковка' },
      icon: <i className="bx bx-parking text-xl text-amber-600 dark:text-amber-400" />,
      color: '#d97706',
      bgGrad: 'from-amber-500/10 to-yellow-500/10'
    },
    {
      id: 'ev_charging_mgmt',
      name: { en: 'EV Charging Network', ar: 'شبكة شحن المركبات الكهربائية', ur: 'ای وی چارجنگ نیٹ ورک', ru: 'Сеть электрозарядок' },
      categoryTitle: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковка' },
      icon: <i className="bx bxs-zap text-xl text-emerald-600 dark:text-emerald-400" />,
      color: '#059669',
      bgGrad: 'from-emerald-500/10 to-cyan-500/10'
    },
    {
      id: 'parking_surveillance',
      name: { en: 'AI Parking Surveillance', ar: 'المراقبة الذكية والرصد الفوري', ur: 'AI پارکنگ نگرانی', ru: 'ИИ-мониторинг парковок' },
      categoryTitle: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковка' },
      icon: <i className="bx bx-cctv text-xl text-indigo-600 dark:text-indigo-400" />,
      color: '#4f46e5',
      bgGrad: 'from-indigo-500/10 to-purple-500/10'
    },
    {
      id: 'parking_app',
      name: { en: 'Digital Parking Portal', ar: 'بوابة المواقف الذكية الموحدة', ur: 'ڈیجیٹل پارکنگ پورٹل', ru: 'Цифровой портал парковки' },
      categoryTitle: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковка' },
      icon: <i className="bx bx-credit-card text-xl text-blue-600 dark:text-blue-400" />,
      color: '#2563eb',
      bgGrad: 'from-blue-500/10 to-sky-500/10'
    },
    {
      id: 'smart_gates',
      name: { en: 'Automated ANPR Gates', ar: 'البوابات الذكية وقراءة اللوحات', ur: 'خودکار اسمارٹ گیٹس', ru: 'Умные шлагбаумы ANPR' },
      categoryTitle: { en: 'Smart Tech', ar: 'التقنيات الذكية', ur: 'اسمارٹ ٹیکنالوجی', ru: 'Технологии' },
      icon: <i className="bx bx-door-open text-xl text-teal-600 dark:text-teal-400" />,
      color: '#0d9488',
      bgGrad: 'from-teal-500/10 to-blue-500/10'
    },
    {
      id: 'tvr_radars',
      name: { en: 'TVR Advanced Radars', ar: 'رادارات TVR الذكية', ur: 'TVR جدید ریڈار سسٹم', ru: 'Радары TVR' },
      categoryTitle: { en: 'Smart Tech', ar: 'التقنيات الذكية', ur: 'اسمارٹ ٹیکنالوجی', ru: 'Технологии' },
      icon: <i className="bx bx-scan text-xl text-purple-600 dark:text-purple-400" />,
      color: '#7c3aed',
      bgGrad: 'from-purple-500/10 to-pink-500/10'
    },
    {
      id: 'smart_impound',
      name: { en: 'Home Smart Impound', ar: 'الحجز الذكي المنزلي', ur: 'گھریلو اسمارٹ ضبطگی', ru: 'Домашний умный арест' },
      categoryTitle: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковка' },
      icon: <i className="bx bx-lock-alt text-xl text-red-600 dark:text-red-400" />,
      color: '#dc2626',
      bgGrad: 'from-red-500/10 to-rose-500/10'
    }
  ];

  const row3Icons: IconCardItem[] = [
    {
      id: 'icp_emirates_id',
      name: { en: 'ICP Emirates ID Services', ar: 'خدمات الهوية الوطنية والجنسية', ur: 'اماراتی شناختی کارڈ کی خدمات', ru: 'Услуги удостоверения личности ICP' },
      categoryTitle: { en: 'Government Centers', ar: 'المراكز الحكومية', ur: 'سرکاری مراکز', ru: 'Госуслуги' },
      icon: <i className="bx bx-id-card text-xl text-emerald-600 dark:text-emerald-400" />,
      color: '#059669',
      bgGrad: 'from-emerald-500/10 to-green-500/10'
    },
    {
      id: 'uae_pass',
      name: { en: 'UAE PASS Digital Identity', ar: 'الهوية الرقمية الموحدة UAE PASS', ur: 'متحدہ عرب امارات ڈیجیٹل پاس', ru: 'Цифровой идентификатор UAE PASS' },
      categoryTitle: { en: 'Government Centers', ar: 'المراكز الحكومية', ur: 'سرکاری مراکز', ru: 'Госуслуги' },
      icon: <i className="bx bx-shield text-xl text-blue-600 dark:text-blue-400" />,
      color: '#2563eb',
      bgGrad: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      id: 'amer_gdrfa',
      name: { en: 'Amer Residency & Visa', ar: 'خدمات الإقامة وشؤون الأجانب (آمر)', ur: 'عامر رہائش اور ویزا خدمات', ru: 'Визовые центры Amer' },
      categoryTitle: { en: 'Government Centers', ar: 'المراكز الحكومية', ur: 'سرکاری مراکز', ru: 'Госуслуги' },
      icon: <i className="bx bx-buildings text-xl text-indigo-600 dark:text-indigo-400" />,
      color: '#4f46e5',
      bgGrad: 'from-indigo-500/10 to-purple-500/10'
    },
    {
      id: 'safety_audits',
      name: { en: 'Road Safety Audits', ar: 'تدقيق السلامة والامتثال الهندسي', ur: 'روڈ سیفٹی آڈٹ', ru: 'Аудит безопасности дорог' },
      categoryTitle: { en: 'Inspections', ar: 'خدمات التفتيش', ur: 'معائنہ', ru: 'Инспекции' },
      icon: <i className="bx bx-check-shield text-xl text-purple-600 dark:text-purple-400" />,
      color: '#7c3aed',
      bgGrad: 'from-purple-500/10 to-blue-500/10'
    },
    {
      id: 'traffic_diversions',
      name: { en: 'Highway Diversion Audits', ar: 'اعتماد وتدقيق التحويلات المرورية', ur: 'ہائی وے ڈائیورژن آڈٹ', ru: 'Аудит дорожных объездов' },
      categoryTitle: { en: 'Inspections', ar: 'خدمات التفتيش', ur: 'معائنہ', ru: 'Инспекции' },
      icon: <i className="bx bx-git-branch text-xl text-orange-600 dark:text-orange-400" />,
      color: '#ea580c',
      bgGrad: 'from-orange-500/10 to-amber-500/10'
    },
    {
      id: 'driver_awareness',
      name: { en: 'Traffic Safety Awareness', ar: 'برامج التوعية المرورية والتدريب', ur: 'ٹریفک آگاہی پروگرام', ru: 'Программы безопасности вождения' },
      categoryTitle: { en: 'Inspections', ar: 'خدمات التفتيش', ur: 'معائنہ', ru: 'Инспекции' },
      icon: <i className="bx bx-award text-xl text-pink-600 dark:text-pink-400" />,
      color: '#db2777',
      bgGrad: 'from-pink-500/10 to-rose-500/10'
    },
    {
      id: 'incident_clearing',
      name: { en: 'Rapid Incident Clearing', ar: 'المسح السريع للحوادث الجسيمة', ur: 'فوری حادثات کلیئرنس', ru: 'Быстрая ликвидация ДТП' },
      categoryTitle: { en: 'Inspections', ar: 'خدمات التفتيش', ur: 'معائنہ', ru: 'Инспекции' },
      icon: <i className="bx bx-error-circle text-xl text-red-600 dark:text-red-400" />,
      color: '#dc2626',
      bgGrad: 'from-red-500/10 to-amber-500/10'
    }
  ];

  // Render an individual UIcons-style icon card
  const renderCard = (item: IconCardItem, keyPrefix: string) => {
    const isSpecialPdfIcon = item.id === 'acc_recon' || item.id === 'heavy_trucks' || item.id === 'vehicle_towing' || item.id === 'road_patrols';

    const handleClick = () => {
      if (!onSelectService) return;
      for (const cat of serviceCategoriesData) {
        const found = cat.items.find(i => i.id === item.id);
        if (found) {
          onSelectService(found, cat);
          return;
        }
      }
    };

    return (
      <motion.div
        key={`${keyPrefix}-${item.id}`}
        whileHover={{ 
          scale: 1.08, 
          y: -6,
          transition: { type: 'spring', stiffness: 400, damping: 17 } 
        }}
        onClick={handleClick}
        className="shrink-0 group cursor-pointer"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-md group-hover:shadow-xl group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60 transition-all duration-300">
          
          {/* Crisp Icon Container with subtle gradient glow */}
          <div 
            className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.bgGrad} border border-zinc-200/60 dark:border-zinc-700/60 group-hover:scale-110 transition-transform shadow-inner shrink-0 p-1`}
          >
            {isSpecialPdfIcon ? (
              <ServicePDFIcon serviceId={item.id} className="w-9 h-9 object-contain" />
            ) : (
              item.icon
            )}
          </div>

          {/* Text Details */}
          <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'} min-w-[130px] max-w-[180px]`}>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {item.categoryTitle[lang]}
            </span>
            <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-1">
              {item.name[lang]}
            </span>
          </div>

          {/* Mini Status Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all shrink-0" />
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-6 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Soft Vignette & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-blue-50/20 dark:via-blue-950/10 to-transparent" />
      
      {/* Dynamic Left/Right Fade Masks for Seamless Edge Blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8f9fa] dark:from-[#111317] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8f9fa] dark:from-[#111317] to-transparent z-10 pointer-events-none" />

      {/* 3D Tilted Parallax Stage */}
      <motion.div 
        style={{ rotateX }}
        className="flex flex-col gap-4 sm:gap-5 transform-gpu"
      >
        {/* Track 1 (Drifts Left on Scroll) */}
        <motion.div 
          style={{ x: x1 }} 
          className="flex items-center gap-4 sm:gap-5 w-max"
        >
          {row1Icons.map(item => renderCard(item, 'r1-a'))}
          {row1Icons.map(item => renderCard(item, 'r1-b'))}
          {row1Icons.map(item => renderCard(item, 'r1-c'))}
        </motion.div>

        {/* Track 2 (Drifts Right on Scroll - Counter Kinetic Direction) */}
        <motion.div 
          style={{ x: x2 }} 
          className="flex items-center gap-4 sm:gap-5 w-max"
        >
          {row2Icons.map(item => renderCard(item, 'r2-a'))}
          {row2Icons.map(item => renderCard(item, 'r2-b'))}
          {row2Icons.map(item => renderCard(item, 'r2-c'))}
        </motion.div>

        {/* Track 3 (Drifts Left on Scroll) */}
        <motion.div 
          style={{ x: x3 }} 
          className="flex items-center gap-4 sm:gap-5 w-max"
        >
          {row3Icons.map(item => renderCard(item, 'r3-a'))}
          {row3Icons.map(item => renderCard(item, 'r3-b'))}
          {row3Icons.map(item => renderCard(item, 'r3-c'))}
        </motion.div>
      </motion.div>

    </div>
  );
};

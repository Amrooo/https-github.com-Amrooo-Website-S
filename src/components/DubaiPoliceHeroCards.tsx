import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, ArrowRight, ArrowLeft, Zap, Shield, PhoneCall, ExternalLink, 
  Clock, Search, AlertTriangle, FileText, CheckCircle2, Car, CreditCard, 
  LifeBuoy, Sparkles, Navigation, Send, ChevronRight, Eye, Smartphone, Home
} from 'lucide-react';
import { getServiceRedirectionUrl } from '../lib/servicesRedirect';

export interface HeroServiceCardItem {
  id: 'report' | 'certificate' | 'pay' | 'support' | 'explore';
  title: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  description: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  svgType: 'report' | 'certificate' | 'pay' | 'support' | 'explore';
  badge: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  timeEstimate: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  theme: {
    bg: string;
    border: string;
    hoverBorder: string;
    textAccent: string;
    iconStroke: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    buttonBg: string;
    buttonBorder: string;
    buttonText: string;
    buttonHoverBg: string;
    glowBg: string;
  };
}

// 5 Cards exactly as in Dubai Police Home screenshot with distinctive colors & themes
export const HERO_SERVICE_CARDS: HeroServiceCardItem[] = [
  {
    id: 'report',
    title: {
      en: 'Make a Report',
      ar: 'تقديم بلاغ',
      ur: 'رپورٹ درج کریں',
      ru: 'Подать заявление'
    },
    description: {
      en: 'Report and submit your complaint directly',
      ar: 'الإبلاغ عن الحوادث والشكاوى ومتابعتها مباشرة',
      ur: 'اپنی شکایت براہ راست جمع اور ٹریک کریں',
      ru: 'Оформление ДТП и подача обращений онлайн'
    },
    svgType: 'report',
    badge: {
      en: 'Instant 24/7',
      ar: 'فوري 24/7',
      ur: 'فوری 24/7',
      ru: 'Мгновенно 24/7'
    },
    timeEstimate: {
      en: '3 Mins',
      ar: '3 دقائق',
      ur: '3 منٹ',
      ru: '3 мин'
    },
    theme: {
      bg: 'bg-gradient-to-b from-blue-500/[0.08] via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950',
      border: 'border-blue-600/25 dark:border-zinc-800',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400 group-hover:brightness-125',
      textAccent: 'text-blue-800 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-300',
      iconStroke: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 group-hover:bg-blue-500/30',
      badgeBg: 'bg-blue-50 dark:bg-zinc-900',
      badgeText: 'text-blue-800 dark:text-blue-300',
      badgeBorder: 'border-blue-200 dark:border-zinc-800',
      buttonBg: 'bg-blue-600/10 dark:bg-blue-500/20',
      buttonBorder: 'border-blue-600/30 dark:border-zinc-800',
      buttonText: 'text-blue-800 dark:text-blue-300',
      buttonHoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      glowBg: 'bg-blue-500/30'
    }
  },
  {
    id: 'certificate',
    title: {
      en: 'Apply for a Certificate or Permit',
      ar: 'طلب شهادة أو تصريح',
      ur: 'سرٹیفکیٹ یا پرمٹ کی درخواست',
      ru: 'Заказ справки или разрешения'
    },
    description: {
      en: 'Access official Documents from Dubai Police quickly and...',
      ar: 'إصدار وتصديق الوثائق والشهادات والتصاريح الرسمية فوراً',
      ur: 'سرکاری دستاویزات اور پرمٹ فوری حاصل کریں',
      ru: 'Официальные справки и разрешения с QR-кодом'
    },
    svgType: 'certificate',
    badge: {
      en: 'Official Attestation',
      ar: 'اعتماد رسمي',
      ur: 'سرکاری تصدیق',
      ru: 'МВД ОАЭ'
    },
    timeEstimate: {
      en: '5 Mins',
      ar: '5 دقائق',
      ur: '5 منٹ',
      ru: '5 мин'
    },
    theme: {
      bg: 'bg-gradient-to-b from-blue-500/[0.08] via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950',
      border: 'border-blue-600/25 dark:border-zinc-800',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400 group-hover:brightness-125',
      textAccent: 'text-blue-800 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-300',
      iconStroke: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 group-hover:bg-blue-500/30',
      badgeBg: 'bg-blue-50 dark:bg-zinc-900',
      badgeText: 'text-blue-800 dark:text-blue-300',
      badgeBorder: 'border-blue-200 dark:border-zinc-800',
      buttonBg: 'bg-blue-600/10 dark:bg-blue-500/20',
      buttonBorder: 'border-blue-600/30 dark:border-zinc-800',
      buttonText: 'text-blue-800 dark:text-blue-300',
      buttonHoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      glowBg: 'bg-blue-500/30'
    }
  },
  {
    id: 'pay',
    title: {
      en: 'Inquire & Pay',
      ar: 'استعلام وسداد',
      ur: 'معلوم کریں اور ادا کریں',
      ru: 'Проверка и оплата'
    },
    description: {
      en: 'Stay updated and settle your payments instantly',
      ar: 'استعلم عن المخالفات وسدد مستحقاتك فوراً بكل سهولة',
      ur: 'اپنے جرمانے اور ادائیگیاں فوری ادا کریں',
      ru: 'Проверка штрафов и моментальная оплата'
    },
    svgType: 'pay',
    badge: {
      en: 'Zero Fees',
      ar: 'بدون رسوم إضافية',
      ur: 'صفر فیس',
      ru: '0% комиссии'
    },
    timeEstimate: {
      en: '1 Min',
      ar: 'دقيقة واحدة',
      ur: '1 منٹ',
      ru: '1 мин'
    },
    theme: {
      bg: 'bg-gradient-to-b from-blue-500/[0.08] via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950',
      border: 'border-blue-600/25 dark:border-zinc-800',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400 group-hover:brightness-125',
      textAccent: 'text-blue-800 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-300',
      iconStroke: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 group-hover:bg-blue-500/30',
      badgeBg: 'bg-blue-50 dark:bg-zinc-900',
      badgeText: 'text-blue-800 dark:text-blue-300',
      badgeBorder: 'border-blue-200 dark:border-zinc-800',
      buttonBg: 'bg-blue-600/10 dark:bg-blue-500/20',
      buttonBorder: 'border-blue-600/30 dark:border-zinc-800',
      buttonText: 'text-blue-800 dark:text-blue-300',
      buttonHoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      glowBg: 'bg-blue-500/30'
    }
  },
  {
    id: 'support',
    title: {
      en: 'Request Support',
      ar: 'طلب الدعم والمساعدة',
      ur: 'مدد کی درخواست کریں',
      ru: 'Запрос поддержки'
    },
    description: {
      en: 'Request support on-site, digitally, in seamless steps',
      ar: 'طلب المساعدة الميدانية ودوريات الدعم على الطريق بخطوات بسيطة',
      ur: 'آن سائٹ گشت اور سڑک پر مدد کی درخواست کریں',
      ru: 'Вызов патруля и помощь на дороге 24/7'
    },
    svgType: 'support',
    badge: {
      en: 'Rapid Dispatch',
      ar: 'استجابة سريعة',
      ur: 'فوری روانگی',
      ru: 'Выезд < 8 мин'
    },
    timeEstimate: {
      en: '< 8 Mins',
      ar: '< 8 دقائق',
      ur: '< 8 منٹ',
      ru: '< 8 мин'
    },
    theme: {
      bg: 'bg-gradient-to-b from-blue-500/[0.08] via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950',
      border: 'border-blue-600/25 dark:border-zinc-800',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400 group-hover:brightness-125',
      textAccent: 'text-blue-800 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-300',
      iconStroke: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 group-hover:bg-blue-500/30',
      badgeBg: 'bg-blue-50 dark:bg-zinc-900',
      badgeText: 'text-blue-800 dark:text-blue-300',
      badgeBorder: 'border-blue-200 dark:border-zinc-800',
      buttonBg: 'bg-blue-600/10 dark:bg-blue-500/20',
      buttonBorder: 'border-blue-600/30 dark:border-zinc-800',
      buttonText: 'text-blue-800 dark:text-blue-300',
      buttonHoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      glowBg: 'bg-blue-500/30'
    }
  },
  {
    id: 'explore',
    title: {
      en: 'Explore More Services',
      ar: 'استكشاف المزيد',
      ur: 'مزید خدمات دریافت کریں',
      ru: 'Все доступные услуги'
    },
    description: {
      en: 'Browse and discover more available police services',
      ar: 'تصفح واستكشف المحفظة الكاملة لأكثر من 70 خدمة ذكية معتمدة',
      ur: 'دستیاب پولیس اور ساعد کی تمام خدمات دریافت کریں',
      ru: 'Полный каталог из более 70 госуслуг'
    },
    svgType: 'explore',
    badge: {
      en: '70+ Services',
      ar: '+70 خدمة ذكية',
      ur: '+70 خدمات',
      ru: '70+ услуг'
    },
    timeEstimate: {
      en: 'Full Hub',
      ar: 'بوابة شاملة',
      ur: 'مکمل پورٹل',
      ru: 'Каталог'
    },
    theme: {
      bg: 'bg-gradient-to-b from-red-500/[0.08] via-white to-red-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950',
      border: 'border-red-600/25 dark:border-zinc-800',
      hoverBorder: 'hover:border-red-500 dark:hover:border-red-400 group-hover:brightness-125',
      textAccent: 'text-red-800 dark:text-red-300 group-hover:text-red-600 dark:group-hover:text-red-300',
      iconStroke: 'text-red-700 dark:text-red-400',
      iconBg: 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 group-hover:bg-red-500/30',
      badgeBg: 'bg-red-50 dark:bg-zinc-900',
      badgeText: 'text-red-800 dark:text-red-300',
      badgeBorder: 'border-red-200 dark:border-zinc-800',
      buttonBg: 'bg-red-600/10 dark:bg-red-500/20',
      buttonBorder: 'border-red-600/30 dark:border-zinc-800',
      buttonText: 'text-red-800 dark:text-red-300',
      buttonHoverBg: 'group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
      glowBg: 'bg-red-500/30'
    }
  }
];

// Clean line-art icons that match the exact icons in the Dubai Police photo
const DubaiPoliceLineIcon: React.FC<{ type: HeroServiceCardItem['svgType']; className?: string }> = ({ type, className = "w-12 h-12" }) => {
  switch (type) {
    case 'report':
      // Speech bubble with exclamation mark
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor">
          <path 
            d="M8 12C8 9.79086 9.79086 8 12 8H36C38.2091 8 40 9.79086 40 12V28C40 30.2091 38.2091 32 36 32H20L12 39V32H12C9.79086 32 8 30.2091 8 28V12Z" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path d="M24 15V22" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="26" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'certificate':
      // Certificate document with ribbon / seal
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor">
          <rect x="10" y="8" width="28" height="34" rx="4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 16H32" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16 22H28" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="30" r="5" strokeWidth="2.2" />
          <path d="M21 33.5L19 39L24 37L29 39L27 33.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'pay':
      // Credit card with magnifying glass
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor">
          <rect x="7" y="12" width="34" height="22" rx="4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 18H41" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M13 26H21" strokeWidth="2.2" strokeLinecap="round" />
          {/* Magnifying glass overlay at bottom right */}
          <circle cx="33" cy="29" r="5.5" fill="currentColor" fillOpacity="0.08" strokeWidth="2.2" />
          <path d="M37 33L42 38" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'support':
      // Lifebuoy / rescue support ring
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor">
          <circle cx="24" cy="24" r="16" strokeWidth="2.2" />
          <circle cx="24" cy="24" r="7.5" strokeWidth="2.2" />
          <path d="M18.7 18.7L12.5 12.5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M29.3 18.7L35.5 12.5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18.7 29.3L12.5 35.5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M29.3 29.3L35.5 35.5" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'explore':
      // 4 rounded square tiles / grid
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor">
          <rect x="10" y="10" width="11" height="11" rx="3" strokeWidth="2.2" />
          <rect x="27" y="10" width="11" height="11" rx="3" strokeWidth="2.2" />
          <rect x="10" y="27" width="11" height="11" rx="3" strokeWidth="2.2" />
          <rect x="27" y="27" width="11" height="11" rx="3" strokeWidth="2.2" />
        </svg>
      );
  }
};

interface DubaiPoliceHeroCardsProps {
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onOpenReportModal?: () => void;
  onOpenTrackModal?: () => void;
  onOpenExploreHub?: () => void;
  onSelectSpecificService?: (serviceId: string) => void;
}

export const DubaiPoliceHeroCards: React.FC<DubaiPoliceHeroCardsProps> = ({
  lang,
  isRtl,
  onOpenReportModal,
  onOpenTrackModal,
  onOpenExploreHub,
  onSelectSpecificService
}) => {
  const [selectedPopup, setSelectedPopup] = useState<HeroServiceCardItem | null>(null);
  
  // Interactive Simulator States
  const [inquiryInput, setInquiryInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const handleCardClick = (card: HeroServiceCardItem) => {
    setSelectedPopup(card);
    setInquiryInput('');
    setIsSimulating(false);
    setSimulationResult(null);
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryInput.trim()) return;
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult(
        lang === 'ar'
          ? `تم الاستعلام بنجاح للمركبة (${inquiryInput}). لا توجد مخالفات غير مسددة، ورقم المعاملة: DP-${Math.floor(100000 + Math.random() * 900000)}.`
          : `Verified record for (${inquiryInput}). Status: Clean Record, No pending penalties. Ref: DP-${Math.floor(100000 + Math.random() * 900000)}.`
      );
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* 5 Cards Row matching Dubai Police website with 3D perspective */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5" 
        style={{ perspective: 1200 }}
      >
        {HERO_SERVICE_CARDS.map((card, idx) => {
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ 
                y: -14, 
                scale: 1.045,
                rotateX: 7,
                rotateY: idx % 2 === 0 ? -9 : 9,
                rotateZ: idx % 2 === 0 ? -1.8 : 1.8,
                transition: { type: "spring", stiffness: 380, damping: 20 }
              }}
              whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0, rotateZ: 0 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => handleCardClick(card)}
              className={`group relative ${card.theme.bg} rounded-[22px] p-6 sm:p-7 border ${card.theme.border} ${card.theme.hoverBorder} shadow-lg shadow-black/5 dark:shadow-black/35 hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/70 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between min-h-[235px] overflow-hidden hover:!bg-white hover:![background-image:none] dark:hover:!bg-zinc-900`}
            >
              {/* Dynamic 3D Screw Shimmer Light Sweep */}
              <div 
                className="absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent pointer-events-none rounded-[22px]" 
              />

              {/* Ambient radial highlight */}
              <div className={`absolute -top-10 -right-10 w-28 h-28 ${card.theme.glowBg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              {/* Card Icon with 3D Pop-out */}
              <div className="pt-1" style={{ transform: 'translateZ(30px)' }}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${card.theme.iconBg} ${card.theme.iconStroke} group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-sm border border-black/5 dark:border-white/10`}>
                  <DubaiPoliceLineIcon type={card.svgType} className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.8]" />
                </div>
              </div>

              {/* Card Title & Description with 3D Depth */}
              <div className="my-auto py-2" style={{ transform: 'translateZ(20px)' }}>
                <h3 className={`text-base sm:text-[17px] font-extrabold text-zinc-900 dark:text-white ${card.theme.textAccent} transition-colors tracking-tight leading-snug line-clamp-2`}>
                  {card.title[lang] || card.title.en}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-white mt-2 leading-relaxed line-clamp-2 font-normal">
                  {card.description[lang] || card.description.en}
                </p>
              </div>

              {/* Bottom Open Service Button: Direct Redirection Link */}
              <div className="w-full pt-2 flex items-center justify-center" style={{ transform: 'translateZ(26px)' }}>
                <a
                  href={getServiceRedirectionUrl(card.id, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`text-[11px] font-bold ${card.theme.buttonText} ${card.theme.buttonBg} ${card.theme.buttonHoverBg} transition-all duration-300 px-3.5 py-1.5 rounded-md border ${card.theme.buttonBorder} flex items-center gap-1.5 shadow-sm group-hover:shadow-md cursor-pointer`}
                >
                  <span>{lang === 'ar' ? 'فتح الخدمة' : 'Open Service'}</span>
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Popup Modal for Clicked Card */}
      <AnimatePresence>
        {selectedPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPopup(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[28px] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Header with Dubai Police Dark Emerald Theme */}
              <div className="bg-gradient-to-r from-[#00573D] via-[#064e3b] to-[#043327] p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <button
                  onClick={() => setSelectedPopup(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/20">
                    Dubai Police & SAAED Smart Gateway
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-400 text-emerald-950">
                    {selectedPopup.badge[lang] || selectedPopup.badge.en}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner">
                    <DubaiPoliceLineIcon type={selectedPopup.svgType} className="w-10 h-10 stroke-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {selectedPopup.title[lang] || selectedPopup.title.en}
                    </h3>
                    <p className="text-sm text-emerald-100/90 mt-1">
                      {selectedPopup.description[lang] || selectedPopup.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Official SAAED Redirection Banner */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-blue-950 dark:text-blue-200">
                      {lang === 'ar' ? 'الخدمة الرسمية متوفرة عبر البوابة الرقمية' : 'Official service available via SAAED portal'}
                    </span>
                  </div>
                  <a
                    href={getServiceRedirectionUrl(selectedPopup.id, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'فتح البوابة الرسمية' : 'Open Official Portal'}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Specific Actions based on Selected Card */}
                {selectedPopup.id === 'report' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'اختر نوع البلاغ المطلوب' : 'Select Report Category'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onOpenReportModal) onOpenReportModal();
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
                          <Car size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'تقرير حادث مروري بسيط' : 'Minor Traffic Collision'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'إصدار تقرير الشرطة في 3 دقائق للتأمين' : 'Issue official insurance report in 3 mins'}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('police_eye');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                          <Eye size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'عين الشرطة (إبلاغ سري)' : 'Police Eye (Confidential)'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'إبلاغ سري عن السلوكيات المريبة ومخالفات الطرق' : 'Confidential tips on suspicious activity'}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('road_hazard');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'الإبلاغ عن عائق مروري' : 'Road Hazard & Debris'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'تحريك فوري لدوريات ساعد لإزالة العوائق' : 'Rapid dispatch of SAAED recovery patrol'}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onOpenTrackModal) onOpenTrackModal();
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                          <Navigation size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'متابعة بلاغ سابق' : 'Track Existing Report'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'التحقق برقم البلاغ والاطلاع على التقرير' : 'Check status by reference code'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPopup.id === 'certificate' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'الشهادات والتصاريح الأكثر طلباً' : 'Featured Certificates & Permits'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('police_clearance');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'شهادة بحث الحالة الجنائية' : 'Police Clearance (Good Conduct)'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'إصدار رقمي فوري لغايات التوظيف والإقامة' : 'Digital certificate for visa and employment'}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('lost_certificate');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                          <Search size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'شهادة فقدان مقتنيات وثائق' : 'Lost Item Certificate'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'إثبات فقدان جواز سفر أو هوية أو لوحة مركبة' : 'Attestation for lost passport or ID'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPopup.id === 'pay' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'استعلام ودفع المخالفات المرورية' : 'Inquire & Settle Traffic Violations'}
                    </h4>

                    {simulationResult ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-3">
                        <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                        <div>
                          <div className="font-bold text-sm">{lang === 'ar' ? 'تم التحقق بنجاح' : 'Inquiry Completed'}</div>
                          <div>{simulationResult}</div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSimulateSubmit} className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          {lang === 'ar' ? 'رقم اللوحة المرورية أو الرمز المروري (T.C.)' : 'Plate Number, Traffic Code, or License'}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={inquiryInput}
                            onChange={(e) => setInquiryInput(e.target.value)}
                            placeholder="e.g. Dubai - Plate B 54321"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button
                            type="submit"
                            disabled={isSimulating}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isSimulating ? (
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Zap size={14} />
                            )}
                            <span>{lang === 'ar' ? 'استعلم الآن' : 'Inquire Now'}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {selectedPopup.id === 'support' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {lang === 'ar' ? 'خدمات الدعم الميداني والمساعدة' : 'Roadside & Patrol Support'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('home_security');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 shrink-0">
                          <Home size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'خدمة أمن المساكن' : 'Home Security Patrols'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'دوريات تفقد للمنازل والفلل أثناء السفر مجاناً' : 'Free police patrol guard while traveling'}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPopup(null);
                          if (onSelectSpecificService) onSelectSpecificService('smart_impound');
                        }}
                        className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {lang === 'ar' ? 'حجز المركبات الذكي بالمنزل' : 'Smart Home Impoundment'}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {lang === 'ar' ? 'حجز مركبتك في كراج منزلك بجهاز تتبع ذكي' : 'Keep impounded car at home via GPS tracker'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPopup.id === 'explore' && (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {lang === 'ar' 
                        ? 'تضم منصة ساعد وشرطة دبي الرقمية أكثر من 70 خدمة متقدمة تغطي المرور، الإنقاذ، إعادة تخطيط الحوادث، وإدارة حركة الأساطيل والتوصيل.' 
                        : 'Explore over 70 digital services spanning Road Safety, Towing, Forensic Reconstruction, EV Patrols, and Regulatory Platforms.'}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedPopup(null);
                        if (onOpenExploreHub) onOpenExploreHub();
                      }}
                      className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={18} />
                      <span>{lang === 'ar' ? 'فتح المحفظة الشاملة للخدمات' : 'Open Full Services Portfolio Hub'}</span>
                    </button>
                  </div>
                )}

                {/* Official Hotlines Contact */}
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <PhoneCall size={14} className="text-emerald-600" />
                    <span>{lang === 'ar' ? 'مركز اتصال شرطة دبي: 901' : 'Dubai Police Call Center: 901'}</span>
                  </div>
                  <div>
                    <span>{lang === 'ar' ? 'دوريات ساعد: 800-SAAED' : 'SAAED Road Patrols: 800-72233'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, ParkingCircle, Zap, Search as SearchIcon, Landmark, 
  ChevronRight, ChevronUp, ArrowLeft, ArrowRight, Share2, Check, Sparkles, Building2,
  ShieldCheck, Activity, Globe, ShieldAlert, Radio, Cpu, Eye, Wrench, Compass, X, ExternalLink
} from 'lucide-react';
import { serviceCategoriesData, ServiceCategory, ServiceItem } from '../data/servicesData';
import { getServiceRedirectionUrl, SAAED_ESERVICES_URL } from '../lib/servicesRedirect';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ThreeSaaedGlobe } from './ThreeSaaedGlobe';
import { UiconsParallaxBanner } from './UiconsParallaxBanner';
import { ScrollAnimatedIndicator } from './ScrollAnimatedIndicator';
import { AnimatedNetworkBackground } from './AnimatedNetworkBackground';
import { ServicePDFIcon, ServiceRepresentingPhoto } from './ServicePDFAssets';
import saaedLogo from '../saaed-logo.png';

interface ServicesLandingPageProps {
  isDark: boolean;
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onLanguageChange?: (newLang: 'en' | 'ar' | 'ur' | 'ru') => void;
  onBackToHome?: () => void;
  onContactClick?: () => void;
}

export const ServicesLandingPage: React.FC<ServicesLandingPageProps> = ({
  isDark,
  lang: currentLang,
  isRtl: currentIsRtl,
  onLanguageChange,
  onBackToHome,
  onContactClick
}) => {
  const [lang, setLang] = useState<'en' | 'ar' | 'ur' | 'ru'>(currentLang);
  const isRtl = lang === 'ar' || lang === 'ur';

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?page=services`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3500);
    }
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', window.location.pathname);
      window.location.reload();
    }
  };

  const allServices = useMemo(() => {
    return serviceCategoriesData.flatMap(cat => 
      cat.items.map(item => ({ item, category: cat }))
    );
  }, []);

  const partnersCategory = useMemo(() => {
    return serviceCategoriesData.find(c => c.id === 'service_centers') || serviceCategoriesData[4];
  }, []);

  const partnerEntities = useMemo(() => {
    return partnersCategory ? partnersCategory.items : [];
  }, [partnersCategory]);

  const filteredPartnerEntities = useMemo(() => {
    if (!partnerSearchQuery.trim()) return partnerEntities;
    const q = partnerSearchQuery.toLowerCase();
    return partnerEntities.filter(p => 
      p.name[lang]?.toLowerCase().includes(q) || 
      p.description[lang]?.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  }, [partnerEntities, partnerSearchQuery, lang]);

  const filteredServices = useMemo(() => {
    return allServices.filter(({ item, category }) => {
      const matchesCat = activeCategoryFilter === 'all' || category.id === activeCategoryFilter;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const name = item.name[lang]?.toLowerCase() || '';
      const desc = item.description[lang]?.toLowerCase() || '';
      return name.includes(q) || desc.includes(q);
    });
  }, [allServices, activeCategoryFilter, searchQuery, lang]);

  // Normal, smooth natural scrolling across the landing page
  const t = {
    badge: {
      en: 'SAAED Enterprise Services Ecosystem',
      ar: 'منظومة خدمات ساعد المؤسسية',
      ur: 'SAAED انٹرپرائز سروسز ایکو سسٹم',
      ru: 'Корпоративная экосистема услуг SAAED'
    },
    title: {
      en: 'Comprehensive Portfolio of Smart & Government Services',
      ar: 'المحفظة الشاملة للخدمات الذكية والحكومية',
      ur: 'اسمارٹ اور سرکاری خدمات کا جامع پورٹ فولیو',
      ru: 'Интегральный каталог умных и государственных услуг'
    },
    subtitle: {
      en: 'Explore our integrated operational pillars spanning road safety, automated smart parking, AI surveillance, field inspections, and 21+ official government entities across the UAE.',
      ar: 'استكشف ركائزنا التشغيلية المتكاملة التي تشمل السلامة المرورية، المواقف الذكية الآلية، رقابة الذكاء الاصطناعي، التفتيش الميداني، وأكثر من 21 جهة حكومية معتمدة في الدولة.',
      ur: 'ہمارے مربوط آپریشنل ستون کو دریافت کریں — سڑک کی حفاظت، خودکار اسمارٹ پارکنگ، AI نگرانی، اور 21+ سرکاری ادارے شامل ہیں۔',
      ru: 'Исследуйте наши операционные направления: безопасность дорожного движения, умные парковки, ИИ-контроль, инспекции и 21+ госучреждение в ОАЭ.'
    },
    back: {
      en: 'Back to Portal',
      ar: 'العودة للبوابة الرئيسية',
      ur: 'واپس پورٹ فولیو',
      ru: 'На главную'
    },
    shareBtn: {
      en: 'Share Portfolio',
      ar: 'مشاركة المحفظة',
      ur: 'پورٹ فولیو شیئر کریں',
      ru: 'Поделиться'
    },
    shareCopied: {
      en: 'Shareable link copied to clipboard!',
      ar: 'تم نسخ الرابط المباشر إلى الحافظة!',
      ur: 'لنک کلپ بورڈ پر کاپی ہو گیا!',
      ru: 'Ссылка скопирована в буфер обмена!'
    },
    searchPlaceholder: {
      en: 'Search services, towing, radars, ICP, UAE PASS, inspections...',
      ar: 'ابحث عن الخدمات، السحب، الرادارات، الهوية، التفتيش، آمر...',
      ur: 'خدمات تلاش کریں (ٹونگ، ریڈار، شناختی کارڈ، معائنہ)...',
      ru: 'Поиск услуг (эвакуация, радары, ICP, UAE PASS)...'
    },
    allFilter: {
      en: 'All Services (49+)',
      ar: 'كافة الخدمات (49+)',
      ur: 'تمام خدمات (49+)',
      ru: 'Все услуги (49+)'
    },
    exploreMore: {
      en: 'View Service Details',
      ar: 'عرض تفاصيل الخدمة',
      ur: 'تفصیلات دیکھیں',
      ru: 'Подробнее'
    },
    noResults: {
      en: 'No matching services found for your search criteria.',
      ar: 'لم يتم العثور على خدمات مطابقة لبحثك.',
      ur: 'کوئی مماثل سروس نہیں ملی۔',
      ru: 'Услуги не найдены по вашему запросу.'
    }
  };

  const getService2DIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'acc_recon': return <i className="bx bx-car text-xl text-blue-500" />;
      case 'delivery_platform': return <i className="bx bx-layer text-xl text-indigo-500" />;
      case 'heavy_trucks': return <i className="bx bx-traffic-cone text-xl text-amber-500" />;
      case 'vehicle_towing': return <i className="bx bx-wrench text-xl text-emerald-500" />;
      case 'school_zones': return <i className="bx bx-shield-quarter text-xl text-purple-500" />;
      case 'events_traffic': return <i className="bx bx-compass text-xl text-blue-500" />;
      case 'road_patrols': return <i className="bx bx-radar text-xl text-sky-500" />;
      case 'smart_parking': return <i className="bx bx-parking text-xl text-blue-600" />;
      case 'parking_systems': return <i className="bx bx-bolt-circle text-xl text-amber-600" />;
      case 'impound_mgmt': return <i className="bx bx-lock-alt text-xl text-red-500" />;
      case 'saaedi_service': return <i className="bx bx-devices text-xl text-indigo-600" />;
      case 'safe_city': return <i className="bx bx-globe text-xl text-emerald-600" />;
      case 'c4i_centers': return <i className="bx bx-broadcast text-xl text-blue-600" />;
      case 'tvr_radars': return <i className="bx bx-scan text-xl text-purple-600" />;
      case 'smart_patrols_unit': return <i className="bx bxs-car text-xl text-blue-500" />;
      case 'smart_gates': return <i className="bx bx-door-open text-xl text-teal-600" />;
      default: return <i className="bx bx-grid-alt text-xl text-blue-500" />;
    }
  };

  // Helper for short category titles to ensure 100% single-row fit on all screens
  const getCategoryShortTitle = (id: string, currentLang: 'en' | 'ar' | 'ur' | 'ru') => {
    const titles: Record<string, Record<string, string>> = {
      all: { en: 'All Services', ar: 'جميع الخدمات', ur: 'تمام خدمات', ru: 'Все услуги' },
      road_transport: { en: 'Road & Fleet', ar: 'الطرق والنقل', ur: 'سڑک اور ٹرانسپورٹ', ru: 'Транспорт' },
      smart_parking: { en: 'Smart Parking', ar: 'المواقف الذكية', ur: 'اسمارٹ پارکنگ', ru: 'Парковки' },
      smart_tech: { en: 'Tech & AI', ar: 'التقنيات والذكاء', ur: 'ٹیکنالوجی اور AI', ru: 'Технологии' },
      inspections: { en: 'Inspections', ar: 'التفتيش والسلامة', ur: 'معائنہ و آڈٹ', ru: 'Инспекции' },
      service_centers: { en: 'Our Partners', ar: 'شركاؤنا', ur: 'ہمارے شراکت دار', ru: 'Партнеры' }
    };
    return titles[id]?.[currentLang] || '';
  };

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative z-20 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      {/* Animated Dots Network Canvas Background - Runs strictly behind everything */}
      <AnimatedNetworkBackground isDark={isDark} />

      {/* Subtle Ambient High-Tech Backdrop (prevents photographic background bleed-through) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent dark:from-blue-950/30 dark:via-indigo-950/15 dark:to-transparent blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-emerald-400"
          >
            <Check size={18} />
            <span>{t.shareCopied[lang]}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UAE National Identity Stripe */}
      <div className="w-full h-1 bg-gradient-to-r from-red-600 via-emerald-600 via-white to-black z-50 relative shadow-sm" />

      {/* Clean, Executive Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/90 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand / Home space (word SAAED removed as requested) */}
          <div className="flex items-center">
            {/* Empty space preserving layout alignment */}
          </div>

          {/* Right Action Controls: Language Switch, Share, Back to Portal */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector with Globe */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm text-xs font-bold text-zinc-700 dark:text-zinc-200">
              <Globe size={15} className="text-blue-600 dark:text-blue-400" />
              <select
                value={lang}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setLang(val);
                  if (onLanguageChange) onLanguageChange(val);
                }}
                className="bg-transparent outline-none cursor-pointer font-bold text-xs"
              >
                <option value="en" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">English</option>
                <option value="ar" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">العربية</option>
                <option value="ur" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">اردو</option>
                <option value="ru" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Русский</option>
              </select>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-xs transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer shadow-sm"
            >
              <Share2 size={15} className="text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">{t.shareBtn[lang]}</span>
            </button>

            {/* Direct Official E-Services Portal Button */}
            <a
              href={SAAED_ESERVICES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#d9232a] hover:bg-red-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md shadow-red-600/30"
            >
              <span>{lang === 'ar' ? 'الخدمات الإلكترونية' : 'E-Services'}</span>
              <ExternalLink size={13} className="shrink-0" />
            </a>

            {/* Back to Portal Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md shadow-blue-600/25"
            >
              <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
              <span>{t.back[lang]}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section - Centered in both Arabic and English */}
        <div className="max-w-4xl mx-auto mb-14 flex flex-col items-center text-center">
          {/* SAAED Logo (Clean, No Circle, No Blue Border, No Portfolio Label) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.04 }}
            className="mb-6 cursor-pointer flex items-center justify-center"
            onClick={handleBack}
          >
            <img 
              src={saaedLogo} 
              alt="SAAED" 
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-sm hover:drop-shadow-md transition-all" 
            />
          </motion.div>

          {/* Headline: High Contrast, Solid, Commanding */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-zinc-950 dark:text-white mb-6 max-w-4xl text-center mx-auto"
          >
            <span className="animated-black-text">
              {t.title[lang]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-white max-w-3xl leading-relaxed mb-8 text-center mx-auto font-medium"
          >
            {t.subtitle[lang]}
          </motion.p>

          {/* Executive Ecosystem Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-6"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span>{lang === 'ar' ? '6 ركائز تشغيلية' : '6 Operational Pillars'}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
              <span>{lang === 'ar' ? '+28 خدمة مؤتمتة' : '28+ Automated Services'}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" />
              <span>{lang === 'ar' ? '21+ شريك استراتيجي' : '21+ Strategic Partners'}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
              <span>{lang === 'ar' ? 'جاهزية تشغيلية 24/7' : '24/7 Operational Readiness'}</span>
            </div>
          </motion.div>
        </div>

        {/* UIcons-Style Kinetic Parallax Animated Icon Ribbon Section */}
        <div className="mb-6 -mx-4 sm:-mx-6 lg:-mx-8">
          <UiconsParallaxBanner 
            lang={lang} 
            isRtl={isRtl} 
            onSelectService={(service, category) => {
              setSelectedService(service);
              setSelectedCategory(category);
            }}
          />
        </div>

        {/* Animated Scroll Indicator with Smooth Scroll Navigation */}
        <ScrollAnimatedIndicator lang={lang} targetId="operations-hub" />

        {/* Interactive Services Hub */}
        <motion.div 
          id="operations-hub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 scroll-mt-24"
        >
          <ThreeSaaedGlobe 
            lang={lang} 
            isRtl={isRtl} 
            onSelectService={(service, category) => {
              setSelectedService(service);
              setSelectedCategory(category);
            }} 
          />
        </motion.div>

        {/* Search & Category Filter Control Hub */}
        <div id="services-grid" className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl mb-12 space-y-6">
          <div className="relative">
            <SearchIcon size={22} className={`absolute top-4 ${isRtl ? 'right-5' : 'left-5'} text-zinc-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder[lang]}
              className={`w-full py-4 ${isRtl ? 'pr-14 pl-6' : 'pl-14 pr-6'} rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-inner`}
            />
          </div>

          {/* Category Filter Pills: Strictly in 1 unified row without horizontal scrolling */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 pt-2 w-full">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-1.5 sm:px-2.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 text-center truncate ${
                activeCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80'
              }`}
            >
              <i className="bx bx-grid-alt text-sm shrink-0" />
              <span className="truncate">{getCategoryShortTitle('all', lang)}</span>
            </button>
            {serviceCategoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-1.5 sm:px-2.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center cursor-pointer truncate ${
                  activeCategoryFilter === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80'
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0 shadow-inner" style={{ backgroundColor: cat.color }}></span>
                <span className="truncate">{getCategoryShortTitle(cat.id, lang) || cat.title[lang]}</span>
                <span className="opacity-70 text-[9px] hidden lg:inline">({cat.items.length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: "Our Partners" Section on Left Side with Red Header Bar + Services Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* LEFT SIDE: "Our Partners" Section with Striking Red Header Bar */}
          <aside className="w-full lg:w-[350px] xl:w-[390px] shrink-0">
            <div className="rounded-[2rem] overflow-hidden border border-red-200 dark:border-red-900/60 shadow-xl bg-white dark:bg-zinc-900 lg:sticky lg:top-24">
              
              {/* RED HEADER BAR */}
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                      <i className="bx bxs-institution text-xl text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black tracking-tight text-white">
                          {lang === 'ar' ? 'شركاؤنا' : lang === 'ur' ? 'ہمارے شراکت دار' : lang === 'ru' ? 'Наши партнеры' : 'Our Partners'}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-red-700 shadow-sm">
                          {partnerEntities.length}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-red-100/90 leading-tight mt-0.5">
                        {lang === 'ar' 
                          ? 'الجهات الاتحادية والمراكز الحكومية المعتمدة' 
                          : 'UAE Federal & Strategic Entities'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Filter Partners Input */}
                <div className="mt-3.5 relative">
                  <SearchIcon size={14} className={`absolute top-2.5 ${isRtl ? 'right-3' : 'left-3'} text-red-200`} />
                  <input
                    type="text"
                    value={partnerSearchQuery}
                    onChange={(e) => setPartnerSearchQuery(e.target.value)}
                    placeholder={
                      lang === 'ar' ? 'ابحث في الشركاء (آمر، تدبير، ICP...)' : 'Search partner entities...'
                    }
                    className={`w-full py-1.5 ${isRtl ? 'pr-9 pl-7' : 'pl-9 pr-7'} rounded-xl bg-black/20 hover:bg-black/25 focus:bg-black/35 border border-white/20 text-white placeholder:text-red-200 text-xs font-medium focus:outline-none transition-all placeholder:text-[11px]`}
                  />
                  {partnerSearchQuery && (
                    <button 
                      onClick={() => setPartnerSearchQuery('')}
                      className={`absolute top-2 ${isRtl ? 'left-2.5' : 'right-2.5'} text-white/70 hover:text-white p-0.5`}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* LIST OF ALL PARTNER ENTITIES WITH AUTHENTIC ICONS */}
              <div className="p-3 sm:p-4 space-y-2 max-h-[640px] overflow-y-auto custom-scrollbar divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {filteredPartnerEntities.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400 text-xs font-medium">
                    {lang === 'ar' ? 'لا يوجد شركاء مطابقون' : 'No partner entities found'}
                  </div>
                ) : (
                  filteredPartnerEntities.map((partner) => (
                    <motion.div
                      key={partner.id}
                      whileHover={{ scale: 1.015, x: isRtl ? -3 : 3 }}
                      onClick={() => {
                        setSelectedService(partner);
                        setSelectedCategory(partnersCategory);
                      }}
                      className="pt-2 first:pt-0 group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-red-50/70 dark:hover:bg-red-950/20 border border-transparent hover:border-red-200 dark:hover:border-red-900/40 transition-all cursor-pointer"
                    >
                      {/* Authentic SVG Icon */}
                      <div className="shrink-0 w-11 h-11 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 p-1 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm group-hover:shadow-md group-hover:border-red-400 dark:group-hover:border-red-500 transition-all">
                        <ServicePDFIcon serviceId={partner.id} className="w-9 h-9 object-contain" />
                      </div>

                      {/* Partner Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                            {partner.name[lang]}
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-snug mt-0.5">
                          {partner.description[lang]}
                        </p>
                      </div>

                      {/* Action Chevron */}
                      <div className="shrink-0 w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all text-zinc-400">
                        <ChevronRight size={13} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom Summary Bar */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-semibold px-4">
                <span>{lang === 'ar' ? 'منظومة الشركاء الموحدة' : 'Unified Partner Ecosystem'}</span>
                <span className="text-red-600 dark:text-red-400 font-bold">24/7 Connectivity</span>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Services Grid */}
          <div className="flex-1 min-w-0 w-full">
            {filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-base">{t.noResults[lang]}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6" style={{ perspective: 1200 }}>
                {filteredServices.map(({ item, category }, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02, duration: 0.3 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.025,
                      transition: { type: "spring", stiffness: 380, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedService(item);
                      setSelectedCategory(category);
                    }}
                    className="group rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Background Radial Glow Effect matching Most In-Demand cards */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Representing Photo Banner */}
                    <div className="w-full h-44 overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
                      <ServiceRepresentingPhoto 
                        serviceId={item.id} 
                        categoryColor={category.color} 
                        className="w-full h-44" 
                      />
                      {/* Top Category Pill Tag */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md border border-white/20"
                          style={{
                            backgroundColor: `${category.color}e0`,
                            color: '#ffffff'
                          }}
                        >
                          {category.title[lang]}
                        </span>
                      </div>

                      {/* Top Right Instant/Popular Tag */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/95 text-white backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1">
                          <Sparkles size={11} />
                          {item.badge ? item.badge[lang] : (isRtl ? 'خدمة ذكية 24/7' : 'Smart 24/7')}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10">
                      <div>
                        {/* Glowing Icon Box & Title */}
                        <div className="flex items-start gap-3.5 mb-3.5">
                          <div 
                            className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 border shadow-inner group-hover:scale-110 transition-transform duration-300"
                            style={{
                              backgroundColor: `${category.color}15`,
                              borderColor: `${category.color}35`,
                              color: category.color
                            }}
                          >
                            <ServicePDFIcon serviceId={item.id} className="w-9 h-9 object-contain" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                              {isRtl ? 'منظومة خدمات ساعد والشرطة' : 'SAAED Smart Portal'}
                            </span>
                            <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                              {item.name[lang]}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-white leading-relaxed line-clamp-2 mb-4">
                          {item.description[lang]}
                        </p>
                      </div>

                      {/* Bottom Action CTA Button: Details + Official Redirection */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
                        <div className="flex-1 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-between group/btn cursor-pointer">
                          <span>{t.exploreMore[lang]}</span>
                          <ArrowRight size={14} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                        </div>
                        <a
                          href={getServiceRedirectionUrl(item.id, lang)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                        >
                          <span>{lang === 'ar' ? 'البوابة الرسمية' : 'Portal'}</span>
                          <ExternalLink size={13} className="shrink-0" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Simple, Elegant & Animated Landing Page Footer */}
      <footer className="mt-16 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
            
            {/* Logo & Operational Status */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={saaedLogo} 
                alt="SAAED" 
                className="h-9 w-auto object-contain cursor-pointer"
                onClick={handleBack}
              />
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>
                  {lang === 'ar' ? 'منظومة ساعد الذكية • جاهزية 24/7' : 'SAAED Smart Ecosystem • 24/7 Readiness'}
                </span>
              </div>
            </div>

            {/* Quick Strategic Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                {lang === 'ar' ? 'غرفة عمليات C4i' : 'C4i Operations'}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                {lang === 'ar' ? 'ذكاء اصطناعي مروري' : 'Traffic AI'}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                {lang === 'ar' ? '28 خدمة مؤتمتة' : '28 Automated Services'}
              </span>
            </div>

            {/* Back to Top Animated Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer shadow-sm"
            >
              <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
              <ChevronUp size={15} />
            </motion.button>
          </div>

          {/* Bottom Copyright & Slogan */}
          <div className={`mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-3 ${isRtl ? 'sm:flex-row-reverse text-center sm:text-right' : 'text-center sm:text-left'}`}>
            <p>
              {lang === 'ar' 
                ? '© 2026 شركة ساعد للأنظمة المرورية (ش.م.خ). جميع الحقوق محفوظة.' 
                : '© 2026 SAAED for Traffic Systems (P.J.S.C). All rights reserved.'}
            </p>
            <p className="font-semibold text-zinc-600 dark:text-zinc-300">
              {lang === 'ar' ? 'دولة الإمارات العربية المتحدة' : 'United Arab Emirates'}
            </p>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        category={selectedCategory}
        lang={lang}
        isRtl={isRtl}
        onClose={() => {
          setSelectedService(null);
          setSelectedCategory(null);
        }}
        onContactClick={onContactClick}
      />
    </div>
  );
};

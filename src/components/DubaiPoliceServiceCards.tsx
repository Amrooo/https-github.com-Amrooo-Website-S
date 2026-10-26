import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, Shield, FileCheck, Eye, Home, Smartphone, Search, AlertTriangle, 
  ChevronRight, ArrowRight, ArrowLeft, Clock, CheckCircle2, Sparkles, 
  Zap, ExternalLink, ShieldCheck, MapPin, X, QrCode, CreditCard, 
  AlertCircle, PhoneCall, Download, Send, Check, LucideIcon
} from 'lucide-react';

export interface DubaiPoliceService {
  id: string;
  category: 'traffic' | 'accidents' | 'security' | 'certificates';
  title: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  subtitle: {
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
  tag: {
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
  icon: LucideIcon;
  color: string;
  bgGlow: string;
  borderGlow: string;
  actionText: {
    en: string;
    ar: string;
    ur: string;
    ru: string;
  };
  requirements: {
    en: string[];
    ar: string[];
    ur: string[];
    ru: string[];
  };
}

const DUBAI_POLICE_SERVICES: DubaiPoliceService[] = [
  {
    id: 'fines_payment',
    category: 'traffic',
    title: {
      en: 'Traffic Fines Payment',
      ar: 'دفع المخالفات المرورية',
      ur: 'ٹریفک جرمانے کی ادائیگی',
      ru: 'Оплата дорожных штрафов'
    },
    subtitle: {
      en: 'Inquiry & Settlement',
      ar: 'استعلام وتسوية فورية',
      ur: 'انکوائری اور تصفیہ',
      ru: 'Проверка и оплата'
    },
    description: {
      en: 'Inquire and settle traffic violations instantly with discount eligibility, installment plans, and zero service fees.',
      ar: 'استعلم عن المخالفات المرورية وسددها فوراً مع أهلية الخصومات وخيارات التقسيط الميسرة وبدون رسوم إضافية.',
      ur: 'رعایت کی اہلیت اور قسطوں کے منصوبوں کے ساتھ ٹریفک کی خلاف ورزیوں کی فوری انکوائری اور ادائیگی کریں۔',
      ru: 'Мгновенная проверка и оплата штрафов за нарушение ПДД со скидками и рассрочкой.'
    },
    tag: {
      en: 'Most Popular',
      ar: 'الأكثر طلباً',
      ur: 'سب سے مقبول',
      ru: 'Популярно'
    },
    timeEstimate: {
      en: '1 Minute',
      ar: 'دقيقة واحدة',
      ur: '1 منٹ',
      ru: '1 минута'
    },
    icon: CreditCard,
    color: '#00573D', // Dubai Police Emerald Green
    bgGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60',
    actionText: {
      en: 'Inquire & Pay',
      ar: 'استعلام ودفع',
      ur: 'معلوم کریں اور ادا کریں',
      ru: 'Проверить и оплатить'
    },
    requirements: {
      en: ['Traffic Code (T.C. No) or Plate Number', 'Emirates ID (optional)', 'Valid Bank Card or Apple Pay'],
      ar: ['الرمز المروري أو رقم اللوحة', 'بطاقة الهوية الإماراتية (اختياري)', 'بطاقة بنكية صالحة أو Apple Pay'],
      ur: ['ٹریفک کوڈ یا پلیٹ نمبر', 'اماراتی شناختی کارڈ (اختیاری)', 'درست بینک کارڈ'],
      ru: ['Код движения или номерной знак', 'Emirates ID', 'Банковская карта']
    }
  },
  {
    id: 'report_accident',
    category: 'accidents',
    title: {
      en: 'Report Traffic Accident',
      ar: 'الإبلاغ عن حادث مروري',
      ur: 'ٹریفک حادثے کی رپورٹ',
      ru: 'Сообщение о ДТП'
    },
    subtitle: {
      en: 'Minor Collisions & Hit-and-Run',
      ar: 'الحوادث البسيطة وضد مجهول',
      ur: 'معمولی حادثات',
      ru: 'Мелкие аварии и происшествия'
    },
    description: {
      en: 'Obtain an official certified traffic accident report digitally within 3 minutes without waiting for a patrol on site.',
      ar: 'احصل على تقرير حادث مروري معتمد رقمياً خلال 3 دقائق دون الحاجة لانتظار دورية الشرطة في الموقع.',
      ur: 'موقع پر گشت کا انتظار کیے بغیر 3 منٹ کے اندر ڈیجیٹل طور پر سرکاری تصدیق شدہ رپورٹ حاصل کریں۔',
      ru: 'Оформление официального протокола мелкого ДТП онлайн за 3 минуты без ожидания патруля.'
    },
    tag: {
      en: 'Instant 24/7',
      ar: 'فوري 24/7',
      ur: 'فوری 24/7',
      ru: 'Мгновенно 24/7'
    },
    timeEstimate: {
      en: '3 Minutes',
      ar: '3 دقائق',
      ur: '3 منٹ',
      ru: '3 минуты'
    },
    icon: Car,
    color: '#D97706', // Amber/Orange
    bgGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-amber-500/60 dark:hover:border-amber-400/60',
    actionText: {
      en: 'Issue Report',
      ar: 'إصدار التقرير',
      ur: 'رپورٹ جاری کریں',
      ru: 'Оформить отчет'
    },
    requirements: {
      en: ['4 damage photos from accident scene', 'Driving license & vehicle registration', 'Emirates ID of all parties'],
      ar: ['4 صور للأضرار من موقع الحادث', 'رخصة القيادة وملكيات المركبات', 'الهوية الإماراتية للأطراف'],
      ur: ['حادثے کے مقام کی 4 تصاویر', 'ڈرائیونگ لائسنس اور گاڑی کی رجسٹریشن', 'شناختی کارڈ'],
      ru: ['4 фото повреждений с места', 'Водительское удостоверение', 'Emirates ID участников']
    }
  },
  {
    id: 'police_clearance',
    category: 'certificates',
    title: {
      en: 'Police Clearance Certificate',
      ar: 'شهادة بحث الحالة الجنائية',
      ur: 'پولیس کلیئرنس سرٹیفکیٹ',
      ru: 'Справка об отсутствии судимости'
    },
    subtitle: {
      en: 'Good Conduct Certificate',
      ar: 'شهادة حسن سيرة وسلوك',
      ur: 'نیک چال چلن کا سرٹیفکیٹ',
      ru: 'Сертификат благонадежности'
    },
    description: {
      en: 'Official certificate verifying zero criminal record for employment, residency visas, naturalization, and education.',
      ar: 'وثيقة رسمية معتمدة تثبت خلو السجل الجنائي لغايات التوظيف، الإقامة، الدراسة، أو السفر.',
      ur: 'ملازمت، ویزا، اور تعلیم کے لیے مجرمانہ ریکارڈ نہ ہونے کی تصدیق کرنے والا سرکاری سرٹیفکیٹ۔',
      ru: 'Официальный документ об отсутствии судимостей для работы, вида на жительство или учебы.'
    },
    tag: {
      en: 'Digital MoI',
      ar: 'اعتماد رسمي',
      ur: 'سرکاری منظوری',
      ru: 'МВД ОАЭ'
    },
    timeEstimate: {
      en: '5 Minutes',
      ar: '5 دقائق',
      ur: '5 منٹ',
      ru: '5 минут'
    },
    icon: FileCheck,
    color: '#2563EB', // Blue
    bgGlow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    borderGlow: 'hover:border-blue-500/60 dark:hover:border-blue-400/60',
    actionText: {
      en: 'Apply Online',
      ar: 'تقديم الطلب',
      ur: 'درخواست دیں',
      ru: 'Подать заявку'
    },
    requirements: {
      en: ['Valid Emirates ID or Passport', 'Active UAE PASS login', 'Purpose of request certificate'],
      ar: ['بطاقة هوية إماراتية سارية أو جواز سفر', 'تسجيل الدخول عبر الهوية الرقمية UAE PASS', 'تحديد الجهة الموجه إليها التقرير'],
      ur: ['اماراتی شناختی کارڈ یا پاسپورٹ', 'UAE PASS لاگ ان', 'درخواست کا مقصد'],
      ru: ['Emirates ID или загранпаспорт', 'Вход через UAE PASS', 'Указание адресата']
    }
  },
  {
    id: 'police_eye',
    category: 'security',
    title: {
      en: 'Police Eye Service',
      ar: 'خدمة عين الشرطة',
      ur: 'پولیس آئی سروس',
      ru: 'Служба «Око полиции»'
    },
    subtitle: {
      en: 'Community Safety Watch',
      ar: 'حماية المجتمع والإبلاغ السري',
      ur: 'کمیونٹی سیکورٹی واچ',
      ru: 'Народная безопасность'
    },
    description: {
      en: 'Confidential and direct citizen channel to report suspicious behaviors, environmental violations, or security risks.',
      ar: 'قناة مجتمعية سرية ومباشرة للإبلاغ عن السلوكيات المريبة، المخالفات البيئية، أو أي تهديد لأمن المجتمع.',
      ur: 'مشتبہ سرگرمیوں، ماحولیاتی خلاف ورزیوں یا حفاظتی خطرات کی اطلاع دینے کے لیے خفیہ چینل۔',
      ru: 'Конфиденциальный канал для сообщения о подозрительном поведении или нарушениях правопорядка.'
    },
    tag: {
      en: '100% Confidential',
      ar: 'سري وآمن 100%',
      ur: '100% خفیہ',
      ru: 'Конфиденциально'
    },
    timeEstimate: {
      en: 'Immediate Action',
      ar: 'إجراء فوري',
      ur: 'فوری کارروائی',
      ru: 'Немедленно'
    },
    icon: Eye,
    color: '#7C3AED', // Violet / Purple
    bgGlow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    borderGlow: 'hover:border-purple-500/60 dark:hover:border-purple-400/60',
    actionText: {
      en: 'Report Securely',
      ar: 'إبلاغ سري',
      ur: 'رپورٹ بھیجیں',
      ru: 'Сообщить'
    },
    requirements: {
      en: ['Incident description & date', 'Location / GPS Coordinates', 'Optional photo/video evidence'],
      ar: ['وصف الحالة وتاريخ الواقعة', 'الموقع الجغرافي الدقيق', 'إرفاق صور أو مقطع فيديو (اختياري)'],
      ur: ['واقعے کی تفصیل اور تاریخ', 'مقام / GPS', 'اختیاری ثبوت'],
      ru: ['Описание происшествия', 'Координаты места', 'Фото/видео (по желанию)']
    }
  },
  {
    id: 'smart_impound',
    category: 'traffic',
    title: {
      en: 'Smart Home Impoundment',
      ar: 'حجز المركبات الذكي في المنزل',
      ur: 'سمارٹ وہیکل امپاؤنڈمنٹ',
      ru: 'Умный домашний арест авто'
    },
    subtitle: {
      en: 'GPS Tracked Vehicle Garage',
      ar: 'حجز المركبة في كراج منزلك',
      ur: 'گھر کے گیراج میں گاڑی کی حراست',
      ru: 'Парковка арестованного авто дома'
    },
    description: {
      en: 'Keep your impounded vehicle safely in your home garage monitored via a smart IoT tracking device without public impound fees.',
      ar: 'احتفظ بمركبتك المحجوزة في كراج منزلك الخاص تحت مراقبة جهاز تتبع ذكي دون الحاجة لنقلها لحجز الشرطة.',
      ur: 'عوامی امپاؤنڈ فیس کے بغیر سمارٹ ٹریکنگ ڈیوائس کے ذریعے اپنی گاڑی کو اپنے گیراج میں رکھیں۔',
      ru: 'Хранение арестованного автомобиля в личном гараже с контролем умным GPS-маяком.'
    },
    tag: {
      en: 'Smart IoT',
      ar: 'تقنية ذكية',
      ur: 'سمارٹ ٹیکنالوجی',
      ru: 'IoT Технология'
    },
    timeEstimate: {
      en: '24h Installation',
      ar: 'تركيب خلال 24 ساعة',
      ur: '24 گھنٹے میں تنصیب',
      ru: 'Установка за 24 ч'
    },
    icon: Smartphone,
    color: '#059669', // Emerald
    bgGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60',
    actionText: {
      en: 'Request Device',
      ar: 'طلب الجهاز الذكي',
      ur: 'ڈیوائس کی درخواست کریں',
      ru: 'Заказать маяк'
    },
    requirements: {
      en: ['Impound order number', 'Private covered garage location', 'Emirates ID & Mulkiya card'],
      ar: ['رقم قرار الحجز المروري', 'موقع كراج مغطى داخل المنزل', 'بطاقة الهوية والملكية'],
      ur: ['امپاؤنڈ آرڈر نمبر', 'نجی گیراج کا مقام', 'ملکیت کارڈ'],
      ru: ['Номер постановления об аресте', 'Крытый гараж', 'Техпаспорт и Emirates ID']
    }
  },
  {
    id: 'home_security',
    category: 'security',
    title: {
      en: 'Home Security Patrols',
      ar: 'خدمة أمن المساكن',
      ur: 'ہوم سیکیورٹی گشت',
      ru: 'Охрана жилых домов'
    },
    subtitle: {
      en: 'Villa Travel Patrol Guard',
      ar: 'حماية وتفقد المنازل أثناء السفر',
      ur: 'سفر کے دوران ولا کی نگرانی',
      ru: 'Патрулирование вилл в отпуске'
    },
    description: {
      en: 'Free residential security monitoring where Dubai Police patrols regularly inspect your villa exterior while you travel abroad.',
      ar: 'خدمة أمنية مجانية تقوم خلالها دوريات الشرطة بتفقد منزلك الخارجي بشكل دوري طوال فترة سفرك لضمان سلامته.',
      ur: 'مفت حفاظتی نگرانی جس میں پولیس کے گشت سفر کے دوران آپ کے ولا کا باقاعدگی سے معائنہ کرتے ہیں۔',
      ru: 'Бесплатная услуга патрулирования и внешнего контроля вашей виллы полицией на время отпуска.'
    },
    tag: {
      en: '100% Free',
      ar: 'خدمة مجانية',
      ur: 'مکمل مفت',
      ru: 'Бесплатно'
    },
    timeEstimate: {
      en: 'Same Day Active',
      ar: 'تفعيل فوري',
      ur: 'اسی دن فعال',
      ru: 'Активация в день подачи'
    },
    icon: Home,
    color: '#0D9488', // Teal
    bgGlow: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    borderGlow: 'hover:border-teal-500/60 dark:hover:border-teal-400/60',
    actionText: {
      en: 'Register Villa',
      ar: 'تسجيل المسكن',
      ur: 'ولا کا اندراج کریں',
      ru: 'Зарегистрировать'
    },
    requirements: {
      en: ['Makani number or Villa address', 'Travel departure & return dates', 'Emergency contact in UAE'],
      ar: ['رقم مكاني أو عنوان المسكن الدقيق', 'تاريخ المغادرة والعودة من السفر', 'رقم شخص للتواصل في حالات الطوارئ'],
      ur: ['مکانی نمبر یا پتہ', 'روانگی اور واپسی کی تاریخیں', 'ہنگامی رابطہ'],
      ru: ['Номер Makani или адрес', 'Даты выезда и возвращения', 'Контакт на случай ЧС']
    }
  },
  {
    id: 'lost_certificate',
    category: 'certificates',
    title: {
      en: 'Lost Item Certificate',
      ar: 'شهادة فقدان مقتنيات',
      ur: 'گمشدہ چیز کا سرٹیفکیٹ',
      ru: 'Справка об утере вещей'
    },
    subtitle: {
      en: 'Official Loss Attestation',
      ar: 'إثبات فقدان وثائق وأجهزة',
      ur: 'سرکاری تصدیق نامہ',
      ru: 'Официальное заверение утери'
    },
    description: {
      en: 'Issue an officially endorsed police certificate for lost passports, Emirates ID, vehicle number plates, and valuables.',
      ar: 'إصدار شهادة رسمية معتمدة لإثبات فقدان جواز السفر أو الهوية أو لوحات المركبات أو المقتنيات الثمينة.',
      ur: 'پاسپورٹ، شناختی کارڈ، یا قیمتی سامان کے گم ہونے کی صورت میں سرکاری تصدیق شدہ سرٹیفکیٹ جاری کریں۔',
      ru: 'Выдача официальной справки об утере паспорта, удостоверения, автономеров или ценных вещей.'
    },
    tag: {
      en: 'Verified QR',
      ar: 'رمز QR معتمد',
      ur: 'تصدیق شدہ QR',
      ru: 'QR-верификация'
    },
    timeEstimate: {
      en: '2 Minutes',
      ar: 'دقيقتان',
      ur: '2 منٹ',
      ru: '2 минуты'
    },
    icon: Search,
    color: '#0284C7', // Sky blue
    bgGlow: 'from-sky-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'hover:border-sky-500/60 dark:hover:border-sky-400/60',
    actionText: {
      en: 'Issue Certificate',
      ar: 'إصدار الشهادة',
      ur: 'سرٹیفکیٹ جاری کریں',
      ru: 'Получить справку'
    },
    requirements: {
      en: ['Item category & serial number (if any)', 'Estimated place and date of loss', 'Emirates ID or Passport copy'],
      ar: ['نوع المفقود ورقم التسلسل إن وجد', 'تاريخ ومكان الفقدان التقريبي', 'صورة عن الهوية أو جواز السفر'],
      ur: ['چیز کی تفصیل اور سیریل نمبر', 'گم ہونے کا مقام اور تاریخ', 'شناختی کارڈ کی کاپی'],
      ru: ['Категория и серийный номер', 'Примерное место и дата утери', 'Копия паспорта или ID']
    }
  },
  {
    id: 'road_hazard',
    category: 'accidents',
    title: {
      en: 'Road Obstruction & Hazard',
      ar: 'الإبلاغ عن عائق مروري',
      ur: 'سڑک پر رکاوٹ کی رپورٹ',
      ru: 'Препятствие на дороге'
    },
    subtitle: {
      en: 'Rapid SAAED Dispatch',
      ar: 'إرسال سريع لدوريات ساعد',
      ur: 'فوری پیٹرولنگ سروس',
      ru: 'Срочный вызов патруля'
    },
    description: {
      en: 'Immediate dispatch of SAAED emergency recovery patrols to remove fallen debris, stalled trucks, or oil spills on highways.',
      ar: 'تحريك فوري لدوريات ساعد التخصصية لإزالة العوائق، سحب الشاحنات المتعطلة، ومعالجة الزيوت على الطرق السريعة.',
      ur: 'ہائی ویز پر گرے ہوئے ملبے یا خراب گاڑیوں کو ہٹانے کے لیے ساعد کے گشت کو فوری روانہ کریں۔',
      ru: 'Экстренное реагирование патрулей SAAED для ликвидации завалов, эвакуации фур и очистки трасс.'
    },
    tag: {
      en: 'Under 8 Mins',
      ar: 'استجابة < 8 دقائق',
      ur: '8 منٹ کے اندر',
      ru: '< 8 минут'
    },
    timeEstimate: {
      en: 'Rapid Dispatch',
      ar: 'تحريك فوري',
      ur: 'فوری روانگی',
      ru: 'Срочный выезд'
    },
    icon: AlertTriangle,
    color: '#DC2626', // Red
    bgGlow: 'from-red-500/20 via-rose-500/10 to-transparent',
    borderGlow: 'hover:border-red-500/60 dark:hover:border-red-400/60',
    actionText: {
      en: 'Alert Patrol',
      ar: 'تنبيه الدورية',
      ur: 'گشت کو الرٹ کریں',
      ru: 'Вызвать патруль'
    },
    requirements: {
      en: ['GPS Location on Highway', 'Type of obstruction (Vehicle / Debris / Spill)', 'Live Photo (optional)'],
      ar: ['الموقع الجغرافي الدقيق على الطريق', 'نوع العائق (مركبة / ركام / تسريب زيوت)', 'صورة حية من الموقع (اختياري)'],
      ur: ['سڑک پر GPS کا مقام', 'رکاوٹ کی قسم', 'براہ راست تصویر'],
      ru: ['Координаты на трассе', 'Тип препятствия (авто, груз, пятно)', 'Фото (по возможности)']
    }
  }
];

interface Props {
  searchQuery?: string;
  lang?: 'en' | 'ar' | 'ur' | 'ru';
  isRtl?: boolean;
  onNavigateToService?: (serviceId: string) => void;
  className?: string;
}

export const DubaiPoliceServiceCards: React.FC<Props> = ({
  searchQuery = '',
  lang = 'en',
  isRtl = false,
  onNavigateToService,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'traffic' | 'accidents' | 'security' | 'certificates'>('all');
  const [selectedService, setSelectedService] = useState<DubaiPoliceService | null>(null);
  
  // Interactive Modal State for demoing
  const [demoInput, setDemoInput] = useState('');
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Filter services by category and optional search query
  const filteredServices = DUBAI_POLICE_SERVICES.filter(service => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    if (!matchesTab) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const title = (service.title[lang] || service.title.en).toLowerCase();
    const subtitle = (service.subtitle[lang] || service.subtitle.en).toLowerCase();
    const desc = (service.description[lang] || service.description.en).toLowerCase();
    const tag = (service.tag[lang] || service.tag.en).toLowerCase();

    return title.includes(q) || subtitle.includes(q) || desc.includes(q) || tag.includes(q);
  });

  const tabLabels = {
    all: { en: 'All Smart Services', ar: 'جميع الخدمات الذكية', ur: 'تمام سمارٹ سروسز', ru: 'Все услуги' },
    traffic: { en: 'Traffic & Fines', ar: 'المرور والمخالفات', ur: 'ٹریفک اور جرمانے', ru: 'Движение и штрафы' },
    accidents: { en: 'Accidents & Hazards', ar: 'الحوادث والطوارئ', ur: 'حادثات اور خطرات', ru: 'ДТП и происшествия' },
    security: { en: 'Security & Police Eye', ar: 'الأمن وعين الشرطة', ur: 'سیکورٹی اور پولیس آئی', ru: 'Безопасность и надзор' },
    certificates: { en: 'Certificates & Permits', ar: 'الشهادات والتصاريح', ur: 'سرٹیفکیٹ اور پرمٹ', ru: 'Справки и разрешения' }
  };

  const handleOpenService = (service: DubaiPoliceService) => {
    setSelectedService(service);
    setDemoInput('');
    setIsDemoSubmitting(false);
    setDemoSuccess(false);
  };

  const handleExecuteDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoSubmitting(true);
    setTimeout(() => {
      setIsDemoSubmitting(false);
      setDemoSuccess(true);
    }, 1200);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header: Dubai Police Official Smart Services Showcase */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-300 uppercase">
              {lang === 'ar' ? 'بوابة الخدمات الرقمية المعتمدة | شرطة دبي & ساعد' : 'Dubai Police & SAAED Smart Services'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>
              {lang === 'ar' ? 'الخدمات الذكية الأكثر طلباً' : 
               lang === 'ur' ? 'سب سے زیادہ مطلوب سمارٹ سروسز' : 
               lang === 'ru' ? 'Популярные цифровые госуслуги' : 
               'Most In-Demand Smart Services'}
            </span>
            <Sparkles size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
          </h3>
          <p className="text-sm text-zinc-500 dark:text-white mt-1">
            {lang === 'ar' ? 'إجراءات فورية مؤتمتة متصلة بالأنظمة الجنائية والمرورية دون الحاجة لمراجعة المراكز' : 
             'Direct instant government integration with zero paperwork and sub-5-minute turnaround.'}
          </p>
        </div>

        {/* Dubai Police Service Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 overflow-x-auto max-w-full no-scrollbar">
          {(['all', 'traffic', 'accidents', 'security', 'certificates'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-md shadow-emerald-600/25'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tabLabels[tab][lang] || tabLabels[tab].en}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Animated Service Cards with 3D Perspective */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
        {filteredServices.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ 
                y: -12, 
                scale: 1.035,
                rotateX: 6,
                rotateY: idx % 2 === 0 ? -8 : 8,
                rotateZ: idx % 2 === 0 ? -1.5 : 1.5,
                transition: { type: "spring", stiffness: 380, damping: 20 }
              }}
              whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0, rotateZ: 0 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => handleOpenService(service)}
              className={`group relative bg-gradient-to-b from-white via-zinc-50/70 to-emerald-50/15 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950 rounded-[1.25rem] p-6 border border-zinc-200/90 dark:border-zinc-800 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-emerald-950/15 dark:hover:shadow-emerald-900/30 cursor-pointer overflow-hidden flex flex-col justify-between ${service.borderGlow}`}
            >
              {/* Animated Light Sweep Shimmer Effect on 3D Hover */}
              <div 
                className="absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-emerald-400/15 dark:via-emerald-400/20 to-transparent pointer-events-none rounded-[1.25rem]" 
              />

              {/* Ambient radial glow behind the card on hover */}
              <div 
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${service.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Top Row: Icon with dynamic glow & Badge with 3D Depth */}
                <div className="flex items-center justify-between gap-3 mb-4" style={{ transform: 'translateZ(28px)' }}>
                  <div className="relative">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm border border-black/5 dark:border-white/10"
                      style={{ 
                        backgroundColor: `${service.color}15`,
                        color: service.color 
                      }}
                    >
                      <Icon size={26} className="transition-transform duration-300" />
                    </div>
                    {/* Small pulsing dot indicator for active instant availability */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
                    </span>
                  </div>

                  {/* Service Badge: Reduced border roundness */}
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 group-hover:border-emerald-500/40 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {service.tag[lang] || service.tag.en}
                  </span>
                </div>

                {/* Service Titles with 3D Depth */}
                <div style={{ transform: 'translateZ(20px)' }}>
                  <h4 className="text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1">
                    {service.title[lang] || service.title.en}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-700/80 dark:text-emerald-400/80 mb-2 flex items-center gap-1.5 mt-1">
                    <Clock size={12} />
                    <span>{service.timeEstimate[lang] || service.timeEstimate.en}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-500 dark:text-zinc-400 truncate">{service.subtitle[lang] || service.subtitle.en}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 dark:text-white leading-relaxed line-clamp-2 mb-4">
                    {service.description[lang] || service.description.en}
                  </p>
                </div>
              </div>

              {/* Card Footer: Interactive CTA Button with Reduced Border Roundness (rounded-md) */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between" style={{ transform: 'translateZ(24px)' }}>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>{service.actionText[lang] || service.actionText.en}</span>
                </span>
                
                <div className="h-8 px-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300 shadow-sm">
                  <span className="text-[11px] font-bold">{lang === 'ar' ? 'فتح الخدمة' : 'Open'}</span>
                  {isRtl ? (
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* When no services match query */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <AlertCircle size={36} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            {lang === 'ar' ? 'لا توجد خدمات مطابقة لبحثك' : 'No matching Dubai Police smart services found.'}
          </p>
          <button 
            onClick={() => setActiveTab('all')} 
            className="mt-3 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            {lang === 'ar' ? 'عرض كافة الخدمات' : 'View All Services'}
          </button>
        </div>
      )}

      {/* Dubai Police Smart Service Execution Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Top Banner with Dubai Police & SAAED Dark Emerald Brand Gradient */}
              <div className="bg-gradient-to-r from-[#00573D] via-[#064e3b] to-[#043327] p-6 sm:p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/20">
                    Dubai Police & SAAED Smart Gateway
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-400 text-emerald-950">
                    {selectedService.tag[lang] || selectedService.tag.en}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner">
                    <selectedService.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {selectedService.title[lang] || selectedService.title.en}
                    </h3>
                    <p className="text-sm text-emerald-100/90 mt-1">
                      {selectedService.subtitle[lang] || selectedService.subtitle.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Turnaround & Service Specs */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-center">
                  <div>
                    <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      {lang === 'ar' ? 'الوقت المستغرق' : 'Turnaround Time'}
                    </div>
                    <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {selectedService.timeEstimate[lang] || selectedService.timeEstimate.en}
                    </div>
                  </div>
                  <div className="border-x border-zinc-200 dark:border-zinc-700/60">
                    <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      {lang === 'ar' ? 'القناة' : 'Delivery Channel'}
                    </div>
                    <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {lang === 'ar' ? 'رقمي 100%' : '100% Digital'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      {lang === 'ar' ? 'رسوم الخدمة' : 'Govt Fee'}
                    </div>
                    <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {selectedService.id === 'home_security' || selectedService.id === 'police_eye' 
                        ? (lang === 'ar' ? 'مجانية بالكامل' : '100% Free') 
                        : (lang === 'ar' ? 'حسب اللائحة' : 'Standard Tariff')}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Overview'}
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedService.description[lang] || selectedService.description.en}
                  </p>
                </div>

                {/* Requirements Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                    {lang === 'ar' ? 'المتطلبات والمستندات المطلوبة' : 'Mandatory Requirements'}
                  </h4>
                  <div className="space-y-2">
                    {(selectedService.requirements[lang] || selectedService.requirements.en).map((req, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Instant Inquiry / Demo Form */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40">
                  <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                    <span>
                      {selectedService.id === 'fines_payment' 
                        ? (lang === 'ar' ? 'استعلام فوري عن المخالفات' : 'Instant Traffic Fine Lookup')
                        : selectedService.id === 'report_accident'
                        ? (lang === 'ar' ? 'بدء إشعار حادث مروري بسيط' : 'Initiate Minor Accident Form')
                        : (lang === 'ar' ? 'بدء المعاملة الرقمية السريعة' : 'Direct Service Submission')}
                    </span>
                  </h4>

                  {demoSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">
                          {lang === 'ar' ? 'تم استلام طلبك والتحقق بنجاح!' : 'Application Verified & Submitted!'}
                        </div>
                        <div className="opacity-90">
                          {lang === 'ar' 
                            ? 'رقم المعاملة المرجعي: DP-2026-98174. تم الإرسال إلى مركز العمليات المشترك لشرطة دبي وساعد.'
                            : 'Ref Code: DP-2026-98174. Dispatched to Dubai Police & SAAED Operations Command.'}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleExecuteDemo} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          {selectedService.id === 'fines_payment' 
                            ? (lang === 'ar' ? 'رقم اللوحة المرورية أو الرمز المروري' : 'Vehicle Plate No or Traffic File (T.C.)')
                            : selectedService.id === 'report_accident'
                            ? (lang === 'ar' ? 'رقم اللوحة وموقع الحادث' : 'Vehicle Plate & Incident Location')
                            : selectedService.id === 'home_security'
                            ? (lang === 'ar' ? 'رقم مكاني أو عنوان الفيلا' : 'Makani Number / Villa Address')
                            : (lang === 'ar' ? 'رقم الهوية الإماراتية أو رقم الهاتف' : 'Emirates ID or Mobile Number')}
                        </label>
                        <input
                          type="text"
                          required
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                          placeholder={selectedService.id === 'fines_payment' ? 'e.g. Dubai - Plate A 12345' : 'e.g. 784-1990-1234567-1'}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={isDemoSubmitting}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isDemoSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>{lang === 'ar' ? 'جاري التحقق الفوري...' : 'Verifying with Police Gateway...'}</span>
                            </>
                          ) : (
                            <>
                              <Zap size={14} />
                              <span>{selectedService.actionText[lang] || selectedService.actionText.en}</span>
                            </>
                          )}
                        </button>

                        {onNavigateToService && (
                          <button
                            type="button"
                            onClick={() => {
                              onNavigateToService(selectedService.id);
                              setSelectedService(null);
                            }}
                            className="py-2.5 px-4 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{lang === 'ar' ? 'فتح المحفظة' : 'Open in Hub'}</span>
                            <ExternalLink size={13} />
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>

                {/* Official Hotlines Contact */}
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <PhoneCall size={14} className="text-emerald-600" />
                    <span>{lang === 'ar' ? 'خدمة المتعاملين (غير طارئ): 901' : 'Dubai Police Call Center: 901'}</span>
                  </div>
                  <div>
                    <span>{lang === 'ar' ? 'طوارئ ساعد: 800-SAAED (72233)' : 'SAAED Road Patrols: 800-72233'}</span>
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

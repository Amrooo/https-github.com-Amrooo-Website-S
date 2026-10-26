import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sun, 
  Moon, 
  Globe, 
  ShieldCheck, 
  Compass, 
  Award, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  Target, 
  Eye, 
  Cpu, 
  FileCheck2, 
  PhoneCall, 
  ChevronRight, 
  Layers, 
  ShieldAlert,
  Car
} from 'lucide-react';
import saaedLogo from '../saaed-logo.png';
import { SAAED_ESERVICES_URL } from '../lib/servicesRedirect';

interface AboutSaaedPageProps {
  isDark: boolean;
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  activeSection?: string;
  onActiveSectionChange?: (sectionId: string) => void;
  onLanguageChange: (newLang: 'en' | 'ar' | 'ur' | 'ru') => void;
  onThemeToggle: () => void;
  onBackToHome: () => void;
  onOpenServices?: () => void;
  onContactClick?: () => void;
}

export const AboutSaaedPage: React.FC<AboutSaaedPageProps> = ({
  isDark,
  lang,
  isRtl,
  activeSection,
  onActiveSectionChange,
  onLanguageChange,
  onThemeToggle,
  onBackToHome,
  onOpenServices,
  onContactClick
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'vision' | 'mission' | 'values'>('all');
  const [activeLeader, setActiveLeader] = useState<'all' | 'chairman' | 'ceo'>('all');

  // Parallax scroll tracking
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroBgScale = useTransform(scrollY, [0, 600], [1.05, 1.18]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, -30]);
  const heroBoxesY = useTransform(scrollY, [0, 600], [0, -45]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // IntersectionObserver to sync header tabs with current scrolling section
  useEffect(() => {
    const sectionIds = ['overview', 'vision', 'objectives', 'policy', 'leadership'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onActiveSectionChange) {
            onActiveSectionChange(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onActiveSectionChange]);

  const t = {
    crumbs: {
      home: { en: 'Home', ar: 'الرئيسية', ur: 'ہوم', ru: 'Главная' },
      about: { en: 'About SAAED', ar: 'عن ساعد', ur: 'ساعد کے بارے میں', ru: 'О компании SAAED' }
    },
    hero: {
      eyebrow: { en: 'Who we are', ar: 'من نحن', ur: 'ہم کون ہیں', ru: 'Кто мы' },
      title: { en: 'About SAAED', ar: 'عن ساعد', ur: 'عن ساعد', ru: 'О SAAED' },
      motto: { 
        en: 'National expertise… solutions that shape the future', 
        ar: 'خبرة وطنية… وحلول تصنع المستقبل',
        ur: 'قومی مہارت… مستقبل کو تشکیل دینے والے حل',
        ru: 'Национальный опыт… решения, создающие будущее'
      },
      stats: [
        { label: { en: 'Founded', ar: 'سنة التأسيس', ur: 'قیام', ru: 'Основан' }, value: '2008' },
        { label: { en: 'Emirates Covered', ar: 'تغطية اتحادية', ur: 'امارات کا احاطہ', ru: 'Эмиратов' }, value: '7 / 7' },
        { label: { en: 'Digital Response', ar: 'استجابة رقمية فورية', ur: 'ڈیجیٹل جواب', ru: 'Цифровой вызов' }, value: '100%' },
        { label: { en: 'Annual Missions', ar: 'عمليات سنوية منجزة', ur: 'سالانہ مشن', ru: 'Операций в год' }, value: '1.2M+' }
      ],
      boxes: [
        {
          badge: { en: '18+ Years Excellence', ar: '١٨ عاماً من التميز الوطني', ur: '18+ سال کی عمدگی', ru: '18+ лет лидерства' },
          title: { en: 'National Heritage & Federal Coverage', ar: 'خبرة وطنية وتغطية اتحادية شاملة', ur: 'قومی ورثہ اور وفاقی احاطہ', ru: 'Национальный опыт и федеральный охват' },
          desc: { 
            en: 'Founded in 2008 in Abu Dhabi, operating with high-readiness patrol fleets and rapid response across all 7 Emirates.', 
            ar: 'تأسست عام 2008 في إمارة أبوظبي، وتعمل دورياتنا بجاهزية فائقة واستجابة فورية على امتداد كافة إمارات الدولة السبع.',
            ur: '2008 میں ابوظہبی میں قائم کی گئی، تمام 7 امارات میں تیز رفتار فیلڈ جواب کے ساتھ فعال۔',
            ru: 'Основана в 2008 году в эмирате Абу-Даби, обеспечивает быстрое реагирование во всех 7 эмиратах.'
          },
          highlights: { en: '7 / 7 Emirates • 1.2M+ Annual Missions', ar: '٧ / ٧ إمارات • ١.٢+ مليون مهمة سنوياً', ur: '7 / 7 امارات • 1.2M+ سالانہ مشن', ru: '7 / 7 эмиратов • 1.2M+ операций' },
          icon: 'shield'
        },
        {
          badge: { en: 'Smart Mobility & AI', ar: 'تنقل ذكي وذكاء اصطناعي', ur: 'سمارٹ ٹریفک اور AI', ru: 'Умная мобильность и ИИ' },
          title: { en: 'Smart Traffic & AI Field Operations', ar: 'حلول مرورية ذكية وعمليات بالذكاء الاصطناعي', ur: 'سمارٹ فیلڈ آپریشنز', ru: 'Интеллектуальные полевые операции' },
          desc: { 
            en: 'Advanced digital accident reconstruction, smart patrol fleets, automated inspection, and predictive traffic safety analytics.', 
            ar: 'تخطيط إلكتروني متقدم للحوادث، دوريات ذكية، وأنظمة تفتيش متطورة تعزز انسيابية وأمان الطرق الاتحادية.',
            ur: 'جدید ڈیجیٹل حادثات کی تفتیش، سمارٹ پٹرول اور خودکار معائنہ۔',
            ru: 'Цифровая фиксация ДТП, умные патрули и инспекции на базе искусственного интеллекта.'
          },
          highlights: { en: '100% Digital Response • Instant E-Reports', ar: 'استجابة رقمية ١٠٠٪ • تقارير إلكترونية فورية', ur: '100% ڈیجیٹل جواب • فوری ای رپورٹس', ru: '100% цифровой отклик • Э-отчеты' },
          icon: 'cpu'
        },
        {
          badge: { en: 'Strategic Ecosystem', ar: 'شراكات حكومية تكاملية', ur: 'حکومتی شراکت داری', ru: 'Стратегическое партнерство' },
          title: { en: 'Strategic Government Partnerships', ar: 'شراكات استراتيجية مع القيادات والجهات الحكومية', ur: 'اسٹریٹجک پارٹنرشپ', ru: 'Стратегические партнерства' },
          desc: { 
            en: 'Integrated collaboration with the Ministry of Interior, Police departments, and transport authorities across the UAE.', 
            ar: 'تكامل استراتيجي مستمر مع وزارة الداخلية والقيادات العامة للشرطة وهيئات النقل لتعزيز السلامة وفق مستهدفات رؤية نحن الإمارات 2031.',
            ur: 'وزارت داخلہ اور پولیس ڈائریکٹوریٹ کے ساتھ ہم آہنگ تعاون۔',
            ru: 'Тесное взаимодействие с МВД, полицией и транспортными ведомствами ОАЭ.'
          },
          highlights: { en: 'ISO Certified • UAE Vision 2031', ar: 'اعتمادات آيزو دولية • رؤية الإمارات 2031', ur: 'آئی ایس او سرٹیفائیڈ • امارات 2031', ru: 'Стандарты ISO • ОАЭ 2031' },
          icon: 'building'
        }
      ]
    },
    overview: {
      eyebrow: { en: 'About SAAED', ar: 'عن ساعد', ur: 'عن ساعد', ru: 'О компании SAAED' },
      heading: { 
        en: 'National expertise… solutions that shape the future', 
        ar: 'خبرة وطنية… وحلول تصنع المستقبل',
        ur: 'قومی مہارت… مستقبل کو تشکیل دینے والے حل',
        ru: 'Национальный опыт… решения, создающие будущее'
      },
      p1: {
        en: 'SAAED was founded in 2008 in the Emirate of Abu Dhabi and has grown into one of the UAE’s national companies specialised in developing and operating smart solutions and services. The company delivers integrated solutions across traffic services, parking, inspection, smart systems and artificial intelligence, in partnership with government and private entities, strengthening efficiency, safety and the quality of the customer experience.',
        ar: 'تأسست ساعد عام 2008 في إمارة أبوظبي، لتصبح إحدى الشركات الوطنية المتخصصة في تطوير وتشغيل الحلول والخدمات الذكية. وتقدم الشركة حلولاً متكاملة في مجالات الخدمات المرورية، والمواقف، والتفتيش، والأنظمة الذكية والذكاء الاصطناعي، بالشراكة مع الجهات الحكومية والخاصة، بما يعزز الكفاءة والسلامة وجودة تجربة المتعاملين.',
        ur: 'ساعد 2008 میں امارت ابوظہبی میں قائم کی گئی اور متحدہ عرب امارات کی اہم قومی کمپنیوں میں سے ایک بن گئی جو سمارٹ حل اور خدمات تیار اور چلاتی ہے۔',
        ru: 'Компания SAAED была основана в 2008 году в эмирате Абу-Даби и стала одной из ведущих национальных компаний ОАЭ по разработке и управлению умными транспортными решениями и сервисами.'
      },
      p2: {
        en: 'Since its founding, SAAED has continued to develop digital solutions and smart services that harness the latest technologies and innovations in traffic, parking, inspection and smart systems, helping to raise operational efficiency, strengthen safety and improve the customer experience.',
        ar: 'منذ تأسيسها، تواصل ساعد تطوير حلول رقمية وخدمات ذكية توظف أحدث التقنيات والابتكارات في مجالات المرور والمواقف والتفتيش والأنظمة الذكية، بما يساهم في رفع الكفاءة التشغيلية، وتعزيز السلامة، وتحسين تجربة المتعاملين.',
        ur: 'اپنے قیام کے بعد سے، ساعد نے جدید ترین ٹیکنالوجی اور مصنوعی ذہانت کو بروئے کار لاتے ہوئے ٹریفک اور معائنہ کے حل کو مسلسل وسعت دی ہے۔',
        ru: 'С момента основания SAAED продолжает создавать цифровые сервисы на основе передовых технологий и ИИ в сфере безопасности дорожного движения, парковок и инспекций.'
      },
      badge: {
        en: 'GITEX Global Field Command Unit',
        ar: 'وحدة الإشراف الميداني في معرض جيتكس العالمي',
        ur: 'جائٹیکس گلوبل فیلڈ کمانڈ یونٹ',
        ru: 'Патрульная группа на GITEX Global'
      }
    },
    objectives: {
      eyebrow: { en: 'Objectives and Principles', ar: 'الأهداف والمبادئ', ur: 'مقاصد اور اصول', ru: 'Цели и принципы' },
      heading: { 
        en: 'Local ambition… a global vision', 
        ar: 'طموح محلي… برؤية عالمية',
        ur: 'مقامی عزم… عالمی وژن',
        ru: 'Местные амбиции… глобальное видение'
      },
      lead: {
        en: 'SAAED strives to develop smart systems and solutions that elevate the transport and traffic-services sector and support the journey of digital transformation and sustainability, by:',
        ar: 'تسعى ساعد إلى تطوير منظومات وحلول ذكية ترتقي بقطاع النقل والخدمات المرورية، وتدعم مسيرة التحول الرقمي والاستدامة، من خلال:',
        ur: 'ساعد سمارٹ سسٹم تیار کر کے ٹرانسپورٹ سیکٹر کو بلندیوں تک لے جانے اور ڈیجیٹل تبدیلی کو آگے بڑھانے کے لیے کوشاں ہے:',
        ru: 'SAAED стремится развивать интеллектуальные экосистемы, повышающие безопасность транспорта и ускоряющие цифровую трансформацию:'
      },
      items: [
        {
          num: '01',
          title: {
            en: 'Integrated accident-management solutions',
            ar: 'حلول متكاملة لإدارة الحوادث',
            ur: 'حادثات کے انتظام کے مربوط حل',
            ru: 'Комплексные решения по оформлению ДТП'
          },
          desc: {
            en: 'Developing integrated solutions for accident management and traffic services in line with global best practices.',
            ar: 'تطوير حلول متكاملة لإدارة الحوادث والخدمات المرورية وفق أفضل الممارسات العالمية.',
            ur: 'عالمی بہترین طریقوں کے مطابق ٹریفک اور حادثات کے انتظام کے مکمل حل۔',
            ru: 'Разработка сквозных цифровых процессов оформления аварий и координации патрулей.'
          }
        },
        {
          num: '02',
          title: {
            en: 'Transport efficiency and safety',
            ar: 'كفاءة النقل والسلامة',
            ur: 'ٹرانسپورٹ کی کارکردگی اور حفاظت',
            ru: 'Эффективность и безопасность транспорта'
          },
          desc: {
            en: 'Raising the efficiency of transport and traffic systems and strengthening safety levels.',
            ar: 'رفع كفاءة أنظمة النقل والحركة المرورية وتعزيز مستويات السلامة.',
            ur: 'ٹریفک کے نظام کی کارکردگی کو بلند کرنا اور روڈ سیفٹی کو مضبوط بنانا۔',
            ru: 'Повышение пропускной способности дорожной сети и снижение аварийности.'
          }
        },
        {
          num: '03',
          title: {
            en: 'National talent and advanced technology',
            ar: 'الكوادر الوطنية والتقنيات المتقدمة',
            ur: 'قومی قابلیت اور جدید ٹیکنالوجی',
            ru: 'Национальные кадры и высокие технологии'
          },
          desc: {
            en: 'Investing in national talent, advanced technologies and artificial intelligence.',
            ar: 'الاستثمار في الكوادر الوطنية والتقنيات المتقدمة والذكاء الاصطناعي.',
            ur: 'اماراتی نوجوانوں، جدید ٹیکنالوجی اور مصنوعی ذہانت میں سرمایہ کاری۔',
            ru: 'Инвестиции в подготовку национальных специалистов, передовые технологии и ИИ.'
          }
        },
        {
          num: '04',
          title: {
            en: 'Strategic partnerships',
            ar: 'شراكات استراتيجية',
            ur: 'اسٹریٹجک شراکت داریاں',
            ru: 'Стратегические партнерства'
          },
          desc: {
            en: 'Building strategic partnerships that support innovation, expansion and service development.',
            ar: 'بناء شراكات استراتيجية تدعم الابتكار والتوسع وتطوير الخدمات.',
            ur: 'ایسی اسٹریٹجک پارٹنرشپس قائم کرنا جو اختراع اور توسیع کی حوصلہ افزائی کریں۔',
            ru: 'Построение альянсов с государственными органами и глобальными технологическими лидерами.'
          }
        },
        {
          num: '05',
          title: {
            en: 'Regional presence and growth',
            ar: 'حضور إقليمي وتوسع',
            ur: 'علاقائی موجودگی اور توسیع',
            ru: 'Региональное присутствие и масштабирование'
          },
          desc: {
            en: 'Strengthening SAAED’s regional presence and delivering scalable solutions in new markets.',
            ar: 'تعزيز حضور ساعد إقليمياً وتقديم حلول قابلة للتوسع في أسواق جديدة.',
            ur: 'خطے میں ساعد کی ساکھ کو مضبوط بنانا اور نئی مارکیٹوں میں توسیع۔',
            ru: 'Укрепление позиций SAAED на региональном уровне и выход на новые рынки.'
          }
        }
      ]
    },
    vmv: {
      eyebrow: { en: 'Vision, Mission and Values', ar: 'الرؤية والرسالة والقيم', ur: 'وژن، مشن اور اقدار', ru: 'Видение, миссия и ценности' },
      vision: {
        num: '01',
        title: { en: 'Our Vision', ar: 'رؤيتنا', ur: 'ہمارا وژن', ru: 'Наше видение' },
        desc: {
          en: 'Leading smart ecosystems powered by data and artificial intelligence that deliver scalable value and lasting impact across sectors and markets.',
          ar: 'قيادة منظومات ذكية مدعومة بالبيانات والذكاء الاصطناعي تحقق قيمة قابلة للتوسع وأثراً مستداماً يمتد عبر القطاعات والأسواق.',
          ur: 'ڈیٹا اور مصنوعی ذہانت سے چلنے والے اسمارٹ ایکو سسٹم کی قیادت کرنا جو پائیدار اثر ڈالیں۔',
          ru: 'Лидерство в создании интеллектуальных экосистем на базе данных и искусственного интеллекта, приносящих масштабируемую ценность.'
        }
      },
      mission: {
        num: '02',
        title: { en: 'Our Mission', ar: 'رسالتنا', ur: 'ہمارا مشن', ru: 'Наша миссия' },
        desc: {
          en: 'Innovating smart ecosystems powered by data and AI, empowering stakeholders through integrated business models and effective partnerships, and creating digital solutions that enrich the human experience and generate scalable, sustainable value.',
          ar: 'ابتكار منظومات ذكية مدعومة بالبيانات والذكاء الاصطناعي، وتمكين أصحاب المصلحة عبر نماذج أعمال متكاملة وشراكات فعالة، لخلق حلول رقمية تُثري التجربة الإنسانية وتولد قيمة قابلة للتوسع والاستدامة.',
          ur: 'ڈیٹا اور اے آئی کے ذریعے سمارٹ سسٹم ایجاد کرنا، شراکت داروں کو بااختیار بنانا، اور انسان دوست ڈیجیٹل حل تخلیق کرنا۔',
          ru: 'Инновации в создании экосистем на базе ИИ, расширение возможностей партнеров через интегрированные бизнес-модели и обогащение опыта каждого гражданина.'
        }
      },
      values: {
        num: '03',
        title: { en: 'Our Corporate Values', ar: 'قيمنا المؤسسية', ur: 'ہماری ادارہ جاتی اقدار', ru: 'Корпоративные ценности' },
        items: [
          { en: 'Responsible Innovation', ar: 'الابتكار المسؤول', ur: 'ذمہ دارانہ اختراع', ru: 'Ответственные инновации' },
          { en: 'Integration & Partnerships', ar: 'التكامل والشراكات', ur: 'ہم آہنگی اور شراکت', ru: 'Интеграция и партнерство' },
          { en: 'People First', ar: 'الإنسان أولاً', ur: 'انسان پہلے', ru: 'Человек на первом месте' },
          { en: 'Empowerment', ar: 'التمكين', ur: 'بااختیار بنانا', ru: 'Расширение прав и возможностей' },
          { en: 'Data Value', ar: 'قيمة البيانات', ur: 'ڈیٹا کی قدر', ru: 'Ценность данных' },
          { en: 'Sustainable Quality', ar: 'الجودة المستدامة', ur: 'پائیدار معیار', ru: 'Устойчивое качество' }
        ]
      }
    },
    ims: {
      eyebrow: { en: 'Integrated Management System Policy', ar: 'سياسة نظام الإدارة المتكامل', ur: 'انٹیگریٹڈ مینجمنٹ پالیسی', ru: 'Политика интегрированной системы менеджмента' },
      heading: { 
        en: 'Sustainable quality… in everything we do', 
        ar: 'جودة مستدامة… في كل ما نقوم به',
        ur: 'پائیدار معیار… ہمارے ہر اقدام میں',
        ru: 'Устойчивое качество… во всем, что мы делаем'
      },
      body1: {
        en: 'SAAED for Traffic Systems is committed to achieving the highest standards of quality and excellence in developing and managing its business, ensuring a competitive and continually renewed work environment that follows local and international best practices.',
        ar: 'تلتزم شركة ساعد للأنظمة المرورية بتحقيق أعلى معايير الجودة والتميز في تطوير وإدارة أعمالها، بما يضمن بيئة عمل تنافسية ومتجددة تتبع أفضل الممارسات المحلية والعالمية.',
        ur: 'ساعد ٹریفک سسٹمز بہترین مقامی اور بین الاقوامی معیار کے مطابق اپنے کاروبار کے انتظام اور اعلیٰ ترین معیار کو برقرار رکھنے کے لیے پرعزم ہے۔',
        ru: 'Компания SAAED Traffic Systems привержена достижению высочайших стандартов качества и совершенства, создавая конкурентную и постоянно обновляющуюся рабочую среду.'
      },
      body2: {
        en: 'It strives to achieve leading levels of satisfaction and happiness among all parties concerned with its activities, in line with the direction of the wise leadership of the United Arab Emirates and reflecting its vision, mission, strategic objectives and the requirements of the Integrated Management System.',
        ar: 'إذ تسعى لتحقيق مستويات رائدة من الرضا والسعادة لكافة الفئات المعنية بأنشطتها، بما يتوافق مع توجهات الحكومة الرشيدة لدولة الإمارات العربية المتحدة، ويعبّر عن رؤيتها ورسالتها وأهدافها الاستراتيجية ومتطلبات نظام الإدارة المتكامل.',
        ur: 'یہ متحدہ عرب امارات کی دانشمندانہ قیادت کی رہنمائی کے عین مطابق تمام شہریوں اور شراکت داروں کے اطمینان اور خوشی کے اعلیٰ درجات کے حصول کے لیے کوشاں ہے۔',
        ru: 'Мы стремимся к наивысшим показателям удовлетворенности граждан в соответствии с вектором мудрого руководства ОАЭ и требованиями интегрированной системы менеджмента.'
      },
      isoList: [
        { code: 'ISO 9001', name: { en: 'Quality Management System', ar: 'نظام إدارة الجودة المعتمد' } },
        { code: 'ISO 14001', name: { en: 'Environmental Management', ar: 'نظام الإدارة البيئية والاستدامة' } },
        { code: 'ISO 45001', name: { en: 'Occupational Health & Safety', ar: 'نظام السلامة والصحة المهنية' } },
        { code: 'ISO 27001', name: { en: 'Information Security Management', ar: 'نظام إدارة أمن المعلومات والبيانات' } },
        { code: 'ISO 22301', name: { en: 'Business Continuity Resilience', ar: 'نظام إدارة استمرارية الأعمال والجاهزية' } }
      ]
    },
    leadership: {
      eyebrow: { en: 'SAAED Leadership', ar: 'قيادة ساعد', ur: 'ساعد کی قیادت', ru: 'Руководство SAAED' },
      chairman: {
        name: { en: 'Eng. Hussain Ahmed Al Harthi', ar: 'المهندس حسين أحمد الحارثي', ur: 'انجینئر حسین احمد الحارثی', ru: 'Инж. Хусейн Ахмед Аль-Харти' },
        title: { en: 'Chairman of the Board', ar: 'رئيس مجلس الإدارة', ur: 'چیئرمین بورڈ آف ڈائریکٹرز', ru: 'Председатель совета директоров' },
        speechTitle: { en: 'Chairman’s Message', ar: 'رسالة رئيس مجلس الإدارة', ur: 'چیئرمین کا پیغام', ru: 'Послание председателя' },
        quote: {
          en: 'We take pride in being a national company that delivers innovative services and smart solutions to the highest international standards across every field of security, safety and inspection, through a distinguished operating model that contributes to the UAE’s vision and strategy of ranking first globally in security, safety and well-being indicators for citizens and residents, under our wise leadership.',
          ar: 'نفخر بكوننا شركة وطنية تقدم خدماتها المبتكرة والحلول الذكية وفق أعلى المعايير العالمية في كافة مجالات الأمن والسلامة والتفتيش وفق منظومة عمل مميزة تساهم في تحقيق رؤية واستراتيجية دولة الإمارات في أن تكون الأولى عالمياً في تحقيق مؤشرات الأمن والسلامة والرفاهية للمواطنين والمقيمين في ظل قيادتنا الرشيدة.',
          ur: 'ہمیں ایک قومی کمپنی ہونے پر فخر ہے جو دانشمندانہ قیادت کے تحت سیکیورٹی، حفاظت اور معائنہ کے ہر شعبے میں اعلیٰ ترین بین الاقوامی معیارات پر مبنی سمارٹ حل فراہم کرتی ہے۔',
          ru: 'Мы гордимся тем, что являемся национальной компанией, предоставляющей инновационные услуги и интеллектуальные решения по высочайшим международным стандартам безопасности во благо процветания ОАЭ.'
        }
      },
      ceo: {
        name: { en: 'Eng. Ibrahim Yousef Ramel', ar: 'المهندس إبراهيم يوسف رمل', ur: 'انجینئر ابراہیم یوسف رمل', ru: 'Инж. Ибрагим Юсеф Рамель' },
        title: { en: 'Chief Executive Officer', ar: 'الرئيس التنفيذي', ur: 'چیف ایگزیکٹو آفیسر', ru: 'Главный исполнительный директор' },
        speechTitle: { en: 'Chief Executive’s Message', ar: 'كلمة الرئيس التنفيذي', ur: 'سی ای او کا پیغام', ru: 'Слово генерального директора' },
        quote: {
          en: 'At SAAED, we take pride in what we have achieved since our founding in 2008: rapid accomplishments, a growing presence, and a transformational impact on the smart services, solutions and systems sector in the United Arab Emirates, made possible by a team of outstanding Emirati professionals and specialist experts.\n\nGuided by our vision for the future, we continue to accelerate digital transformation and harness artificial intelligence, data and advanced technologies to enhance operational efficiency, elevate the customer experience, and develop services that are smarter, more proactive and more integrated.\n\nWe also remain committed to consolidating our leadership and sustaining the quality of our services by keeping pace with technological developments and anticipating future needs across all sectors.\n\nAt SAAED, we always strive to be a source of inspiration and to embrace an innovative, proactive approach that advances our strategic vision and meets, and indeed exceeds, the evolving expectations of our customers and partners.',
          ar: 'نفخر في ساعد بما حققناه منذ انطلاقتنا عام 2008 من إنجازات متسارعة وحضور متنامٍ، وما أحدثناه من نقلة نوعية في قطاع الخدمات والحلول والأنظمة الذكية في دولة الإمارات العربية المتحدة، وذلك بفضل فريق عمل يضم نخبة من الكفاءات والخبرات الوطنية المتخصصة.\n\nوانطلاقاً من رؤيتنا المستقبلية، نواصل تسريع التحول الرقمي وتوظيف الذكاء الاصطناعي والبيانات والتقنيات المتقدمة لتعزيز الكفاءة التشغيلية، والارتقاء بتجربة المتعاملين، وتطوير خدمات أكثر ذكاءً واستباقية وتكاملاً.\n\nكما نواصل سعينا نحو ترسيخ الريادة واستدامة جودة خدماتنا، من خلال مواكبة التطورات التقنية واستشراف الاحتياجات المستقبلية في مختلف القطاعات.\n\nوفي ساعد، نحرص دائماً على أن نكون مصدر إلهام، وأن نتبنى نهجاً مبتكراً واستباقياً يسهم في تحقيق رؤيتنا الاستراتيجية، ويلبي تطلعات المتعاملين والشركاء المتجددة، بل ويتجاوزها.',
          ur: 'ہم ساعد میں ان کامیابیوں پر فخر کرتے ہیں جو ہم نے 2008 سے حاصل کی ہیں۔ ہم مصنوعی ذہانت اور ڈیجیٹل جدت کو اپناتے ہوئے آپریشنل کارکردگی اور کسٹمر کے تجربے کو مزید بہتر بنانے کے لیے پرعزم ہیں۔',
          ru: 'В SAAED мы гордимся тем, чего достигли с 2008 года: стремительными победами, укреплением позиций и качественным прорывом в сфере интеллектуальных дорожных систем ОАЭ.'
        }
      }
    },
    cta: {
      title: { 
        en: 'Empowering the UAE’s Smart Road Network 24/7', 
        ar: 'جاهزية على مدار الساعة لخدمة شبكة الطرق الاتحادية',
        ur: '24/7 متحدہ عرب امارات کے اسمارٹ روڈ نیٹ ورک کو بااختیار بنانا',
        ru: 'Круглосуточная поддержка интеллектуальной дорожной сети ОАЭ'
      },
      desc: {
        en: 'Instant digital dispatch, accident reporting, vehicle towing and smart inspection at your fingertips across all seven Emirates.',
        ar: 'استجابة ميدانية فورية، تقارير الحوادث الذكية، مساعدة على الطريق، وخدمات التفتيش المعتمدة في كافة إمارات الدولة.',
        ur: 'تمام سات امارات میں فوری ڈیجیٹل ڈسپیچ، حادثات کی رپورٹنگ، اور گاڑیوں کی امداد۔',
        ru: 'Моментальный вызов патруля, оформление ДТП, эвакуация и смарт-инспекция во всех семи эмиратах.'
      },
      hotline: '800-SAAED (72233)',
      portfolioBtn: { en: 'Explore Services Portfolio', ar: 'محفظة الخدمات الكاملة', ur: 'خدمات کا پورٹ فولیو', ru: 'Портфолио услуг' },
      eservicesBtn: { en: 'Official E-Services Portal', ar: 'بوابة الخدمات الإلكترونية', ur: 'ای سروسز پورٹل', ru: 'Портал госуслуг' },
      backBtn: { en: 'Back to Home Portal', ar: 'العودة للبوابة الرئيسية', ur: 'مرکزی صفحہ پر واپس', ru: 'На главную' }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors duration-300 selection:bg-blue-600 selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Top Parallax Hero Section with 50% Opacity SAAED Background Image & Three Feature Boxes */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-zinc-800/80">
        
        {/* Parallax Background Layer with 50% Opacity SAAED Asset */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            style={{ y: heroBgY, scale: heroBgScale }}
            className="absolute -top-16 -left-10 -right-10 -bottom-16"
          >
            <img 
              src="/assets/about/officers-gitex.jpg" 
              alt="SAAED Operations Fleet & Field Command" 
              className="w-full h-full object-cover object-center opacity-80 dark:opacity-70 filter saturate-110 contrast-105"
            />
          </motion.div>
          
          {/* Subtle gradient overlay ensuring crystal-clear text contrast in light and dark themes */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white/70 to-slate-50 dark:from-zinc-950/60 dark:via-zinc-950/70 dark:to-zinc-950 backdrop-blur-[1px]" />
          
          {/* Subtle decorative dot pattern */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 mb-6" 
            aria-label="Breadcrumb"
          >
            <button 
              onClick={onBackToHome} 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft size={13} className={isRtl ? 'rotate-180' : ''} />
              <span>{t.crumbs.home[lang] || t.crumbs.home.en}</span>
            </button>
            <ChevronRight size={13} className={isRtl ? 'rotate-180 text-zinc-400' : 'text-zinc-400'} />
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">
              {t.crumbs.about[lang] || t.crumbs.about.en}
            </span>
          </motion.nav>

          {/* Hero Header Content with Parallax Motion */}
          <motion.div 
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/15 border border-blue-600/20 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
              <ShieldCheck size={15} />
              <span>{t.hero.eyebrow[lang] || t.hero.eyebrow.en}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              {t.hero.title[lang] || t.hero.title.en}
            </h1>

            <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 leading-snug mb-6">
              {t.hero.motto[lang] || t.hero.motto.en}
            </p>

            {/* Section Tabs below the subtitle */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 shadow-md">
              {[
                { id: 'overview', label: lang === 'ar' ? 'عن ساعد' : 'Overview' },
                { id: 'vision', label: lang === 'ar' ? 'من نحن' : 'Who We Are' },
                { id: 'objectives', label: lang === 'ar' ? 'الأهداف' : 'Objectives' },
                { id: 'policy', label: lang === 'ar' ? 'سياسة الجودة' : 'Quality Policy' },
                { id: 'leadership', label: lang === 'ar' ? 'القيادة' : 'Leadership' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (onActiveSectionChange) onActiveSectionChange(tab.id);
                    const el = document.getElementById(tab.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeSection === tab.id
                      ? 'text-blue-600 dark:text-blue-400 font-extrabold shadow-sm bg-blue-50 dark:bg-zinc-800 border border-blue-200/80 dark:border-zinc-700/80'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* The THREE BOXES in the Top Section (Frosted Glass & Parallax) */}
          <motion.div 
            style={{ y: heroBoxesY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {t.hero.boxes.map((box, idx) => (
              <div 
                key={idx}
                className="group relative backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800/90 hover:border-blue-500/60 dark:hover:border-blue-500/60 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-300/40 dark:shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                      {box.badge[lang] || box.badge.en}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 dark:from-blue-500/20 dark:to-blue-600/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {box.icon === 'shield' && <ShieldCheck size={22} />}
                      {box.icon === 'cpu' && <Cpu size={22} />}
                      {box.icon === 'building' && <Building2 size={22} />}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {box.title[lang] || box.title.en}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal mb-6">
                    {box.desc[lang] || box.desc.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-700 dark:text-zinc-200 font-extrabold">
                      {box.highlights[lang] || box.highlights.en}
                    </span>
                  </div>
                  <ChevronRight size={15} className={`text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10">
            {t.hero.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="backdrop-blur-sm bg-white/70 dark:bg-zinc-900/70 border border-slate-200/70 dark:border-zinc-800/70 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                  {stat.label[lang] || stat.label.en}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 1: About SAAED Overview & Media */}
      <section id="overview" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 text-xs font-bold tracking-wide shadow-xs">
              <Building2 size={14} className="text-blue-600 dark:text-blue-400" />
              <span>{t.overview.eyebrow[lang] || t.overview.eyebrow.en}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {t.overview.heading[lang] || t.overview.heading.en}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
              <p>{t.overview.p1[lang] || t.overview.p1.en}</p>
              <p>{t.overview.p2[lang] || t.overview.p2.en}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2.5 shadow-xs">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>{lang === 'ar' ? 'إشراف وزارة الداخلية والقيادات العامة للشرطة' : 'Supervised under Ministry of Interior & Police'}</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2.5 shadow-xs">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>{lang === 'ar' ? 'حلول الذكاء الاصطناعي والتفتيش المتطور' : 'AI Patrol Fleet & Smart Tafteesh'}</span>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl bg-slate-900">
              <img 
                src="/assets/about/officer-gitex-traffic.jpg" 
                alt="A SAAED officer directing traffic during GITEX in Dubai" 
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 inset-x-6">
                <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md inline-block mb-2">
                  {lang === 'ar' ? 'جاهزية ميدانية' : 'Field Operations'}
                </span>
                <p className="text-white text-sm sm:text-base font-bold drop-shadow-md">
                  {t.overview.badge[lang] || t.overview.badge.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Who We Are - Vision, Mission and Values */}
      <section id="vision" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-extrabold tracking-wide mb-3 border border-blue-200/50 dark:border-blue-800/50">
            <Eye size={14} className="text-blue-600 dark:text-blue-400" />
            <span>{t.vmv.eyebrow[lang] || t.vmv.eyebrow.en}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {lang === 'ar' ? 'من نحن' : lang === 'ur' ? 'ہم کون ہیں' : lang === 'ru' ? 'Кто мы' : 'Who We Are'}
          </h2>
          <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            {lang === 'ar' ? 'الرؤية والرسالة والقيم المؤسسية' : 'Our Vision, Mission and Values'}
          </p>
        </motion.div>

        <div className="space-y-12">
          
          {/* Row 1: Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 group">
              <img 
                src="/assets/about/highway-aerial.jpg" 
                alt="SAAED Vision - Aerial Highway" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 start-4 px-3 py-1 rounded-xl bg-black/60 text-white font-mono font-bold text-sm backdrop-blur-md">
                01
              </span>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {t.vmv.vision.num}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.vmv.vision.title[lang] || t.vmv.vision.title.en}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {t.vmv.vision.desc[lang] || t.vmv.vision.desc.en}
              </p>
            </div>
          </motion.div>

          {/* Row 2: Mission (Flipped Layout) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {t.vmv.mission.num}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.vmv.mission.title[lang] || t.vmv.mission.title.en}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {t.vmv.mission.desc[lang] || t.vmv.mission.desc.en}
              </p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 group">
              <img 
                src="/assets/about/control-room.jpg" 
                alt="SAAED Mission - Command Operations Room" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 start-4 px-3 py-1 rounded-xl bg-black/60 text-white font-mono font-bold text-sm backdrop-blur-md">
                02
              </span>
            </div>
          </motion.div>

          {/* Row 3: Corporate Values */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 group">
              <img 
                src="/assets/about/officers-gitex.jpg" 
                alt="SAAED Officers & Values" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 start-4 px-3 py-1 rounded-xl bg-black/60 text-white font-mono font-bold text-sm backdrop-blur-md">
                03
              </span>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  {t.vmv.values.num}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t.vmv.values.title[lang] || t.vmv.values.title.en}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {t.vmv.values.items.map((val, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex items-center gap-2.5 hover:border-blue-500 transition-colors shadow-xs"
                  >
                    <Sparkles size={16} className="text-blue-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                      {val[lang] || val.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: Strategic Objectives */}
      <section id="objectives" className="py-16 lg:py-24 bg-white dark:bg-zinc-900/60 border-y border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide mb-3">
              <Target size={14} />
              <span>{t.objectives.eyebrow[lang] || t.objectives.eyebrow.en}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {t.objectives.heading[lang] || t.objectives.heading.en}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              {t.objectives.lead[lang] || t.objectives.lead.en}
            </p>
          </motion.div>

          {/* 5 Objectives Grid matching the cloudways link */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.objectives.items.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group relative bg-slate-50 dark:bg-zinc-900 rounded-3xl p-7 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-600 dark:text-zinc-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {idx === 0 && <Compass size={18} />}
                      {idx === 1 && <TrendingUp size={18} />}
                      {idx === 2 && <Cpu size={18} />}
                      {idx === 3 && <Users size={18} />}
                      {idx === 4 && <Globe size={18} />}
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title[lang] || item.title.en}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {item.desc[lang] || item.desc.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: Integrated Management System Policy */}
      <section id="policy" className="py-16 lg:py-24 bg-gradient-to-b from-slate-100 to-white dark:from-zinc-900 dark:to-zinc-950 border-t border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-shadow"
          >
            
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide mb-3">
                <FileCheck2 size={15} />
                <span>{t.ims.eyebrow[lang] || t.ims.eyebrow.en}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                {t.ims.heading[lang] || t.ims.heading.en}
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>{t.ims.body1[lang] || t.ims.body1.en}</p>
                <p>{t.ims.body2[lang] || t.ims.body2.en}</p>
              </div>
            </div>

            {/* ISO Standards Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-4">
                {lang === 'ar' ? 'الشهادات والاعتمادات القياسية الدولية (ISO)' : 'Accredited International Standards (ISO)'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {t.ims.isoList.map((iso, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex flex-col justify-between hover:border-blue-500/50 transition-colors"
                  >
                    <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400 mb-1">
                      {iso.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300 leading-tight">
                      {iso.name[lang] || iso.name.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 5: SAAED Leadership */}
      <section id="leadership" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-bold tracking-wide mb-3">
            <Users size={14} className="text-blue-600" />
            <span>{t.leadership.eyebrow[lang] || t.leadership.eyebrow.en}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'ar' ? 'رسائل القيادة ومجلس الإدارة' : 'Messages from the Leadership'}
          </h2>
        </div>

        <div className="space-y-12">
          
          {/* Leader 1: Eng. Hussain Ahmed Al Harthi (Chairman) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-zinc-700 shadow-lg mb-4 bg-slate-100 group">
                  <img 
                    src="/assets/about/chairman-v3.jpg" 
                    alt={t.leadership.chairman.name[lang] || t.leadership.chairman.name.en}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {t.leadership.chairman.name[lang] || t.leadership.chairman.name.en}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {t.leadership.chairman.title[lang] || t.leadership.chairman.title.en}
                </p>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-4 w-fit">
                  {t.leadership.chairman.speechTitle[lang] || t.leadership.chairman.speechTitle.en}
                </div>
                <blockquote className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 leading-relaxed font-medium italic border-s-4 border-blue-600 ps-6 my-2">
                  "{t.leadership.chairman.quote[lang] || t.leadership.chairman.quote.en}"
                </blockquote>
              </div>

            </div>
          </motion.div>

          {/* Leader 2: Eng. Ibrahim Yousef Ramel (CEO) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-zinc-700 shadow-lg mb-4 bg-slate-100 group">
                  <img 
                    src="/assets/about/eng_ibrahim-1.jpg" 
                    alt={t.leadership.ceo.name[lang] || t.leadership.ceo.name.en}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {t.leadership.ceo.name[lang] || t.leadership.ceo.name.en}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {t.leadership.ceo.title[lang] || t.leadership.ceo.title.en}
                </p>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-4 w-fit">
                  {t.leadership.ceo.speechTitle[lang] || t.leadership.ceo.speechTitle.en}
                </div>
                <div className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal space-y-4 border-s-4 border-emerald-500 ps-6 my-2 whitespace-pre-line">
                  {t.leadership.ceo.quote[lang] || t.leadership.ceo.quote.en}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </section>

      {/* SECTION 6: Operational Command CTA & Dispatch */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold uppercase tracking-widest border border-blue-400/30 mb-6">
            <PhoneCall size={14} />
            <span>{t.cta.hotline}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 max-w-3xl mx-auto">
            {t.cta.title[lang] || t.cta.title.en}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.cta.desc[lang] || t.cta.desc.en}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href={SAAED_ESERVICES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#d9232a] hover:bg-red-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>{t.cta.eservicesBtn[lang] || t.cta.eservicesBtn.en}</span>
              <ExternalLink size={16} />
            </a>

            {onOpenServices && (
              <button
                onClick={onOpenServices}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>{t.cta.portfolioBtn[lang] || t.cta.portfolioBtn.en}</span>
                <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
              </button>
            )}

            <button
              onClick={onBackToHome}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm transition-all border border-white/20 cursor-pointer"
            >
              {t.cta.backBtn[lang] || t.cta.backBtn.en}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

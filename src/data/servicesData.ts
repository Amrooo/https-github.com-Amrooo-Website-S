export interface LocalizedString {
  en: string;
  ar: string;
  ur: string;
  ru: string;
}

export interface ServiceItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  badge?: LocalizedString;
  category: string;
  highlights?: LocalizedString[];
}

export interface ServiceCategory {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconName: string;
  items: ServiceItem[];
}

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: 'road_transport',
    color: '#2563eb', // Blue
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconName: 'Car',
    title: {
      en: 'Road & Transport Services',
      ar: 'خدمات الطرق والنقل',
      ur: 'سڑک اور ٹرانسپورٹ کی خدمات',
      ru: 'Дорожно-транспортные услуги'
    },
    subtitle: {
      en: 'Comprehensive traffic management, vehicle towing, accident investigation, and safety escorts.',
      ar: 'إدارة شاملة للمرور، سحب المركبات، التحقيق في الحوادث، ومرافقة السلامة.',
      ur: 'جامع ٹریفک مینجمنٹ، گاڑیوں کو کھینچنا، حادثات کی تحقیقات اور حفاظتی اسکارٹ۔',
      ru: 'Комплексное управление движением, эвакуация, расследование ДТП и сопровождение.'
    },
    items: [
      {
        id: 'acc_recon',
        category: 'road_transport',
        name: {
          en: 'Accident Reconstruction & Technical Expertise',
          ar: 'إعادة بناء الحوادث والخبرة الفنية',
          ur: 'حادثے کی تعمیر نو اور تکنیکی مہارت',
          ru: 'Реконструкция ДТП и техэкспертиза'
        },
        description: {
          en: 'Advanced mathematical 3D simulation and forensic reconstruction of traffic collisions for police and insurance authorities.',
          ar: 'المحاكاة ثلاثية الأبعاد المتقدمة وإعادة البناء الجنائي للتصادمات المرورية للشرطة وشركات التأمين.',
          ur: 'پولیس اور انشورنس حکام کے لیے ٹریفک کے تصادم کا جدید ترین 3D تخروپن اور فرانزک تعمیر نو۔',
          ru: '3D-моделирование и судебно-техническая экспертиза обстоятельств дорожно-транспортных происшествий.'
        },
        badge: { en: 'Expertise', ar: 'خبرة فنية', ur: 'ماہرانہ', ru: 'Экспертиза' }
      },
      {
        id: 'delivery_platform',
        category: 'road_transport',
        name: {
          en: 'Delivery Sector Regulatory Platform',
          ar: 'منصة تنظيم قطاع التوصيل',
          ur: 'ترسیل کے شعبے کا ریگولیٹری پلیٹ فارم',
          ru: 'Платформа регулирования сектора доставки'
        },
        description: {
          en: 'Unified digital ecosystem monitoring courier fleets, rider permits, road compliance, and safety standards.',
          ar: 'منظومة رقمية موحدة لمراقبة أساطيل التوصيل وتصاريح السائقين والامتثال المروري ومعايير السلامة.',
          ur: 'کورئیر کے بیڑے، رائیڈر پرمٹ، سڑک کی تعمیل، اور حفاظتی معیارات کی نگرانی کرنے والا ایک ڈیجیٹل ماحولیاتی نظام۔',
          ru: 'Единая цифровая платформа мониторинга курьерских служб, разрешений водителей и стандартов безопасности.'
        },
        badge: { en: 'EVG System', ar: 'نظام EVG', ur: 'EVG سسٹم', ru: 'Система EVG' }
      },
      {
        id: 'heavy_trucks',
        category: 'road_transport',
        name: {
          en: 'Escort of Heavy Trucks & Oversized Cargo',
          ar: 'مرافقة الشاحنات الثقيلة والحمولات غير الاعتيادية',
          ur: 'بھاری ٹرکوں اور بڑے سائز کے کارگو کا تخرکشک',
          ru: 'Сопровождение тяжелых грузовиков'
        },
        description: {
          en: 'Dedicated pilot patrols securing the transit of abnormal loads, oversized industrial freight, and strategic transport corridors.',
          ar: 'دوريات مرافقة مخصصة لتأمين عبور الحمولات الثقيلة والشحنات الصناعية الضخمة عبر الممرات الاستراتيجية.',
          ur: 'غیر معمولی بوجھ، صنعتی مال بردار، اور سٹریٹجک ٹرانسپورٹ کوریڈورز کی حفاظت کے لیے مخصوص پائلٹ گشت۔',
          ru: 'Специализированное патрульное сопровождение негабаритных, тяжеловесных и опасных грузов.'
        }
      },
      {
        id: 'vehicle_towing',
        category: 'road_transport',
        name: {
          en: 'Rapid Vehicle Evacuation & Towing',
          ar: 'سحب وإخلاء المركبات السريع',
          ur: 'گاڑیوں کا تیزی سے انخلاء اور کھینچنا',
          ru: 'Эвакуация транспортных средств'
        },
        description: {
          en: 'High-speed roadside clearance and towing fleet equipped with flatbeds to restore roadway throughput within minutes.',
          ar: 'أسطول متطور لسحب وإخلاء المركبات من الطرق لفتح الحركة المرورية في غضون دقائق معدودة.',
          ur: 'ہائی اسپیڈ سڑک کے کنارے کلیئرنس اور ٹوونگ فلیٹ جو منٹوں میں سڑک کو بحال کرنے کے لیے لیس ہے۔',
          ru: 'Оперативная эвакуация неисправных и поврежденных транспортных средств с автомагистралей.'
        }
      },
      {
        id: 'school_zones',
        category: 'road_transport',
        name: {
          en: 'Traffic Management in School Zones',
          ar: 'إدارة المرور في المناطق المدرسية',
          ur: 'اسکول زون میں ٹریفک مینجمنٹ',
          ru: 'Управление движением в школьных кварталах'
        },
        description: {
          en: 'Safe pedestrian routing, smart crossing supervision, and morning/afternoon peak mitigation around educational campuses.',
          ar: 'تنظيم حركة المشاة ومراقبة معابر الطلاب الذكية وتخفيف الازدحام خلال ساعات الذروة في المجمعات المدرسية.',
          ur: 'تعلیمی کیمپس کے ارد گرد محفوظ پیدل روٹنگ، سمارٹ کراسنگ کی نگرانی اور رش کے اوقات کا انتظام۔',
          ru: 'Обеспечение безопасности школьных зон, регулирование пешеходных переходов и потоков учащихся.'
        }
      },
      {
        id: 'events_traffic',
        category: 'road_transport',
        name: {
          en: 'Traffic Regulation at Exhibitions & Mega-Events',
          ar: 'تنظيم المرور في المعارض والفعاليات الكبرى',
          ur: 'نمائشوں اور بڑی تقریبات میں ٹریفک کا ضابطہ',
          ru: 'Регулирование движения на выставках и мероприятиях'
        },
        description: {
          en: 'Strategic traffic deployment, access control, VIP routing, and crowd transport plans for international conferences and expos.',
          ar: 'خطط انتشار مروري ذكية وإدارة المداخل والمخارج ومسارات كبار الشخصيات للفعاليات والمؤتمرات الدولية.',
          ur: 'بین الاقوامی کانفرنسوں اور نمائشوں کے لیے حکمت عملی سے ٹریفک کی تعیناتی اور بھیڑ کے انتظام کے منصوبے۔',
          ru: 'Организация дорожного движения, логистика посетителей и спецтранспорта на крупных форумах и шоу.'
        }
      },
      {
        id: 'road_patrols',
        category: 'road_transport',
        name: {
          en: 'Operation of Road Patrol Services',
          ar: 'تشغيل خدمات دوريات الطرق',
          ur: 'روڈ پٹرول سروسز کا آپریشن',
          ru: 'Эксплуатация дорожных патрульных служб'
        },
        description: {
          en: '24/7 proactive fleet monitoring federal and emirate road networks to assist motorists and report road obstacles.',
          ar: 'دوريات استباقية على مدار الساعة تراقب شبكات الطرق وتساعد السائقين وترصد أي عوائق في المسارات.',
          ur: '24/7 فعال فلیٹ جو ڈرائیوروں کی مدد کرنے اور سڑک کی رکاوٹوں کی اطلاع دینے کے لیے سڑکوں کی نگرانی کرتا ہے۔',
          ru: 'Круглосуточное патрулирование автодорог, оперативная помощь автомобилистам и мониторинг трафика.'
        }
      }
    ]
  },
  {
    id: 'smart_parking',
    color: '#f59e0b', // Amber / Orange
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
    iconName: 'ParkingCircle',
    title: {
      en: 'Smart Parking',
      ar: 'المواقف الذكية',
      ur: 'اسمارٹ پارکنگ',
      ru: 'Умные парковки'
    },
    subtitle: {
      en: 'Automated barrierless parking, IoT sensors, mobile payment, and smart impound lot management.',
      ar: 'مواقف ذكية بدون حواجز، مجسات إنترنت الأشياء، الدفع عبر الهاتف، وإدارة ساحات الحجز المتطورة.',
      ur: 'خودکار بیرئیر لیس پارکنگ، IoT سینسرز، موبائل ادائیگی، اور سمارٹ امپاؤنڈ لاٹ مینجمنٹ۔',
      ru: 'Автоматизированные паркинги, IoT-сенсоры, цифровая оплата и управление спецстоянками.'
    },
    items: [
      {
        id: 'parking_mgmt',
        category: 'smart_parking',
        name: {
          en: 'Smart Parking Management',
          ar: 'إدارة المواقف الذكية',
          ur: 'اسمارٹ پارکنگ کا انتظام',
          ru: 'Управление умными парковками'
        },
        description: {
          en: 'AI-driven ANPR camera occupancy detection, dynamic real-time space guidance, and frictionless automated billing.',
          ar: 'رصد إشغال المواقف بكاميرات الذكاء الاصطناعي الذكية، والتوجيه المباشر للمواقف الشاغرة والفوترة التلقائية.',
          ur: 'AI کیمرہ سے قبضے کا پتہ لگانا، ریئل ٹائم پارکنگ رہنمائی، اور خودکار بلنگ۔',
          ru: 'Комплексное управление парковочными зонами, распознавание номеров (ANPR) и динамическая навигация.'
        }
      },
      {
        id: 'parking_systems',
        category: 'smart_parking',
        name: {
          en: 'Development of Intelligent Parking Systems',
          ar: 'تطوير أنظمة المواقف الذكية',
          ur: 'ذہین پارکنگ سسٹم کی ترقی',
          ru: 'Разработка и внедрение интеллектуальных парковочных систем'
        },
        description: {
          en: 'End-to-end turnkey architectural design, hardware sensors, mobile apps, and municipal parking cloud backbones.',
          ar: 'تصميم وبناء بنية تحتية متكاملة تشمل المجسات وأجهزة الدفع وتطبيقات الهاتف وإدارة السحابة البلدية.',
          ur: 'ہارڈ ویئر سینسرز، موبائل ایپس اور میونسپل پارکنگ کلاؤڈ سسٹمز کا اختراعی ڈیزائن اور انضمام۔',
          ru: 'Проектирование и внедрение интеллектуальных систем парковки «под ключ» для городов и девелоперов.'
        }
      },
      {
        id: 'impound_lots',
        category: 'smart_parking',
        name: {
          en: 'Management of Impound Lots & Seized Yards',
          ar: 'إدارة ساحات الحجز وحفظ المركبات',
          ur: 'ضبط شدہ لاٹوں کا انتظام',
          ru: 'Управление штрафными спецстоянками'
        },
        description: {
          en: 'Digital custody lifecycle, RFID vehicle geolocation, smart gate automated release, and police integrated auditing.',
          ar: 'نظام حجز رقمي متكامل يشمل التتبع الجغرافي بتقنية RFID والإفراج الآلي عبر البوابات والربط الشرطي.',
          ur: 'ڈیجیٹل کسٹڈی لائف سائیکل، گاڑیوں کا جیو لوکیشن، اور پولیس کے ساتھ مربوط آٹومیٹڈ گیٹ ریلیز۔',
          ru: 'Цифровой учет, хранение, RFID-локализация и автоматизированный выпуск арестованных автомобилей.'
        }
      }
    ]
  },
  {
    id: 'smart_tech',
    color: '#ef4444', // Red / Rose
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    textColor: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800',
    iconName: 'Zap',
    title: {
      en: 'Smart Technologies',
      ar: 'التقنيات الذكية',
      ur: 'اسمارٹ ٹیکنالوجیز',
      ru: 'Смарт-технологии'
    },
    subtitle: {
      en: 'AI computer vision, Safe City architectures, Command & Control (C4i), TVR smart radars, and digital platforms.',
      ar: 'رؤية حاسوبية بالذكاء الاصطناعي، المدن الآمنة، مراكز القيادة والسيطرة، رادارات TVR والحلول الرقمية.',
      ur: 'AI کمپیوٹر ویژن، محفوظ شہر، کمانڈ اینڈ کنٹرول سینٹرز، TVR اسمارٹ ریڈارز، اور ڈیجیٹل پلیٹ فارمز۔',
      ru: 'Искусственный интеллект, системы Безопасный город, C4i центры, умные радары TVR и цифровые сервисы.'
    },
    items: [
      {
        id: 'saaedi_app',
        category: 'smart_tech',
        name: {
          en: 'SAAEDI Digital Platform & Service',
          ar: 'منصة وخدمة ساعدي الرقمية',
          ur: 'سعدی ڈیجیٹل سروس اور پلیٹ فارم',
          ru: 'Цифровой сервис SAAEDI'
        },
        description: {
          en: 'Flagship citizen application facilitating minor accident reporting, dispatch tracking, insurance claim filing, and real-time support.',
          ar: 'التطبيق الذكي الرائد للإبلاغ عن الحوادث البسيطة وتتبع وصول الدورية وإصدار تقارير التأمين في دقائق.',
          ur: 'معمولی حادثے کی رپورٹنگ، گشت سے باخبر رہنے اور انشورنس دعوے کی سہولت فراہم کرنے والی سرکردہ ایپ۔',
          ru: 'Мобильный сервис для ускоренного оформления мелких ДТП, трекинга патрулей и страховых полисов.'
        },
        badge: { en: 'Flagship', ar: 'رائد', ur: 'اہم سروس', ru: 'Флагман' }
      },
      {
        id: 'safe_city',
        category: 'smart_tech',
        name: {
          en: 'Safe City Infrastructure',
          ar: 'منظومة المدينة الآمنة',
          ur: 'محفوظ شہر کا بنیادی ڈھانچہ',
          ru: 'Безопасный город'
        },
        description: {
          en: 'Holistic IoT sensor grid, video analytics, emergency responder sync, and unified urban situational awareness.',
          ar: 'شبكة أجهزة استشعار متكاملة وتحليلات فيديو ذكية لربط أجهزة الطوارئ وتوفير وعي لحظي شامل بالمدينة.',
          ur: 'شہری تحفظ کے لیے جامع IoT گرڈ، ویڈیو اینالیٹکس، اور ہنگامی ردعمل کی ہم آہنگی۔',
          ru: 'Комплексная система городской безопасности, видеоаналитика и оперативная координация служб.'
        }
      },
      {
        id: 'c4i_centers',
        category: 'smart_tech',
        name: {
          en: 'Operational Command & Control Centers (C4i)',
          ar: 'مراكز القيادة والسيطرة العملياتية',
          ur: 'آپریشنل کمانڈ اور کنٹرول سینٹرز',
          ru: 'Центры оперативного командования и управления'
        },
        description: {
          en: 'Mission-critical command rooms delivering geo-spatial dispatch, automated patrol allocation, and video wall surveillance.',
          ar: 'غرف عمليات متقدمة تتيح التوجيه الجغرافي الذكي وتوزيع الدوريات آلياً ومتابعة الكاميرات في الوقت الحقيقي.',
          ur: 'جیو اسپیشل ڈسپیچ، خودکار گشت کی تقسیم اور ویڈیو وال کی نگرانی فراہم کرنے والے آپریشنل رومز۔',
          ru: 'Ситуационные центры управления ресурсами, автоматическое диспетчирование патрулей и аналитика.'
        }
      },
      {
        id: 'smart_radars',
        category: 'smart_tech',
        name: {
          en: 'Smart Radars & Video Enforcement (TVR)',
          ar: 'الرادارات الذكية ورصد الفيديو (TVR)',
          ur: 'اسمارٹ ریڈارز اور ویڈیو نفاذ (TVR)',
          ru: 'Умные радары и фотовидеофиксация (TVR)'
        },
        description: {
          en: 'Next-generation optical radars detecting tailgating, seatbelt compliance, mobile phone usage, and speed limits.',
          ar: 'رادارات بصرية من الجيل الجديد لرصد عدم ترك مسافة أمان، واستخدام الهاتف، وحزام الأمان، والسرعة.',
          ur: 'اگلی نسل کے آپٹیکل ریڈارز جو محفوظ فاصلہ، سیٹ بیلٹ، اور موبائل فون کے استعمال کی خلاف ورزیوں کو پکڑتے ہیں۔',
          ru: 'Оптические радары нового поколения: контроль скорости, дистанции, ремней безопасности и телефонов.'
        }
      },
      {
        id: 'integration_solutions',
        category: 'smart_tech',
        name: {
          en: 'Innovative Inter-Agency Integration Solutions',
          ar: 'حلول التكامل المبتكرة بين الجهات الحكومية',
          ur: 'جدید بین الادارہ جاتی انضمام کے حل',
          ru: 'Инновационные интеграционные решения'
        },
        description: {
          en: 'High-speed encrypted APIs syncing police, transport authorities, courts, and insurance federations seamlessly.',
          ar: 'واجهات برمجية مشفرة وسريعة تربط الشرطة وهيئات النقل والمحاكم وشركات التأمين بسلاسة وأمان.',
          ur: 'ہائی اسپیڈ انکرپٹڈ APIs جو پولیس، ٹرانسپورٹ حکام، عدالتوں اور انشورنس کو مربوط کرتے ہیں۔',
          ru: 'Интеграционные шлюзы и защищенные шины данных для взаимодействия министерств, судов и страховщиков.'
        }
      },
      {
        id: 'tech_security',
        category: 'smart_tech',
        name: {
          en: 'Technological Security Means & Surveillance',
          ar: 'الوسائل الأمنية التكنولوجية والمراقبة المتقدمة',
          ur: 'تکنیکی سیکورٹی کے ذرائع اور نگرانی',
          ru: 'Комплексные технологические средства безопасности'
        },
        description: {
          en: 'Perimeter protection, optical sensors, night-vision thermal cameras, and automated perimeter breach alerts.',
          ar: 'حماية المنشآت الحيوية بالمجسات البصرية والكاميرات الحرارية وأنظمة الإنذار التلقائي ضد الاختراق.',
          ur: 'حفاظتی نظام، آپٹیکل سینسرز، نائٹ ویژن کیمرے، اور خلاف ورزی کے خودکار انتباہات۔',
          ru: 'Технические средства охраны периметра, тепловизоры и предиктивное обнаружение инцидентов.'
        }
      },
      {
        id: 'ai_solutions',
        category: 'smart_tech',
        name: {
          en: 'AI Solutions & Predictive Modeling',
          ar: 'حلول الذكاء الاصطناعي والنمذجة التنبؤية',
          ur: 'AI حل اور پیشین گوئی ماڈلنگ',
          ru: 'Решения на базе ИИ (AI Solutions)'
        },
        description: {
          en: 'Machine learning algorithms forecasting high-risk accident hotspots and optimizing patrol deployment ahead of time.',
          ar: 'خوارزميات تعلم الآلة للتنبؤ بنقاط الحوادث الحرجة وتوجيه الدوريات استباقياً قبل وقوع الخطر.',
          ur: 'مشین لرننگ الگورتھم جو زیادہ خطرے والے حادثاتی مقامات کی پیشین گوئی کرتے ہیں اور گشت کو بہتر بناتے ہیں۔',
          ru: 'Предиктивные модели машинного обучения для прогнозирования зон риска и оптимизации расстановки сил.'
        }
      },
      {
        id: 'smart_gates',
        category: 'smart_tech',
        name: {
          en: 'Smart Gates & Automated Checkpoints',
          ar: 'البوابات الذكية ونقاط التفتيش المؤتمتة',
          ur: 'اسمارٹ گیٹس اور خودکار چیک پوائنٹس',
          ru: 'Умные ворота (Smart Gates)'
        },
        description: {
          en: 'Automated vehicle access corridors utilizing RFID and high-speed ANPR for logistics hubs, borders, and ports.',
          ar: 'ممرات عبور مؤتمتة للمركبات تعتمد على تقنيات قراءة اللوحات وRFID للموانئ والمناطق اللوجستية.',
          ur: 'لاجسٹک حب اور بندرگاہوں کے لیے خودکار گاڑیوں کے گیٹس اور ہائی اسپیڈ لائسنس پلیٹ ریڈرز۔',
          ru: 'Скоростные пункты пропуска и интеллектуальные ворота для логистических терминалов и портов.'
        }
      },
      {
        id: 'violation_systems',
        category: 'smart_tech',
        name: {
          en: 'Automated Violation Recording Systems',
          ar: 'أنظمة تسجيل ورصد المخالفات المؤتمتة',
          ur: 'خلاف ورزی ریکارڈنگ سسٹمز',
          ru: 'Системы фиксации нарушений'
        },
        description: {
          en: 'Edge-computed violation capture software reducing human intervention and validating evidence with timestamps.',
          ar: 'برمجيات متطورة لرصد المخالفات آلياً وتقليل التدخل البشري وتوثيق الأدلة بدقة متناهية.',
          ur: 'خلاف ورزیوں کو خودکار طریقے سے ریکارڈ کرنے اور تصویری شواہد کی توثیق کرنے والے سسٹمز۔',
          ru: 'Автоматизированные комплексы фиксации нарушений ПДД с юридически значимой доказательной базой.'
        }
      }
    ]
  },
  {
    id: 'inspection',
    color: '#8b5cf6', // Purple
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    iconName: 'Search',
    title: {
      en: 'Inspection Services',
      ar: 'خدمات التفتيش والرقابة',
      ur: 'معائنہ اور نگرانی کی خدمات',
      ru: 'Инспекционные услуги'
    },
    subtitle: {
      en: 'Field audits, school bus compliance, delivery checks, detour schemes, and residential verifications.',
      ar: 'التدقيق الميداني، فحص الحافلات المدرسية، رقابة التوصيل، مخططات التحويلات وتفتيش المناطق السكنية.',
      ur: 'فیلڈ آڈٹ، اسکول بسوں کی تعمیل، ڈیلیوری بائیک کا معائنہ، اور رہائشی تصدیق۔',
      ru: 'Полевые инспекции, контроль школьных автобусов, проверка курьеров, дорожные схемы и проверки.'
    },
    items: [
      {
        id: 'detour_schemes',
        category: 'inspection',
        name: {
          en: 'Detour & Rerouting Scheme Auditing',
          ar: 'مخططات التحويل وإعادة التوجيه المروري',
          ur: 'ڈیٹور اور ری روٹنگ کی اسکیمیں',
          ru: 'Схемы объезда и перенаправление'
        },
        description: {
          en: 'Technical verification of temporary traffic management plans around road construction projects to prevent blockages.',
          ar: 'التدقيق الفني على التحويلات المرورية المؤقتة حول مناطق المشاريع والإنشاءات لضمان انسيابية السير.',
          ur: 'تعمیراتی منصوبوں کے ارد گرد عارضی ٹریفک کے انتظام کے منصوبوں کی تکنیکی تصدیق۔',
          ru: 'Согласование и инспекция временных схем объезда мест дорожных работ для предотвращения заторов.'
        }
      },
      {
        id: 'transport_inspection',
        category: 'inspection',
        name: {
          en: 'Inspection of Transport Companies & Fleets',
          ar: 'تفتيش شركات وأساطيل النقل التجاري',
          ur: 'ٹرانسپورٹ کمپنیوں اور بیڑے کا معائنہ',
          ru: 'Инспекция транспортных компаний'
        },
        description: {
          en: 'Comprehensive audits verifying maintenance records, driver working hours, and roadworthiness compliance.',
          ar: 'تدقيق دوري على سجلات صيانة الشاحنات وساعات عمل السائقين ومطابقتها لمعايير السلامة المعتمدة.',
          ur: 'تجارتی گاڑیوں کے بیڑے کے لیے مینٹیننس ریکارڈز اور ڈرائیور کے اوقات کی جامع تصدیق۔',
          ru: 'Комплексный аудит коммерческих автопарков, техобслуживания и режима труда водителей.'
        }
      },
      {
        id: 'school_transport_ctrl',
        category: 'inspection',
        name: {
          en: 'School Transport Compliance Control',
          ar: 'الرقابة والتفتيش على النقل المدرسي',
          ur: 'سکول ٹرانسپورٹ کنٹرول اور معائنہ',
          ru: 'Контроль школьного транспорта'
        },
        description: {
          en: 'On-site bus inspection validating emergency doors, stop arms, seatbelts, surveillance cameras, and driver certifications.',
          ar: 'فحص الحافلات المدرسية والتأكد من أذرع التوقف وكاميرات المراقبة وأحزمة الأمان وتراخيص المشرفين.',
          ur: 'اسکول بسوں کے حفاظتی آلات، ہنگامی دروازوں اور ڈرائیور سرٹیفیکیشن کا سائٹ پر معائنہ۔',
          ru: 'Регулярная проверка школьных автобусов: системы видеонаблюдения, ремни, стоп-сигналы и аттестация.'
        }
      },
      {
        id: 'rak_courts',
        category: 'inspection',
        name: {
          en: 'Ras Al Khaimah Courts Inspection Partnership',
          ar: 'شراكة التفتيش مع محاكم رأس الخيمة',
          ur: 'راس الخیمہ کی عدالتوں کی معائنہ پارٹنرشپ',
          ru: 'Суды Рас-эль-Хаймы (RAK Courts)'
        },
        description: {
          en: 'Executing specialized court orders, expert traffic assessments, and evidentiary submissions for judiciary cases.',
          ar: 'تنفيذ أوامر المحاكم المتخصصة وتقديم التقارير الفنية الدقيقة للنزاعات المرورية القضائية.',
          ur: 'عدالتی مقدمات کے لیے عدالتی احکامات پر عمل درآمد اور ماہرانہ ٹریفک رپورٹس جمع کرانا۔',
          ru: 'Судебная экспертиза, предоставление заключений и выполнение постановлений судов эмирата РАК.'
        }
      },
      {
        id: 'complex_inspection',
        category: 'inspection',
        name: {
          en: 'Integrated Complex Inspection Services',
          ar: 'خدمة التفتيش الشاملة والمتكاملة',
          ur: 'پیچیدہ اور مربوط معائنہ سروس',
          ru: 'Комплексная инспекционная служба'
        },
        description: {
          en: 'Cross-functional inspection squads carrying out multi-domain audits covering safety, labor, and municipal codes.',
          ar: 'فرق تفتيش مشتركة تنفذ جولات ميدانية موحدة تشمل السلامة والالتزام المهني والاشتراطات البلدية.',
          ur: 'حفاظتی، لیبر، اور میونسپل قوانین کو ڈھانپنے والے مشترکہ معائنہ اسکواڈز۔',
          ru: 'Многопрофильные выездные инспекции, охватывающие безопасность, трудовые и городские нормы.'
        }
      },
      {
        id: 'delivery_inspection',
        category: 'inspection',
        name: {
          en: 'Delivery Sector Field Inspection',
          ar: 'التفتيش الميداني على قطاع التوصيل',
          ur: 'ترسیل کے شعبے کا فیلڈ معائنہ',
          ru: 'Инспекция сектора доставки'
        },
        description: {
          en: 'Mobile checks verifying delivery bike box temperature, rider protective gear, and traffic road adherence.',
          ar: 'تفتيش دوري على صناديق التوصيل ومعدات حماية السائقين والالتزام بمسارات الطرق المحددة.',
          ur: 'ڈیلیوری بائیک بکس کے درجہ حرارت، حفاظتی سامان اور روڈ ڈسپلن کی جانچ پڑتال۔',
          ru: 'Полевой контроль курьеров на мотоциклах: защитная экипировка, состояние термобоксов и ПДД.'
        }
      },
      {
        id: 'smart_patrols',
        category: 'inspection',
        name: {
          en: 'Smart Inspection Patrols',
          ar: 'الدوريات التفتيشية الذكية',
          ur: 'اسمارٹ معائنہ گشت',
          ru: 'Умные патрули (Smart Patrols)'
        },
        description: {
          en: 'Vehicles outfitted with 360-degree cameras, optical ANPR scanners, and instant automated violation logging.',
          ar: 'مركبات مجهزة بكاميرات 360 درجة وتقنيات المسح الضوئي للوحات ورصد المخالفات أثناء الحركة.',
          ur: 'گاڑیاں 360 ڈگری کیمروں اور آپٹیکل اسکینرز کے ساتھ فوری خلاف ورزیوں کو ریکارڈ کرنے کے لیے لیس ہیں۔',
          ru: 'Патрульные автомобили с круговыми камерами 360°, сканерами номеров и мобильной фиксацией.'
        }
      },
      {
        id: 'residential_inspection',
        category: 'inspection',
        name: {
          en: 'Residential Sector Verification & Audits',
          ar: 'التحقق والتفتيش على القطاع السكني',
          ur: 'رہائشی سیکٹر کی تصدیق اور آڈٹ',
          ru: 'Проверка жилых секторов'
        },
        description: {
          en: 'Neighborhood parking compliance, abandoned vehicle detection, and preventing obstruction of municipal services.',
          ar: 'مراقبة المواقف في الأحياء السكنية ورصد المركبات المهملة ومنع إعاقة خدمات الطوارئ والنظافة.',
          ur: 'رہائشی علاقوں میں پارکنگ کی تعمیل، لاوارث گاڑیوں کا پتہ لگانا اور میونسپل سہولت کی حفاظت۔',
          ru: 'Инспекция жилых кварталов: выявление брошенного транспорта, нарушений парковки и блокировки проездов.'
        }
      },
      {
        id: 'self_service_kiosks',
        category: 'inspection',
        name: {
          en: 'Smart Self-Service Interactive Kiosks',
          ar: 'أكشاك الخدمة الذاتية التفاعلية',
          ur: 'سمارٹ سیلف سروس انٹرایکٹو کیوسک',
          ru: 'Киоски самообслуживания'
        },
        description: {
          en: 'Touchscreen kiosks positioned in malls, government centers, and fuel stations for accident reporting and document printing.',
          ar: 'أكشاك ذكية في المراكز التجارية والجهات الحكومية لطباعة تقارير الحوادث وإنهاء المعاملات بسهولة.',
          ur: 'مالز اور پٹرول پمپوں پر ٹچ اسکرین کیوسک جہاں سے حادثات کی رپورٹ اور دستاویزات پرنٹ کی جا سکتی ہیں۔',
          ru: 'Интерактивные терминалы в ТЦ и госучреждениях для распечатки отчетов о ДТП и оплаты услуг.'
        }
      }
    ]
  },
  {
    id: 'service_centers',
    color: '#dc2626', // Red Header & Accent Theme
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    textColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800',
    iconName: 'Landmark',
    title: {
      en: 'Our Partners (Gov Services)',
      ar: 'شركاؤنا (المراكز والجهات الحكومية)',
      ur: 'ہمارے شراکت دار (سرکاری مراکز)',
      ru: 'Наши партнеры (Госцентры)'
    },
    subtitle: {
      en: 'Unified one-stop hub integrating 21+ UAE federal & local government entities and VIP service centers.',
      ar: 'منصة موحدة تضم أكثر من 21 جهة حكومية اتحادية ومحلية ومراكز خدمة لتسهيل إنجاز كافة المعاملات.',
      ur: 'ایک ہی پلیٹ فارم پر 21 سے زیادہ یو اے ای کی سرکاری ایجنسیوں اور سروس سینٹرز کا انضمام۔',
      ru: 'Единый центр государственных услуг: 21+ ведомство ОАЭ, оформление документов, виз и лицензий.'
    },
    items: [
      {
        id: 'uae_pass',
        category: 'service_centers',
        name: { en: 'UAE PASS Integration', ar: 'الهوية الرقمية (UAE PASS)', ur: 'یو اے ای پاس انضمام', ru: 'UAE PASS' },
        description: {
          en: 'Instant single sign-on identity authentication across all SAAED public and enterprise electronic services.',
          ar: 'تسجيل دخول موحد بالهوية الرقمية للوصول الفوري لكافة خدمات ساعد الإلكترونية والخدمات الحكومية.',
          ur: 'تمام SAAED سروسز کے لیے ایک ہی کلک سے قومی ڈیجیٹل شناخت کے ساتھ لاگ ان کریں۔',
          ru: 'Единая национальная цифровая идентификация для доступа ко всем госуслугам ОАЭ.'
        }
      },
      {
        id: 'icp',
        category: 'service_centers',
        name: { en: 'ICP Management (Identity & Citizenship)', ar: 'إدارة الهوية والجنسية والجمارك (ICP)', ur: 'آئی سی پی مینجمنٹ (شہریت اور پاسپورٹ)', ru: 'Управление ICP (Идентификация и гражданство)' },
        description: {
          en: 'Emirates ID renewal, residency permit processing, visa status queries, and family entry permits.',
          ar: 'تجديد بطاقة الهوية الإماراتية، معاملات الإقامة، وتأشيرات الدخول وخدمات شؤون الأجانب.',
          ur: 'اماراتی شناختی کارڈ کی تجدید، رہائشی پرمٹ، اور ویزا کی جانچ پڑتال۔',
          ru: 'Оформление Emirates ID, продление вида на жительство, визовые вопросы и таможенные сервисы.'
        }
      },
      {
        id: 'tadbeer',
        category: 'service_centers',
        name: { en: 'TAD-BEER Centers', ar: 'مراكز تدبير للعمالة المساعدة', ur: 'TAD-BEER مراکز (گھریلو ملازمین)', ru: 'Центры TAD-BEER (Домашний персонал)' },
        description: {
          en: 'Domestic worker recruitment, package sponsorship, medical fitness typing, and maid residency insurance.',
          ar: 'استقدام وتوظيف العمالة المساعدة، وإصدار عقود العمل والإقامات والتأمين المعتمد.',
          ur: 'گھریلو ملازمین کی بھرتی، اسپانسرشپ، اور میڈیکل سروسز۔',
          ru: 'Услуги по подбору, оформлению виз и контрактов для домашнего персонала в ОАЭ.'
        }
      },
      {
        id: 'tawjeeh',
        category: 'service_centers',
        name: { en: 'TAW-JEEH Centers', ar: 'مراكز توجيه للتدريب والعمال', ur: 'TAW-JEEH مراکز (رہنمائی اور تربیت)', ru: 'Центры TAW-JEEH (Ориентация работников)' },
        description: {
          en: 'Comprehensive awareness training sessions on UAE labor law, worker rights, and issuance of labor contracts.',
          ar: 'جلسات توعية وتدريب على قانون العمل الإماراتي وحقوق وواجبات العمال وتوزيع تصاريح العمل.',
          ur: 'یو اے ای لیبر قوانین پر بیداری ٹریننگ اور لیبر کنٹریکٹس کا اجراء۔',
          ru: 'Правовой инструктаж для иностранных сотрудников, выдача рабочих контрактов и обучение.'
        }
      },
      {
        id: 'tasheel',
        category: 'service_centers',
        name: { en: 'TAS-HEEL Centers (MOHRE)', ar: 'مراكز تسهيل (وزارة الموارد البشرية والتوطين)', ur: 'TAS-HEEL مراکز (وزارت محنت)', ru: 'Центры TAS-HEEL (Минтруда MOHRE)' },
        description: {
          en: 'Corporate work permit typing, quota amendments, company file creation, and labor card renewals.',
          ar: 'إصدار وتجديد تصاريح العمل للشركات، تعديل الحصص، وفتح ملفات المنشآت في وزارة العمل.',
          ur: 'ورک پرمٹ ٹائپنگ، کمپنی فائل بنانا، اور لیبر کارڈ کی تجدید۔',
          ru: 'Оформление рабочих разрешений, регистрация компаний в Минтруда и продление трудовых карт.'
        }
      },
      {
        id: 'amer',
        category: 'service_centers',
        name: { en: 'Amer Centers (GDRFA Dubai)', ar: 'مراكز آمر (الإقامة وشؤون الأجانب بدبي)', ur: 'عامر مراکز (امیگریشن دبئی)', ru: 'Центры Amer (Миграционная служба Дубая)' },
        description: {
          en: 'Dubai residency stamping, Golden Visa submissions, establishment cards, and visitor visa extensions.',
          ar: 'تثبيت الإقامات بدبي، تقديم طلبات الإقامة الذهبية، بطاقات المنشأة، وتمديد تأشيرات الزيارة.',
          ur: 'دبئی ریزیڈنسی، گولڈن ویزا کی درخواستیں، اور وزٹ ویزا کی توسیع۔',
          ru: 'Выдача и продление виз Дубая, золотые визы (Golden Visa), регистрация компаний в миграции.'
        }
      },
      {
        id: 'dubai_economy',
        category: 'service_centers',
        name: { en: 'Dubai Economy & Tourism (DET)', ar: 'اقتصادية وسياحة دبي', ur: 'دبئی کی معیشت اور سیاحت', ru: 'Экономика Дубая (DED/DET)' },
        description: {
          en: 'Commercial trade license issuance, brand name reservation, initial approvals, and commercial permits.',
          ar: 'إصدار الرخص التجارية، حجز الأسماء التجارية، الموافقات المبدئية، والتصاريح الاقتصادية.',
          ur: 'کمرشل ٹریڈ لائسنس کا اجراء، تجارتی نام کا ریزرویشن اور اجازت نامے۔',
          ru: 'Регистрация коммерческих лицензий, бронирование торговых наименований и разрешения на бизнес.'
        }
      },
      {
        id: 'moj',
        category: 'service_centers',
        name: { en: 'UAE Ministry of Justice (MoJ)', ar: 'وزارة العدل', ur: 'یو اے ای کی وزارت انصاف', ru: 'Минюст ОАЭ (Notary & Courts)' },
        description: {
          en: 'Public notary documentation, power of attorney (POA) attestation, and certified court translations.',
          ar: 'التوثيق لدى الكاتب العدل، تصديق الوكالات القانونية، والترجمة المعتمدة للمحاكم.',
          ur: 'نوٹری دستاویزات، پاور آف اٹارنی کی تصدیق اور عدالتی ترجمہ۔',
          ru: 'Нотариальные услуги, заверение доверенностей (POA), судебный и дипломатический перевод.'
        }
      },
      {
        id: 'civil_defense',
        category: 'service_centers',
        name: { en: 'Civil Defense', ar: 'الدفاع المدني', ur: 'شہری دفاع', ru: 'Гражданская защита (Civil Defense)' },
        description: {
          en: 'Fire safety certifications, building hazard approvals, vehicle safety permits, and emergency inspections.',
          ar: 'شهادات السلامة والوقاية من الحريق، واعتماد مخططات المباني، وتصاريح سلامة المركبات.',
          ur: 'فائر سیفٹی سرٹیفکیٹس، عمارت کے خطرات کی منظوری اور ہنگامی معائنہ۔',
          ru: 'Сертификация пожарной безопасности помещений, допуски спецтранспорта и инспекции.'
        }
      },
      {
        id: 'traffic_police',
        category: 'service_centers',
        name: { en: 'Traffic Police & MoI Traffic Services', ar: 'شرطة المرور وخدمات وزارة الداخلية', ur: 'ٹریفک پولیس اور وزارت داخلہ', ru: 'ГАИ (МВД ОАЭ / Traffic Police)' },
        description: {
          en: 'Vehicle ownership transfer, fine payments, driving license issuance, and export certificates.',
          ar: 'نقل ملكية المركبات، دفع المخالفات المرورية، إصدار رخص القيادة وشهادات التصدير والتحويل.',
          ur: 'گاڑی کی ملکیت کی منتقلی، جرمانوں کی ادائیگی اور ڈرائیونگ لائسنس کا اجراء۔',
          ru: 'Регистрация авто, оплата штрафов, выдача и замена водительских прав, экспортные номера.'
        }
      },
      {
        id: 'municipality',
        category: 'service_centers',
        name: { en: 'Municipalities & Town Planning', ar: 'البلديات والتخطيط العمراني', ur: 'میونسپلٹی اور شہری منصوبہ بندی', ru: 'Муниципалитет (Town Planning)' },
        description: {
          en: 'Building plan approvals, signage permits, public health compliance, and land plot certifications.',
          ar: 'اعتماد المخططات الهندسية، تصاريح اللوحات الإعلانية، وشهادات الأراضي واشتراطات الصحة العامة.',
          ur: 'بلڈنگ پلان کی منظوری، سائن بورڈ پرمٹ اور صحت عامہ کی تعمیل۔',
          ru: 'Согласование вывесок, строительные разрешения, санитарные нормы и сертификаты на землю.'
        }
      },
      {
        id: 'chamber',
        category: 'service_centers',
        name: { en: 'Chamber of Commerce', ar: 'غرفة التجارة والصناعة', ur: 'ایوان تجارت و صنعت', ru: 'Торговая палата (Chamber of Commerce)' },
        description: {
          en: 'Certificate of Origin (COO) authentication, business membership renewal, and commercial dispute mediation.',
          ar: 'تصديق شهادات المنشأ، تجديد العضوية التجارية، والوساطة في النزاعات التجارية.',
          ur: 'سرٹیفکیٹ آف اوریجن کی تصدیق، اور تجارتی رکنیت کی تجدید۔',
          ru: 'Выдача сертификатов происхождения товаров (COO), продление членства и арбитраж.'
        }
      },
      {
        id: 'saaed_eservices',
        category: 'service_centers',
        name: { en: 'SAAED E-Services Portal', ar: 'منظومة خدمات ساعد الإلكترونية', ur: 'SAAED ای سروسز پورٹل', ru: 'Э-сервисы SAAED (Digital Portal)' },
        description: {
          en: 'Direct access to accident certificates, technical inspection bookings, and corporate fleet accounts.',
          ar: 'الوصول المباشر لتقارير الحوادث، حجز الفحص الفني، وإدارة حسابات الشركات وأساطيل المركبات.',
          ur: 'حادثے کے سرٹیفکیٹس اور تکنیکی معائنہ کی بکنگ تک براہ راست رسائی۔',
          ru: 'Онлайн-портал для получения отчетов о ДТП, записи на экспертизу и личного кабинета автопарка.'
        }
      },
      {
        id: 'ehs',
        category: 'service_centers',
        name: { en: 'Ministry of Health & EHS Medical Fitness', ar: 'وزارة الصحة ووقاية المجتمع (EHS)', ur: 'وزارت صحت اور میڈیکل فٹنس', ru: 'Минздрав ОАЭ (EHS Medical Fitness)' },
        description: {
          en: 'Residency medical fitness screening typing, vaccination appointments, and health card applications.',
          ar: 'فحص اللياقة الطبية للإقامة، حجز التطعيمات، وإصدار وتجديد البطاقات الصحية المعتمدة.',
          ur: 'رہائش کے لیے میڈیکل فٹنس اسکریننگ اور ہیلتھ کارڈ کا اجراء۔',
          ru: 'Оформление медицинских тестов (Medical Fitness) для резидентов и рабочие медкарты.'
        }
      },
      {
        id: 'ejari',
        category: 'service_centers',
        name: { en: 'Ejari Tenancy Attestation', ar: 'توثيق عقود الإيجار (إيجاري)', ur: 'ایجاری کرایہ داری کی تصدیق', ru: 'Ejari (Иджари / Договоры аренды)' },
        description: {
          en: 'Official tenancy contract registration, certificate issuance, DEWA utility connection requests, and terminations.',
          ar: 'تسجيل وتوثيق عقود الإيجار السكنية والتجارية، وتوصيل خدمات المياه والكهرباء وتعديل العقود.',
          ur: 'کرایہ داری کے معاہدے کی سرکاری رجسٹریشن اور یوٹیلیٹی کنکشن کی درخواستیں۔',
          ru: 'Официальная регистрация договоров аренды жилой и коммерческой недвижимости, подключение DEWA.'
        }
      },
      {
        id: 'labor_disputes',
        category: 'service_centers',
        name: { en: 'Labor Dispute Resolutions', ar: 'تسوية وإدارة المنازعات العمالية', ur: 'مزدوروں کے تنازعات کا حل', ru: 'Трудовые споры (Labor Disputes)' },
        description: {
          en: 'Filing workplace grievances, mediation sessions between employees and sponsors, and referral to labor courts.',
          ar: 'تسجيل الشكاوى العمالية، وعقد جلسات التوفيق الودي بين العامل والمنشأة والتحويل للمحكمة.',
          ur: 'کام کی جگہ کی شکایات درج کرانا اور مزدور عدالتوں سے رجوع کرنا۔',
          ru: 'Досудебное урегулирование трудовых споров, подача жалоб и координация с судами.'
        }
      },
      {
        id: 'legal_consult',
        category: 'service_centers',
        name: { en: 'Legal Consultations & Attestation', ar: 'الاستشارات القانونية والتوثيق', ur: 'قانونی مشاورت اور تصدیق', ru: 'Юрконсультации и правовое сопровождение' },
        description: {
          en: 'Expert corporate and civil legal guidance, memorandum drafting, and Embassy document attestation.',
          ar: 'استشارات قانونية للشركات والأفراد، وصياغة العقود ومذكرات التفاهم وتصديق السفارات.',
          ur: 'ماہرانہ قانونی رہنمائی، معاہدوں کا مسودہ اور سفارت خانے سے تصدیق۔',
          ru: 'Консультации юристов, составление договоров и легализация документов в консульствах.'
        }
      },
      {
        id: 'typing_services',
        category: 'service_centers',
        name: { en: 'Government Document Typing & Printing', ar: 'خدمات الطباعة وتجهيز المعاملات', ur: 'سرکاری دستاویزات کی ٹائپنگ اور پرنٹنگ', ru: 'Печать и оформление документов' },
        description: {
          en: 'High-speed certified typing for all federal ministries, document scanning, and archival printouts.',
          ar: 'طباعة وتجهيز كافة المعاملات الحكومية الاتحادية والمحلية، والمسح الضوئي والأرشفة.',
          ur: 'تمام وفاقی وزارتوں کے لیے دستاویزات کی مصدقہ ٹائپنگ اور پرنٹنگ۔',
          ru: 'Профессиональная подготовка и заполнение форм для всех министерств и ведомств ОАЭ.'
        }
      },
      {
        id: 'insurance_hub',
        category: 'service_centers',
        name: { en: 'Motor & Health Insurance Hub', ar: 'خدمات التأمين الشامل', ur: 'موٹر اور ہیلتھ انشورنس حب', ru: 'Страхование (Motor & Health Insurance)' },
        description: {
          en: 'Instant comparison and policy issuance for vehicle comprehensive insurance, third-party liability, and health plans.',
          ar: 'إصدار ومقارنة وثائق التأمين الشامل وضد الغير للمركبات، والتأمين الصحي الإلزامي للأفراد والشركات.',
          ur: 'گاڑی اور ہیلتھ انشورنس کے لیے فوری موازنہ اور پالیسی کا اجراء۔',
          ru: 'Оформление полисов КАСКО, ОСАГО, обязательного медицинского страхования автопарков.'
        }
      },
      {
        id: 'saheli',
        category: 'service_centers',
        name: { en: 'Saheli Public Services', ar: 'منظومة سهلي للخدمات المجتمعية', ur: 'سہیلی عوامی خدمات', ru: 'Saheli (Государственные сервисы)' },
        description: {
          en: 'Facilitating quick community clearances, utility bill payments, and civil transactions in simple steps.',
          ar: 'تسهيل المعاملات المجتمعية ودفع فواتير الخدمات العامة والإجراءات الحكومية الميسرة.',
          ur: 'کمیونٹی کلیئرنس اور یوٹیلیٹی بل کی ادائیگی کو آسان بنانے والی سروس۔',
          ru: 'Сервис ускоренной оплаты счетов, коммунальных платежей и муниципальных справок.'
        }
      },
      {
        id: 'taqyeem',
        category: 'service_centers',
        name: { en: 'TAQ-YEEM Site & Labor Evaluation', ar: 'تقييم المنشآت وسكن العمال', ur: 'TAQ-YEEM لیبر اور سائٹ کی تشخیص', ru: 'Оценка TAQ-YEEM (Инспекция объектов)' },
        description: {
          en: 'Certified auditing of labor accommodations, industrial facilities, and company workforce verification.',
          ar: 'تقييم معتمد لسكن العمال والمنشآت الصناعية والتحقق الميداني من حجم العمالة والمطابقة.',
          ur: 'لیبر ہاسٹلز اور صنعتی سہولیات کی باضابطہ تصدیق اور آڈٹ۔',
          ru: 'Государственная оценка условий проживания рабочих, инспекция производств и мощностей.'
        }
      }
    ]
  }
];

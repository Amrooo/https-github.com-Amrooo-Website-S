import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Saaed18SampleSectionProps {
  isRtl?: boolean;
  lang?: string;
  isDark?: boolean;
  onReadMore?: () => void;
}

export const Saaed18SampleSection: React.FC<Saaed18SampleSectionProps> = ({
  isRtl = false,
  lang = 'en',
  isDark = false,
  onReadMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact 3D Interactive Skew & Shimmer Physics Animation from reference site
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetRy = 0;
    let targetRx = 0;
    let currentRy = 0;
    let currentRx = 0;
    let isIdle = true;
    let startTime = performance.now();
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      isIdle = false;
      targetRy = ((e.clientX - rect.left) / rect.width - 0.5) * 36;
      targetRx = -((e.clientY - rect.top) / rect.height - 0.5) * 28;
    };

    const handlePointerLeave = () => {
      isIdle = true;
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    const tick = (now: number) => {
      if (isIdle) {
        targetRy = Math.sin((now - startTime) / 1900) * 12;
        targetRx = Math.cos((now - startTime) / 2600) * 7;
      }
      currentRy += (targetRy - currentRy) * 0.08;
      currentRx += (targetRx - currentRx) * 0.08;

      el.style.setProperty('--rx', `${currentRx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${currentRy.toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(50 + currentRy * 2.4).toFixed(1)}%`);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'
      }`}
    >
      {/* Background ambient photo with gradient mask & transparency so behind is visible */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          opacity: isDark ? 0.18 : 0.12,
        }}
        aria-hidden="true"
      >
        <img 
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
          alt="SAAED background ambience" 
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left 3D "18 YRS" Typography & Right Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Pure Typography 3D "18 YRS" with interactive mouse skewing & reflection shimmer */}
          {/* Left Column: Pure Typography 3D "18 YRS" with interactive mouse skewing & reflection shimmer (Doubled Size, No Red Shadow) */}
          <div className={`lg:col-span-5 flex justify-center items-center select-none ${isRtl ? 'lg:order-2' : 'lg:order-1'}`}>
            <div 
              ref={containerRef}
              className="years3d cursor-grab active:cursor-grabbing p-2 sm:p-4 w-full max-w-[700px] flex justify-center items-center overflow-visible"
              style={{
                perspective: '1000px',
                touchAction: 'pan-y',
              }}
            >
              <div 
                className="about__years flex flex-col items-center justify-center text-center font-black leading-none overflow-visible"
                style={{
                  transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  filter: isDark 
                    ? 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.75)) drop-shadow(0 15px 30px rgba(0, 37, 154, 0.35))' 
                    : 'drop-shadow(0 20px 35px rgba(0, 37, 154, 0.22)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08))',
                }}
              >
                {/* 18 Giant Number - DOUBLED SIZE (approx. 2x) & Cleaned Shadow */}
                <span 
                  className="about__num block tracking-tighter select-none bg-clip-text whitespace-nowrap overflow-visible"
                  style={{
                    fontSize: 'clamp(9rem, 18vw, 16.5rem)',
                    lineHeight: '0.82',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    transform: 'translateZ(55px)',
                    backgroundImage: isDark
                      ? 'linear-gradient(115deg, #ffffff 0%, rgba(255,255,255,0.4) calc(var(--gx, 50%) - 18%), #ffffff var(--gx, 50%), rgba(255,255,255,0.4) calc(var(--gx, 50%) + 18%), rgba(255,255,255,0.85) 100%)'
                      : 'linear-gradient(115deg, #00259a 0%, #1b3fb5 calc(var(--gx, 50%) - 10%), #40b4e5 var(--gx, 50%), #1b3fb5 calc(var(--gx, 50%) + 10%), #00259a 100%)',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    WebkitTextStroke: isDark ? '1.5px rgba(255,255,255,0.45)' : 'none',
                  }}
                >
                  18
                </span>

                {/* YRS / عاماً Giant Sub-label */}
                <span 
                  className="about__yrs block uppercase tracking-tight select-none bg-clip-text whitespace-nowrap overflow-visible"
                  style={{
                    fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                    lineHeight: '0.9',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    transform: 'translateZ(95px)',
                    marginTop: '-0.05em',
                    backgroundImage: isDark
                      ? 'linear-gradient(115deg, #ffffff 0%, #e2e8f0 var(--gx, 50%), #94a3b8 100%)'
                      : 'linear-gradient(115deg, #0f172a 0%, #334155 var(--gx, 50%), #0f172a 100%)',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  {lang === 'ar' ? 'عاماً' : 'YRS'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy matching reference site & 18 Years Empowering Safety & Mobility Across the UAE */}
          <div className={`lg:col-span-7 flex flex-col justify-center ${isRtl ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
            
            {/* Eyebrow / Category Tag with red vertical accent bar */}
            <div className={`flex items-center gap-2.5 mb-4 ${isRtl ? 'flex-row' : 'flex-row'}`}>
              <span className="w-1.5 h-6 bg-[#d9232a] inline-block shrink-0 rounded-full" />
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#d9232a] dark:text-red-400">
                {lang === 'ar' 
                  ? 'التكنولوجيا والخدمات المبتكرة' 
                  : lang === 'ur'
                  ? 'ٹیکنالوجی اور جدید خدمات'
                  : lang === 'ru'
                  ? 'ТЕХНОЛОГИИ И ИННОВАЦИОННЫЕ УСЛУГИ'
                  : 'Technology and innovative services'}
              </p>
            </div>

            {/* Main Headline: 18 Years Empowering Safety & Mobility Across the UAE */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight leading-[1.14] mb-3 text-zinc-900 dark:text-white">
              {lang === 'ar' ? (
                <>
                  <span className="text-[#d9232a] dark:text-red-500">18 عاماً</span> في تمكين السلامة والتنقل في الإمارات
                </>
              ) : lang === 'ur' ? (
                <>
                  <span className="text-[#d9232a] dark:text-red-500">18 Years</span> Empowering Safety & Mobility Across the UAE
                </>
              ) : lang === 'ru' ? (
                <>
                  <span className="text-[#d9232a] dark:text-red-500">18 лет</span> обеспечения безопасности и мобильности в ОАЭ
                </>
              ) : (
                <>
                  <span className="text-[#d9232a] dark:text-red-500">18 Years</span> Empowering Safety & Mobility Across the UAE
                </>
              )}
            </h2>

            {/* Sub-headline: Advanced technology... for smarter, safer services */}
            <p className="text-xl sm:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-6 leading-snug">
              {lang === 'ar'
                ? 'تقنيات متقدمة… لخدمات أكثر ذكاءً وأماناً'
                : lang === 'ur'
                ? 'ہوشیار اور محفوظ خدمات کے لیے جدید ٹیکنالوجی'
                : lang === 'ru'
                ? 'Передовые технологии… для более умных и безопасных услуг'
                : 'Advanced technology… for smarter, safer services'}
            </p>

            {/* Lead Description paragraph */}
            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal">
              {lang === 'ar' 
                ? 'منذ تأسيسها عام 2008، تواصل ساعد تطوير حلول رقمية وخدمات ذكية تسخر أحدث التقنيات والابتكارات في مجالات المرور والمواقف والتفتيش والأنظمة الذكية، مما يساهم في رفع الكفاءة التشغيلية وتعزيز السلامة وتحسين تجربة المتعاملين.'
                : lang === 'ur'
                ? '2008 میں اپنے قیام کے بعد سے، SAAED نے ٹریفک، پارکنگ، معائنہ اور سمارٹ سسٹمز میں جدید ترین ٹیکنالوجیز کو بروئے کار لانے والے ڈیجیٹل حل اور سمارٹ خدمات تیار کرنا جاری رکھا ہے۔'
                : lang === 'ru'
                ? 'С момента своего основания в 2008 году SAAED продолжает разрабатывать цифровые решения и интеллектуальные сервисы, использующие новейшие технологии в области дорожного движения, парковки и инспекции.'
                : 'Since its founding in 2008, SAAED has continued to develop digital solutions and smart services that harness the latest technologies and innovations in traffic, parking, inspection and smart systems, helping to raise operational efficiency, strengthen safety and improve the customer experience.'}
            </p>

            {/* Button: Read more about SAAED with smooth hover animation */}
            <div>
              <motion.button
                onClick={onReadMore}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden bg-transparent hover:bg-zinc-900/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white font-bold text-base px-8 py-3.5 rounded-full inline-flex items-center gap-3 transition-all duration-300 border-2 border-zinc-900 dark:border-white shadow-sm hover:shadow-lg cursor-pointer"
              >
                <span>
                  {lang === 'ar' 
                    ? 'اقرأ المزيد عن ساعد' 
                    : lang === 'ur' 
                    ? 'SAAED کے بارے میں مزید پڑھیں' 
                    : lang === 'ru' 
                    ? 'Узнать больше о SAAED' 
                    : 'Read more about SAAED'}
                </span>

                <span className="flex items-center justify-center p-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 group-hover:bg-[#d9232a] group-hover:text-white transition-colors duration-300">
                  {isRtl ? (
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  ) : (
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </span>
              </motion.button>
            </div>

          </div>

        </div>

        {/* Bottom Stats Row: 4 Columns with Thin Vertical Dividers exactly like reference site */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x dark:divide-zinc-800 divide-zinc-200">
            
            {/* Stat 1: Year founded */}
            <li className={`pt-4 md:pt-0 ${isRtl ? 'md:px-8 text-right' : 'md:px-8 text-left'}`}>
              <span className="block text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                2008
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {lang === 'ar' ? 'عام التأسيس' : 'Year founded'}
              </span>
            </li>

            {/* Stat 2: Strategic partners */}
            <li className={`pt-4 md:pt-0 ${isRtl ? 'md:px-8 text-right' : 'md:px-8 text-left'}`}>
              <span className="block text-4xl sm:text-5xl font-black text-[#d9232a] dark:text-red-500 tracking-tight mb-2">
                28+
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {lang === 'ar' ? 'شركاء استراتيجيون' : 'Strategic partners'}
              </span>
            </li>

            {/* Stat 3: Innovative services and solutions */}
            <li className={`pt-4 md:pt-0 ${isRtl ? 'md:px-8 text-right' : 'md:px-8 text-left'}`}>
              <span className="block text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                37+
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {lang === 'ar' ? 'خدمة وحل مبتكر' : 'Innovative services and solutions'}
              </span>
            </li>

            {/* Stat 4: Transactions completed */}
            <li className={`pt-4 md:pt-0 ${isRtl ? 'md:px-8 text-right' : 'md:px-8 text-left'}`}>
              <span className="block text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                30M+
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {lang === 'ar' ? 'معاملة منجزة' : 'Transactions completed'}
              </span>
            </li>

          </ul>
        </div>

      </div>
    </motion.section>
  );
};

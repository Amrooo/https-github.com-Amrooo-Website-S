import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Sparkles, Check, Zap, ExternalLink, ArrowRight, ArrowLeft, PhoneCall, MapPin } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../data/servicesData';
import { ServicePDFIcon } from './ServicePDFAssets';
import { getServiceRedirectionUrl } from '../lib/servicesRedirect';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  category: ServiceCategory | null;
  lang: 'en' | 'ar' | 'ur' | 'ru';
  isRtl: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  category,
  lang,
  isRtl,
  onClose,
  onContactClick
}) => {
  const [demoInput, setDemoInput] = useState('');
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  if (!service) return null;

  const handleExecuteDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    setIsDemoSubmitting(true);
    setTimeout(() => {
      setIsDemoSubmitting(false);
      setDemoSuccess(true);
    }, 1100);
  };

  const t = {
    portalTag: {
      en: 'SAAED & Police Smart Portal',
      ar: 'بوابة ساعد والشرطة الذكية',
      ur: 'ساعد اور پولیس اسمارٹ پورٹل',
      ru: 'Смарт-портаل SAAED и полиции'
    },
    defaultCategory: {
      en: 'Smart Service Hub',
      ar: 'منظومة الخدمات الذكية',
      ur: 'اسمارٹ سروس حب',
      ru: 'Смарт-сервис хаб'
    },
    turnaroundTime: {
      en: 'Turnaround Time',
      ar: 'الوقت المستغرق',
      ur: 'ٹرن اراؤنڈ کا وقت',
      ru: 'Срок выполнения'
    },
    turnaroundVal: {
      en: 'Instant / 100% Digital',
      ar: 'فوري / 100% رقمي',
      ur: 'فوری / 100% ڈیجیٹل',
      ru: 'Мгновенно / 100% Цифровой'
    },
    channel: {
      en: 'Delivery Channel',
      ar: 'القناة',
      ur: 'ڈیلیوری چینل',
      ru: 'Канал обслуживания'
    },
    channelVal: {
      en: '100% Digital',
      ar: 'رقمي 100%',
      ur: '100% ڈیجیٹل',
      ru: '100% Цифровой'
    },
    govtFee: {
      en: 'Govt Fee',
      ar: 'رسوم الخدمة',
      ur: 'سرکاری فیس',
      ru: 'Гос. тариф'
    },
    govtFeeVal: {
      en: 'Standard Tariff',
      ar: 'حسب اللائحة',
      ur: 'معیاری ٹیرف',
      ru: 'Стандартный тариф'
    },
    overviewTitle: {
      en: 'Service Overview',
      ar: 'تفاصيل الخدمة',
      ur: 'سروس کا جائزہ',
      ru: 'Обзор услуги'
    },
    reqTitle: {
      en: 'Mandatory Requirements',
      ar: 'المتطلبات والمستندات المطلوبة',
      ur: 'لازمی ضروریات',
      ru: 'Обязательные требования'
    },
    inquireTitle: {
      en: 'Direct Service Submission',
      ar: 'بدء المعاملة الرقمية السريعة',
      ur: 'براہ راست اسمارٹ جمع کروائیں',
      ru: 'Мгновенная отправка заявки'
    },
    inputLabel: {
      en: 'Emirates ID, Vehicle Plate No, or Traffic File',
      ar: 'رقم اللوحة المرورية، الهوية الإماراتية، أو الملف المروري',
      ur: 'ایمریٹس آئی ڈی یا پلیٹ نمبر',
      ru: 'Номер Emirates ID или номер авто'
    },
    inputPlaceholder: {
      en: 'e.g. Dubai - Plate A 12345 / 784-1990-1234567-1',
      ar: 'مثال: دبي A 12345 / 784-1990-1234567-1',
      ur: 'مثال: 784-1990-1234567-1',
      ru: 'Пример: 784-1990-1234567-1'
    },
    submitBtn: {
      en: 'Verify & Process Service',
      ar: 'تحقق وبدء المعاملة الفورية',
      ur: 'تصدیق کریں اور آگے بڑھیں',
      ru: 'Проверить и отправить'
    },
    submitting: {
      en: 'Connecting to Police & SAAED Gateway...',
      ar: 'جاري التحقق الفوري مع الأنظمة الرسمية...',
      ur: 'ساعد اور پولیس سسٹمز سے منسلک ہو رہا ہے...',
      ru: 'Соединение со шлюзом полиции и SAAED...'
    },
    successTitle: {
      en: 'Application Verified & Submitted Successfully!',
      ar: 'تم استلام طلبك والتحقق بنجاح!',
      ur: 'درخواست کا تصدیق شدہ موصولہ!',
      ru: 'Запрос успешно получен и подтвержден!'
    },
    successRef: {
      en: 'Ref Code: DP-SAAED-2026-98174. Dispatched to Police & SAAED Operations Command.',
      ar: 'رقم المعاملة المرجعي: DP-SAAED-2026-98174. تم الإرسال إلى مركز العمليات المشترك لشرطة دبي وساعد.',
      ur: 'ریفرینس کوڈ: DP-SAAED-2026-98174',
      ru: 'Код ссылки: DP-SAAED-2026-98174'
    },
    closeBtn: {
      en: 'Close',
      ar: 'إغلاق',
      ur: 'بند کریں',
      ru: 'Закрыть'
    },
    continueBtn: {
      en: 'Continue to Portal Execution',
      ar: 'الانتقال للخدمة المباشرة',
      ur: 'سروس جاری رکھیں',
      ru: 'Перейти к выполнению'
    }
  };

  const catTitle = category?.title[lang] || t.defaultCategory[lang];

  const reqList = (service as any).requirements?.[lang] || [
    isRtl ? 'هوية إماراتية سارية المفعول' : 'Valid Emirates ID',
    isRtl ? 'رقم ملف مروري مسجل بدولة الإمارات' : 'Registered UAE Traffic File Number',
    isRtl ? 'ملكية المركبة الفعالة (عند الطلب)' : 'Active Vehicle Registration (Mulkiya)'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-10 my-8 ${
            isRtl ? 'text-right' : 'text-left'
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Top Banner with Dubai Police & SAAED Color Gradient & Radial Pattern */}
          <div 
            className="bg-gradient-to-r from-[#00573D] via-[#064e3b] to-[#043327] p-6 sm:p-8 text-white relative overflow-hidden shrink-0"
          >
            {/* Background Radial Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            <button
              onClick={onClose}
              className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20`}
              aria-label={t.closeBtn[lang]}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/20">
                {t.portalTag[lang]}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-400 text-emerald-950">
                {catTitle}
              </span>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner p-2">
                <ServicePDFIcon serviceId={service.id} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {service.name[lang]}
                </h3>
                <p className="text-sm text-emerald-100/90 mt-1">
                  {catTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* 3-Column Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-center">
              <div>
                <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {t.turnaroundTime[lang]}
                </div>
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {(service as any).timeEstimate?.[lang] || t.turnaroundVal[lang]}
                </div>
              </div>
              <div className="border-x border-zinc-200 dark:border-zinc-700/60">
                <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {t.channel[lang]}
                </div>
                <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5">
                  {t.channelVal[lang]}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {t.govtFee[lang]}
                </div>
                <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5">
                  {t.govtFeeVal[lang]}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                {t.overviewTitle[lang]}
              </h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {service.description[lang]}
              </p>
            </div>

            {/* Mandatory Requirements Checklist */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                {t.reqTitle[lang]}
              </h4>
              <div className="space-y-2">
                {reqList.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Instant Inquiry / Submission Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40">
              <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                <span>{t.inquireTitle[lang]}</span>
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
                      {t.successTitle[lang]}
                    </div>
                    <div className="opacity-90 mt-0.5">
                      {t.successRef[lang]}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleExecuteDemo} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      {t.inputLabel[lang]}
                    </label>
                    <input
                      type="text"
                      required
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder={t.inputPlaceholder[lang]}
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
                          <span>{t.submitting[lang]}</span>
                        </>
                      ) : (
                        <>
                          <Zap size={14} />
                          <span>{t.submitBtn[lang]}</span>
                        </>
                      )}
                    </button>

                    {onContactClick && (
                      <button
                        type="button"
                        onClick={() => {
                          onContactClick();
                          onClose();
                        }}
                        className="py-2.5 px-4 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{isRtl ? 'تواصل معنا' : 'Contact Support'}</span>
                        <ExternalLink size={13} />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Official Hotlines Contact matching Most In-Demand Smart Services */}
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <PhoneCall size={14} className="text-emerald-600" />
                <span>{isRtl ? 'خدمة المتعاملين (غير طارئ): 901' : 'Dubai Police Call Center: 901'}</span>
              </div>
              <div>
                <span>{isRtl ? 'طوارئ ساعد: 800-SAAED (72233)' : 'SAAED Road Patrols: 800-72233'}</span>
              </div>
            </div>

            {/* Official SAAED Portal Redirection Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getServiceRedirectionUrl(service.id, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRtl ? 'فتح في بوابة ساعد الرسمية' : 'Open in Official SAAED Portal'}</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-emerald-600 text-white rounded-xl px-5 py-3 text-xs font-bold hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <span>{t.continueBtn[lang]}</span>
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


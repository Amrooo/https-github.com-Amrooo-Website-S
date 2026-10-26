import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollAnimatedIndicatorProps {
  lang: 'en' | 'ar' | 'ur' | 'ru';
  targetId?: string;
}

export const ScrollAnimatedIndicator: React.FC<ScrollAnimatedIndicatorProps> = ({ 
  lang, 
  targetId = 'operations-hub' 
}) => {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 550, behavior: 'smooth' });
    }
  };

  const labels = {
    en: 'Scroll to explore',
    ar: 'مرر للاستكشاف',
    ur: 'دریافت کرنے کیلئے اسکرول کریں',
    ru: 'Прокрутите для обзора'
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none">
      <motion.button
        onClick={handleScroll}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
        aria-label={labels[lang]}
      >
        {/* Animated Mouse Body */}
        <div className="relative w-6 h-10 rounded-full border-2 border-zinc-400/80 dark:border-blue-500 p-1 flex justify-center group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-white/80 dark:bg-blue-950/40 backdrop-blur-sm">
          {/* Animated Scroll Wheel Dot */}
          <motion.div
            animate={{
              y: [0, 14, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut'
            }}
            className="w-1.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm dark:shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          />
        </div>

        {/* Pulsing Downward Chevrons */}
        <div className="flex flex-col items-center -space-y-2 text-zinc-400 dark:text-blue-400 group-hover:text-blue-500 transition-colors">
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} strokeWidth={2.5} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Text Label */}
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
          {labels[lang]}
        </span>
      </motion.button>
    </div>
  );
};

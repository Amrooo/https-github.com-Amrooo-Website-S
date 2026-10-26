import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isRtl: boolean;
}

export function AnimatedCounter({ value, suffix, isRtl }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="inline-flex items-center justify-center" dir={isRtl ? 'rtl' : 'ltr'} aria-live="polite" aria-label={`${value} ${suffix}`}>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

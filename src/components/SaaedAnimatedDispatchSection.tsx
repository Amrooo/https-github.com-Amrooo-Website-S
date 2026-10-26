import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  PhoneCall, 
  Radio
} from 'lucide-react';

interface SaaedAnimatedDispatchSectionProps {
  lang?: string;
  isDark?: boolean;
}

export const SaaedAnimatedDispatchSection: React.FC<SaaedAnimatedDispatchSectionProps> = ({
  lang = 'en',
  isDark = true,
}) => {
  const isRtl = lang === 'ar' || lang === 'ur';
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse hover coordinates relative to container (-1 to 1)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll tracking within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth springs for mouse interaction
  const smoothMouseX = useSpring(mousePos.x, { damping: 20, stiffness: 120 });
  const smoothMouseY = useSpring(mousePos.y, { damping: 20, stiffness: 120 });

  // Combined Motion: Mouse + Scroll
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] overflow-hidden my-10 select-none border-y border-emerald-950/40 bg-zinc-950 flex flex-col justify-between"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 1. FIXED BACKGROUND: Dubai Skyline with "SMART SECURE TOGETHER" */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('/assets/aistudio/Gemini_Generated_Image_qk0cwwqk0cwwqk0c_6f8ab434.jpeg')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center 20%',
          filter: 'brightness(1.02) contrast(1.08)'
        }}
      />

      {/* Atmospheric Overlays: Dark vignette & Emerald Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-transparent to-zinc-950/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60 pointer-events-none" />
      
      {/* Dynamic Ambient Headlight / Beacon Shimmer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${60 + mousePos.y * 15}%, rgba(16, 185, 129, 0.15), transparent 70%)`
        }}
      />

      {/* 2. TOP BANNER / HEADER: Quick Hotlines */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex justify-center md:justify-end">
        {/* Quick Direct Hotline Badges */}
        <div className="flex flex-row items-center gap-3 shrink-0">
          <a
            href="tel:999"
            className="px-5 py-3 rounded-2xl bg-red-600/90 hover:bg-red-600 text-white font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all border border-red-400/50 backdrop-blur-sm cursor-pointer"
          >
            <PhoneCall size={17} />
            <span>{isRtl ? 'طوارئ الشرطة 999' : 'Police Emergency 999'}</span>
          </a>

          <a
            href="tel:80072233"
            className="px-5 py-3 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all border border-blue-400/50 backdrop-blur-sm cursor-pointer"
          >
            <Radio size={17} />
            <span>{isRtl ? 'مركز ساعد 800-72233' : 'SAAED Center 800-SAAED'}</span>
          </a>
        </div>
      </div>

      {/* 3. FOREGROUND ANIMATED PATROL CAR & ROBOT LYNX M20 (UNCROPPED, NATURAL POSITIONING) */}
      <div className="relative z-20 w-full h-44 sm:h-56 lg:h-68 pointer-events-none mt-auto flex justify-center items-end pb-3 sm:pb-5">
        <div className="relative w-full max-w-4xl h-full flex justify-center items-end">
          
          {/* CENTER-LEFT: SAAED PATROL SUV (Fixed in position) */}
          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-[calc(50%-180px)] sm:left-[calc(50%-240px)] lg:left-[calc(50%-300px)] w-[210px] sm:w-[280px] lg:w-[370px] origin-bottom-center">
            {/* Tarmac shadow */}
            <div className="absolute -bottom-1 left-6 right-6 h-4 bg-black/80 blur-md rounded-full -z-10" />
            
            {/* Futuristic SAAED Police SUV (Clear, crisp, uncropped wheels) */}
            <img
              src="/assets/aistudio/Futuristic_SAAED_Police_SUV_Render_ac47e06e.png"
              alt="Futuristic SAAED Police SUV"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain opacity-75 brightness-85 contrast-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />

            {/* Emergency Lights Glow Halo */}
            <div className="absolute top-[2%] left-[40%] w-10 h-4 rounded-full bg-red-500/35 blur-md animate-pulse pointer-events-none" />
            <div className="absolute top-[2%] left-[55%] w-10 h-4 rounded-full bg-blue-500/35 blur-md animate-pulse pointer-events-none" />
          </div>

          {/* CENTER-RIGHT: AUTONOMOUS PATROL ROBOT LYNX M20 (Fixed in position) */}
          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-[calc(50%+35px)] sm:left-[calc(50%+55px)] lg:left-[calc(50%+75px)] w-[58px] sm:w-[78px] lg:w-[100px] origin-bottom-center">
            {/* Ground reflection shadow */}
            <div className="absolute -bottom-1 left-2 right-2 h-2 bg-black/90 blur-md rounded-full -z-10" />

            {/* Blue Ambient Neon Light Glow Effect matching background */}
            <div className="absolute -inset-3 rounded-full bg-cyan-500/30 blur-lg animate-pulse pointer-events-none -z-10" />
            <div className="absolute top-[10%] -left-2 w-8 h-8 rounded-full bg-blue-600/40 blur-md pointer-events-none -z-10" />

            {/* Authentic Robot Lynx M20 with Blue Lighting Touch */}
            <img
              src="/assets/aistudio/lynx_m20_robot.png"
              alt="ROBOT Lynx M20 Autonomous Security Patrol Unit"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain opacity-80 brightness-90 contrast-105 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            />

            {/* Forward AI Optical Sensor Blue Light Glow */}
            <div className="absolute top-[18%] left-[18%] w-3 h-3 rounded-full bg-blue-400/70 blur-xs animate-pulse pointer-events-none" />
            <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping pointer-events-none" />

            {/* Telemetry Battery / Power Indicator LEDs */}
            <div className="absolute top-[24%] left-[53%] w-1 h-1 rounded-full bg-cyan-400/80 blur-[1px] animate-pulse pointer-events-none" />
            <div className="absolute top-[26%] left-[66%] w-1 h-1 rounded-full bg-blue-400/80 blur-[1px] animate-pulse pointer-events-none" />

            {/* Rear Warning Beacon (Blue/Cyan Flasher) */}
            <div className="absolute top-[14%] right-[22%] w-2 h-2 rounded-full bg-blue-500/80 blur-xs animate-ping pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SaaedAnimatedDispatchSection;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../translations';
import { 
  Accessibility, 
  X, 
  Type, 
  Link as LinkIcon, 
  Plus, 
  Minus, 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  AlignJustify,
  Maximize2,
  Minimize2,
  RotateCcw,
  Languages,
  User,
  Settings2,
  Hand,
  Check,
  EyeOff,
  Activity,
  Zap,
  Eye,
  BookOpen
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  lineSpacing: number;
  letterSpacing: number;
  isSimpleFont: boolean;
  highlightLinks: boolean;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  isGrayscale: boolean;
  highContrast: boolean;
  isSeizureSafe: boolean;
  isAdhdFriendly: boolean;
  isCognitiveFriendly: boolean;
  isSignLanguageActive: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  lineSpacing: 1.5,
  letterSpacing: 0,
  isSimpleFont: false,
  highlightLinks: false,
  textAlign: 'left',
  isGrayscale: false,
  highContrast: false,
  isSeizureSafe: false,
  isAdhdFriendly: false,
  isCognitiveFriendly: false,
  isSignLanguageActive: false,
};

export const AccessibilityWidget: React.FC<{ isRtl?: boolean }> = ({ isRtl = false }) => {
  const t = isRtl ? translations.ar.accessibility : translations.en.accessibility;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tools' | 'profiles' | 'translate'>('tools');
  const [showSignLanguage, setShowSignLanguage] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font Size
    root.style.fontSize = `${s.fontSize}%`;
    
    // Line Spacing
    root.style.lineHeight = `${s.lineSpacing}`;
    
    // Letter Spacing
    root.style.letterSpacing = `${s.letterSpacing}px`;
    
    // Text Align
    root.style.textAlign = s.textAlign;
    
    // Simple Font
    if (s.isSimpleFont) {
      root.classList.add('accessibility-simple-font');
    } else {
      root.classList.remove('accessibility-simple-font');
    }
    
    // Highlight Links
    if (s.highlightLinks) {
      root.classList.add('accessibility-highlight-links');
    } else {
      root.classList.remove('accessibility-highlight-links');
    }

    // Grayscale
    if (s.isGrayscale) {
      root.style.filter = 'grayscale(100%)';
    } else {
      root.style.filter = 'none';
    }

    // High Contrast
    if (s.highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    // Seizure Safe
    if (s.isSeizureSafe) {
      root.classList.add('accessibility-seizure-safe');
    } else {
      root.classList.remove('accessibility-seizure-safe');
    }

    // ADHD Friendly
    if (s.isAdhdFriendly) {
      root.classList.add('accessibility-adhd-friendly');
    } else {
      root.classList.remove('accessibility-adhd-friendly');
    }

    // Cognitive Friendly
    if (s.isCognitiveFriendly) {
      root.classList.add('accessibility-cognitive-friendly');
    } else {
      root.classList.remove('accessibility-cognitive-friendly');
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setShowSignLanguage(false);
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const applyProfile = (profileId: string) => {
    const newSettings = { ...defaultSettings };
    switch (profileId) {
      case 'blind':
        newSettings.fontSize = 150;
        newSettings.highContrast = true;
        newSettings.highlightLinks = true;
        break;
      case 'motor':
        newSettings.letterSpacing = 2;
        newSettings.lineSpacing = 2;
        break;
      case 'cognitive':
        newSettings.isCognitiveFriendly = true;
        newSettings.isSimpleFont = true;
        break;
      case 'adhd':
        newSettings.isAdhdFriendly = true;
        newSettings.isSimpleFont = true;
        break;
      case 'seizure':
        newSettings.isSeizureSafe = true;
        break;
      case 'dyslexia':
        newSettings.isSimpleFont = true;
        newSettings.letterSpacing = 1;
        break;
      case 'colorblind':
        newSettings.isGrayscale = true;
        break;
    }
    setSettings(newSettings);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[9999] w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 transition-all duration-300 group cursor-pointer`}
        aria-label="Open accessibility settings panel"
      >
        <Accessibility size={28} className="relative z-10" />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className={`fixed inset-0 z-[10000] flex items-start justify-start p-4 pointer-events-none`}>
            <motion.div
              initial={{ x: -400, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -400, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden border border-zinc-200 dark:border-zinc-800 pointer-events-auto h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Settings2 size={20} />
                  <span className="font-bold tracking-tight">{t.title}</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 m-4 rounded-2xl">
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'tools' 
                      ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <Settings2 size={18} />
                  {t.tools}
                </button>
                <button
                  onClick={() => setActiveTab('profiles')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'profiles' 
                      ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <User size={18} />
                  {t.profiles}
                </button>
                <button
                  onClick={() => setActiveTab('translate')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'translate' 
                      ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <Languages size={18} />
                  {t.translate}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">
                {activeTab === 'tools' && (
                  <div className="space-y-8">
                    {/* Sign Language Card */}
                    <div 
                      onClick={() => setShowSignLanguage(!showSignLanguage)}
                      className={`p-6 rounded-3xl border transition-all text-center group cursor-pointer ${
                        showSignLanguage 
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500' 
                          : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white dark:bg-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <Hand className={showSignLanguage ? 'text-emerald-600 animate-bounce' : 'text-emerald-600'} size={24} />
                      </div>
                      <p className="font-bold text-zinc-900 dark:text-white">{t.signLanguage}</p>
                      <p className="text-[10px] text-zinc-500 mt-1">{showSignLanguage ? t.active : t.inactive}</p>
                    </div>

                    {/* Content Adjustments Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest">{t.contentAdjustments}</h3>
                        <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800 ml-4" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Simple Font */}
                        <button
                          onClick={() => toggleSetting('isSimpleFont')}
                          className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${
                            settings.isSimpleFont 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600' 
                              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          <Type size={20} />
                          <span className="text-xs font-bold">{t.simpleFont}</span>
                        </button>

                        {/* Highlight Links */}
                        <button
                          onClick={() => toggleSetting('highlightLinks')}
                          className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${
                            settings.highlightLinks 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600' 
                              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          <LinkIcon size={20} />
                          <span className="text-xs font-bold">{t.highlightLinks}</span>
                        </button>

                        {/* Bigger Text */}
                        <div className="p-4 rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 flex flex-col items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Maximize2 size={16} />
                            <span className="text-xs font-bold">{t.biggerText}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => updateSetting('fontSize', Math.max(80, settings.fontSize - 10))}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-xs font-black w-8">{settings.fontSize}%</span>
                            <button 
                              onClick={() => updateSetting('fontSize', Math.min(200, settings.fontSize + 10))}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Text Align */}
                        <div className="p-4 rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 flex flex-col items-center gap-3">
                          <span className="text-xs font-bold">{t.textAlign}</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateSetting('textAlign', 'left')}
                              className={`p-1.5 rounded-lg transition-colors ${settings.textAlign === 'left' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                              <AlignLeft size={16} />
                            </button>
                            <button 
                              onClick={() => updateSetting('textAlign', 'center')}
                              className={`p-1.5 rounded-lg transition-colors ${settings.textAlign === 'center' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                              <AlignCenter size={16} />
                            </button>
                            <button 
                              onClick={() => updateSetting('textAlign', 'right')}
                              className={`p-1.5 rounded-lg transition-colors ${settings.textAlign === 'right' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                              <AlignRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profiles' && (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-500 text-center py-8">{t.profilesDesc}</p>
                    {[
                      { id: 'blind', ...t.profilesList.blind, icon: EyeOff },
                      { id: 'dyslexia', ...t.profilesList.dyslexia, icon: Type },
                      { id: 'adhd', ...t.profilesList.adhd, icon: Activity },
                      { id: 'seizure', ...t.profilesList.seizure, icon: Zap },
                      { id: 'colorblind', ...t.profilesList.colorblind, icon: Eye },
                      { id: 'cognitive', ...t.profilesList.cognitive, icon: BookOpen },
                      { id: 'motor', ...t.profilesList.motor, icon: Hand }
                    ].map(profile => (
                      <button
                        key={profile.id}
                        onClick={() => applyProfile(profile.id)}
                        className="w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 text-start group transition-all flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                          <profile.icon size={20} className="text-zinc-500 group-hover:text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600">{profile.label}</p>
                          <p className="text-xs text-zinc-500">{profile.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'translate' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages size={32} className="text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{t.translationTitle}</h4>
                    <p className="text-sm text-zinc-500 max-w-xs mx-auto">{t.translationDesc}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
                <button 
                  onClick={resetSettings}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <RotateCcw size={14} />
                  {t.reset}
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center">
                    <span className="text-[10px] font-black text-white dark:text-zinc-900">A</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t.accessInHand}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sign Language Avatar Overlay */}
      <AnimatePresence>
        {showSignLanguage && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-24 left-6 z-[9998] w-48 h-48 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
              <div className="relative w-full h-full">
                <img 
                  src="https://picsum.photos/seed/sign-language/200/200" 
                  alt="Sign Language Avatar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-4 text-center">
                  <Hand className="text-white animate-bounce mb-2" size={32} />
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">{t.interpreterActive}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowSignLanguage(false)}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

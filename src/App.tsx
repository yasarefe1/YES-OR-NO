import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Sparkles, Palette } from 'lucide-react';

const THEMES = [
  {
    id: 'classic',
    opt1: { text: 'text-emerald-400', borderFocus: 'focus:border-emerald-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]', bg: 'bg-emerald-400' },
    opt2: { text: 'text-rose-400', borderFocus: 'focus:border-rose-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]', bg: 'bg-rose-400' }
  },
  {
    id: 'neon',
    opt1: { text: 'text-cyan-400', borderFocus: 'focus:border-cyan-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]', bg: 'bg-cyan-400' },
    opt2: { text: 'text-fuchsia-400', borderFocus: 'focus:border-fuchsia-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]', bg: 'bg-fuchsia-400' }
  },
  {
    id: 'sunset',
    opt1: { text: 'text-amber-400', borderFocus: 'focus:border-amber-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]', bg: 'bg-amber-400' },
    opt2: { text: 'text-violet-400', borderFocus: 'focus:border-violet-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]', bg: 'bg-violet-400' }
  },
  {
    id: 'fireice',
    opt1: { text: 'text-orange-400', borderFocus: 'focus:border-orange-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]', bg: 'bg-orange-400' },
    opt2: { text: 'text-sky-400', borderFocus: 'focus:border-sky-500/50', shadow: 'drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]', bg: 'bg-sky-400' }
  }
];

export default function App() {
  const [option1, setOption1] = useState('EVET');
  const [option2, setOption2] = useState('HAYIR');
  const [decision, setDecision] = useState<{text: string, type: 'opt1' | 'opt2'} | null>(null);
  const [isDeciding, setIsDeciding] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const currentTheme = THEMES[themeIndex];

  const makeDecision = () => {
    if (isDeciding || !option1.trim() || !option2.trim()) return;
    
    setIsDeciding(true);
    setDecision(null);
    
    // Simulate thinking time for suspense
    setTimeout(() => {
      const isOpt1 = Math.random() > 0.5;
      setDecision({
        text: isOpt1 ? option1 : option2,
        type: isOpt1 ? 'opt1' : 'opt2'
      });
      setIsDeciding(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800/80 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />

        <div className="bg-zinc-800/50 p-4 rounded-2xl mb-6 border border-zinc-700/50 shadow-inner">
          <Dices className="w-10 h-10 text-indigo-400" />
        </div>

        <h1 className="text-3xl font-bold mb-2 tracking-tight text-zinc-100">Karar Verici</h1>
        <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
          Kararsız mı kaldın? <br/>
          Seçeneklerini yaz ve butona bas.
        </p>

        {/* Theme Selector */}
        <div className="flex items-center justify-center gap-3 mb-6 bg-zinc-950/30 py-2 px-4 rounded-full border border-zinc-800/50">
          <Palette className="w-4 h-4 text-zinc-500" />
          <div className="flex gap-2">
            {THEMES.map((theme, idx) => (
              <button
                key={theme.id}
                onClick={() => setThemeIndex(idx)}
                className={`w-5 h-5 rounded-full flex overflow-hidden border-2 transition-all ${themeIndex === idx ? 'border-zinc-300 scale-125 shadow-lg' : 'border-zinc-700 hover:border-zinc-500 opacity-70 hover:opacity-100'}`}
                title="Tema Değiştir"
              >
                <div className={`w-1/2 h-full ${theme.opt1.bg}`} />
                <div className={`w-1/2 h-full ${theme.opt2.bg}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 w-full mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              disabled={isDeciding}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center font-semibold focus:outline-none transition-colors disabled:opacity-50 ${currentTheme.opt1.text} ${currentTheme.opt1.borderFocus}`}
              placeholder="1. Seçenek"
            />
          </div>
          <div className="flex items-center justify-center text-zinc-600 font-medium text-sm">
            veya
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              disabled={isDeciding}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center font-semibold focus:outline-none transition-colors disabled:opacity-50 ${currentTheme.opt2.text} ${currentTheme.opt2.borderFocus}`}
              placeholder="2. Seçenek"
            />
          </div>
        </div>

        <div className="h-48 w-full flex items-center justify-center mb-8 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 overflow-hidden relative shadow-inner">
          <AnimatePresence mode="wait">
            {isDeciding ? (
              <motion.div
                key="deciding"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Dices className="w-8 h-8 text-indigo-500/50 mb-3" />
                </motion.div>
                <span className="text-indigo-400/80 font-medium animate-pulse tracking-wide text-sm uppercase">
                  Düşünülüyor...
                </span>
              </motion.div>
            ) : decision ? (
              <motion.div
                key="decision"
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className={`text-4xl sm:text-5xl font-black tracking-tighter px-4 break-words w-full ${
                  decision.type === 'opt1' 
                    ? `${currentTheme.opt1.text} ${currentTheme.opt1.shadow}` 
                    : `${currentTheme.opt2.text} ${currentTheme.opt2.shadow}`
                }`}
              >
                {decision.text}
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-zinc-600 font-medium text-sm"
              >
                Cevap burada belirecek
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={isDeciding || !option1.trim() || !option2.trim() ? {} : { scale: 1.02, y: -2 }}
          whileTap={isDeciding || !option1.trim() || !option2.trim() ? {} : { scale: 0.98 }}
          onClick={makeDecision}
          disabled={isDeciding || !option1.trim() || !option2.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-500/40"
        >
          {isDeciding ? (
            <>
              <Dices className="w-5 h-5 animate-spin" />
              Karar Veriliyor...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Karar Ver
            </>
          )}
        </motion.button>
        
        <div className="mt-8 pt-6 border-t border-zinc-800/50 w-full flex items-center justify-center gap-2">
          <span className="text-xl">👉</span>
          <p className="text-xs text-zinc-500 font-medium">
            insanlar bunu cidden kullanıyor 😄
          </p>
        </div>
      </div>
    </div>
  );
}

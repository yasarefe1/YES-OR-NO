import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices } from 'lucide-react';

export default function App() {
  const [option1, setOption1] = useState('EVET');
  const [option2, setOption2] = useState('HAYIR');
  const [decision, setDecision] = useState<{text: string, type: 'opt1' | 'opt2'} | null>(null);
  const [isDeciding, setIsDeciding] = useState(false);

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

        <div className="flex gap-3 w-full mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              disabled={isDeciding}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
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
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center text-rose-400 font-semibold focus:outline-none focus:border-rose-500/50 transition-colors disabled:opacity-50"
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
                    ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]' 
                    : 'text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]'
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

        <button
          onClick={makeDecision}
          disabled={isDeciding || !option1.trim() || !option2.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
        >
          {isDeciding ? 'Karar Veriliyor...' : 'Karar Ver'}
        </button>
        
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

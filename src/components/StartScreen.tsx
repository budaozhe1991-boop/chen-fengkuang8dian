import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Play, Info } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const stats = JSON.parse(localStorage.getItem('crazy8_stats') || '{"wins":0, "losses":0}');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-12"
        >
          <div className="inline-block bg-yellow-400 p-4 rounded-3xl shadow-2xl shadow-yellow-400/20 mb-6 rotate-3">
            <span className="text-black font-black text-6xl italic">8</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter italic uppercase text-white drop-shadow-lg">
            Tina 疯狂 8 点
          </h1>
          <p className="text-emerald-200 text-lg mt-4 font-medium tracking-widest uppercase opacity-80">
            经典纸牌对战游戏
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10"
          >
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">战绩统计</h3>
            <div className="flex justify-around items-center">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">{stats.wins}</span>
                <span className="text-[10px] text-emerald-300 font-bold uppercase">胜场</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">{stats.losses}</span>
                <span className="text-[10px] text-red-400 font-bold uppercase">败场</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-left"
          >
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">游戏规则</h3>
            <ul className="text-xs text-emerald-100/70 space-y-1 font-medium">
              <li>• 匹配相同花色或点数出牌</li>
              <li>• <span className="text-yellow-400">8 点</span> 是万能牌，可随时打出</li>
              <li>• 打出 8 点后可指定新的花色</li>
              <li>• 先清空手牌的一方获胜</li>
            </ul>
          </motion.div>
        </div>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.5, type: 'spring' }}
          onClick={onStart}
          className="bg-white text-green-900 px-12 py-5 rounded-2xl font-black text-2xl shadow-2xl hover:bg-yellow-400 transition-colors flex items-center gap-3 mx-auto"
        >
          <Play fill="currentColor" />
          开始游戏
        </motion.button>

        <p className="mt-12 text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
          Built with React & Tailwind • 2026
        </p>
      </div>
    </div>
  );
};

export default StartScreen;

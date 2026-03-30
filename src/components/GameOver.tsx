import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayerType } from '../types';

interface GameOverProps {
  winner: PlayerType | null;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onRestart }) => {
  const isPlayerWinner = winner === 'player';

  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className={`absolute top-0 left-0 w-full h-2 ${isPlayerWinner ? 'bg-green-500' : 'bg-red-500'}`} />
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${isPlayerWinner ? 'bg-green-500' : 'bg-red-500'}`} />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-6xl sm:text-8xl mb-6"
            >
              {isPlayerWinner ? '🏆' : '💀'}
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900 uppercase tracking-tighter">
              {isPlayerWinner ? '胜利！' : '失败！'}
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg font-medium">
              {isPlayerWinner 
                ? '太棒了！你战胜了电脑并清空了所有手牌。' 
                : '电脑这次太快了。下次对局好运！'}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className={`w-full py-4 sm:py-5 rounded-2xl text-white font-black text-xl sm:text-2xl shadow-lg transition-all ${
                isPlayerWinner ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 'bg-red-500 hover:bg-red-600 shadow-red-200'
              }`}
            >
              再玩一次
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOver;

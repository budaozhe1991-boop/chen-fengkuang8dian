import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Suit } from '../types';
import { SUITS, SUIT_SYMBOLS, SUIT_COLORS } from '../constants';

interface SuitPickerProps {
  isOpen: boolean;
  onSelect: (suit: Suit) => void;
}

const SuitPicker: React.FC<SuitPickerProps> = ({ isOpen, onSelect }) => {
  const suitNames: Record<Suit, string> = {
    hearts: '红桃',
    diamonds: '方块',
    clubs: '梅花',
    spades: '黑桃',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 italic">疯狂 8 点！</h2>
            <p className="text-gray-600 mb-6 font-medium">请选择一个新的花色继续游戏：</p>
            
            <div className="grid grid-cols-2 gap-4">
              {SUITS.map((suit) => (
                <motion.button
                  key={suit}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(suit)}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border-2 border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm ${SUIT_COLORS[suit]}`}
                >
                  <span className="text-4xl sm:text-6xl mb-2">{SUIT_SYMBOLS[suit]}</span>
                  <span className="text-sm sm:text-lg font-bold capitalize">{suitNames[suit]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuitPicker;

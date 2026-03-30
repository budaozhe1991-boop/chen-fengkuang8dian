import React from 'react';
import { motion } from 'motion/react';
import { CardData, Suit } from '../types';
import { SUIT_SYMBOLS, SUIT_COLORS } from '../constants';

interface CardProps {
  card?: CardData;
  isFaceDown?: boolean;
  onClick?: () => void;
  isPlayable?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, isFaceDown = false, onClick, isPlayable = false, className = '' }) => {
  if (isFaceDown) {
    return (
      <motion.div
        whileHover={isPlayable ? { y: -10 } : {}}
        className={`w-16 h-24 sm:w-24 sm:h-36 bg-blue-800 rounded-lg border-2 border-white shadow-md flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        <div className="w-12 h-20 sm:w-16 sm:h-28 border border-blue-400 rounded-md flex items-center justify-center">
           <div className="text-blue-300 text-2xl font-bold opacity-20">Tina</div>
        </div>
      </motion.div>
    );
  }

  if (!card) return null;

  const { suit, rank } = card;
  const colorClass = SUIT_COLORS[suit];
  const symbol = SUIT_SYMBOLS[suit];

  return (
    <motion.div
      layoutId={card.id}
      whileHover={isPlayable ? { y: -15, scale: 1.05 } : {}}
      className={`w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg border-2 ${isPlayable ? 'border-yellow-400 cursor-pointer' : 'border-gray-200'} shadow-md flex flex-col p-1 sm:p-2 relative ${className}`}
      onClick={isPlayable ? onClick : undefined}
    >
      <div className={`text-xs sm:text-lg font-bold ${colorClass} leading-none`}>
        {rank}
      </div>
      <div className={`text-xs sm:text-lg ${colorClass} leading-none ml-0.5`}>
        {symbol}
      </div>
      
      <div className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-5xl ${colorClass} opacity-20`}>
        {symbol}
      </div>

      <div className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-xs sm:text-lg font-bold ${colorClass} rotate-180 leading-none flex flex-col items-end`}>
        <span>{rank}</span>
        <span>{symbol}</span>
      </div>
    </motion.div>
  );
};

export default Card;

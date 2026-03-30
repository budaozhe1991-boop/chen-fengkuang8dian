import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardData, PlayerType } from '../types';
import Card from './Card';

interface HandProps {
  cards: CardData[];
  playerType: PlayerType;
  isTurn: boolean;
  onCardClick?: (card: CardData) => void;
  isPlayable?: (card: CardData) => boolean;
}

const Hand: React.FC<HandProps> = ({ cards, playerType, isTurn, onCardClick, isPlayable }) => {
  const isPlayer = playerType === 'player';

  return (
    <div className={`flex flex-wrap justify-center gap-1 sm:gap-2 p-2 sm:p-4 min-h-[100px] sm:min-h-[160px] ${isTurn ? 'bg-blue-50/30 rounded-xl border-2 border-dashed border-blue-200' : ''}`}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: isPlayer ? 50 : -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative"
          >
            <Card
              card={card}
              isFaceDown={!isPlayer}
              isPlayable={isPlayer && isTurn && isPlayable?.(card)}
              onClick={() => isPlayer && onCardClick?.(card)}
              className={isPlayer ? 'hover:z-10' : ''}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="text-gray-400 font-medium italic flex items-center justify-center">
          No cards left!
        </div>
      )}
    </div>
  );
};

export default Hand;

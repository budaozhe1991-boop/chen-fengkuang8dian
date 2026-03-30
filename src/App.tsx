import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameLogic } from './hooks/useGameLogic';
import Hand from './components/Hand';
import Card from './components/Card';
import SuitPicker from './components/SuitPicker';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import { SUIT_SYMBOLS, SUIT_COLORS } from './constants';
import { Loader2, RefreshCw, Info } from 'lucide-react';

export default function App() {
  const {
    gameState,
    playCard,
    drawCard,
    handleSuitSelection,
    restartGame,
    startGame,
    isPlayable,
  } = useGameLogic();

  const {
    playerHand,
    aiHand,
    discardPile,
    currentSuit,
    currentRank,
    turn,
    winner,
    isSuitPickerOpen,
    message,
    isAiThinking,
    deck,
    status,
  } = gameState;

  const topDiscard = discardPile[discardPile.length - 1];
  const isPlayerTurn = turn === 'player';

  const suitNames = {
    hearts: '红桃',
    diamonds: '方块',
    clubs: '梅花',
    spades: '黑桃',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white font-sans selection:bg-yellow-400 selection:text-black">
      <AnimatePresence>
        {status === 'start' && <StartScreen onStart={startGame} />}
      </AnimatePresence>

      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-1.5 rounded-lg shadow-lg shadow-yellow-400/20">
            <span className="text-black font-black text-xl italic">8</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase">Tina 疯狂 8 点</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Stats Display */}
          <div className="hidden sm:flex items-center gap-3 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold opacity-50 uppercase">胜场</span>
              <span className="text-xs font-black text-green-400">
                {JSON.parse(localStorage.getItem('crazy8_stats') || '{"wins":0}').wins}
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold opacity-50 uppercase">败场</span>
              <span className="text-xs font-black text-red-400">
                {JSON.parse(localStorage.getItem('crazy8_stats') || '{"losses":0}').losses}
              </span>
            </div>
          </div>

          <button 
            onClick={restartGame}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="重新开始"
          >
            <RefreshCw size={20} className={isAiThinking ? 'animate-spin opacity-50' : ''} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 flex flex-col gap-8 min-h-[calc(100vh-80px)] justify-between">
        {/* AI Hand */}
        <section className="relative">
          <div className="flex justify-between items-center mb-2 px-4">
             <div className="flex items-center gap-2">
               <div className={`w-3 h-3 rounded-full ${!isPlayerTurn ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`} />
               <span className="text-sm font-bold uppercase tracking-widest opacity-70">电脑对手</span>
             </div>
             <span className="bg-black/30 px-3 py-1 rounded-full text-xs font-mono border border-white/10">
               {aiHand.length} 张牌
             </span>
          </div>
          <Hand 
            cards={aiHand} 
            playerType="ai" 
            isTurn={!isPlayerTurn} 
          />
        </section>

        {/* Center Board */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 py-8">
          {/* Draw Pile */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <Card 
                isFaceDown 
                isPlayable={isPlayerTurn && !isSuitPickerOpen} 
                onClick={drawCard}
                className="relative"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md border border-white/20 shadow-lg">
                {deck.length}
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">摸牌堆</span>
          </div>

          {/* Discard Pile */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={topDiscard.id}
                  initial={{ rotate: Math.random() * 20 - 10, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <Card card={topDiscard} />
                </motion.div>
              </AnimatePresence>
              
              {/* Current Suit Indicator (for 8s) */}
              {topDiscard.rank === '8' && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-xl border-2 border-yellow-400 z-10"
                >
                  <span className={`text-2xl ${SUIT_COLORS[currentSuit]}`}>
                    {SUIT_SYMBOLS[currentSuit]}
                  </span>
                </motion.div>
              )}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">弃牌堆</span>
          </div>
          
          {/* Game Status Info */}
          <div className="flex flex-col gap-2 max-w-[200px] text-center sm:text-left">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1">状态</p>
              <p className="text-sm font-medium leading-tight min-h-[2.5rem]">
                {isAiThinking ? (
                  <span className="flex items-center gap-2 justify-center sm:justify-start">
                    <Loader2 size={14} className="animate-spin" />
                    电脑正在思考...
                  </span>
                ) : message}
              </p>
            </div>
            
            <div className="flex items-center gap-2 justify-center sm:justify-start px-2">
              <span className="text-[10px] font-bold opacity-40 uppercase">当前花色:</span>
              <span className={`text-sm font-bold ${SUIT_COLORS[currentSuit]}`}>
                {SUIT_SYMBOLS[currentSuit]} {suitNames[currentSuit]}
              </span>
            </div>
          </div>
        </section>

        {/* Player Hand */}
        <section className="relative">
          <div className="flex justify-between items-center mb-2 px-4">
             <div className="flex items-center gap-2">
               <div className={`w-3 h-3 rounded-full ${isPlayerTurn ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`} />
               <span className="text-sm font-bold uppercase tracking-widest opacity-70">你的手牌</span>
             </div>
             <span className="bg-black/30 px-3 py-1 rounded-full text-xs font-mono border border-white/10">
               {playerHand.length} 张牌
             </span>
          </div>
          <Hand 
            cards={playerHand} 
            playerType="player" 
            isTurn={isPlayerTurn} 
            onCardClick={playCard}
            isPlayable={isPlayable}
          />
        </section>
      </main>

      {/* Modals */}
      <SuitPicker 
        isOpen={isSuitPickerOpen} 
        onSelect={handleSuitSelection} 
      />
      
      <GameOver 
        winner={winner} 
        onRestart={restartGame} 
      />

      {/* Footer Info */}
      <footer className="p-4 text-center opacity-30 text-[10px] uppercase tracking-[0.2em] font-bold">
        Built with React & Tailwind • 2026
      </footer>
    </div>
  );
}

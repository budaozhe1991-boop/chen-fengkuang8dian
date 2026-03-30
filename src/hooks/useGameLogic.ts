import { useState, useEffect, useCallback, useMemo } from 'react';
import { CardData, Suit, Rank, PlayerType, GameState } from '../types';
import { createDeck, shuffle, SUITS } from '../constants';

const INITIAL_HAND_SIZE = 8;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const fullDeck = shuffle(createDeck());
    const playerHand = fullDeck.splice(0, INITIAL_HAND_SIZE);
    const aiHand = fullDeck.splice(0, INITIAL_HAND_SIZE);
    const discardPile = [fullDeck.pop()!];
    
    return {
      deck: fullDeck,
      playerHand,
      aiHand,
      discardPile,
      currentSuit: discardPile[0].suit,
      currentRank: discardPile[0].rank,
      turn: 'player',
      winner: null,
      isSuitPickerOpen: false,
      message: '游戏开始！轮到你了。',
      isAiThinking: false,
      status: 'start',
    };
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
  }, []);

  const isPlayable = useCallback((card: CardData, currentSuit: Suit, currentRank: Rank) => {
    return card.rank === '8' || card.suit === currentSuit || card.rank === currentRank;
  }, []);

  const checkWinner = useCallback((hand: CardData[], player: PlayerType) => {
    if (hand.length === 0) {
      setGameState(prev => ({ ...prev, winner: player, status: 'gameOver', message: `${player === 'player' ? '你' : '电脑'} 赢了！` }));
      return true;
    }
    return false;
  }, []);

  const drawCard = useCallback((player: PlayerType) => {
    setGameState(prev => {
      if (prev.deck.length === 0) {
        return { ...prev, message: '牌堆已空！跳过回合。', turn: prev.turn === 'player' ? 'ai' : 'player' };
      }

      const newDeck = [...prev.deck];
      const drawnCard = newDeck.pop()!;
      const isPlayer = player === 'player';
      const newHand = isPlayer ? [...prev.playerHand, drawnCard] : [...prev.aiHand, drawnCard];
      
      const canPlay = isPlayable(drawnCard, prev.currentSuit, prev.currentRank);
      
      let nextTurn = prev.turn;
      if (!canPlay) {
        nextTurn = player === 'player' ? 'ai' : 'player';
      }

      return {
        ...prev,
        deck: newDeck,
        [isPlayer ? 'playerHand' : 'aiHand']: newHand,
        message: `${player === 'player' ? '你' : '电脑'} 摸了一张牌。`,
        turn: nextTurn,
      };
    });
  }, [isPlayable]);

  const playCard = useCallback((card: CardData, player: PlayerType) => {
    setGameState(prev => {
      const isPlayer = player === 'player';
      const currentHand = isPlayer ? prev.playerHand : prev.aiHand;
      const newHand = currentHand.filter(c => c.id !== card.id);
      const newDiscardPile = [...prev.discardPile, card];
      
      let nextTurn: PlayerType = player === 'player' ? 'ai' : 'player';
      let isSuitPickerOpen = false;
      let message = `${player === 'player' ? '你' : '电脑'} 打出了 ${card.suit === 'hearts' ? '红桃' : card.suit === 'diamonds' ? '方块' : card.suit === 'clubs' ? '梅花' : '黑桃'} ${card.rank}。`;

      if (card.rank === '8') {
        if (isPlayer) {
          isSuitPickerOpen = true;
          nextTurn = 'player'; 
          message = '疯狂 8 点！请选择一个新花色。';
        }
      }

      return {
        ...prev,
        [isPlayer ? 'playerHand' : 'aiHand']: newHand,
        discardPile: newDiscardPile,
        currentSuit: card.suit,
        currentRank: card.rank,
        turn: nextTurn,
        isSuitPickerOpen,
        message,
      };
    });
  }, []);

  const handleSuitSelection = useCallback((suit: Suit) => {
    const suitName = suit === 'hearts' ? '红桃' : suit === 'diamonds' ? '方块' : suit === 'clubs' ? '梅花' : '黑桃';
    setGameState(prev => ({
      ...prev,
      currentSuit: suit,
      isSuitPickerOpen: false,
      turn: 'ai',
      message: `花色已更改为 ${suitName}。轮到电脑了。`,
    }));
  }, []);

  const restartGame = useCallback(() => {
    const fullDeck = shuffle(createDeck());
    const playerHand = fullDeck.splice(0, INITIAL_HAND_SIZE);
    const aiHand = fullDeck.splice(0, INITIAL_HAND_SIZE);
    const discardPile = [fullDeck.pop()!];
    
    setGameState({
      deck: fullDeck,
      playerHand,
      aiHand,
      discardPile,
      currentSuit: discardPile[0].suit,
      currentRank: discardPile[0].rank,
      turn: 'player',
      winner: null,
      isSuitPickerOpen: false,
      message: '新对局开始！轮到你了。',
      isAiThinking: false,
      status: 'playing',
    });
  }, []);

  // AI Logic
  useEffect(() => {
    if (gameState.turn === 'ai' && !gameState.winner && !gameState.isSuitPickerOpen && gameState.status === 'playing') {
      setGameState(prev => ({ ...prev, isAiThinking: true }));
      
      const timer = setTimeout(() => {
        const playableCards = gameState.aiHand.filter(c => isPlayable(c, gameState.currentSuit, gameState.currentRank));
        
        if (playableCards.length > 0) {
          const nonEightMatches = playableCards.filter(c => c.rank !== '8');
          const cardToPlay = nonEightMatches.length > 0 
            ? nonEightMatches[Math.floor(Math.random() * nonEightMatches.length)]
            : playableCards[0];
          
          if (cardToPlay.rank === '8') {
            const suitCounts: Record<Suit, number> = { hearts: 0, diamonds: 0, clubs: 0, spades: 0 };
            gameState.aiHand.forEach(c => {
              if (c.id !== cardToPlay.id) suitCounts[c.suit]++;
            });
            
            const bestSuit = (Object.keys(suitCounts) as Suit[]).reduce((a, b) => suitCounts[a] > suitCounts[b] ? a : b);
            const suitName = bestSuit === 'hearts' ? '红桃' : bestSuit === 'diamonds' ? '方块' : bestSuit === 'clubs' ? '梅花' : '黑桃';

            setGameState(prev => {
              const newHand = prev.aiHand.filter(c => c.id !== cardToPlay.id);
              const newDiscardPile = [...prev.discardPile, cardToPlay];
              return {
                ...prev,
                aiHand: newHand,
                discardPile: newDiscardPile,
                currentSuit: bestSuit,
                currentRank: '8',
                turn: 'player',
                message: `电脑打出了 8 并将花色更改为 ${suitName}。`,
                isAiThinking: false,
              };
            });
          } else {
            playCard(cardToPlay, 'ai');
            setGameState(prev => ({ ...prev, isAiThinking: false }));
          }
        } else {
          if (gameState.deck.length > 0) {
            drawCard('ai');
          } else {
            setGameState(prev => ({ ...prev, turn: 'player', message: '电脑无牌可出且牌堆已空。轮到你了。', isAiThinking: false }));
          }
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [gameState.turn, gameState.aiHand, gameState.currentSuit, gameState.currentRank, gameState.winner, gameState.isSuitPickerOpen, gameState.status, isPlayable, playCard, drawCard]);

  // Check for winner after every move
  useEffect(() => {
    if (gameState.playerHand.length === 0 && !gameState.winner && gameState.status === 'playing') {
      setGameState(prev => ({ ...prev, winner: 'player', status: 'gameOver' }));
      // Update local storage
      const stats = JSON.parse(localStorage.getItem('crazy8_stats') || '{"wins":0, "losses":0}');
      stats.wins++;
      localStorage.setItem('crazy8_stats', JSON.stringify(stats));
    } else if (gameState.aiHand.length === 0 && !gameState.winner && gameState.status === 'playing') {
      setGameState(prev => ({ ...prev, winner: 'ai', status: 'gameOver' }));
      // Update local storage
      const stats = JSON.parse(localStorage.getItem('crazy8_stats') || '{"wins":0, "losses":0}');
      stats.losses++;
      localStorage.setItem('crazy8_stats', JSON.stringify(stats));
    }
  }, [gameState.playerHand.length, gameState.aiHand.length, gameState.winner, gameState.status]);

  return {
    gameState,
    playCard: (card: CardData) => playCard(card, 'player'),
    drawCard: () => drawCard('player'),
    handleSuitSelection,
    restartGame,
    startGame,
    isPlayable: (card: CardData) => isPlayable(card, gameState.currentSuit, gameState.currentRank),
  };
};

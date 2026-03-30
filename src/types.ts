export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface CardData {
  id: string;
  suit: Suit;
  rank: Rank;
  value: number;
}

export type PlayerType = 'player' | 'ai';
export type GameStatus = 'start' | 'playing' | 'gameOver';

export interface GameState {
  deck: CardData[];
  playerHand: CardData[];
  aiHand: CardData[];
  discardPile: CardData[];
  currentSuit: Suit;
  currentRank: Rank;
  turn: PlayerType;
  winner: PlayerType | null;
  isSuitPickerOpen: boolean;
  message: string;
  isAiThinking: boolean;
  status: GameStatus;
}

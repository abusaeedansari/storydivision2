import { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  gameLevel: string;
  setGameLevel: (level: string) => void;
  score: number;
  setScore: (score: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerName] = useState('');
  const [gameLevel, setGameLevel] = useState('');
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        gameLevel,
        setGameLevel,
        score,
        setScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
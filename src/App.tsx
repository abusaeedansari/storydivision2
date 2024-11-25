import { useState } from 'react';
import { BookOpen, Award, ArrowRight, RefreshCw, Play, Brain } from 'lucide-react';
import Game from './components/Game';
import Welcome from './components/Welcome';
import { GameProvider } from './context/GameContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Division Story Master</h1>
          </div>
          {gameStarted && (
            <button 
              onClick={() => setGameStarted(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Restart
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <GameProvider>
          {!gameStarted ? (
            <Welcome onStart={() => setGameStarted(true)} />
          ) : (
            <Game />
          )}
        </GameProvider>
      </main>
    </div>
  );
}

export default App;
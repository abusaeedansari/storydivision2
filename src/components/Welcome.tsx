import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Star, Trophy, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<string | null>(null);
  const { setPlayerName, setGameLevel } = useGame();

  const handleStart = () => {
    if (!name.trim() || !level) return;
    setPlayerName(name);
    setGameLevel(level);
    onStart();
  };

  const levels = [
    { id: 'easy', title: 'Beginner', icon: '🌟', desc: 'Start your journey!' },
    { id: 'medium', title: 'Explorer', icon: '⭐', desc: 'Ready for more?' },
    { id: 'hard', title: 'Master', icon: '✨', desc: 'Ultimate challenge!' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to Division Story Master!</h2>
          <p className="text-xl text-gray-600">Let's solve fun division stories together! 🎮</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              What's your name? 😊
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type your name here..."
            />
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Choose your adventure level! 🚀
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setLevel(lvl.id)}
                  className={`p-6 rounded-lg border-3 transition-all transform hover:scale-105 ${
                    level === lvl.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="text-4xl mb-2">{lvl.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{lvl.title}</h3>
                  <p className="text-gray-600">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!name.trim() || !level}
            className={`w-full py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-3 text-white font-bold transition-all transform hover:scale-105 ${
              name.trim() && level
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Your Adventure!
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
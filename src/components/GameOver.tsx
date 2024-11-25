import { Trophy, RefreshCw, Clock } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  reason: 'time' | 'complete';
}

export default function GameOver({ score, totalQuestions, reason }: GameOverProps) {
  const { playerName } = useGame();
  const maxScore = totalQuestions * 10;
  const percentage = (score / maxScore) * 100;

  const getFeedback = () => {
    if (reason === 'time') {
      return "Time's up! Let's try again and beat the clock! ⏰";
    }
    if (percentage === 100) return "Perfect score! You're a division master! 🏆";
    if (percentage >= 80) return "Excellent work! You're almost there! 🌟";
    if (percentage >= 60) return "Good job! Keep practicing! 👍";
    return "Nice try! Practice makes perfect! 💪";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="inline-block p-4 bg-indigo-100 rounded-full">
          {reason === 'time' ? (
            <Clock className="h-12 w-12 text-indigo-600" />
          ) : (
            <Trophy className="h-12 w-12 text-indigo-600" />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
          <p className="text-xl text-gray-600">Great effort, {playerName}!</p>
        </div>

        <div className="space-y-4">
          <div className="text-4xl font-bold text-indigo-600">
            {score} / {maxScore}
          </div>
          <p className="text-lg text-gray-700">{getFeedback()}</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Play Again
        </button>
      </div>
    </div>
  );
}
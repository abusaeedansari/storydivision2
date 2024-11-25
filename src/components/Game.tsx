import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Question from './Question';
import GameOver from './GameOver';
import Timer from './Timer';
import { generateQuestion, resetQuestions } from '../utils/questionGenerator';

export default function Game() {
  const { playerName, gameLevel, score, setScore } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [timeExpired, setTimeExpired] = useState(false);
  const [timerReset, setTimerReset] = useState(0); // Add timer reset state
  const totalQuestions = 25;

  // Set timer duration based on level
  const getTimerDuration = () => {
    switch (gameLevel) {
      case 'easy': return 2 * 60 * 1000; // 2 minutes
      case 'medium': return 3 * 60 * 1000; // 3 minutes
      case 'hard': return 4 * 60 * 1000; // 4 minutes
      default: return 2 * 60 * 1000;
    }
  };

  useEffect(() => {
    resetQuestions(); // Reset used questions when starting a new game
    const newQuestions = Array.from({ length: totalQuestions }, () =>
      generateQuestion(gameLevel)
    );
    setQuestions(newQuestions);
  }, [gameLevel]);

  const handleCorrectAnswer = () => {
    setScore(score + 10);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setTimerReset(prev => prev + 1); // Increment timer reset counter
  };

  const handleTimeExpired = () => {
    setTimeExpired(true);
  };

  if (timeExpired || currentQuestion >= totalQuestions) {
    return <GameOver 
      score={score} 
      totalQuestions={totalQuestions} 
      reason={timeExpired ? 'time' : 'complete'}
    />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-medium text-gray-700">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
        <Timer 
          duration={getTimerDuration()} 
          onExpire={handleTimeExpired}
          className="text-xl font-bold text-indigo-600"
          reset={timerReset} // Pass timer reset counter
        />
        <div className="text-xl font-bold text-indigo-600">
          Score: {score}
        </div>
      </div>

      {questions[currentQuestion] && (
        <Question
          key={currentQuestion}
          question={questions[currentQuestion]}
          onCorrect={handleCorrectAnswer}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
}
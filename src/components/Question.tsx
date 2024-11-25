import { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';

interface QuestionProps {
  question: any;
  onCorrect: () => void;
  onNext: () => void;
}

export default function Question({ question, onCorrect, onNext }: QuestionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Reset state when question changes
  useEffect(() => {
    setAnswers({});
    setIsSubmitted(false);
    setFeedback([]);
    setShowHint(false);
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [question]);

  const handleSubmit = () => {
    const isCorrect = Object.entries(question.correctAnswers).every(
      ([key, value]) => answers[key] === value
    );

    if (isCorrect) {
      setFeedback(['Amazing job! You got it right! 🎉']);
      onCorrect();
    } else {
      const incorrectFeedback = Object.entries(question.correctAnswers)
        .filter(([key, value]) => answers[key] !== value)
        .map(([key, value]) => `${key}: The answer is ${value}`);
      setFeedback(incorrectFeedback);
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
            {question.questionText}
          </h3>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-indigo-600 hover:text-indigo-700 p-2"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
        
        {showHint && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 Hint: First, look at the total number and how many groups you need.
              Then, divide to find out how many go in each group.
              Don't forget to check if there are any extras left over!
            </p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Important Numbers: {question.wordBank.join(', ')}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-lg">What we know:</h4>
          {Object.keys(question.given).map((key, index) => (
            <div key={key} className="flex items-center gap-2">
              <label className="text-gray-600 min-w-[150px]">{key}:</label>
              <input
                ref={index === 0 ? firstInputRef : null}
                type="text"
                value={answers[key] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                disabled={isSubmitted}
                className="px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 text-lg"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-lg">What we need to find:</h4>
          {Object.keys(question.correctAnswers)
            .filter(key => !Object.keys(question.given).includes(key))
            .map(key => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-gray-600 min-w-[150px]">{key}:</label>
                <input
                  type="text"
                  value={answers[key] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                  disabled={isSubmitted}
                  className="px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 text-lg"
                />
              </div>
            ))}
        </div>
      </div>

      {feedback.length > 0 && (
        <div className={`p-4 rounded-lg ${
          feedback.length === 1 && feedback[0].includes('Amazing')
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          {feedback.map((msg, i) => (
            <p key={i} className="text-lg">{msg}</p>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            <Check className="h-5 w-5" />
            Check Answer
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
          >
            Next Question
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
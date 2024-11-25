import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onExpire: () => void;
  className?: string;
  reset: number; // Add reset prop to force timer reset
}

export default function Timer({ duration, onExpire, className = '', reset }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when duration or reset prop changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, reset]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const getColorClass = () => {
    if (timeLeft <= 30000) return 'text-red-600'; // Last 30 seconds
    if (timeLeft <= 60000) return 'text-orange-600'; // Last minute
    return 'text-indigo-600';
  };

  return (
    <div className={`flex items-center gap-2 ${className} ${getColorClass()}`}>
      <Clock className="h-5 w-5" />
      <span>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
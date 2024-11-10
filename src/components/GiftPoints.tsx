import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface GiftPointsProps {
  onGift: (points: number) => void;
  disabled?: boolean;
}

export default function GiftPoints({ onGift, disabled }: GiftPointsProps) {
  const [showOptions, setShowOptions] = useState(false);

  const pointOptions = [10, 50, 100, 500];

  const handleGift = (points: number) => {
    onGift(points);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-2 p-2 rounded-full ${
          disabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-purple-500 hover:text-purple-600'
        }`}
        onClick={() => !disabled && setShowOptions(!showOptions)}
        disabled={disabled}
        title={disabled ? 'Нельзя подарить поинты самому себе' : 'Подарить поинты'}
      >
        <Gift className="h-5 w-5" />
      </button>

      {showOptions && (
        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 min-w-[120px]">
          {pointOptions.map(points => (
            <button
              key={points}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => handleGift(points)}
            >
              {points} поинтов
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
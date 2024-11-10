import React from 'react';
import { Award, Gift, TrendingUp } from 'lucide-react';
import type { User } from '../types';

interface PointsDisplayProps {
  user: User;
  onClaimDaily?: () => void;
}

export default function PointsDisplay({ user, onClaimDaily }: PointsDisplayProps) {
  const canClaimDaily = !user.lastClaimDate || 
    new Date().getDate() !== new Date(user.lastClaimDate).getDate();

  const getDailyPoints = (streak: number) => {
    if (streak <= 6) return (streak + 1) * 10;
    return 70;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="h-6 w-6 text-yellow-500" />
          <span className="text-lg font-semibold dark:text-gray-100">
            {user.points} поинтов
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Серия: {user.dailyStreak} дней
          </span>
        </div>
      </div>

      {canClaimDaily && onClaimDaily && (
        <button
          onClick={onClaimDaily}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <Gift className="h-5 w-5" />
          <span>Получить {getDailyPoints(user.dailyStreak)} поинтов</span>
        </button>
      )}
    </div>
  );
}
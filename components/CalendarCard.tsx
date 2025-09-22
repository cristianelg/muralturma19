
import React from 'react';

interface CalendarCardProps {
    rotation: string;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ rotation }) => {
  const now = new Date();
  const month = now.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
  const day = now.getDate();

  return (
    <div className={`w-64 h-64 flex flex-col shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ${rotation}`}>
      <div className="bg-red-600 text-white text-center py-2">
        <p className="font-bold text-xl">{month}</p>
      </div>
      <div className="bg-white flex-grow flex items-center justify-center">
        <p className="text-8xl font-bold text-gray-800">{day}</p>
      </div>
    </div>
  );
};
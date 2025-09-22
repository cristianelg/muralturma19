import React from 'react';
import { CalendarEvent } from '../types';

interface MonthlyCalendarProps {
  events: CalendarEvent[];
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
  onDayClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ events, currentDate, onDateChange, onDayClick, onEventClick }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); 

    const calendarDays = [];

    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-start-${i}`} className="border p-2 h-32 bg-amber-100/50"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);
        const isPast = dateObj < today;
        const isToday = dateObj.getTime() === today.getTime();

        calendarDays.push(
          <div 
            key={day} 
            className={`border p-2 h-32 flex flex-col transition-colors ${isPast ? 'bg-gray-200 text-gray-500' : 'bg-white cursor-pointer hover:bg-amber-100'}`}
            onClick={() => !isPast && onDayClick(dateStr)}
          >
            <span className={`font-bold self-start ${isToday ? 'bg-blue-500 text-white rounded-full flex items-center justify-center w-7 h-7' : ''}`}>{day}</span>
            <div className="flex-grow overflow-y-auto text-left text-xs pr-1">
              {dayEvents.map(event => (
                <div 
                    key={event.id} 
                    title={event.title}
                    className={`p-1 rounded my-1 text-white ${event.color} truncate ${isPast ? 'opacity-70' : 'hover:opacity-80'}`}
                    onClick={(e) => {
                        if (!isPast) {
                            e.stopPropagation(); 
                            onEventClick(event);
                        }
                    }}
                 >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
    }

    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    const goToPreviousMonth = () => {
        onDateChange(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        onDateChange(new Date(year, month + 1, 1));
    };

    return (
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
         <button onClick={goToPreviousMonth} className="px-4 py-2 bg-slate-600 text-white font-bold rounded-full hover:bg-slate-700 transition-colors font-handwritten text-xl">&lt;</button>
         <h2 className="text-4xl font-bold text-center text-slate-800 font-handwritten">
            {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
         </h2>
         <button onClick={goToNextMonth} className="px-4 py-2 bg-slate-600 text-white font-bold rounded-full hover:bg-slate-700 transition-colors font-handwritten text-xl">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map(day => (
          <div key={day} className="font-bold text-sm text-slate-600 py-2">{day}</div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onUpdate: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
  eventToEdit: CalendarEvent | { date: string } | null;
}

const disciplines = [
    { name: 'Gestão de Pessoas', color: 'bg-blue-400' },
    { name: 'Estratégias Gerenciais', color: 'bg-yellow-500' },
    { name: 'Sistemas de Gestão', color: 'bg-pink-400' },
    { name: 'Tópicos Avançados', color: 'bg-green-400' },
    { name: 'Instrumentos Gerenciais', color: 'bg-indigo-400' },
    { name: 'Finanças Empresariais', color: 'bg-purple-400' },
    { name: 'Marketing', color: 'bg-cyan-400' },
    { name: 'Feriado Nacional', color: 'bg-red-500' },
];

export const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose, onSave, onUpdate, onDelete, eventToEdit }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(disciplines[0].color);
  const [date, setDate] = useState('');
  
  const isEditing = eventToEdit && 'id' in eventToEdit;

  useEffect(() => {
    if (isOpen && eventToEdit) {
      if ('id' in eventToEdit) { // Editing existing event
        setTitle(eventToEdit.title);
        setColor(eventToEdit.color);
        setDate(eventToEdit.date);
      } else { // Adding new event
        setTitle('');
        setColor(disciplines[0].color);
        setDate(eventToEdit.date);
      }
    }
  }, [isOpen, eventToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    if (isEditing) {
        onUpdate({ id: (eventToEdit as CalendarEvent).id, title, date, color });
    } else {
        onSave({ title, date, color });
    }
  };

  if (!isOpen || !eventToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-amber-100 p-8 rounded-lg shadow-xl w-full max-w-md relative font-handwritten animate-fade-in">
            <button onClick={onClose} className="absolute top-2 right-3 text-3xl text-slate-600 hover:text-slate-900">&times;</button>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">{isEditing ? 'Editar Evento' : 'Adicionar Evento'}</h2>
            <p className="mb-4 text-center text-xl text-slate-700">Data: {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-slate-700 text-lg">Título do Evento:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-300 rounded bg-white" required />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-700 text-lg">Categoria:</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {disciplines.map(d => (
                            <button 
                                key={d.name} 
                                type="button" 
                                onClick={() => setColor(d.color)} 
                                className={`px-3 py-1 text-sm rounded-full text-white ${d.color} ${color === d.color ? 'ring-2 ring-offset-2 ring-slate-700' : 'opacity-80 hover:opacity-100'}`}
                            >
                                {d.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {isEditing ? (
                        <button type="button" onClick={() => onDelete((eventToEdit as CalendarEvent).id)} className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg text-lg">
                            Excluir
                        </button>
                    ) : <div></div>}
                    <button type="submit" className="px-8 py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition-colors shadow-lg text-xl">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

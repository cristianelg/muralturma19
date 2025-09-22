import React, { useState, useRef } from 'react';
import { Post } from '../types';

interface AddPostItFormProps {
  onAddPost: (post: Omit<Post, 'id' | 'rotation'>) => void;
  onClose: () => void;
}

const EMOJIS = ['👍', '❤️', '🎉', '👏', '💡', '🏆', '💯'];
const COLORS = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-pink-200', 'bg-purple-200'];

export const AddPostItForm: React.FC<AddPostItFormProps> = ({ onAddPost, onClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const contentRef = useRef<HTMLTextAreaElement>(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim() || !content.trim()) {
        alert("Por favor, preencha os campos 'De', 'Para' e a mensagem.");
        return;
    };

    onAddPost({
      type: 'post-it',
      content,
      color: selectedColor, 
      from,
      to,
      date: new Date(date + 'T00:00:00').toLocaleDateString('pt-BR'),
    });

    onClose();
  };
  
    const handleEmojiClick = (emoji: string) => {
        if(contentRef.current) {
            const { selectionStart, selectionEnd } = contentRef.current;
            const newContent = content.substring(0, selectionStart) + emoji + content.substring(selectionEnd);
            setContent(newContent);
            setTimeout(() => contentRef.current?.focus(), 0);
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-100 p-8 rounded-lg shadow-xl w-full max-w-md relative font-handwritten animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-slate-600 hover:text-slate-900">&times;</button>
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Deixe seu Elogio no Mural!</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                 <div className="flex-1">
                    <label htmlFor="from" className="block text-slate-700 text-lg">De: (seu nome)</label>
                    <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-300 rounded bg-white" required />
                 </div>
                 <div className="flex-1">
                    <label htmlFor="to" className="block text-slate-700 text-lg">Para: (nome do destinatário)</label>
                    <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-300 rounded bg-white" required />
                </div>
            </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-slate-700 text-lg">Mensagem:</label>
            <textarea id="content" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-300 rounded bg-white" rows={4} required />
          </div>
            <div className="mb-4 flex items-center gap-2">
                <label className="text-slate-700 text-lg">Emojis:</label>
                <div className="flex gap-2">
                    {EMOJIS.map(emoji => (
                        <button key={emoji} type="button" onClick={() => handleEmojiClick(emoji)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                    ))}
                </div>
            </div>
           <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
             <div>
                <label htmlFor="date" className="block text-slate-700 text-lg">Data:</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-300 rounded bg-white" required />
             </div>
              <div>
                <label className="block text-slate-700 text-lg">Cor do Post-it:</label>
                <div className="flex space-x-2 mt-1">
                    {COLORS.map(c => (
                        <button key={c} type="button" onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-full ${c} ${selectedColor === c ? 'ring-2 ring-offset-2 ring-slate-700' : ''} shadow-sm`}></button>
                    ))}
                </div>
              </div>
            </div>
          <div className="flex justify-end">
            <button type="submit" className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-colors shadow-lg text-xl">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React from 'react';
import { Post } from '../types';

export const PostIt: React.FC<Post> = ({ content, color, rotation, from, to, author, date }) => {
  return (
    <div
      className={`p-4 shadow-lg w-64 h-64 flex flex-col justify-between transition-transform hover:scale-110 hover:shadow-2xl hover:z-10 ${rotation} ${color}`}
    >
      <div className="flex-grow font-handwritten text-slate-800">
        {to && <p className="text-sm font-bold">Para: {to}</p>}
        <p className="text-lg mt-2 break-words flex-grow">{content}</p>
      </div>
      <div className="text-right font-handwritten text-slate-700">
        {from && <p className="text-sm font-bold">De: {from}</p>}
        {date && <p className="text-xs">{date}</p>}
      </div>
    </div>
  );
};
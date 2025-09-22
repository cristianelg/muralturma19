import React from 'react';
import { LinkItem } from '../types';

export const LinkCard: React.FC<LinkItem> = ({ title, href, onClick, icon, color }) => {
  const content = (
    <div className={`w-full h-32 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 ${color}`}>
      <div className="text-4xl text-white">{icon}</div>
      <h3 className="mt-2 text-xl font-bold text-white text-center font-handwritten">{title}</h3>
    </div>
  );

  const commonProps = {
    className: "focus:outline-none focus:ring-4 focus:ring-offset-2 rounded-lg w-full",
    style: {
        '--tw-ring-color': 'rgba(96, 165, 250, 0.5)' // Example: blue-400 with opacity
    } as React.CSSProperties,
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
};
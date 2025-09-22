// This component is no longer used in the main application flow.
// It is kept for potential future use or if other parts of the app (not visible here) still depend on it.
// For the main page, links are now rendered directly in App.tsx.
import React from 'react';
import { LinkCard } from './LinkCard';
import { LinkItem } from '../types';

interface MuralProps {
  links: LinkItem[];
}

export const Mural: React.FC<MuralProps> = ({ links }) => {
  const allItems = [
    ...links.map(link => <LinkCard key={`link-${link.id}`} {...link} />),
  ];

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
      {allItems.map((item, index) => (
        <div key={index} className="flex items-center justify-center">
            {item}
        </div>
      ))}
    </div>
  );
};


import React from 'react';

interface PhotoFrameProps {
  imageUrl?: string;
  content: string;
  // FIX: Made author optional to align with the Post type definition and resolve assignment error.
  author?: string;
  rotation: string;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({ imageUrl, content, author, rotation }) => {
  return (
    <div className={`bg-white p-3 pb-8 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ${rotation} w-64`}>
      <div className="bg-gray-200">
        <img src={imageUrl} alt={content} className="w-full h-48 object-cover" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-md text-gray-800">{content}</p>
        {/* FIX: Conditionally render the author to avoid displaying an empty line if author is not provided. */}
        {author && <p className="text-sm text-gray-600 font-bold">- {author}</p>}
      </div>
    </div>
  );
};
import React, { useState, useEffect, useCallback } from 'react';
import { Post } from '../types';
import { PostIt } from '../components/PostIt';
import { AddPostItForm } from '../components/AddPostItForm';

interface KudosPageProps {
  onBack: () => void;
}

const KUDOS_STORAGE_KEY = 'kudos_posts_turma19';

const getRandomRotation = () => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3', 'rotate-[1.5deg]', '-rotate-[1.5deg]'];
    return rotations[Math.floor(Math.random() * rotations.length)];
}

export const KudosPage: React.FC<KudosPageProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = window.localStorage.getItem(KUDOS_STORAGE_KEY);
      return savedPosts ? JSON.parse(savedPosts) : [];
    } catch (error) {
      console.error("Failed to load posts from localStorage", error);
      return [];
    }
  });
  
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(KUDOS_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to save posts to localStorage", error);
    }
  }, [posts]);

  const addPost = useCallback((post: Omit<Post, 'id' | 'rotation'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now(),
      rotation: getRandomRotation(),
    };
    setPosts(prevPosts => [...prevPosts, newPost]);
  }, []);

  return (
    <div 
        className="min-h-screen" 
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}
    >
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div>
                         <h1 className="text-4xl font-bold text-white font-handwritten">CAP Executivo FIA</h1>
                         <h2 className="text-2xl text-gray-200 font-handwritten">Mural da Turma 19</h2>
                    </div>
                </div>
                 <button onClick={onBack} className="px-6 py-2 bg-slate-600/70 text-white font-bold rounded-full hover:bg-slate-700 transition-colors font-handwritten text-xl backdrop-blur-sm">
                   Voltar
                 </button>
            </header>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-bold text-white font-handwritten">Mural de Kudos</h1>
            <button onClick={() => setIsFormVisible(true)} className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-colors shadow-lg font-handwritten text-2xl">
              Deixar um Elogio!
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
            {posts.map(post => (
              <div key={post.id} className="flex items-start justify-center">
                {post.type === 'post-it' && <PostIt {...post} />}
              </div>
            ))}
          </div>
        </div>

      {isFormVisible && <AddPostItForm onAddPost={addPost} onClose={() => setIsFormVisible(false)} />}
    </div>
  );
};
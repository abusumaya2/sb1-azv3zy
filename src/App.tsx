import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';
import type { Post, User } from './types';
import { useFirestore } from './hooks/useFirestore';

const CURRENT_USER: User = {
  id: 'current-user',
  username: 'Текущий пользователь',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  points: 1000,
  dailyStreak: 1,
  lastLoginDate: new Date().toISOString(),
  postsToday: 0,
  referralCount: 0
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const { posts, loading, error, addPost, updatePost, updateUser, ensureUser } = useFirestore();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await ensureUser(currentUser);
      } catch (err) {
        console.error('Error initializing user:', err);
      }
    };
    
    initializeUser();
  }, []);

  const handleAddPost = async (newPost: Post) => {
    if (currentUser.postsToday >= 3) {
      return;
    }

    try {
      await addPost(newPost);
      const updatedPoints = currentUser.points + 30;
      const updatedPostsToday = currentUser.postsToday + 1;
      
      await updateUser(currentUser.id, {
        points: updatedPoints,
        postsToday: updatedPostsToday
      });
      
      setCurrentUser(prev => ({
        ...prev,
        points: updatedPoints,
        postsToday: updatedPostsToday
      }));
    } catch (err) {
      console.error('Error handling post:', err);
    }
  };

  const handlePointsGift = async (postId: string, points: number) => {
    if (currentUser.points < points) {
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const updatedPointsGifted = {
        ...post.pointsGifted,
        [currentUser.id]: (post.pointsGifted[currentUser.id] || 0) + points
      };

      const updatedUserPoints = currentUser.points - points;

      await Promise.all([
        updatePost(postId, { pointsGifted: updatedPointsGifted }),
        updateUser(currentUser.id, { points: updatedUserPoints })
      ]);

      setCurrentUser(prev => ({
        ...prev,
        points: updatedUserPoints
      }));
    } catch (err) {
      console.error('Error gifting points:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header currentUser={currentUser} />
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <CreatePost onPost={handleAddPost} currentUser={currentUser} />
        <Feed 
          posts={posts} 
          currentUser={currentUser}
          onPointsGift={handlePointsGift}
        />
      </main>
    </div>
  );
}

export default App;
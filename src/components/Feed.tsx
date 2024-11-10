import React from 'react';
import PostCard from './PostCard';
import type { Post, User } from '../types';

interface FeedProps {
  posts: Post[];
  currentUser: User;
  onPointsGift?: (postId: string, points: number) => void;
}

export default function Feed({ posts, currentUser, onPointsGift }: FeedProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          currentUser={currentUser}
          onPointsGift={onPointsGift}
        />
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Post, Comment, User } from '../types';
import CommentSection from './CommentSection';
import SocialMediaEmbed from './SocialMediaEmbed';
import GiftPoints from './GiftPoints';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onPointsGift?: (postId: string, points: number) => void;
}

export default function PostCard({ post: initialPost, currentUser, onPointsGift }: PostCardProps) {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked
    }));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Пост от ${post.user.username}`,
          text: post.content,
          url: window.location.href
        });
      } else {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        alert('Ссылка скопирована в буфер обмена!');
      }
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
    }
  };

  const handleGiftPoints = (points: number) => {
    if (onPointsGift) {
      onPointsGift(post.id, points);
    }
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      content,
      createdAt: new Date()
    };

    setPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  const pointsGiftedByUser = post.pointsGifted[currentUser.id] || 0;

  return (
    <article className="bg-white dark:bg-gray-900 rounded-xl shadow-sm mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-10 h-10 rounded-full"
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {post.user.username}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
          </div>
        </div>
        <p className="mt-3 text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {post.content}
        </p>
        
        {post.embed && (
          <div className="mt-3">
            <SocialMediaEmbed embed={post.embed} />
          </div>
        )}

        {post.image && !post.embed && (
          <div className="mt-3">
            <img 
              src={post.image} 
              alt="Изображение к посту" 
              className="rounded-lg max-h-96 w-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            className={`flex items-center space-x-2 p-2 rounded-full ${
              post.isLiked 
                ? 'text-red-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length}</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-green-500"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            <span>{post.shares}</span>
          </button>
          <GiftPoints 
            onGift={handleGiftPoints}
            disabled={post.user.id === currentUser.id}
          />
          {pointsGiftedByUser > 0 && (
            <span className="text-sm text-purple-500">
              +{pointsGiftedByUser} подарено
            </span>
          )}
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection 
            comments={post.comments} 
            onAddComment={handleAddComment}
          />
        </div>
      )}
    </article>
  );
}
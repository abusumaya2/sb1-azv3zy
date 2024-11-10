import React, { useState } from 'react';
import type { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите комментарий..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Отправить
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.user.avatar}
              alt={comment.user.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                <p className="font-semibold text-sm dark:text-gray-200">
                  {comment.user.username}
                </p>
                <p className="text-gray-800 dark:text-gray-300">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
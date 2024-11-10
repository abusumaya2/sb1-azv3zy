import React, { useState } from 'react';
import { Image, Link, Smile, X } from 'lucide-react';
import { getEmbedInfo } from '../utils/social-media';
import type { Post, User } from '../types';

interface CreatePostProps {
  onPost: (post: Post) => void;
  currentUser: User;
}

export default function CreatePost({ onPost, currentUser }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedEmbed, setSelectedEmbed] = useState<Post['embed']>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsExpanded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkInput = async () => {
    const url = prompt('Введите ссылку (поддерживаются YouTube, Instagram, TikTok):');
    if (!url) return;

    const embedInfo = await getEmbedInfo(url);
    if (embedInfo) {
      setSelectedEmbed(embedInfo);
      setIsExpanded(true);
    } else {
      setSelectedLink(url);
      setIsExpanded(true);
    }
  };

  const handlePost = () => {
    if (!content && !selectedImage && !selectedLink && !selectedFeeling && !selectedEmbed) return;

    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser,
      content: [
        content,
        selectedFeeling ? `Чувствую: ${selectedFeeling}` : '',
        selectedLink ? `Ссылка: ${selectedLink}` : '',
      ].filter(Boolean).join('\n\n'),
      createdAt: new Date(),
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      image: selectedImage,
      embed: selectedEmbed,
      pointsGifted: {}
    };

    onPost(newPost);
    
    // Reset form
    setContent('');
    setSelectedImage(null);
    setSelectedLink(null);
    setSelectedFeeling(null);
    setSelectedEmbed(null);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-start space-x-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value) setIsExpanded(true);
            }}
            onClick={() => setIsExpanded(true)}
            placeholder="О чём вы думаете?"
            className="w-full min-h-[60px] p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            rows={isExpanded ? 4 : 2}
          />
          
          {selectedEmbed && (
            <div className="relative mt-2">
              {selectedEmbed.type === 'youtube' && selectedEmbed.thumbnailUrl && (
                <img 
                  src={selectedEmbed.thumbnailUrl} 
                  alt="Превью видео" 
                  className="w-full rounded-lg cursor-pointer"
                />
              )}
              {(selectedEmbed.type === 'instagram' || selectedEmbed.type === 'tiktok') && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                  {selectedEmbed.type === 'instagram' ? 'Instagram пост' : 'TikTok видео'}
                </div>
              )}
              <button
                onClick={() => setSelectedEmbed(null)}
                className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {selectedLink && !selectedEmbed && (
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">{selectedLink}</span>
              <button
                onClick={() => setSelectedLink(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {selectedFeeling && (
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Чувствую: {selectedFeeling}</span>
              <button
                onClick={() => setSelectedFeeling(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="flex flex-wrap items-center justify-between mt-4">
              <div className="flex flex-wrap gap-4 mb-2 sm:mb-0">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer"
                >
                  <Image className="h-5 w-5" />
                  <span className="text-sm">Фото</span>
                </label>
                
                <button
                  onClick={handleLinkInput}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                >
                  <Link className="h-5 w-5" />
                  <span className="text-sm">Ссылка</span>
                </button>
                
                <button
                  onClick={() => {
                    const feeling = prompt('Как вы себя чувствуете?');
                    if (feeling) {
                      setSelectedFeeling(feeling);
                      setIsExpanded(true);
                    }
                  }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                >
                  <Smile className="h-5 w-5" />
                  <span className="text-sm">Настроение</span>
                </button>
              </div>
              
              <button
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePost}
                disabled={!content && !selectedImage && !selectedLink && !selectedFeeling && !selectedEmbed}
              >
                Опубликовать
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
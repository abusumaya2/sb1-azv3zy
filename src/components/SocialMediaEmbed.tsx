import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface SocialMediaEmbedProps {
  embed: {
    type: 'youtube' | 'instagram' | 'tiktok';
    url: string;
    thumbnailUrl?: string;
    videoId?: string;
    postId?: string;
    embedUrl?: string;
  };
}

export default function SocialMediaEmbed({ embed }: SocialMediaEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (embed.type === 'youtube' && embed.videoId) {
    return (
      <div className="relative aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${embed.videoId}?autoplay=1`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div 
            className="relative cursor-pointer group w-full h-full"
            onClick={() => setIsPlaying(true)}
          >
            <img 
              src={embed.thumbnailUrl}
              alt="Превью видео"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center group-hover:bg-opacity-90 transition-all">
                <Play className="h-8 w-8 text-white fill-current" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (embed.type === 'instagram' && embed.embedUrl) {
    return (
      <div className="relative aspect-square w-full">
        <iframe
          src={embed.embedUrl}
          className="w-full h-full rounded-lg"
          allowFullScreen
          frameBorder="0"
          scrolling="no"
        />
      </div>
    );
  }

  if (embed.type === 'tiktok' && embed.embedUrl) {
    return (
      <div className="relative aspect-[9/16] max-w-[325px] mx-auto">
        <iframe
          src={embed.embedUrl}
          className="w-full h-full rounded-lg"
          allowFullScreen
          frameBorder="0"
          scrolling="no"
        />
      </div>
    );
  }

  return null;
}
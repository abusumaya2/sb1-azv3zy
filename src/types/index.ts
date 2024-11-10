export interface User {
  id: string;
  username: string;
  avatar: string;
  points: number;
  dailyStreak: number;
  lastLoginDate: string;
  postsToday: number;
  referralCount: number;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
  image?: string | null;
  pointsGifted: Record<string, number>;
  embed?: {
    type: 'youtube' | 'instagram' | 'tiktok';
    url: string;
    thumbnailUrl?: string;
    videoId?: string;
    postId?: string;
    embedUrl?: string;
  } | null;
}
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getInstagramId(url: string): string | null {
  const regExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com(?:\/p\/|\/reel\/)([^\/?#&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function getTikTokId(url: string): string | null {
  const regExp = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^/]+\/video\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function getSocialMediaType(url: string): 'youtube' | 'instagram' | 'tiktok' | null {
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    return 'youtube';
  }
  if (url.includes('instagram.com/')) {
    return 'instagram';
  }
  if (url.includes('tiktok.com/')) {
    return 'tiktok';
  }
  return null;
}

export async function getEmbedInfo(url: string) {
  const type = getSocialMediaType(url);
  if (!type) return null;

  switch (type) {
    case 'youtube': {
      const videoId = getYouTubeVideoId(url);
      if (!videoId) return null;
      return {
        type,
        url,
        videoId,
        thumbnailUrl: getYouTubeThumbnail(videoId)
      };
    }
    case 'instagram': {
      const postId = getInstagramId(url);
      if (!postId) return null;
      return {
        type,
        url,
        postId,
        embedUrl: `https://www.instagram.com/p/${postId}/embed`
      };
    }
    case 'tiktok': {
      const videoId = getTikTokId(url);
      if (!videoId) return null;
      return {
        type,
        url,
        videoId,
        embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`
      };
    }
    default:
      return null;
  }
}
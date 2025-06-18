
import React from 'react';
import { getYouTubeEmbedUrl, extractYouTubeVideoId } from '@/utils/youtubeUtils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  title = "YouTube video", 
  className = "",
  aspectRatio = "16:9" 
}) => {
  // Check if videoId is a URL and extract the ID if needed
  const id = videoId.includes('youtu') ? extractYouTubeVideoId(videoId) || videoId : videoId;
  
  // Calculate aspect ratio value
  const getAspectRatioValue = (ratio: string): number => {
    switch (ratio) {
      case "16:9": return 16 / 9;
      case "4:3": return 4 / 3;
      case "1:1": return 1;
      default: return 16 / 9;
    }
  };
  
  return (
    <div className={className}>
      <AspectRatio ratio={getAspectRatioValue(aspectRatio)}>
        <iframe
          src={getYouTubeEmbedUrl(id)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  );
};

export default YouTubeEmbed;

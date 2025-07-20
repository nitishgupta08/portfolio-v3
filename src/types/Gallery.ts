export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  location?: string;
  description?: string;
  datetime: string;
  likeCount: number;
  tags?: string[];
}

export interface LikeAction {
  photoId: string;
  action: 'like' | 'unlike';
  fingerprint: string;
  timestamp: string;
}

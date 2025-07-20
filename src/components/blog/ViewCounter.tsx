"use client";

import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { BlogService } from '@/lib/firebase/services/blogService';

interface ViewCounterProps {
  slug: string;
  initialViews: number;
}

export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Check if user has already viewed this post
    const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '[]');
    
    if (!viewedPosts.includes(slug) && !hasIncremented) {
      // Increment view count
      setViews(prev => prev + 1);
      setHasIncremented(true);
      
      // Store in localStorage to prevent duplicate views
      const updatedViewedPosts = [...viewedPosts, slug];
      localStorage.setItem('viewedPosts', JSON.stringify(updatedViewedPosts));
      
      // Increment view count in Firebase
      BlogService.incrementViewCount(slug).catch(console.error);
    }
  }, [slug, hasIncremented]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="flex items-center gap-2">
      <FaEye className="h-4 w-4" />
      <span>{formatViews(views)} views</span>
    </div>
  );
}

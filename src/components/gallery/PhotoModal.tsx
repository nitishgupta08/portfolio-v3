"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaRegHeart, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import { Photo } from "./Gallery";

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (photoId: string) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  isLiked: boolean;
  currentIndex: number;
  totalPhotos: number;
}

export default function PhotoModal({
  photo,
  isOpen,
  onClose,
  onLike,
  onNavigate,
  isLiked,
  currentIndex,
  totalPhotos
}: PhotoModalProps) {
  
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onNavigate('prev');
          break;
        case 'ArrowRight':
          onNavigate('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!photo) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-black border-0">
        <DialogTitle className="sr-only">
          {photo?.alt || "Photo viewer"}
        </DialogTitle>
        <div className="relative w-full h-full">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </Button>

          {/* Navigation Buttons */}
          {totalPhotos > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={() => onNavigate('prev')}
              >
                <FaChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={() => onNavigate('next')}
              >
                <FaChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Container */}
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Metadata Section */}
            <div className="bg-black/90 p-6 space-y-4">
              {/* Photo Description */}
              {photo.description && (
                <p className="text-white text-lg leading-relaxed text-center max-w-3xl mx-auto">
                  {photo.description}
                </p>
              )}

              {/* Photo Details */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  {photo.location && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="h-4 w-4 text-blue-400" />
                      <span>{photo.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <FaClock className="h-4 w-4 text-green-400" />
                    <span>{formatDate(photo.datetime)}</span>
                  </div>

                  <div className="text-sm">
                    {currentIndex + 1} of {totalPhotos}
                  </div>
                </div>

                {/* Like Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/10 ${isLiked ? 'text-red-400' : ''}`}
                  onClick={() => onLike(photo.id)}
                >
                  {isLiked ? <FaHeart className="mr-2 h-4 w-4" /> : <FaRegHeart className="mr-2 h-4 w-4" />}
                  {photo.likeCount}
                </Button>
              </div>

              {/* Tags */}
              {photo.tags && photo.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {photo.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-white/20 text-white border-0"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

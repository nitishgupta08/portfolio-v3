"use client";

import { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import PhotoModal from "./PhotoModal";
import { generateFingerprint } from "@/lib/utils";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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

// Your sample photos array here...
const samplePhotos: Photo[] = [
  {
    id: "1",
    src: "/gallery/sample1.jpg",
    alt: "Mountain landscape at sunset",
    width: 800,
    height: 600,
    location: "Himachal Pradesh, India",
    description: "Golden hour magic in the mountains - one of those moments that makes you appreciate the beauty of nature.",
    datetime: "2024-03-15T18:30:00Z",
    likeCount: 24,
    tags: ["landscape", "mountains", "sunset"]
  },
  // ... add your other 27 photos here
];

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  // Load liked photos from localStorage
  useEffect(() => {
    const fingerprint = generateFingerprint();
    const saved = localStorage.getItem(`gallery_likes_${fingerprint}`);
    if (saved) {
      try {
        setLikedPhotos(new Set(JSON.parse(saved)));
      } catch (error) {
        console.error("Error loading liked photos:", error);
      }
    }
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    const index = photos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(index);
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentPhotoIndex + 1) % photos.length
      : (currentPhotoIndex - 1 + photos.length) % photos.length;
    
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleLike = (photoId: string) => {
    const fingerprint = generateFingerprint();
    const newLikedPhotos = new Set(likedPhotos);
    const isCurrentlyLiked = newLikedPhotos.has(photoId);
    
    // Update like count optimistically
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likeCount: photo.likeCount + (isCurrentlyLiked ? -1 : 1) }
        : photo
    ));

    // Update liked photos set
    if (isCurrentlyLiked) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    
    setLikedPhotos(newLikedPhotos);
    
    // Update selected photo if it's the one being liked
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(prev => prev ? {
        ...prev,
        likeCount: prev.likeCount + (isCurrentlyLiked ? -1 : 1)
      } : null);
    }

    // Save to localStorage
    localStorage.setItem(
      `gallery_likes_${fingerprint}`, 
      JSON.stringify([...newLikedPhotos])
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      {/* Gallery Grid */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 
          350: 1, 
          750: 2, 
          900: 3, 
          1200: 4 
        }}
      >
        <Masonry gutter="16px">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isLiked={likedPhotos.has(photo.id)}
              onPhotoClick={handlePhotoClick}
              onLike={handleLike}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onLike={handleLike}
        onNavigate={handleNavigate}
        isLiked={selectedPhoto ? likedPhotos.has(selectedPhoto.id) : false}
        currentIndex={currentPhotoIndex}
        totalPhotos={photos.length}
      />
    </>
  );
}

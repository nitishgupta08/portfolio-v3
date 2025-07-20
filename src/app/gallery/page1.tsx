import { Metadata } from "next";
import Gallery from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Photo Gallery - Nitish Gupta",
  description: "A collection of my photography work showcasing various moments and places",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Photo Gallery
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Capturing moments through my lens - a visual journey of places, 
                people, and experiences that inspire me
              </p>
            </div>
          </div>

          {/* Gallery Component */}
          <Gallery />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-secondary">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Expand Button */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10">
              <Expand className="w-5 h-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent shadow-none">
            <div className="relative w-full h-[80vh]">
              <Image
                src={images[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${index === currentIndex
                  ? "ring-2 ring-accent ring-offset-2"
                  : "opacity-60 hover:opacity-100"
                }`}
            >
              <Image
                src={image}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

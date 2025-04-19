"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setZoomPosition({ x, y })
    }
  }

  return (
    <div>
      <div className="relative mb-4 rounded-lg overflow-hidden border">
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden" onMouseMove={handleMouseMove}>
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt="Product image"
            fill
            priority
            className="object-contain"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
              transition: zoomLevel === 1 ? "transform 0.3s ease" : "none",
            }}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 bg-white/80 hover:bg-white rounded-full"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative h-[80vh] w-full">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
              index === currentImage ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}


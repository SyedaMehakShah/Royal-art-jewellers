"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Banner {
  _id: string
  title: string
  subtitle: string
  image: string
  link: string
}

export default function HeroSection({ banners }: { banners: Banner[] }) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)


  const nextBanner = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentBanner((prev) => (prev + 1) % banners.length)
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating, banners.length])

  const prevBanner = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
    setTimeout(() => setIsAnimating(false), 700)
  }
  useEffect(() => {
    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          nextBanner()
        }
      }, 6000)
    }
  
    startAutoSlide()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAnimating, nextBanner])
  
  if (!banners.length) return null

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={banners[currentBanner].image || "/placeholder.svg"}
            alt={banners[currentBanner].title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end text-center p-8 md:p-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-4 tracking-wide">
                {banners[currentBanner].title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {banners[currentBanner].subtitle}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-none px-8 py-6 text-base"
              >
                <Link href={banners[currentBanner].link}>Explore Collection</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
        onClick={nextBanner}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentBanner ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => {
              setCurrentBanner(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

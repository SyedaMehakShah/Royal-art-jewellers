"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import aisha from "../../../../public/customer.jpg";
import ayub from "../../../../public/ayubcustomer.jpg";
import sara from "../../../../public/customer2.jpg";


export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mrs Imran",
      image: sara,
      role: "Loyal Customer",
      quote:
        "The craftsmanship of their jewelry is exceptional. I purchased a necklace for my anniversary and it exceeded all my expectations. The attention to detail is remarkable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Muhammad Ayub Ali",
      image: ayub,
      role: "First-time Buyer",
      quote:
        "I was hesitant to buy jewelry online, but their detailed product descriptions and images gave me confidence. The ring I purchased for my fiancée was even more beautiful in person.",
      rating: 5,
    },
    {
      id: 3,
      name: "Aisha Patel",
      image: aisha,
      role: "Repeat Customer",
      quote:
        "I've purchased several pieces from this store and each one has been perfect. Their customer service is outstanding and the quality of their jewelry is consistently excellent.",
      rating: 5,
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">What Our Customers Say</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-[#443627]"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 shadow-lg text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-amber-100">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#443627] fill-[#443627]" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
              &quot;{testimonials[current].quote}&quot;
              </blockquote>

              <div className="text-[#443627] font-medium">{testimonials[current].name}</div>
              <div className="text-gray-500 text-sm">{testimonials[current].role}</div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-amber-50 text-gray-800 rounded-full h-12 w-12 shadow-md"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white hover:bg-amber-50 text-gray-800 rounded-full h-12 w-12 shadow-md"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}


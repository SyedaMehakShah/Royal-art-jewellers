// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface Banner {
//   _id: string
//   title: string
//   subtitle: string
//   image: string
//   link: string
// }

// export default function Banner({ banners }: { banners: Banner[] }) {
//   const [currentBanner, setCurrentBanner] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [banners.length])

//   const nextBanner = () => {
//     setCurrentBanner((prev) => (prev + 1) % banners.length)
//   }

//   const prevBanner = () => {
//     setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
//   }

//   if (!banners.length) return null

//   return (
//     <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
//       {banners.map((banner, index) => (
//         <div
//           key={banner._id}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill priority className="object-cover" />
//           <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{banner.title}</h1>
//             <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">{banner.subtitle}</p>
//             <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
//               <Link href={banner.link}>Shop Now</Link>
//             </Button>
//           </div>
//         </div>
//       ))}

//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
//         onClick={prevBanner}
//       >
//         <ChevronLeft className="h-8 w-8" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
//         onClick={nextBanner}
//       >
//         <ChevronRight className="h-8 w-8" />
//       </Button>

//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
//             onClick={() => setCurrentBanner(index)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Banner {
  _id: string
  title: string
  subtitle: string
  image: string
  link: string
}

export default function Banner({ banners }: { banners: Banner[] }) {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (!banners.length) return null

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill priority className="object-contain" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{banner.title}</h1>
            <p className="text-base md:text-xl text-white mb-4 max-w-2xl">{banner.subtitle}</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href={banner.link}>Shop Now</Link>
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full h-8 w-8"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full h-8 w-8"
        onClick={nextBanner}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  )
}

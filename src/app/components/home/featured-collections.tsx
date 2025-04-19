"use client"

import Link from "next/link"
import Image from "next/image"

interface Collection {
  _id: string
  title: string
  slug: string
  image: string
}

export default function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">Featured Collections</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-amber-400"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of exquisite jewelry pieces, each designed to celebrate life&apos;s special
            moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link href={`/collections/${collection.slug}`} key={collection._id}>
              <div className="group relative overflow-hidden cursor-pointer">
                <div className="relative h-[400px] w-full overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif mb-2">{collection.title}</h3>
                  <div className="flex items-center">
                    <span className="text-sm uppercase tracking-wider">View Collection</span>
                    <div className="ml-2 w-6 h-[1px] bg-white transition-all duration-300 group-hover:w-10"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function JewelryGuide() {
  const guides = [
    {
      title: "How to Choose the Perfect Diamond",
      image: "/placeholder.svg?height=300&width=500",
      excerpt: "Learn about the 4Cs of diamonds and how to select the perfect stone for your jewelry.",
      link: "/blog/how-to-choose-diamond",
    },
    {
      title: "Gold Purity Guide: Understanding Karats",
      image: "/placeholder.svg?height=300&width=500",
      excerpt: "Discover the differences between 24K, 22K, 18K and 14K gold to make informed purchasing decisions.",
      link: "/blog/gold-purity-guide",
    },
    {
      title: "Jewelry Care & Maintenance Tips",
      image: "/placeholder.svg?height=300&width=500",
      excerpt: "Essential tips to keep your precious jewelry looking beautiful for generations to come.",
      link: "/blog/jewelry-care-tips",
    },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">Jewelry Guide</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-amber-400"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice and insights to help you make informed decisions about your jewelry purchases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-gray-50 overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{guide.excerpt}</p>
                <Link
                  href={guide.link}
                  className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-transparent hover:bg-amber-500 text-gray-800 hover:text-white border border-gray-300 hover:border-amber-500 rounded-none px-8 py-6"
          >
            <Link href="/blog">View All Guides</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


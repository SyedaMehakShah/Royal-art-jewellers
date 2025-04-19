import Link from "next/link"
import Image from "next/image"
import ringbanner from "../../../../public/ringbanner.jpg";
import earbanner from "../../../../public/earbanner.jpg";
import necklaceBanner from "../../../../public/necklace banner.jpg";
import bracletbanner from "../../../../public/braclet.jpg";

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Rings",
      image: ringbanner,
      link: "/products?category=rings",
      description: "Elegant rings for every occasion",
    },
    {
      name: "Necklaces",
      image: necklaceBanner,
      link: "/products?category=necklaces",
      description: "Stunning necklaces that make a statement",
    },
    {
      name: "Earrings",
      image: earbanner,
      link: "/products?category=earrings",
      description: "Beautiful earrings to complement your style",
    },
    {
      name: "Bracelets",
      image: bracletbanner,
      link: "/products?category=bracelets",
      description: "Exquisite bracelets for a touch of elegance",
    },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">Shop By Category</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-[#554637]"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of fine jewelry across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link href={category.link} key={index}>
              <div className="group relative overflow-hidden cursor-pointer h-[400px]">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="border border-white/50 p-8 w-4/5 h-4/5 flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-90">
                    <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{category.description}</p>
                    <span className="text-xs uppercase tracking-widest border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                      Shop Now
                    </span>
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


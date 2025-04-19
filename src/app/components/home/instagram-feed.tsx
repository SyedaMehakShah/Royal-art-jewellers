import Image from "next/image"
import insta1 from "../../../../public/insta8.png";
import set2 from "../../../../public/intag.png"
import set3 from "../../../../public/chain.jpg"
import set4 from "../../../../public/pic1.png"
import set5 from "../../../../public/image2.png"
import set6 from "../../../../public/image3.png"


import { Instagram } from "lucide-react"

export default function InstagramFeed() {
  const instagramPosts = [
    { image: insta1, link: "https://www.instagram.com/royalartjewellers6/" },
    { image: set2, link: "https://www.instagram.com/royalartjewellers6/" },
    { image: set3, link: "https://www.instagram.com/royalartjewellers6/" },
    { image: set4, link: "https://www.instagram.com/royalartjewellers6/" },
    { image: set5, link: "https://www.instagram.com/royalartjewellers6/" },
    { image: set6, link: "https://www.instagram.com/royalartjewellers6/" },
  ]

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">Follow Us on Instagram</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-[#443627]"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            @royalartjewellers6e • Join our community and share your moments with our jewelry
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="relative group overflow-hidden"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Instagram className="text-white h-8 w-8" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/royalartjewellers6/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-800 hover:text-[#443627] font-medium"
          >
            <Instagram className="mr-2 h-5 w-5" />
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}


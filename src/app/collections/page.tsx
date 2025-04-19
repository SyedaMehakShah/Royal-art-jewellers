import { createClient } from "next-sanity"
import Image from "next/image"
import Link from "next/link"

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

// Function to get all collections
async function getAllCollections() {
  try {
    return (
      (await client.fetch(`*[_type == "collection"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      "image": image.asset->url,
      description
    }`)) || []
    )
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

export default async function CollectionsPage() {
  const collections = await getAllCollections()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-light mb-6 text-center text-gray-800">Our Collections</h1>
      <div className="flex justify-center mb-12">
        <div className="w-20 h-0.5 bg-amber-400"></div>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No collections found. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection : any) => (
            <Link href={`/collections/${collection.slug}`} key={collection._id}>
              <div className="group relative overflow-hidden cursor-pointer rounded-lg shadow-md">
                <div className="relative h-[300px] w-full overflow-hidden">
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
                  {collection.description && (
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{collection.description}</p>
                  )}
                  <div className="flex items-center">
                    <span className="text-sm uppercase tracking-wider">View Collection</span>
                    <div className="ml-2 w-6 h-[1px] bg-white transition-all duration-300 group-hover:w-10"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}


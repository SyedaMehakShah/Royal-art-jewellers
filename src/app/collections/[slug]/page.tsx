// import { createClient } from "next-sanity"
// import { notFound } from "next/navigation"
// import Image from "next/image"
// import ProductCard from "@/app/components/product/product-card"
// import { Suspense } from "react"
// import { Product } from "@/types/product"
// // Create Sanity client
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2023-05-03",
//   useCdn: process.env.NODE_ENV === "production",
// })
// export interface PageProps {
//   params: {
//     slug: string;
//   };
// }


// // Function to get a collection by slug
// async function getCollection(slug: string) {
//   return await client.fetch(`*[_type == "collection" && slug.current == "${slug}"][0] {
//       _id,
//       title,
//       "slug": slug.current,
//       "image": image.asset->url,
//       description
//     }`)
  
// }

// // Function to get products by collection
// async function getProductsByCollection(collectionId: string) {
  
//     return (
//       (await client.fetch(`*[_type == "product" && references("${collectionId}")] | order(createdAt desc) {
//       _id,
//       name,
//       "slug": slug.current,
//       price,
//       originalPrice,
//       "discount": round(((originalPrice - price) / originalPrice) * 100),
//       "images": images[].asset->url,
//       category,
//       rating,
//       reviewCount
//     }`)) || []
//     )
//   } 
// export default async function CollectionPage({ params }: { params: { slug: string } }) {
//   const slug = params.slug;
// const collection = await getCollection(slug);
//   if (!collection) {
//     notFound()
//   }

//   const products = await getProductsByCollection(collection._id)

//   return (
//     <div className="container mx-auto px-4 py-12">
//       {/* Collection Hero */}
//       <div className="relative h-[300px] md:h-[400px] w-full mb-12 rounded-lg overflow-hidden">
//         <Image
//           src={collection.image || "/placeholder.svg"}
//           alt={collection.title}
//           fill
//           priority
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <div className="text-center text-white max-w-3xl px-4">
//             <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">{collection.title}</h1>
//             {collection.description && (
//               <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">{collection.description}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Products */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-serif font-light mb-6">Products in this Collection</h2>

//         {products.length === 0 ? (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <p className="text-lg text-gray-600">No products found in this collection.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product: Product) => (
//               <Suspense key={product._id} fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>}>
//                 <ProductCard product={product} />
//               </Suspense>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

import { createClient } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/app/components/product/product-card";
import { Suspense } from "react";
import { Product } from "@/types/product";

// ✅ Define correct PageProps
type PageProps = {
  params: {
    slug: string;
  };
};

// ✅ Sanity client config
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
});

// ✅ Fetch collection by slug
async function getCollection(slug: string) {
  return await client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": image.asset->url,
      description
    }`,
    { slug }
  );
}

// ✅ Fetch products for the collection
async function getProductsByCollection(collectionId: string) {
  return (
    (await client.fetch(
      `*[_type == "product" && references($collectionId)] | order(createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        price,
        originalPrice,
        "discount": round(((originalPrice - price) / originalPrice) * 100),
        "images": images[].asset->url,
        category,
        rating,
        reviewCount
      }`,
      { collectionId }
    )) || []
  );
}

// ✅ Dynamic route component
export default async function CollectionPage({ params }: PageProps) {
  const { slug } = params;

  const collection = await getCollection(slug);
  if (!collection) return notFound();

  const products = await getProductsByCollection(collection._id);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Collection Hero */}
      <div className="relative h-[300px] md:h-[400px] w-full mb-12 rounded-lg overflow-hidden">
        <Image
          src={collection.image || "/placeholder.svg"}
          alt={collection.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-light mb-6">
          Products in this Collection
        </h2>
        {products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">
              No products found in this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <Suspense
                key={product._id}
                fallback={
                  <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
                }
              >
                <ProductCard product={product} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Static paths for prerendering
export async function generateStaticParams() {
  const collections = await client.fetch(
    `*[_type == "collection"]{ "slug": slug.current }`
  );

  return collections.map((collection: { slug: string }) => ({
    slug: collection.slug,
  }));
}



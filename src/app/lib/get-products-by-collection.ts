import { client } from "@/sanity/lib/client";

export async function getProductsByCollection(collectionId: string) {
  return await client.fetch(
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
  );
}

import { client } from "@/sanity/lib/client";

export async function getCollection(slug: string) {
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

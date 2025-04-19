"use server"

import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

export async function getBanners() {
  return (
    (await client.fetch(`*[_type == "banner"] | order(order asc) {
      _id,
      title,
      subtitle,
      "image": image.asset->url,
      link
    }`)) || []
  )
}

export async function getFeaturedCollections() {
  try {
    return (
      (await client.fetch(`*[_type == "collection" && featured == true] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      "image": image.asset->url
    }`)) || []
    )
  } catch {
    return []
  }
}

export async function getAllCollections() {
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
  } catch {
    console.error("Error fetching all collections:")
    return []
  }
}

export async function getCollection(slug: string) {
  try {
    return await client.fetch(`*[_type == "collection" && slug.current == "${slug}"][0] {
      _id,
      title,
      "slug": slug.current,
      "image": image.asset->url,
      description
    }`)
  } catch {
    return null
  }
}

export async function getProductsByCollection(collectionId: string) {
  try {
    return (
      (await client.fetch(`*[_type == "product" && references("${collectionId}")] | order(createdAt desc) {
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
    }`)) || []
    )
  } catch {
    console.error(`Error fetching products for collection ${collectionId}:`)
    return []
  }
}

export async function getProducts({
  limit = 12,
  sort = "createdAt",
  category,
}: {
  limit?: number
  sort?: string
  category?: string | null | undefined
}) {
  try {
    let query = `*[_type == "product"`

    if (category) {
      query += ` && category == "${category}"`
    }

    query += `] | order(${sort} desc)[0...${limit}] {
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
    }`

    const products = await client.fetch(query)

    return products || []
  } catch {
    console.error("Error fetching products:")
    return []
  }
}

export async function getProduct(slug: string) {
  try {
    console.log("Fetching product with slug:", slug)
    const product = await client.fetch(`*[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      name,
      "slug": slug.current,
      price,
      originalPrice,
      "discount": round(((originalPrice - price) / originalPrice) * 100),
      "images": images[].asset->url,
      description,
      category,
      "collections": collections[]->{ _id, title, "slug": slug.current },
      metalType,
      weight,
      purity,
      gemstones,
      sizes,
      specifications,
      rating,
      reviewCount
    }`)

    return product
  } catch {
    console.error(`Error fetching product with slug ${slug}:`)
    return null
  }
}

export async function getRelatedProducts(productId: string, category: string, limit = 4) {
  try {
    return (
      (await client.fetch(`*[_type == "product" && category == "${category}" && _id != "${productId}"] | order(rating desc)[0...${limit}] {
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
    }`)) || []
    )
  } catch {
    console.error("Error fetching related products:")
    return []
  }
}

export async function getProductReviews(productId: string) {
  try {
    return (
      (await client.fetch(`*[_type == "review" && product._ref == "${productId}"] | order(createdAt desc) {
      _id,
      name,
      rating,
      comment,
      createdAt
    }`)) || []
    )
  } catch {
    console.error("Error fetching product reviews:")
    return []
  }
}

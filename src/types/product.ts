export interface Product {
    _id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    discount?: number
    images: string[]
    description?: string
    category: string
    metalType?: string
    weight?: number
    purity?: string
    gemstones?: string
    sizes?: string[]
    specifications?: Record<string, string | number>
    rating: number
    reviewCount: number
  }
  
  
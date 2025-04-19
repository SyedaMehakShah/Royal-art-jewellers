import type { Product } from "./product"

export interface CartItem {
  _id: string
  product: Product
  quantity: number
  size?: string
}

export interface Cart {
  _id: string
  items: CartItem[]
}


// Utility functions for wishlist operations
"use server"
export interface WishlistItem {
    id: string
    addedAt: string
  }
  
  export function getWishlist(): WishlistItem[] {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem("wishlist") || "[]")
  }
  
  export function addToWishlist(productId: string): WishlistItem[] {
    if (typeof window === "undefined") return []
  
    const wishlist = getWishlist()
  
    // Check if product is already in wishlist
    if (!wishlist.some((item) => item.id === productId)) {
      wishlist.push({
        id: productId,
        addedAt: new Date().toISOString(),
      })
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  
    return wishlist
  }
  
  export function removeFromWishlist(productId: string): WishlistItem[] {
    if (typeof window === "undefined") return []
  
    const wishlist = getWishlist()
    const updatedWishlist = wishlist.filter((item) => item.id !== productId)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
  
    return updatedWishlist
  }
  
  export function isInWishlist(productId: string): boolean {
    if (typeof window === "undefined") return false
  
    const wishlist = getWishlist()
    return wishlist.some((item) => item.id === productId)
  }
  
  export function clearWishlist(): void {
    if (typeof window === "undefined") return
    localStorage.setItem("wishlist", "[]")
  }
  
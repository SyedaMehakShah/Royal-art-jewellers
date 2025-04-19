"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductWishlistCard from "@/app/components/product/product-wishlist-card"
import { useToast } from "@/hooks/use-toast"
import { client } from "@/sanity/lib/client"

export default function WishlistPage() {
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setIsLoading(true)
      try {
        const query = `*[_type == "wishlist"]{
          items[] {
            product->{
              _id,
              slug,
              name,
              price,
              originalPrice,
              discount,
              images,
              rating,
              reviewCount
            }
          }
        }`

        const response = await client.fetch(query)

        if (response.length > 0) {
          const uniqueProducts = response[0].items.map((item: any) => item.product)
          setWishlistItems(uniqueProducts)
        } else {
          setWishlistItems([])
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching wishlist items:", error)
        toast({
          title: "Error",
          description: "Failed to load your wishlist. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchWishlistItems()
  }, [toast])

  const removeFromWishlist = (slug: string) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.slug.current !== slug
    )
    setWishlistItems(updatedWishlist)

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    })
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary" />
          My Wishlist
        </h1>

        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 py-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg h-48 animate-pulse bg-muted"></div>
          ))}
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((product, index) => (
            <ProductWishlistCard
              key={`${product._id}-${index}`} // ✅ fix for duplicate key issue
              product={{
                ...product,
                slug: product.slug.current // ensure slug is string
              }}
              onRemove={() => removeFromWishlist(product.slug.current)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-muted/20">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later.</p>
          <Button asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

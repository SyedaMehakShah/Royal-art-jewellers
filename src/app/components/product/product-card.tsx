"use client"
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/app/lib/utils";
import { addToWishlistAction } from "@/app/lib/home-actions";

export default function ProductCard({ product }: { product: Product }) {
  // Handle wishlist addition with an async function
  const handleWishlistSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const formData = new FormData(event.target as HTMLFormElement);
    await addToWishlistAction(formData);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative group">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        {/* Wishlist form with custom submit handler */}
        <form onSubmit={handleWishlistSubmit}>
          <input type="hidden" name="productId" value={product._id} />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
          </Button>
        </form>
      </div>

      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

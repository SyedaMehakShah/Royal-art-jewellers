"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/app/lib/utils";
import { urlFor } from "@/sanity/lib/client";
interface ProductWishlistCardProps {
  product: {
    _id: string;
    slug: { current: string };
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: { url: string; alt: string }[];
    rating: number;
  };
  onRemove: (id: string) => void;
}

export default function ProductWishlistCard({
  product,
  onRemove,
}: ProductWishlistCardProps) {
  return (
    <div className="relative flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
        onClick={() => onRemove(product._id)}
        aria-label="Remove from wishlist"
      >
        <X className="h-4 w-4" />
      </Button>

      <Link
        href={`/products/${product.slug.current}`}
        className="block w-full md:w-1/3 relative aspect-square md:aspect-auto"
      >
        <Image
          src={
            product.images[0]
              ? urlFor(product.images[0]).width(300).url()
              : "/placeholder.svg?height=300&width=300"
          }
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug.current}`} className="block">
          <h3 className="font-medium text-lg hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 my-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating
                    ? "text-[#443627] fill-[#443627]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/products/${product.slug}`} passHref>
            <button className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-all duration-200">
              View Details
            </button>
          </Link>

          <Button variant="outline" className="flex-1">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

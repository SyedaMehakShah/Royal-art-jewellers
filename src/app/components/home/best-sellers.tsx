"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/app/lib/utils";
import { addToWishlistAction } from "@/app/lib/home-actions";

export default function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">
            Best Selling Jewelry
          </h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-[#4e4132]"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular pieces, loved by customers for their
            timeless elegance and exceptional craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group">
              <div className="relative overflow-hidden bg-white">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <form
                  action={async (formData) => {
                    const result = await addToWishlistAction(formData);
                    if (!result.success) {
                      console.error(result.error);
                    }
                  }}
                >
                  <input type="hidden" name="productId" value={product._id} />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </Button>
                </form>
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button
                    asChild
                    className="w-full bg-[#443627] hover:bg-[#292017] text-white border-0"
                  >
                    <Link href={`/products/${product.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href={`/products/${product.slug}`}
                  className="hover:text-amber-600"
                >
                  <h3 className="font-medium text-gray-800 mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-transparent hover:bg-amber-500 text-gray-800 hover:text-white border border-gray-300 hover:border-amber-500 rounded-none px-8 py-6"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

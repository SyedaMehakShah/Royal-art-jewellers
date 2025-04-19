import type { Product } from "@/types/product"
import ProductCard from "@/app/components/product/product-card"

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}


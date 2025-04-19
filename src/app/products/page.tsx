import { Suspense } from "react";
import ProductCard from "@/app/components/product/product-card";
import { getProducts } from "@/app/lib/sanity-utils";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "";

  const sort = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort || "createdAt";

  let products: Product[] = [];
  try {
   
    products = await getProducts({ limit: 100, sort, category });
    
  } catch (error: any) {
    products = []; // Ensure we handle the error gracefully by defaulting to an empty array.
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Jewelry Collection</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No products found. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Suspense
              key={product._id}
              fallback={
                <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
              }
            >
              <ProductCard product={product} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
}

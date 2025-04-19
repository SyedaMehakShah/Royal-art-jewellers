import { getProducts } from "@/app/lib/sanity-utils";
import Image from "next/image";

export default async function DebugPage() {
  const products = await getProducts({ limit: 100 });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: Products from Sanity</h1>

      <div className="bg-gray-100 p-4 mb-8 rounded">
        <h2 className="font-semibold mb-2">Environment Variables:</h2>
        <p>
          NEXT_PUBLIC_SANITY_PROJECT_ID:{" "}
          {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "✅ Set" : "❌ Not set"}
        </p>
        <p>
          NEXT_PUBLIC_SANITY_DATASET:{" "}
          {process.env.NEXT_PUBLIC_SANITY_DATASET ? "✅ Set" : "❌ Not set"}
        </p>
      </div>

      <p className="mb-4">Total products found: {products.length}</p>

      {products.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-semibold mb-2">No products found!</h2>
          <p>Possible reasons:</p>
          <ul className="list-disc pl-5">
            <li>No products have been added to Sanity yet</li>
            <li>The Sanity query is incorrect</li>
            <li>The Sanity project ID or dataset name is incorrect</li>
            <li>The Sanity API token doesn&apos;t have read permissions</li>
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any) => (
            <div key={product._id} className="border p-4 rounded">
              <h2 className="font-bold">{product.name}</h2>
              <p>Slug: {product.slug}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Images: {product.images?.length || 0}</p>
              <div className="mt-2">
                {product.images && product.images[0] && (
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-40 w-40 object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

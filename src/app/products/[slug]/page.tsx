import { getProduct, getRelatedProducts } from "@/app/lib/sanity-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Star, Truck, Shield, Info } from "lucide-react";
import ProductGallery from "@/app/components/product/product-gallery";
import AddToCartForm from "@/app/components/product/add-to-cart-form";
import RelatedProducts from "@/app/components/product/related-products";
import ProductReviews from "@/app/components/product/product-reviews";
import { formatCurrency } from "@/app/lib/utils";
import WishlistButton from "@/app/components/product/add-to-wishlist-button";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product._id,
    product.category
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <ProductGallery images={product.images} />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "text-[#5c4f41] fill-[#5c4f41]" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Collections */}
          {product.collections && product.collections.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Collections:</p>
              <div className="flex flex-wrap gap-2">
                {product.collections.map(
                  (collection: {
                    _id: string;
                    slug: string;
                    title: string;
                  }) => (
                    <Link
                      key={collection._id}
                      href={`/collections/${collection.slug}`}
                      className="inline-block bg-amber-50 text-[#312416] text-xs font-medium px-2.5 py-1 rounded hover:bg-amber-100"
                    >
                      {collection.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}

          {/* Real-time gold rate */}
          {product.metalType === "gold" && (
            <div className="bg-amber-50 p-3 rounded-md mb-6 flex items-center">
              <Info className="h-5 w-5 text-[#241b11] mr-2" />
              <span className="text-sm">
                Current Gold Rate: <strong>{formatCurrency(8500)}/gram</strong>{" "}
                (22K)
              </span>
            </div>
          )}

          {/* Product specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="text-muted-foreground">Metal Type:</span>
                <span className="font-medium">{product.metalType}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-muted-foreground">Weight:</span>
                <span className="font-medium">{product.weight} grams</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-muted-foreground">Purity:</span>
                <span className="font-medium">{product.purity}</span>
              </div>
              {product.gemstones && (
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Gemstones:</span>
                  <span className="font-medium">{product.gemstones}</span>
                </div>
              )}
            </div>
          </div>

          {/* Add to cart form
          <AddToCartForm product={product} /> */}
          {/* Add to cart and wishlist */}
          <div className="flex items-center">
            <AddToCartForm product={product} />
            <WishlistButton
              productId={product._id}
              productName={product.name}
            />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Certified Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>
          <TabsContent value="specifications" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications || {}).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span>{value as string}</span>
                  </div>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-6">
            <ProductReviews productId={product._id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

import { getCart } from "@/app/lib/actions";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";
import CartQuantity from "@/app/components/cart/cart-quantity";
import CartSummary from "@/app/components/cart/cart-summary";
import RemoveFromCart from "@/app/components/cart/remove-from-cart";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    category: string;
    rating: number;
    reviewCount: number;
  };
  size?: string;
  quantity: number;
}

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added any jewelry to your cart yet.
          </p>
          <Link href="/products">
          <button >
            Continue Shopping
          </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.map((item: CartItem) => (
        <div key={item._id} className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              <div className="divide-y">
                {cart.items.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6 flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        <div className="md:hidden mt-2">
                          <RemoveFromCart itemId={item._id} />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 md:text-center flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">
                        Price:
                      </span>
                      <span>{formatCurrency(item.product.price)}</span>
                    </div>

                    <div className="md:col-span-2 md:text-center flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">
                        Quantity:
                      </span>
                      <CartQuantity item={item} />
                    </div>

                    <div className="md:col-span-2 md:text-center flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">
                        Total:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <div className="hidden md:block">
                      <RemoveFromCart itemId={item._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/products">
            <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">Continue Shopping</button>
            </Link>
          </div>
        </div>
      ))}
      <div className="lg:col-span-1">
        <CartSummary cart={cart} />
      </div>
    </div>
    // </div>
  );
}

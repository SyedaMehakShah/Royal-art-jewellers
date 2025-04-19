import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";
import type { Cart } from "@/types/cart";

export default function OrderSummary({ cart }: { cart: Cart }) {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="max-h-80 overflow-y-auto mb-6">
        {cart.items.map((item) => (
          <div key={item._id} className="flex gap-3 py-3 border-b">
            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium line-clamp-1">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="hover:underline"
                >
                  {item.product.name}
                </Link>
              </h3>
              {item.size && (
                <p className="text-xs text-muted-foreground">
                  Size: {item.size}
                </p>
              )}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {item.quantity} × {formatCurrency(item.product.price)}
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

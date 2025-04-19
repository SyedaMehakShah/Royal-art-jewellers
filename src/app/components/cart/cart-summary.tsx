"use client";

import { useRouter } from "next/navigation";
import { formatCurrency } from "@/app/lib/utils";
import type { Cart } from "@/types/cart";
import Button from "@/app/components/ui/button";

export default function CartSummary({ cart }: { cart: Cart }) {
  const router = useRouter();

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

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

      <Button
        onClick={handleCheckout}
        className="w-full"
        label="Proceed to Checkout"
      >
        Proceed to Checkout
      </Button>

      <div className="mt-6">
        <h3 className="font-medium mb-2">We Accept</h3>
        <div className="flex gap-2">
          <div className="bg-gray-100 rounded p-2 text-xs">EasyPaisa</div>
          <div className="bg-gray-100 rounded p-2 text-xs">JazzCash</div>
          <div className="bg-gray-100 rounded p-2 text-xs">
            Cash on Delivery
          </div>
        </div>
      </div>
    </div>
  );
}

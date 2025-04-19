import { getCart } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import CheckoutForm from "@/app/components/checkout/checkout-form";
import OrderSummary from "@/app/components/checkout/order-summary";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}

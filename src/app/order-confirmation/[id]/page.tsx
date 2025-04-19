import { redirect } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
})

async function getOrder(id: string) {
  return client.fetch(`*[_type == "order" && _id == "${id}"][0] {
    _id,
    customer,
    status,
    total,
    paymentMethod,
    createdAt
  }`)
}

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)

  if (!order || !order.customer) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase, {order.customer?.firstName || "Customer"}! Your order has been received and is being processed.
        </p>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "easypaisa"
                    ? "EasyPaisa"
                    : "JazzCash"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/account/orders">View Your Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

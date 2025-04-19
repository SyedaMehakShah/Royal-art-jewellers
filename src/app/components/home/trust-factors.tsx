import { Shield, Star, Truck, CreditCard } from "lucide-react"

export default function TrustFactors() {
  const factors = [
    {
      icon: Shield,
      title: "Authentic Jewelry",
      description: "All our products come with authenticity certificates",
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Trusted by thousands of satisfied customers",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders above Rs. 10,000",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple secure payment options",
    },
  ]

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {factors.map((factor, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg">
            <factor.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{factor.title}</h3>
            <p className="text-muted-foreground">{factor.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock } from "lucide-react"

export default function LimitedOffers() {
  return (
    <section className="my-16 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg p-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
        <p className="text-lg mb-6">
          Exclusive deals on our finest jewelry collections. Don&apos;t miss out on these special prices!
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Offer ends in: 3 days 12:45:30</span>
        </div>

        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/offers">Shop the Sale</Link>
        </Button>
      </div>
    </section>
  )
}


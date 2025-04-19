import Link from "next/link"
import {  Instagram,  Mail, Phone, MapPin } from "lucide-react"
import  Button  from "@/app/components/ui/button"
// import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-[#291909fd] text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-serif mb-6">ROYAL ART JEWELLERS</h3>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Discover exquisite jewelry pieces crafted with precision and passion. From timeless classics to
              contemporary designs, find the perfect piece to celebrate life&apos;s special moments.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/royalartjewellers6/" className="text-gray-400 hover:text-[#443627] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-serif mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-serif mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#443627] transition-colors inline-block">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white text-lg font-serif mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-[#443627]" />
                <span className="text-gray-400">Shop # NP-12/4 Kundan Street Mithadar Sarafa Bazar Karachi Pakistan.</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-[#443627]" />
                <span className="text-gray-400">Imran : +92 3232876146</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-[#443627]" />
                <span className="text-gray-400">Rizwan: +92 3213785176</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-[#443627]" />
                <span className="text-gray-400">Haroon: +92 3081131179</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-[#443627]" />
                <span className="text-gray-400">info@imranwalipatel@gmail.com</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-gray-800">
              <h4 className="text-white text-sm font-medium mb-4">Subscribe to our newsletter</h4>
              <div className="flex">
            
                <Button label="Subscribe" className="rounded-l-none bg-amber-600 hover:bg-amber-700 border-0">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Royal Art Jewerlers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


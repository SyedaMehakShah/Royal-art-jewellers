import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "@/app/components/contact/contact-form"
import bannerpic from "../../../public/bannerpicture.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] w-full">
        <Image src={bannerpic} alt="Contact Us" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">We&apos;d love to hear from you</p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-light mb-6 text-gray-800">Get In Touch</h2>
              <div className="w-20 h-0.5 bg-[#312517] mb-8"></div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                We&apos;re here to assist you with any questions about our jewelry, services, or to schedule an appointment
                for a personalized consultation. Feel free to reach out to us through any of the following channels.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-[#443627]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Visit Our Store</h3>
                    <p className="text-gray-600">Shop# NP-12/4 Kundan Street Mithadar Sarafa Bazar Karachi.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-[#443627]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">+92 3232876146</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-[#443627]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@imranwalipatel.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-[#443627]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Store Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif font-light mb-6 text-gray-800">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     
      <section className="py-20 bg-gray-50">
      
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-0.5 bg-[#443627]"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, products, and policies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-800">
                    Do you offer custom jewelry design services?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes, we offer bespoke jewelry design services. Our experienced designers will work closely with you to
                  create a unique piece that reflects your personal style and preferences. Please contact us to schedule
                  a consultation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-800">What payment methods do you accept?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  We accept various payment methods including credit/debit cards, bank transfers, EasyPaisa, JazzCash,
                  and cash on delivery for online orders. In our physical store, we also accept cash payments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-800">Do you provide jewelry repair services?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes, we offer comprehensive jewelry repair services including ring resizing, stone replacement, chain
                  repair, clasp replacement, and professional cleaning. Please bring your piece to our store for an
                  assessment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-800">What is your return policy?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  We offer a 30-day return policy for most items in their original, unworn condition with all tags and
                  packaging. Custom-made pieces and special orders are non-returnable. Please refer to our Returns &
                  Exchanges page for more details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-800">Do you offer jewelry appraisal services?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes, we provide professional jewelry appraisal services for insurance, estate planning, or resale
                  purposes. Our certified gemologists can assess the value of your jewelry based on current market
                  conditions, materials, craftsmanship, and other relevant factors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
       
      </section>
      

      
     
    </main>
  )
}


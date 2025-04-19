import Image from "next/image";
import Link from "next/link";
import pic from "../../../public/bannerpicset.jpg";
import design from "../../../public/designeraing.jpg";
import crafting from "../../../public/crafting.jpg";
import finishing from "../../../public/finishdesign.jpg";
import material from "../../../public/ringbannerpic.jpg";
import banner from "../../../public/aboutbanner.jpg";
export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={banner}
          alt="Jewelry craftsmanship"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Crafting timeless elegance since 1995
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-gray-800">
                Our Heritage
              </h2>
              <div className="w-20 h-0.5 bg-amber-400 mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 1995, Royal Art Jewellers began its journey as a
                trusted wholesaler in the bustling Sarafa Bazar of Karachi.
                Located at Shop NP-12/4, Kundan Street, Mithadar, we have built
                our reputation on timeless craftsmanship, premium quality, and a
                deep commitment to excellence. For decades, we&rsquo;ve been a
                reliable name for exquisite gold jewelry that blends tradition
                with elegance.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Over the decades, we have grown from a boutique workshop to a
                renowned jewelry house, while maintaining our commitment to
                artisanal craftsmanship and personalized service. Each piece in
                our collection tells a story of heritage, passion, and
                meticulous attention to detail.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to honor our founder&apos;s legacy by creating
                jewelry that celebrates life&apos;s most precious moments, combining
                traditional techniques with contemporary design sensibilities.
              </p>
            </div>
            <div className="relative h-[500px] w-full">
              <Image
                src={pic}
                alt="Our jewelry store heritage"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">
              Our Mission & Values
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-0.5 bg-amber-400"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are guided by our commitment to excellence, integrity, and
              creating jewelry that becomes part of your life&apos;s story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4 text-gray-800">
                Excellence
              </h3>
              <p className="text-gray-600">
                We are committed to creating jewelry of exceptional quality,
                using only the finest materials and craftsmanship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4 text-gray-800">
                Integrity
              </h3>
              <p className="text-gray-600">
                We operate with transparency and honesty, ensuring that every
                piece meets the highest ethical standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4 text-gray-800">Passion</h3>
              <p className="text-gray-600">
                We pour our heart into every design, creating pieces that
                inspire emotion and become cherished heirlooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">
              Our Craftsmanship
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-0.5 bg-[#66513a]"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each piece of jewelry is meticulously crafted through a process
              that honors traditional techniques while embracing modern
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg">
                <Image
                  src={design}
                  alt="Design process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#3a2e21] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 relative z-10">
                <span className="font-medium">1</span>
              </div>
              <h3 className="text-xl font-serif mb-2 text-gray-800">Design</h3>
              <p className="text-gray-600">
                Our designers sketch each piece by hand, carefully considering
                proportion, balance, and wearability.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg">
                <Image
                  src={material}
                  alt="Material selection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#3a2e21] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 relative z-10">
                <span className="font-medium">2</span>
              </div>
              <h3 className="text-xl font-serif mb-2 text-gray-800">
                Materials
              </h3>
              <p className="text-gray-600">
                We source only the finest gemstones and precious metals,
                ensuring quality and ethical standards.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg">
                <Image
                  src={crafting}
                  alt="Crafting process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#3a2e21] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 relative z-10">
                <span className="font-medium">3</span>
              </div>
              <h3 className="text-xl font-serif mb-2 text-gray-800">
                Crafting
              </h3>
              <p className="text-gray-600">
                Our master artisans bring designs to life using traditional
                techniques passed down through generations.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg">
                <Image
                  src={finishing}
                  alt="Quality control"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#3a2e21] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 relative z-10">
                <span className="font-medium">4</span>
              </div>
              <h3 className="text-xl font-serif mb-2 text-gray-800">
                Finishing
              </h3>
              <p className="text-gray-600">
                Each piece undergoes rigorous quality control to ensure it meets
                our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#443627] text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 tracking-wide">
      Experience Our Craftsmanship
    </h2>
    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
      Visit our showroom to explore our curated gold collections and discover the
      perfect piece for your special moment.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/contact">
        <button className="bg-[#BFA27A] text-white hover:bg-[#a88d6a] transition-all duration-300 border-0 rounded-none px-8 py-4 uppercase tracking-wider text-sm shadow-md">
          Contact Us
        </button>
      </Link>
      <Link href="/collections">
        <button className="bg-transparent hover:bg-[#5a4c3a] text-white border border-[#BFA27A] hover:border-[#a88d6a] rounded-none px-8 py-4 uppercase tracking-wider text-sm shadow-md transition-all duration-300">
          Explore Collection
        </button>
      </Link>
    </div>
  </div>
</section>

    </main>
  );
}

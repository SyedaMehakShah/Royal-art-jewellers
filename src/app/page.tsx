import {
  getProducts,
  getFeaturedCollections,
  getBanners,
} from "@/app/lib/sanity-utils";
import HeroSection from "@/app/components/home/hero-section";
import FeaturedCollections from "@/app/components/home/featured-collections";
import BestSellers from "@/app/components/home/best-sellers";
import CategoryShowcase from "@/app/components/home/category-showcase";
import Testimonials from "@/app/components/home/testimonials";
import InstagramFeed from "@/app/components/home/instagram-feed";
import NewsletterSection from "@/app/components/home/newsletter-section";
import { Suspense } from "react";

export default async function Home() {
  // Use try-catch to handle errors
  let banners = [];
  let featuredCollections = [];
  let bestSellers = [];

  try {
    // Fetch data with error handling
    banners = await getBanners();
    featuredCollections = await getFeaturedCollections();
    bestSellers = await getProducts({ limit: 8, sort: "popularity" });
  } catch (error) {
    console.error("Error fetching data for homepage:", error);
    // Continue with empty arrays
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Suspense
        fallback={
          <div className="w-full h-[600px] bg-gray-100 animate-pulse"></div>
        }
      >
        <HeroSection banners={banners} />
      </Suspense>

      {/* Elegant intro section */}
      <section className="w-full py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-gray-800">
            Exquisite Craftsmanship
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Discover our collection of handcrafted jewelry pieces, designed with
            precision and passion. Each piece tells a unique story, combining
            traditional artistry with contemporary elegance.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-0.5 bg-amber-400"></div>
          </div>
        </div>
      </section>

      {/* Featured Collections with new design */}
      <Suspense
        fallback={
          <div className="w-full h-[400px] bg-gray-100 animate-pulse"></div>
        }
      >
        <FeaturedCollections collections={featuredCollections} />
      </Suspense>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Best Sellers with new design */}
      <Suspense
        fallback={
          <div className="w-full h-[400px] bg-gray-100 animate-pulse"></div>
        }
      >
        <BestSellers products={bestSellers} />
      </Suspense>

      {/* Testimonials */}
      <Testimonials />

      
      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}

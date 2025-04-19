"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/lib/home-actions";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await subscribeToNewsletter(email);
      setIsSuccess(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to subscribe:", err);
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 bg-[#443627] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8 opacity-90">
            Stay updated with our latest collections, exclusive offers, and
            jewelry care tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-amber-400"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-[#443627] hover:bg-amber-100 border-0"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {isSuccess && (
            <p className="mt-4 text-amber-100">
              Thank you for subscribing! You&apos;ll receive our next newsletter
              soon.
            </p>
          )}

          {error && <p className="mt-4 text-red-200">{error}</p>}
        </div>
      </div>
    </section>
  );
}

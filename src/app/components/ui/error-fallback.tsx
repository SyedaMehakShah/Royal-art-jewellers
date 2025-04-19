"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary?: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We&apos;re sorry, but there was an error loading this page. Our team has been notified.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} variant="outline">
            Try again
          </Button>
        )}
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left max-w-lg overflow-auto">
        <p className="font-mono text-sm text-red-600">{error.message}</p>
      </div>
    </div>
  )
}


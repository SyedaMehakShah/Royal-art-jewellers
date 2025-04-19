import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/app/components/layout/header"
import Footer from "@/app/components/layout/footer"
import { Toaster } from "@/app/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Royal Art Jewellers",
  description: "Discover exquisite jewelry pieces for every occasion",
  
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`} suppressHydrationWarning>
        <ClerkProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}

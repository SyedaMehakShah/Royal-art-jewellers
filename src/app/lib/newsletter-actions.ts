"use server"

import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function subscribeToNewsletter(email: string) {
  if (!email) {
    throw new Error("Email is required")
  }

  try {
    // Here you would typically save the email to your database or send it to your email service
    // For now, we'll just simulate a successful subscription

    // If you want to save to Sanity, you could do something like:
    await client.create({
      _type: "newsletterSubscriber",
      email,
      subscribedAt: new Date().toISOString(),
    })

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
   
    throw new Error("Failed to subscribe to newsletter")
  }
}


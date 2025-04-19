"use client"

import { useState } from "react"
import emailjs from "emailjs-com"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setIsSuccess(false)

    emailjs
      .send(
        "service_w80w0y7",        
        "template_h61edxd",       
        formState,
        "aMmScPePgD8sGCPjV"      
      )
      .then(
        () => {
          setIsSubmitting(false)
          setIsSuccess(true)
          setFormState({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        },
        (error) => {
          setIsSubmitting(false)
          setErrorMessage("Failed to send message. Please try again later.")
          console.error("EmailJS Error:", error)
        }
      )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#271b0f]">Contact Us</h2>

      {isSuccess && (
        <p className="text-green-700 bg-green-100 border border-green-300 rounded p-3 mb-4">
          ✅ Your message has been sent successfully!
        </p>
      )}

      {errorMessage && (
        <p className="text-red-600 bg-red-100 border border-red-300 rounded p-3 mb-4">
          ❌ {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-[#d6b98c]"
        />

        <input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-[#d6b98c]"
        />

        <input
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-[#d6b98c]"
        />

        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-[#d6b98c]"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#271b0f] text-white py-3 px-6 rounded-md hover:bg-[#443627] transition"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}

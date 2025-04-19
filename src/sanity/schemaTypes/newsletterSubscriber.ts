import { Rule } from "sanity"
const newsletterSchema = {
    name: "newsletterSubscriber",
    title: "Newsletter Subscribers",
    type: "document",
    fields: [
      {
        name: "email",
        title: "Email",
        type: "string",
        validation: (Rule: Rule) => Rule.required().email(),
      },
      {
        name: "subscribedAt",
        title: "Subscribed At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      },
    ],
    preview: {
      select: {
        title: "email",
        subtitle: "subscribedAt",
      },
    },
  }


export default newsletterSchema
  
  
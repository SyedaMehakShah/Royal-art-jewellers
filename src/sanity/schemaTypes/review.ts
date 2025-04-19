import { Rule } from "sanity"
const reviewSchema =  {
    name: "review",
    title: "Review",
    type: "document",
    fields: [
      {
        name: "product",
        title: "Product",
        type: "reference",
        to: [{ type: "product" }],
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "rating",
        title: "Rating",
        type: "number",
        validation: (Rule: Rule) => Rule.required().min(1).max(5),
      },
      {
        name: "comment",
        title: "Comment",
        type: "text",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      },
    ],
  }
  
export default reviewSchema
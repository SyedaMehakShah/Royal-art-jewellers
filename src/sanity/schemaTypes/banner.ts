import { Rule } from "sanity"
export default {
    name: "banner",
    title: "Banner",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "subtitle",
        title: "Subtitle",
        type: "string",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "link",
        title: "Link",
        type: "string",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        description: "Order in which to display banners",
        initialValue: 0,
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "image",
      },
    },
  }
  
  
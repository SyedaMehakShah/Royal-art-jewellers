import { Rule } from "sanity"
export default {
    name: "collection",
    title: "Collection",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: Rule) => Rule.required(),
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
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this collection as featured on homepage",
        initialValue: false,
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        description: "Order in which to display featured collections",
        initialValue: 0,
      },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "image",
      },
    },
  }
  
  
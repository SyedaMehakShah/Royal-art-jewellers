import { Rule } from "sanity";

export default {
  name: "wishlist",
  title: "Wishlist",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Image",
              type: "image", // Add image type for the image field
              options: {
                hotspot: true, // Allow cropping and focusing on the image
              },
            },
          ],
        },
      ],
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};

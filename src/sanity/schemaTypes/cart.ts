import { Rule } from "sanity"
export default {
    name: "cart",
    title: "Cart",
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
                validation: (Rule : Rule) => Rule.required(),
              },
              {
                name: "quantity",
                title: "Quantity",
                type: "number",
                validation: (Rule: Rule) => Rule.required().min(1),
              },
              {
                name: "size",
                title: "Size",
                type: "string",
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
  }
  
  
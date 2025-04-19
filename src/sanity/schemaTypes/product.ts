import { Rule } from "sanity" 
const productSchema = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 96,
        },
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "images",
        title: "Images",
        type: "array",
        of: [{ type: "image" }],
        options: {
          hotspot: true,
        },
        validation: (Rule: Rule) => Rule.required().min(1),
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule: Rule) => Rule.required().positive(),
      },
      {
        name: "originalPrice",
        title: "Original Price (for discounts)",
        type: "number",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "category",
        title: "Category",
        type: "string",
        options: {
          list: [
            { title: "Rings", value: "rings" },
            { title: "Necklaces", value: "necklaces" },
            { title: "Earrings", value: "earrings" },
            { title: "Bracelets", value: "bracelets" },
            { title: "Bridal", value: "bridal" },
          ],
        },
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: "collections",
        title: "Collections",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "collection" }],
          },
        ],
        description: "Assign this product to collections",
      },
      {
        name: "metalType",
        title: "Metal Type",
        type: "string",
        options: {
          list: [
            { title: "Gold", value: "gold" },
            { title: "Silver", value: "silver" },
            { title: "Platinum", value: "platinum" },
            { title: "Rose Gold", value: "rose-gold" },
          ],
        },
      },
      {
        name: "weight",
        title: "Weight (grams)",
        type: "number",
      },
      {
        name: "purity",
        title: "Purity",
        type: "string",
        options: {
          list: [
            { title: "24K", value: "24K" },
            { title: "22K", value: "22K" },
            { title: "18K", value: "18K" },
            { title: "14K", value: "14K" },
            { title: "925 Sterling", value: "925 Sterling" },
          ],
        },
      },
      {
        name: "gemstones",
        title: "Gemstones",
        type: "string",
      },
      {
        name: "sizes",
        title: "Available Sizes",
        type: "array",
        of: [{ type: "string" }],
      },
      {
        name: "specifications",
        title: "Specifications",
        type: "object",
        fields: [
          { name: "material", title: "Material", type: "string" },
          { name: "finish", title: "Finish", type: "string" },
          { name: "dimensions", title: "Dimensions", type: "string" },
          { name: "certification", title: "Certification", type: "string" },
        ],
      },
      {
        name: "rating",
        title: "Rating",
        type: "number",
        validation: (Rule: Rule) => Rule.min(0).max(5),
      },
      {
        name: "reviewCount",
        title: "Review Count",
        type: "number",
        validation: (Rule : Rule) => Rule.min(0),
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this product as featured",
        initialValue: false,
      },
      {
        name: "bestseller",
        title: "Bestseller",
        type: "boolean",
        description: "Mark this product as bestseller",
        initialValue: false,
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
        title: "name",
        media: "images.0",
      },
    },
  }
  
export default productSchema
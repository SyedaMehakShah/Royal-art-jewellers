const orderSchema =  {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customer",
        title: "Customer",
        type: "object",
        fields: [
          { name: "firstName", title: "First Name", type: "string" },
          { name: "lastName", title: "Last Name", type: "string" },
          { name: "email", title: "Email", type: "string" },
          { name: "phone", title: "Phone", type: "string" },
        ],
      },
      {
        name: "shippingAddress",
        title: "Shipping Address",
        type: "object",
        fields: [
          { name: "address", title: "Address", type: "string" },
          { name: "city", title: "City", type: "string" },
          { name: "province", title: "Province", type: "string" },
          { name: "postalCode", title: "Postal Code", type: "string" },
        ],
      },
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
              },
              {
                name: "quantity",
                title: "Quantity",
                type: "number",
              },
              {
                name: "price",
                title: "Price",
                type: "number",
              },
              {
                name: "size",
                title: "Size",
                type: "string",
              },
            ],
            preview: {
              select: {
                title: "product.title",
                media: "product.image",
                subtitle: "price",
              },
            },
          },
        ],
      },
      { name: "subtotal", title: "Subtotal", type: "number" },
      { name: "shipping", title: "Shipping", type: "number" },
      { name: "total", title: "Total", type: "number" },
      {
        name: "paymentMethod",
        title: "Payment Method",
        type: "string",
        options: {
          list: [
            { title: "Cash on Delivery", value: "cod" },
            { title: "EasyPaisa", value: "easypaisa" },
            { title: "JazzCash", value: "jazzcash" },
          ],
        },
      },
      { name: "transactionId", title: "Transaction ID", type: "string" },
      {
        name: "status",
        title: "Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Processing", value: "processing" },
            { title: "Shipped", value: "shipped" },
            { title: "Delivered", value: "delivered" },
            { title: "Cancelled", value: "cancelled" },
          ],
        },
        initialValue: "pending",
      },
      { name: "notes", title: "Notes", type: "text" },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      },
    ],
    
  }
  

export default orderSchema
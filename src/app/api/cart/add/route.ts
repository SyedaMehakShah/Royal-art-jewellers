// import { NextResponse } from "next/server"
// import { client } from "@/sanity/lib/client"
// import { v4 as uuidv4 } from "uuid"
// import { cookies } from "next/headers"

// export async function POST(req: Request) {
//   const data = await req.formData()
//   const productId = data.get("productId") as string
//   const quantity = parseInt(data.get("quantity") as string)
//   const size = data.get("size") as string

//   const cookieStore = cookies()
//   let cartId = cookieStore.get("cartId")?.value || ""
//   if (!cartId) {
//     cartId = uuidv4();
//     cookieStore.set("cartId", cartId, {
//       maxAge: 60 * 60 * 24 * 30,
//       path: "/", // ✅ good to include
//     });
//   }

//   try {
//     const cart = await client.fetch(
//       `*[_type == "cart" && _id == $cartId][0]`,
//       { cartId }
//     )

//     const item = {
//       _key: uuidv4(),
//       product: { _type: "reference", _ref: productId },
//       quantity,
//       size,
//     }

//     if (!cart) {
//       await client.create({
//         _type: "cart",
//         _id: cartId,
//         items: [item],
//       })
//     } else {
//       await client
//         .patch(cartId)
//         .setIfMissing({ items: [] })
//         .append("items", [item])
//         .commit()
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error adding to cart", error)
//     return NextResponse.json({ success: false, error: "Failed to add to cart" })
//   }
// }


import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.formData();
  const productId = data.get("productId") as string;
  const quantity = parseInt(data.get("quantity") as string);
  const size = data.get("size") as string;

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  // Prepare response early so we can set cookies on it
  const response = NextResponse.json({ success: true });

  if (!cartId) {
    cartId = uuidv4();
    response.cookies.set("cartId", cartId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  try {
    // Check if cart already exists
    const cart = await client.fetch(
      `*[_type == "cart" && _id == $cartId][0]`,
      { cartId }
    );

    // Create new item to add
    const item = {
      _key: uuidv4(),
      product: { _type: "reference", _ref: productId },
      quantity,
      size,
    };

    if (!cart) {
      // New cart
      await client.create({
        _type: "cart",
        _id: cartId,
        items: [item],
      });
    } else {
      // Existing cart – append new item
      await client
        .patch(cartId)
        .setIfMissing({ items: [] })
        .append("items", [item])
        .commit();
    }

    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ success: false, error: "Failed to add to cart" });
  }
}

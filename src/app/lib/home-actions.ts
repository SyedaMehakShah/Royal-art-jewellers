"use server"


// import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
export async function addToWishlistAction(formData: FormData): Promise<{ success: boolean; error?: string }>  {
  const productId = formData.get("productId") as string;
  if (!productId) return { success: false, error: "Product ID is required" };

  try {
    const cookiesStore = await cookies();
    let wishlistId = cookiesStore.get("wishlistId")?.value;

    if (!wishlistId) {
      // Create a new wishlist
      const newWishlist = await client.create({
        _type: "wishlist",
        items: [
          {
            _key: Date.now().toString(),
            product: { _type: "reference", _ref: productId },
          },
        ],
      });

      wishlistId = newWishlist._id;
      cookiesStore.set("wishlistId", wishlistId, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    } else {
      // Fetch existing wishlist
      const wishlist = await client.fetch(`*[_type == "wishlist" && _id == "${wishlistId}"][0]`);

      if (wishlist) {
        type WishlistItem = { product: { _ref: string } };
        const existingItemIndex = wishlist.items?.findIndex(
          (item: WishlistItem) => item.product._ref === productId
        );

        if (existingItemIndex === -1 || existingItemIndex === undefined) {
          await client
            .patch(wishlistId)
            .setIfMissing({ items: [] })
            .append("items", [
              {
                _key: Date.now().toString(),
                product: { _type: "reference", _ref: productId },
              },
            ])
            .commit();
        }
      }
    }

    revalidatePath("/wishlist");
    return { success: true };
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    return { success: false, error: "Failed to add to wishlist" };
  }
}

// // src/lib/home-actions.ts

// export async function subscribeToNewsletter(email: string): Promise<void> {
//   // Replace with your logic — e.g., send to API or save in DB
//   console.log(`Subscribing ${email} to the newsletter...`)
// }




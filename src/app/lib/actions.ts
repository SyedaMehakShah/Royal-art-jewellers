"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type CartItem = {
  _key: string;
  product: { _ref: string };
  quantity: number;
  size?: string;
};

export async function getCart() {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return null;

  const cart = await client.fetch(`
    *[_type == "cart" && _id == "${cartId}"][0] {
      _id,
      "items": items[] {
        _key,
        "_id": _key,
        quantity,
        size,
        "product": product-> {
          _id,
          name,
          "slug": slug.current,
          price,
          "images": images[].asset->url
        }
      }
    }
  `);

  return cart;
}

export async function addToCart(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const productId = formData.get("productId")?.toString();
  const quantity = Number(formData.get("quantity"));
  const size = formData.get("size")?.toString();

  if (!productId) return { success: false, error: "Product ID is required" };

  try {
    let cartId = (await cookies()).get("cartId")?.value;

    if (!cartId) {
      const newCart = await client.create({
        _type: "cart",
        items: [
          {
            _key: Date.now().toString(),
            product: { _type: "reference", _ref: productId },
            quantity,
            ...(size && { size }),
          },
        ],
      });

      cartId = newCart._id;
      const responseCookies = await cookies();
      responseCookies.set("cartId", cartId, { maxAge: 60 * 60 * 24 * 30 });
    } else {
      const cart = await client.fetch(`*[_type == "cart" && _id == "${cartId}"][0]`);

      if (!cart) return { success: false, error: "Cart not found" };

      const existingItemIndex = cart.items?.findIndex(
        (item: CartItem) => item.product._ref === productId && item.size === size
      );

      if (existingItemIndex > -1) {
        await client
          .patch(cartId)
          .setIfMissing({ items: [] })
          .set({
            [`items[${existingItemIndex}].quantity`]: cart.items[existingItemIndex].quantity + quantity,
          })
          .commit();
      } else {
        await client
          .patch(cartId)
          .setIfMissing({ items: [] })
          .append("items", [
            {
              _key: Date.now().toString(),
              product: { _type: "reference", _ref: productId },
              quantity,
              ...(size && { size }),
            },
          ])
          .commit();
      }
    }

    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return { success: false, error: "Cart not found" };

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == "${cartId}"][0]`);

    if (!cart) return { success: false, error: "Cart not found" };

    const itemIndex = cart.items.findIndex((item: CartItem) => item._key === itemId);

    if (itemIndex === -1) return { success: false, error: "Item not found" };

    await client
      .patch(cartId)
      .set({ [`items[${itemIndex}].quantity`]: quantity })
      .commit();

    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update cart" };
  }
}

export async function removeFromCart(itemId: string) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return { success: false, error: "Cart not found" };

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == "${cartId}"][0]`);

    if (!cart) return { success: false, error: "Cart not found" };

    const itemIndex = cart.items.findIndex((item: CartItem) => item._key === itemId);

    if (itemIndex === -1) return { success: false, error: "Item not found" };

    await client.patch(cartId).unset([`items[${itemIndex}]`]).commit();

    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to remove from cart" };
  }
}


export async function addToWishlist(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const productId = formData.get("productId") as string;

  if (!productId) return { success: false, error: "Product ID is required" };

  try {
    let wishlistId = (await cookies()).get("wishlistId")?.value;

    if (!wishlistId) {
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
      const responseCookies = await cookies();
      responseCookies.set("wishlistId", wishlistId, { maxAge: 60 * 60 * 24 * 30 });
    } else {
      const wishlist = await client.fetch(`*[_type == "wishlist" && _id == "${wishlistId}"][0]`);

      if (!wishlist) return { success: false, error: "Wishlist not found" };

      const existingItemIndex = wishlist.items?.findIndex(
        (item: { product: { _ref: string } }) => item.product._ref === productId
      );

      if (existingItemIndex === -1) {
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

    revalidatePath("/wishlist");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to add to wishlist" };
  }
}
export async function getProductReviews(productId: string) {
  try {
    const reviews = await client.fetch(
      `*[_type == "review" && product._ref == "${productId}"] | order(createdAt desc) {
        _id,
        name,
        rating,
        comment,
        createdAt
      }`
    );

    return { success: true, reviews };
  } catch {
    return { success: false, error: "Failed to fetch reviews" };
  }
}

export async function submitReview(formData: FormData) {
  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const rating = Number.parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  if (!productId || !name || !rating || !comment) {
    return { success: false, error: "All fields are required" };
  }

  try {
    const review = await client.create({
      _type: "review",
      product: { _type: "reference", _ref: productId },
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });

    const product = await client.fetch(`*[_type == "product" && _id == "${productId}"][0] {
      rating,
      reviewCount
    }`);

    const currentRating = product.rating || 0;
    const currentReviewCount = product.reviewCount || 0;

    const newReviewCount = currentReviewCount + 1;
    const newRating = (currentRating * currentReviewCount + rating) / newReviewCount;

    await client
      .patch(productId)
      .set({
        rating: Math.round(newRating * 10) / 10,
        reviewCount: newReviewCount,
      })
      .commit();

    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      review: {
        _id: review._id,
        name,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      },
    };
  } catch {
    return { success: false, error: "Failed to submit review" };
  }
}

export async function placeOrder(formData: FormData): Promise<{ success: boolean; error?: string; orderId?: string }> {
  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!name || !address || !phone) {
    return { success: false, error: "All fields are required" };
  }

  // Add your order placement logic here

  return { success: false, error: "Order placement logic not implemented" }; // Ensure a return statement exists
}
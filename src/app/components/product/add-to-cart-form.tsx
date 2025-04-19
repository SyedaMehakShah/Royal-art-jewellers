// "use client";

// import { useState } from "react";
// import {  ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import type { Product } from "@/types/product";
// import { toast } from "sonner";

// export default function AddToCartForm({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(
//     product?.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
//   );
//   const [isCartLoading, setIsCartLoading] = useState(false);
//   // const [isWishlistLoading, setIsWishlistLoading] = useState(false);

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number.parseInt(e.target.value);
//     if (!isNaN(value) && value > 0) {
//       setQuantity(value);
//     }
//   };
//   const handleAddToCart = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsCartLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("productId", product._id);
//       formData.append("quantity", quantity.toString());
//       formData.append("size", selectedSize);

//       const res = await fetch("/api/cart/add", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();

//       if (result.success) {
//         toast("Added to cart", {
//           description: `${product.name} has been added to your cart.`,
//         });
//       } else {
//         toast("Error", {
//           description: result.error || "Failed to add to cart",
//         });
//       }
//     } catch (error) {
//       toast("Error", {
//         description: "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsCartLoading(false);
//     }
//   };

//   const handleAddToWishlist = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // setIsWishlistLoading(true);
//     try {
//       const { addToWishlistAction } = await import("@/app/lib/home-actions");
//       const formData = new FormData();
//       formData.append("productId", product._id);

//       const result: { success: boolean; error?: string } =
//         await addToWishlistAction(formData);

//       if (result?.success) {
//         toast("Added to wishlist", {
//           description: `${product.name} has been added to your wishlist.`,
//         });
//       } else {
//         toast("Error", {
//           description: result?.error || "Failed to add to wishlist",
//         });
//       }
//     } catch (error) {
//       toast("Error", {
//         description: "Something went wrong. Please try again.",
//       });
//     } finally {
//       // setIsWishlistLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Size selector if product has sizes */}
//       {product.sizes && product.sizes.length > 0 && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Size</label>
//           <Select value={selectedSize} onValueChange={setSelectedSize}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select size" />
//             </SelectTrigger>
//             <SelectContent>
//               {product.sizes.map((size) => (
//                 <SelectItem key={size} value={size}>
//                   {size}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}

//       {/* Quantity selector */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2">Quantity</label>
//         <div className="flex items-center">
//           <Button
//             type="button"
//             variant="outline"
//             size="icon"
//             className="h-10 w-10 rounded-r-none"
//             onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//           >
//             -
//           </Button>
//           <Input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={handleQuantityChange}
//             className="h-10 w-20 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//           />
//           <Button
//             type="button"
//             variant="outline"
//             size="icon"
//             className="h-10 w-10 rounded-l-none"
//             onClick={() => setQuantity(quantity + 1)}
//           >
//             +
//           </Button>
//         </div>
//       </div>

//       {/* Action buttons */}
//       {product?._id && (
//         <input type="hidden" name="productId" value={product._id} />
//       )}
//       <form onSubmit={handleAddToCart} className="flex-1">
//         <input type="hidden" name="productId" value={product._id} />
//         <input type="hidden" name="quantity" value={quantity} />
//         {selectedSize && (
//           <input type="hidden" name="size" value={selectedSize} />
//         )}
//         <Button
//           type="submit"
//           className="w-full"
//           size="lg"
//           disabled={isCartLoading}
//         >
//           <ShoppingCart className="mr-2 h-5 w-5" />
//           {isCartLoading ? "Adding..." : "Add to Cart"}
//         </Button>
//       </form>

      
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/product";
import { toast } from "sonner";

export default function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCartLoading(true);
    try {
      const formData = new FormData();
      formData.append("productId", product._id);
      formData.append("quantity", quantity.toString());
      formData.append("size", selectedSize);

      const res = await fetch("/api/cart/add", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast("Added to cart", {
          description: `${product.name} has been added to your cart.`,
        });
      } else {
        toast("Error", {
          description: result.error || "Failed to add to cart",
        });
      }
    } catch {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <div>
      {/* Size selector if product has sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Size</label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="h-10 w-20 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      {product?._id && (
        <input type="hidden" name="productId" value={product._id} />
      )}
      <form onSubmit={handleAddToCart} className="flex-1">
        <input type="hidden" name="productId" value={product._id} />
        <input type="hidden" name="quantity" value={quantity} />
        {selectedSize && (
          <input type="hidden" name="size" value={selectedSize} />
        )}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isCartLoading}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isCartLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </form>
    </div>
  );
}

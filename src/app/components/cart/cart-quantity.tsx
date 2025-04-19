"use client";

import type React from "react";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { CartItem } from "@/types/cart";

export default function CartQuantity({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity === item.quantity) return;

    setIsUpdating(true);
    try {
      const { updateCartItemQuantity } = await import("@/app/lib/actions");
      const result = await updateCartItemQuantity(item._id, newQuantity);

      if (result.success) {
        setQuantity(newQuantity);
        toast({
          title: "Cart updated",
          description: "Item quantity has been updated.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update quantity",
        });
        setQuantity(item.quantity);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`icon h-8 w-8 rounded-l-none ${quantity <= 1 || isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1 || isUpdating}
      >
        -
      </button>
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={() => updateQuantity(quantity)}
        className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        disabled={isUpdating}
      />
      <button
        type="button"
        className={`h-8 w-8 rounded-l-none ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => updateQuantity(quantity + 1)}
        disabled={isUpdating}
      >
        +
      </button>
    </div>
  );
}

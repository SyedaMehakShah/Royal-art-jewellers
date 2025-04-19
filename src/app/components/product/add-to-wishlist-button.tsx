"use client";

import { useState, useEffect, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addToWishlistAction } from "@/app/lib/home-actions"; // ✅ make sure path is correct

interface AddToWishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function AddToWishlistButton({
  productId,
  productName,
  variant = "outline",
  size = "icon",
  className = "",
}: AddToWishlistButtonProps) {
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Optional: read from localStorage for UI memory
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(
      wishlist.some((item: { id: string }) => item.id === productId)
    );
  }, [productId]);

  const handleWishlist = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("productId", productId);

      const result = await addToWishlistAction(formData);

      if (result.success) {
        setIsInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: `${productName} has been added to your wishlist.`,
        });

        // Optional: keep syncing localStorage for UI memory
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlist.push({ id: productId, addedAt: new Date().toISOString() });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } else {
        toast({
          title: "Error",
          description: result.error ?? "Something went wrong.",
          //   variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleWishlist}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      disabled={isPending}
    >
      <Heart
        className={` ${isInWishlist ? "fill-primary text-primary" : ""}`}
      />
    </Button>
  );
}

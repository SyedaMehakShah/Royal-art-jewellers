"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function RemoveFromCart({ itemId }: { itemId: string }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { toast } = useToast();

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const { removeFromCart } = await import("@/app/lib/actions");
      const result = await removeFromCart(itemId);

      if (result.success) {
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to remove item",
         
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        
      });
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-destructive"
      onClick={handleRemove}
      disabled={isRemoving}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Remove</span>
    </Button>
  );
}

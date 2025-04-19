"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    {
      const { placeOrder } = await import("@/app/lib/actions");
      const result: { success: boolean; error?: string; orderId?: string } = await placeOrder(formData);

      if (result.success) {
        toast({
          title: "Order placed successfully",
          description: "Thank you for your purchase!",
        });
        router.push(`/order-confirmation/${result.orderId}`);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to place order",
        });
        setIsSubmitting(false);
      }
    } 
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" required />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" name="address" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div>
              <Label htmlFor="province">Province</Label>
              <Select name="province" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="sindh">Sindh</SelectItem>
                  <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
                  <SelectItem value="balochistan">Balochistan</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input id="postalCode" name="postalCode" required />
          </div>
          <div>
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Special instructions for delivery"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          name="paymentMethod"
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center gap-2">
              Cash on Delivery
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easypaisa" id="easypaisa" />
            <Label htmlFor="easypaisa" className="flex items-center gap-2">
              EasyPaisa
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="jazzcash" id="jazzcash" />
            <Label htmlFor="jazzcash" className="flex items-center gap-2">
              JazzCash
            </Label>
          </div>

          {paymentMethod === "easypaisa" && (
            <div className="pl-6 border-l-2 border-primary/20 mt-2">
              <p className="text-sm mb-2">
                Please transfer the amount to our EasyPaisa account and provide
                the transaction ID below:
              </p>
              <p className="font-medium mb-4">
                EasyPaisa Account: 0300-1234567
              </p>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input id="transactionId" name="transactionId" className="mt-1" />
            </div>
          )}

          {paymentMethod === "jazzcash" && (
            <div className="pl-6 border-l-2 border-primary/20 mt-2">
              <p className="text-sm mb-2">
                Please transfer the amount to our JazzCash account and provide
                the transaction ID below:
              </p>
              <p className="font-medium mb-4">JazzCash Account: 0300-7654321</p>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input id="transactionId" name="transactionId" className="mt-1" />
            </div>
          )}
        </RadioGroup>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}

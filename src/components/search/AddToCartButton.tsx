"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore, type Freelancer } from "@/store/cart/cartStore";
import { toast } from "sonner";
import { UnifiedFreelancer } from "@/interfaces";

interface AddToCartButtonProps {
  freelancer: UnifiedFreelancer;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function AddToCartButton({
  freelancer,
  variant = "outline",
  size = "sm",
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCartStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hours, setHours] = useState(8);
  const [isAdding, setIsAdding] = useState(false);

  // Convert UnifiedFreelancer to Freelancer format
  const cartFreelancer: Freelancer = {
    id:
      freelancer.id || `freelancer-${Math.random().toString(36).substr(2, 9)}`,
    name: freelancer.name ?? "N/A",
    title: freelancer.title ?? freelancer.speciality ?? "Freelancer",
    avatar: freelancer.avatar ?? freelancer.imageUrl,
    hourlyRate:
      typeof freelancer.hourlyRate === "number"
        ? freelancer.hourlyRate
        : typeof freelancer.payRate === "number"
        ? freelancer.payRate
        : 50,
    rating: typeof freelancer.rating === "number" ? freelancer.rating : 5,
    skills: freelancer.skills ?? [],
    experience: "Experienced",
    location: freelancer.location ?? "N/A",
    description: `Experienced ${
      freelancer.title?.toLowerCase() ?? "freelancer"
    } with ${freelancer.reviews ?? 0}+ successful projects.`,
  };

  const handleAddToCart = async () => {
    if (hours < 1) {
      toast.error("Please enter a valid number of hours");
      return;
    }

    setIsAdding(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart(cartFreelancer, hours);
    toast.success(`${cartFreelancer.name} added to your team!`);
    setIsAdding(false);
    setIsDialogOpen(false);
    setHours(8);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const totalCost = hours * cartFreelancer.hourlyRate;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsDialogOpen(true)}
        className={className}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Team
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Add to Project Team
            </DialogTitle>
            <DialogDescription>
              Select the number of hours you need {cartFreelancer.name} for your
              project.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Freelancer Info */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{cartFreelancer.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {cartFreelancer.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {formatCurrency(cartFreelancer.hourlyRate)}/h
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ⭐ {cartFreelancer.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Hours Input */}
            <div className="space-y-2">
              <label htmlFor="hours" className="text-sm font-medium">
                Number of Hours
              </label>
              <Input
                id="hours"
                type="number"
                min="1"
                value={hours}
                onChange={(e) =>
                  setHours(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="text-center"
              />
            </div>

            {/* Cost Summary */}
            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Rate per hour:</span>
                <span>{formatCurrency(cartFreelancer.hourlyRate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hours:</span>
                <span>{hours}h</span>
              </div>
              <div className="flex justify-between font-medium text-primary">
                <span>Total Cost:</span>
                <span>{formatCurrency(totalCost)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1"
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Team
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

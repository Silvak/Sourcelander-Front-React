"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { useCartStore, type CartItem } from "@/store/cart/cartStore";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth/authStore";
import EmailVerificationModal from "@/components/modals/EmailVerificationModal";
import CheckoutSuccessModal from "@/components/modals/CheckoutSuccessModal";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateHours,
    getTotalCost,
    getTotalHours,
    getItemCount,
    clearCart,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCreateProjectTeam = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to create your project team");
      return;
    }

    // For demo purposes, always show email verification modal
    setShowEmailModal(true);
  };

  const handleEmailVerified = () => {
    setShowEmailModal(false);
    // Simulate successful project team creation
    setShowSuccessModal(true);
    clearCart();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getManagementFee = () => {
    const laborCost = getTotalCost();
    const standardFee = laborCost * 0.2; // 20% standard fee
    
    // Minimum personnel management fee of $1,500
    const minimumFee = 1500;
    
    return Math.max(standardFee, minimumFee);
  };

  const getTotalWithManagement = () => {
    return getTotalCost() + getManagementFee();
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-semibold mb-4">Your team is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Add freelancers to build your project team and start your project
          </p>
          <Link href="/freelancer">
            <Button className="px-8">Browse Freelancers</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/freelancer">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Freelancers
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold">Project Team</h1>
              <Badge variant="secondary" className="ml-2">
                {getItemCount()} {getItemCount() === 1 ? "member" : "members"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard
                    key={item.freelancer.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateHours={updateHours}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Total Hours:</span>
                      <span className="font-medium">{getTotalHours()}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Labor Cost:</span>
                      <span>{formatCurrency(getTotalCost())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Management Fee (20% min. $1,500):</span>
                      <span>{formatCurrency(getManagementFee())}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Cost:</span>
                      <span className="text-primary">
                        {formatCurrency(getTotalWithManagement())}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateProjectTeam}
                    className="w-full h-12"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Create Project Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>

      <EmailVerificationModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onVerified={handleEmailVerified}
      />

      <CheckoutSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        projectDetails={{
          totalCost: getTotalWithManagement(),
          totalHours: getTotalHours(),
          itemCount: getItemCount(),
        }}
      />
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: (freelancerId: string) => void;
  onUpdateHours: (freelancerId: string, hours: number) => void;
}

function CartItemCard({ item, onRemove, onUpdateHours }: CartItemCardProps) {
  const { freelancer, hours, totalCost } = item;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleHoursChange = (newHours: number) => {
    if (newHours >= 1) {
      onUpdateHours(freelancer.id, newHours);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 flex-shrink-0">
            <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
            <AvatarFallback className="text-lg font-medium">
              {freelancer.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {freelancer.name}
                </h3>
                <p className="text-muted-foreground truncate">
                  {freelancer.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-sm">
                    {formatCurrency(freelancer.hourlyRate)}/h
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ⭐ {freelancer.rating}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(freelancer.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Hours:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleHoursChange(hours - 1)}
                    disabled={hours <= 8}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    value={hours}
                    onChange={(e) =>
                      handleHoursChange(parseInt(e.target.value) || 8)
                    }
                    className="w-20 h-8 text-center text-sm"
                    min="8"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleHoursChange(hours + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm text-muted-foreground">Total:</span>
                <div className="text-lg font-semibold text-primary">
                  {formatCurrency(totalCost)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

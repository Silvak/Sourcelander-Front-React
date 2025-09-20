"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart/cartStore";
import { useHydration } from "@/hooks/useHydration";
import Link from "next/link";

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function CartButton({
  onClick,
  className = "",
}: CartButtonProps) {
  const { getItemCount } = useCartStore();
  const isHydrated = useHydration();
  const itemCount = getItemCount();

  return (
    <Link href="/cart" onClick={onClick}>
      <Button
        variant="outline"
        size="sm"
        className={`relative h-[40px] w-[40px] ${className}`}
      >
        <ShoppingCart className="h-4 w-4" />
        {isHydrated && itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}

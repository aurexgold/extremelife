import { useAuth } from "@/context/AuthContext";
import { useUserGroups } from "@/context/UserGroupsContext";
import { Badge } from "@/components/ui/badge";

interface PriceWithDiscountProps {
  price: number;
  showDiscount?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function PriceWithDiscount({ price, showDiscount = true, size = "md" }: PriceWithDiscountProps) {
  const { user } = useAuth();
  const { getGroupDiscount } = useUserGroups();

  const discountRate = user && user.userGroupId ? getGroupDiscount(user.userGroupId) : 0;
  const discountAmount = (price * discountRate) / 100;
  const finalPrice = price - discountAmount;

  if (!showDiscount || discountRate === 0) {
    return (
      <span className={size === "lg" ? "text-2xl font-bold" : size === "md" ? "text-lg font-semibold" : "text-base font-medium"}>
        ₱{price.toFixed(2)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div>
        <span className={`${size === "lg" ? "text-2xl font-bold text-green-600" : size === "md" ? "text-lg font-semibold text-green-600" : "text-base font-medium text-green-600"}`}>
          ₱{finalPrice.toFixed(2)}
        </span>
        <span className={`ml-2 line-through text-muted-foreground ${size === "lg" ? "text-lg" : size === "md" ? "text-sm" : "text-xs"}`}>
          ₱{price.toFixed(2)}
        </span>
      </div>
      <Badge className="bg-green-100 text-green-800 border-0">
        {discountRate}% OFF
      </Badge>
    </div>
  );
}

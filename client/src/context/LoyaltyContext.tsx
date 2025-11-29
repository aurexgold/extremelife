import React, { createContext, useState, ReactNode } from "react";

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  discount: number;
  benefits: string[];
  color: string;
}

export interface LoyaltyOrder {
  id: string;
  orderDate: string;
  amount: number;
  pointsEarned: number;
  status: "completed" | "pending";
}

export interface LoyaltyStats {
  userId: string;
  currentPoints: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  currentTier: string;
  memberSince: string;
  orders: LoyaltyOrder[];
}

interface LoyaltyContextType {
  stats: LoyaltyStats;
  tiers: LoyaltyTier[];
  addOrder: (order: Omit<LoyaltyOrder, "id">) => void;
  redeemPoints: (points: number) => void;
  getCurrentTier: () => LoyaltyTier | undefined;
  getPointsToNextTier: () => number;
  getNextTier: () => LoyaltyTier | undefined;
}

export const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "bronze",
    name: "Bronze Member",
    minPoints: 0,
    discount: 2,
    benefits: ["2% off all orders", "Birthday bonus points"],
    color: "from-amber-600 to-amber-700",
  },
  {
    id: "silver",
    name: "Silver Member",
    minPoints: 500,
    discount: 5,
    benefits: ["5% off all orders", "Free shipping on orders over ₱1,000", "Early access to sales"],
    color: "from-slate-400 to-slate-500",
  },
  {
    id: "gold",
    name: "Gold Member",
    minPoints: 1500,
    discount: 10,
    benefits: ["10% off all orders", "Free shipping on all orders", "Priority customer support", "Exclusive products"],
    color: "from-yellow-400 to-yellow-500",
  },
  {
    id: "platinum",
    name: "Platinum Member",
    minPoints: 3500,
    discount: 15,
    benefits: [
      "15% off all orders",
      "Free shipping on all orders",
      "VIP customer support",
      "Exclusive products & early access",
      "Monthly surprise gifts",
      "Invite-only events",
    ],
    color: "from-blue-400 to-blue-500",
  },
];

const MOCK_STATS: LoyaltyStats = {
  userId: "user123",
  currentPoints: 2340,
  totalPointsEarned: 5200,
  totalPointsRedeemed: 2860,
  currentTier: "gold",
  memberSince: "2024-06-15",
  orders: [
    {
      id: "1",
      orderDate: "2024-11-25",
      amount: 4500,
      pointsEarned: 450,
      status: "completed",
    },
    {
      id: "2",
      orderDate: "2024-11-18",
      amount: 3200,
      pointsEarned: 320,
      status: "completed",
    },
    {
      id: "3",
      orderDate: "2024-11-10",
      amount: 5600,
      pointsEarned: 560,
      status: "completed",
    },
    {
      id: "4",
      orderDate: "2024-11-03",
      amount: 2800,
      pointsEarned: 280,
      status: "completed",
    },
    {
      id: "5",
      orderDate: "2024-10-28",
      amount: 4200,
      pointsEarned: 420,
      status: "completed",
    },
    {
      id: "6",
      orderDate: "2024-10-20",
      amount: 3500,
      pointsEarned: 350,
      status: "completed",
    },
  ],
};

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<LoyaltyStats>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("loyaltyStats");
      return saved ? JSON.parse(saved) : MOCK_STATS;
    }
    return MOCK_STATS;
  });

  const addOrder = (newOrder: Omit<LoyaltyOrder, "id">) => {
    const order: LoyaltyOrder = {
      ...newOrder,
      id: Date.now().toString(),
    };
    const updated = {
      ...stats,
      orders: [order, ...stats.orders],
      currentPoints: stats.currentPoints + order.pointsEarned,
      totalPointsEarned: stats.totalPointsEarned + order.pointsEarned,
    };
    setStats(updated);
    localStorage.setItem("loyaltyStats", JSON.stringify(updated));
  };

  const redeemPoints = (points: number) => {
    if (stats.currentPoints < points) return;
    const updated = {
      ...stats,
      currentPoints: stats.currentPoints - points,
      totalPointsRedeemed: stats.totalPointsRedeemed + points,
    };
    setStats(updated);
    localStorage.setItem("loyaltyStats", JSON.stringify(updated));
  };

  const getCurrentTier = () => {
    return LOYALTY_TIERS.find((t) => t.id === stats.currentTier);
  };

  const getNextTier = () => {
    const currentTierIndex = LOYALTY_TIERS.findIndex((t) => t.id === stats.currentTier);
    if (currentTierIndex < LOYALTY_TIERS.length - 1) {
      return LOYALTY_TIERS[currentTierIndex + 1];
    }
    return undefined;
  };

  const getPointsToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 0;
    return Math.max(0, nextTier.minPoints - stats.currentPoints);
  };

  return (
    <LoyaltyContext.Provider
      value={{
        stats,
        tiers: LOYALTY_TIERS,
        addOrder,
        redeemPoints,
        getCurrentTier,
        getPointsToNextTier,
        getNextTier,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = React.useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error("useLoyalty must be used within LoyaltyProvider");
  }
  return context;
}

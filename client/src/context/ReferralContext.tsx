import React, { createContext, useState, ReactNode } from "react";

export interface Referral {
  id: string;
  referrerCode: string;
  referreeName: string;
  referreeEmail: string;
  joinDate: string;
  purchaseCount: number;
  totalSpent: number;
  status: "pending" | "active" | "rewarded";
  rewardDate?: string;
}

export interface ReferralStats {
  userId: string;
  userName: string;
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  rewardedReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  referrals: Referral[];
}

interface ReferralContextType {
  stats: ReferralStats;
  addReferral: (referral: Omit<Referral, "id">) => void;
  generateReferralCode: () => string;
  getReferralLink: (code: string) => string;
  updateReferralStatus: (referralId: string, status: Referral["status"]) => void;
  claimRewards: () => void;
}

export const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

function generateRandomCode(): string {
  return "LIFE" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const MOCK_STATS: ReferralStats = {
  userId: "user123",
  userName: "Maria Santos",
  referralCode: "LIFEA2B3C4",
  referralLink: `${typeof window !== "undefined" ? window.location.origin : ""}/shop?ref=LIFEA2B3C4`,
  totalReferrals: 12,
  activeReferrals: 8,
  rewardedReferrals: 4,
  totalEarnings: 2400,
  pendingEarnings: 1600,
  referrals: [
    {
      id: "1",
      referrerCode: "LIFEA2B3C4",
      referreeName: "Juan Dela Cruz",
      referreeEmail: "juan@email.com",
      joinDate: "2024-11-15",
      purchaseCount: 3,
      totalSpent: 3500,
      status: "rewarded",
      rewardDate: "2024-11-25",
    },
    {
      id: "2",
      referrerCode: "LIFEA2B3C4",
      referreeName: "Rosa Garcia",
      referreeEmail: "rosa@email.com",
      joinDate: "2024-11-18",
      purchaseCount: 5,
      totalSpent: 5200,
      status: "rewarded",
      rewardDate: "2024-11-28",
    },
    {
      id: "3",
      referrerCode: "LIFEA2B3C4",
      referreeName: "Carlos Rodriguez",
      referreeEmail: "carlos@email.com",
      joinDate: "2024-11-20",
      purchaseCount: 2,
      totalSpent: 2100,
      status: "active",
    },
    {
      id: "4",
      referrerCode: "LIFEA2B3C4",
      referreeName: "Anna Lopez",
      referreeEmail: "anna@email.com",
      joinDate: "2024-11-22",
      purchaseCount: 1,
      totalSpent: 1800,
      status: "active",
    },
    {
      id: "5",
      referrerCode: "LIFEA2B3C4",
      referreeName: "Miguel Santos",
      referreeEmail: "miguel@email.com",
      joinDate: "2024-11-23",
      purchaseCount: 0,
      totalSpent: 0,
      status: "pending",
    },
  ],
};

export function ReferralProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ReferralStats>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("referralStats");
      return saved ? JSON.parse(saved) : MOCK_STATS;
    }
    return MOCK_STATS;
  });

  const addReferral = (newReferral: Omit<Referral, "id">) => {
    const referral: Referral = {
      ...newReferral,
      id: Date.now().toString(),
    };
    const updated = {
      ...stats,
      referrals: [referral, ...stats.referrals],
      totalReferrals: stats.totalReferrals + 1,
      pendingEarnings: stats.pendingEarnings + 500,
    };
    setStats(updated);
    localStorage.setItem("referralStats", JSON.stringify(updated));
  };

  const generateReferralCode = () => {
    return generateRandomCode();
  };

  const getReferralLink = (code: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/shop?ref=${code}`;
  };

  const updateReferralStatus = (referralId: string, status: Referral["status"]) => {
    const referral = stats.referrals.find((r) => r.id === referralId);
    if (!referral) return;

    const oldStatus = referral.status;
    const updatedReferrals = stats.referrals.map((r) =>
      r.id === referralId ? { ...r, status, rewardDate: status === "rewarded" ? new Date().toISOString().split("T")[0] : r.rewardDate } : r
    );

    let activeCount = stats.activeReferrals;
    let rewardedCount = stats.rewardedReferrals;
    let pendingEarnings = stats.pendingEarnings;
    let totalEarnings = stats.totalEarnings;

    if (oldStatus === "pending" && status === "active") {
      activeCount += 1;
    } else if (oldStatus === "active" && status === "rewarded") {
      activeCount -= 1;
      rewardedCount += 1;
      pendingEarnings -= 200;
      totalEarnings += 200;
    }

    const updated = {
      ...stats,
      referrals: updatedReferrals,
      activeReferrals: activeCount,
      rewardedReferrals: rewardedCount,
      pendingEarnings,
      totalEarnings,
    };
    setStats(updated);
    localStorage.setItem("referralStats", JSON.stringify(updated));
  };

  const claimRewards = () => {
    const updated = {
      ...stats,
      totalEarnings: stats.totalEarnings + stats.pendingEarnings,
      pendingEarnings: 0,
    };
    setStats(updated);
    localStorage.setItem("referralStats", JSON.stringify(updated));
  };

  return (
    <ReferralContext.Provider
      value={{
        stats,
        addReferral,
        generateReferralCode,
        getReferralLink,
        updateReferralStatus,
        claimRewards,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const context = React.useContext(ReferralContext);
  if (context === undefined) {
    throw new Error("useReferral must be used within ReferralProvider");
  }
  return context;
}

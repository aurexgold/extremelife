import React, { createContext, useState, ReactNode, useMemo } from "react";

export interface StreamerCommission {
  id: string;
  streamId: string;
  streamTitle: string;
  date: string;
  sales: number;
  revenue: number;
  commission: number;
  status: "completed" | "pending" | "paid";
}

interface StreamerContextType {
  commissions: StreamerCommission[];
  totalEarnings: number;
  pendingEarnings: number;
  totalStreamSales: number;
  commissionRate: number;
}

export const StreamerContext = createContext<StreamerContextType | undefined>(undefined);

// Mock commission data
const MOCK_COMMISSIONS: StreamerCommission[] = [
  {
    id: "comm001",
    streamId: "stream1",
    streamTitle: "Wellness Wednesday: Benefits ng Essential Oils",
    date: "2024-11-28",
    sales: 34,
    revenue: 15200,
    commission: 1520,
    status: "completed",
  },
  {
    id: "comm002",
    streamId: "stream2",
    streamTitle: "Beauty Secrets: Herbal Skincare",
    date: "2024-11-25",
    sales: 28,
    revenue: 12400,
    commission: 1240,
    status: "completed",
  },
  {
    id: "comm003",
    streamId: "stream3",
    streamTitle: "Immune Boost: Winter Wellness",
    date: "2024-11-22",
    sales: 42,
    revenue: 18900,
    commission: 1890,
    status: "completed",
  },
  {
    id: "comm004",
    streamId: "stream4",
    streamTitle: "Tea Time Talk: Relaxation Blends",
    date: "2024-11-20",
    sales: 31,
    revenue: 13800,
    commission: 1380,
    status: "completed",
  },
  {
    id: "comm005",
    streamId: "stream5",
    streamTitle: "Energy & Vitality: Morning Routines",
    date: "2024-11-18",
    sales: 27,
    revenue: 12100,
    commission: 1210,
    status: "paid",
  },
  {
    id: "comm006",
    streamId: "stream6",
    streamTitle: "Trending Now: Latest Herbal Trends",
    date: "2024-11-29",
    sales: 8,
    revenue: 3500,
    commission: 350,
    status: "pending",
  },
];

export function StreamerProvider({ children }: { children: ReactNode }) {
  const [commissions] = useState<StreamerCommission[]>(MOCK_COMMISSIONS);
  const commissionRate = 10;

  const stats = useMemo(() => {
    const completed = commissions.filter(c => c.status === "completed" || c.status === "paid");
    const pending = commissions.filter(c => c.status === "pending");
    
    return {
      totalEarnings: completed.reduce((sum, c) => sum + c.commission, 0),
      pendingEarnings: pending.reduce((sum, c) => sum + c.commission, 0),
      totalStreamSales: commissions.reduce((sum, c) => sum + c.sales, 0),
    };
  }, [commissions]);

  return (
    <StreamerContext.Provider
      value={{
        commissions,
        totalEarnings: stats.totalEarnings,
        pendingEarnings: stats.pendingEarnings,
        totalStreamSales: stats.totalStreamSales,
        commissionRate,
      }}
    >
      {children}
    </StreamerContext.Provider>
  );
}

export function useStreamer() {
  const context = React.useContext(StreamerContext);
  if (context === undefined) {
    throw new Error("useStreamer must be used within StreamerProvider");
  }
  return context;
}

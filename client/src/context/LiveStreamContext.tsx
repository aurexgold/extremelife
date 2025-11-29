import React, { createContext, useState, ReactNode } from "react";

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number; // in minutes
  host: string;
  category: string;
  status: "scheduled" | "live" | "completed";
  featuredProducts: number[];
  viewers?: number;
  expectedProducts?: string[];
}

interface LiveStreamContextType {
  streams: LiveStream[];
  addStream: (stream: Omit<LiveStream, "id">) => void;
  getStreamsForDate: (date: string) => LiveStream[];
  getUpcomingStreams: (limit?: number) => LiveStream[];
  getLiveNow: () => LiveStream | null;
  getStreamById: (id: string) => LiveStream | undefined;
}

export const LiveStreamContext = createContext<LiveStreamContextType | undefined>(undefined);

const MOCK_STREAMS: LiveStream[] = [
  {
    id: "1",
    title: "Wellness Wednesday: Benefits of Essential Oils",
    description: "Join Sarah as she discusses therapeutic benefits of our organic essential oils.",
    date: "2024-11-29",
    time: "15:00",
    duration: 45,
    host: "Sarah Johnson",
    category: "Essential Oils",
    status: "live",
    featuredProducts: [2, 6],
    viewers: 847,
    expectedProducts: ["Pure Lavender Oil", "Focus & Clarity Blend"],
  },
  {
    id: "2",
    title: "Tea Time Talk: Immunity Boosting Blends",
    description: "Learn how to blend teas for maximum immune support this season.",
    date: "2024-12-04",
    time: "14:00",
    duration: 60,
    host: "Maria Santos",
    category: "Tea",
    status: "scheduled",
    featuredProducts: [1, 5],
    expectedProducts: ["Detox Tea Blend", "Sleep Well Night Time Tea"],
  },
  {
    id: "3",
    title: "Beauty & Wellness: Natural Skincare Secrets",
    description: "Discover how to use herbal products for glowing skin naturally.",
    date: "2024-12-06",
    time: "16:00",
    duration: 50,
    host: "Rosa Garcia",
    category: "Body Care",
    status: "scheduled",
    featuredProducts: [4],
    expectedProducts: ["Herbal Exfoliating Soap"],
  },
  {
    id: "4",
    title: "Supplement Science: Vitality & Energy",
    description: "Expert discussion on supplement timing and effectiveness.",
    date: "2024-12-11",
    time: "15:30",
    duration: 45,
    host: "Dr. Carlos Reyes",
    category: "Supplements",
    status: "scheduled",
    featuredProducts: [3],
    expectedProducts: ["Vitality Immunity Capsules"],
  },
  {
    id: "5",
    title: "Sleep Better Naturally - Sleep Series #1",
    description: "First in our series about achieving better sleep with natural remedies.",
    date: "2024-12-13",
    time: "20:00",
    duration: 40,
    host: "Dr. Anna Lee",
    category: "Tea",
    status: "scheduled",
    featuredProducts: [5],
    expectedProducts: ["Sleep Well Night Time Tea"],
  },
  {
    id: "6",
    title: "Weekend Flash Sale: Everything 30% Off!",
    description: "Exclusive 30% discount on selected items during this live stream.",
    date: "2024-12-07",
    time: "10:00",
    duration: 120,
    host: "Extreme Life Team",
    category: "Flash Sale",
    status: "scheduled",
    featuredProducts: [1, 2, 3, 4, 5, 6],
    expectedProducts: ["All Products"],
  },
];

export function LiveStreamProvider({ children }: { children: ReactNode }) {
  const [streams] = useState<LiveStream[]>(MOCK_STREAMS);

  const addStream = (newStream: Omit<LiveStream, "id">) => {
    // In a real app, this would add to database
    console.log("New stream would be added:", newStream);
  };

  const getStreamsForDate = (date: string) => {
    return streams.filter((s) => s.date === date);
  };

  const getUpcomingStreams = (limit = 5) => {
    return streams
      .filter((s) => s.status === "scheduled")
      .slice(0, limit);
  };

  const getLiveNow = () => {
    return streams.find((s) => s.status === "live") || null;
  };

  const getStreamById = (id: string) => {
    return streams.find((s) => s.id === id);
  };

  return (
    <LiveStreamContext.Provider
      value={{
        streams,
        addStream,
        getStreamsForDate,
        getUpcomingStreams,
        getLiveNow,
        getStreamById,
      }}
    >
      {children}
    </LiveStreamContext.Provider>
  );
}

export function useLiveStreams() {
  const context = React.useContext(LiveStreamContext);
  if (context === undefined) {
    throw new Error("useLiveStreams must be used within LiveStreamProvider");
  }
  return context;
}

import React, { createContext, useState, ReactNode } from "react";

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  details: string;
  carrier: string;
}

export interface OrderTracking {
  orderId: string;
  status: "Processing" | "Confirmed" | "Shipped" | "In Transit" | "Out for Delivery" | "Delivered" | "Cancelled";
  carrier: "J&T Express" | "LBC Express" | "2GO Express" | "Lalamove" | "Pending";
  trackingNumber: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
  lastUpdate: string;
}

interface OrderTrackingContextType {
  orderTracking: Map<string, OrderTracking>;
  getOrderTracking: (orderId: string) => OrderTracking | undefined;
  updateOrderStatus: (orderId: string, status: OrderTracking["status"]) => void;
  getAllOrdersStatus: () => OrderTracking[];
}

export const OrderTrackingContext = createContext<OrderTrackingContextType | undefined>(undefined);

const INITIAL_TRACKING_DATA: Record<string, OrderTracking> = {
  "ORD001": {
    orderId: "ORD001",
    status: "Delivered",
    carrier: "J&T Express",
    trackingNumber: "JT123456789PH",
    estimatedDelivery: "2024-11-28",
    lastUpdate: "2024-11-28T14:30:00",
    events: [
      {
        timestamp: "2024-11-28T14:30:00",
        status: "Delivered",
        location: "Metro Manila, PH",
        details: "Package delivered successfully to recipient",
        carrier: "J&T Express"
      },
      {
        timestamp: "2024-11-28T08:15:00",
        status: "Out for Delivery",
        location: "Pasig City, PH",
        details: "Package out for delivery",
        carrier: "J&T Express"
      },
      {
        timestamp: "2024-11-27T22:45:00",
        status: "In Transit",
        location: "Quezon City Distribution Center",
        details: "Package sorted and loaded for delivery",
        carrier: "J&T Express"
      },
      {
        timestamp: "2024-11-26T16:20:00",
        status: "Confirmed",
        location: "Manila Processing Center",
        details: "Package received at processing facility",
        carrier: "J&T Express"
      },
      {
        timestamp: "2024-11-26T09:00:00",
        status: "Processing",
        location: "Manila, PH",
        details: "Order confirmed and ready for shipment",
        carrier: "J&T Express"
      }
    ]
  },
  "ORD002": {
    orderId: "ORD002",
    status: "In Transit",
    carrier: "LBC Express",
    trackingNumber: "LBC987654321PH",
    estimatedDelivery: "2024-11-29",
    lastUpdate: "2024-11-28T12:00:00",
    events: [
      {
        timestamp: "2024-11-28T12:00:00",
        status: "In Transit",
        location: "Makati Distribution Center",
        details: "Package in transit to delivery location",
        carrier: "LBC Express"
      },
      {
        timestamp: "2024-11-27T18:30:00",
        status: "Confirmed",
        location: "Cebu Processing Center",
        details: "Package received and sorted",
        carrier: "LBC Express"
      },
      {
        timestamp: "2024-11-27T10:00:00",
        status: "Processing",
        location: "Cebu, PH",
        details: "Order confirmed",
        carrier: "LBC Express"
      }
    ]
  },
  "ORD003": {
    orderId: "ORD003",
    status: "Shipped",
    carrier: "2GO Express",
    trackingNumber: "2GO555666777PH",
    estimatedDelivery: "2024-12-01",
    lastUpdate: "2024-11-28T10:30:00",
    events: [
      {
        timestamp: "2024-11-28T10:30:00",
        status: "Shipped",
        location: "Manila Main Hub",
        details: "Package picked up and in transit",
        carrier: "2GO Express"
      },
      {
        timestamp: "2024-11-27T16:00:00",
        status: "Confirmed",
        location: "Manila, PH",
        details: "Package received and labeled",
        carrier: "2GO Express"
      },
      {
        timestamp: "2024-11-27T09:00:00",
        status: "Processing",
        location: "Manila, PH",
        details: "Order confirmed",
        carrier: "2GO Express"
      }
    ]
  },
  "ORD004": {
    orderId: "ORD004",
    status: "Processing",
    carrier: "Lalamove",
    trackingNumber: "LLMV123456PH",
    estimatedDelivery: "2024-11-29",
    lastUpdate: "2024-11-28T09:00:00",
    events: [
      {
        timestamp: "2024-11-28T09:00:00",
        status: "Processing",
        location: "Manila, PH",
        details: "Order confirmed, awaiting pickup",
        carrier: "Lalamove"
      }
    ]
  }
};

export function OrderTrackingProvider({ children }: { children: ReactNode }) {
  const [orderTracking] = useState<Map<string, OrderTracking>>(
    new Map(Object.entries(INITIAL_TRACKING_DATA))
  );

  const getOrderTracking = (orderId: string) => {
    return orderTracking.get(orderId);
  };

  const updateOrderStatus = (orderId: string, status: OrderTracking["status"]) => {
    const tracking = orderTracking.get(orderId);
    if (tracking) {
      tracking.status = status;
      tracking.lastUpdate = new Date().toISOString();
    }
  };

  const getAllOrdersStatus = () => {
    return Array.from(orderTracking.values());
  };

  return (
    <OrderTrackingContext.Provider
      value={{
        orderTracking,
        getOrderTracking,
        updateOrderStatus,
        getAllOrdersStatus,
      }}
    >
      {children}
    </OrderTrackingContext.Provider>
  );
}

export function useOrderTracking() {
  const context = React.useContext(OrderTrackingContext);
  if (context === undefined) {
    throw new Error("useOrderTracking must be used within OrderTrackingProvider");
  }
  return context;
}

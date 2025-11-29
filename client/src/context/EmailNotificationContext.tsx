import React, { createContext, useState, ReactNode } from "react";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: "order_confirmation" | "shipping" | "delivery" | "abandoned_cart" | "loyalty_points" | "referral" | "promotional";
  body: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  status: "sent" | "pending" | "failed";
  sentAt: string;
  template: string;
}

interface EmailNotificationContextType {
  templates: EmailTemplate[];
  logs: EmailLog[];
  addTemplate: (template: EmailTemplate) => void;
  updateTemplate: (id: string, template: Partial<EmailTemplate>) => void;
  deleteTemplate: (id: string) => void;
  sendEmail: (recipient: string, templateId: string, variables: Record<string, string>) => void;
  getEmailStats: () => {
    totalSent: number;
    totalFailed: number;
    totalPending: number;
    successRate: number;
  };
}

export const EmailNotificationContext = createContext<EmailNotificationContextType | undefined>(undefined);

const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: "tpl_001",
    name: "Order Confirmation",
    subject: "Order Confirmed - {{orderId}}",
    type: "order_confirmation",
    body: `Dear {{customerName}},

Thank you for your order! We're excited to get your items ready.

Order ID: {{orderId}}
Order Total: {{orderTotal}}
Estimated Delivery: {{estimatedDelivery}}

You can track your order at: {{trackingLink}}

Best regards,
Extreme Life Herbal Products`,
    variables: ["customerName", "orderId", "orderTotal", "estimatedDelivery", "trackingLink"],
    isActive: true,
    createdAt: "2024-11-01T10:00:00"
  },
  {
    id: "tpl_002",
    name: "Shipment Notification",
    subject: "Your Order is on Its Way! {{orderId}}",
    type: "shipping",
    body: `Dear {{customerName}},

Great news! Your order has been shipped.

Order ID: {{orderId}}
Carrier: {{carrier}}
Tracking Number: {{trackingNumber}}

Track your shipment: {{trackingLink}}

Thank you for shopping with us!`,
    variables: ["customerName", "orderId", "carrier", "trackingNumber", "trackingLink"],
    isActive: true,
    createdAt: "2024-11-02T10:00:00"
  },
  {
    id: "tpl_003",
    name: "Delivery Confirmation",
    subject: "Your Order Has Arrived! {{orderId}}",
    type: "delivery",
    body: `Dear {{customerName}},

Congratulations! Your order has been delivered.

Order ID: {{orderId}}
Delivered At: {{deliveryTime}}

We'd love to hear from you! Share your experience and earn {{loyaltyPoints}} loyalty points.

Review your order: {{reviewLink}}`,
    variables: ["customerName", "orderId", "deliveryTime", "loyaltyPoints", "reviewLink"],
    isActive: true,
    createdAt: "2024-11-03T10:00:00"
  },
  {
    id: "tpl_004",
    name: "Abandoned Cart Recovery",
    subject: "Your Cart is Waiting - 15% OFF! ⏰",
    type: "abandoned_cart",
    body: `Hi {{customerName}},

You left something amazing in your cart! 🛍️

Items: {{cartItems}}
Original Total: {{cartValue}}
With Discount: {{discountedValue}} (15% OFF!)

Complete your purchase now: {{recoveryLink}}

This special offer expires in 24 hours!`,
    variables: ["customerName", "cartItems", "cartValue", "discountedValue", "recoveryLink"],
    isActive: true,
    createdAt: "2024-11-04T10:00:00"
  },
  {
    id: "tpl_005",
    name: "Loyalty Points Earned",
    subject: "You Earned {{points}} Loyalty Points!",
    type: "loyalty_points",
    body: `Dear {{customerName}},

Congratulations! You've earned {{points}} loyalty points from your recent purchase.

Your Current Balance: {{totalPoints}} points
Next Reward: {{nextRewardAt}} points

Redeem your points: {{redeemLink}}`,
    variables: ["customerName", "points", "totalPoints", "nextRewardAt", "redeemLink"],
    isActive: true,
    createdAt: "2024-11-05T10:00:00"
  }
];

const INITIAL_LOGS: EmailLog[] = [
  {
    id: "log_001",
    recipient: "maria@email.com",
    subject: "Order Confirmed - ORD001",
    type: "order_confirmation",
    status: "sent",
    sentAt: "2024-11-28T10:30:00",
    template: "Order Confirmation"
  },
  {
    id: "log_002",
    recipient: "juan@email.com",
    subject: "Your Order is on Its Way! ORD002",
    type: "shipping",
    status: "sent",
    sentAt: "2024-11-27T14:15:00",
    template: "Shipment Notification"
  },
  {
    id: "log_003",
    recipient: "rosa@email.com",
    subject: "Your Order Has Arrived! ORD003",
    type: "delivery",
    status: "sent",
    sentAt: "2024-11-26T16:45:00",
    template: "Delivery Confirmation"
  },
  {
    id: "log_004",
    recipient: "pedro@email.com",
    subject: "Your Cart is Waiting - 15% OFF! ⏰",
    type: "abandoned_cart",
    status: "pending",
    sentAt: "2024-11-28T12:00:00",
    template: "Abandoned Cart Recovery"
  },
  {
    id: "log_005",
    recipient: "lisa@email.com",
    subject: "You Earned 150 Loyalty Points!",
    type: "loyalty_points",
    status: "sent",
    sentAt: "2024-11-25T09:20:00",
    template: "Loyalty Points Earned"
  }
];

export function EmailNotificationProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_TEMPLATES);
  const [logs, setLogs] = useState<EmailLog[]>(INITIAL_LOGS);

  const addTemplate = (template: EmailTemplate) => {
    setTemplates([...templates, template]);
  };

  const updateTemplate = (id: string, updates: Partial<EmailTemplate>) => {
    setTemplates(
      templates.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const sendEmail = (recipient: string, templateId: string, variables: Record<string, string>) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newLog: EmailLog = {
        id: `log_${Date.now()}`,
        recipient,
        subject: template.subject,
        type: template.type,
        status: "sent",
        sentAt: new Date().toISOString(),
        template: template.name
      };
      setLogs([newLog, ...logs]);
    }
  };

  const getEmailStats = () => {
    const totalSent = logs.filter(l => l.status === "sent").length;
    const totalFailed = logs.filter(l => l.status === "failed").length;
    const totalPending = logs.filter(l => l.status === "pending").length;
    const successRate = logs.length > 0 ? ((totalSent / logs.length) * 100).toFixed(1) : "0";

    return {
      totalSent,
      totalFailed,
      totalPending,
      successRate: parseFloat(successRate as string),
    };
  };

  return (
    <EmailNotificationContext.Provider
      value={{
        templates,
        logs,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        sendEmail,
        getEmailStats,
      }}
    >
      {children}
    </EmailNotificationContext.Provider>
  );
}

export function useEmailNotification() {
  const context = React.useContext(EmailNotificationContext);
  if (context === undefined) {
    throw new Error("useEmailNotification must be used within EmailNotificationProvider");
  }
  return context;
}

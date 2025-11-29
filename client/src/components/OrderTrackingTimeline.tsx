import { useOrderTracking, OrderTracking } from "@/context/OrderTrackingContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react";

const StatusIcon = {
  "Processing": Package,
  "Confirmed": CheckCircle,
  "Shipped": Truck,
  "In Transit": Truck,
  "Out for Delivery": MapPin,
  "Delivered": CheckCircle,
};

const StatusColor = {
  "Processing": "bg-gray-100 text-gray-800",
  "Confirmed": "bg-blue-100 text-blue-800",
  "Shipped": "bg-purple-100 text-purple-800",
  "In Transit": "bg-orange-100 text-orange-800",
  "Out for Delivery": "bg-yellow-100 text-yellow-800",
  "Delivered": "bg-green-100 text-green-800",
};

interface OrderTrackingTimelineProps {
  tracking: OrderTracking;
}

export default function OrderTrackingTimeline({ tracking }: OrderTrackingTimelineProps) {
  const statusSteps = ["Processing", "Confirmed", "Shipped", "In Transit", "Out for Delivery", "Delivered"];
  const currentStatusIndex = statusSteps.indexOf(tracking.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Current Status</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge className={StatusColor[tracking.status as keyof typeof StatusColor]}>
                {tracking.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last updated: {formatDate(tracking.lastUpdate)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Carrier & Tracking</p>
            <p className="text-lg font-semibold mt-2">{tracking.carrier}</p>
            <p className="text-xs text-muted-foreground mt-1">{tracking.trackingNumber}</p>
            <p className="text-xs text-muted-foreground mt-1">Est. Delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString("en-PH")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Timeline</CardTitle>
          <CardDescription>Track your order progress</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Visual Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {statusSteps.map((step, index) => (
                <div key={step} className="flex-1 flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      index <= currentStatusIndex
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-xs mt-2 text-center line-clamp-2">{step}</p>
                </div>
              ))}
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStatusIndex + 1) / statusSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Event Timeline */}
          <div className="space-y-4">
            {tracking.events.map((event, index) => {
              const Icon = StatusIcon[event.status as keyof typeof StatusIcon] || Clock;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${StatusColor[event.status as keyof typeof StatusColor]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < tracking.events.length - 1 && (
                      <div className="w-0.5 h-12 bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pt-2 pb-4">
                    <p className="font-semibold text-sm">{event.status}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                    <p className="text-xs text-foreground mt-1">{event.details}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatDate(event.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

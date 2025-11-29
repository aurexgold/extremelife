import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Truck, MapPin, Phone, Mail } from "lucide-react";

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const timeline = [
    { status: "Ordered", date: "Nov 27, 2024", icon: CheckCircle2, completed: true },
    { status: "Processing", date: "Nov 27, 2024", icon: Clock, completed: true },
    { status: "In Transit", date: "Nov 28, 2024", icon: Truck, completed: order.status === "In Transit" || order.status === "Delivered" },
    { status: "Delivered", date: "Expected Nov 30", icon: CheckCircle2, completed: order.status === "Delivered" },
  ];

  const items = [
    { name: "Organic Lavender Oil", qty: 2, price: 799 },
    { name: "Peppermint Soap Bar", qty: 1, price: 549 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - ORD-{order.id}</DialogTitle>
          <DialogDescription>Detailed information and status tracking</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="font-semibold text-lg mt-1">{order.status}</p>
            </div>
            <Badge className={`${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </Badge>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-4">Order Timeline</h3>
            <div className="space-y-3">
              {timeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <Icon className={`h-5 w-5 ${step.completed ? 'text-green-600' : 'text-muted-foreground'}`} />
                      {idx < timeline.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.completed ? 'bg-green-600' : 'bg-muted'}`}></div>
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-border/60">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-sm">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {order.customer}</p>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>+63 917 123 4567</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">customer@email.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-sm">Delivery Address</h3>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-muted-foreground">
                    <p>123 Main Street</p>
                    <p>Makati City, 1200</p>
                    <p>Metro Manila, Philippines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold">₱{(item.price * item.qty).toLocaleString('en-PH')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <Card className="border-border/60 bg-muted/30">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₱2,147</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping (J&T)</span>
                <span>₱352</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg">₱{order.total.toLocaleString('en-PH')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" variant="outline">Print Order</Button>
            <Button className="flex-1">Update Status</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

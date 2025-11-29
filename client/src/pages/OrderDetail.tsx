import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Truck, MapPin, Check } from "lucide-react";

interface OrderStatus {
  label: string;
  date: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
}

export default function OrderDetail({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const { orders } = useCart();
  const [, setLocation] = useLocation();

  const order = orders.find((o) => o.id === params.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">This order doesn't exist or has been deleted.</p>
          <Button onClick={() => setLocation("/orders")} className="rounded-full">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  // Simulate order status timeline based on order date
  const orderDate = new Date(order.date);
  const processingDate = new Date(orderDate);
  processingDate.setDate(processingDate.getDate());
  
  const shippedDate = new Date(orderDate);
  shippedDate.setDate(shippedDate.getDate() + 1);
  
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const statuses: OrderStatus[] = [
    {
      label: "Order Placed",
      date: orderDate.toLocaleDateString("en-PH"),
      description: "Your order has been confirmed and is being prepared",
      completed: true,
      icon: <Check className="h-5 w-5" />,
    },
    {
      label: "Processing",
      date: processingDate.toLocaleDateString("en-PH"),
      description: "Items are being packed and prepared for shipment",
      completed: true,
      icon: <Package className="h-5 w-5" />,
    },
    {
      label: "Shipped",
      date: shippedDate.toLocaleDateString("en-PH"),
      description: `Shipped via ${order.shippingMethod}`,
      completed: true,
      icon: <Truck className="h-5 w-5" />,
    },
    {
      label: "Out for Delivery",
      date: new Date(deliveryDate).toLocaleDateString("en-PH"),
      description: "Package is on its way to your location",
      completed: true,
      icon: <Truck className="h-5 w-5" />,
    },
    {
      label: "Delivered",
      date: new Date(deliveryDate).toLocaleDateString("en-PH"),
      description: "Package has been delivered",
      completed: true,
      icon: <MapPin className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => setLocation("/orders")}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>

        <div className="grid grid-cols-1 gap-8">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-serif">Order {order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.date).toLocaleDateString("en-PH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 border-0">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {statuses.map((status, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-3 rounded-full ${
                          status.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {status.icon}
                      </div>
                      {idx < statuses.length - 1 && (
                        <div
                          className={`w-1 h-12 my-2 ${
                            status.completed ? "bg-green-200" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-foreground">{status.label}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{status.date}</p>
                      <p className="text-sm text-foreground">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center pb-3 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₱{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                  <p className="font-bold">₱{order.subtotal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tax (13%)</p>
                  <p className="font-bold">₱{order.tax.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Shipping</p>
                  <p className="font-bold">{order.shipping === 0 ? "Free" : `₱${order.shipping}`}</p>
                </div>
                <div className="text-right border-t-2 col-span-2 pt-3">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-2xl font-bold text-primary">₱{order.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <p className="text-sm">
                  <strong>Shipping Address:</strong>
                  <br />
                  {order.shippingAddress}
                </p>
                <p className="text-sm">
                  <strong>Shipping Method:</strong> {order.shippingMethod}
                </p>
                <p className="text-sm">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <p className="text-sm text-blue-900 mb-3">
                Need help with your order? We're here to assist!
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

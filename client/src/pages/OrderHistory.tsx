import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, ArrowRight } from "lucide-react";

export default function OrderHistory() {
  const { orders } = useCart();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your orders.</p>
          <Button onClick={() => setLocation("/login")} className="rounded-full">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground mb-8">No orders yet</p>
          <Link href="/shop">
            <Button className="rounded-full">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Order History</h1>
        <p className="text-muted-foreground mb-8">{orders.length} order(s) found</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                    <p className="font-bold text-lg">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">
                      {new Date(order.date).toLocaleDateString("en-PH")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {order.status === "completed" ? "Delivered" : order.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shipping</p>
                    <p className="font-semibold text-sm">{order.shippingMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment</p>
                    <p className="font-semibold text-sm">{order.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-xl font-bold text-primary">
                      ₱{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                  <button
                    onClick={() => setLocation(`/order/${order.id}`)}
                    className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-4 pb-4 border-b">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Items ({order.items.length})
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x {item.quantity}
                        </span>
                        <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Subtotal</p>
                    <p className="font-semibold">₱{order.subtotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Tax</p>
                    <p className="font-semibold">₱{order.tax.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Shipping</p>
                    <p className="font-semibold">₱{order.shipping.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useOrderTracking } from "@/context/OrderTrackingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Package } from "lucide-react";
import OrderTrackingTimeline from "@/components/OrderTrackingTimeline";

export default function OrderTracking() {
  const { getAllOrdersStatus, getOrderTracking } = useOrderTracking();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const allOrders = getAllOrdersStatus();
  const filteredOrders = allOrders.filter(order =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTracking = selectedOrder ? getOrderTracking(selectedOrder) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/50 to-background">
      {/* Header */}
      <header className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Order Tracking</h1>
          <p className="text-muted-foreground">Track your shipments in real-time</p>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Search & Orders */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Order ID or tracking number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-tracking"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Orders</CardTitle>
                <CardDescription>{filteredOrders.length} orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">No orders found</p>
                ) : (
                  <div className="space-y-2">
                    {filteredOrders.map((order) => (
                      <Button
                        key={order.orderId}
                        variant={selectedOrder === order.orderId ? "default" : "outline"}
                        className="w-full justify-start gap-3 h-auto py-3"
                        onClick={() => setSelectedOrder(order.orderId)}
                        data-testid={`button-track-order-${order.orderId}`}
                      >
                        <Package className="h-4 w-4 flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-sm">{order.orderId}</p>
                          <p className="text-xs text-muted-foreground">{order.trackingNumber}</p>
                          <Badge className="mt-1" variant="outline">
                            {order.status}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Carrier Info */}
            {selectedTracking && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Carrier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Carrier</p>
                    <p className="font-semibold mt-1">{selectedTracking.carrier}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tracking Number</p>
                    <p className="font-mono text-sm font-semibold mt-1">{selectedTracking.trackingNumber}</p>
                  </div>
                  <div className="pt-2 border-t space-y-2">
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-xs"
                      data-testid="button-contact-support"
                    >
                      <Phone className="h-3 w-3" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Content - Tracking Details */}
          <div className="lg:col-span-2">
            {selectedTracking ? (
              <OrderTrackingTimeline tracking={selectedTracking} />
            ) : (
              <Card className="h-full flex items-center justify-center min-h-96">
                <CardContent className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Select an order to view tracking details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

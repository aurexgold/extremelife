import { useState } from "react";
import { useOrderTracking } from "@/context/OrderTrackingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, TrendingUp, MapPin, Truck, CheckCircle } from "lucide-react";

const StatusColor = {
  "Processing": "bg-gray-100 text-gray-800",
  "Confirmed": "bg-blue-100 text-blue-800",
  "Shipped": "bg-purple-100 text-purple-800",
  "In Transit": "bg-orange-100 text-orange-800",
  "Out for Delivery": "bg-yellow-100 text-yellow-800",
  "Delivered": "bg-green-100 text-green-800",
};

const StatusIcon = {
  "Processing": Package,
  "Confirmed": CheckCircle,
  "Shipped": Truck,
  "In Transit": Truck,
  "Out for Delivery": MapPin,
  "Delivered": CheckCircle,
};

export default function AdminOrderTracking() {
  const { getAllOrdersStatus, updateOrderStatus } = useOrderTracking();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const allOrders = getAllOrdersStatus();
  const filteredOrders = selectedStatus === "all"
    ? allOrders
    : allOrders.filter(o => o.status === selectedStatus);

  const getStats = () => {
    const stats = {
      total: allOrders.length,
      processing: allOrders.filter(o => o.status === "Processing").length,
      inTransit: allOrders.filter(o => o.status === "In Transit").length,
      delivered: allOrders.filter(o => o.status === "Delivered").length,
      delayed: allOrders.filter(o => {
        const estDate = new Date(o.estimatedDelivery);
        return estDate < new Date();
      }).length,
    };
    return stats;
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Order Tracking Management</h1>
            <p className="text-sm text-muted-foreground">Monitor all shipments and carrier status</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold mt-2 text-blue-600">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-3xl font-bold mt-2 text-gray-600">{stats.processing}</p>
                </div>
                <Package className="h-8 w-8 text-gray-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">{stats.inTransit}</p>
                </div>
                <Truck className="h-8 w-8 text-orange-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{stats.delivered}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700">Delayed</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{stats.delayed}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Monitor and manage shipment status</CardDescription>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Tracking Number</th>
                    <th className="text-left py-3 px-4 font-semibold">Carrier</th>
                    <th className="text-left py-3 px-4 font-semibold">Current Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Est. Delivery</th>
                    <th className="text-left py-3 px-4 font-semibold">Last Update</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const Icon = StatusIcon[order.status as keyof typeof StatusIcon];
                    return (
                      <tr key={order.orderId} className="border-b hover:bg-muted/30 transition">
                        <td className="py-3 px-4 font-medium font-mono text-xs">{order.orderId}</td>
                        <td className="py-3 px-4 font-mono text-xs">{order.trackingNumber}</td>
                        <td className="py-3 px-4 text-xs">
                          <Badge variant="outline">{order.carrier}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Badge className={StatusColor[order.status as keyof typeof StatusColor]}>
                              {order.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs">
                          {new Date(order.estimatedDelivery).toLocaleDateString("en-PH")}
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          {new Date(order.lastUpdate).toLocaleString("en-PH")}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            data-testid={`button-view-tracking-${order.orderId}`}
                            onClick={() => window.location.href = `/tracking/${order.orderId}`}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Carrier Breakdown */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Carrier Breakdown</CardTitle>
              <CardDescription>Orders by shipping carrier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["J&T Express", "LBC Express", "2GO Express", "Lalamove"].map((carrier) => {
                const count = allOrders.filter(o => o.carrier === carrier).length;
                const percentage = ((count / allOrders.length) * 100).toFixed(0);
                return (
                  <div key={carrier}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{carrier}</span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Distribution</CardTitle>
              <CardDescription>Orders by delivery status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Processing", "Confirmed", "Shipped", "In Transit", "Out for Delivery", "Delivered"].map((status) => {
                const count = allOrders.filter(o => o.status === status).length;
                const percentage = ((count / allOrders.length) * 100).toFixed(0);
                return (
                  <div key={status}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{status}</span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

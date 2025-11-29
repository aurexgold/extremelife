import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { Eye, Download, Filter } from "lucide-react";

const mockOrders = [
  { id: 1, orderNum: "ORD-001", customer: "Maria Santos", email: "maria@email.com", phone: "+63-905-1234567", amount: 2499, items: 3, status: "Delivered", date: "2024-11-27", shipping: "J&T Express" },
  { id: 2, orderNum: "ORD-002", customer: "Juan Dela Cruz", email: "juan@email.com", phone: "+63-909-8765432", amount: 1849, items: 2, status: "Processing", date: "2024-11-28", shipping: "Pending" },
  { id: 3, orderNum: "ORD-003", customer: "Rosa Gonzales", email: "rosa@email.com", phone: "+63-917-5551234", amount: 3299, items: 4, status: "In Transit", date: "2024-11-28", shipping: "Lalamove Express" },
  { id: 4, orderNum: "ORD-004", customer: "Carlos Reyes", email: "carlos@email.com", phone: "+63-908-3332222", amount: 649, items: 1, status: "Delivered", date: "2024-11-26", shipping: "LBC Express" },
  { id: 5, orderNum: "ORD-005", customer: "Ana Ortega", email: "ana@email.com", phone: "+63-910-9994444", amount: 2150, items: 3, status: "Cancelled", date: "2024-11-25", shipping: "Cancelled" },
];

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const statuses = ["All", "Processing", "In Transit", "Delivered", "Cancelled"];

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNum.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
              <p className="text-muted-foreground">{filteredOrders.length} orders found</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by order number or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-background outline-none"
                  >
                    {statuses.map(status => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-4 px-6 font-semibold">Order ID</th>
                      <th className="text-left py-4 px-6 font-semibold">Customer</th>
                      <th className="text-left py-4 px-6 font-semibold">Items</th>
                      <th className="text-left py-4 px-6 font-semibold">Amount</th>
                      <th className="text-left py-4 px-6 font-semibold">Status</th>
                      <th className="text-left py-4 px-6 font-semibold">Shipping</th>
                      <th className="text-left py-4 px-6 font-semibold">Date</th>
                      <th className="text-left py-4 px-6 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-b hover:bg-muted/30 transition">
                        <td className="py-4 px-6 font-mono text-sm font-bold">{order.orderNum}</td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">{order.items} items</td>
                        <td className="py-4 px-6 font-bold">₱{order.amount.toLocaleString('en-PH')}</td>
                        <td className="py-4 px-6">
                          <Badge className={`${getStatusColor(order.status)} border-0`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-sm">{order.shipping}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{order.date}</td>
                        <td className="py-4 px-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedOrder.orderNum}</CardTitle>
                  <CardDescription>Order details and tracking</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Status</p>
                <Badge className={`${getStatusColor(selectedOrder.status)} border-0`}>
                  {selectedOrder.status}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Shipping Info</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{selectedOrder.shipping}</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated delivery: 2-3 days</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-3">Order Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{(selectedOrder.amount * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₱89</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total</span>
                    <span>₱{selectedOrder.amount.toLocaleString('en-PH')}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">Send Invoice</Button>
                <Button className="flex-1">Update Status</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

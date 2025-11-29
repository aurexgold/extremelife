import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Package, ShoppingCart, TrendingUp, Users, Video, Trash2, Edit, Plus, AlertCircle, TrendingDown, AlertTriangle, Truck, Mail, Gift } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { products } from "@/lib/data";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import EmailNotificationBell from "@/components/EmailNotificationBell";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { logout, adminName } = useAdmin();
  const [productsList, setProductsList] = useState(products.map(p => ({ ...p, stock: Math.floor(Math.random() * 30) + 5 })));
  const [orders] = useState([
    { id: 1, customer: "Maria Santos", total: 2499, status: "Delivered", date: "2024-11-27" },
    { id: 2, customer: "Juan Dela Cruz", total: 1849, status: "Processing", date: "2024-11-28" },
    { id: 3, customer: "Rosa Gonzales", total: 3299, status: "In Transit", date: "2024-11-28" },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Sales analytics data
  const salesData = [
    { date: "Nov 20", revenue: 8400, orders: 12 },
    { date: "Nov 21", revenue: 9200, orders: 15 },
    { date: "Nov 22", revenue: 7800, orders: 10 },
    { date: "Nov 23", revenue: 11200, orders: 18 },
    { date: "Nov 24", revenue: 10500, orders: 16 },
    { date: "Nov 25", revenue: 12300, orders: 22 },
    { date: "Nov 26", revenue: 9800, orders: 14 },
    { date: "Nov 27", revenue: 13400, orders: 25 },
    { date: "Nov 28", revenue: 11200, orders: 20 },
  ];

  const topProducts = [
    { name: "Lavender Oil", sales: 248, revenue: 12400 },
    { name: "Peppermint Soap", sales: 156, revenue: 8580 },
    { name: "Eucalyptus Oil", sales: 132, revenue: 7920 },
    { name: "Ginger Tea", sales: 98, revenue: 4900 },
  ];

  const orderStatusData = [
    { name: "Delivered", value: 42, fill: "#10b981" },
    { name: "In Transit", value: 18, fill: "#3b82f6" },
    { name: "Processing", value: 12, fill: "#f59e0b" },
  ];

  const lowStockProducts = productsList.filter(p => p.stock < 10);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const stats = [
    { label: "Total Products", value: productsList.length, icon: Package, color: "bg-blue-100 text-blue-600" },
    { label: "Active Orders", value: 23, icon: ShoppingCart, color: "bg-green-100 text-green-600" },
    { label: "Monthly Sales", value: "₱45,320", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
    { label: "Total Customers", value: 187, icon: Users, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {adminName}</p>
          </div>
          <div className="flex items-center gap-2">
            <EmailNotificationBell />
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Video className="h-4 w-4" />
              Live Stream
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-2">
              <Truck className="h-4 w-4" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="abandoned" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Abandoned
            </TabsTrigger>
            <TabsTrigger value="bundles" className="gap-2">
              <Gift className="h-4 w-4" />
              Bundles
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Product</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Stock</th>
                        <th className="text-left py-3 px-4 font-semibold">Category</th>
                        <th className="text-left py-3 px-4 font-semibold">Platforms</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList.map((product) => (
                        <tr key={product.id} className={`border-b hover:bg-muted/30 transition ${product.stock < 10 ? 'bg-red-50/50' : ''}`}>
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{product.stock}</span>
                              {product.stock < 10 && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                  <AlertCircle className="h-3 w-3" />
                                  Low Stock
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs gap-1 flex">
                            {product.shopee && <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Shopee</span>}
                            {product.lazada && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Lazada</span>}
                          </td>
                          <td className="py-3 px-4 flex gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                                <div className="flex gap-2 justify-end">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 font-mono text-xs">ORD-{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4 font-bold">₱{order.total.toLocaleString('en-PH')}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">{order.date}</td>
                          <td className="py-3 px-4">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
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
          </TabsContent>

          {/* Live Stream Tab */}
          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Live Stream Management</CardTitle>
                <CardDescription>Manage live selling sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Current Live Stream</h3>
                        <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse"></div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Title</p>
                          <p className="font-semibold">Wellness Wednesday: Benefits ng Essential Oils</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Viewers</p>
                          <p className="font-semibold">847 watching</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-semibold">15 minutes</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Pause</Button>
                        <Button variant="destructive" size="sm" className="flex-1">End Stream</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/60">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Stream Analytics</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peak Viewers</span>
                          <span className="font-semibold">1,203</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Engagement Rate</span>
                          <span className="font-semibold">12.4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products Sold</span>
                          <span className="font-semibold">34 units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">₱18,920</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full gap-2 h-10">
                  <Video className="h-4 w-4" />
                  Schedule New Live Stream
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">{lowStockProducts.length} Products Running Low on Stock</p>
                    <p className="text-sm text-red-800 mt-1">
                      {lowStockProducts.map(p => p.name).join(", ")} need restocking
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders Trend</CardTitle>
                <CardDescription>Last 9 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Revenue (₱)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>By sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3b82f6" name="Units Sold" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Order Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current orders by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Revenue (9 days)</p>
                    <p className="text-3xl font-bold">₱98,200</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+12.5% vs previous period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg Order Value</p>
                    <p className="text-3xl font-bold">₱2,456</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+5.2% increase</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-3xl font-bold">3.8%</p>
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <TrendingDown className="h-4 w-4" />
                      <span>-0.3% decrease</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Order Tracking Tab */}
          <TabsContent value="tracking">
            <Button onClick={() => navigate("/admin/order-tracking")} className="gap-2">
              <Truck className="h-4 w-4" />
              View Order Tracking Dashboard
            </Button>
          </TabsContent>

          {/* Abandoned Carts Tab */}
          <TabsContent value="abandoned">
            <Button onClick={() => navigate("/admin/abandoned-carts")} className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              View Abandoned Carts Dashboard
            </Button>
          </TabsContent>

          {/* Product Bundles Tab */}
          <TabsContent value="bundles">
            <Button onClick={() => navigate("/admin/product-bundles")} className="gap-2">
              <Gift className="h-4 w-4" />
              Manage Product Bundles
            </Button>
          </TabsContent>

          {/* Email Notifications Tab */}
          <TabsContent value="email">
            <Button onClick={() => navigate("/admin/email-notifications")} className="gap-2">
              <Mail className="h-4 w-4" />
              View Email Notifications
            </Button>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>Manage store configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold">Shipping Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Enable Lalamove Express</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Enable J&T Express</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Enable LBC Express</span>
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>GCash</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>PayMaya</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        isOpen={showOrderModal} 
        onClose={() => setShowOrderModal(false)}
      />
    </div>
  );
}

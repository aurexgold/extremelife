import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Package, ShoppingCart, TrendingUp, Users, Video, Trash2, Edit, Plus, AlertCircle, TrendingDown, AlertTriangle, Truck, Mail, Gift, MessageSquare, Zap, DollarSign, Award, Users2 } from "lucide-react";
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
  const criticalStockProducts = productsList.filter(p => p.stock < 5);
  const outOfStockProducts = productsList.filter(p => p.stock === 0);

  // 1. REVENUE BY TIME PERIOD
  const revenueByPeriod = {
    today: 3200,
    thisWeek: 18400,
    thisMonth: 95320,
    ytd: 450000
  };

  // 2. STREAMER PERFORMANCE DATA
  const streamers = [
    { id: 1, name: "Sarah Wellness Expert", sales: 156000, commission: 15600, commissionRate: 10, viewers: 2450, liveHours: 24, rating: 4.8 },
    { id: 2, name: "Maria Health Coach", sales: 98000, commission: 9800, commissionRate: 10, viewers: 1890, liveHours: 18, rating: 4.6 },
    { id: 3, name: "Rosa Natural Living", sales: 67000, commission: 6700, commissionRate: 10, viewers: 1200, liveHours: 14, rating: 4.5 },
  ];

  // 3. PAYMENT METHOD BREAKDOWN
  const paymentMethods = [
    { method: "GCash", count: 45, percentage: 42, revenue: 85600 },
    { method: "PayMaya", count: 32, percentage: 30, revenue: 60800 },
    { method: "COD", count: 30, percentage: 28, revenue: 56920 },
  ];

  // 4. LOGISTICS PROVIDER DATA
  const logisticsData = [
    { provider: "J&T Express", orders: 38, avgTime: "2.5 days", status: { delivered: 32, transit: 5, pending: 1 }, cost: 2280 },
    { provider: "LBC Express", orders: 32, avgTime: "3 days", status: { delivered: 28, transit: 3, pending: 1 }, cost: 1920 },
    { provider: "2GO Express", orders: 24, avgTime: "3.5 days", status: { delivered: 20, transit: 3, pending: 1 }, cost: 1440 },
    { provider: "Lalamove", orders: 13, avgTime: "1 day", status: { delivered: 12, transit: 1, pending: 0 }, cost: 2600 },
  ];

  // 5. LOYALTY & REFERRAL IMPACT
  const loyaltyImpact = {
    totalPointsIssued: 28900,
    totalPointsRedeemed: 12340,
    loyaltyRevenue: 34200,
    referralRevenue: 18500,
    topReferrer: { name: "Juan Dela Cruz", referrals: 12, revenue: 4800 }
  };

  const lowStockAlert = lowStockProducts.length > 0;
  const criticalStockAlert = criticalStockProducts.length > 0;
  const outOfStockAlert = outOfStockProducts.length > 0;

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

  // NEW: Customer Analytics
  const customerMetrics = {
    newCustomers: 23,
    returningCustomers: 164,
    repeatRate: 87.7,
    avgLTV: 8420,
    churnRate: 2.3,
    acquisitionCost: 450
  };

  // NEW: Product Categories Performance
  const categoryPerformance = [
    { category: "Essential Oils", revenue: 125400, percentage: 35, units: 542 },
    { category: "Herbal Teas", revenue: 98200, percentage: 27, units: 1240 },
    { category: "Soaps & Salts", revenue: 76500, percentage: 21, units: 850 },
    { category: "Supplements", revenue: 58900, percentage: 16, units: 234 },
  ];

  // NEW: Regional Sales (Philippines)
  const regionalSales = [
    { region: "Metro Manila", sales: 145000, orders: 89, customers: 67, growth: "+12%" },
    { region: "Cebu", sales: 67800, orders: 42, customers: 31, growth: "+8%" },
    { region: "Davao", sales: 54200, orders: 35, customers: 26, growth: "+5%" },
    { region: "Bacolod", sales: 38900, orders: 24, customers: 18, growth: "+3%" },
    { region: "Cagayan de Oro", sales: 32100, orders: 20, customers: 15, growth: "+2%" },
  ];

  // NEW: Conversion Funnel
  const conversionFunnel = [
    { stage: "Site Visitors", count: 12450, percentage: 100 },
    { stage: "Product Views", count: 8320, percentage: 67 },
    { stage: "Add to Cart", count: 2148, percentage: 17 },
    { stage: "Checkout", count: 1574, percentage: 12.6 },
    { stage: "Completed Orders", count: 945, percentage: 7.6 },
  ];

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
          <TabsList className="grid w-full grid-cols-12 overflow-x-auto">
            <TabsTrigger value="products" className="gap-1 text-xs md:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-1 text-xs md:text-sm">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-1 text-xs md:text-sm">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="streamers" className="gap-1 text-xs md:text-sm">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Streamers</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-1 text-xs md:text-sm">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="logistics" className="gap-1 text-xs md:text-sm">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Logistics</span>
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="gap-1 text-xs md:text-sm">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Loyalty</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-1 text-xs md:text-sm">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Live</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1 text-xs md:text-sm">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-1 text-xs md:text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Abandoned</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-1 text-xs md:text-sm">
              <Users2 className="h-4 w-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-1 text-xs md:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="regions" className="gap-1 text-xs md:text-sm">
              📍
              <span className="hidden sm:inline">Regions</span>
            </TabsTrigger>
            <TabsTrigger value="funnel" className="gap-1 text-xs md:text-sm">
              📊
              <span className="hidden sm:inline">Funnel</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">⚙️</TabsTrigger>
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

          {/* IMPROVEMENT 1: Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-3xl font-bold">₱{revenueByPeriod.today.toLocaleString('en-PH')}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+8.2% vs yesterday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-3xl font-bold">₱{revenueByPeriod.thisWeek.toLocaleString('en-PH')}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+15.3% vs last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-3xl font-bold">₱{revenueByPeriod.thisMonth.toLocaleString('en-PH')}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+22.5% vs last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Year to Date</p>
                    <p className="text-3xl font-bold">₱{revenueByPeriod.ytd.toLocaleString('en-PH')}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+35% vs last year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IMPROVEMENT 2: Streamer Performance Tab */}
          <TabsContent value="streamers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Streamer Performers</CardTitle>
                <CardDescription>Streamer sales, commissions, and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Streamer</th>
                        <th className="text-left py-3 px-4 font-semibold">Total Sales</th>
                        <th className="text-left py-3 px-4 font-semibold">Commission</th>
                        <th className="text-left py-3 px-4 font-semibold">Live Hours</th>
                        <th className="text-left py-3 px-4 font-semibold">Avg Viewers</th>
                        <th className="text-left py-3 px-4 font-semibold">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {streamers.map((streamer) => (
                        <tr key={streamer.id} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 font-medium">{streamer.name}</td>
                          <td className="py-3 px-4 font-bold">₱{streamer.sales.toLocaleString('en-PH')}</td>
                          <td className="py-3 px-4 text-green-600 font-semibold">₱{streamer.commission.toLocaleString('en-PH')}</td>
                          <td className="py-3 px-4">{streamer.liveHours}h</td>
                          <td className="py-3 px-4">{streamer.viewers.toLocaleString('en-PH')}</td>
                          <td className="py-3 px-4">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                              ⭐ {streamer.rating}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPROVEMENT 3: Payment Methods Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {paymentMethods.map((pm, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{pm.method}</p>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{pm.percentage}%</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Orders</p>
                        <p className="text-2xl font-bold">{pm.count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="text-lg font-bold">₱{pm.revenue.toLocaleString('en-PH')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={paymentMethods.map(pm => ({ name: pm.method, value: pm.count }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethods.map((pm, i) => (
                        <Cell key={`cell-${i}`} fill={['#3b82f6', '#10b981', '#f59e0b'][i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPROVEMENT 4: Logistics Tracking Tab */}
          <TabsContent value="logistics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logistics Provider Performance</CardTitle>
                <CardDescription>Philippine local shipping providers breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Provider</th>
                        <th className="text-left py-3 px-4 font-semibold">Orders</th>
                        <th className="text-left py-3 px-4 font-semibold">Avg Delivery</th>
                        <th className="text-left py-3 px-4 font-semibold">Delivered</th>
                        <th className="text-left py-3 px-4 font-semibold">In Transit</th>
                        <th className="text-left py-3 px-4 font-semibold">Pending</th>
                        <th className="text-left py-3 px-4 font-semibold">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logisticsData.map((log, i) => (
                        <tr key={i} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 font-semibold">{log.provider}</td>
                          <td className="py-3 px-4">{log.orders}</td>
                          <td className="py-3 px-4">{log.avgTime}</td>
                          <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">{log.status.delivered}</span></td>
                          <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{log.status.transit}</span></td>
                          <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">{log.status.pending}</span></td>
                          <td className="py-3 px-4 font-bold">₱{log.cost.toLocaleString('en-PH')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPROVEMENT 5: Loyalty & Referral Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Loyalty Points Issued</p>
                    <p className="text-3xl font-bold">{loyaltyImpact.totalPointsIssued.toLocaleString('en-PH')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Loyalty Points Redeemed</p>
                    <p className="text-3xl font-bold">{loyaltyImpact.totalPointsRedeemed.toLocaleString('en-PH')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Loyalty Revenue Generated</p>
                    <p className="text-3xl font-bold">₱{loyaltyImpact.loyaltyRevenue.toLocaleString('en-PH')}</p>
                    <p className="text-xs text-green-600">+18% from loyalty members</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Referral Revenue Generated</p>
                    <p className="text-3xl font-bold">₱{loyaltyImpact.referralRevenue.toLocaleString('en-PH')}</p>
                    <p className="text-xs text-green-600">+12% new customer acquisition</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Top Referrer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{loyaltyImpact.topReferrer.name}</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">{loyaltyImpact.topReferrer.referrals} referrals</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Revenue generated by referrals:</span>
                    <span className="font-bold">₱{loyaltyImpact.topReferrer.revenue.toLocaleString('en-PH')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* IMPROVEMENT 6: Enhanced Stock Alerts */}
            {outOfStockAlert && (
              <Card className="border-red-300 bg-red-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">🚨 {outOfStockProducts.length} OUT OF STOCK</p>
                    <p className="text-sm text-red-800 mt-1">
                      {outOfStockProducts.map(p => p.name).join(", ")} - Urgent reorder needed!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {criticalStockAlert && (
              <Card className="border-orange-300 bg-orange-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900">⚠️ {criticalStockProducts.length} Critical Stock Items</p>
                    <p className="text-sm text-orange-800 mt-1">
                      {criticalStockProducts.map(p => p.name).join(", ")} - Less than 5 units
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            {lowStockAlert && !criticalStockAlert && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900">{lowStockProducts.length} Products Running Low on Stock</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      {lowStockProducts.map(p => p.name).join(", ")} need restocking soon
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

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Button onClick={() => navigate("/admin/reviews")} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Review Moderation
            </Button>
          </TabsContent>

          {/* Email Notifications Tab */}
          <TabsContent value="email">
            <Button onClick={() => navigate("/admin/email-notifications")} className="gap-2">
              <Mail className="h-4 w-4" />
              View Email Notifications
            </Button>
          </TabsContent>

          {/* NEW: Customer Analytics Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">New Customers</p>
                    <p className="text-3xl font-bold">{customerMetrics.newCustomers}</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Returning Customers</p>
                    <p className="text-3xl font-bold">{customerMetrics.returningCustomers}</p>
                    <p className="text-xs text-blue-600">Active customers</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Repeat Purchase Rate</p>
                    <p className="text-3xl font-bold">{customerMetrics.repeatRate}%</p>
                    <p className="text-xs text-purple-600">Very healthy</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg Customer LTV</p>
                    <p className="text-3xl font-bold">₱{customerMetrics.avgLTV.toLocaleString('en-PH')}</p>
                    <p className="text-xs text-green-600">Lifetime Value</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Churn Rate</p>
                    <p className="text-3xl font-bold">{customerMetrics.churnRate}%</p>
                    <p className="text-xs text-green-600">Very low</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Customer Acquisition Cost</p>
                    <p className="text-3xl font-bold">₱{customerMetrics.acquisitionCost}</p>
                    <p className="text-xs">Per customer</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* NEW: Product Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories Performance</CardTitle>
                <CardDescription>Revenue and sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((cat, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{cat.category}</span>
                        <span className="text-sm font-bold">₱{cat.revenue.toLocaleString('en-PH')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                          style={{width: `${cat.percentage}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{cat.percentage}% of revenue</span>
                        <span>{cat.units} units sold</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown Chart</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryPerformance.map(cat => ({ name: cat.category, value: cat.revenue }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ₱${(value/1000).toFixed(0)}k`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryPerformance.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'][i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NEW: Regional Sales Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Philippine Regional Sales Performance</CardTitle>
                <CardDescription>Sales breakdown by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Region</th>
                        <th className="text-left py-3 px-4 font-semibold">Sales</th>
                        <th className="text-left py-3 px-4 font-semibold">Orders</th>
                        <th className="text-left py-3 px-4 font-semibold">Customers</th>
                        <th className="text-left py-3 px-4 font-semibold">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalSales.map((region, i) => (
                        <tr key={i} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 font-semibold">{region.region}</td>
                          <td className="py-3 px-4 font-bold">₱{region.sales.toLocaleString('en-PH')}</td>
                          <td className="py-3 px-4">{region.orders}</td>
                          <td className="py-3 px-4">{region.customers}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                              {region.growth}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalSales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" name="Sales (₱)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NEW: Conversion Funnel Tab */}
          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Conversion Funnel</CardTitle>
                <CardDescription>Customer journey from visitor to order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">{i + 1}</span>
                          <span className="font-semibold">{stage.stage}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{stage.count.toLocaleString('en-PH')}</p>
                          <p className="text-xs text-muted-foreground">{stage.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500" 
                          style={{width: `${stage.percentage}%`}}
                        ></div>
                      </div>
                      {i < conversionFunnel.length - 1 && (
                        <div className="text-xs text-red-600 mt-1 font-semibold">
                          ↓ Drop-off: {(conversionFunnel[i].percentage - conversionFunnel[i+1].percentage).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Overall Conversion Rate</p>
                    <p className="text-3xl font-bold">7.6%</p>
                    <p className="text-xs text-green-600">+2.1% from last month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg Order Value</p>
                    <p className="text-3xl font-bold">₱1,249</p>
                    <p className="text-xs text-green-600">Up from ₱1,120 last month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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

import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Package, ShoppingCart, TrendingUp, Users, Video, Trash2, Edit, Plus } from "lucide-react";
import { products } from "@/lib/data";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { logout, adminName } = useAdmin();
  const [productsList, setProductsList] = useState(products);
  const [orders] = useState([
    { id: 1, customer: "Maria Santos", total: 2499, status: "Delivered", date: "2024-11-27" },
    { id: 2, customer: "Juan Dela Cruz", total: 1849, status: "Processing", date: "2024-11-28" },
    { id: 3, customer: "Rosa Gonzales", total: 3299, status: "In Transit", date: "2024-11-28" },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter(p => p.id !== id));
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
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="live">Live Stream</TabsTrigger>
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
                        <th className="text-left py-3 px-4 font-semibold">Category</th>
                        <th className="text-left py-3 px-4 font-semibold">Platforms</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
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
                            <Button variant="ghost" size="sm">View</Button>
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
    </div>
  );
}

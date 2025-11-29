import { useAdmin } from "@/context/AdminContext";
import { useAbandonedCart } from "@/context/AbandonedCartContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, ShoppingCart, CheckCircle, Copy } from "lucide-react";

export default function AdminAbandonedCarts() {
  const { adminName } = useAdmin();
  const { abandonedCarts, getAbandonedCartStats } = useAbandonedCart();

  const stats = getAbandonedCartStats();
  const recoveredValue = abandonedCarts
    .filter(c => c.status === "recovered" || c.status === "converted")
    .reduce((sum, c) => sum + c.cartValue, 0);
  const potentialRevenue = abandonedCarts
    .filter(c => c.status === "abandoned")
    .reduce((sum, c) => sum + c.cartValue, 0);

  const copyRecoveryLink = (token: string) => {
    const link = `${window.location.origin}/recover-cart/${token}`;
    navigator.clipboard.writeText(link);
    alert("Recovery link copied!");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Abandoned Cart Recovery</h1>
            <p className="text-sm text-muted-foreground">Monitor and recover lost sales</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Abandoned Carts</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">{stats.totalAbandoned}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recovered</p>
                  <p className="text-3xl font-bold mt-2 text-blue-600">{stats.recovered}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Converted to Sales</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{stats.converted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recovery Rate</p>
                  <p className="text-3xl font-bold mt-2 text-purple-600">{stats.recoveryRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <p className="text-sm text-green-700 mb-2">Recovered Revenue</p>
              <p className="text-3xl font-bold text-green-900">₱{recoveredValue.toLocaleString('en-PH')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <p className="text-sm text-orange-700 mb-2">Potential Revenue</p>
              <p className="text-3xl font-bold text-orange-900">₱{potentialRevenue.toLocaleString('en-PH')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <p className="text-sm text-blue-700 mb-2">Total Abandoned Value</p>
              <p className="text-3xl font-bold text-blue-900">₱{stats.totalValue.toLocaleString('en-PH')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Carts Table */}
        <Tabs defaultValue="abandoned" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="abandoned">
              Abandoned ({stats.totalAbandoned})
            </TabsTrigger>
            <TabsTrigger value="recovered">
              Recovered ({stats.recovered})
            </TabsTrigger>
            <TabsTrigger value="converted">
              Converted ({stats.converted})
            </TabsTrigger>
          </TabsList>

          {/* Abandoned Tab */}
          <TabsContent value="abandoned">
            <Card>
              <CardHeader>
                <CardTitle>Active Abandoned Carts</CardTitle>
                <CardDescription>Send recovery emails to these customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Cart Value</th>
                        <th className="text-left py-3 px-4 font-semibold">Abandoned</th>
                        <th className="text-left py-3 px-4 font-semibold">Discount</th>
                        <th className="text-left py-3 px-4 font-semibold">Recovery Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abandonedCarts
                        .filter(c => c.status === "abandoned")
                        .map(cart => (
                          <tr key={cart.id} className="border-b hover:bg-muted/30 transition">
                            <td className="py-3 px-4 font-medium">{cart.userName}</td>
                            <td className="py-3 px-4 text-xs text-muted-foreground">{cart.userEmail}</td>
                            <td className="py-3 px-4 font-bold">₱{cart.cartValue.toLocaleString('en-PH')}</td>
                            <td className="py-3 px-4 text-xs">
                              {new Date(cart.abandonedAt).toLocaleDateString("en-PH")}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">{cart.recoveryDiscount}% OFF</Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => copyRecoveryLink(cart.recoveryToken)}
                              >
                                <Copy className="h-3 w-3" />
                                Copy
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

          {/* Recovered Tab */}
          <TabsContent value="recovered">
            <Card>
              <CardHeader>
                <CardTitle>Recovered Carts</CardTitle>
                <CardDescription>Carts that were recovered but not yet converted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Cart Value</th>
                        <th className="text-left py-3 px-4 font-semibold">Recovered</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abandonedCarts
                        .filter(c => c.status === "recovered")
                        .map(cart => (
                          <tr key={cart.id} className="border-b hover:bg-muted/30 transition">
                            <td className="py-3 px-4 font-medium">{cart.userName}</td>
                            <td className="py-3 px-4 font-bold">₱{cart.cartValue.toLocaleString('en-PH')}</td>
                            <td className="py-3 px-4 text-xs">
                              {new Date(cart.recoveredAt!).toLocaleDateString("en-PH")}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-blue-100 text-blue-800">Recovered</Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Converted Tab */}
          <TabsContent value="converted">
            <Card>
              <CardHeader>
                <CardTitle>Converted Sales</CardTitle>
                <CardDescription>Recovered carts that were successfully purchased</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Cart Value</th>
                        <th className="text-left py-3 px-4 font-semibold">Recovered</th>
                        <th className="text-left py-3 px-4 font-semibold">Purchased</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abandonedCarts
                        .filter(c => c.status === "converted")
                        .map(cart => (
                          <tr key={cart.id} className="border-b hover:bg-muted/30 transition">
                            <td className="py-3 px-4 font-medium">{cart.userName}</td>
                            <td className="py-3 px-4 font-bold">₱{cart.cartValue.toLocaleString('en-PH')}</td>
                            <td className="py-3 px-4 text-xs">
                              {new Date(cart.recoveredAt!).toLocaleDateString("en-PH")}
                            </td>
                            <td className="py-3 px-4 text-xs">
                              {new Date(cart.convertedAt!).toLocaleDateString("en-PH")}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">✓ Converted</Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

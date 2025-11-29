import { useAuth } from "@/context/AuthContext";
import { useStreamer } from "@/context/StreamerContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, Target, Download, Send } from "lucide-react";

export default function StreamerDashboard() {
  const { user } = useAuth();
  const { commissions, totalEarnings, pendingEarnings, totalStreamSales, commissionRate } = useStreamer();

  if (user?.role !== "streamer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-lg font-semibold mb-4">Access Denied</p>
            <p className="text-muted-foreground mb-4">Only live streamers can access this dashboard.</p>
            <Button onClick={() => window.location.href = "/"}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sales trend data
  const salesTrend = commissions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(c => ({
      date: new Date(c.date).toLocaleDateString("en-PH", { month: "short", day: "numeric" }),
      sales: c.sales,
      commission: c.commission,
    }));

  // Commission status breakdown
  const statusData = [
    { name: "Paid", value: commissions.filter(c => c.status === "paid").length, fill: "#10b981" },
    { name: "Completed", value: commissions.filter(c => c.status === "completed").length, fill: "#3b82f6" },
    { name: "Pending", value: commissions.filter(c => c.status === "pending").length, fill: "#f59e0b" },
  ];

  const stats = [
    { label: "Total Earnings", value: `₱${totalEarnings.toLocaleString('en-PH')}`, icon: DollarSign, color: "bg-green-100 text-green-600" },
    { label: "Pending Earnings", value: `₱${pendingEarnings.toLocaleString('en-PH')}`, icon: TrendingUp, color: "bg-amber-100 text-amber-600" },
    { label: "Total Sales", value: totalStreamSales, icon: ShoppingCart, color: "bg-blue-100 text-blue-600" },
    { label: "Commission Rate", value: `${commissionRate}%`, icon: Target, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Streamer Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats Cards */}
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
        <Tabs defaultValue="earnings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earnings" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="commissions" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Commissions
            </TabsTrigger>
          </TabsList>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Earnings Breakdown */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Earnings Trend</CardTitle>
                  <CardDescription>Commission by stream</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₱${value.toLocaleString('en-PH')}`} />
                      <Legend />
                      <Line type="monotone" dataKey="commission" stroke="#10b981" strokeWidth={2} name="Commission (₱)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Commission Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Commission Status</CardTitle>
                  <CardDescription>Breakdown by status</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Earning Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <p className="text-sm text-green-700 mb-2">Available for Payout</p>
                  <p className="text-4xl font-bold text-green-900">₱{totalEarnings.toLocaleString('en-PH')}</p>
                  <p className="text-xs text-green-600 mt-2">From {commissions.filter(c => c.status !== "pending").length} completed streams</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                <CardContent className="p-6">
                  <p className="text-sm text-amber-700 mb-2">Pending Commission</p>
                  <p className="text-4xl font-bold text-amber-900">₱{pendingEarnings.toLocaleString('en-PH')}</p>
                  <p className="text-xs text-amber-600 mt-2">From {commissions.filter(c => c.status === "pending").length} recent streams</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <p className="text-sm text-blue-700 mb-2">Total Lifetime Earnings</p>
                  <p className="text-4xl font-bold text-blue-900">₱{(totalEarnings + pendingEarnings).toLocaleString('en-PH')}</p>
                  <p className="text-xs text-blue-600 mt-2">All-time streamer earnings</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales vs Commission</CardTitle>
                <CardDescription>Units sold and commission earned per stream</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={salesTrend.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Units Sold" />
                    <Bar yAxisId="right" dataKey="commission" fill="#10b981" name="Commission (₱)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Avg Sales per Stream</span>
                      <span className="font-bold">{Math.round(totalStreamSales / commissions.length)} units</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Avg Commission per Stream</span>
                      <span className="font-bold">₱{Math.round((totalEarnings + pendingEarnings) / commissions.length).toLocaleString('en-PH')}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Total Streams</span>
                      <span className="font-bold">{commissions.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Commission Rate</span>
                      <span className="font-bold">{commissionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {commissions
                    .sort((a, b) => b.commission - a.commission)
                    .slice(0, 4)
                    .map((comm) => (
                      <div key={comm.id} className="flex justify-between items-start pb-3 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm line-clamp-2">{comm.streamTitle}</p>
                          <p className="text-xs text-muted-foreground mt-1">{comm.sales} units sold</p>
                        </div>
                        <p className="font-bold text-green-600">₱{comm.commission.toLocaleString('en-PH')}</p>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions">
            <Card>
              <CardHeader>
                <CardTitle>Commission History</CardTitle>
                <CardDescription>All earnings from your streams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Stream Title</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Units Sold</th>
                        <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold">Commission</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((comm) => (
                          <tr key={comm.id} className="border-b hover:bg-muted/30 transition">
                            <td className="py-3 px-4 font-medium max-w-xs truncate">{comm.streamTitle}</td>
                            <td className="py-3 px-4 text-sm">{new Date(comm.date).toLocaleDateString("en-PH")}</td>
                            <td className="py-3 px-4 font-semibold">{comm.sales}</td>
                            <td className="py-3 px-4">₱{comm.revenue.toLocaleString('en-PH')}</td>
                            <td className="py-3 px-4 font-bold text-green-600">₱{comm.commission.toLocaleString('en-PH')}</td>
                            <td className="py-3 px-4">
                              <Badge className={`${
                                comm.status === 'paid' ? 'bg-green-100 text-green-800' :
                                comm.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
                              </Badge>
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

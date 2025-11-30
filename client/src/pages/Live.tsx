import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Calendar, Play, User, TrendingUp, MessageCircle, Share2, Heart, Zap, Gift, DollarSign, Users, Eye, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveStreamPlayer from "@/components/LiveStreamPlayer";
import LiveChat from "@/components/LiveChat";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { useLiveStreams } from "@/context/LiveStreamContext";

export default function Live() {
  const { streams } = useLiveStreams();
  const [, setLocation] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 29));
  const [likes, setLikes] = useState(234);
  const [tipped, setTipped] = useState(false);
  
  // Get featured products for the live stream
  const featuredProducts = products.slice(0, 3);

  // IMPROVEMENT 1: Real-time engagement metrics
  const liveMetrics = {
    viewers: 1247,
    comments: 89,
    likes: likes,
    tips: 8450,
    shareCount: 156,
    duration: "23 mins"
  };

  // IMPROVEMENT 2: Streamer info
  const streamerInfo = {
    name: "Sarah Wellness Expert",
    role: "Herbal Products Specialist",
    followers: 12400,
    rating: 4.8,
    live_hours: 24,
    sales_record: "₱156,000 this month"
  };

  // IMPROVEMENT 3: Sales counter data
  const liveStats = {
    productsForSale: 12,
    itemsSold: 34,
    streamRevenue: 28500,
    averageOrderValue: 2500
  };

  // IMPROVEMENT 4: Engagement/Viewer testimonials
  const testimonials = [
    { name: "Maria S.", text: "Excellent quality! Ordered 3 items.", likes: 24 },
    { name: "Juan D.", text: "Fast delivery, very satisfied.", likes: 18 },
    { name: "Rosa G.", text: "Amazing live experience!", likes: 32 }
  ];

  // IMPROVEMENT 5: Viewer count over time (for chart)
  const viewerChart = [
    { time: "0:00", viewers: 234 },
    { time: "5:00", viewers: 456 },
    { time: "10:00", viewers: 892 },
    { time: "15:00", viewers: 1102 },
    { time: "20:00", viewers: 1247 }
  ];

  // IMPROVEMENT 6: Top products being sold in real-time
  const topLiveProducts = [
    { name: "Lavender Oil", unitsSold: 12, revenue: 6000 },
    { name: "Peppermint Soap", unitsSold: 9, revenue: 4950 },
    { name: "Eucalyptus Oil", unitsSold: 7, revenue: 4200 }
  ];

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDateString = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };

  const getStreamsForDay = (day: number | null) => {
    if (!day) return [];
    const dateString = getDateString(day);
    return streams.filter((s) => s.date === dateString);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Live Selling</h1>
        <p className="text-muted-foreground">Watch live streams & explore upcoming events</p>
      </div>

      <Tabs defaultValue="now-live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="now-live" className="gap-2">
            <Play className="h-4 w-4" />
            Now Live
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
        </TabsList>

        {/* Now Live Tab */}
        <TabsContent value="now-live" className="space-y-8">
          {/* IMPROVEMENT 1: Live Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Viewers</span>
                </div>
                <p className="text-2xl font-bold">{liveMetrics.viewers.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Comments</span>
                </div>
                <p className="text-2xl font-bold">{liveMetrics.comments}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-xs text-muted-foreground">Likes</span>
                </div>
                <p className="text-2xl font-bold">{liveMetrics.likes}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-4 w-4 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Tips</span>
                </div>
                <p className="text-2xl font-bold">₱{(liveMetrics.tips/1000).toFixed(1)}k</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Share2 className="h-4 w-4 text-orange-600" />
                  <span className="text-xs text-muted-foreground">Shares</span>
                </div>
                <p className="text-2xl font-bold">{liveMetrics.shareCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-xs text-muted-foreground">Duration</span>
                </div>
                <p className="text-2xl font-bold">{liveMetrics.duration}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <Badge variant="destructive" className="animate-pulse">LIVE NOW</Badge>
                <span className="text-sm text-muted-foreground">Started 23 mins ago • {liveMetrics.viewers.toLocaleString()} watching</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif">Wellness Wednesday: Benefits ng Essential Oils</h2>
                <p className="text-muted-foreground mt-2">Available on Shopee & Lazada | Free delivery on orders above ₱2,500</p>
              </div>
              {/* IMPROVEMENT 2: Streamer Info Card */}
              <Card className="w-full md:w-auto md:min-w-[250px]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{streamerInfo.name}</p>
                      <p className="text-xs text-muted-foreground">{streamerInfo.role}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="flex justify-between"><span className="text-muted-foreground">Followers:</span> <span className="font-semibold">{streamerInfo.followers.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span className="text-muted-foreground">Rating:</span> <span className="font-semibold">⭐ {streamerInfo.rating}</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {/* Main Stream Area - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <LiveStreamPlayer />
              
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold text-xl mb-4">About This Session</h3>
                <p className="text-muted-foreground mb-4">
                    Join our expert herbalist Sarah as she discusses the therapeutic benefits ng aming organic essential oils. 
                    Learn kung paano gamitin ang Lavender para sa better sleep, Peppermint para sa focus, at Eucatyptus para sa respiratory health.
                </p>
                <div className="bg-secondary/10 rounded-lg p-3 text-sm">
                  <strong className="text-primary">⏰ Exclusive Deals During Stream:</strong>
                  <p className="text-muted-foreground mt-1">Extra 10% off on selected items + Free shipping nationwide!</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - IMPROVEMENTS 3 & 4 */}
            <div className="lg:col-span-2 space-y-6">
              {/* IMPROVEMENT 3: Live Sales Counter */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900">🎯 Stream Sales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-green-800/70">Items Sold</p>
                      <p className="text-3xl font-bold text-green-900">{liveStats.itemsSold}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-800/70">Stream Revenue</p>
                      <p className="text-2xl font-bold text-green-900">₱{(liveStats.streamRevenue/1000).toFixed(1)}k</p>
                    </div>
                  </div>
                  <div className="border-t border-green-200 pt-3">
                    <p className="text-sm text-green-800"><strong>Avg Order:</strong> ₱{liveStats.averageOrderValue.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <div className="lg:block">
                <LiveChat />
              </div>

              {/* IMPROVEMENT 4: Live Viewer Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">💬 Viewer Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {testimonials.map((testimonial, i) => (
                    <div key={i} className="border-b pb-3 last:border-0">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">{testimonial.name[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{testimonial.text}</p>
                          <button className="text-xs text-red-600 mt-1 flex items-center gap-1 hover:text-red-700">
                            <Heart className="h-3 w-3" fill="currentColor" /> {testimonial.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* IMPROVEMENT 5: Top Products During Stream */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🔥 Top Selling Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {topLiveProducts.map((product, i) => (
                <Card key={i} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="font-semibold mb-2">{product.name}</p>
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between"><span className="text-muted-foreground">Sold:</span> <span className="font-bold text-green-600">{product.unitsSold} units</span></p>
                      <p className="flex justify-between"><span className="text-muted-foreground">Revenue:</span> <span className="font-bold">₱{product.revenue.toLocaleString()}</span></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Products in Stream */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Featured Products 
                <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">{featuredProducts.length} items</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map(product => (
                    <div key={product.id} className="group relative">
                      <ProductCard product={product} />
                      {/* IMPROVEMENT 6: Quick add-to-cart button */}
                      <Button className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg m-auto w-[calc(100%-12px)] h-10 gap-2 bg-primary hover:bg-primary/90" data-testid={`button-add-to-cart-live-${product.id}`}>
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                ))}
            </div>

            {/* Quick Order Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-lg text-blue-900 mb-4">🛒 How to Order from This Live Stream</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-3">1</div>
                  <p className="font-semibold text-blue-900 mb-2">Visit our Store</p>
                  <p className="text-sm text-blue-800">Go to Shopee or Lazada and search "Extreme Life Herbal"</p>
                </div>
                <div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-3">2</div>
                  <p className="font-semibold text-blue-900 mb-2">Add to Cart</p>
                  <p className="text-sm text-blue-800">Select your items. Code WELLNESS10 for 10% off during stream!</p>
                </div>
                <div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-3">3</div>
                  <p className="font-semibold text-blue-900 mb-2">Checkout</p>
                  <p className="text-sm text-blue-800">Use GCash, PayMaya, COD, or bank transfer. Free shipping ₱2,500+</p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{monthName}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-bold text-sm text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      const streamsOnDay = getStreamsForDay(day);
                      const hasStreams = streamsOnDay.length > 0;
                      const isToday =
                        day &&
                        day === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear();

                      return (
                        <div
                          key={index}
                          className={`aspect-square p-2 rounded-lg border border-border hover:bg-muted transition-colors ${
                            day === null ? "bg-muted/20" : "bg-card hover:shadow-md"
                          } ${isToday ? "border-primary ring-2 ring-primary/20" : ""}`}
                        >
                          {day && (
                            <div>
                              <p className={`text-sm font-semibold ${isToday ? "text-primary" : ""}`}>{day}</p>
                              {hasStreams && (
                                <div className="mt-1 space-y-0.5">
                                  {streamsOnDay.slice(0, 2).map((stream) => (
                                    <div 
                                      key={stream.id}
                                      onClick={() => setLocation(`/live-stream/${stream.id}`)}
                                      className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded truncate cursor-pointer hover:bg-primary/20"
                                    >
                                      {stream.title}
                                    </div>
                                  ))}
                                  {streamsOnDay.length > 2 && (
                                    <p className="text-xs text-muted-foreground px-1">+{streamsOnDay.length - 2} more</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Streams */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Upcoming Events</h3>
              {streams.slice(0, 4).map((stream) => (
                <Card 
                  key={stream.id}
                  onClick={() => setLocation(`/live-stream/${stream.id}`)}
                  className="cursor-pointer hover:shadow-md transition overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{stream.title}</CardTitle>
                    <CardDescription className="text-xs">{stream.date} at {stream.time}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {stream.host}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

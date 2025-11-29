import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Calendar, Play, User } from "lucide-react";
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
  
  // Get featured products for the live stream
  const featuredProducts = products.slice(0, 3);

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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <Badge variant="destructive" className="animate-pulse">LIVE NOW</Badge>
                <span className="text-sm text-muted-foreground">Started 15 mins ago • 847 watching</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Wellness Wednesday: Benefits ng Essential Oils</h2>
            <p className="text-muted-foreground mt-2">Available on Shopee & Lazada | Free delivery on orders above ₱2,500</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Stream Area - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <LiveStreamPlayer />
              
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold text-xl mb-4">About This Session</h3>
                <p className="text-muted-foreground mb-4">
                    Join our expert herbalist Sarah as she discusses the therapeutic benefits ng aming organic essential oils. 
                    Learn kung paano gamitin ang Lavender para sa better sleep, Peppermint para sa focus, at Eucalyptus para sa respiratory health.
                </p>
                <div className="bg-secondary/10 rounded-lg p-3 text-sm">
                  <strong className="text-primary">⏰ Exclusive Deals During Stream:</strong>
                  <p className="text-muted-foreground mt-1">Extra 10% off on selected items + Free shipping nationwide!</p>
                </div>
              </div>
            </div>

            {/* Chat Area - Takes up 1 column */}
            <div className="lg:col-span-1">
              <LiveChat />
            </div>
          </div>

          {/* Featured Products in Stream */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Featured Products 
                <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">{featuredProducts.length} items</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
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

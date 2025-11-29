import { useRoute, Link } from "wouter";
import { useLiveStreams } from "@/context/LiveStreamContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Eye, Share2, Bell } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function LiveStreamDetail() {
  const [match, params] = useRoute("/live-stream/:id");
  const { getStreamById } = useLiveStreams();
  const stream = match && params?.id ? getStreamById(params.id) : null;

  if (!match || !stream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Stream not found</h1>
          <Link href="/live-calendar">
            <Button>Back to Calendar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const streamProducts = products.filter((p) => stream.featuredProducts.includes(p.id));
  const streamDate = new Date(stream.date);
  const isLive = stream.status === "live";
  const isPast = stream.status === "completed";

  const statusColor = {
    live: "bg-red-100 text-red-800",
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <Link href="/live-calendar">
          <a className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Calendar
          </a>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Video/Stream Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <div className="text-center">
                  {isLive ? (
                    <div className="animate-pulse">
                      <div className="h-20 w-20 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                        <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
                          <Eye className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p className="text-xl font-bold text-red-600">LIVE NOW</p>
                    </div>
                  ) : isPast ? (
                    <div>
                      <div className="text-6xl mb-4">✓</div>
                      <p className="text-muted-foreground">Stream Completed</p>
                      <p className="text-sm text-muted-foreground mt-1">Replay available</p>
                    </div>
                  ) : (
                    <div>
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Starts {streamDate.toLocaleDateString()} at {stream.time}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Stream Details */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold font-serif text-foreground mb-2">{stream.title}</h1>
                      <p className="text-muted-foreground">{stream.description}</p>
                    </div>
                    <Badge className={`${statusColor[stream.status]} border-0`}>
                      {stream.status.charAt(0).toUpperCase() + stream.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Stream Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">DATE</p>
                      <p className="font-semibold">{streamDate.toLocaleDateString("en-PH")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">TIME</p>
                      <p className="font-semibold">{stream.time} PHT</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">DURATION</p>
                      <p className="font-semibold">{stream.duration} mins</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">HOST</p>
                      <p className="font-semibold">{stream.host}</p>
                    </div>
                  </div>

                  {stream.viewers && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center gap-2 text-lg font-bold">
                        <Eye className="h-5 w-5 text-red-500" />
                        {stream.viewers.toLocaleString()} people watching
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isLive && (
                    <Link href="/live">
                      <Button className="flex-1 gap-2" size="lg">
                        Watch Live
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="flex-1 gap-2" size="lg">
                    <Bell className="h-5 w-5" />
                    {isLive ? "Follow" : "Remind Me"}
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Products */}
            {streamProducts.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Featured Products</h3>
                  <div className="space-y-3">
                    {streamProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.id}`}>
                        <a className="flex gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded object-cover group-hover:shadow-md transition"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm group-hover:text-primary transition line-clamp-2">
                              {product.name}
                            </p>
                            <p className="text-primary font-bold">₱{product.price.toFixed(2)}</p>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stream Info Card */}
            <Card className="bg-secondary/10">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">About This Stream</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">✓ Live product demonstrations</p>
                  <p className="text-muted-foreground">✓ Exclusive stream-only discounts</p>
                  <p className="text-muted-foreground">✓ Interactive Q&A with host</p>
                  <p className="text-muted-foreground">✓ Limited time offers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

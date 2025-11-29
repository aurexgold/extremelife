import LiveStreamPlayer from "@/components/LiveStreamPlayer";
import LiveChat from "@/components/LiveChat";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Live() {
  // Get featured products for the live stream
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <Badge variant="destructive" className="animate-pulse">LIVE NOW</Badge>
            <span className="text-sm text-muted-foreground">Started 15 mins ago</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif">Wellness Wednesday: Benefits of Essential Oils</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Stream Area - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <LiveStreamPlayer />
          
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold text-xl mb-4">About this Session</h3>
            <p className="text-muted-foreground">
                Join our expert herbalist Sarah as she discusses the therapeutic benefits of our organic essential oils. 
                Learn how to use Lavender for sleep, Peppermint for focus, and Eucalyptus for respiratory health.
                Exclusive discounts available during the stream!
            </p>
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
            <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">3 items</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}

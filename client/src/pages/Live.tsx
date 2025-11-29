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
            <span className="text-sm text-muted-foreground">Started 15 mins ago • 847 watching</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif">Wellness Wednesday: Benefits ng Essential Oils</h1>
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
    </div>
  );
}

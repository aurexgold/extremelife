import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { Leaf, ShieldCheck, Truck, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      
      {/* Features Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-bold">100% Organic</h3>
              <p className="text-sm text-primary-foreground/70">Sourced from certified farms</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Lab Tested</h3>
              <p className="text-sm text-primary-foreground/70">Purity guaranteed</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Fast Shipping</h3>
              <p className="text-sm text-primary-foreground/70">Free over $50</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Satisfaction</h3>
              <p className="text-sm text-primary-foreground/70">30-day money back</p>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid />
      
      {/* Newsletter / Footer Promo */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">Join the Extreme Life Community</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Subscribe for exclusive offers, wellness tips, and notifications about our next live selling event.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button className="rounded-full bg-primary text-primary-foreground px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
                    Subscribe
                </button>
            </form>
        </div>
      </section>
    </div>
  );
}

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import { Leaf, ShieldCheck, Truck, Award, MapPin, Phone } from "lucide-react";
import { companyInfo, shippingOptions, paymentMethods } from "@/lib/data";

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
              <p className="text-sm text-primary-foreground/70">Certified & Local</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Lab Tested</h3>
              <p className="text-sm text-primary-foreground/70">Quality Assured</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold">Fast Shipping</h3>
              <p className="text-sm text-primary-foreground/70">2-3 Days Nationwide</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold">100% Satisfaction</h3>
              <p className="text-sm text-primary-foreground/70">Money Back Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div>
              <FilterPanel />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Local Platforms Section */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold font-serif mb-4 text-center">Available sa Popular Platforms</h2>
          <p className="text-center text-muted-foreground mb-12">Shop with your preferred local e-commerce platform</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 text-center hover:shadow-lg transition">
              <div className="text-5xl mb-3">🛒</div>
              <h3 className="font-bold text-lg text-orange-900 mb-2">Shopee</h3>
              <p className="text-sm text-orange-800 mb-4">Flash sales every week! Follow our store for special deals.</p>
              <button className="text-orange-700 font-bold hover:underline">Visit Store →</button>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center hover:shadow-lg transition">
              <div className="text-5xl mb-3">🛍️</div>
              <h3 className="font-bold text-lg text-blue-900 mb-2">Lazada</h3>
              <p className="text-sm text-blue-800 mb-4">Exclusive Lazada deals and free shipping on selected items.</p>
              <button className="text-blue-700 font-bold hover:underline">Visit Store →</button>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center hover:shadow-lg transition">
              <div className="text-5xl mb-3">🏪</div>
              <h3 className="font-bold text-lg text-purple-900 mb-2">Direct Ordering</h3>
              <p className="text-sm text-purple-800 mb-4">Message us on Facebook for wholesale and bulk orders.</p>
              <button className="text-purple-700 font-bold hover:underline">Contact Us →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Payment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Shipping Options */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" />
                Shipping Options
              </h2>
              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <div key={option.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-foreground">{option.name}</h3>
                        <p className="text-sm text-muted-foreground">{option.region}</p>
                        <p className="text-xs text-muted-foreground mt-1">⏱️ {option.time}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">₱{option.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Free shipping on orders above ₱2,500</p>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                <span>💳</span>
                Payment Methods
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-border rounded-lg p-4 flex items-center gap-3 hover:bg-muted/30 transition">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-foreground">{method.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm font-semibold text-foreground mb-2">💚 Philippine Support</p>
                <p className="text-xs text-muted-foreground">All major local payment methods accepted. No hidden charges or transaction fees on GCash & PayMaya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Footer Promo */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">Join the Extreme Life Community</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Subscribe para sa exclusive deals, wellness tips, at updates tungkol sa live selling events.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground px-4 py-2 text-sm ring-offset-background placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                />
                <button className="rounded-full bg-primary-foreground text-primary px-6 py-2 font-medium hover:bg-primary-foreground/90 transition-colors">
                    Subscribe
                </button>
            </form>
        </div>
      </section>
    </div>
  );
}

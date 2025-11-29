import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/herbal_products_hero_background.png";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-12 md:py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 w-fit mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Live Selling Now Active
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl xl:text-6xl mb-6">
              Nature's Best Kept <span className="text-primary italic">Secrets</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover our premium collection of organic herbal products, ethically sourced and crafted for your holistic wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 text-base h-12">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/live">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12 gap-2 border-primary/20 hover:bg-primary/5">
                  <PlayCircle className="h-5 w-5 text-accent" />
                  Watch Live
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative lg:ml-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10">
              <img
                src={heroBg}
                alt="Organic herbal products"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"></div>
            <div className="absolute -top-6 -right-6 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

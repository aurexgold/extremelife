import { Link } from "wouter";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Shopping
            </a>
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif text-foreground flex items-center gap-3">
                <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">{wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved</p>
            </div>
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-destructive border-destructive hover:bg-destructive/5"
              >
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <Card className="border-border/60">
            <CardContent className="p-12 text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-16 w-16 text-muted-foreground/30" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-6">Save your favorite products to view them later</p>
              <Link href="/">
                <Button className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Wishlist Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Actions */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Ready to Order?</h3>
                    <p className="text-primary-foreground/80">Add items from your wishlist to cart and checkout</p>
                  </div>
                  <Link href="/">
                    <Button className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      <ShoppingBag className="h-4 w-4" />
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Trending Products */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold font-serif mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => !wishlist.includes(p.id))
                .slice(0, 3)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

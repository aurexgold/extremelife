import { useRoute, Link } from "wouter";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import ProductRating from "@/components/ProductRating";
import WishlistButton from "@/components/WishlistButton";
import { ArrowLeft, ShoppingCart, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [isAdded, setIsAdded] = useState(false);
  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? products.find((p) => p.id === productId) : null;

  if (!match || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </a>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold font-serif text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="mb-6">
              <ProductRating productId={product.id} showCount={true} />
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">
                  ₱{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₱{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 font-semibold mt-2">
                  Save ₱{(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Platforms */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {product.shopee && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Available on Shopee
                </span>
              )}
              {product.lazada && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Available on Lazada
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 rounded-full gap-2 h-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAdded ? "Added!" : "Add to Cart"}
              </Button>
              <WishlistButton productId={product.id} productName={product.name} variant="outline" size="lg" />
              <Button variant="outline" size="lg" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Shipping Info */}
            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Free shipping on orders above ₱2,500</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>2-3 days nationwide delivery</span>
                  </div>
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews & Description Tabs */}
        <Tabs defaultValue="reviews" className="mb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="description">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-8 mt-8">
            <ReviewsList productId={product.id} />
            <ReviewForm productId={product.id} />
          </TabsContent>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4">About This Product</h3>
                <p className="text-foreground leading-relaxed mb-6">{product.description}</p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-bold mb-3">Why Choose This Product?</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 100% Organic & Lab Tested</li>
                    <li>✓ Ethically Sourced from Local Farmers</li>
                    <li>✓ No Artificial Additives or Preservatives</li>
                    <li>✓ Trusted by 1000+ Happy Customers</li>
                    <li>✓ Satisfaction Guaranteed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

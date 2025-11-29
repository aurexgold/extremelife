import { useRoute, Link, useLocation } from "wouter";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import ProductRating from "@/components/ProductRating";
import WishlistButton from "@/components/WishlistButton";
import Breadcrumb from "@/components/Breadcrumb";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingCart, Share2, Check, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? products.find((p) => p.id === productId) : null;

  // Track recently viewed
  useEffect(() => {
    if (product) {
      const viewed = localStorage.getItem("recentlyViewed");
      const ids = viewed ? JSON.parse(viewed) : [];
      const filtered = ids.filter((id: number) => id !== product.id);
      localStorage.setItem("recentlyViewed", JSON.stringify([product.id, ...filtered]));
    }
  }, [product?.id]);

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
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setIsAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: "/shop" }
          ]}
          current={product.name}
        />

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

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className={`mb-8 px-4 py-3 rounded-lg flex items-center gap-2 ${
                product.stock === 0
                  ? "bg-red-50 border border-red-200"
                  : product.stock < 10
                    ? "bg-orange-50 border border-orange-200"
                    : "bg-green-50 border border-green-200"
              }`}>
                <AlertCircle className={`h-5 w-5 ${
                  product.stock === 0
                    ? "text-red-600"
                    : product.stock < 10
                      ? "text-orange-600"
                      : "text-green-600"
                }`} />
                <span className={`font-semibold ${
                  product.stock === 0
                    ? "text-red-800"
                    : product.stock < 10
                      ? "text-orange-800"
                      : "text-green-800"
                }`}>
                  {product.stock === 0
                    ? "Out of Stock"
                    : product.stock < 10
                      ? `Only ${product.stock} items left in stock`
                      : "In Stock"}
                </span>
              </div>
            )}

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
                disabled={product.stock === 0}
              >
                {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                {product.stock === 0 ? "Out of Stock" : isAdded ? "Added!" : "Add to Cart"}
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

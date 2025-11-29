import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/shop">
            <a className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </a>
          </Link>

          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Link href="/shop">
              <Button size="lg" className="rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.13; // 13% VAT Philippines

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        <Link href="/shop">
          <a className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </a>
        </Link>

        <h1 className="text-4xl font-bold font-serif text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.productId}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-2">{item.name}</h3>
                        <p className="text-primary font-bold mb-4">₱{item.price.toLocaleString()}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-input rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                            <p className="text-lg font-bold">
                              ₱{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                <div className="space-y-2 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (13% VAT)</span>
                    <span>₱{Math.round(tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span className="text-primary">₱{(subtotal + Math.round(tax)).toLocaleString()}</span>
                </div>

                {user ? (
                  <Link href="/checkout">
                    <Button className="w-full rounded-full h-12 text-base" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setLocation("/login")}
                    className="w-full rounded-full h-12 text-base"
                    size="lg"
                  >
                    Sign In to Checkout
                  </Button>
                )}

                <Link href="/shop">
                  <Button variant="outline" className="w-full mt-2 rounded-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

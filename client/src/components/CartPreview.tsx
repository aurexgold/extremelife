import { useCart } from "@/context/CartContext";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

export default function CartPreview() {
  const { cart, getCartCount, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const count = getCartCount();

  if (count === 0 && !isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Floating Cart Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg gap-2 h-14 px-6"
          data-testid="button-floating-cart"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{count} items</span>
        </Button>
      )}

      {/* Cart Preview Panel */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-80 bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-bold">Your Cart ({count})</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 p-1 rounded"
              data-testid="button-close-cart-preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Items */}
          <div className="max-h-64 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-4">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="flex gap-3 pb-3 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity}x ₱{item.price.toLocaleString("en-PH", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded text-xs"
                    data-testid={`button-remove-from-preview-${item.productId}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="bg-muted/50 p-4 border-t space-y-3">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span className="text-primary">₱{subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
              </div>
              <Button
                className="w-full rounded-full"
                onClick={() => {
                  window.location.href = "/cart";
                  setIsOpen(false);
                }}
                data-testid="button-go-to-cart-from-preview"
              >
                View Full Cart
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

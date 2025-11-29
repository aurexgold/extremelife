import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { AlertCircle, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AbandonedCartBanner() {
  const { cart, getCartTotal } = useCart();
  const [showBanner, setShowBanner] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (cart.length === 0) {
      setShowBanner(false);
      return;
    }

    const lastActivityTime = localStorage.getItem("lastCartActivity");
    const now = Date.now();

    if (lastActivityTime) {
      const timeSinceActivity = Math.floor((now - parseInt(lastActivityTime)) / 1000);
      const minutesLeft = Math.max(0, 30 * 60 - timeSinceActivity);

      if (minutesLeft > 0 && minutesLeft < 30 * 60) {
        setTimeLeft(minutesLeft);
        setShowBanner(true);
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowBanner(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cart]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!showBanner || cart.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-lg p-4 border border-red-600">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3 flex-1">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Your cart will expire soon!</p>
              <p className="text-xs mt-1 opacity-90">
                Complete checkout now to secure your items
              </p>
              <div className="mt-2 text-xs font-mono bg-black/20 inline-block px-2 py-1 rounded">
                Expires in: {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBanner(false)}
            className="text-white hover:bg-white/20 h-auto p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            className="flex-1 bg-white text-red-600 hover:bg-white/90 text-xs h-8"
            onClick={() => window.location.href = "/checkout"}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Checkout Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-white border-white hover:bg-white/20 text-xs h-8"
            onClick={() => setShowBanner(false)}
          >
            Continue Shopping
          </Button>
        </div>

        <p className="text-xs mt-2 opacity-75">
          💰 Complete your purchase to get your items + loyalty rewards!
        </p>
      </div>
    </div>
  );
}

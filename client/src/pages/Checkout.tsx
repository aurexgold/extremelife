import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { validateCheckoutForm, getFieldError, ValidationError } from "@/lib/validation";
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS, TAX_RATE, FREE_SHIPPING_THRESHOLD, LOYALTY_DISCOUNTS } from "@/lib/constants";

export default function Checkout() {
  const { cart, getCartTotal, placeOrder } = useCart();
  const { user } = useAuth();
  const { getLoyaltyDiscount } = useUser();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"info" | "shipping" | "payment" | "confirmation">("info");
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    barangay: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [selectedShipping, setSelectedShipping] = useState<"jnt" | "lbc" | "2go" | "lalamove">("jnt");
  const [selectedPayment, setSelectedPayment] = useState<"gcash" | "paymaya" | "cod">("gcash");
  const [order, setOrder] = useState<any>(null);

  const subtotal = getCartTotal();
  const loyaltyDiscount = getLoyaltyDiscount();
  const discountAmount = Math.round(subtotal * loyaltyDiscount);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const tax = Math.round(subtotalAfterDiscount * TAX_RATE);
  
  const shippingOption = SHIPPING_OPTIONS.find(s => s.id === selectedShipping);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (shippingOption?.fee || 75);
  const total = subtotalAfterDiscount + tax + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    setValidationErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleNext = () => {
    if (step === "info") {
      const errors = validateCheckoutForm(formData);
      if (errors.length > 0) {
        setValidationErrors(errors);
        toast.error(`Please fix ${errors.length} validation error(s)`);
        return;
      }
    }
    setStep(step === "info" ? "shipping" : step === "shipping" ? "payment" : "confirmation");
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const shippingName = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.name || "J&T Express";
    const paymentName = PAYMENT_OPTIONS.find((p) => p.id === selectedPayment)?.name || "GCash";

    const newOrder = placeOrder({
      items: cart,
      subtotal,
      shipping: shippingFee,
      tax,
      total,
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: `${formData.address}, ${formData.barangay}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
      shippingMethod: shippingName,
      paymentMethod: paymentName,
      status: "completed",
    });

    // Apply loyalty discount to order
    const orderWithDiscount = {
      ...newOrder,
      loyaltyDiscount: discountAmount,
      loyaltyTier: user?.loyaltyTier || "bronze",
    };

    setOrder(orderWithDiscount);
    setIsProcessing(false);
    setStep("confirmation");
  };

  useEffect(() => {
    if (!cart.length && !order) {
      const timer = setTimeout(() => setLocation("/shop"), 2000);
      return () => clearTimeout(timer);
    }
  }, [cart.length, order, setLocation]);

  if (!cart.length && !order) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-muted-foreground">Your cart is empty. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (step === "confirmation" && order) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">Thank you for your purchase.</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-bold text-lg">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-bold text-lg">{new Date(order.date).toLocaleDateString("en-PH")}</p>
                </div>
              </div>

              <h3 className="font-bold mb-3">Order Details</h3>
              <div className="space-y-2 mb-6 pb-6 border-b">
                {order.items.map((item: any) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₱{order.subtotal.toLocaleString()}</span>
                </div>
                {order.loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Loyalty Discount ({order.loyaltyTier})</span>
                    <span>-₱{order.loyaltyDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax (13%)</span>
                  <span>₱{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping ({order.shippingMethod})</span>
                  <span>{order.shipping === 0 ? "Free" : `₱${order.shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span className="text-primary">₱{order.total.toLocaleString()}</span>
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg mb-6">
                <h4 className="font-bold mb-2">Shipping To:</h4>
                <p className="text-sm text-muted-foreground">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg mb-6">
                <h4 className="font-bold mb-2">Payment Method:</h4>
                <p className="text-sm">{order.paymentMethod}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                <p className="text-sm text-green-800">
                  ✓ Confirmation email sent to <strong>{order.customerEmail}</strong>
                </p>
              </div>

              <Button
                onClick={() => setLocation("/")}
                className="w-full rounded-full h-12"
                size="lg"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <button
          onClick={() => setLocation("/cart")}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold font-serif text-foreground mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex gap-2 mb-8">
          {["info", "shipping", "payment"].map((s, idx) => {
            const steps = ["info", "shipping", "payment"];
            const isActive = step === s;
            const isCompleted = steps.indexOf(s) < steps.indexOf(step);
            return (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  isActive ? "bg-primary" : isCompleted ? "bg-green-500" : "bg-muted"
                }`}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>Enter your details for delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Juan Dela Cruz"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        getFieldError("name", validationErrors)
                          ? "border-red-500 focus:ring-red-500"
                          : "border-input focus:ring-primary"
                      }`}
                    />
                    {getFieldError("name", validationErrors) && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("name", validationErrors)}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="juan@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        getFieldError("email", validationErrors)
                          ? "border-red-500 focus:ring-red-500"
                          : "border-input focus:ring-primary"
                      }`}
                    />
                    {getFieldError("email", validationErrors) && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("email", validationErrors)}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold mb-1">Phone Number * (10 digits)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="09123456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        getFieldError("phone", validationErrors)
                          ? "border-red-500 focus:ring-red-500"
                          : "border-input focus:ring-primary"
                      }`}
                    />
                    {getFieldError("phone", validationErrors) && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getFieldError("phone", validationErrors)}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-bold mb-4">Shipping Address</h3>

                    {/* Street Address */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-1">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="123 Main St"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          getFieldError("address", validationErrors)
                            ? "border-red-500 focus:ring-red-500"
                            : "border-input focus:ring-primary"
                        }`}
                      />
                      {getFieldError("address", validationErrors) && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {getFieldError("address", validationErrors)}
                        </p>
                      )}
                    </div>

                    {/* Barangay */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-1">Barangay</label>
                      <input
                        type="text"
                        name="barangay"
                        placeholder="Barangay name"
                        value={formData.barangay}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* City & Province */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-bold mb-1">City *</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Manila"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            getFieldError("city", validationErrors)
                              ? "border-red-500 focus:ring-red-500"
                              : "border-input focus:ring-primary"
                          }`}
                        />
                        {getFieldError("city", validationErrors) && (
                          <p className="text-xs text-red-600 mt-1">
                            {getFieldError("city", validationErrors)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1">Province</label>
                        <input
                          type="text"
                          name="province"
                          placeholder="NCR"
                          value={formData.province}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="block text-sm font-bold mb-1">Postal Code (4 digits)</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="1000"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          getFieldError("postalCode", validationErrors)
                            ? "border-red-500 focus:ring-red-500"
                            : "border-input focus:ring-primary"
                        }`}
                      />
                      {getFieldError("postalCode", validationErrors) && (
                        <p className="text-xs text-red-600 mt-1">
                          {getFieldError("postalCode", validationErrors)}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button onClick={handleNext} className="w-full rounded-full h-12 mt-6" size="lg">
                    Continue to Shipping
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                  <CardDescription>Choose your preferred delivery option</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {SHIPPING_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id as any)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        selectedShipping === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold mb-1">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.days}</p>
                        </div>
                        <span className="font-bold">{subtotal >= FREE_SHIPPING_THRESHOLD && option.id !== "lalamove" ? "Free" : `₱${option.fee}`}</span>
                      </div>
                    </div>
                  ))}

                  {subtotal >= FREE_SHIPPING_THRESHOLD && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        ✓ Free shipping unlocked! Orders over ₱{FREE_SHIPPING_THRESHOLD.toLocaleString()} qualify for free standard shipping.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-6">
                    <Button onClick={() => setStep("info")} variant="outline" className="flex-1 rounded-full">
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1 rounded-full h-12" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {PAYMENT_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedPayment(option.id as any)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition flex items-center gap-4 ${
                        selectedPayment === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl">{option.logo}</div>
                      <div className="flex-1">
                        <h4 className="font-bold">{option.name}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t bg-secondary/5 p-4 rounded-lg">
                    <p className="text-sm">✓ Your payment information is secure and encrypted</p>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button onClick={() => setStep("shipping")} variant="outline" className="flex-1 rounded-full">
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 rounded-full h-12"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>

                  {loyaltyDiscount > 0 && user && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Loyalty Discount ({user.loyaltyTier})</span>
                      <span>-₱{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (13%)</span>
                    <span>₱{tax.toLocaleString()}</span>
                  </div>

                  {step !== "info" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingFee === 0 ? "Free" : `₱${shippingFee}`}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span className="text-primary">₱{total.toLocaleString()}</span>
                </div>

                {loyaltyDiscount > 0 && user && (
                  <Badge className="w-full justify-center py-2 mb-4 bg-green-100 text-green-800 border-0">
                    {user.loyaltyTier.toUpperCase()} Member: {Math.round(loyaltyDiscount * 100)}% off
                  </Badge>
                )}

                {step === "payment" && (
                  <Badge className="w-full text-center justify-center py-2 bg-primary text-primary-foreground border-0">
                    Ready to place order
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

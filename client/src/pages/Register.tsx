import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validateField, ValidationError, getFieldError } from "@/lib/validation";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register } = useAuth();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationError[] = [];

    // Validate fields
    const nameError = validateField("name", formData.name);
    if (nameError) newErrors.push(nameError);

    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.push(emailError);

    const phoneError = validateField("phone", formData.phone);
    if (phoneError) newErrors.push(phoneError);

    if (!formData.password || formData.password.length < 6) {
      newErrors.push({ field: "password", message: "Password must be at least 6 characters" });
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push({ field: "confirmPassword", message: "Passwords do not match" });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = register(
      formData.email,
      formData.password,
      formData.name,
      formData.phone
    );

    if (success) {
      setLocation("/");
    } else {
      setErrors([{ field: "email", message: "This email is already registered" }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Create Account</CardTitle>
            <CardDescription>Join Extreme Life & start earning loyalty points</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Juan Dela Cruz"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldError("name", errors)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  }`}
                />
                {getFieldError("name", errors) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("name", errors)}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="juan@email.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldError("email", errors)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  }`}
                />
                {getFieldError("email", errors) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("email", errors)}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold mb-1">Phone Number * (10 digits)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="09123456789"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldError("phone", errors)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  }`}
                />
                {getFieldError("phone", errors) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("phone", errors)}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold mb-1">Password * (min 6 characters)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldError("password", errors)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  }`}
                />
                {getFieldError("password", errors) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("password", errors)}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    getFieldError("confirmPassword", errors)
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  }`}
                />
                {getFieldError("confirmPassword", errors) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError("confirmPassword", errors)}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full h-12"
                size="lg"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
              <Button
                variant="outline"
                onClick={() => setLocation("/login")}
                className="w-full rounded-full"
              >
                Sign In
              </Button>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-900">
                <strong>Benefits of creating an account:</strong><br />
                ✓ Earn loyalty points on every purchase<br />
                ✓ Track order history<br />
                ✓ Save shipping addresses<br />
                ✓ Exclusive member discounts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

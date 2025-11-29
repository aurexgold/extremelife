import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
            <Button onClick={() => setLocation("/login")} className="rounded-full">
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">My Account</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <p className="text-lg font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                    <p className="text-lg font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Phone</label>
                    <p className="text-lg font-semibold">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Member Since</label>
                    <p className="text-lg font-semibold">
                      {new Date(user.createdAt).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loyalty Card */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 text-amber-900">Loyalty Status</h3>
                <Badge className="w-full justify-center py-2 mb-4 bg-amber-200 text-amber-900 border-0 text-sm font-bold">
                  {user.loyaltyTier.toUpperCase()} MEMBER
                </Badge>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-900 mb-1">{user.loyaltyPoints}</p>
                  <p className="text-xs text-amber-800">Loyalty Points</p>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-amber-800 space-y-2">
                  <div className="flex justify-between">
                    <span>Bronze (2%)</span>
                    <span>0 pts</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Silver (5%)</span>
                    <span>500 pts</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Gold (10%)</span>
                    <span>1000 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platinum (15%)</span>
                    <span>2500 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-bold text-sm mb-2">Current Benefits</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>✓ {user.loyaltyTier === "bronze" ? "2%" : user.loyaltyTier === "silver" ? "5%" : user.loyaltyTier === "gold" ? "10%" : "15%"} discount</li>
                  <li>✓ Track order history</li>
                  <li>✓ Save addresses</li>
                  <li>✓ Exclusive deals</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

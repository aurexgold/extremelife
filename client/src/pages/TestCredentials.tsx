import { Copy, Check, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestCredentials() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const testUsers = [
    {
      id: "admin",
      role: "Admin",
      name: "Admin User",
      email: "admin@extreme.com",
      password: "extreme2024",
      link: "/admin/login",
      linkText: "Go to Admin Login",
      description: "Full access to admin dashboard, analytics, and management",
      features: ["Dashboard", "Orders", "Products", "Analytics", "Streamer Management", "User Groups"],
      color: "bg-red-50 border-red-200"
    },
    {
      id: "streamer",
      role: "Live Seller / Streamer",
      name: "Sarah Wellness Expert",
      email: "sarah.streamer@email.com",
      password: "demo2024",
      link: "/login",
      linkText: "Go to Login",
      description: "Live streaming seller with 10% commission on sales",
      features: ["Live Streams", "Sales Dashboard", "Commission Tracking", "Viewer Analytics"],
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: "customer",
      role: "Customer",
      name: "Maria Santos",
      email: "maria@email.com",
      password: "demo2024",
      link: "/login",
      linkText: "Go to Login",
      description: "Regular customer with loyalty points and referral benefits",
      features: ["Shopping", "Loyalty Points", "Referral Program", "Order Tracking", "Wishlist"],
      color: "bg-blue-50 border-blue-200"
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif mb-2">Test Credentials</h1>
        <p className="text-muted-foreground text-lg">Use these accounts to explore different features of Extreme Life Herbal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testUsers.map((user) => (
          <Card key={user.id} className={`${user.color} border-l-4`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="text-xl">{user.role}</CardTitle>
                <Badge variant={user.role === "Admin" ? "destructive" : user.role.includes("Live") ? "secondary" : "default"}>
                  {user.role.split("/")[0]}
                </Badge>
              </div>
              <CardDescription className="text-sm">{user.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email</label>
                <div className="flex items-center gap-2 bg-white p-2 rounded border">
                  <code className="text-sm font-mono flex-1 break-all">{user.email}</code>
                  <button
                    onClick={() => copyToClipboard(user.email, `email-${user.id}`)}
                    className="p-1 hover:bg-muted rounded transition"
                    data-testid={`button-copy-email-${user.id}`}
                  >
                    {copiedId === `email-${user.id}` ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Password</label>
                <div className="flex items-center gap-2 bg-white p-2 rounded border">
                  <code className="text-sm font-mono flex-1 tracking-wider">{user.password}</code>
                  <button
                    onClick={() => copyToClipboard(user.password, `pass-${user.id}`)}
                    className="p-1 hover:bg-muted rounded transition"
                    data-testid={`button-copy-password-${user.id}`}
                  >
                    {copiedId === `pass-${user.id}` ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Access to</label>
                <div className="flex flex-wrap gap-1">
                  {user.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Login Link */}
              <Link href={user.link}>
                <Button className="w-full gap-2" data-testid={`button-login-${user.id}`}>
                  <LogIn className="h-4 w-4" />
                  {user.linkText}
                </Button>
              </Link>

              {/* Direct Links */}
              <div className="text-xs space-y-1 pt-2 border-t">
                <p className="text-muted-foreground font-semibold">Quick Links:</p>
                {user.id === "admin" && (
                  <div className="space-y-1">
                    <Link href="/admin/dashboard">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-admin-dashboard">
                        → Admin Dashboard
                      </button>
                    </Link>
                    <Link href="/admin/reviews">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-admin-reviews">
                        → Review Moderation
                      </button>
                    </Link>
                  </div>
                )}
                {user.id === "streamer" && (
                  <div className="space-y-1">
                    <Link href="/streamer-dashboard">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-streamer-dashboard">
                        → Streamer Dashboard
                      </button>
                    </Link>
                    <Link href="/live">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-live-selling">
                        → Live Selling Page
                      </button>
                    </Link>
                  </div>
                )}
                {user.id === "customer" && (
                  <div className="space-y-1">
                    <Link href="/profile">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-customer-profile">
                        → My Profile
                      </button>
                    </Link>
                    <Link href="/loyalty">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-loyalty-program">
                        → Loyalty Points
                      </button>
                    </Link>
                    <Link href="/orders">
                      <button className="text-primary hover:underline text-xs block" data-testid="link-order-history">
                        → Order History
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="font-bold text-lg text-blue-900 mb-3">📝 Testing Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800">
          <div>
            <h3 className="font-semibold mb-2">Admin Features</h3>
            <ul className="space-y-1 text-xs">
              <li>• View sales analytics</li>
              <li>• Manage products & inventory</li>
              <li>• Monitor streamers & commission</li>
              <li>• Review order tracking</li>
              <li>• Moderate customer reviews</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Streamer Features</h3>
            <ul className="space-y-1 text-xs">
              <li>• View live stream metrics</li>
              <li>• Check commission earnings</li>
              <li>• Access streamer dashboard</li>
              <li>• Track viewer engagement</li>
              <li>• Manage stream schedule</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Customer Features</h3>
            <ul className="space-y-1 text-xs">
              <li>• Browse & purchase products</li>
              <li>• Earn loyalty points</li>
              <li>• Use referral program</li>
              <li>• Track orders in real-time</li>
              <li>• Leave product reviews</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Website Links Section */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="font-bold text-lg text-green-900 mb-4">🔗 All Website Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Public Pages</h3>
            <ul className="space-y-1">
              <li><Link href="/"><button className="text-primary hover:underline text-xs" data-testid="link-home">→ Home</button></Link></li>
              <li><Link href="/shop"><button className="text-primary hover:underline text-xs" data-testid="link-shop">→ Shop</button></Link></li>
              <li><Link href="/live"><button className="text-primary hover:underline text-xs" data-testid="link-live">→ Live Selling</button></Link></li>
              <li><Link href="/loyalty"><button className="text-primary hover:underline text-xs" data-testid="link-loyalty">→ Loyalty Program</button></Link></li>
              <li><Link href="/referral"><button className="text-primary hover:underline text-xs" data-testid="link-referral">→ Referral Program</button></Link></li>
              <li><Link href="/faq"><button className="text-primary hover:underline text-xs" data-testid="link-faq">→ FAQ</button></Link></li>
              <li><Link href="/contact"><button className="text-primary hover:underline text-xs" data-testid="link-contact">→ Contact Us</button></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Customer Pages (After Login)</h3>
            <ul className="space-y-1">
              <li><Link href="/profile"><button className="text-primary hover:underline text-xs" data-testid="link-profile">→ My Profile</button></Link></li>
              <li><Link href="/orders"><button className="text-primary hover:underline text-xs" data-testid="link-orders">→ Order History</button></Link></li>
              <li><Link href="/cart"><button className="text-primary hover:underline text-xs" data-testid="link-cart">→ Shopping Cart</button></Link></li>
              <li><Link href="/checkout"><button className="text-primary hover:underline text-xs" data-testid="link-checkout">→ Checkout</button></Link></li>
              <li><Link href="/tracking"><button className="text-primary hover:underline text-xs" data-testid="link-tracking">→ Order Tracking</button></Link></li>
              <li><Link href="/wishlist"><button className="text-primary hover:underline text-xs" data-testid="link-wishlist">→ Wishlist</button></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Admin Pages</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
            <li><Link href="/admin/login"><button className="text-primary hover:underline" data-testid="link-admin-login">→ Admin Login</button></Link></li>
            <li><Link href="/admin/dashboard"><button className="text-primary hover:underline" data-testid="link-admin-dash">→ Dashboard</button></Link></li>
            <li><Link href="/admin/products"><button className="text-primary hover:underline" data-testid="link-admin-products">→ Products</button></Link></li>
            <li><Link href="/admin/orders"><button className="text-primary hover:underline" data-testid="link-admin-orders">→ Orders</button></Link></li>
            <li><Link href="/admin/customers"><button className="text-primary hover:underline" data-testid="link-admin-customers">→ Customers</button></Link></li>
            <li><Link href="/admin/reviews"><button className="text-primary hover:underline" data-testid="link-admin-reviews2">→ Reviews</button></Link></li>
            <li><Link href="/admin/live"><button className="text-primary hover:underline" data-testid="link-admin-live">→ Live Streams</button></Link></li>
            <li><Link href="/admin/user-groups"><button className="text-primary hover:underline" data-testid="link-admin-groups">→ User Groups</button></Link></li>
            <li><Link href="/admin/abandoned-carts"><button className="text-primary hover:underline" data-testid="link-admin-carts">→ Abandoned Carts</button></Link></li>
            <li><Link href="/admin/order-tracking"><button className="text-primary hover:underline" data-testid="link-admin-tracking">→ Order Tracking</button></Link></li>
            <li><Link href="/admin/product-bundles"><button className="text-primary hover:underline" data-testid="link-admin-bundles">→ Product Bundles</button></Link></li>
            <li><Link href="/admin/email-notifications"><button className="text-primary hover:underline" data-testid="link-admin-email">→ Email Notifications</button></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

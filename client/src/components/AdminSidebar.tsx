import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Video,
  Settings,
  Users,
  Zap,
  ChevronDown,
  Menu,
  X,
  Leaf,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function AdminSidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: "/admin/dashboard" },
    { icon: <Package className="h-5 w-5" />, label: "Products", href: "/admin/products" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", href: "/admin/orders" },
    { icon: <Users className="h-5 w-5" />, label: "Customers", href: "/admin/customers" },
    { icon: <Video className="h-5 w-5" />, label: "Live Streams", href: "/admin/live" },
    { icon: <Zap className="h-5 w-5" />, label: "Promotions", href: "/admin/promotions" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background shadow"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-primary text-primary-foreground transform transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-primary-foreground/20">
          <Link href="/admin/dashboard">
            <a className="flex items-center gap-2 font-serif text-xl font-bold">
              <Leaf className="h-6 w-6" />
              Extreme Life
            </a>
          </Link>
          <p className="text-sm text-primary-foreground/70 mt-1">Admin Portal</p>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

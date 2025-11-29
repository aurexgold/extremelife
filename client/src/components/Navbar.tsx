import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Leaf, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import NavbarSearch from "./NavbarSearch";
import NavbarMoreMenu from "./NavbarMoreMenu";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  const primaryNavLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Live Selling", href: "/live" },
    { name: "Loyalty Points", href: "/loyalty" },
  ];

  const mobileNavLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Live Selling", href: "/live" },
    { name: "Loyalty Points", href: "/loyalty" },
    { name: "Referral", href: "/referral" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
                  <Leaf className="h-6 w-6 fill-primary/20" />
                  Extreme Life
                </div>
                <div className="flex flex-col gap-4">
                  {mobileNavLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        location === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t space-y-2">
                  {user ? (
                    <>
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full gap-2 rounded-full">
                          <User className="h-4 w-4" />
                          My Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full gap-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                          setLocation("/");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full rounded-full">
                          Create Account
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link 
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary md:text-2xl"
          >
            <Leaf className="h-6 w-6 fill-primary/20" />
            <span className="hidden sm:inline-block">Extreme Life</span>
            <span className="sm:hidden">Extreme Life</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {primaryNavLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <NavbarMoreMenu />
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex">
          <NavbarSearch />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative hover:text-red-500">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative border-primary/20 hover:bg-primary/5 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {getCartCount()}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="outline" size="sm" className="gap-2 rounded-full hidden sm:flex">
                  <User className="h-4 w-4" />
                  {user.name.split(" ")[0]}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  setLocation("/");
                }}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

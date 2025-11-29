import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { WishlistProvider } from "@/context/WishlistContext";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Live from "@/pages/Live";
import Wishlist from "@/pages/Wishlist";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminPromotions from "@/pages/AdminPromotions";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminLiveStream from "@/pages/AdminLiveStream";

function Router() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated && window.location.pathname.startsWith("/admin")) {
    return <Route path="/admin/login" component={AdminLogin} />;
  }

  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      {isAuthenticated && (
        <>
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin/customers" component={AdminCustomers} />
          <Route path="/admin/live" component={AdminLiveStream} />
          <Route path="/admin/promotions" component={AdminPromotions} />
        </>
      )}

      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/live" component={Live} />
      <Route path="/shop" component={Home} />
      <Route path="/wishlist" component={Wishlist} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isAuthenticated } = useAdmin();
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Router />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <AdminProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </AdminProvider>
      </WishlistProvider>
    </QueryClientProvider>
  );
}

export default App;

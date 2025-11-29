import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { LiveStreamProvider } from "@/context/LiveStreamContext";
import { ReferralProvider } from "@/context/ReferralContext";
import { LoyaltyProvider } from "@/context/LoyaltyContext";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { FilterProvider } from "@/context/FilterContext";
import { StreamerProvider } from "@/context/StreamerContext";
import { UserGroupsProvider } from "@/context/UserGroupsContext";
import { AbandonedCartProvider } from "@/context/AbandonedCartContext";
import { OrderTrackingProvider } from "@/context/OrderTrackingContext";
import { EmailNotificationProvider } from "@/context/EmailNotificationContext";
import { ProductBundleProvider } from "@/context/ProductBundleContext";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Live from "@/pages/Live";
import Wishlist from "@/pages/Wishlist";
import ProductDetail from "@/pages/ProductDetail";
import LiveStreamCalendar from "@/pages/LiveStreamCalendar";
import LiveStreamDetail from "@/pages/LiveStreamDetail";
import ReferralProgram from "@/pages/ReferralProgram";
import LoyaltyProgram from "@/pages/LoyaltyProgram";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderHistory from "@/pages/OrderHistory";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import OrderDetail from "@/pages/OrderDetail";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminPromotions from "@/pages/AdminPromotions";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminLiveStream from "@/pages/AdminLiveStream";
import StreamerDashboard from "@/pages/StreamerDashboard";
import AdminUserGroups from "@/pages/AdminUserGroups";
import AdminAbandonedCarts from "@/pages/AdminAbandonedCarts";
import AdminOrderTracking from "@/pages/AdminOrderTracking";
import OrderTracking from "@/pages/OrderTracking";
import AdminEmailNotifications from "@/pages/AdminEmailNotifications";
import AdminProductBundles from "@/pages/AdminProductBundles";
import AdminReviews from "@/pages/AdminReviews";
import CartPreview from "@/components/CartPreview";
import AbandonedCartBanner from "@/components/AbandonedCartBanner";
import EmailNotificationBell from "@/components/EmailNotificationBell";

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
          <Route path="/admin/user-groups" component={AdminUserGroups} />
          <Route path="/admin/abandoned-carts" component={AdminAbandonedCarts} />
          <Route path="/admin/order-tracking" component={AdminOrderTracking} />
          <Route path="/admin/email-notifications" component={AdminEmailNotifications} />
          <Route path="/admin/product-bundles" component={AdminProductBundles} />
          <Route path="/admin/reviews" component={AdminReviews} />
        </>
      )}

      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/live" component={Live} />
      <Route path="/shop" component={Home} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/live-stream/:id" component={LiveStreamDetail} />
      <Route path="/referral" component={ReferralProgram} />
      <Route path="/loyalty" component={LoyaltyProgram} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/cart" component={Cart} />
      <Route path="/tracking" component={OrderTracking} />
      <Route path="/tracking/:id" component={OrderTracking} />

      {/* Protected Routes (Login Required) */}
      <Route path="/profile" component={(props: any) => <ProtectedRoute component={Profile} {...props} />} />
      <Route path="/checkout" component={(props: any) => <ProtectedRoute component={Checkout} {...props} />} />
      <Route path="/orders" component={(props: any) => <ProtectedRoute component={OrderHistory} {...props} />} />
      <Route path="/order/:id" component={(props: any) => <ProtectedRoute component={OrderDetail} {...props} />} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/streamer-dashboard" component={(props: any) => <ProtectedRoute component={StreamerDashboard} {...props} />} />
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
      {!isAdminRoute && <CartPreview />}
      {!isAdminRoute && <AbandonedCartBanner />}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>
          <UserProvider>
          <CartProvider>
            <LoyaltyProvider>
              <ReferralProvider>
                <LiveStreamProvider>
                  <StreamerProvider>
                    <AbandonedCartProvider>
                      <OrderTrackingProvider>
                        <EmailNotificationProvider>
                          <ProductBundleProvider>
                            <UserGroupsProvider>
                        <ReviewsProvider>
                        <WishlistProvider>
                        <AdminProvider>
                          <TooltipProvider>
                            <AppContent />
                          </TooltipProvider>
                        </AdminProvider>
                      </WishlistProvider>
                    </ReviewsProvider>
                    </UserGroupsProvider>
                    </ProductBundleProvider>
                    </EmailNotificationProvider>
                    </OrderTrackingProvider>
                    </AbandonedCartProvider>
                  </StreamerProvider>
                </LiveStreamProvider>
              </ReferralProvider>
            </LoyaltyProvider>
          </CartProvider>
        </UserProvider>
      </FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

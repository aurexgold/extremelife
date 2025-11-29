import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Live from "@/pages/Live";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <Component />;
}

function Router() {
  const { isAuthenticated } = useAdmin();

  return (
    <Switch>
      {/* Admin Routes */}
      {!isAuthenticated && <Route path="/admin/login" component={AdminLogin} />}
      {isAuthenticated && (
        <>
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/*" component={AdminDashboard} />
        </>
      )}

      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/live" component={Live} />
      <Route path="/shop" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Router />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;

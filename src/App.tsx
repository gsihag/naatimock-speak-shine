import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import LanguageSelect from "./pages/LanguageSelect";
import MockTest from "./pages/MockTest";
import Results from "./pages/Results";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./utils/auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/language-select" element={<ProtectedRoute><LanguageSelect /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { SuccessPage } from '@/pages/SuccessPage';
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/products"
          element={
            <AuthGuard>
              <ProductsPage />
            </AuthGuard>
          }
        />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;

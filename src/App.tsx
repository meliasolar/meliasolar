import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { ContactModalProvider } from "@/contexts/ContactModalContext";

// Eagerly load the main page for best LCP
import Index from "./pages/Index";

// Lazy load secondary pages to reduce initial bundle size
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceSection = lazy(() => import("./pages/ServiceSection"));
const SavingsCalculatorPage = lazy(() => import("./pages/SavingsCalculatorPage"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const TeslaSupercharger = lazy(() => import("./pages/TeslaSupercharger"));
const Projects = lazy(() => import("./pages/Projects"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContactModalProvider>
          <TooltipProvider>
            <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/meetmelia" element={<About />} />
                <Route path="/meet-melia" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solar" element={<ServiceSection />} />
                <Route path="/supercharger" element={<TeslaSupercharger />} />
                <Route path="/hvac" element={<ServiceSection />} />
                <Route path="/title24" element={<ServiceSection />} />
                <Route path="/fans" element={<ServiceSection />} />
                <Route path="/savingscalculator" element={<SavingsCalculatorPage />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tesla-supercharger" element={<Navigate to="/supercharger" replace />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/news" element={<Blog />} />
                <Route path="/news/:slug" element={<BlogPost />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin/news" element={<AdminBlog />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ContactModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
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
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SitemapRedirect = lazy(() => import("./pages/SitemapRedirect"));

// Lazy load AuthProvider - only needed for admin/auth pages, keeps supabase out of critical path
const LazyAuthProvider = lazy(() => import("./components/LazyAuthProvider"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ContactModalProvider>
        <TooltipProvider>
          <Toaster />
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
              {/* Auth routes wrapped in lazy AuthProvider */}
              <Route path="/auth" element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <LazyAuthProvider><Auth /></LazyAuthProvider>
                </Suspense>
              } />
              <Route path="/reset-password" element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <LazyAuthProvider><ResetPassword /></LazyAuthProvider>
                </Suspense>
              } />
              <Route path="/admin/news" element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <LazyAuthProvider><AdminBlog /></LazyAuthProvider>
                </Suspense>
              } />
              <Route path="/sitemap.xml" element={<SitemapRedirect />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ContactModalProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

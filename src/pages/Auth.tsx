import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sun, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/admin/news");
    }
  }, [user, navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const emailResult = z.string().email("Please enter a valid email address").safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.errors[0].message });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      } else {
        toast({ title: "Check your email", description: "A password reset link has been sent." });
        setIsForgotPassword(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message === "Invalid login credentials" 
              ? "Invalid email or password. Please try again."
              : error.message,
          });
        } else {
          toast({ title: "Welcome back!" });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          const message = error.message.includes("already registered")
            ? "This email is already registered. Please login instead."
            : error.message;
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description: message,
          });
        } else {
          toast({
            title: "Account created!",
            description: "You can now log in with your credentials.",
          });
          setIsLogin(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Melia King Solar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-md">
          <Card className="border-border shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-solar flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="font-display text-2xl">
                {isForgotPassword ? "Reset Password" : isLogin ? "Admin Login" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {isForgotPassword
                  ? "Enter your email to receive a reset link"
                  : isLogin 
                    ? "Sign in to manage blog posts" 
                    : "Create an account to get started"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  
                  <Button type="submit" variant="solar" className="w-full" disabled={isLoading}>
                    {isLoading ? "Please wait..." : "Send Reset Link"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Back to login
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                    </div>

                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}
                    
                    <Button type="submit" variant="solar" className="w-full" disabled={isLoading}>
                      {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isLogin 
                        ? "Don't have an account? Sign up" 
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Auth;

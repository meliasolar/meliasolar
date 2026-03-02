import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sun, Lock, ArrowRight } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is a recovery flow
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    
    if (type === "recovery") {
      setIsValidSession(true);
    }

    // Also listen for auth state changes (Supabase handles token exchange)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ variant: "destructive", title: "Error", description: "Password must be at least 6 characters." });
      return;
    }

    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "Passwords do not match." });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      } else {
        toast({ title: "Password updated!", description: "You can now sign in with your new password." });
        await supabase.auth.signOut();
        navigate("/auth");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidSession) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20 bg-muted/30">
          <div className="container mx-auto px-6 max-w-md text-center">
            <p className="text-muted-foreground">Invalid or expired reset link. Please request a new one.</p>
            <Button variant="solar" className="mt-4" onClick={() => navigate("/auth")}>
              Back to Login
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Melia King Solar</title>
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
              <CardTitle className="font-display text-2xl">Set New Password</CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" variant="solar" className="w-full" disabled={isLoading}>
                  {isLoading ? "Please wait..." : "Update Password"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ResetPassword;

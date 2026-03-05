import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";

/**
 * Wrapper that lazy-loads the AuthProvider (and its Supabase dependency)
 * so the main bundle doesn't include @supabase/supabase-js on initial load.
 */
const LazyAuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default LazyAuthProvider;

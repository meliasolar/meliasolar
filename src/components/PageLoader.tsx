import { Sun } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-solar flex items-center justify-center animate-pulse">
            <Sun className="w-8 h-8 text-foreground animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
        </div>
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
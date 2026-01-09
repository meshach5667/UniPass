import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-background pt-16">
        {/* Background Gradient Mesh */}
        <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none"></div>
        
        <div className="text-center relative z-10 px-4">
          <div className="w-32 h-32 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
            <span className="text-white font-bold text-6xl">404</span>
          </div>
          
          <h1 className="mb-4 text-5xl md:text-6xl font-bold gradient-hero bg-clip-text text-transparent">
            Page Not Found
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </Link>
            
            <Button 
              variant="glass" 
              size="lg" 
              className="w-full sm:w-auto gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-12 glass-strong rounded-xl p-6 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Need help?</strong> Visit our marketplace or dashboard to explore NFTs on Lisk.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

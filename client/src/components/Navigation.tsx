import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WalletConnect } from "@/components/WalletConnect";
import { Menu, X, Home, Store, Sparkles, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Marketplace", href: "/marketplace", icon: Store },
    { name: "Mint NFT", href: "/mint", icon: Sparkles },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-strong border-b border-border/50 shadow-lg">
      {/* Lisk Network Indicator Bar */}
      <div className="h-1 w-full gradient-hero"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always links to home */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-bounce">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl  bg-clip-text  leading-none">
               Creators Dome
              </span>
              <span className="text-[10px] text-muted-foreground">on Lisk</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth",
                    active
                      ? "bg-primary/10 text-primary shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full glass text-xs font-medium ">
              <span className="text-success">●</span>
              <span className="text-muted-foreground">Lisk </span>
            </div>
            <ThemeToggle />
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="relative"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100 pb-4"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-border/50">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 py-3 px-4 rounded-lg font-medium transition-smooth",
                    active
                      ? "bg-primary/10 text-primary shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg glass text-xs font-medium network-indicator">
                <span className="text-success">●</span>
                {/* <span className="text-muted-foreground">Lisk Mainnet</span> */}
              </div>
              <WalletConnect />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
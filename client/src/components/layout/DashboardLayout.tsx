import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border glass-strong flex items-center justify-between px-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center space-x-2 text-sm network-indicator">
              {/* <span className="text-success">●</span> */}
              <span className="text-muted-foreground hidden sm:inline">Connected to Lisk </span>
              <span className="text-muted-foreground sm:hidden">Lisk</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="hero" size="sm" className="gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">0x7a3f...bd2c</span>
              <span className="sm:hidden">Wallet</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import { Link, useLocation } from "react-router-dom";
import { Home, Image, PlusCircle, DollarSign, BarChart3, Settings, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Overview", icon: Home, path: "/dashboard" },
  { title: "My Artworks", icon: Image, path: "/dashboard/artworks" },
  { title: "Mint New", icon: PlusCircle, path: "/dashboard/mint" },
  { title: "Earnings", icon: DollarSign, path: "/dashboard/earnings" },
  { title: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border glass-strong min-h-screen p-6 flex flex-col">
      {/* Logo with Home Link */}
      <Link to="/" className="mb-8 group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-bounce">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl  bg-clip-text  leading-none">
              Creators Dome
            </span>
            <span className="text-[10px] text-muted-foreground">on Lisk</span>
          </div>
        </div>
      </Link>

      {/* Back to Home Button */}
      <Link to="/" className="mb-6">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-4">
          DASHBOARD
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5",
                isActive ? "animate-float" : "group-hover:scale-110 transition-bounce"
              )} />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - Lisk Network Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="glass rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-muted-foreground">Connected to</span>
          </div>
          <div className="text-sm font-semibold gradient-hero bg-clip-text text-transparent">
            Lisk Mainnet
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

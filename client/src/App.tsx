import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Marketplace from "./pages/Marketplace";
import MintNFT from "./pages/MintNFT";
import NFTDetail from "./pages/NFTDetail";
import DashboardLayout from "./components/layout/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Artworks from "./pages/dashboard/Artworks";
import Mint from "./pages/dashboard/Mint";
import Earnings from "./pages/dashboard/Earnings";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with Navigation */}
          <Route path="/" element={<><Navigation /><Landing /></>} />
          <Route path="/marketplace" element={<><Navigation /><Marketplace /></>} />
          <Route path="/nft/:id" element={<><Navigation /><NFTDetail /></>} />
          <Route path="/mint" element={<><Navigation /><MintNFT /></>} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="artworks" element={<Artworks />} />
            <Route path="mint" element={<Mint />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;

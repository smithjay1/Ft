import "./global.css";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LogoIntro } from "@/components/brand/LogoIntro";
import Index from "./pages/Index";
import About from "./pages/About";
import TradingEdge from "./pages/TradingEdge";
import TradeJournal from "./pages/TradeJournal";
import FtmJourney from "./pages/FtmJourney";
import PropScan from "./pages/PropScan";
import AccountFinder from "./pages/AccountFinder";
import WinRateAnalytics from "./pages/WinRateAnalytics";
import TradingTimeline from "./pages/TradingTimeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LogoIntro />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/trading-edge" element={<TradingEdge />} />
          <Route path="/trade-journal" element={<TradeJournal />} />
          <Route path="/ftm-journey" element={<FtmJourney />} />
          <Route path="/propscan" element={<PropScan />} />
          <Route path="/account-finder" element={<AccountFinder />} />
          <Route path="/win-rate-analytics" element={<WinRateAnalytics />} />
          <Route path="/timeline" element={<TradingTimeline />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

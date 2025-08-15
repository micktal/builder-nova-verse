import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sequence1 from "./pages/Sequence1";
import Sequence2 from "./pages/Sequence2";
import Sequence3 from "./pages/Sequence3";
import Sequence4 from "./pages/Sequence4";
import Sequence5 from "./pages/Sequence5";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-serenity-50 via-white to-calm-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sequence/1" element={<Sequence1 />} />
            <Route path="/sequence/2" element={<Sequence2 />} />
            <Route path="/sequence/3" element={<Sequence3 />} />
            <Route path="/sequence/4" element={<Sequence4 />} />
            <Route path="/sequence/5" element={<Sequence5 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

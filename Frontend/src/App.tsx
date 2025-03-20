import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AvatarProvider } from "./pages/AvatarContext"; 
import Index from "./pages/Index";
import News from "./pages/News";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorsDetail from "./pages/DoctorsDetail";
import Contact from "./pages/Contact";
import DoctorLogin from "./pages/DoctorLogin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Introduce from "./pages/Introduce";
import Booking from "./pages/Booking"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AvatarProvider> 
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news" element={<News />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/introduce" element={<Introduce />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/detail" element={<DoctorsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AvatarProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
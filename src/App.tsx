
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Advisor from "./pages/Advisor";
import Compare from "./pages/Compare";
import Claims from "./pages/Claims";
import AgencyDashboard from "./pages/agency/Dashboard";
import AgencyPolicies from "./pages/agency/Policies";
import AgencyClaims from "./pages/agency/Claims";
import AgencyUsers from "./pages/agency/Users";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAgencies from "./pages/admin/Agencies";
import AdminPolicies from "./pages/admin/Policies";
import AdminUsers from "./pages/admin/Users";
import AdminClaims from "./pages/admin/Claims";
import PolicyDetails from "./pages/PolicyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AgencyLogin from "./pages/agency/Login";
import AgencyRegister from "./pages/agency/Register";
import PrivateRoute from "./components/PrivateRoute";
import AgencyRoute from "./components/AgencyRoute";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/agency/login" element={<AgencyLogin />} />
            <Route path="/agency/register" element={<AgencyRegister />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/compare" element={<PrivateRoute><Compare /></PrivateRoute>} />
            <Route path="/policies/:id" element={<PrivateRoute><PolicyDetails /></PrivateRoute>} />
            <Route path="/claims" element={<PrivateRoute><Claims /></PrivateRoute>} />
            
            {/* Agency Routes */}
            <Route path="/agency/dashboard" element={<AgencyRoute><AgencyDashboard /></AgencyRoute>} />
            <Route path="/agency/policies" element={<AgencyRoute><AgencyPolicies /></AgencyRoute>} />
            <Route path="/agency/claims" element={<AgencyRoute><AgencyClaims /></AgencyRoute>} />
            <Route path="/agency/users" element={<AgencyRoute><AgencyUsers /></AgencyRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/agencies" element={<AdminRoute><AdminAgencies /></AdminRoute>} />
            <Route path="/admin/policies" element={<AdminRoute><AdminPolicies /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/claims" element={<AdminRoute><AdminClaims /></AdminRoute>} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

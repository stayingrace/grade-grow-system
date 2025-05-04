
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Role-specific route component
const RoleRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (user?.role !== allowedRole) {
    return <Navigate to={`/${user?.role}-dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    
    <Route 
      path="/student-dashboard" 
      element={
        <ProtectedRoute>
          <RoleRoute allowedRole="student">
            <StudentDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/teacher-dashboard" 
      element={
        <ProtectedRoute>
          <RoleRoute allowedRole="teacher">
            <TeacherDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/admin-dashboard" 
      element={
        <ProtectedRoute>
          <RoleRoute allowedRole="admin">
            <AdminDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/parent-dashboard" 
      element={
        <ProtectedRoute>
          <RoleRoute allowedRole="parent">
            <ParentDashboard />
          </RoleRoute>
        </ProtectedRoute>
      } 
    />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

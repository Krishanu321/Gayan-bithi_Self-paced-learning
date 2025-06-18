
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import CourseDetail from "./pages/CourseDetail";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ExamPrep from "./pages/ExamPrep";
import InterviewPrep from "./pages/InterviewPrep";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const queryClient = new QueryClient();

// Create auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Protected Route Component
interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => {
  // In a real application, this would check for an auth token in localStorage
  // or validate with a backend service
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = () => {
    console.log("User logged in");
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    console.log("User logged out");
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/courses" element={<ProtectedRoute element={<Courses />} />} />
              <Route path="/courses/new" element={<ProtectedRoute element={<CreateCourse />} />} />
              <Route path="/courses/:id" element={<ProtectedRoute element={<CourseDetail />} />} />
              <Route path="/courses/:courseId/materials" element={<ProtectedRoute element={<Materials />} />} />
              <Route path="/courses/:courseId/materials/:materialId" element={<ProtectedRoute element={<MaterialDetail />} />} />
              <Route path="/materials" element={<ProtectedRoute element={<Materials />} />} />
              <Route path="/exam-prep" element={<ProtectedRoute element={<ExamPrep />} />} />
              <Route path="/interview-prep" element={<ProtectedRoute element={<InterviewPrep />} />} />
              <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;

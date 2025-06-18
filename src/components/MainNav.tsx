
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  Home,
  LayoutDashboard,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/App';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const navItems = [
    { 
      label: 'Home', 
      icon: <Home className="w-4 h-4" />, 
      href: '/',
      requiresAuth: false
    },
    { 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      href: '/dashboard',
      requiresAuth: true
    },
    { 
      label: 'Courses', 
      icon: <BookOpen className="w-4 h-4" />, 
      href: '/courses',
      requiresAuth: true
    },
    { 
      label: 'Exam Prep', 
      icon: <GraduationCap className="w-4 h-4" />, 
      href: '/exam-prep',
      requiresAuth: true
    },
    { 
      label: 'Interview Prep', 
      icon: <MessageSquare className="w-4 h-4" />, 
      href: '/interview-prep',
      requiresAuth: true
    },
    { 
      label: 'Analytics', 
      icon: <BarChart3 className="w-4 h-4" />, 
      href: '/analytics',
      requiresAuth: true
    },
  ];
  
  const handleNavClick = (item: any) => {
    if (item.requiresAuth && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this feature",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
  };
  
  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={location.pathname === item.href ? "default" : "ghost"}
          size="sm"
          className={cn(
            "rounded-md transition-all",
            location.pathname === item.href ? 
            "bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-md" : 
            "hover:bg-gradient-to-r hover:from-brand-blue/10 hover:to-brand-purple/10"
          )}
          asChild
        >
          <Link 
            to={item.href}
            className="flex items-center gap-1"
            onClick={(e) => {
              if (item.requiresAuth && !isAuthenticated) {
                e.preventDefault();
                handleNavClick(item);
              }
            }}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default MainNav;

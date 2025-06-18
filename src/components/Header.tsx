
import React from 'react';
import Logo from './Logo';
import MainNav from './MainNav';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/App';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to access all features",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate("/");
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        
        <div className="hidden md:flex mx-4 flex-1 justify-center">
          <MainNav />
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:flex gap-2 items-center">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col h-full">
                <div className="flex-1 py-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Logo />
                  </div>
                  <div className="mt-6 flex flex-col gap-2">
                    <Link to="/" className="px-4 py-2 hover:bg-muted rounded-md">Home</Link>
                    <Link 
                      to="/dashboard" 
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          handleProtectedAction();
                        }
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/courses" 
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          handleProtectedAction();
                        }
                      }}
                    >
                      Courses
                    </Link>
                    <Link 
                      to="/exam-prep" 
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          handleProtectedAction();
                        }
                      }}
                    >
                      Exam Prep
                    </Link>
                    <Link 
                      to="/interview-prep" 
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          handleProtectedAction();
                        }
                      }}
                    >
                      Interview Prep
                    </Link>
                    <Link 
                      to="/analytics" 
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          handleProtectedAction();
                        }
                      }}
                    >
                      Analytics
                    </Link>
                    
                    {isAuthenticated && (
                      <Button 
                        variant="ghost" 
                        className="px-4 py-2 justify-start hover:bg-muted rounded-md text-red-500 hover:text-red-600"
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    )}
                  </div>
                </div>
                {!isAuthenticated && (
                  <div className="border-t pt-6 pb-2 flex flex-col gap-2">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-brand-blue to-brand-purple">
                      <Link to="/signup">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

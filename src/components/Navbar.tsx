
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X,
  Shield,
  Home,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-insure-teal" />
              <span className="ml-2 text-xl font-semibold text-insure-navy">Insure360</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-4 w-4 mr-2 inline" />
              Home
            </Link>
            <Link to="/dashboard" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/policies" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-sm font-medium">
              Policies
            </Link>
            <Link to="/advisor" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-sm font-medium">
              AI Advisor
            </Link>
            <Link to="/compare" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-sm font-medium">
              Compare
            </Link>
            <div className="ml-4">
              <Button variant="default" className="bg-insure-teal hover:bg-insure-teal/90">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-base font-medium">
              <Home className="h-4 w-4 mr-2 inline" />
              Home
            </Link>
            <Link to="/dashboard" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </Link>
            <Link to="/policies" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-base font-medium">
              Policies
            </Link>
            <Link to="/advisor" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-base font-medium">
              AI Advisor
            </Link>
            <Link to="/compare" className="text-insure-dark-slate hover:text-insure-teal px-3 py-2 rounded-md text-base font-medium">
              Compare
            </Link>
            <div className="mt-4">
              <Button variant="default" className="bg-insure-teal hover:bg-insure-teal/90 justify-start w-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

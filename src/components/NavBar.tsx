
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm py-4 sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-retention-800 flex items-center justify-center text-white font-bold">
            EC
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">Employee Compass</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
            Dashboard
          </Link>
          <Link to="/employees" className="text-foreground hover:text-primary transition-colors font-medium">
            Employees
          </Link>
          <Link to="/upload" className="text-foreground hover:text-primary transition-colors font-medium">
            Upload Data
          </Link>
          <div className="pl-2 flex space-x-2">
            <Button asChild variant="outline">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground hover:text-primary"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Employees
            </Link>
            <Link
              to="/upload"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={toggleMenu}
            >
              Upload Data
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={toggleMenu}>
                  Log In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

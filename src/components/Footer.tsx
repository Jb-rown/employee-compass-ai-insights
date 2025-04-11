
import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-retention-800 flex items-center justify-center text-white font-bold">
                EC
              </div>
              <span className="font-bold text-xl">Employee Compass</span>
            </div>
            <p className="text-muted-foreground">
              Advanced employee retention prediction platform powered by data science and AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/integrations" className="text-muted-foreground hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/security" className="text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Employee Compass. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Updated social media links with proper icon components */}
            <a 
              href="https://twitter.com/employeecompass" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1" 
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com/company/employeecompass" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1" 
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/employeecompass" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1" 
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://facebook.com/employeecompass" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1" 
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://instagram.com/employeecompass" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-all transform hover:-translate-y-1" 
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

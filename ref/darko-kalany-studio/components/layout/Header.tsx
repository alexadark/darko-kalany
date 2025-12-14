import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NAVIGATION_LINKS } from '../../constants';
import Button from '../ui/Button';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const headerClass = `fixed top-0 w-full z-40 transition-all duration-300 border-b ${
    isScrolled || isMenuOpen
      ? 'bg-black/90 backdrop-blur-md border-white/10 py-4' 
      : 'bg-transparent border-transparent py-6'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase z-50 text-white">
          Darko Kalany
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAVIGATION_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-mono uppercase tracking-wider hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" to="/contact" className="!py-2 !px-4 !text-xs">Work With Us</Button>
          
          {/* Theme Toggle - Hidden for now based on strictly dark/editorial requirement, but implemented logically */}
          <button onClick={toggleTheme} className="text-gray-400 hover:text-white">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-2xl font-heading uppercase tracking-widest hover:text-primary text-white"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="primary" to="/contact">Work With Us</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItem {
  _key: string;
  label: string;
  link: string;
  children?: {
    _key: string;
    label: string;
    link: string;
  }[];
}

interface HeaderProps {
  navigation?: {
    items?: NavItem[];
    ctaText?: string;
    ctaLink?: string;
  };
  settings?: {
    siteName?: string;
    logo?: {
      asset?: { _ref: string };
    };
  };
}

export function Header({ navigation, settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Check scroll position on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const headerClass = `fixed top-0 w-full z-40 transition-all duration-300 ${
    isScrolled || isMenuOpen
      ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4'
      : 'py-6'
  }`;

  // Default navigation items if not provided
  const navItems = navigation?.items || [
    { _key: '1', label: 'Home', link: '/' },
    { _key: '2', label: 'Portfolio', link: '/portfolio' },
    { _key: '3', label: 'Services', link: '/services' },
    { _key: '4', label: 'Projects', link: '/projects' },
    { _key: '5', label: 'About', link: '/about' },
    { _key: '6', label: 'Pricing', link: '/pricing' },
    { _key: '7', label: 'Contact', link: '/contact' },
  ];

  const ctaText = navigation?.ctaText || 'Work With Us';
  const ctaLink = navigation?.ctaLink || '/contact';
  const siteName = settings?.siteName || 'Darko Kalany';

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase z-50 text-white"
        >
          {siteName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item._key}
              to={item.link}
              className={`text-sm font-mono uppercase tracking-wider hover:text-primary transition-colors ${
                isActive(item.link) ? 'text-primary' : 'text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="primary" href={ctaLink} className="!py-2 !px-4 !text-xs">
            {ctaText}
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8">
            {navItems.map((item) => (
              <Link
                key={item._key}
                to={item.link}
                className={`text-2xl font-heading uppercase tracking-widest transition-colors ${
                  isActive(item.link) ? 'text-primary' : 'text-white hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="primary" href={ctaLink}>
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../constants';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl uppercase tracking-tighter mb-4 text-white">Darko Kalany</h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              Hyper-real AI photography & film for the world's most exclusive brands.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-between md:justify-start md:gap-20">
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Menu</h4>
              <ul className="space-y-4">
                {NAVIGATION_LINKS.slice(0, 4).map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-primary text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Studio</h4>
              <ul className="space-y-4">
                {NAVIGATION_LINKS.slice(4).map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-primary text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
            <div className="mt-8">
              <p className="text-gray-500 text-xs">hello@darkokalany.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} Darko Kalany Studio. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono uppercase">
            Designed by System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
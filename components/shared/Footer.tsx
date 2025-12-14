import { Link } from 'react-router';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

interface FooterLink {
  _key: string;
  label: string;
  link: string;
}

interface SocialLink {
  _key?: string;
  platform: string;
  url: string;
}

interface FooterProps {
  footer?: {
    tagline?: string;
    menuLinks?: FooterLink[];
    studioLinks?: FooterLink[];
    copyright?: string;
    designCredit?: string;
  };
  settings?: {
    siteName?: string;
    contactEmail?: string;
    socialLinks?: SocialLink[];
  };
}

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
};

export function Footer({ footer, settings }: FooterProps) {
  const siteName = settings?.siteName || 'Darko Kalany';
  const tagline = footer?.tagline || 'Hyper-real AI photography & film for the world\'s most exclusive brands.';
  const contactEmail = settings?.contactEmail || 'hello@darkokalany.com';

  // Default menu links
  const menuLinks = footer?.menuLinks || [
    { _key: '1', label: 'Home', link: '/' },
    { _key: '2', label: 'Portfolio', link: '/portfolio' },
    { _key: '3', label: 'Services', link: '/services' },
    { _key: '4', label: 'Projects', link: '/projects' },
  ];

  // Default studio links
  const studioLinks = footer?.studioLinks || [
    { _key: '1', label: 'About', link: '/about' },
    { _key: '2', label: 'Pricing', link: '/pricing' },
    { _key: '3', label: 'Contact', link: '/contact' },
  ];

  // Default social links
  const socialLinks = settings?.socialLinks || [
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'youtube', url: '#' },
    { platform: 'twitter', url: '#' },
  ];

  // Process copyright with year
  const currentYear = new Date().getFullYear();
  const copyright = (footer?.copyright || '© {year} Darko Kalany Studio. All rights reserved.')
    .replace('{year}', String(currentYear));

  const designCredit = footer?.designCredit || 'Designed by System';

  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl uppercase tracking-tighter mb-4 text-white">
              {siteName}
            </h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Menu Columns */}
          <div className="md:col-span-2 flex justify-between md:justify-start md:gap-20">
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">
                Menu
              </h4>
              <ul className="space-y-4">
                {menuLinks.map((link) => (
                  <li key={link._key}>
                    <Link
                      to={link.link}
                      className="text-gray-400 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">
                Studio
              </h4>
              <ul className="space-y-4">
                {studioLinks.map((link) => (
                  <li key={link._key}>
                    <Link
                      to={link.link}
                      className="text-gray-400 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = socialIcons[social.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={social._key || index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            <div className="mt-8">
              <a
                href={`mailto:${contactEmail}`}
                className="text-gray-500 text-xs hover:text-primary transition-colors"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">{copyright}</p>
          <p className="text-gray-700 text-xs font-mono uppercase">{designCredit}</p>
        </div>
      </div>
    </footer>
  );
}

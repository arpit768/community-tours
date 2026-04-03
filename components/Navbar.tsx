import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navLinks = [
  { label: 'Home', view: 'home' },
  { label: 'Services', view: 'services' },
  { label: 'Packages', view: 'packages' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
];

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    onViewChange(view);
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-navy-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="Community Travel Services"
              className="w-11 h-11 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block text-left">
              <h1 className="text-base font-bold text-navy-700 leading-tight">Community Tours</h1>
              <p className="text-[10px] text-brand-400 font-semibold tracking-wider uppercase">& Travels</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentView === link.view
                    ? 'bg-navy-700 text-white'
                    : 'text-navy-700 hover:bg-navy-50 hover:text-navy-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="ml-3 bg-brand-400 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-brand-500 transition-all shadow-md"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    currentView === link.view
                      ? 'bg-navy-700 text-white'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="mt-1 mx-1 bg-brand-400 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

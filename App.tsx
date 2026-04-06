import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ServicesPage from './components/ServicesPage';
import PackagesPage from './components/PackagesPage';
import AboutPage from './components/AboutPage';
import ContactUsPage from './components/ContactUsPage';
import BookNowPage from './components/BookNowPage';
import AdminPage from './components/AdminPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import RefundPage from './components/RefundPage';

const VIEWS = ['services', 'packages', 'about', 'contact', 'book', 'admin', 'terms', 'privacy', 'refund'];

function pathToView(pathname: string): string {
  const seg = pathname.replace(/^\//, '').toLowerCase();
  return VIEWS.includes(seg) ? seg : 'home';
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState(() => pathToView(window.location.pathname));

  const navigate = (view: string) => {
    const path = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  // Handle browser back / forward
  useEffect(() => {
    const onPop = () => setCurrentView(pathToView(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'services':  return <ServicesPage />;
      case 'packages':  return <PackagesPage />;
      case 'about':     return <AboutPage />;
      case 'contact':   return <ContactUsPage />;
      case 'book':      return <BookNowPage />;
      case 'admin':     return <AdminPage />;
      case 'terms':     return <TermsPage />;
      case 'privacy':   return <PrivacyPage />;
      case 'refund':    return <RefundPage />;
      default:          return <LandingPage onNavigate={navigate} />;
    }
  };

  // Admin gets its own minimal shell
  if (currentView === 'admin') {
    return (
      <div>
        {renderContent()}
        <div className="bg-gray-100 text-center py-3 text-xs text-gray-400">
          <button onClick={() => navigate('home')} className="hover:text-navy-700 transition-colors">
            ← Back to website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentView={currentView} onViewChange={navigate} />
      {renderContent()}

      {/* Footer */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <h2 className="font-bold text-lg leading-tight">Community Travels Services</h2>
                <p className="text-brand-400 text-xs font-semibold tracking-wider uppercase">Nepal's Trusted Partner</p>
              </div>
            </div>
            <p className="text-navy-200 text-sm leading-relaxed max-w-xs">
              Empowering travelers to explore the Himalayas with unforgettable, safe, and authentic tour experiences since 2008.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-brand-400 uppercase text-xs tracking-wider">Pages</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              {[['Home','home'],['Services','services'],['Packages','packages'],['About','about'],['Contact','contact'],['Book Now','book']].map(([label, view]) => (
                <li key={view}>
                  <button onClick={() => navigate(view)} className="hover:text-white transition-colors">{label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-brand-400 uppercase text-xs tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              {[['Terms & Conditions','terms'],['Privacy Policy','privacy'],['Refund Policy','refund']].map(([label, view]) => (
                <li key={view}>
                  <button onClick={() => navigate(view)} className="hover:text-white transition-colors">{label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-brand-400 uppercase text-xs tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>Thapathali-11, Kathmandu</li>
              <li><a href="tel:+97701-4976661" className="hover:text-white transition-colors">+977-01-4976661</a></li>
              <li><a href="tel:+9779851416661" className="hover:text-white transition-colors">+977-9851416661</a></li>
              <li><a href="mailto:communitytravelservices@gmail.com" className="hover:text-white transition-colors break-all">communitytravelservices@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4 border-t border-navy-800 text-center text-xs text-navy-400">
          &copy; {new Date().getFullYear()} Community Travels Services Pvt. Ltd. Kathmandu, Nepal. &nbsp;|&nbsp; Sun–Fri: 9:00 AM – 6:00 PM NPT
        </div>
      </footer>
    </div>
  );
};

export default App;

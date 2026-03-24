
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import CustomerView from './components/CustomerView';
import StaffView from './components/StaffView';
import AdminView from './components/AdminView';
import ProfileView from './components/ProfileView';
import TravelInsurancePage from './components/TravelInsurancePage';
import HelpCenterPage from './components/HelpCenterPage';
import EmergencySupportPage from './components/EmergencySupportPage';
import ContactUsPage from './components/ContactUsPage';
import { User, UserRole, Tour, Booking, AppNotification } from './types';
import { MOCK_TOURS, MOCK_BOOKINGS } from './constants';
import { ensureAdminStaffAccounts } from './services/initUsers';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [showLogin, setShowLogin] = useState(false);

  // Initialize default admin/staff accounts on first load
  useEffect(() => {
    ensureAdminStaffAccounts();
  }, []);

  // Simulating Backend Database State
  const [tours, setTours] = useState<Tour[]>(MOCK_TOURS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const handleAddNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: AppNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleMarkNotificationsRead = (role: UserRole) => {
    setNotifications(prev =>
      prev.map(n => (n.forRole === role || n.forRole === 'ALL') ? { ...n, read: true } : n)
    );
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setShowLogin(false);
  };

  const handleCreateBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBookings(prev => [newBooking, ...prev]);
    alert("Booking request sent successfully!");
  };

  const handleAddTour = (tour: Omit<Tour, 'id'>) => {
    const newTour = {
      ...tour,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTours(prev => [...prev, newTour]);
    alert("Tour package listed successfully!");
  };

  const handleUpdateBookingStatus = (bookingId: string, status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => {
    setBookings(prev => prev.map(b =>
      b.id === bookingId ? { ...b, status } : b
    ));
  };

  const handleUpdateTour = (id: string, updates: Partial<Tour>) => {
    setTours(prev => prev.map(t =>
        t.id === id ? { ...t, ...updates } : t
    ));
  };

  const renderContent = () => {
    if (!user) {
      if (showLogin) {
        return <Auth onLogin={handleLogin} />;
      }
      return <LandingPage onGetStarted={() => setShowLogin(true)} tours={tours} />;
    }

    // Authenticated Views
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar
          user={user}
          onLogout={handleLogout}
          onViewChange={setCurrentView}
          currentView={currentView}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
        />

        <main className="fade-in pb-20">
          {currentView === 'profile' && (
            <ProfileView user={user} bookings={bookings} tours={tours} />
          )}

          {(currentView === 'dashboard' || currentView === 'customer') && user.role === UserRole.CUSTOMER && (
            <CustomerView
              user={user}
              tours={tours}
              bookings={bookings}
              onCreateBooking={handleCreateBooking}
            />
          )}

          {(currentView === 'dashboard' || currentView === 'staff') && user.role === UserRole.STAFF && (
            <StaffView
              user={user}
              tours={tours}
              bookings={bookings}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdateTour={handleUpdateTour}
              onAddTour={handleAddTour}
              onAddNotification={handleAddNotification}
            />
          )}

          {(currentView === 'dashboard' || currentView === 'admin') && user.role === UserRole.ADMIN && (
            <AdminView
              user={user}
              tours={tours}
              bookings={bookings}
              onUpdateTour={handleUpdateTour}
              onAddTour={handleAddTour}
            />
          )}

          {currentView === 'travel-insurance' && (
            <TravelInsurancePage onBack={() => setCurrentView('dashboard')} />
          )}
          {currentView === 'help-center' && (
            <HelpCenterPage onBack={() => setCurrentView('dashboard')} />
          )}
          {currentView === 'emergency-support' && (
            <EmergencySupportPage onBack={() => setCurrentView('dashboard')} />
          )}
          {currentView === 'contact-us' && (
            <ContactUsPage onBack={() => setCurrentView('dashboard')} />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-blue-950 text-blue-200/60 py-8 sm:py-12 border-t border-blue-900">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
                <h2 className="text-white font-bold text-lg sm:text-xl">Community Tours and Travels</h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed max-w-xs">
                Empowering travelers to explore the Himalayas with unforgettable tour experiences.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => { setCurrentView('dashboard'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Browse Tours</button></li>
                <li><button onClick={() => { setCurrentView('travel-insurance'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Travel Insurance</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => { setCurrentView('help-center'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => { setCurrentView('emergency-support'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Emergency Support</button></li>
                <li><button onClick={() => { setCurrentView('contact-us'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-blue-900 text-sm text-center">
            &copy; {new Date().getFullYear()} Community Tours and Travels Pvt. Ltd. Kathmandu.
          </div>
        </footer>
      </div>
    );
  };

  return renderContent();
};

export default App;

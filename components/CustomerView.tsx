import { useState } from 'react';
import { MapPin, Calendar, Car, Shield, X, Check, Filter, Search, ChevronRight, Clock } from 'lucide-react';
import { VerificationStatus } from '../types';
import type { Vehicle, Booking, User } from '../types';

interface CustomerViewProps {
  vehicles: Vehicle[];
  bookings: Booking[];
  user: User;
  onCreateBooking: (booking: Omit<Booking, 'id'>) => void;
}

export default function CustomerView({ vehicles, bookings, user, onCreateBooking }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingForm, setBookingForm] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    insurance: false,
  });
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<'all' | 'budget' | 'mid' | 'premium'>('all');

  const availableVehicles = vehicles.filter(
    v => v.available && v.verificationStatus === VerificationStatus.VERIFIED
  );

  const filteredVehicles = availableVehicles.filter(v => {
    const locationMatch = filterLocation === 'all' || v.location === filterLocation;
    const typeMatch = filterType === 'all' || v.type === filterType;
    const searchMatch = searchQuery === '' ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());

    let priceMatch = true;
    if (priceRange === 'budget') priceMatch = v.pricePerDay < 3000;
    else if (priceRange === 'mid') priceMatch = v.pricePerDay >= 3000 && v.pricePerDay < 6000;
    else if (priceRange === 'premium') priceMatch = v.pricePerDay >= 6000;

    return locationMatch && typeMatch && searchMatch && priceMatch;
  });

  const myBookings = bookings.filter(b => b.customerId === user.id);

  const locations = Array.from(new Set(vehicles.map(v => v.location)));
  const types = Array.from(new Set(vehicles.map(v => v.type)));

  const calculateTotalPrice = () => {
    if (!selectedVehicle || !bookingForm.startDate || !bookingForm.endDate) return 0;

    const start = new Date(bookingForm.startDate);
    const end = new Date(bookingForm.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    let total = selectedVehicle.pricePerDay * days;
    if (bookingForm.insurance) {
      total += 500 * days; // NPR 500 per day insurance
    }

    return total;
  };

  const getDaysCount = () => {
    if (!bookingForm.startDate || !bookingForm.endDate) return 0;
    const start = new Date(bookingForm.startDate);
    const end = new Date(bookingForm.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleBooking = () => {
    if (!selectedVehicle || !bookingForm.startDate || !bookingForm.endDate || !bookingForm.destination) {
      alert('Please fill all required fields');
      return;
    }

    const totalPrice = calculateTotalPrice();

    const booking: Omit<Booking, 'id'> = {
      vehicleId: selectedVehicle.id,
      customerId: user.id,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      totalPrice,
      status: 'PENDING',
      destination: bookingForm.destination,
      insurance: bookingForm.insurance ? {
        type: 'COMPREHENSIVE',
        dailyRate: 500,
        totalCost: 500 * getDaysCount()
      } : undefined,
    };

    onCreateBooking(booking);
    setSelectedVehicle(null);
    setBookingForm({ startDate: '', endDate: '', destination: '', insurance: false });
    setActiveTab('bookings');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-blue-200 text-lg">Your next adventure awaits. Find the perfect vehicle for your journey.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* Enhanced Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'browse'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Browse Vehicles
            </div>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              My Bookings
              {myBookings.length > 0 && (
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {myBookings.length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Browse Vehicles Tab */}
        {activeTab === 'browse' && (
          <div>
            {/* Advanced Filters Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Find Your Perfect Vehicle</h3>
                  <p className="text-sm text-gray-500">Filter by location, type, and price range</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search vehicles..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Prices</option>
                    <option value="budget">Budget (&lt; NPR 3,000)</option>
                    <option value="mid">Mid-Range (NPR 3,000-6,000)</option>
                    <option value="premium">Premium (&gt; NPR 6,000)</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filterLocation !== 'all' || filterType !== 'all' || searchQuery !== '' || priceRange !== 'all') && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                    {filterLocation !== 'all' && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {filterLocation}
                      </span>
                    )}
                    {filterType !== 'all' && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {filterType}
                      </span>
                    )}
                    {priceRange !== 'all' && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {priceRange === 'budget' ? 'Budget' : priceRange === 'mid' ? 'Mid-Range' : 'Premium'}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setFilterLocation('all');
                        setFilterType('all');
                        setSearchQuery('');
                        setPriceRange('all');
                      }}
                      className="text-sm text-red-600 hover:text-red-700 font-medium underline"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900 text-lg">{filteredVehicles.length}</span> vehicles available
                </p>
              </div>
            </div>

            {/* Premium Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-green-600" />
                        Verified
                      </span>
                      <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        {vehicle.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Available Now
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{vehicle.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {vehicle.description}
                    </p>

                    {/* Features Grid */}
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">From</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-900">
                            {vehicle.pricePerDay.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm font-medium">NPR/day</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                      >
                        Book Now
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <Car className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No vehicles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => {
                    setFilterLocation('all');
                    setFilterType('all');
                    setSearchQuery('');
                    setPriceRange('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {myBookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-6">Start your adventure by booking a vehicle</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <Car className="w-5 h-5" />
                  Browse Vehicles
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Bookings</h2>
                  <p className="text-gray-600">Manage and track your vehicle rentals</p>
                </div>

                {myBookings.map((booking) => {
                  const vehicle = vehicles.find(v => v.id === booking.vehicleId);
                  if (!vehicle) return null;

                  return (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                      <div className="flex flex-col md:flex-row">
                        {/* Vehicle Image */}
                        <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200 flex-shrink-0">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{vehicle.location}</span>
                              </div>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="text-xs text-gray-500 mb-1 font-medium">Pickup Date</div>
                              <div className="flex items-center gap-2 text-gray-900">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold">{new Date(booking.startDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1 font-medium">Return Date</div>
                              <div className="flex items-center gap-2 text-gray-900">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold">{new Date(booking.endDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1 font-medium">Destination</div>
                              <div className="flex items-center gap-2 text-gray-900">
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span className="font-semibold">{booking.destination}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div>
                              {booking.insurance && (
                                <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                                  <Shield className="w-4 h-4" />
                                  <span className="font-medium">Insurance Included</span>
                                </div>
                              )}
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm text-gray-500">Total:</span>
                                <span className="text-3xl font-bold text-gray-900">
                                  NPR {booking.totalPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            {booking.status === 'PENDING' && (
                              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">Awaiting Confirmation</span>
                              </div>
                            )}
                            {booking.status === 'CONFIRMED' && (
                              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                                <Check className="w-5 h-5" />
                                <span className="font-medium">Confirmed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Booking Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Modal Header with Image */}
            <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedVehicle.name}</h2>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedVehicle.location}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Booking</h3>

                <div className="space-y-6">
                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pickup Date *
                      </label>
                      <input
                        type="date"
                        value={bookingForm.startDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Return Date *
                      </label>
                      <input
                        type="date"
                        value={bookingForm.endDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                        min={bookingForm.startDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.destination}
                      onChange={(e) => setBookingForm({ ...bookingForm, destination: e.target.value })}
                      placeholder="Where are you planning to go?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Insurance Option */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingForm.insurance}
                        onChange={(e) => setBookingForm({ ...bookingForm, insurance: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-gray-900">Comprehensive Insurance</span>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Full coverage including collision, theft, and third-party liability
                        </p>
                        <div className="text-lg font-bold text-blue-600">
                          NPR 500/day
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              {bookingForm.startDate && bookingForm.endDate && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Price Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Vehicle rental ({getDaysCount()} days)</span>
                      <span className="font-semibold">NPR {(selectedVehicle.pricePerDay * getDaysCount()).toLocaleString()}</span>
                    </div>
                    {bookingForm.insurance && (
                      <div className="flex justify-between text-gray-700">
                        <span>Insurance ({getDaysCount()} days)</span>
                        <span className="font-semibold">NPR {(500 * getDaysCount()).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-blue-600">
                        NPR {calculateTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!bookingForm.startDate || !bookingForm.endDate || !bookingForm.destination}
                  className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Confirm Booking
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

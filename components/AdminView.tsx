import { useState } from 'react';
import { Shield, Car, Users, DollarSign, TrendingUp, CheckCircle, XCircle, AlertTriangle, UserPlus, Search, MapPin, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { VerificationStatus, UserRole } from '../types';
import type { Vehicle, Booking, User } from '../types';

interface AdminViewProps {
  vehicles: Vehicle[];
  bookings: Booking[];
  user: User;
  onUpdateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
}

export default function AdminView({ vehicles, bookings, user, onUpdateVehicle }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'staff' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Get all staff members from localStorage
  const getAllUsers = (): User[] => {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  };

  const staffMembers = getAllUsers().filter(u => u.role === UserRole.STAFF || u.role === UserRole.ADMIN);

  // Statistics
  const totalVehicles = vehicles.length;
  const verifiedVehicles = vehicles.filter(v => v.verificationStatus === VerificationStatus.VERIFIED).length;
  const pendingVehicles = vehicles.filter(v => v.verificationStatus === VerificationStatus.PENDING).length;
  const rejectedVehicles = vehicles.filter(v => v.verificationStatus === VerificationStatus.REJECTED).length;
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Unique owners count
  const uniqueOwners = new Set(vehicles.map(v => v.ownerId)).size;

  // Filtered vehicles
  const filteredVehicles = vehicles.filter(v => {
    const statusMatch = filterStatus === 'all' || v.verificationStatus === filterStatus;
    const searchMatch = searchQuery === '' ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Location statistics
  const locationStats = vehicles.reduce((acc, v) => {
    acc[v.location] = (acc[v.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Type statistics
  const typeStats = vehicles.reduce((acc, v) => {
    acc[v.type] = (acc[v.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleQuickVerify = (vehicleId: string, status: VerificationStatus.VERIFIED | VerificationStatus.REJECTED) => {
    onUpdateVehicle(vehicleId, { verificationStatus: status });
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      alert('Please fill all required fields');
      return;
    }

    const users = getAllUsers();

    // Check if email already exists
    if (users.some(u => u.email === newStaff.email)) {
      alert('Email already exists');
      return;
    }

    const staffUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      password: newStaff.password,
      role: UserRole.STAFF
    };

    users.push(staffUser);
    localStorage.setItem('users', JSON.stringify(users));

    setNewStaff({ name: '', email: '', phone: '', password: '' });
    setShowAddStaffModal(false);
    alert('Staff member added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-300">Platform-wide management and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{totalVehicles}</p>
                <p className="text-sm text-gray-500">Total Vehicles</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">{verifiedVehicles} Verified</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">{pendingVehicles} Pending</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">NPR {(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{completedBookings} completed bookings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
                <p className="text-sm text-gray-500">Total Bookings</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{activeBookings} currently active</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{uniqueOwners}</p>
                <p className="text-sm text-gray-500">Vehicle Owners</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{staffMembers.length} staff members</p>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'vehicles'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Vehicles ({totalVehicles})
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'staff'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Staff Management ({staffMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('vehicles')}
                  className="flex items-center gap-3 p-6 border-2 border-yellow-300 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">{pendingVehicles}</p>
                    <p className="text-sm text-gray-600">Vehicles awaiting verification</p>
                  </div>
                </button>

                <div className="flex items-center gap-3 p-6 border-2 border-green-300 bg-green-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">{verifiedVehicles}</p>
                    <p className="text-sm text-gray-600">Active rental vehicles</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('staff')}
                  className="flex items-center gap-3 p-6 border-2 border-blue-300 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
                    <p className="text-sm text-gray-600">Manage staff members</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
                <span className="text-sm text-gray-500">Last 5 bookings</span>
              </div>
              <div className="space-y-3">
                {bookings.slice(0, 5).map((booking) => {
                  const vehicle = vehicles.find(v => v.id === booking.vehicleId);
                  if (!vehicle) return null;

                  return (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{vehicle.name}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.startDate).toLocaleDateString()}
                            </span>
                            <span>→</span>
                            <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">NPR {booking.totalPrice.toLocaleString()}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800 border-green-200' :
                          booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab - Enhanced */}
        {activeTab === 'vehicles' && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search Vehicles</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, plate number, or location..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
                  <div className="flex gap-2">
                    {(['all', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          filterStatus === status
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status === 'all' ? 'All' : status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Showing <span className="font-bold text-gray-900">{filteredVehicles.length}</span> of <span className="font-bold">{totalVehicles}</span> vehicles
                </p>
              </div>
            </div>

            {/* Vehicle List */}
            <div className="space-y-4">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row">
                    {/* Vehicle Image */}
                    <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200 flex-shrink-0">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Vehicle Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="font-medium">{vehicle.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {vehicle.location}
                            </span>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(vehicle.verificationStatus)}`}>
                          {vehicle.verificationStatus}
                        </span>
                      </div>

                      {/* Vehicle Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Plate Number</p>
                          <p className="font-bold text-gray-900">{vehicle.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Price per Day</p>
                          <p className="font-bold text-gray-900">NPR {vehicle.pricePerDay.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Availability</p>
                          <p className={`font-bold ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                            {vehicle.available ? 'Available' : 'Not Available'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Owner ID</p>
                          <p className="font-mono text-sm text-gray-700">{vehicle.ownerId.slice(0, 12)}...</p>
                        </div>
                      </div>

                      {/* Features */}
                      {vehicle.features && vehicle.features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Features:</p>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.slice(0, 5).map((feature, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {vehicle.verificationStatus === VerificationStatus.PENDING && (
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleQuickVerify(vehicle.id, VerificationStatus.REJECTED)}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
                          >
                            <XCircle className="w-5 h-5" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleQuickVerify(vehicle.id, VerificationStatus.VERIFIED)}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredVehicles.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                  <Car className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">No vehicles found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Staff Management Tab - NEW */}
        {activeTab === 'staff' && (
          <div>
            {/* Header with Add Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Management</h2>
                  <p className="text-gray-600">Manage staff members who can verify vehicles and bookings</p>
                </div>
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Add Staff Member
                </button>
              </div>
            </div>

            {/* Staff List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {staff.name[0].toUpperCase()}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      staff.role === UserRole.ADMIN
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {staff.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{staff.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{staff.email}</p>

                  {staff.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <span className="font-medium">Phone:</span>
                      <span>{staff.phone}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Member ID: {staff.id}</p>
                  </div>
                </div>
              ))}
            </div>

            {staffMembers.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No staff members yet</h3>
                <p className="text-gray-500 mb-6">Add your first staff member to help manage the platform</p>
                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Add Staff Member
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Vehicles by Location */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicles by Location</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(locationStats).map(([location, count]) => (
                  <div key={location} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900">{count}</p>
                    <p className="text-sm text-gray-600 font-medium">{location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicles by Type */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicles by Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(typeStats).map(([type, count]) => (
                  <div key={type} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                    <Car className="w-8 h-8 text-purple-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900">{count}</p>
                    <p className="text-sm text-gray-600 font-medium">{type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-4xl font-bold text-green-600 mb-2">{Math.round((verifiedVehicles / totalVehicles) * 100)}%</p>
                  <p className="text-sm text-gray-600 font-medium">Verification Rate</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-4xl font-bold text-blue-600 mb-2">{Math.round((activeBookings / totalBookings) * 100) || 0}%</p>
                  <p className="text-sm text-gray-600 font-medium">Active Bookings</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-4xl font-bold text-purple-600 mb-2">NPR {(totalRevenue / totalBookings || 0).toFixed(0)}</p>
                  <p className="text-sm text-gray-600 font-medium">Avg. Booking Value</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add Staff Member</h2>
                  <p className="text-sm text-gray-600">Create a new staff account</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Enter staff member's full name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="staff@yatrarentals.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="+977-XXX-XXXX"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                disabled={!newStaff.name || !newStaff.email || !newStaff.password}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

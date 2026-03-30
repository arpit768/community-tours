import { AlertTriangle, Phone, MapPin, ArrowLeft, Shield, Heart, Radio, Mountain } from 'lucide-react';

interface EmergencySupportPageProps {
  onBack: () => void;
}

export default function EmergencySupportPage({ onBack }: EmergencySupportPageProps) {
  const emergencyContacts = [
    { label: 'Community Tours 24/7 Helpline', number: '+977-01-4976661', desc: 'Our dedicated emergency support team', color: 'from-accent-500 to-accent-600', icon: Phone },
    { label: 'Nepal Police', number: '100', desc: 'National emergency police line', color: 'from-blue-600 to-blue-700', icon: Shield },
    { label: 'Tourist Police', number: '+977-1-4247041', desc: 'Dedicated tourist assistance', color: 'from-blue-500 to-blue-600', icon: Shield },
    { label: 'Nepal Ambulance', number: '102', desc: 'Medical emergency ambulance', color: 'from-red-500 to-red-600', icon: Heart },
    { label: 'Himalayan Rescue Association', number: '+977-1-4440292', desc: 'High-altitude rescue and medical support', color: 'from-warm-500 to-warm-600', icon: Mountain },
    { label: 'Nepal Fire Service', number: '101', desc: 'Fire and disaster response', color: 'from-orange-500 to-orange-600', icon: Radio },
  ];

  const embassyContacts = [
    { country: 'India', phone: '+977-1-4410900' },
    { country: 'United States', phone: '+977-1-4234000' },
    { country: 'United Kingdom', phone: '+977-1-4237100' },
    { country: 'China', phone: '+977-1-4411740' },
    { country: 'Australia', phone: '+977-1-4371678' },
    { country: 'Germany', phone: '+977-1-4412786' },
  ];

  const emergencySteps = [
    { step: '1', title: 'Stay Calm & Assess', desc: 'Take a moment to assess the situation. Ensure your immediate safety before taking any action.' },
    { step: '2', title: 'Contact Your Guide', desc: 'If you are on a tour, contact your assigned tour guide immediately. They are trained for emergency situations.' },
    { step: '3', title: 'Call Our Helpline', desc: 'Call our 24/7 helpline at +977-01-4976661. Our team will coordinate rescue and medical support.' },
    { step: '4', title: 'Share Your Location', desc: 'Share your GPS coordinates or describe your location. Use landmarks if GPS is unavailable.' },
    { step: '5', title: 'Follow Instructions', desc: 'Stay where you are unless unsafe. Follow instructions from rescue teams and your tour guide.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent-600 to-accent-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container mx-auto px-4 py-10 sm:py-14 relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Emergency Support</h1>
              <p className="text-red-100 text-sm sm:text-base mt-1">24/7 emergency assistance for travelers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* Primary Emergency Banner */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-1">24/7 Emergency Helpline</h2>
              <p className="text-red-100 text-sm mb-3">For immediate assistance during your tour</p>
              <a href="tel:+97701-4976661" className="inline-flex items-center gap-2 bg-white text-accent-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition-all">
                <Phone className="w-5 h-5" />
                +977-01-4976661
              </a>
            </div>
          </div>
        </div>

        {/* What to Do in Emergency */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">What to Do in an Emergency</h2>
          <div className="space-y-4">
            {emergencySteps.map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts Grid */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {emergencyContacts.map((contact) => (
            <div key={contact.label} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  <contact.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{contact.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{contact.desc}</p>
                  <a href={`tel:${contact.number}`} className="inline-flex items-center gap-1.5 mt-2 text-blue-600 font-bold text-lg hover:text-blue-700">
                    <Phone className="w-4 h-4" />
                    {contact.number}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Embassy Contacts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Embassy Contacts in Kathmandu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {embassyContacts.map((embassy) => (
              <div key={embassy.country} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-900 text-sm">{embassy.country}</span>
                <a href={`tel:${embassy.phone}`} className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                  {embassy.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-r from-warm-50 to-warm-100 border border-warm-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Safety Tips for Travelers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Always carry your tour guide\'s phone number',
              'Keep a copy of your passport and insurance documents',
              'Share your itinerary with family back home',
              'Stay hydrated and acclimatize properly at altitude',
              'Carry a basic first-aid kit on treks',
              'Register with your embassy when visiting Nepal',
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-warm-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

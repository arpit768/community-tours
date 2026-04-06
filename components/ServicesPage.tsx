import { Compass, Mountain, Camera, Shield, Users, Clock, Star, MapPin, Zap, Heart } from 'lucide-react';

const services = [
  {
    icon: Mountain,
    bg: 'bg-navy-700',
    badge: 'bg-brand-400',
    title: 'Trekking & Hiking',
    desc: "Expert-guided treks through Nepal's most iconic trails  from the Annapurna Circuit to Everest Base Camp. All fitness levels welcome.",
    features: ['Certified guides', 'Gear rental', 'Permit assistance', 'Altitude support'],
  },
  {
    icon: Camera,
    bg: 'bg-sky-400',
    badge: 'bg-navy-700',
    title: 'Cultural Tours',
    desc: 'Immersive cultural experiences across Kathmandu Valley, Lumbini, and Bhaktapur. Explore temples, monasteries and living traditions.',
    features: ['Heritage walks', 'Local cuisine', 'Craft workshops', 'Festival experiences'],
  },
  {
    icon: Compass,
    bg: 'bg-brand-400',
    badge: 'bg-crimson-500',
    title: 'Wildlife Safaris',
    desc: 'Thrilling wildlife encounters in Chitwan and Bardia National Parks. Spot rhinos, tigers, and rare birds in their natural habitat.',
    features: ['Jeep safaris', 'Canoe rides', 'Bird watching', 'Nature walks'],
  },
  {
    icon: Heart,
    bg: 'bg-crimson-500',
    badge: 'bg-navy-700',
    title: 'Pilgrimage Tours',
    desc: "Sacred journeys to Nepal's most revered Hindu and Buddhist shrines  a deeply spiritual travel experience.",
    features: ['Pashupatinath', 'Muktinath', 'Lumbini', 'Kopan Monastery'],
  },
  {
    icon: Users,
    bg: 'bg-navy-700',
    badge: 'bg-brand-400',
    title: 'Group Expeditions',
    desc: 'Customised group tours and team-building adventures. Perfect for corporate groups, universities, and travel clubs.',
    features: ['Custom itineraries', 'Group discounts', 'Team activities', 'Catering options'],
  },
  {
    icon: Shield,
    bg: 'bg-sky-400',
    badge: 'bg-crimson-500',
    title: 'Travel Insurance',
    desc: 'Comprehensive travel insurance tailored for Nepal adventures  covering trekking, emergencies, and trip cancellation.',
    features: ['Medical coverage', 'Helicopter rescue', 'Trip cancellation', '24/7 assistance'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/40 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-brand-300">What We Offer</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-navy-300 text-base sm:text-xl max-w-2xl mx-auto">
            From thrilling mountain treks to peaceful cultural journeys  a complete range of travel services across Nepal.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V0C1440 0 1080 60 720 60C360 60 0 0 0 0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all group hover:-translate-y-2 overflow-hidden">
                <div className={`${service.bg} p-6 sm:p-8`}>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{service.title}</h3>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
                        <div className={`w-2 h-2 ${service.badge} rounded-full flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Why Travel With Us</h2>
            <p className="text-navy-300">Decades of local expertise in every journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Star, value: '4.9/5', label: 'Avg. Rating', color: 'bg-brand-400' },
              { icon: Users, value: '10,000+', label: 'Happy Travelers', color: 'bg-crimson-500' },
              { icon: Clock, value: '15+ Years', label: 'Experience', color: 'bg-sky-400' },
              { icon: MapPin, value: '50+ Routes', label: 'Destinations', color: 'bg-brand-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-navy-800 rounded-2xl p-6 text-center border border-navy-700">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-xl mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-navy-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

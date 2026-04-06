import { Award, Users, MapPin, Heart, Star, Shield, Clock, Mountain } from 'lucide-react';

const team = [
  { name: 'Ramesh Shrestha', role: 'Founder & CEO', desc: '20+ years leading treks in Nepal. Everest summiteer and advocate for responsible tourism.', initial: 'R', color: 'bg-navy-700' },
  { name: 'Sunita Tamang', role: 'Head of Operations', desc: 'Expert logistics coordinator ensuring every trip runs smoothly from booking to return.', initial: 'S', color: 'bg-brand-400' },
  { name: 'Bikash Gurung', role: 'Lead Trek Guide', desc: 'Certified mountain guide with expertise in all major trekking routes and a safety-first approach.', initial: 'B', color: 'bg-crimson-500' },
  { name: 'Anita Maharjan', role: 'Cultural Tour Specialist', desc: "Deep knowledge of Nepal's heritage sites, traditions, and languages. Passionate storyteller.", initial: 'A', color: 'bg-sky-400' },
];

const milestones = [
  { year: '2008', event: 'Founded in Kathmandu with a team of 3 passionate guides.', color: 'bg-navy-700' },
  { year: '2012', event: 'Reached 1,000 happy travelers. Expanded to Pokhara and Chitwan.', color: 'bg-brand-400' },
  { year: '2016', event: 'Launched online booking. Became a Government-certified tour operator.', color: 'bg-crimson-500' },
  { year: '2020', event: 'Rebuilt post-pandemic with enhanced safety protocols and virtual tours.', color: 'bg-sky-400' },
  { year: '2024', event: 'Celebrated 10,000+ travelers served across 50+ destinations.', color: 'bg-brand-400' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/40 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-brand-300">Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-navy-300 text-base sm:text-xl max-w-2xl mx-auto">
            Community Tours and Travels  Nepal's trusted adventure partner since 2008.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V0C1440 0 1080 60 720 60C360 60 0 0 0 0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block w-1 h-10 bg-brand-400 rounded-full mr-3 align-middle" />
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-6 inline">Our Mission</h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-5 mt-4">
                We believe travel should transform lives  both those who journey and those who call Nepal home. Our mission is to create meaningful, safe, and responsible travel experiences that connect people with the extraordinary beauty and culture of Nepal.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Every tour we offer is crafted with deep local knowledge, a commitment to sustainability, and genuine care for our travelers. We are not just a tour company  we are your gateway to the Himalayas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, color: 'bg-navy-700', label: 'Govt. Certified' },
                { icon: Shield, color: 'bg-brand-400', label: '100% Safe' },
                { icon: Star, color: 'bg-crimson-500', label: '4.9★ Rated' },
                { icon: Mountain, color: 'bg-sky-400', label: 'Expert Guides' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${item.color}`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-navy-800 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {[
              { value: '15+', label: 'Years of Experience', icon: Clock, color: 'bg-brand-400' },
              { value: '10K+', label: 'Happy Travelers', icon: Users, color: 'bg-crimson-500' },
              { value: '50+', label: 'Tour Destinations', icon: MapPin, color: 'bg-sky-400' },
              { value: '4.9★', label: 'Average Rating', icon: Star, color: 'bg-brand-400' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.color} rounded-2xl mb-4`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-navy-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Meet Our Team</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Experienced locals passionate about sharing Nepal's wonders with the world.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {member.initial}
                </div>
                <h3 className="font-bold text-navy-800 text-lg mb-1">{member.name}</h3>
                <p className="text-brand-400 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Our Journey</h2>
            <p className="text-gray-500 text-base sm:text-lg">From a small Kathmandu startup to Nepal's trusted travel partner.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            {milestones.map((m) => (
              <div key={m.year} className="flex items-start gap-5">
                <div className={`flex-shrink-0 w-16 h-16 ${m.color} text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg`}>
                  {m.year}
                </div>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex-1 hover:shadow-lg transition-all">
                  <p className="text-gray-700 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

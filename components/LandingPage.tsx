import { useState, useEffect } from 'react';
import { Compass, Shield, MapPin, Clock, CheckCircle, Star, Award, Users, Zap, TrendingUp, Phone, Mail, Quote } from 'lucide-react';
import { api } from '../store';
import type { Package, Testimonial } from '../store';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

const diffColor: Record<string, string> = {
  Easy: 'bg-sky-400',
  Moderate: 'bg-brand-400',
  Challenging: 'bg-crimson-500',
  Extreme: 'bg-navy-700',
};

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [featuredPkgs, setFeaturedPkgs] = useState<Package[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    api.getPackages().then(pkgs => setFeaturedPkgs(pkgs.slice(0, 3))).catch(console.error);
    api.getTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-800 to-sky-400/20" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 sm:py-28 lg:py-36 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/40 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-semibold text-brand-300">Nepal's #1 Trusted Tours & Travel Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Journey,
              <span className="block text-brand-400">Our Expertise</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl mb-10 text-navy-200 max-w-2xl mx-auto leading-relaxed">
              Discover handcrafted tour packages led by expert guides. From Himalayan treks to cultural journeys  unforgettable adventures across Nepal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('packages')}
                className="group bg-brand-400 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-500 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Start Your Journey
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="group bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Our Services
                <Compass className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-14 max-w-2xl mx-auto border-t border-white/10 pt-10">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-400 mb-1">200+</div>
                <div className="text-navy-300 text-xs sm:text-sm">Tour Packages</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl sm:text-4xl font-bold text-brand-400 mb-1">10K+</div>
                <div className="text-navy-300 text-xs sm:text-sm">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-400 mb-1">4.9★</div>
                <div className="text-navy-300 text-xs sm:text-sm">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V0C1440 0 1080 60 720 60C360 60 0 0 0 0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Why Thousands Choose Us</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              We're not just another travel platform. We're your trusted Himalayan adventure partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, color: 'bg-navy-700', title: '100% Verified', desc: 'Every tour package is rigorously verified for safety and quality assurance.' },
              { icon: MapPin, color: 'bg-brand-400', title: 'Nationwide', desc: 'Tours across 8+ major destinations from the Himalayas to the Terai plains.' },
              { icon: Clock, color: 'bg-crimson-500', title: 'Instant Booking', desc: 'Book in minutes with instant confirmation and 24/7 customer support.' },
              { icon: CheckCircle, color: 'bg-sky-400', title: 'Best Prices', desc: 'Transparent pricing, no hidden fees, with comprehensive insurance options.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${item.color} rounded-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-navy-800">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-400/10 text-brand-500 px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-brand-400/20">
              <Star className="w-4 h-4" />
              Featured Packages
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Tours You'll Love</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              From gentle cultural walks to epic Himalayan expeditions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPkgs.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2 border border-gray-100">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-navy-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">{pkg.type}</span>
                    <span className={`${diffColor[pkg.difficulty] || 'bg-sky-400'} text-white px-3 py-1 rounded-full text-xs font-semibold shadow`}>{pkg.difficulty}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/95 px-2.5 py-1 rounded-full text-xs font-semibold shadow flex items-center gap-1 text-navy-700">
                      <Shield className="w-3 h-3 text-sky-400" /> Verified
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy-800 mb-1 group-hover:text-brand-400 transition-colors">{pkg.name}</h3>
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration} days</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{pkg.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400">Starting from</div>
                      <div className="font-bold text-navy-800 text-xl">NPR {pkg.price.toLocaleString()}</div>
                    </div>
                    <button onClick={() => onNavigate('packages')} className="bg-brand-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all shadow flex items-center gap-1.5">
                      Book <Compass className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => onNavigate('packages')} className="bg-navy-700 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-navy-800 transition-all shadow-lg inline-flex items-center gap-2">
              View All Packages <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Explore Nepal's Beauty</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">From ancient temples to mountain peaks, adventure awaits</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Kathmandu', desc: 'Cultural Capital', color: 'from-navy-700 to-navy-900' },
              { name: 'Pokhara', desc: 'Trek Gateway', color: 'from-sky-400 to-navy-700' },
              { name: 'Chitwan', desc: 'Wildlife Safari', color: 'from-brand-400 to-brand-600' },
              { name: 'Mustang', desc: 'Hidden Kingdom', color: 'from-navy-700 to-navy-900' },
              { name: 'Lumbini', desc: 'Birth of Buddha', color: 'from-crimson-500 to-navy-800' },
              { name: 'Nagarkot', desc: 'Sunrise Views', color: 'from-sky-400 to-navy-700' },
              { name: 'Lukla (EBC)', desc: 'Everest Gateway', color: 'from-brand-400 to-navy-800' },
              { name: 'Biratnagar', desc: 'Eastern Hub', color: 'from-navy-700 to-navy-900' },
            ].map((loc) => (
              <div
                key={loc.name}
                onClick={() => onNavigate('packages')}
                className={`relative bg-gradient-to-br ${loc.color} p-5 sm:p-7 rounded-2xl text-white cursor-pointer group hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <MapPin className="w-7 h-7 sm:w-9 sm:h-9 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm sm:text-base mb-0.5">{loc.name}</h3>
                <p className="text-white/70 text-xs">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Book in Three Simple Steps</h2>
            <p className="text-navy-300 text-base sm:text-lg">Your next adventure is just minutes away</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: '1', color: 'bg-brand-400', title: 'Choose Your Tour', desc: 'Browse verified tour packages, compare prices, and read reviews from real travelers.' },
              { num: '2', color: 'bg-crimson-500', title: 'Book Instantly', desc: 'Select your dates, number of travelers, and confirm your booking in under 2 minutes.' },
              { num: '3', color: 'bg-sky-400', title: 'Explore Nepal', desc: 'Meet your expert guide and embark on an unforgettable Himalayan journey.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${step.color} text-white rounded-2xl text-2xl font-bold mb-5 shadow-xl`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-navy-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-crimson-500/10 text-crimson-500 px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-crimson-500/20">
              <Star className="w-4 h-4 fill-crimson-500" />
              Traveler Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">What Our Travelers Say</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Over 10,000 happy travelers have explored Nepal with us. Here's what they experienced.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 sm:p-7 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 relative group">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-brand-400/30 absolute top-5 right-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6 italic">
                  "{t.text}"
                </p>

                {/* Tour badge */}
                <div className="inline-flex items-center gap-1.5 bg-navy-700/10 text-navy-700 px-3 py-1 rounded-full text-xs font-semibold mb-5">
                  <Compass className="w-3 h-3" />
                  {t.tour}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className={`w-11 h-11 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-navy-800 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{t.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall rating bar */}
          <div className="mt-12 max-w-sm mx-auto bg-navy-900 rounded-2xl p-6 text-center text-white">
            <div className="text-5xl font-bold text-brand-400 mb-1">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-brand-400 text-brand-400" />)}
            </div>
            <p className="text-navy-300 text-sm">Based on 10,000+ verified reviews</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-navy-800 text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-crimson-500" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-navy-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Join over 10,000 happy travelers who've explored Nepal with Community Tours and Travels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('packages')} className="bg-brand-400 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-500 transition-all shadow-xl inline-flex items-center justify-center gap-2">
              View Packages <Zap className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('contact')} className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
              Contact Us <Mail className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-navy-300 text-sm">
            <a href="tel:+97701-4976661" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-brand-400" /> +977-01-4976661
            </a>
            <a href="mailto:communitytravelservices@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-brand-400" /> communitytravelservices@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

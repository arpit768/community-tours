import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Shield, Star, Compass, Filter } from 'lucide-react';
import { api } from '../store';
import type { Package } from '../store';

const categories = [
  { value: 'all', label: 'All Packages' },
  { value: 'trek', label: 'Trekking' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
];

const difficultyStyle: Record<string, string> = {
  Easy: 'bg-sky-400/10 text-sky-500 border border-sky-400/30',
  Moderate: 'bg-brand-400/10 text-brand-500 border border-brand-400/30',
  Challenging: 'bg-crimson-500/10 text-crimson-500 border border-crimson-500/30',
  Extreme: 'bg-navy-700/10 text-navy-700 border border-navy-700/30',
};

function typeToCategory(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('trek') || t.includes('expedition')) return 'trek';
  if (t.includes('cultural') || t.includes('city') || t.includes('heritage')) return 'cultural';
  if (t.includes('wildlife') || t.includes('safari')) return 'wildlife';
  if (t.includes('pilgrimage')) return 'pilgrimage';
  return 'other';
}

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    api.getPackages().then(setPackages).catch(console.error);
  }, []);

  const filtered = activeCategory === 'all'
    ? packages
    : packages.filter(p => typeToCategory(p.type) === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/40 px-4 py-2 rounded-full mb-6">
            <Compass className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-brand-300">Explore Nepal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Tour Packages</h1>
          <p className="text-navy-300 text-base sm:text-xl max-w-2xl mx-auto">
            Handcrafted adventures for every traveler. Choose your perfect Nepal experience.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V0C1440 0 1080 60 720 60C360 60 0 0 0 0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Filter */}
      <section className="py-4 bg-white border-b-2 border-navy-100 sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-navy-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat.value
                    ? 'bg-navy-700 text-white shadow'
                    : 'bg-gray-100 text-navy-600 hover:bg-navy-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {filtered.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2 border border-gray-100">
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-navy-700 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow">{pkg.type}</span>
                    <div className="flex items-center gap-1 bg-white/95 px-2 py-1 rounded-full text-[10px] font-bold shadow">
                      <Star className="w-3 h-3 fill-brand-400 text-brand-400" />4.8
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${difficultyStyle[pkg.difficulty] ?? ''}`}>{pkg.difficulty}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-navy-800 text-base mb-1 group-hover:text-brand-400 transition-colors line-clamp-1">{pkg.name}</h3>
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /><span className="truncate">{pkg.location}</span></span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}d</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Max 12</span>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{pkg.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400">From</div>
                      <div className="font-bold text-navy-800 text-lg">NPR {pkg.price.toLocaleString()}</div>
                    </div>
                    <button className="bg-brand-400 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-500 transition-all shadow flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">No packages found in this category.</div>
          )}
        </div>
      </section>
    </div>
  );
}

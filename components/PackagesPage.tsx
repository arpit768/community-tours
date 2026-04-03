import { useState } from 'react';
import { MapPin, Clock, Users, Shield, Star, Compass, Filter } from 'lucide-react';

const packages = [
  { id: 1, name: 'Everest Base Camp Trek', type: 'Adventure Trek', price: 45000, location: 'Khumbu, Solukhumbu', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', difficulty: 'Challenging', duration: 14, maxGroup: 12, rating: 4.9, desc: "The ultimate trekking adventure to the foot of the world's highest mountain. Breathtaking Himalayan scenery and rich Sherpa culture.", category: 'trek' },
  { id: 2, name: 'Annapurna Circuit', type: 'Adventure Trek', price: 38000, location: 'Annapurna, Gandaki', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', difficulty: 'Moderate', duration: 12, maxGroup: 15, rating: 4.8, desc: 'A classic circuit trek with incredible mountain views, diverse landscapes, and rich cultural encounters.', category: 'trek' },
  { id: 3, name: 'Kathmandu Valley Heritage Tour', type: 'Cultural Tour', price: 12000, location: 'Kathmandu Valley', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600', difficulty: 'Easy', duration: 3, maxGroup: 20, rating: 4.7, desc: 'Explore ancient temples, royal palaces, and vibrant bazaars of the UNESCO-listed Kathmandu Valley.', category: 'cultural' },
  { id: 4, name: 'Chitwan Wildlife Safari', type: 'Wildlife Safari', price: 18000, location: 'Chitwan National Park', image: 'https://images.unsplash.com/photo-1504173010664-32509107de4e?w=600', difficulty: 'Easy', duration: 4, maxGroup: 10, rating: 4.8, desc: 'Jeep safaris and canoe rides through Chitwan National Park. Spot rhinos, tigers, and hundreds of bird species.', category: 'wildlife' },
  { id: 5, name: 'Langtang Valley Trek', type: 'Adventure Trek', price: 28000, location: 'Langtang, Rasuwa', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', difficulty: 'Moderate', duration: 9, maxGroup: 14, rating: 4.7, desc: 'A beautiful valley trek offering stunning Himalayan views and a close encounter with Tamang culture.', category: 'trek' },
  { id: 6, name: 'Lumbini Pilgrimage Tour', type: 'Pilgrimage', price: 15000, location: 'Lumbini, Rupandehi', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', difficulty: 'Easy', duration: 3, maxGroup: 25, rating: 4.6, desc: 'Visit the birthplace of Lord Buddha and explore the sacred monasteries and peace gardens of Lumbini.', category: 'pilgrimage' },
  { id: 7, name: 'Upper Mustang Expedition', type: 'Mountain Expedition', price: 75000, location: 'Mustang, Gandaki', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', difficulty: 'Challenging', duration: 16, maxGroup: 8, rating: 4.9, desc: 'Explore the ancient kingdom of Lo and its dramatic landscape of red cliffs, caves, and medieval monasteries.', category: 'trek' },
  { id: 8, name: 'Pokhara City & Lake Tour', type: 'City Tour', price: 8000, location: 'Pokhara, Gandaki', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600', difficulty: 'Easy', duration: 2, maxGroup: 20, rating: 4.6, desc: "Boat rides on Phewa Lake, sunrise views of the Annapurna range from Sarangkot, and Pokhara's vibrant lakeside.", category: 'cultural' },
];

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

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? packages : packages.filter((p) => p.category === activeCategory);

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
                      <Star className="w-3 h-3 fill-brand-400 text-brand-400" />{pkg.rating}
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
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Max {pkg.maxGroup}</span>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{pkg.desc}</p>
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
        </div>
      </section>
    </div>
  );
}

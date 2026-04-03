// Shared localStorage data layer — connects admin panel with contact/booking forms

export interface Package {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: number;
  difficulty: string;
  location: string;
  description: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
}

export interface Inquiry {
  id: string;
  type: 'contact' | 'booking';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  package?: string;
  destination?: string;
  travelDate?: string;
  travelers?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

const DEFAULT_PACKAGES: Package[] = [
  { id: '1', name: 'Everest Base Camp Trek', type: 'Adventure Trek', price: 45000, duration: 14, difficulty: 'Challenging', location: 'Khumbu, Solukhumbu', description: "The ultimate trekking adventure to the base of the world's highest mountain.", image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { id: '2', name: 'Annapurna Circuit', type: 'Adventure Trek', price: 38000, duration: 12, difficulty: 'Moderate', location: 'Annapurna, Gandaki', description: 'A classic circuit trek with incredible mountain views and rich cultural encounters.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600' },
  { id: '3', name: 'Kathmandu Valley Heritage Tour', type: 'Cultural Tour', price: 12000, duration: 3, difficulty: 'Easy', location: 'Kathmandu Valley', description: 'Explore ancient temples, royal palaces, and vibrant bazaars.', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600' },
  { id: '4', name: 'Chitwan Wildlife Safari', type: 'Wildlife Safari', price: 18000, duration: 4, difficulty: 'Easy', location: 'Chitwan National Park', description: 'Jeep safaris and canoe rides through Chitwan National Park.', image: 'https://images.unsplash.com/photo-1504173010664-32509107de4e?w=600' },
  { id: '5', name: 'Langtang Valley Trek', type: 'Adventure Trek', price: 28000, duration: 9, difficulty: 'Moderate', location: 'Langtang, Rasuwa', description: 'A beautiful valley trek with stunning Himalayan views and Tamang culture.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600' },
  { id: '6', name: 'Lumbini Pilgrimage Tour', type: 'Pilgrimage', price: 15000, duration: 3, difficulty: 'Easy', location: 'Lumbini, Rupandehi', description: 'Visit the birthplace of Lord Buddha and the sacred monasteries.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
  { id: '7', name: 'Upper Mustang Expedition', type: 'Mountain Expedition', price: 75000, duration: 16, difficulty: 'Challenging', location: 'Mustang, Gandaki', description: 'Explore the ancient kingdom of Lo and its dramatic landscape.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600' },
  { id: '8', name: 'Pokhara City & Lake Tour', type: 'City Tour', price: 8000, duration: 2, difficulty: 'Easy', location: 'Pokhara, Gandaki', description: "Boat rides on Phewa Lake and sunrise views from Sarangkot.", image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600' },
];

const DEFAULT_DESTINATIONS: Destination[] = [
  { id: '1', name: 'Kathmandu', region: 'Bagmati Province' },
  { id: '2', name: 'Pokhara', region: 'Gandaki Province' },
  { id: '3', name: 'Chitwan', region: 'Bagmati Province' },
  { id: '4', name: 'Mustang', region: 'Gandaki Province' },
  { id: '5', name: 'Lumbini', region: 'Lumbini Province' },
  { id: '6', name: 'Nagarkot', region: 'Bagmati Province' },
  { id: '7', name: 'Lukla / EBC', region: 'Koshi Province' },
  { id: '8', name: 'Biratnagar', region: 'Koshi Province' },
  { id: '9', name: 'Langtang', region: 'Bagmati Province' },
  { id: '10', name: 'Annapurna Region', region: 'Gandaki Province' },
  { id: '11', name: 'Manaslu Circuit', region: 'Gandaki Province' },
  { id: '12', name: 'Ilam', region: 'Koshi Province' },
];

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  tour: string;
  text: string;
  rating: number;
  avatar: string;   // single letter
  color: string;    // tailwind bg class
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sarah Johnson', country: 'United Kingdom', tour: 'Everest Base Camp Trek', text: "Absolutely life-changing! The guides were incredibly knowledgeable and caring. Community Tours handled every detail perfectly — I never felt unsafe even at high altitude. I'll be back for Annapurna next year!", rating: 5, avatar: 'S', color: 'bg-brand-400' },
  { id: '2', name: 'Rajesh Sharma', country: 'India', tour: 'Kathmandu Cultural Tour', text: 'The Kathmandu heritage tour exceeded all expectations. Our guide Sunita knew every story behind every temple. Booking was smooth and the team was responsive to every question. Highly recommended!', rating: 5, avatar: 'R', color: 'bg-sky-400' },
  { id: '3', name: 'Emma Wilson', country: 'Australia', tour: 'Annapurna Circuit', text: 'As a solo female traveller I was nervous, but Community Tours made me feel completely safe and included. The teahouses, the scenery, the entire experience was beyond words. Thank you!', rating: 5, avatar: 'E', color: 'bg-crimson-500' },
  { id: '4', name: 'Hiroshi Tanaka', country: 'Japan', tour: 'Chitwan Wildlife Safari', text: 'Saw rhinos, crocodiles, and even a tiger on our jeep safari! The naturalist guide was exceptional. Perfect organisation from start to finish. Will definitely recommend to friends.', rating: 5, avatar: 'H', color: 'bg-navy-700' },
  { id: '5', name: 'Maria Garcia', country: 'Spain', tour: 'Langtang Valley Trek', text: 'The Langtang valley is a hidden gem and Community Tours showed us its best side. Small group, great pace, stunning views and wonderful local food. A perfect week in the mountains.', rating: 5, avatar: 'M', color: 'bg-brand-400' },
  { id: '6', name: 'David Chen', country: 'Canada', tour: 'Lumbini Pilgrimage', text: "A deeply moving and spiritual experience. The guide's knowledge of Buddhist history made every site come alive. Flawless logistics and genuine hospitality throughout.", rating: 5, avatar: 'D', color: 'bg-sky-400' },
];

const KEYS = {
  packages: 'ctt_packages',
  destinations: 'ctt_destinations',
  inquiries: 'ctt_inquiries',
  testimonials: 'ctt_testimonials',
};

function seed<T>(key: string, defaults: T[]): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(raw) as T[];
}

export const store = {
  getPackages: (): Package[] => seed(KEYS.packages, DEFAULT_PACKAGES),
  savePackages: (data: Package[]) => localStorage.setItem(KEYS.packages, JSON.stringify(data)),

  getDestinations: (): Destination[] => seed(KEYS.destinations, DEFAULT_DESTINATIONS),
  saveDestinations: (data: Destination[]) => localStorage.setItem(KEYS.destinations, JSON.stringify(data)),

  getInquiries: (): Inquiry[] => {
    const raw = localStorage.getItem(KEYS.inquiries);
    return raw ? (JSON.parse(raw) as Inquiry[]) : [];
  },
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => {
    const all = store.getInquiries();
    const newItem: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    localStorage.setItem(KEYS.inquiries, JSON.stringify([newItem, ...all]));
    return newItem;
  },
  saveInquiries: (data: Inquiry[]) => localStorage.setItem(KEYS.inquiries, JSON.stringify(data)),

  getTestimonials: (): Testimonial[] => seed(KEYS.testimonials, DEFAULT_TESTIMONIALS),
  saveTestimonials: (data: Testimonial[]) => localStorage.setItem(KEYS.testimonials, JSON.stringify(data)),
};

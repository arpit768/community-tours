import { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Compass, Send, CheckCircle, Phone, Mail, Clock } from 'lucide-react';
import { api } from '../store';
import type { Package, Destination } from '../store';

export default function BookNowPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', package: '', destination: '',
    travelDate: '', travelers: '1', message: '',
  });

  useEffect(() => {
    api.getPackages().then(setPackages).catch(console.error);
    api.getDestinations().then(setDestinations).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.package || !form.destination || !form.travelDate) {
      alert('Please fill in all required fields');
      return;
    }
    api.submitInquiry({ type: 'booking', ...form }).then(() => setSubmitted(true)).catch(() => alert('Failed to submit. Please try again.'));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-brand-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Booking Request Sent!</h2>
          <p className="text-gray-500 mb-6">Thank you, <strong>{form.name}</strong>! Our team will contact you within 24 hours to confirm your booking details.</p>
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-6 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Package</span><span className="font-semibold text-navy-700">{form.package}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Destination</span><span className="font-semibold text-navy-700">{form.destination}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Travel Date</span><span className="font-semibold text-navy-700">{form.travelDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Travelers</span><span className="font-semibold text-navy-700">{form.travelers}</span></div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',package:'',destination:'',travelDate:'',travelers:'1',message:'' }); }}
            className="bg-brand-400 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-500 transition-all w-full"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/40 px-4 py-2 rounded-full mb-5">
            <Compass className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-brand-300">Plan Your Adventure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">Book Your Tour</h1>
          <p className="text-navy-300 text-base sm:text-lg max-w-xl mx-auto">
            Fill in your details below and our team will craft the perfect Nepal itinerary for you within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-navy-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-brand-400 mb-4 uppercase text-xs tracking-wider">Why Book With Us</h3>
              <ul className="space-y-3 text-sm text-navy-200">
                {['Government-certified guides','100% transparent pricing','Free itinerary customisation','24/7 support during your trip','Flexible cancellation policy'].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 space-y-4">
              <h3 className="font-bold text-navy-800">Quick Contact</h3>
              <a href="tel:+97701-4976661" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-400 transition-colors">
                <div className="w-9 h-9 bg-brand-400/10 rounded-xl flex items-center justify-center"><Phone className="w-4 h-4 text-brand-400" /></div>
                +977-01-4976661
              </a>
              <a href="tel:+9779851416661" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-400 transition-colors">
                <div className="w-9 h-9 bg-brand-400/10 rounded-xl flex items-center justify-center"><Phone className="w-4 h-4 text-brand-400" /></div>
                +977-9851416661
              </a>
              <a href="mailto:communitytravelservices@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-400 transition-colors">
                <div className="w-9 h-9 bg-crimson-500/10 rounded-xl flex items-center justify-center"><Mail className="w-4 h-4 text-crimson-500" /></div>
                communitytravelservices@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-9 h-9 bg-sky-400/10 rounded-xl flex items-center justify-center"><Clock className="w-4 h-4 text-sky-400" /></div>
                Sun–Fri: 9 AM – 6 PM NPT
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-1">Booking Inquiry Form</h2>
            <p className="text-gray-400 text-sm mb-7">All fields marked * are required</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Full Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Phone / WhatsApp</label>
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+977 or international number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
              </div>

              {/* Package & Destination dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-brand-400" /> Select Package *
                  </label>
                  <select value={form.package} onChange={e => setForm({...form, package: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                    <option value="">-- Choose a package --</option>
                    {packages.map(p => (
                      <option key={p.id} value={p.name}>{p.name} (NPR {p.price.toLocaleString()})</option>
                    ))}
                    <option value="Custom">Custom / Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-crimson-500" /> Destination *
                  </label>
                  <select value={form.destination} onChange={e => setForm({...form, destination: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                    <option value="">-- Choose destination --</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.name}>{d.name}  {d.region}</option>
                    ))}
                    <option value="Multiple">Multiple destinations</option>
                  </select>
                </div>
              </div>

              {/* Travel Date & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-400" /> Preferred Travel Date *
                  </label>
                  <input type="date" value={form.travelDate} onChange={e => setForm({...form, travelDate: e.target.value})} min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-navy-500" /> Number of Travelers
                  </label>
                  <select value={form.travelers} onChange={e => setForm({...form, travelers: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                    {['1','2','3','4','5','6','7','8','9','10','10+'].map(n => <option key={n} value={n}>{n} {n==='1'?'person':'people'}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Additional Message</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4}
                  placeholder="Tell us about special requirements, fitness level, budget, or anything else..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors resize-none" />
              </div>

              <button type="submit"
                className="w-full bg-brand-400 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-500 transition-all shadow-lg flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Booking Request
              </button>
              <p className="text-center text-xs text-gray-400">We respond within 24 hours · No payment required at this stage</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

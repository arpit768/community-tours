import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, ChevronDown, ChevronUp, Compass } from 'lucide-react';
import { api } from '../store';
import type { Package, Destination } from '../store';

const faqs = [
  { q: 'How do I book a tour with Community Tours and Travels?', a: 'You can book directly through our website by selecting your desired package and filling the inquiry form, or contact us via phone/email. Our team will confirm availability and send you a booking confirmation within 24 hours.' },
  { q: 'What is included in your tour packages?', a: 'Most packages include accommodation (teahouses or hotels depending on the route), meals (breakfast + dinner on treks), an experienced guide, a porter, all required trekking permits, and airport transfers. Flights, personal gear, and travel insurance are not included unless specified.' },
  { q: 'Do I need travel insurance for trekking in Nepal?', a: 'Yes, we strongly recommend comprehensive travel insurance that covers high-altitude trekking and emergency helicopter evacuation. We can help arrange suitable insurance if needed.' },
  { q: 'What is your cancellation and refund policy?', a: 'Cancellations made 30+ days before departure receive a full refund minus a 10% administrative fee. 15–29 days: 50% refund. Within 14 days: no refund. We recommend trip cancellation insurance for peace of mind.' },
  { q: 'What is the best time to trek in Nepal?', a: 'The best trekking seasons are spring (March–May) and autumn (September–November). Both offer stable weather, clear mountain views, and moderate temperatures. Winter treks are possible at lower altitudes.' },
  { q: 'Are your guides certified and experienced?', a: 'All our guides are government-licensed, certified by the Nepal Tourism Board, and trained in wilderness first aid. Most have 10+ years of experience leading treks in the Himalayan region.' },
  { q: 'Can you arrange custom or private tours?', a: "Yes! We specialise in tailored itineraries for individuals, families, and corporate groups. Contact us with your interests, dates, and group size and we'll design the perfect Nepal experience for you." },
  { q: 'How physically fit do I need to be for trekking?', a: 'Easy-rated tours require minimal fitness. Moderate treks need regular walking stamina. Challenging routes like EBC require serious preparation  we recommend starting training 3 months in advance.' },
];

export default function ContactUsPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '', package: '', destination: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    api.getPackages().then(setPackages).catch(console.error);
    api.getDestinations().then(setDestinations).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert('Please fill in all required fields');
      return;
    }
    api.submitInquiry({ type: 'contact', ...form }).then(() => setSubmitted(true)).catch(() => alert('Failed to send. Please try again.'));
  };

  const contactInfo = [
    { icon: MapPin, label: 'Office Address', value: 'Thapathali-11, Kathmandu, Nepal (Beside Trade Tower Building)', color: 'bg-navy-700 text-white' },
    { icon: Phone, label: 'Phone / Mobile', value: '+977-01-4976661 | +977-9851416661', href: 'tel:+97701-4976661', color: 'bg-brand-400 text-white' },
    { icon: Mail, label: 'Email', value: 'communitytravelservices@gmail.com', href: 'mailto:communitytravelservices@gmail.com', color: 'bg-crimson-500 text-white' },
    { icon: Clock, label: 'Office Hours', value: 'Sun–Fri: 9:00 AM – 6:00 PM (NPT)', color: 'bg-sky-400 text-white' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-400/20 border border-brand-400/40 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">Contact Us</h1>
              <p className="text-navy-300 text-sm sm:text-base mt-1">We'd love to hear from you  let's plan your Nepal adventure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info + Form */}
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-navy-800 font-semibold hover:text-brand-400 transition-colors text-sm">{item.value}</a>
                    ) : (
                      <p className="text-navy-800 font-semibold text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-navy-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-brand-400 mb-3 text-sm">More Numbers</h3>
              <div className="space-y-2">
                {['+977-9868006661', '+977-9802006661', '+977-9705006661', '+977-9705006662'].map(num => (
                  <a key={num} href={`tel:${num.replace(/-/g,'')}`} className="flex items-center gap-2 text-sm text-navy-200 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" /> {num}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-brand-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-brand-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-800 mb-2">Message Sent!</h2>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',subject:'',package:'',destination:'',message:'' }); }}
                    className="bg-brand-400 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-500 transition-all">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-navy-800">Send us a Message</h2>
                    <p className="text-gray-400 text-sm mt-1">We'll get back to you within 24 hours</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">Your Name *</label>
                        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address *</label>
                        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors" />
                      </div>
                    </div>

                    {/* Package & Destination dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-brand-400" /> Interested Package
                        </label>
                        <select value={form.package} onChange={e => setForm({...form, package: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                          <option value="">-- Select a package --</option>
                          {packages.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-crimson-500" /> Preferred Destination
                        </label>
                        <select value={form.destination} onChange={e => setForm({...form, destination: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                          <option value="">-- Select destination --</option>
                          {destinations.map(d => <option key={d.id} value={d.name}>{d.name}  {d.region}</option>)}
                          <option value="Multiple / Flexible">Multiple / Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Subject *</label>
                      <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors appearance-none bg-white">
                        <option value="">Select a topic</option>
                        <option value="Booking Inquiry">Booking Inquiry</option>
                        <option value="Tour Information">Tour Information</option>
                        <option value="Custom Itinerary">Custom Itinerary</option>
                        <option value="Payment Issue">Payment Issue</option>
                        <option value="Cancellation Request">Cancellation Request</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Business Partnership">Business Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">Message *</label>
                      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-navy-700 transition-colors resize-none" />
                    </div>

                    <button type="submit" className="bg-brand-400 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-500 transition-all shadow-lg flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-400/10 text-brand-500 px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-brand-400/20">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Got Questions? We've Got Answers.</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to know before booking your Nepal adventure.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-navy-200 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-semibold text-navy-800 text-sm sm:text-base">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-brand-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm mb-4">Still have questions? We're happy to help.</p>
            <a href="mailto:communitytravelservices@gmail.com"
              className="inline-flex items-center gap-2 bg-navy-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-md">
              <Mail className="w-4 h-4" /> Email Us Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft, Search, BookOpen, CreditCard, User, XCircle } from 'lucide-react';

interface HelpCenterPageProps {
  onBack: () => void;
}

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  icon: React.ElementType;
  title: string;
  color: string;
  items: FAQItem[];
}

export default function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: FAQCategory[] = [
    {
      icon: BookOpen,
      title: 'Booking & Tours',
      color: 'bg-blue-100 text-blue-600',
      items: [
        { q: 'How do I book a tour?', a: 'Browse available tours from your dashboard, select a tour package, choose your dates, number of travelers, and confirm your booking. You will receive a confirmation once the booking is reviewed.' },
        { q: 'Can I book a tour for someone else?', a: 'Yes, you can book a tour and specify the traveler details during the booking process. The booking will be linked to your account.' },
        { q: 'How far in advance should I book?', a: 'We recommend booking at least 2 weeks in advance for popular trekking tours. Cultural and city tours can be booked with shorter notice.' },
        { q: 'What happens after I submit a booking?', a: 'Your booking status will show as "PENDING". Our staff will review and confirm your booking, usually within 24 hours. You will see the status update on your bookings page.' },
        { q: 'Can I modify my booking dates?', a: 'Please contact our support team to modify booking dates. Changes are subject to availability and may incur a small fee if made less than 7 days before departure.' },
      ],
    },
    {
      icon: CreditCard,
      title: 'Payments & Pricing',
      color: 'bg-green-100 text-green-600',
      items: [
        { q: 'What payment methods do you accept?', a: 'We accept bank transfers, eSewa, Khalti, and cash payments at our Kathmandu office. International travelers can pay via bank wire transfer.' },
        { q: 'Is there a booking deposit?', a: 'Yes, a 30% deposit is required at the time of booking confirmation. The remaining balance is due 7 days before the tour start date.' },
        { q: 'Are there any hidden fees?', a: 'No. All prices shown include guide fees, permits, and accommodations as listed in the tour inclusions. Travel insurance and personal expenses are additional.' },
        { q: 'How do refunds work?', a: 'Refunds depend on cancellation timing: full refund if cancelled 14+ days before departure, 50% refund for 7-14 days, and no refund for less than 7 days.' },
      ],
    },
    {
      icon: User,
      title: 'Account & Profile',
      color: 'bg-purple-100 text-purple-600',
      items: [
        { q: 'How do I create an account?', a: 'Click "Sign Up" on the login page, enter your name, email, and password. You will be registered as a Traveler. Staff accounts are created by administrators.' },
        { q: 'I forgot my password. What do I do?', a: 'Please contact our support team at hello@communitytours.com with your registered email to reset your password.' },
        { q: 'Can I change my account type?', a: 'Account types (Traveler, Staff, Admin) are managed by administrators. Contact support if you need a role change.' },
        { q: 'How do I update my profile information?', a: 'Visit your profile page from the navigation menu. You can view your account details, booking history, and statistics.' },
      ],
    },
    {
      icon: XCircle,
      title: 'Cancellation & Refunds',
      color: 'bg-red-100 text-red-600',
      items: [
        { q: 'How do I cancel a booking?', a: 'Contact our support team with your booking ID. Cancellation requests are processed within 2 business days.' },
        { q: 'What is the cancellation policy?', a: '14+ days before departure: Full refund. 7-14 days: 50% refund. Less than 7 days: No refund. Travel insurance cancellation benefits may apply separately.' },
        { q: 'What if the tour is cancelled by the operator?', a: 'If we cancel a tour due to weather, safety, or other reasons, you will receive a full refund or the option to reschedule at no extra cost.' },
        { q: 'How long does a refund take?', a: 'Refunds are processed within 7-10 business days after the cancellation is approved. Bank transfers may take an additional 2-3 days.' },
      ],
    },
  ];

  const allFAQs = categories.flatMap((cat, catIdx) =>
    cat.items.map((item, itemIdx) => ({
      ...item,
      key: `${catIdx}-${itemIdx}`,
      category: cat.title,
    }))
  );

  const filteredFAQs = searchQuery
    ? allFAQs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
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
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Help Center</h1>
              <p className="text-blue-200 text-sm sm:text-base mt-1">Find answers to common questions</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* Search Results */}
        {filteredFAQs ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </h2>
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No results found. Try different keywords or contact support.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFAQs.map((faq) => (
                  <div key={faq.key} className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-blue-600 font-medium mb-1">{faq.category}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Category-based FAQ */
          <div className="space-y-6">
            {categories.map((cat, catIdx) => (
              <div key={cat.title} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isOpen = openIndex === key;

                      return (
                        <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : key)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900 text-sm sm:text-base pr-4">{item.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">{item.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still need help */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-blue-100 mb-6 text-sm sm:text-base">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@communitytours.com" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
              Email Support
            </a>
            <a href="tel:+97714567890" className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
              Call +977-1-4567890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

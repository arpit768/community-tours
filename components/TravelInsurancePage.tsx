import { Shield, CheckCircle, ArrowLeft, Heart, AlertTriangle, Star } from 'lucide-react';

interface TravelInsurancePageProps {
  onBack: () => void;
}

export default function TravelInsurancePage({ onBack }: TravelInsurancePageProps) {
  const plans = [
    {
      name: 'Basic',
      price: 500,
      color: 'from-blue-500 to-blue-600',
      badge: '',
      features: [
        'Medical coverage up to NPR 200,000',
        'Emergency evacuation',
        'Trip cancellation (50% refund)',
        '24/7 helpline access',
      ],
    },
    {
      name: 'Standard',
      price: 800,
      color: 'from-blue-600 to-blue-700',
      badge: 'Most Popular',
      features: [
        'Medical coverage up to NPR 500,000',
        'Emergency helicopter evacuation',
        'Trip cancellation (80% refund)',
        'Lost baggage compensation',
        '24/7 helpline access',
        'Adventure sports coverage',
      ],
    },
    {
      name: 'Premium',
      price: 1500,
      color: 'from-blue-700 to-blue-900',
      badge: 'Best Value',
      features: [
        'Medical coverage up to NPR 1,000,000',
        'Emergency helicopter evacuation',
        'Full trip cancellation refund',
        'Lost baggage compensation',
        '24/7 dedicated helpline',
        'Adventure sports coverage',
        'Flight delay compensation',
        'Personal liability coverage',
      ],
    },
  ];

  const coverageItems = [
    { icon: Heart, title: 'Medical Emergencies', desc: 'Hospital bills, doctor visits, and medication costs during your trip.' },
    { icon: AlertTriangle, title: 'Trip Cancellation', desc: 'Get refunded if you need to cancel due to illness, family emergency, or natural disasters.' },
    { icon: Shield, title: 'Emergency Evacuation', desc: 'Helicopter rescue and medical evacuation from remote trekking locations.' },
    { icon: Star, title: 'Lost Baggage', desc: 'Compensation for lost, stolen, or damaged luggage during transit.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
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
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Travel Insurance</h1>
              <p className="text-blue-200 text-sm sm:text-base mt-1">Protect your journey with comprehensive coverage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {/* What's Covered */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">What's Covered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageItems.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Plans */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg border ${plan.badge === 'Most Popular' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all`}
            >
              <div className={`bg-gradient-to-r ${plan.color} text-white p-6`}>
                {plan.badge && (
                  <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">NPR {plan.price}</span>
                  <span className="text-white/70 text-sm">/person</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg">
                  Select {plan.name} Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'When does coverage start?', a: 'Coverage begins from the moment your booked tour starts and ends when the tour is completed.' },
              { q: 'Can I add insurance after booking?', a: 'Yes, you can add insurance to an existing booking up to 24 hours before the tour departure date.' },
              { q: 'How do I file a claim?', a: 'Contact our 24/7 helpline or visit the Help Center. Claims must be filed within 30 days of the incident with supporting documentation.' },
              { q: 'Is trekking above 5,000m covered?', a: 'Yes, the Standard and Premium plans cover high-altitude trekking including emergency helicopter evacuation.' },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

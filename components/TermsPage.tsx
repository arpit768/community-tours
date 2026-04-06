import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-400/20 border border-brand-400/40 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">Terms & Conditions</h1>
              <p className="text-navy-300 text-sm sm:text-base mt-1">Last updated: April 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the services provided by Community Travels Services Pvt. Ltd. ("Company", "we", "us"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">2. Services</h2>
            <p>Community Travels Services provides tour packages, trekking expeditions, cultural tours, wildlife safaris, and related travel services within Nepal. All tours are subject to availability and may be modified due to weather, government regulations, or safety considerations.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">3. Booking & Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All bookings must be made through our website, email, or by visiting our office in Thapathali-11, Kathmandu.</li>
              <li>A non-refundable deposit of 25% of the total tour cost is required to confirm your booking.</li>
              <li>The remaining balance must be paid at least 14 days before the tour departure date.</li>
              <li>Prices are quoted in Nepalese Rupees (NPR) and are subject to change without prior notice until booking is confirmed.</li>
              <li>We accept bank transfers, cash, and major online payment methods as available.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">4. Travel Documents & Insurance</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clients are responsible for obtaining valid passports, visas, and any required trekking permits not included in the package.</li>
              <li>We strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellation, and high-altitude evacuation.</li>
              <li>Community Travels Services is not liable for any loss arising from inadequate travel documentation or insurance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">5. Health & Safety</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clients must disclose any pre-existing medical conditions at the time of booking.</li>
              <li>Our guides reserve the right to alter itineraries or evacuate clients for safety reasons, including but not limited to altitude sickness, adverse weather, or natural disasters.</li>
              <li>Clients participate in all activities at their own risk and must follow guide instructions at all times.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">6. Liability</h2>
            <p>Community Travels Services acts as an agent for hotels, airlines, transport providers, and other third-party services. We are not liable for any injury, loss, damage, delay, or irregularity caused by the actions or defaults of these third parties, or by events beyond our reasonable control (force majeure).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">7. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and design elements, is the property of Community Travels Services Pvt. Ltd. and is protected by copyright laws. Unauthorized reproduction or distribution is prohibited.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">8. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">9. Contact</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>Community Travels Services Pvt. Ltd.</strong></p>
              <p>Thapathali-11, Kathmandu, Nepal</p>
              <p>Phone: +977-01-4976661 | +977-9851416661</p>
              <p>Email: <a href="mailto:communitytravelservices@gmail.com" className="text-brand-400 hover:underline">communitytravelservices@gmail.com</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

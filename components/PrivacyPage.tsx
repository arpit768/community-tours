import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-sky-400/20 border border-sky-400/40 rounded-2xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-sky-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-navy-300 text-sm sm:text-base mt-1">Last updated: April 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">1. Information We Collect</h2>
            <p>When you use our website or book a tour, we may collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Personal Details:</strong> Full name, email address, phone number, nationality, and passport details (when required for permits).</li>
              <li><strong>Booking Information:</strong> Tour preferences, travel dates, number of travelers, dietary requirements, and health disclosures.</li>
              <li><strong>Communication Data:</strong> Messages sent through our contact forms, email correspondence, and phone inquiries.</li>
              <li><strong>Technical Data:</strong> Browser type, IP address, and basic usage analytics for improving our website experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and confirm your tour bookings and inquiries.</li>
              <li>To communicate with you about your trip, including itinerary updates and safety information.</li>
              <li>To arrange necessary permits, accommodation, and transportation on your behalf.</li>
              <li>To respond to your questions and provide customer support.</li>
              <li>To improve our services and website based on usage patterns.</li>
              <li>To comply with legal and regulatory requirements of Nepal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">3. Data Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Service Partners:</strong> Hotels, airlines, and local transport providers necessary to fulfill your booking.</li>
              <li><strong>Government Authorities:</strong> Immigration, trekking permit offices, and national park authorities as required by Nepalese law.</li>
              <li><strong>Emergency Services:</strong> In the event of a medical or safety emergency during your tour.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, typically for a period of 3 years after your last interaction with us, or as required by law.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of any inaccurate or incomplete data.</li>
              <li>Request deletion of your personal data, subject to legal retention requirements.</li>
              <li>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:communitytravelservices@gmail.com" className="text-brand-400 hover:underline">communitytravelservices@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">7. Cookies</h2>
            <p>Our website uses essential cookies to maintain session functionality (such as admin authentication). We do not use third-party tracking cookies or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">9. Contact</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
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

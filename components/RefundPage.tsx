import { RotateCcw } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-crimson-500" />
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-crimson-500/20 border border-crimson-500/40 rounded-2xl flex items-center justify-center">
              <RotateCcw className="w-7 h-7 text-crimson-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">Refund & Cancellation Policy</h1>
              <p className="text-navy-300 text-sm sm:text-base mt-1">Last updated: April 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">1. Cancellation by the Client</h2>
            <p className="mb-4">All cancellation requests must be submitted in writing via email to <a href="mailto:communitytravelservices@gmail.com" className="text-brand-400 hover:underline">communitytravelservices@gmail.com</a>. The following refund schedule applies based on the date of cancellation relative to the tour departure date:</p>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-navy-700 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Cancellation Period</th>
                    <th className="px-4 py-3 text-left font-semibold">Refund Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">More than 30 days before departure</td>
                    <td className="px-4 py-3 font-semibold text-navy-800">90% refund (10% admin fee retained)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">15 to 29 days before departure</td>
                    <td className="px-4 py-3 font-semibold text-brand-500">50% refund</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">7 to 14 days before departure</td>
                    <td className="px-4 py-3 font-semibold text-brand-500">25% refund</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Less than 7 days before departure</td>
                    <td className="px-4 py-3 font-semibold text-crimson-500">No refund</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">No-show / after departure</td>
                    <td className="px-4 py-3 font-semibold text-crimson-500">No refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">2. Cancellation by the Company</h2>
            <p>Community Travels Services reserves the right to cancel or modify a tour due to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Insufficient number of participants (minimum group size not met).</li>
              <li>Adverse weather conditions, natural disasters, or safety concerns.</li>
              <li>Government restrictions, political unrest, or force majeure events.</li>
            </ul>
            <p className="mt-3">In such cases, clients will be offered a full refund or the option to reschedule at no additional cost.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">3. Itinerary Changes</h2>
            <p>Due to the nature of adventure travel in Nepal, itineraries may be altered for safety or logistical reasons. Minor route changes, accommodation swaps, or schedule adjustments do not qualify for a refund. If significant changes are necessary, we will notify you as soon as possible and offer reasonable alternatives.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">4. Refund Process</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Approved refunds will be processed within 15 business days of the cancellation request.</li>
              <li>Refunds will be issued via the original payment method (bank transfer or other).</li>
              <li>Any bank charges or currency conversion fees incurred during the refund process will be borne by the client.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">5. Travel Insurance</h2>
            <p>We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and high-altitude evacuation. This can protect your investment in case of unforeseen circumstances. Community Travels Services is not responsible for any losses not covered by your insurance policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">6. Rescheduling</h2>
            <p>Clients may reschedule their tour once at no extra charge if the request is made at least 30 days before departure. Rescheduling within 30 days of departure is subject to availability and may incur additional charges depending on the new dates and availability of services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">7. Disputes</h2>
            <p>Any disputes regarding refunds or cancellations will be resolved amicably through direct communication. If a resolution cannot be reached, disputes will be subject to the jurisdiction of the courts of Kathmandu, Nepal.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-800 mb-3">8. Contact</h2>
            <p>For cancellation or refund requests, please contact us at:</p>
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

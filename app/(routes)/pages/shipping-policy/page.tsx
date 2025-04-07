import React from 'react';
import { Container } from '@/components/ui/container';
import { Truck, Package, RefreshCw, Mail } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex  sm:flex-row items-center justify-center mb-8">
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              Shipping & Return Policy
            </h1>
            
          </div>

          <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Shipping Policy
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200 flex items-center">
                <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mr-3 sm:mr-4" />
                <p className="m-0 text-sm sm:text-base">
                  All orders will be delivered within 3-5 working days, depending on the delivery pin code. 
                  Free shipping is available on all orders. Deliveries will be done either by our own riders 
                  or through our courier partner, Delhivery. Once the order is shipped, tracking details 
                  will be sent to the customer via email or WhatsApp from DRYAURA.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Return Policy
              </h2>
              <p className="text-sm sm:text-base">
                DRYAURA does not accept returns once the order is placed and payment is successfully made.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Exchange Policy
              </h2>
              <p className="text-sm sm:text-base">
                DRYAURA will accept exchanges purchased through the website www.dryaura.com, 
                subject to the following terms and conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>We accept exchanges only if the received product is damaged or expired.</li>
                <li>Exchange requests must be made within 24 hours of receiving the order.</li>
                <li>You must notify us via email at dryaura.help@gmail.com or send a message on WhatsApp at +91 83840 86292.</li>
                <li>Please send clear images of the damaged/expired product along with the batch number.</li>
                <li>All valid refunds will be issued as store credit only.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Return Address for Exchange
              </h2>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm sm:text-base">
                <p className="font-semibold">DRYAURA</p>
                <p>B-291, Sangam Vihar, New Delhi – 110080</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Cancellation & Refund Policy
              </h2>
              <p className="text-sm sm:text-base">
                Orders cannot be cancelled or refunded once successfully placed and processed by the payment gateway.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mt-4">
                Refunds will be considered only in these cases:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>If the buyer does not receive the product within 30 days due to failure to ship from DRYAURA.</li>
                <li>If the shipping location is not serviceable by our courier partners.</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mt-4">
                No Refund Will Be Issued In These Cases:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>Products are delivered but customer dislikes or changes mind after delivery.</li>
                <li>Incorrect/incomplete address provided by the customer.</li>
                <li>Recipient not available at the delivery address.</li>
                <li>Refusal to accept the package at the time of delivery.</li>
                <li>Delivery made to a person/address specified by the customer, other than themselves.</li>
                <li>Force Majeure (natural calamities, lockdowns, etc.).</li>
                <li>Product found tampered after delivery.</li>
              </ul>
            </section>

            <section className="mt-8 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200 flex items-center">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mr-3 sm:mr-4" />
              <p className="m-0 font-semibold text-sm sm:text-base">
                For any queries regarding shipping, returns, or exchange, please email: 
                <a href="mailto:dryaura.help@gmail.com" className="ml-2 text-blue-600 hover:underline">
                  dryaura.help@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}

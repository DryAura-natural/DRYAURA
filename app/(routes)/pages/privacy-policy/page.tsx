import React from 'react';
import { Container } from '@/components/ui/container';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
           
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              Privacy Policy
            </h1>
            
          </div>

          <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
                </p>
                <p className="text-sm sm:text-base">
                  When you browse our store, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
                </p>
                <p className="text-sm sm:text-base">
                  Email marketing: With your permission, we may send you emails about our store, new products and other updates.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 2 - CONSENT
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  How do you get my consent?
                </p>
                <p className="text-sm sm:text-base">
                  When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
                </p>
                <p className="text-sm sm:text-base">
                  If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
                </p>
                <p className="text-sm sm:text-base">
                  How do I withdraw my consent?
                </p>
                <p className="text-sm sm:text-base">
                  If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at dryaura.help@gmail.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 3 - DISCLOSURE
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 4 - PAYMENT
              </h2>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                <p className="text-sm sm:text-base">
                  We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
                </p>
                <p className="text-sm sm:text-base">
                  Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
                </p>
                <p className="text-sm sm:text-base">
                  PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
                </p>
                <p className="mt-2 text-xs sm:text-sm">
                  For more insight, you may also want to read terms and conditions of Razorpay on <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://razorpay.com</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 5 - THIRD-PARTY SERVICES
              </h2>
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                <p className="text-sm sm:text-base">
                  In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
                </p>
                <p className="text-sm sm:text-base">
                  However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
                </p>
                <p className="text-sm sm:text-base">
                  For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
                </p>
                <p className="text-sm sm:text-base">
                  In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
                </p>
                <p className="text-sm sm:text-base">
                  Once you leave our store's website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.
                </p>
                <p className="text-sm sm:text-base">
                  Links
                </p>
                <p className="text-sm sm:text-base">
                  When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 6 - SECURITY
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 7 - COOKIES
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  We use cookies to maintain session of your user. It is not used to personally identify you on other websites.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 8 - AGE OF CONSENT
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                SECTION 9 - CHANGES TO THIS PRIVACY POLICY
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-sm sm:text-base">
                  We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                </p>
                <p className="text-sm sm:text-base">
                  If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
                </p>
              </div>
            </section>

            <section className="mt-8 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200 flex items-center">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mr-3 sm:mr-4" />
              <p className="m-0 font-semibold text-sm sm:text-base">
                Questions about our Privacy Policy? Contact us at:
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

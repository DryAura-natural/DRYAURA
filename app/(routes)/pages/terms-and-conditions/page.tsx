import React from 'react';
import { Container } from '@/components/ui/container';
import { FileText, Scale, Mail } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              Terms of Service
            </h1>
           
          </div>

          <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Overview
              </h2>
              <p className="text-sm sm:text-base">
                This website is operated by DRYAURA, a premium dry fruits brand owned and managed by two entrepreneurs 
                – Deepak Kumar Choudhary and Abhishek Kashav, both engineers by profession. Their vision is to build 
                better communication, transparency, and trust with customers through high-quality products and 
                responsible business practices.
              </p>
              <p className="text-sm sm:text-base">
                Throughout the site, the terms "we", "us" and "our" refer to DRYAURA. DRYAURA offers this website, 
                including all information, tools, and services available from this site to you, the user, conditioned 
                upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base">
                By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be 
                bound by the following terms and conditions ("Terms of Service", "Terms"), including any additional 
                terms and conditions and policies referenced herein and/or available via hyperlink.
              </p>
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-800 text-sm sm:text-base">
                  Please read these Terms of Service carefully before accessing or using our website. 
                  By accessing or using any part of the site, you agree to be bound by these Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Key Sections
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>Online Store Terms</li>
                <li>General Conditions</li>
                <li>Product and Service Information</li>
                <li>Billing and Account Information</li>
                <li>Personal Information and Privacy</li>
                <li>Prohibited Uses</li>
                <li>Liability and Indemnification</li>
                <li>Termination and Governing Law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Important Highlights
              </h2>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                  <li>Prices and services are subject to change without notice</li>
                  <li>We reserve the right to refuse service to anyone</li>
                  <li>All products are provided "as is" and "as available"</li>
                  <li>Your continued use implies acceptance of any changes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Governing Law
              </h2>
              <p className="text-sm sm:text-base">
                These Terms of Service shall be governed by and construed in accordance with the laws of India, 
                with exclusive jurisdiction in New Delhi, India.
              </p>
            </section>

            <section className="mt-8 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200 flex items-center">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mr-3 sm:mr-4" />
              <p className="m-0 font-semibold text-sm sm:text-base">
                Questions about the Terms of Service can be sent to:
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

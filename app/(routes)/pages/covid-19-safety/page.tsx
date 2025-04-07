import React from 'react';
import { Container } from '@/components/ui/container';
import { ShieldCheck } from 'lucide-react';
import { TbMedicalCross } from 'react-icons/tb';
import { FaVirus } from 'react-icons/fa';

export default function CovidPage() {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-row items-center justify-center mb-8">
            <TbMedicalCross className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4 sm:mb-0 sm:mr-4" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              COVID-19 Safety Measures
            </h1>
            <FaVirus className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mt-4 sm:mt-0 sm:ml-4" />
          </div>

          <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-6">
            <div className="flex items-center bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mr-3 sm:mr-4" />
              <p className="m-0 text-sm sm:text-base">
                This is an unprecedented situation, and due to the current global health hazard, 
                it is now more important than ever to take care of your and your family&apos;s immunity. 
                At DRYAURA, we are committed to ensuring the highest standards of safety and hygiene.
              </p>
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Our Safety Protocols
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>Regular sanitization of all work areas and packaging zones</li>
                <li>Mandatory use of masks and gloves for all staff members</li>
                <li>Temperature checks and health screenings for employees</li>
                <li>Contactless delivery and packaging</li>
                <li>Strict adherence to social distancing norms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Packaging Safety
              </h2>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                <p className="text-sm sm:text-base">
                  We have implemented additional safety measures in our packaging process:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                  <li>All packaging is done in sanitized environments</li>
                  <li>Packaging materials are disinfected before use</li>
                  <li>Minimal human contact during packaging and sealing</li>
                  <li>Sealed packages are further sanitized before dispatch</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Delivery Guidelines
              </h2>
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                <p className="text-sm sm:text-base">
                  Our delivery partners follow strict COVID-19 safety protocols:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                  <li>Contactless delivery</li>
                  <li>Delivery personnel use sanitizers and protective gear</li>
                  <li>No-touch payment options preferred</li>
                  <li>Regular health monitoring of delivery staff</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6">
                Customer Assurance
              </h2>
              <p className="text-sm sm:text-base">
                We understand the concerns during these challenging times. Our commitment to your health 
                and safety is paramount. We continuously update our protocols in line with government 
                guidelines and medical recommendations.
              </p>
            </section>

            <section className="mt-8 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200 flex items-center">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mr-3 sm:mr-4" />
              <p className="m-0 font-semibold text-sm sm:text-base">
                Stay safe, stay healthy with DRYAURA.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}

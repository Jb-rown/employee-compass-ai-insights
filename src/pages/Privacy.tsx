
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: April 11, 2023</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              At Employee Compass, we take your privacy seriously. This Privacy Policy describes how we collect, use, and disclose your personal information
              when you use our services. By using our Service, you agree to the collection and use of information in accordance with this policy.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you:
            </p>
            <ul className="list-disc ml-8 my-4">
              <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used.</li>
              <li><strong>Employee Data:</strong> For customers using our retention prediction services, we process employee data provided by your organization.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Storage and Security</h2>
            <p>
              We use industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Use of Data</h2>
            <p>
              Employee Compass uses the collected data for various purposes:
            </p>
            <ul className="list-disc ml-8 my-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To process employee retention predictions for customers</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Disclosure of Data</h2>
            <p>
              We may disclose your personal information in good faith when we believe that disclosure is necessary to:
            </p>
            <ul className="list-disc ml-8 my-4">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of Employee Compass</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users of the Service or the public</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Service Providers</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services,
              or assist us in analyzing how our Service is used. These third parties have access to your personal information only to perform these tasks on
              our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct,
              delete, or restrict processing of your personal data. Please contact us to exercise these rights.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and
              updating the "last updated" date.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@employeecompass.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;

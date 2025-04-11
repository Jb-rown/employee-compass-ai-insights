
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Last updated: April 11, 2023</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Employee Compass ("Company", "we", "our", "us"). These Terms of Service govern your use of our website and services.
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Definitions</h2>
            <p><strong>Service</strong> refers to the Employee Compass platform accessible via our website.</p>
            <p><strong>User</strong> refers to individuals who access or use our Service, including company administrators and employees.</p>
            <p><strong>Content</strong> refers to data, text, information, and any other materials uploaded or processed through our Service.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Service</h2>
            <p>
              Our Service is designed to help organizations predict and prevent employee turnover using data analytics and AI.
              You agree to use our Service only for lawful purposes and in accordance with these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Privacy</h2>
            <p>
              Your use of our Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
              Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the
              exclusive property of Employee Compass and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your access to our Service immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Employee Compass, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability
              to access or use the Service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@employeecompass.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;

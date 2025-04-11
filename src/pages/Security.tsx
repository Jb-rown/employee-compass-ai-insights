
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield, Lock, Server, FileCheck, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Security = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">Security First</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Learn how Employee Compass protects your sensitive employee data with enterprise-grade security measures.
              </p>
            </div>
          </div>
        </section>

        {/* Main Security Information */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Your Data Security Is Our Priority</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Employee Compass, we understand that we're handling some of your most sensitive data: information about your employees.
                  That's why we've built our platform with security at its core, implementing multiple layers of protection.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our security infrastructure meets or exceeds industry standards, with regular audits and updates to ensure we're always
                  providing the highest level of protection for your data.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-retention-500/20 rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="Security concept" 
                  className="rounded-xl shadow-xl w-full h-auto object-cover relative z-10" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Encryption</h3>
                <p className="text-muted-foreground">
                  All data is encrypted both in transit and at rest using industry-standard encryption protocols.
                  Your information is never exposed in plain text.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Infrastructure</h3>
                <p className="text-muted-foreground">
                  Our platform is hosted on enterprise-grade cloud infrastructure with built-in security controls,
                  regular security patches, and 24/7 monitoring.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Access Controls</h3>
                <p className="text-muted-foreground">
                  Strict role-based access controls ensure that your data is only accessible to authorized users
                  within your organization.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <FileCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Compliance</h3>
                <p className="text-muted-foreground">
                  We comply with industry standards and regulations, including GDPR, CCPA, and SOC 2,
                  to ensure your data is handled with the highest level of care.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Threat Protection</h3>
                <p className="text-muted-foreground">
                  Advanced threat detection and prevention systems protect against unauthorized access
                  attempts, DDoS attacks, and other security threats.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow border border-border hover-scale">
                <div className="text-primary p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Regular Audits</h3>
                <p className="text-muted-foreground">
                  We conduct regular security audits and penetration testing to identify and address
                  potential vulnerabilities before they can be exploited.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Have Security Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our security team is available to discuss any concerns or specific requirements you may have.
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 text-primary hover-scale">
              <Link to="/contact" className="flex items-center gap-2">
                Contact Security Team
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;


import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be connected to a backend in a real application
    alert("Thank you for your message! Our team will get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">Contact Us</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about Employee Compass? Our team is here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We'd love to hear from you. Fill out the form or reach out using one of the 
                  methods below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Our Office</h3>
                      <p className="text-muted-foreground">
                        123 Innovation Way<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">
                        info@employeecompass.com<br />
                        support@employeecompass.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-muted-foreground">
                        +1 (555) 123-4567<br />
                        Monday-Friday, 9am-5pm PT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} required />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

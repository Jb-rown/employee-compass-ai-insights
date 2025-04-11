
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">About Employee Compass</h1>
              <p className="text-lg text-muted-foreground mb-8">
                We're on a mission to transform how companies approach employee retention 
                through data-driven insights and artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Employee Compass was founded in 2022 by a team of HR professionals and data scientists 
                  who recognized a critical gap in how companies approach employee retention.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Traditional retention strategies were reactive, addressing issues only after employees 
                  had already decided to leave. We set out to create a solution that would help companies 
                  identify at-risk employees before they made the decision to leave.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, Employee Compass works with hundreds of companies worldwide, helping them 
                  reduce turnover, improve employee satisfaction, and build stronger teams through 
                  predictive analytics and AI-powered insights.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-retention-500/20 rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Team collaboration" 
                  className="rounded-xl shadow-xl w-full h-auto object-cover relative z-10" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                At Employee Compass, we're guided by a set of core values that define how we work, 
                how we serve our customers, and how we contribute to the future of work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-secondary/20 p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-bold mb-3">Data-Driven Excellence</h3>
                <p className="text-muted-foreground">
                  We believe in making decisions based on data, not intuition. Our platform 
                  is built on rigorous analysis and proven methodologies.
                </p>
              </div>
              
              <div className="bg-secondary/20 p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-bold mb-3">Human-Centered AI</h3>
                <p className="text-muted-foreground">
                  While we leverage advanced technology, we never lose sight of the human element. 
                  Our AI exists to enhance human potential, not replace it.
                </p>
              </div>
              
              <div className="bg-secondary/20 p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible in employee retention, 
                  refining our algorithms and developing new features to better serve our customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Ready to transform your approach to employee retention? 
              Schedule a demo today and see how Employee Compass can help.
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 text-primary hover-scale">
              <Link to="/contact" className="flex items-center gap-2">
                Schedule a Demo <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

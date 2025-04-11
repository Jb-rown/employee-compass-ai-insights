
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "Senior Data Scientist",
      department: "Data Science",
      location: "San Francisco (Remote Option)",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "Full-time"
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York (Remote Option)",
      type: "Full-time"
    },
    {
      id: 5,
      title: "HR Analytics Specialist",
      department: "Solutions",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    }
  ];
  
  const benefits = [
    "Competitive salary and equity",
    "Remote-first culture",
    "Flexible work hours",
    "Comprehensive health, dental, and vision insurance",
    "401(k) matching",
    "Professional development budget",
    "Home office stipend",
    "Unlimited PTO",
    "Regular team retreats",
    "Parental leave"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">Join Our Team</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Help us transform how companies approach employee retention and build the future of HR technology.
              </p>
              <Button asChild size="lg" className="px-8 hover-scale">
                <a href="#open-positions">View Open Positions</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-retention-500/20 rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="Team collaborating" 
                  className="rounded-xl shadow-xl w-full h-auto object-cover relative z-10" 
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  At Employee Compass, we're building a team of passionate individuals who are committed to transforming
                  how companies approach employee retention.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe in fostering an inclusive, collaborative environment where diverse perspectives are valued
                  and everyone has the opportunity to make an impact.
                </p>
                <p className="text-lg text-muted-foreground">
                  As a remote-first company, we emphasize results, communication, and work-life balance,
                  providing the flexibility and support our team needs to do their best work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Why Work With Us</h2>
              <p className="text-lg text-muted-foreground">
                We offer a comprehensive benefits package designed to support your professional growth,
                personal well-being, and financial security.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-secondary/20 p-4 rounded-lg text-center hover-scale"
                >
                  <p className="font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
              <p className="text-lg text-muted-foreground">
                Explore current opportunities to join the Employee Compass team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openPositions.map((position) => (
                <Card key={position.id} className="border border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={18} className="text-primary" />
                      <span className="text-sm text-muted-foreground">{position.department}</span>
                    </div>
                    <CardTitle>{position.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Location:</strong> {position.location}</p>
                      <p><strong>Type:</strong> {position.type}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/contact" className="flex items-center justify-center gap-2">
                        View Details <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See the Right Fit?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities.
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 text-primary hover-scale">
              <Link to="/contact" className="flex items-center gap-2">
                Submit Your Resume <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;

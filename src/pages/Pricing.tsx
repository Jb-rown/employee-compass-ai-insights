
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">Simple, Transparent Pricing</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Choose the plan that's right for your organization. All plans include core features.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card className="border border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <p className="text-3xl font-bold mt-4">$499<span className="text-muted-foreground text-base font-normal">/month</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Up to 100 employees</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Predictive analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Basic dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Professional Plan */}
              <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm rounded-bl-md">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <p className="text-3xl font-bold mt-4">$999<span className="text-muted-foreground text-base font-normal">/month</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Up to 500 employees</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>AI-powered recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Custom dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Enterprise Plan */}
              <Card className="border border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <p className="text-3xl font-bold mt-4">Custom<span className="text-muted-foreground text-base font-normal"> pricing</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Unlimited employees</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Custom data integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Advanced AI features</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-primary mr-2 mt-0.5" />
                      <span>24/7 premium support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our team is ready to help you find the perfect plan for your organization.
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 text-primary hover-scale">
              <Link to="/contact" className="flex items-center gap-2">
                Contact Sales <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;

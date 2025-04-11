
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import StatsCard from "@/components/StatsCard";
import HeroAnimation from "@/components/HeroAnimation";
import { 
  ArrowRight, 
  BarChart2, 
  BrainCircuit, 
  ClipboardCheck, 
  Database, 
  Lightbulb, 
  LineChart, 
  UploadCloud, 
  UserCog, 
  Users 
} from "lucide-react";

const Index = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Smooth scroll to section when clicking anchor links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reveal animations on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 animate-fade-in">
                AI-Powered Employee Retention
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-gradient animate-fade-in">
                Predict and Prevent Employee Turnover
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Use data-driven insights and AI to identify at-risk employees and implement effective retention strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button asChild size="lg" className="text-md px-8 hover-scale">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-md px-8 hover-scale">
                  <Link to="/dashboard">View Demo</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-retention-500/20 rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=3432&auto=format&fit=crop" 
                  alt="HR team analyzing data" 
                  className="rounded-xl shadow-xl w-full h-auto object-cover animate-float" 
                />
                <HeroAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white reveal fade-bottom">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Transforming Employee Retention</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our AI-powered platform has helped hundreds of companies improve their employee retention rates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              icon={<Users size={20} />} 
              title="Average Retention Improvement" 
              value="24%" 
              trend={{ value: "5% vs. industry", positive: true }}
              className="hover-scale"
            />
            <StatsCard 
              icon={<Database size={20} />} 
              title="Employee Records Analyzed" 
              value="1.2M+"
              className="hover-scale"
            />
            <StatsCard 
              icon={<BarChart2 size={20} />} 
              title="Prediction Accuracy" 
              value="94.7%" 
              trend={{ value: "2.3% this quarter", positive: true }}
              className="hover-scale"
            />
            <StatsCard 
              icon={<Lightbulb size={20} />} 
              title="Custom AI Insights Generated" 
              value="10K+" 
              className="hover-scale"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-secondary/30 px-4 reveal fade-bottom">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Key Features
            </span>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Our platform combines powerful analytics with AI to help you understand, predict, and improve employee retention.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LineChart size={24} />}
              title="Predictive Analytics"
              description="Use machine learning to identify employees at risk of leaving before they make the decision to leave."
            />
            <FeatureCard 
              icon={<BrainCircuit size={24} />}
              title="AI-Powered Insights"
              description="Get personalized retention strategies generated by our advanced AI model for each at-risk employee."
            />
            <FeatureCard 
              icon={<ClipboardCheck size={24} />}
              title="Retention Planning"
              description="Create and track actionable retention plans based on data-driven recommendations."
            />
            <FeatureCard 
              icon={<UserCog size={24} />}
              title="Employee Profiles"
              description="Comprehensive view of each employee with risk assessment and personalized retention actions."
            />
            <FeatureCard 
              icon={<BarChart2 size={24} />}
              title="Interactive Dashboard"
              description="Visualize key metrics and trends with customizable charts and reports."
            />
            <FeatureCard 
              icon={<UploadCloud size={24} />}
              title="Data Integration"
              description="Easily upload and integrate with your existing HR systems and employee data."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white px-4 reveal fade-bottom">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Process
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              A simple three-step process to transform your employee retention strategy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/20 hover-scale reveal fade-right" style={{ transitionDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Your Data</h3>
              <p className="text-muted-foreground">
                Connect your HRIS or upload employee data files to our secure platform.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/20 hover-scale reveal fade-right" style={{ transitionDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get AI Insights</h3>
              <p className="text-muted-foreground">
                Our AI analyzes patterns and predicts which employees are at risk of leaving.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/20 hover-scale reveal fade-right" style={{ transitionDelay: '0.5s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Implement Strategies</h3>
              <p className="text-muted-foreground">
                Follow personalized retention plans for each at-risk employee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30 px-4 reveal fade-bottom">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              HR professionals are transforming their retention strategies with our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Employee Compass has revolutionized how we approach retention. We've reduced turnover by 31% in just six months by implementing the AI-suggested strategies."
              author="Sarah Johnson"
              role="HR Director"
              company="TechGlobal Inc."
            />
            <TestimonialCard 
              quote="The predictive analytics are incredibly accurate. We were able to proactively address concerns with key team members before they became serious issues."
              author="Michael Chen"
              role="People Operations Manager"
              company="Innovate Solutions"
            />
            <TestimonialCard 
              quote="What impressed me most was how quickly we saw results. The dashboard made it easy to identify trends and take immediate action where needed."
              author="Jennifer Rodriguez"
              role="Chief People Officer"
              company="Growth Ventures"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary px-4 reveal fade-bottom">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Improve Your Employee Retention?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies using Employee Compass to reduce turnover and build stronger teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-8 text-primary hover-scale">
              <Link to="/signup" className="flex items-center gap-2">
                Get Started Today <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover-scale">
              <Link to="/dashboard">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

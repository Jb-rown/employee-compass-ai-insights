
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Key Strategies to Improve Employee Retention",
      excerpt: "Discover proven strategies that can help reduce turnover and keep your top talent engaged.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "April 2, 2023",
      category: "Retention"
    },
    {
      id: 2,
      title: "The Role of AI in Modern HR Practices",
      excerpt: "Exploring how artificial intelligence is transforming human resources and talent management.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "March 15, 2023",
      category: "Technology"
    },
    {
      id: 3,
      title: "Case Study: How Company X Reduced Turnover by 40%",
      excerpt: "An in-depth look at how one company transformed their approach to employee retention.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "February 28, 2023",
      category: "Case Study"
    },
    {
      id: 4,
      title: "Predicting Employee Turnover: Early Warning Signs",
      excerpt: "Learn to identify the subtle indicators that an employee might be considering leaving.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "February 10, 2023",
      category: "Analytics"
    },
    {
      id: 5,
      title: "Building a Culture of Belonging in Remote Teams",
      excerpt: "Strategies for creating connection and community in distributed work environments.",
      image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "January 22, 2023",
      category: "Remote Work"
    },
    {
      id: 6,
      title: "The Cost of Employee Turnover: Beyond Recruitment",
      excerpt: "Understanding the true financial impact when employees leave your organization.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      date: "January 5, 2023",
      category: "Finance"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">Blog & Resources</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Insights, strategies, and best practices for improving employee retention and building stronger teams.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{post.category}</span>
                    </div>
                    <CardTitle className="hover:text-primary transition-colors">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;

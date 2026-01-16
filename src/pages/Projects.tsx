import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Battery, Wind, Zap } from "lucide-react";

import project1 from "@/assets/portfolio/project-1.jpg";
import project2 from "@/assets/portfolio/project-2.jpg";
import project3 from "@/assets/portfolio/project-3.jpg";
import project5 from "@/assets/portfolio/project-5.jpg";
import project6 from "@/assets/portfolio/project-6.jpg";
import project7 from "@/assets/portfolio/project-7.jpg";
import project8 from "@/assets/portfolio/project-8.jpg";
import project9 from "@/assets/portfolio/project-9.jpg";
import project10 from "@/assets/portfolio/project-10.jpg";
import project13 from "@/assets/portfolio/project-13.jpg";
import project14 from "@/assets/portfolio/project-14.jpg";
import tesla1 from "@/assets/portfolio/tesla-1.jpg";
import tesla2 from "@/assets/portfolio/tesla-2.jpg";
import tesla3 from "@/assets/portfolio/tesla-3.jpg";

type Category = "All" | "Solar" | "Battery" | "HVAC" | "EV Charger";

interface Project {
  image: string;
  title: string;
  location: string;
  category: Category | "Solar + Battery";
  savings: string;
  alt: string;
}

const projects: Project[] = [
  { image: project14, title: "Neighborhood Solar Community", location: "Irvine, CA", category: "Solar", savings: "$380/mo", alt: "Melia Solar community installation - aerial view of Irvine CA neighborhood with multiple residential solar panel systems" },
  { image: project1, title: "Desert Mountain Estate", location: "Palm Springs, CA", category: "Solar", savings: "$520/mo", alt: "Melia Solar desert installation - residential solar panels on Palm Springs CA estate with mountain backdrop" },
  { image: tesla1, title: "Tesla Powerwall Installation", location: "San Diego, CA", category: "Battery", savings: "$180/mo", alt: "Melia Solar Tesla Powerwall battery storage installation in San Diego CA home garage" },
  { image: project6, title: "Coastal Home Solar System", location: "Malibu, CA", category: "Solar", savings: "$450/mo", alt: "Melia Solar coastal installation - rooftop solar panels on Malibu CA oceanfront property" },
  { image: project3, title: "Commercial Rooftop Array", location: "Los Angeles, CA", category: "Solar", savings: "$1,200/mo", alt: "Melia Solar commercial installation - large rooftop solar array on Los Angeles CA business building" },
  { image: project10, title: "Tile Roof Solar Integration", location: "Orange County, CA", category: "Solar", savings: "$340/mo", alt: "Melia Solar tile roof integration - solar panels installed on Orange County CA Spanish tile roof" },
  { image: project7, title: "Luxury Estate Energy System", location: "Newport Beach, CA", category: "Solar + Battery", savings: "$620/mo", alt: "Melia Solar luxury estate - complete solar energy system on Newport Beach CA mansion" },
  { image: tesla2, title: "Home Battery Backup System", location: "Austin, TX", category: "Battery", savings: "$210/mo", alt: "Melia Solar Tesla Powerwall home battery backup system - wall-mounted installation in Texas home" },
  { image: project2, title: "Modern Residential Solar", location: "Dallas, TX", category: "Solar", savings: "$390/mo", alt: "Melia Solar residential installation - aerial view of modern Dallas TX home with rooftop solar panels" },
  { image: project13, title: "Spanish Tile Roof Solar", location: "Santa Barbara, CA", category: "Solar", savings: "$410/mo", alt: "Melia Solar Spanish tile roof - seamless solar panel integration on Santa Barbara CA home" },
  { image: project5, title: "Multi-Roof Solar System", location: "Houston, TX", category: "Solar", savings: "$480/mo", alt: "Melia Solar multi-roof system - large residential solar installation on Houston TX property" },
  { image: project8, title: "Suburban Home Solar", location: "Sacramento, CA", category: "Solar", savings: "$320/mo", alt: "Melia Solar suburban home - residential solar panel installation in Sacramento California" },
  { image: tesla3, title: "Large Battery Storage Array", location: "Phoenix, AZ", category: "Battery", savings: "$290/mo", alt: "Melia Solar large battery array - multiple Tesla Powerwall units installed in Phoenix Arizona home" },
  { image: project9, title: "Neighborhood Solar Home", location: "Las Vegas, NV", category: "Solar + Battery", savings: "$550/mo", alt: "Melia Solar neighborhood installation - Las Vegas NV home with complete solar and battery system" },
];

const categories: Category[] = ["All", "Solar", "Battery", "HVAC", "EV Charger"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Solar":
    case "Solar + Battery":
      return <Sun className="w-3 h-3" />;
    case "Battery":
      return <Battery className="w-3 h-3" />;
    case "HVAC":
      return <Wind className="w-3 h-3" />;
    case "EV Charger":
      return <Zap className="w-3 h-3" />;
    default:
      return <Sun className="w-3 h-3" />;
  }
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory || p.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Projects | Melia Solar - Real Installations Across the United States</title>
        <meta name="description" content="Real installations across the United States. See how we're helping businesses & families save on energy costs & secure energy independence." />
        <link rel="canonical" href="https://meliasolar.com/projects" />
        <meta property="og:title" content="Our Projects | Melia Solar" />
        <meta property="og:description" content="Real installations across the United States. See how we're helping businesses & families save on energy costs & secure energy independence." />
        <meta property="og:image" content="https://meliasolar.com/og-projects-1.png" />
        <meta property="og:url" content="https://meliasolar.com/projects" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Projects | Melia Solar" />
        <meta name="twitter:description" content="Real installations across the United States. See how we're helping businesses & families save on energy costs & secure energy independence." />
        <meta name="twitter:image" content="https://meliasolar.com/og-projects-1.png" />
        <meta name="keywords" content="solar installation projects, solar panel gallery, residential solar, commercial solar, battery storage, California solar" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sun className="w-4 h-4" />
            Our Work
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Our Projects
          </h1>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            Real installations across the United States. See how we're helping businesses & families save on energy costs & secure energy independence.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-background border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge 
                    className="absolute top-4 left-4 bg-primary/90 text-primary-foreground gap-1"
                  >
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </Badge>
                  
                  {/* Savings Badge */}
                  <div className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Saves {project.savings}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join hundreds of happy homeowners who are saving money with solar energy.
          </p>
          <Button size="lg" className="rounded-full" asChild>
            <a href="tel:+18182029527">Get a Free Quote</a>
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default ProjectsPage;

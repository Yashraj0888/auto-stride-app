import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Car, Shield, Clock, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carConvertible from "@/assets/car-convertible.jpg";

const Index = () => {
  const featuredVehicles = [
    {
      id: "1",
      name: "Tesla Model 3",
      image: carSedan,
      price: 89,
      type: "Sedan",
      seats: 5,
      transmission: "Auto",
      fuel: "Electric",
      location: "San Francisco",
    },
    {
      id: "2",
      name: "BMW X5",
      image: carSuv,
      price: 120,
      type: "SUV",
      seats: 7,
      transmission: "Auto",
      fuel: "Hybrid",
      location: "Los Angeles",
    },
    {
      id: "3",
      name: "Porsche 911",
      image: carConvertible,
      price: 250,
      type: "Sports",
      seats: 2,
      transmission: "Auto",
      fuel: "Gasoline",
      location: "Miami",
    },
  ];

  const features = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "Choose from our carefully curated collection of top-quality vehicles",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Drive with confidence knowing you're fully covered",
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book in seconds and get on the road immediately",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our team is always here to help you",
    },
  ];

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <Navbar />
      <HeroSection />

      {/* Featured Vehicles */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Vehicles</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of premium vehicles ready for your next adventure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/vehicles">
            <Button variant="outline" size="lg">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose DriveNow</h2>
            <p className="text-muted-foreground text-lg">
              The smarter way to rent a car
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of happy customers who trust DriveNow for their car rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vehicles">
              <Button variant="hero" size="xl">
                Browse Vehicles
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="accent" size="xl">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Car className="w-6 h-6 text-accent" />
              DriveNow
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 DriveNow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

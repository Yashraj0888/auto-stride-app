import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Premium car rental" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Drive Your Dream Car
            <span className="block text-accent mt-2">Anytime, Anywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            Discover premium vehicles at unbeatable prices. Book instantly and hit the road in minutes.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-border">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-input">
                <MapPin className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-input">
                <Calendar className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="Pick-up date"
                  className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-input">
                <Calendar className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="Return date"
                  className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <Link to="/vehicles" className="block">
              <Button variant="accent" size="lg" className="w-full">
                <Search className="w-5 h-5" />
                Search Vehicles
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">100+</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

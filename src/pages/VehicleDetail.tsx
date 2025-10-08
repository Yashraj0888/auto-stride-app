import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import {
  Users,
  Fuel,
  Cog,
  MapPin,
  Star,
  Shield,
  Check,
  CalendarIcon,
  ArrowLeft,
} from "lucide-react";
import carSedan from "@/assets/car-sedan.jpg";

const VehicleDetail = () => {
  const { id } = useParams();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  // Mock data - would be fetched based on id
  const vehicle = {
    id: id,
    name: "Tesla Model 3",
    image: carSedan,
    price: 89,
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "Electric",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 124,
    description:
      "Experience the future of driving with the Tesla Model 3. This fully electric sedan combines cutting-edge technology, incredible performance, and zero emissions for an unforgettable journey.",
    features: [
      "Autopilot",
      "Premium Sound System",
      "Glass Roof",
      "Heated Seats",
      "Fast Charging",
      "Navigation System",
      "Bluetooth",
      "USB Ports",
    ],
    insurance: "Full coverage included",
    mileage: "Unlimited",
  };

  const calculateTotal = () => {
    if (!pickupDate || !returnDate) return 0;
    const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * vehicle.price;
  };

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Image */}
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-base px-4 py-2">
                {vehicle.type}
              </Badge>
            </div>

            {/* Vehicle Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{vehicle.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vehicle.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        {vehicle.rating} ({vehicle.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">${vehicle.price}</div>
                    <div className="text-muted-foreground">per day</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{vehicle.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-foreground">{vehicle.seats} Seats</div>
                  </div>
                  <div className="text-center">
                    <Cog className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-foreground">{vehicle.transmission}</div>
                  </div>
                  <div className="text-center">
                    <Fuel className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-foreground">{vehicle.fuel}</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-foreground">Insured</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Features & Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Book This Vehicle</h2>

                <div className="space-y-4 mb-6">
                  {/* Pickup Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Pickup Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={pickupDate}
                          onSelect={setPickupDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Return Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Return Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per day</span>
                    <span className="font-semibold text-foreground">${vehicle.price}</span>
                  </div>
                  {pickupDate && returnDate && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Number of days</span>
                        <span className="font-semibold text-foreground">
                          {Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="font-bold text-accent text-xl">${calculateTotal()}</span>
                      </div>
                    </>
                  )}
                </div>

                <Link to="/auth">
                  <Button variant="accent" size="lg" className="w-full">
                    Book Now
                  </Button>
                </Link>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Free cancellation up to 24h
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {vehicle.insurance}
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {vehicle.mileage} mileage
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;

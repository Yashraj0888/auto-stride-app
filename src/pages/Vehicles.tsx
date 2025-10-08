import { useState } from "react";
import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carConvertible from "@/assets/car-convertible.jpg";

const Vehicles = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(true);

  const vehicles = [
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
    {
      id: "4",
      name: "Audi A4",
      image: carSedan,
      price: 95,
      type: "Sedan",
      seats: 5,
      transmission: "Auto",
      fuel: "Gasoline",
      location: "New York",
    },
    {
      id: "5",
      name: "Mercedes GLE",
      image: carSuv,
      price: 140,
      type: "SUV",
      seats: 7,
      transmission: "Auto",
      fuel: "Diesel",
      location: "Chicago",
    },
    {
      id: "6",
      name: "BMW M4",
      image: carConvertible,
      price: 200,
      type: "Sports",
      seats: 4,
      transmission: "Manual",
      fuel: "Gasoline",
      location: "Dallas",
    },
  ];

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Browse Vehicles</h1>
          <p className="text-muted-foreground">Find your perfect ride from our premium collection</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-xl p-6 shadow-md border border-border sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h2>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search vehicles..."
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <Label htmlFor="type" className="mb-2 block">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="mb-4 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}/day
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                </div>

                {/* Transmission */}
                <div>
                  <Label htmlFor="transmission" className="mb-2 block">Transmission</Label>
                  <Select>
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="auto">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type */}
                <div>
                  <Label htmlFor="fuel" className="mb-2 block">Fuel Type</Label>
                  <Select>
                    <SelectTrigger id="fuel">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seats */}
                <div>
                  <Label htmlFor="seats" className="mb-2 block">Minimum Seats</Label>
                  <Select>
                    <SelectTrigger id="seats">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                      <SelectItem value="7">7+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" variant="accent">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{vehicles.length}</span> vehicles
              </p>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;

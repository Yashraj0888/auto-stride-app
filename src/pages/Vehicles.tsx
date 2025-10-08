import { useState } from "react";
import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carConvertible from "@/assets/car-convertible.jpg";

const Vehicles = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(true);
  const [searchMake, setSearchMake] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [minSeats, setMinSeats] = useState("any");

  // Fetch real cars from RapidAPI
  const { data: apiCars, isLoading, error } = useCars({ limit: 50 });

  // Fallback images map
  const imageMap: Record<string, string> = {
    sedan: carSedan,
    suv: carSuv,
    sports: carConvertible,
    luxury: carSedan,
  };

  // Use API data or fallback to default images
  const vehicles = apiCars?.map(car => ({
    ...car,
    image: imageMap[car.type?.toLowerCase()] || carSedan,
  })) || [];

  // Filter vehicles based on current filter state
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = !searchMake || 
      vehicle.name.toLowerCase().includes(searchMake.toLowerCase()) ||
      vehicle.make?.toLowerCase().includes(searchMake.toLowerCase());
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const matchesType = selectedType === "all" || vehicle.type?.toLowerCase() === selectedType.toLowerCase();
    const matchesTransmission = selectedTransmission === "all" || 
      vehicle.transmission?.toLowerCase().includes(selectedTransmission.toLowerCase());
    const matchesFuel = selectedFuel === "all" || vehicle.fuel?.toLowerCase() === selectedFuel.toLowerCase();
    const matchesSeats = minSeats === "any" || vehicle.seats >= parseInt(minSeats);

    return matchesSearch && matchesPrice && matchesType && matchesTransmission && matchesFuel && matchesSeats;
  });

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
                  <Label htmlFor="search" className="mb-2 block">Search Make/Model</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="e.g. Toyota, BMW..."
                      className="pl-10"
                      value={searchMake}
                      onChange={(e) => setSearchMake(e.target.value)}
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <Label htmlFor="type" className="mb-2 block">Vehicle Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
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
                  <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
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
                  <Select value={selectedFuel} onValueChange={setSelectedFuel}>
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
                  <Select value={minSeats} onValueChange={setMinSeats}>
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

                <Button 
                  className="w-full" 
                  variant="accent"
                  onClick={() => {
                    // Filters are applied in real-time, this just provides feedback
                    setShowFilters(false);
                  }}
                >
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
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading vehicles...
                  </span>
                ) : error ? (
                  <span className="text-destructive">Error loading vehicles</span>
                ) : (
                  <>
                    Showing <span className="font-semibold text-foreground">{filteredVehicles.length}</span> vehicles
                  </>
                )}
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

            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground">Failed to load vehicles. Using RapidAPI for live data.</p>
                <p className="text-sm text-muted-foreground mt-2">Please check your API key configuration.</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground">No vehicles match your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;

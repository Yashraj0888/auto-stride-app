import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Fuel, Cog, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface VehicleCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  location: string;
}

const VehicleCard = ({
  id,
  name,
  image,
  price,
  type,
  seats,
  transmission,
  fuel,
  location,
}: VehicleCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          {type}
        </Badge>
      </div>

      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {seats}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cog className="w-4 h-4" />
            {transmission}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4" />
            {fuel}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">${price}</div>
            <div className="text-sm text-muted-foreground">per day</div>
          </div>
          <Link to={`/vehicle/${id}`}>
            <Button variant="accent">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;

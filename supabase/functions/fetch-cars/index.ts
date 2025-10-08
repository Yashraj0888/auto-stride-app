import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { make, model, limit = 20, year } = await req.json().catch(() => ({}));
    
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY is not configured');
    }

    console.log('Fetching cars from RapidAPI...', { make, model, year, limit });

    // Using the Car Data API from RapidAPI
    // This endpoint fetches car makes and models
    const url = new URL('https://car-data.p.rapidapi.com/cars');
    
    // Add query parameters if provided
    if (make) url.searchParams.append('make', make);
    if (model) url.searchParams.append('model', model);
    if (year) url.searchParams.append('year', year.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      console.error('RapidAPI error:', response.status, await response.text());
      throw new Error(`RapidAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched cars:', data?.length || 0, 'vehicles');

    // Transform the data to match our app's format
    const transformedData = Array.isArray(data) ? data.map((car: any, index: number) => ({
      id: car.id || `car-${index}`,
      name: `${car.make} ${car.model}`,
      make: car.make,
      model: car.model,
      year: car.year,
      price: Math.floor(Math.random() * 200) + 50, // Random price for demo
      type: car.type || 'Sedan',
      seats: car.seats || 5,
      transmission: car.transmission || 'Auto',
      fuel: car.fuel_type || 'Gasoline',
      location: 'Available Nationwide',
      image: car.image || '/placeholder.svg',
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 20,
    })) : [];

    return new Response(
      JSON.stringify({ cars: transformedData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error in fetch-cars function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch cars',
        cars: [] 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

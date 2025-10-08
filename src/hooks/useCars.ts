import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  location: string;
  image: string;
  rating: string;
  reviews: number;
}

interface FetchCarsParams {
  make?: string;
  model?: string;
  year?: number;
  limit?: number;
}

export const useCars = (params: FetchCarsParams = {}) => {
  return useQuery<Car[]>({
    queryKey: ['cars', params],
    queryFn: async () => {
      console.log('Fetching cars with params:', params);
      
      const { data, error } = await supabase.functions.invoke('fetch-cars', {
        body: params,
      });

      if (error) {
        console.error('Error fetching cars:', error);
        throw error;
      }

      console.log('Cars fetched successfully:', data?.cars?.length || 0);
      return data?.cars || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

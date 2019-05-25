export interface ICar {
  id: string;
  model_name: string;
  price: number,
  features: string[];
  kit_name?: string;
  dealer: {
    name: string;
    city: string;
    address?: string;
    latitude?: number | string;
    longitude?: number | string;
    url?: string | null;
  };
  images: string[];
  distance: number;
}

export interface ICoordinates {
  latitude?: number | string;
  longitude?: number | string;
}

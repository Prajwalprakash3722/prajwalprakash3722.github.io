export interface FoodItem {
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
  distance?: number;
  category: string;
}

export interface FoodData {
  [category: string]: {
    name: string;
    rating: number;
    latitude: number;
    longitude: number;
  }[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

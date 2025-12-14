export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  theme: string[];
  bestTime: string;
  rating: number;
}

export interface Package {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  inclusions: string[];
  imageUrl: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  type: 'food' | 'culture' | 'adventure' | 'relax';
}

export interface ItineraryDay {
  day: number;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  name: string;
  destination: string;
  days: ItineraryDay[];
}

export interface UserProfile {
  name: string;
  email: string;
  savedDestinations: string[];
}

export enum TravelTheme {
  CULTURE = 'Culture',
  HERITAGE = 'Heritage',
  NATURE = 'Nature',
  FOOD = 'Food',
  SLOW_TRAVEL = 'Slow Travel'
}
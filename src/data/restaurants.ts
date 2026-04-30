import r1 from "@/assets/restaurant-1.jpg";
import r2 from "@/assets/restaurant-2.jpg";
import r3 from "@/assets/restaurant-3.jpg";
import r4 from "@/assets/restaurant-4.jpg";
import r5 from "@/assets/restaurant-5.jpg";

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  walk: string;
  wait: string;
  ambiance: string;
  parking: boolean;
  budget: string;
  rating: number;
  tag: string;
  cuisine: string;
  tone: "green" | "yellow" | "beige" | "orange";
  address: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "dar-el-marsa",
    name: "Dar El Marsa",
    image: r2,
    walk: "4 min",
    wait: "No wait",
    ambiance: "Quiet",
    parking: true,
    budget: "10dt – 40dt",
    rating: 4.5,
    tag: "Fast lunch",
    cuisine: "Mediterranean",
    tone: "green",
    address: "La Marsa Corniche",
  },
  {
    id: "cafe-culture",
    name: "Café Culture",
    image: r3,
    walk: "6 min",
    wait: "5 min",
    ambiance: "Work-friendly",
    parking: false,
    budget: "8dt – 25dt",
    rating: 4.6,
    tag: "Work-friendly",
    cuisine: "Café · Brunch",
    tone: "yellow",
    address: "Les Berges du Lac",
  },
  {
    id: "el-ali",
    name: "El Ali",
    image: r1,
    walk: "9 min",
    wait: "10 min",
    ambiance: "Cozy",
    parking: true,
    budget: "20dt – 55dt",
    rating: 4.7,
    tag: "Authentic",
    cuisine: "Tunisian",
    tone: "beige",
    address: "Medina of Tunis",
  },
  {
    id: "the-cliff",
    name: "The Cliff",
    image: r4,
    walk: "12 min",
    wait: "15 min",
    ambiance: "Romantic",
    parking: true,
    budget: "45dt – 120dt",
    rating: 4.8,
    tag: "Romantic",
    cuisine: "Fine dining",
    tone: "orange",
    address: "Sidi Bou Said",
  },
  {
    id: "le-golfe",
    name: "Le Golfe",
    image: r5,
    walk: "7 min",
    wait: "No wait",
    ambiance: "Lively",
    parking: true,
    budget: "15dt – 45dt",
    rating: 4.4,
    tag: "Family",
    cuisine: "Seafood",
    tone: "green",
    address: "La Goulette",
  },
  {
    id: "dar-zarrouk",
    name: "Dar Zarrouk",
    image: r1,
    walk: "14 min",
    wait: "20 min",
    ambiance: "Elegant",
    parking: true,
    budget: "35dt – 90dt",
    rating: 4.7,
    tag: "Special",
    cuisine: "Mediterranean",
    tone: "yellow",
    address: "Sidi Bou Said",
  },
];

export const findRestaurant = (id: string) =>
  restaurants.find((r) => r.id === id) ?? restaurants[0];

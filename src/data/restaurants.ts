import r1 from "@/assets/restaurant-1.jpg";
import r2 from "@/assets/restaurant-2.jpg";
import r3 from "@/assets/restaurant-3.jpg";
import r4 from "@/assets/restaurant-4.jpg";
import r5 from "@/assets/restaurant-5.jpg";

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  walk: string;        // walking time
  drive: string;       // car time
  wait: string;        // wait queue
  ambiance: string;
  parking: boolean;
  wheelchair: boolean;
  budget: string;
  rating: number;
  tag: string;
  cuisine: string;
  tone: "green" | "yellow" | "beige" | "orange";
  address: string;
  affinity: number;     // 0-100 personalized score
  crowd: "Empty" | "Calm" | "Lively" | "Packed";
  weatherFit: string;   // contextual blurb
  moodTags: string[];   // for emotional matching
};

export const restaurants: Restaurant[] = [
  {
    id: "dar-el-marsa",
    name: "Dar El Marsa",
    image: r2,
    walk: "4 min",
    drive: "2 min",
    wait: "No wait",
    ambiance: "Quiet",
    parking: true,
    wheelchair: true,
    budget: "10dt – 40dt",
    rating: 4.5,
    tag: "Fast lunch",
    cuisine: "Mediterranean",
    tone: "green",
    address: "La Marsa Corniche",
    affinity: 96,
    crowd: "Calm",
    weatherFit: "Terrace open · 24°",
    moodTags: ["calm", "focused", "quiet"],
  },
  {
    id: "cafe-culture",
    name: "Café Culture",
    image: r3,
    walk: "6 min",
    drive: "3 min",
    wait: "5 min",
    ambiance: "Work-friendly",
    parking: false,
    wheelchair: true,
    budget: "8dt – 25dt",
    rating: 4.6,
    tag: "Work-friendly",
    cuisine: "Café · Brunch",
    tone: "yellow",
    address: "Les Berges du Lac",
    affinity: 92,
    crowd: "Calm",
    weatherFit: "Wifi · 2h+ stay OK",
    moodTags: ["focused", "calm", "stressed"],
  },
  {
    id: "el-ali",
    name: "El Ali",
    image: r1,
    walk: "9 min",
    drive: "5 min",
    wait: "10 min",
    ambiance: "Cozy",
    parking: true,
    wheelchair: false,
    budget: "20dt – 55dt",
    rating: 4.7,
    tag: "Authentic",
    cuisine: "Tunisian",
    tone: "beige",
    address: "Medina of Tunis",
    affinity: 81,
    crowd: "Lively",
    weatherFit: "Indoor · cozy",
    moodTags: ["happy", "social", "hungry"],
  },
  {
    id: "the-cliff",
    name: "The Cliff",
    image: r4,
    walk: "12 min",
    drive: "6 min",
    wait: "15 min",
    ambiance: "Romantic",
    parking: true,
    wheelchair: true,
    budget: "45dt – 120dt",
    rating: 4.8,
    tag: "Romantic",
    cuisine: "Fine dining",
    tone: "orange",
    address: "Sidi Bou Said",
    affinity: 88,
    crowd: "Lively",
    weatherFit: "Sunset view · 19:30",
    moodTags: ["romantic", "celebrate", "calm"],
  },
  {
    id: "le-golfe",
    name: "Le Golfe",
    image: r5,
    walk: "7 min",
    drive: "4 min",
    wait: "No wait",
    ambiance: "Lively",
    parking: true,
    wheelchair: true,
    budget: "15dt – 45dt",
    rating: 4.4,
    tag: "Family",
    cuisine: "Seafood",
    tone: "green",
    address: "La Goulette",
    affinity: 78,
    crowd: "Lively",
    weatherFit: "Sea breeze",
    moodTags: ["social", "family", "happy"],
  },
  {
    id: "dar-zarrouk",
    name: "Dar Zarrouk",
    image: r1,
    walk: "14 min",
    drive: "7 min",
    wait: "20 min",
    ambiance: "Elegant",
    parking: true,
    wheelchair: true,
    budget: "35dt – 90dt",
    rating: 4.7,
    tag: "Special",
    cuisine: "Mediterranean",
    tone: "yellow",
    address: "Sidi Bou Said",
    affinity: 84,
    crowd: "Calm",
    weatherFit: "Garden open",
    moodTags: ["romantic", "celebrate", "calm"],
  },
];

export const findRestaurant = (id: string) =>
  restaurants.find((r) => r.id === id) ?? restaurants[0];

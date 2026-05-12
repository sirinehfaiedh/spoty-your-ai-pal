import r1 from "@/assets/restaurant-1.jpg";
import r2 from "@/assets/restaurant-2.jpg";
import r3 from "@/assets/restaurant-3.jpg";
import r4 from "@/assets/restaurant-4.jpg";
import r5 from "@/assets/restaurant-5.jpg";
import dBreakfast from "@/assets/dish-breakfast.jpg";
import dLunch from "@/assets/dish-lunch.jpg";
import dDinner from "@/assets/dish-dinner.jpg";
import dNight from "@/assets/dish-night.jpg";

export type MealCategory = "breakfast" | "lunch" | "dinner" | "night";

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  dishImage: string;
  dishName: string;
  mealCategory: MealCategory;
  diet: string[]; // vegan, vegetarian, gluten-free, lactose-free, halal
  walk: string;
  drive: string;
  wait: string;
  ambiance: string;
  parking: boolean;
  wheelchair: boolean;
  budget: string;
  rating: number;
  tag: string;
  cuisine: string;
  tone: "green" | "yellow" | "beige" | "orange";
  address: string;
  affinity: number;
  crowd: "Empty" | "Calm" | "Lively" | "Packed";
  weatherFit: string;
  moodTags: string[];
};

export const restaurants: Restaurant[] = [
  {
    id: "dar-el-marsa", name: "Dar El Marsa", image: r2,
    dishImage: dLunch, dishName: "Mediterranean Bowl", mealCategory: "lunch",
    diet: ["vegetarian", "halal"],
    walk: "4 min", drive: "2 min", wait: "No wait", ambiance: "Quiet",
    parking: true, wheelchair: true, budget: "10dt – 40dt", rating: 4.5,
    tag: "Fast lunch", cuisine: "Mediterranean", tone: "green",
    address: "La Marsa Corniche", affinity: 96, crowd: "Calm",
    weatherFit: "Terrace open · 24°", moodTags: ["calm", "focused", "quiet"],
  },
  {
    id: "cafe-culture", name: "Café Culture", image: r3,
    dishImage: dBreakfast, dishName: "Cappuccino & Croissant", mealCategory: "breakfast",
    diet: ["vegetarian", "lactose-free"],
    walk: "6 min", drive: "3 min", wait: "5 min", ambiance: "Work-friendly",
    parking: false, wheelchair: true, budget: "8dt – 25dt", rating: 4.6,
    tag: "Work-friendly", cuisine: "Café · Brunch", tone: "yellow",
    address: "Les Berges du Lac", affinity: 92, crowd: "Calm",
    weatherFit: "Wifi · 2h+ stay OK", moodTags: ["focused", "calm", "stressed"],
  },
  {
    id: "el-ali", name: "El Ali", image: r1,
    dishImage: dLunch, dishName: "Couscous Royal", mealCategory: "lunch",
    diet: ["halal", "gluten-free"],
    walk: "9 min", drive: "5 min", wait: "10 min", ambiance: "Cozy",
    parking: true, wheelchair: false, budget: "20dt – 55dt", rating: 4.7,
    tag: "Authentic", cuisine: "Tunisian", tone: "beige",
    address: "Medina of Tunis", affinity: 81, crowd: "Lively",
    weatherFit: "Indoor · cozy", moodTags: ["happy", "social", "hungry"],
  },
  {
    id: "the-cliff", name: "The Cliff", image: r4,
    dishImage: dDinner, dishName: "Grilled Daurade", mealCategory: "dinner",
    diet: ["gluten-free", "halal"],
    walk: "12 min", drive: "6 min", wait: "15 min", ambiance: "Romantic",
    parking: true, wheelchair: true, budget: "45dt – 120dt", rating: 4.8,
    tag: "Romantic", cuisine: "Fine dining", tone: "orange",
    address: "Sidi Bou Said", affinity: 88, crowd: "Lively",
    weatherFit: "Sunset view · 19:30", moodTags: ["romantic", "celebrate", "calm"],
  },
  {
    id: "le-golfe", name: "Le Golfe", image: r5,
    dishImage: dDinner, dishName: "Seafood Platter", mealCategory: "dinner",
    diet: ["gluten-free", "halal"],
    walk: "7 min", drive: "4 min", wait: "No wait", ambiance: "Lively",
    parking: true, wheelchair: true, budget: "15dt – 45dt", rating: 4.4,
    tag: "Family", cuisine: "Seafood", tone: "green",
    address: "La Goulette", affinity: 78, crowd: "Lively",
    weatherFit: "Sea breeze", moodTags: ["social", "family", "happy"],
  },
  {
    id: "dar-zarrouk", name: "Dar Zarrouk", image: r1,
    dishImage: dNight, dishName: "Mango Smoothie & Baklava", mealCategory: "night",
    diet: ["vegetarian", "halal"],
    walk: "14 min", drive: "7 min", wait: "20 min", ambiance: "Elegant",
    parking: true, wheelchair: true, budget: "35dt – 90dt", rating: 4.7,
    tag: "Special", cuisine: "Mediterranean", tone: "yellow",
    address: "Sidi Bou Said", affinity: 84, crowd: "Calm",
    weatherFit: "Garden open", moodTags: ["romantic", "celebrate", "calm"],
  },
];

export const findRestaurant = (id: string) =>
  restaurants.find((r) => r.id === id) ?? restaurants[0];

export const currentMealCategory = (date = new Date()): MealCategory => {
  const h = date.getHours();
  if (h >= 5 && h < 11) return "breakfast";
  if (h >= 11 && h < 16) return "lunch";
  if (h >= 16 && h < 22) return "dinner";
  return "night";
};

export const mealCopy: Record<MealCategory, { eyebrow: string; title: string; sub: string; emoji: string }> = {
  breakfast: { eyebrow: "Good morning", title: "Start with something warm", sub: "Coffee, brunch & light bites near you", emoji: "☀️" },
  lunch:     { eyebrow: "Lunch break", title: "Fast & delicious for now", sub: "Quick-serve meals matched to your mood", emoji: "🍱" },
  dinner:    { eyebrow: "Tonight", title: "Pick a place to unwind", sub: "Curated dinners with the right vibe", emoji: "🌆" },
  night:     { eyebrow: "Late night", title: "Sweet & chill spots open now", sub: "Smoothies, desserts & cozy cafés", emoji: "🌙" },
};

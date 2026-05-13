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
export type Transport = "car" | "motorbike" | "transit" | "foot" | "other";

export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  tags: string[]; // vegan, vegetarian, halal, gluten-free, etc.
};

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  dishImage: string;
  dishName: string;
  mealCategory: MealCategory;
  diet: string[];
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
  contextLabel: string; // e.g. "Good for quick lunch"
  distanceKm: number;
  dailyMenu?: MenuItem[];
};

const MENU_BRUNCH: MenuItem[] = [
  { name: "Avocado Toast", desc: "Sourdough, poached egg, chili oil", price: "16 dt", tags: ["vegetarian"] },
  { name: "Açaí Bowl", desc: "Berries, granola, banana", price: "22 dt", tags: ["vegan", "vegetarian"] },
  { name: "Cappuccino", desc: "House blend, oat milk option", price: "8 dt", tags: ["vegetarian"] },
  { name: "Croque Madame", desc: "Ham, gruyère, sunny egg", price: "18 dt", tags: [] },
];
const MENU_TUNISIAN: MenuItem[] = [
  { name: "Couscous Royal", desc: "Lamb, chicken, vegetables", price: "32 dt", tags: ["halal"] },
  { name: "Ojja Merguez", desc: "Spicy tomato stew, eggs", price: "18 dt", tags: ["halal"] },
  { name: "Brik à l'œuf", desc: "Crispy filo, egg, tuna", price: "9 dt", tags: [] },
  { name: "Salade Méchouia", desc: "Grilled peppers, tomatoes, tuna", price: "12 dt", tags: ["gluten-free"] },
];
const MENU_FINE: MenuItem[] = [
  { name: "Grilled Daurade", desc: "Sea bream, lemon confit", price: "48 dt", tags: ["gluten-free", "halal"] },
  { name: "Beef Tagliata", desc: "Rocket, parmesan, balsamic", price: "62 dt", tags: ["gluten-free"] },
  { name: "Risotto Funghi", desc: "Porcini, truffle oil", price: "38 dt", tags: ["vegetarian"] },
  { name: "Tiramisù", desc: "Mascarpone, espresso", price: "16 dt", tags: ["vegetarian"] },
];
const MENU_SEAFOOD: MenuItem[] = [
  { name: "Seafood Platter", desc: "Octopus, prawns, calamari", price: "45 dt", tags: ["gluten-free", "halal"] },
  { name: "Spaghetti alle Vongole", desc: "Clams, garlic, white wine", price: "28 dt", tags: [] },
  { name: "Grilled Calamari", desc: "Lemon, parsley, olive oil", price: "26 dt", tags: ["gluten-free", "halal"] },
];

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
    contextLabel: "Good for quick lunch", distanceKm: 1.2, dailyMenu: MENU_BRUNCH,
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
    contextLabel: "Good for focused work", distanceKm: 2.1, dailyMenu: MENU_BRUNCH,
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
    contextLabel: "Good for an authentic feast", distanceKm: 3.6, dailyMenu: MENU_TUNISIAN,
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
    contextLabel: "Good for a romantic dinner", distanceKm: 5.2, dailyMenu: MENU_FINE,
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
    contextLabel: "Good for a family meal", distanceKm: 2.8, dailyMenu: MENU_SEAFOOD,
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
    contextLabel: "Good for after-work drinks", distanceKm: 5.6, dailyMenu: MENU_FINE,
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

// Average speed by transport in km/h → minutes for distanceKm
const SPEEDS: Record<Transport, number> = { car: 35, motorbike: 30, transit: 18, foot: 5, other: 20 };
const VERBS: Record<Transport, string> = { car: "drive", motorbike: "ride", transit: "transit", foot: "walk", other: "trip" };

export const timeForTransport = (r: Restaurant, t: Transport): { label: string; verb: string; minutes: number } => {
  const minutes = Math.max(1, Math.round((r.distanceKm / SPEEDS[t]) * 60));
  return { label: `${minutes} min ${VERBS[t]}`, verb: VERBS[t], minutes };
};

export const filterByCategory = (list: Restaurant[], cat: string): Restaurant[] => {
  const c = cat.toLowerCase();
  return list.filter((r) => {
    if (c.includes("cheap")) return parseInt(r.budget) <= 15;
    if (c.includes("romantic")) return r.ambiance === "Romantic" || r.moodTags.includes("romantic");
    if (c.includes("work")) return r.ambiance === "Work-friendly" || r.moodTags.includes("focused");
    if (c.includes("family")) return r.moodTags.includes("family") || r.tag === "Family";
    if (c.includes("authentic")) return r.tag === "Authentic" || r.cuisine === "Tunisian";
    if (c.includes("quick")) return r.wait === "No wait" || r.tag.toLowerCase().includes("fast");
    if (c.includes("friendly")) return r.ambiance === "Lively" || r.moodTags.includes("social");
    if (c.includes("games")) return r.moodTags.includes("social") || r.ambiance === "Lively";
    return true;
  });
};

export const mealCopy: Record<MealCategory, { eyebrow: string; title: string; sub: string; emoji: string }> = {
  breakfast: { eyebrow: "Good morning", title: "Start with something warm", sub: "Coffee, brunch & light bites near you", emoji: "☀️" },
  lunch:     { eyebrow: "Lunch break", title: "Fast & delicious for now", sub: "Quick-serve meals matched to your mood", emoji: "🍱" },
  dinner:    { eyebrow: "Tonight", title: "Pick a place to unwind", sub: "Curated dinners with the right vibe", emoji: "🌆" },
  night:     { eyebrow: "Late night", title: "Sweet & chill spots open now", sub: "Smoothies, desserts & cozy cafés", emoji: "🌙" },
};

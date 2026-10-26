import {
  Dumbbell,
  Gift,
  Heart,
  House,
  Layers,
  Luggage,
  MonitorPlay,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  Ticket,
  Utensils,
  Car,
  type LucideIcon,
} from "lucide-react";
import type { CardKey, CategoryId, MonthId } from "./types";

export interface CategoryDef {
  id: CategoryId;
  name: string;
  icon: LucideIcon;
  fixed?: boolean;
  nameable?: boolean;
  subs: Record<string, string>;
  defaultSub: string;
}

export const CATEGORIES: Record<CategoryId, CategoryDef> = {
  dining: { id: "dining", name: "Dining", icon: Utensils, nameable: true, defaultSub: "restaurant", subs: { restaurant: "Restaurant", delivery: "Delivery", casual: "Fast & casual", cafe: "Cafés" } },
  groceries: { id: "groceries", name: "Groceries", icon: ShoppingBasket, nameable: true, defaultSub: "supermarket", subs: { supermarket: "Supermarkets", specialty: "Fresh & specialty" } },
  travel: { id: "travel", name: "Travel", icon: Luggage, defaultSub: "flights", subs: { flights: "Flights", stays: "Hotels & stays" } },
  housing: { id: "housing", name: "Housing & Utilities", icon: House, fixed: true, defaultSub: "utilities", subs: { utilities: "Utilities", telecom: "Internet & mobile" } },
  transport: { id: "transport", name: "Transport", icon: Car, nameable: true, defaultSub: "rides", subs: { fuel: "Fuel", rides: "Ride-hailing", tolls: "Tolls & parking", carcare: "Car care" } },
  subs: { id: "subs", name: "Subscriptions & Digital", icon: MonitorPlay, fixed: true, defaultSub: "streaming", subs: { streaming: "Streaming", cloud: "Cloud & software", learning: "Learning" } },
  shopping: { id: "shopping", name: "Shopping", icon: ShoppingBag, nameable: true, defaultSub: "clothing", subs: { clothing: "Clothing", home: "Home" } },
  health: { id: "health", name: "Health & Fitness", icon: Dumbbell, nameable: true, defaultSub: "gym", subs: { gym: "Gym", pharmacy: "Pharmacy" } },
  entertainment: { id: "entertainment", name: "Entertainment", icon: Ticket, nameable: true, defaultSub: "cinema", subs: { cinema: "Cinema", events: "Events" } },
  personal: { id: "personal", name: "Personal care", icon: Sparkles, nameable: true, defaultSub: "salon", subs: { salon: "Salon", grooming: "Grooming" } },
  gifts: { id: "gifts", name: "Gifts & donations", icon: Gift, nameable: true, defaultSub: "florist", subs: { florist: "Flowers", donations: "Donations" } },
};

export const CATEGORY_ORDER = Object.keys(CATEGORIES) as CategoryId[];

export const SMALLER_ICON = Layers;
export const HEART_ICON = Heart;

export const SHOPS: Record<string, { name: string; cat: CategoryId; sub: string; unnamed?: boolean }> = {
  marina: { name: "Marina Kitchen", cat: "dining", sub: "restaurant" },
  saffron: { name: "Saffron House", cat: "dining", sub: "restaurant" },
  cedar: { name: "Cedar & Salt", cat: "dining", sub: "restaurant" },
  olive: { name: "Olive Terrace", cat: "dining", sub: "restaurant" },
  talabat: { name: "Talabat", cat: "dining", sub: "delivery" },
  bao: { name: "Bao Lane", cat: "dining", sub: "casual" },
  grill: { name: "Harbour Grill", cat: "dining", sub: "casual" },
  bean: { name: "Bean & Bloom", cat: "dining", sub: "cafe" },
  brew: { name: "Brew Lab", cat: "dining", sub: "cafe" },
  carrefour: { name: "Carrefour", cat: "groceries", sub: "supermarket" },
  spinneys: { name: "Spinneys", cat: "groceries", sub: "supermarket" },
  union: { name: "Union Coop", cat: "groceries", sub: "supermarket" },
  butcher: { name: "Al Wadi Butchery", cat: "groceries", sub: "specialty" },
  etihad: { name: "Etihad Airways", cat: "travel", sub: "flights" },
  emirates: { name: "Emirates", cat: "travel", sub: "flights" },
  harbour: { name: "Harbour View Hotel", cat: "travel", sub: "stays" },
  palm: { name: "Palm Resort Stay", cat: "travel", sub: "stays" },
  dewa: { name: "DEWA", cat: "housing", sub: "utilities" },
  du: { name: "du Mobile & Home", cat: "housing", sub: "telecom" },
  enoc: { name: "ENOC", cat: "transport", sub: "fuel" },
  careem: { name: "Careem", cat: "transport", sub: "rides" },
  salik: { name: "Salik", cat: "transport", sub: "tolls" },
  mawaqif: { name: "Mawaqif Parking", cat: "transport", sub: "tolls" },
  autoserve: { name: "Autoserve Garage", cat: "transport", sub: "carcare" },
  netflix: { name: "Netflix", cat: "subs", sub: "streaming" },
  spotify: { name: "Spotify", cat: "subs", sub: "streaming" },
  icloud: { name: "iCloud+", cat: "subs", sub: "cloud" },
  adobe: { name: "Adobe Creative Cloud", cat: "subs", sub: "cloud" },
  coursera: { name: "Coursera Plus", cat: "subs", sub: "learning" },
  atelier: { name: "Atelier Nord", cat: "shopping", sub: "clothing" },
  haven: { name: "Home Haven", cat: "shopping", sub: "home" },
  gym: { name: "Warehouse Gym", cat: "health", sub: "gym" },
  alnoor: { name: "Al Noor Pharmacy", cat: "health", sub: "pharmacy" },
  cinema: { name: "Marina Cinema", cat: "entertainment", sub: "cinema" },
  skyline: { name: "Skyline Live", cat: "entertainment", sub: "events" },
  glow: { name: "Glow Salon", cat: "personal", sub: "salon" },
  barber: { name: "Barber & Co", cat: "personal", sub: "grooming" },
  bloom: { name: "Bloom Florist", cat: "gifts", sub: "florist" },
  rahma: { name: "Rahma Charity", cat: "gifts", sub: "donations" },
  u1: { name: "MRN CINEMAS DXB 4417", cat: "entertainment", sub: "cinema", unnamed: true },
  u2: { name: "RAHMA CHRTY 0092 AE", cat: "gifts", sub: "donations", unnamed: true },
};

export const CARDS: Record<CardKey, { name: string; last4: string; color: string; colorDark: string }> = {
  v: { name: "Everyday Visa (demo)", last4: "4001", color: "#365f8f", colorDark: "#a9c8f1" },
  t: { name: "Travel Rewards", last4: "8002", color: "#23634f", colorDark: "#a5d6bc" },
};

export const cardColor = (card: CardKey, dark: boolean) => (dark ? CARDS[card].colorDark : CARDS[card].color);

export interface CategoryTone {
  fg: string;
  bg: string;
}

const LIGHT_TONES: Record<CategoryId | "smaller", CategoryTone> = {
  dining: { fg: "#994b2d", bg: "#f3ede7" },
  groceries: { fg: "#216351", bg: "#edf3ed" },
  travel: { fg: "#395d8d", bg: "#edf3f3" },
  housing: { fg: "#81632d", bg: "#f3ede1" },
  transport: { fg: "#395d8d", bg: "#edf3f3" },
  subs: { fg: "#6f5193", bg: "#f3edf3" },
  shopping: { fg: "#994b69", bg: "#f3eded" },
  health: { fg: "#2f7a5f", bg: "#e8f1ec" },
  entertainment: { fg: "#a35f2f", bg: "#f3ebe1" },
  personal: { fg: "#8a5a8f", bg: "#f1ebf1" },
  gifts: { fg: "#b04f45", bg: "#f4eae8" },
  smaller: { fg: "#55635c", bg: "#eceeea" },
};

const DARK_TONES: Record<CategoryId | "smaller", CategoryTone> = {
  dining: { fg: "#f3b18d", bg: "#332d27" },
  groceries: { fg: "#a5d5bd", bg: "#212d27" },
  travel: { fg: "#abc9f3", bg: "#272d39" },
  housing: { fg: "#dbc38d", bg: "#332d21" },
  transport: { fg: "#abc9f3", bg: "#272d39" },
  subs: { fg: "#cfb7ed", bg: "#2d2739" },
  shopping: { fg: "#edb1c9", bg: "#33272d" },
  health: { fg: "#9fd8bb", bg: "#212d27" },
  entertainment: { fg: "#f0c08f", bg: "#332b21" },
  personal: { fg: "#dcb4e0", bg: "#2d2733" },
  gifts: { fg: "#f0a79d", bg: "#33262a" },
  smaller: { fg: "#a9b7b0", bg: "#242a27" },
};

export function toneFor(id: CategoryId | "smaller", dark: boolean): CategoryTone {
  return (dark ? DARK_TONES : LIGHT_TONES)[id];
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function monthName(m: MonthId) {
  return MONTH_NAMES[Number(m.slice(5, 7)) - 1];
}
export function monthShort(m: MonthId) {
  return monthName(m).slice(0, 3);
}
export function monthLabel(m: MonthId) {
  return `${monthName(m)} ${m.slice(0, 4)}`;
}
export function daysInMonth(m: MonthId) {
  return new Date(Date.UTC(Number(m.slice(0, 4)), Number(m.slice(5, 7)), 0)).getUTCDate();
}

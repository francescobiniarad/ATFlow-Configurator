import { CarModel, CarColor, CarInterior, CarWheel } from "./types";

export const MODELS: CarModel[] = [
  { id: "ev7", name: "ATFlow EV7", type: "SUV Coupé", base: 38900, monthly: 399 },
  { id: "ev9", name: "ATFlow EV9", type: "SUV Premium", base: 52900, monthly: 549 },
  { id: "gt5", name: "ATFlow GT5", type: "Berlina Sportiva", base: 45900, monthly: 469 },
];

export const COLORS: CarColor[] = [
  { name: "Lunar Silver", hex: "#B8B8B8" },
  { name: "Midnight Black", hex: "#111111" },
  { name: "Arctic White", hex: "#EDEDED" },
  { name: "Ocean Blue", hex: "#1B3A5C" },
  { name: "Racing Red", hex: "#8B1A1A" },
  { name: "Forest Green", hex: "#2D4A27" },
];

export const INTERIORS: CarInterior[] = [
  { name: "Nappa Nero", extra: 0 },
  { name: "Nappa Marrone", extra: 1500 },
  { name: "Alcantara Sport", extra: 2200 },
];

export const WHEELS: CarWheel[] = [
  { name: '19" Standard', extra: 0 },
  { name: '20" Sport', extra: 1200 },
  { name: '21" Performance', extra: 2500 },
];

export const PALETTE = {
  blue: "#4B83FF",
  blueD: "#2563EB",
  blueL: "#EBF0FF",
  bg: "#000000",
  card: "#111113",
  cardBorder: "#1E1E22",
  surface: "#0A0A0C",
  white: "#FFFFFF",
  t1: "#FFFFFF",
  t2: "#E4E4E7",
  t3: "#A1A1AA",
  border: "#27272A",
  green: "#22C55E",
  inputBg: "#18181B",
};

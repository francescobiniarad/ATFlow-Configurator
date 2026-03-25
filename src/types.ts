export interface CarModel {
  id: string;
  name: string;
  type: string;
  base: number;
  monthly: number;
}

export interface CarColor {
  name: string;
  hex: string;
}

export interface CarInterior {
  name: string;
  extra: number;
}

export interface CarWheel {
  name: string;
  extra: number;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  options?: string[] | null;
  showCar?: boolean;
  carColor?: string | null;
  isQuoteSent?: boolean;
}

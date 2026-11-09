export type CategoryId =
  | "all"
  | "pizzas"
  | "burgers"
  | "wings"
  | "sides"
  | "deals"
  | "kids"
  | "extras";

export type PizzaSize = "small" | "medium" | "large";

export interface PizzaSizePrice {
  size: PizzaSize;
  label: string;
  price: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number; // For non-pizza or base price
  pizzaPrices?: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  category: "pizzas" | "burgers" | "wings" | "sides" | "deals" | "kids" | "extras";
  description: string;
  price?: number; // For single price items
  sizePrices?: PizzaSizePrice[]; // For pizza or sized items
  defaultSize?: PizzaSize;
  image: string;
  badge?: string;
  includedItems?: string[];
  isDeal?: boolean;
  dealType?: "jumbo" | "regular" | "family" | "midnight" | "kids";
  timeRestricted?: {
    startTime: string; // e.g. "23:00"
    endTime: string;   // e.g. "02:00"
    label: string;     // e.g. "11:00 PM - 2:00 AM"
  };
  allowedExtras?: string[]; // IDs of applicable extras
}

export interface CartItemOption {
  size?: PizzaSize;
  sizeLabel?: string;
  selectedExtras?: {
    id: string;
    name: string;
    price: number;
  }[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique hash (id + size + extras)
  menuItem: MenuItem;
  size?: PizzaSize;
  sizeLabel?: string;
  unitPrice: number;
  selectedExtras: {
    id: string;
    name: string;
    price: number;
  }[];
  quantity: number;
  specialInstructions?: string;
}

export type ServiceType = "delivery" | "takeaway" | "dinein";

export interface CheckoutDetails {
  name: string;
  phone: string;
  serviceType: ServiceType;
  address?: string;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  tag: string;
  date: string;
}


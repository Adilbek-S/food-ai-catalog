export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  city: string;
  price_range: number;
  rating: number;
  image_url: string;
  description: string;
  address: string;
  phone: string;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CartItem {
  id: number;
  menu_item_id: number;
  quantity: number;
  created_at: string;
}

export interface CartItemWithDetails extends CartItem {
  item_name: string;
  item_description: string;
  item_price: number;
  item_category: string;
  restaurant_id: number;
  restaurant_name: string;
}

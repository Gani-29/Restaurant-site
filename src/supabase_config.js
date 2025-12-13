import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ---------- CART HELPERS ---------- */

export async function addToCart({ userId, dish }) {
  const { error } = await supabase.from("cart_items").insert([
    {
      user_id: userId,
      dish_id: dish.id,
      name: dish.name,
      quantity: 1,
      price: dish.price,
    },
  ]);

  if (error) {
    throw error;
  }
}

export async function fetchCartItems(userId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
}


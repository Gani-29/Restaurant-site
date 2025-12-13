import { useEffect, useState } from "react";
import { supabase, fetchCartItems } from "../supabase_config";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const data = await fetchCartItems(session.user.id);
      setItems(data);
    };

    loadCart();
  }, []);

  if (items.length === 0) {
    return <p className="p-8 text-center">Your cart is empty</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b py-3"
        >
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}
    </div>
  );
}

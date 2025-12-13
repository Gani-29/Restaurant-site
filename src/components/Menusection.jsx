import { supabase, addToCart } from "../supabase_config";

export default function MenuSection() {
  // ✅ DEFINE DISHES (FAKE DATA – YOU CAN CHANGE IMAGES LATER)
  const dishes = [
    {
      id: "fc1",
      name: "Mutton Biryani",
      price: 799,
      image: "https://images.unsplash.com/photo-1600628422019-56f4b5c3d87f",
    },
    {
      id: "fc2",
      name: "Chicken Biryani",
      price: 699,
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d9a",
    },
    {
      id: "fc3",
      name: "Veg Biryani",
      price: 599,
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    },
  ];

  const handleAddToCart = async (dish) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Please login first");
      return;
    }

    try {
      await addToCart({
        userId: session.user.id,
        dish,
      });

      alert("Item added to cart");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section id="menu" className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Our Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{dish.name}</h3>
              <p className="text-gray-600">₹{dish.price}</p>

              <button
                onClick={() => handleAddToCart(dish)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

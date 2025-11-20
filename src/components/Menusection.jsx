// components/MenuSection.jsx

export default function MenuSection() {
  const menu = [
  
    { id: 1, name: "Pizza Delight", price: "₹250", description: "Classic margherita with fresh basil and mozzarella." },
    { id: 2, name: "Gourmet Burger", price: "₹120", description: "Juicy patty, melted cheese, and signature sauce on a brioche bun." },
    { id: 3, name: "Creamy Pesto Pasta", price: "₹180", description: "Al dente pasta tossed in rich pesto cream and sun-dried tomatoes." },
    { id: 4, name: "Spicy Tacos", price: "₹150", description: "Two soft shell tacos filled with seasoned ground meat and fresh toppings." },
    { id: 5, name: "Vegan Salad", price: "₹200", description: "Mixed greens, quinoa, avocado, and house vinaigrette." },
    { id: 6, name: "Chocolate Lava Cake", price: "₹90", description: "Warm chocolate cake with a molten center, served with vanilla ice cream." },
  ];

  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-100 text-center rounded-xl shadow-xl mx-auto max-w-6xl my-12 px-6 sm:px-10">
      
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-12 tracking-tight">
        Our Delicious Menu
      </h2>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {menu.map((item) => (
          
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] text-left border-t-4 border-green-500"
          >
           
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {item.name}
            </h3>
          
            <p className="text-sm text-gray-500 mb-3 italic">
              {item.description}
            </p>
           
            <p className="text-2xl font-extrabold text-green-600">
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

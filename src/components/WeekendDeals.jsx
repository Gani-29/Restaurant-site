export default function WeekendDeals() {
  const deals = [
    {
      id: 1,
      name: "Mocktails",
      price: "₹500",
      image:"https://www.thebostonshaker.com/wp-content/uploads/2025/01/What-Are-Mocktails.jpeg",
      bg: "bg-pink-100",
    },
    {
      id: 2,
      name: "Italian Pasta",
      price: "₹400",
      image: "https://www.acouplecooks.com/wp-content/uploads/2023/10/Tagliatelle-Recipe-002.jpg",
      bg: "bg-red-100",
    },
    {
      id: 3,
      name: "Cocktails",
      price: "₹800",
      image: "https://i.pinimg.com/originals/2a/c4/77/2ac477bc2708882901461560be69b9ab.jpg",
      bg: "bg-green-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Weekend Deals</h2>
        <p className="text-green-600 text-sm mt-1">
          Hurry up!! Limited time offer
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`${deal.bg} rounded-[140px] p-10 flex items-center gap-6
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl`}
          >
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">
                Weekend Deals
              </p>
              <h3 className="text-xl font-bold">{deal.name}</h3>
              <p className="mt-3 font-semibold">{deal.price}</p>

              <button
                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-full
                  text-sm font-semibold
                  transition hover:bg-red-600 hover:scale-105"
              >
                Order Now →
              </button>
            </div>

            <img
              src={deal.image}
              alt={deal.name}
              className="w-36 h-36 rounded-full object-cover
                transition-transform duration-300
                hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

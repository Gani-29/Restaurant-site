export default function WeekendDeals() {
  const deals = [
    {
      title: "Mocktails",
      price: "₹249",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=600",
      bg: "bg-pink-100",
    },
    {
      title: "Italian Pasta",
      price: "₹349",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600",
      bg: "bg-red-100",
    },
    {
      title: "Cocktails",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600",
      bg: "bg-green-100",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold">Weekend Deals</h2>
      <p className="text-green-600 mt-2">Hurry up!! Limited time offer</p>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {deals.map((deal, index) => (
          <div
            key={index}
            className={`${deal.bg} rounded-full px-10 py-8 flex items-center gap-6 w-[360px]`}
          >
            {/* Text */}
            <div className="text-left">
              <p className="text-sm text-gray-500">WEEKEND DEALS</p>
              <h3 className="text-xl font-bold">{deal.title}</h3>
              <p className="text-lg font-semibold mt-1">{deal.price}</p>

              {/* Order Now → Menu */}
              <a
                href="#menu"
                className="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-nunito font-extrabold transition"
              >
                Order Now →
              </a>
            </div>

            {/* Image */}
            <img
              src={deal.image}
              alt={deal.title}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}


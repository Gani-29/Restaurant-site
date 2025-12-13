import { useEffect, useState } from "react";

/* ----------------------------------
   FAKE IMAGE SLIDES (REPLACE LATER)
----------------------------------- */
const slides = [
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
    title: "The best Food Collection 2025",
    subtitle: "Exclusive offer 35% off this week",
  },
  {
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80",
    title: "Fresh & Healthy Meals",
    subtitle: "Hurry up! Limited time offer",
  },
  {
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&q=80",
    title: "Delicious Every Bite",
    subtitle: "Taste that makes you happy",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">

      {/* SLIDE BACKGROUNDS */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/65" />
        </div>
      ))}

      {/* HERO CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-gray-300 mb-3">
            Starting at ₹400
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
            {slides[current].title}
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            {slides[current].subtitle.includes("35%") ? (
              <>
                Exclusive offer{" "}
                <span className="text-yellow-400 underline">35%</span> off this week
              </>
            ) : (
              slides[current].subtitle
            )}
          </p>

          {/* BUTTON */}
          <button
            onClick={() =>
              document.getElementById("menu")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            See Our Menus
          </button>
        </div>
      </div>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current
                ? "bg-yellow-400"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


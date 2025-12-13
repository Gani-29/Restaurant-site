import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#f7f9fc] pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* LEFT RED CARD */}
        <div className="bg-[#f4253a] text-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-1">pizza hut</h3>
          <p className="text-xs mb-6">FOOD & RESTAURANT</p>

          <p className="text-sm font-semibold">
            Tuesday – Saturday: 12:00pm – 23:00pm
          </p>
          <p className="text-sm mt-2 font-semibold">
            Closed on Sunday
          </p>

          {/* DOTS */}
          <div className="flex gap-2 mt-4">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>

          <p className="text-xs mt-6">
            ⭐ 5 star rated on TripAdvisor
          </p>
        </div>

        {/* ABOUT */}
        <div>
          <h4 className="font-bold mb-4 inline-block relative">
            About
            <span className="absolute left-0 -bottom-1 w-10 h-[3px] bg-yellow-400"></span>
          </h4>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>› Fredoka One</li>
            <li>› Special Dish</li>
            <li>› Reservation</li>
            <li>› Contact</li>
          </ul>
        </div>

        {/* MENU */}
        <div>
          <h4 className="font-bold mb-4 inline-block relative">
            Menu
            <span className="absolute left-0 -bottom-1 w-10 h-[3px] bg-yellow-400"></span>
          </h4>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>› Steaks</li>
            <li>› Burgers</li>
            <li>› Cocktails</li>
            <li>› Bar B Q</li>
            <li>› Desserts</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-bold mb-4 inline-block relative">
            Newsletter
            <span className="absolute left-0 -bottom-1 w-14 h-[3px] bg-yellow-400"></span>
          </h4>

          <p className="text-sm text-gray-600 mb-4">
            Get recent news and updates.
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 mb-4 outline-none"
          />

          <button className="bg-[#f4253a] hover:bg-red-600 transition text-white px-6 py-3 rounded-md font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* BOTTOM YELLOW LINE */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="h-1 bg-yellow-400"></div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-xs text-gray-600">
        <p>© 2025 Gani's Resto | All Rights Reserved</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
      </div>

      {/* DECORATIVE FOOD ILLUSTRATIONS (FAKE) */}
      <img
        src="https://i.imgur.com/WqkXH0F.png"
        alt=""
        className="absolute left-0 bottom-0 w-40 opacity-20 hidden md:block"
      />
      <img
        src="https://i.imgur.com/9N2zJ2F.png"
        alt=""
        className="absolute right-0 bottom-0 w-40 opacity-20 hidden md:block"
      />
    </footer>
  );
}

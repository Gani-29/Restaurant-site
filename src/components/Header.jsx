export default function Header({ setPage, cartCount }) {

  const goToReservation = () => {
    // ensure we are on home first
    setPage("home");

    // wait for home + reservation section to mount
    setTimeout(() => {
      document
        .getElementById("reservation")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2"
        >
          <img src="/logo.png" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-red-500">Gani's Resto</span>
        </button>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <button onClick={() => setPage("home")}>Home</button>

          {/* 🔁 CONTACT → RESERVE TABLE */}
          <button onClick={goToReservation}>
            Reserve Table
          </button>

          <button
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Menu
          </button>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* CART */}
          <button
            onClick={() => setPage("cart")}
            className="relative"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* ✅ CONTACT US BUTTON (RESTORED) */}
          <button
            onClick={() => setPage("contact")}
            className="hidden md:block bg-yellow-400 px-4 py-2 rounded-md font-semibold"
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}




import Hero from "../components/Hero";
import WeekendDeals from "../components/WeekendDeals";
import MenuSection from "../components/MenuSection";
import Reservation from "../components/Reservation";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <WeekendDeals />
      <MenuSection />
      <Reservation />

      {/* FOOTER AT BOTTOM */}
      <Footer />
    </>
  );
}


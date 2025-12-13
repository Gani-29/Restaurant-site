import { useEffect, useState } from "react";
import { supabase } from "./supabase_config";

/* COMPONENTS */
import Header from "./components/Header";


/* PAGES */
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";

export default function App() {
  const [page, setPage] = useState("home");
  const [session, setSession] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  /* AUTH LISTENER */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* LOGIN FIRST */
  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header setPage={setPage} cartCount={cartItems.length} />

      {page === "home" && <Home />}
      {page === "cart" && <Cart />}
      {page === "contact" && <Contact />}
    </div>
  );
}

import { useState } from "react";
import { supabase } from "../supabase_config";

export default function Reservation() {
  const [form, setForm] = useState({
    guests: "",
    name: "",
    mobile: "",
    date: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id || "guest-user";

    await supabase.from("reservations").insert([
      {
        reservedBy: userId,
        name: form.name,
        mobile: form.mobile,
        date: form.date,
        time: form.time,
        guests: Number(form.guests),
      },
    ]);

    alert("Reservation saved successfully");

    setForm({
      guests: "",
      name: "",
      mobile: "",
      date: "",
      time: "",
    });
  };

  return (
    <section
      id="reservation"
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Reservation Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 underline decoration-yellow-500">
          Reserve a Table
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="No of Guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            placeholder="Phone No"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 md:col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-10 rounded-full mx-auto block transition"
        >
          Book Now
        </button>
      </form>
    </section>
  );
}




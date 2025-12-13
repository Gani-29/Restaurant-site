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

    const userId = session?.user?.id || getLocalUserId();

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
      id="reservation"   // ✅ THIS IS THE REQUIRED FIX
      className="py-20 bg-gray-100 flex justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Reserve a Table</h2>

        <input
          placeholder="No of Guests"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
          required
        />

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Phone"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />

        <button className="bg-red-500 text-white w-full py-2 rounded">
          Book Now
        </button>
      </form>
    </section>
  );
}



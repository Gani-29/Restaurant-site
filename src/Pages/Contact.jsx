export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    e.target.reset();
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-4">
          Contact Us
        </h1>

        <p className="text-center text-gray-500 mb-12">
          We'd love to hear from you. Send us a message.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* CONTACT INFO */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-2">📍 Bangalore, India</p>
            <p className="text-gray-600 mb-2">📞 +91 98765 43210</p>
            <p className="text-gray-600 mb-2">✉️ support@pizzahut.com</p>
          </div>

          {/* CONTACT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow space-y-4"
          >
            <input
              required
              placeholder="Your Name"
              className="w-full border p-3 rounded"
            />
            <input
              required
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded"
            />
            <textarea
              required
              placeholder="Your Message"
              rows="4"
              className="w-full border p-3 rounded"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded font-semibold"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

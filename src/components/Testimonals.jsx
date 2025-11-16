// components/Testimonials.jsx
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Anita",
      message: "The food is absolutely delicious! I loved every bite.",
    },
    {
      id: 2,
      name: "Rahul",
      message: "Great taste, fast service, and amazing ambience!",
    },
    {
      id: 3,
      name: "Priya",
      message: "Best restaurant experience I've had in a long time.",
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="section-title">What Our Customers Say</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "10px 0",
        }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              minWidth: "250px",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontStyle: "italic" }}>"{review.message}"</p>
            <h4 style={{ marginTop: "10px", textAlign: "right" }}>
              - {review.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}


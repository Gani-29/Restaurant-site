// components/MenuSection.jsx
export default function MenuSection() {
  const menu = [
    { id: 1, name: "Pizza", price: "₹250" },
    { id: 2, name: "Burger", price: "₹120" },
    { id: 3, name: "Pasta", price: "₹180" },
  ];

  return (
    <section id="menu" className="menu-section">
      <h2>Our Menu</h2>
      <div className="menu-grid">
        {menu.map((item) => (
          <div key={item.id} className="menu-card">
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

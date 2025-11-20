// components/Testimonials.jsx

export default function Testimonals() {
  const reviews = [
    {
      id: 1,
      name: "Anita M.",
      message: "The food is absolutely delicious! I loved every bite. The ingredients are so fresh, and the presentation is top-notch. Highly recommend!",
    },
    {
      id: 2,
      name: "Rahul S.",
      message: "Great taste, fast service, and amazing ambience! The staff were incredibly friendly and accommodating. Definitely my new favorite spot.",
    },
    {
      id: 3,
      name: "Priya V.",
      message: "Best restaurant experience I've had in a long time. The Pesto Pasta was divine, and the dessert was the perfect finish.",
    },
    {
      id: 4,
      name: "Karan B.",
      message: "An authentic food journey! Every dish we tried was rich in flavor and perfectly cooked. Can't wait to come back for more.",
    },
    {
      id: 5,
      name: "Deepika R.",
      message: "Excellent value for money. The portions are generous, and the quality is consistently high. A must-visit place for food lovers.",
    },
  ];

  return (
   
    <section id="testimonials" className="py-16 md:py-24 bg-white text-center rounded-xl shadow-xl mx-auto max-w-6xl my-12 px-6 sm:px-10">
      
     
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-12 tracking-tight">
        What Our Customers Say
      </h2>

      <div
        className="flex lg:grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto overflow-x-auto pb-4 lg:overflow-visible lg:pb-0 justify-start lg:justify-center"
      >
        {reviews.map((review) => (
         
          <div
            key={review.id}
            className="min-w-[300px] lg:min-w-0 bg-white p-6 border border-gray-200 rounded-xl shadow-md shrink-0 lg:shrink"
          >
           
            <svg 
                className="w-8 h-8 text-green-500 mb-3 mx-auto" 
                fill="currentColor" 
                viewBox="0 0 24 24"
            >
                <path d="M13.75 3a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V5.04l-2.07 2.07a.75.75 0 01-1.06-1.06L12.5 3.94A.75.75 0 0113 3h.75zM10.25 15a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zM13 14.75a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75z" />
            </svg>
            

            <p className="text-gray-700 italic text-base mb-4 leading-relaxed">
              "{review.message}"
            </p>
            
            
            <h4 className="text-lg font-semibold text-green-600 text-right mt-3">
              - {review.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}

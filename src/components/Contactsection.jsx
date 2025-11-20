// components/ContactSection.jsx

export default function ContactSection() {
  return (
   
    <section id="contact" className="py-16 md:py-24 bg-gray-50 text-center rounded-xl shadow-2xl mx-auto max-w-xl my-12 px-6 sm:px-10">
      
     
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-10 tracking-tight">
        Contact Us
      </h2>

      
      <form className="flex flex-col space-y-4 text-left">
        
      
        <input 
          type="text" 
          placeholder="Your Name" 
          required 
          className="p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition duration-200 w-full placeholder-gray-500"
        />
        
        <input 
          type="email" 
          placeholder="Your Email" 
          required 
          className="p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition duration-200 w-full placeholder-gray-500"
        />
        
        <textarea 
          placeholder="Your Message" 
          required 
          rows="5" 
          className="p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition duration-200 w-full resize-none placeholder-gray-500"
        ></textarea>
        
        <button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.01] shadow-lg mt-6 w-full"
        >
          Send Message
        </button>
      </form>
      
    </section>
  );
}
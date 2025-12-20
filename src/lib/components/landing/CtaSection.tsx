export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Data Now</h2>
          <p className="text-gray-300 mb-10 text-xl">
            Schedule a consultation with our cybersecurity experts
          </p>
          
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:-translate-y-1">
            Book a Call
          </button>
        </div>
      </div>
    </section>
  )
}
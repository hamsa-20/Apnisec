export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-black to-purple-900 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Defend Against Cyber Threats
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Before They Strike
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Elevate Your Security Posture With Advanced Security Solutions And In-Depth Vulnerability Assessments, 
            Aligned With The Trusted Frameworks Of OWASP, NIST, SANS, CERT, And NIC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
              Download Free Report
            </button>
            <button className="bg-transparent border-2 border-cyan-500 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all">
              Get Quote
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="text-3xl font-bold text-cyan-400">100+</div>
            <div className="text-gray-400">Organizations Secured</div>
          </div>
        </div>
      </div>
    </section>
  )
}
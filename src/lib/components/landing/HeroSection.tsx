import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Enterprise Cybersecurity
          <span className="block text-blue-600">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Protect your digital assets with ApniSec's comprehensive security solutions.
          Cloud security, vulnerability assessments, and penetration testing in one platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Start Free Trial
            </button>
          </Link>
          <Link href="/#services">
            <button className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
              View Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
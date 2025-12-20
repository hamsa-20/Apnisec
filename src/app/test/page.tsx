export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Tailwind Test</h1>
      <p className="text-gray-300 mb-6">If this text is colored, Tailwind is working.</p>
      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
        Test Button
      </button>
    </div>
  )
}
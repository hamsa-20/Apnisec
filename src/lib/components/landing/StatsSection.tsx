export default function StatsSection() {
  const stats = [
    { value: "849M+", label: "Lines Of Code Reviewed" },
    { value: "3Bn+", label: "Records Scraped" },
    { value: "15K+", label: "Assets Monitored" },
    { value: "200TB+", label: "Data Analysed" },
    { value: "99.99%", label: "Threat Mitigation" }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Numbers Don't Lie</h2>
          <p className="text-gray-300 text-xl">Data speaks for itself, make informed decisions</p>
          <p className="text-cyan-300 font-semibold mt-2">All in One Cyber Defence platform</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
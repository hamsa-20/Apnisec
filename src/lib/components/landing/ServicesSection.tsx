export default function ServicesSection() {
  const services = [
    {
      title: "Dark Eye Watcher",
      description: "Monitor The Dark Web For Compromised Data.",
      features: [
        "Tracking Data Breaches 24x7",
        "Threat Intelligence Platform",
        "Data Loss Prevention (DLP)",
        "Brand Protection Services"
      ]
    },
    {
      title: "Red Team Assessment",
      description: "Social Engineering Simulation Campaigns & Evaluation",
      features: [
        "Assess Vulnerabilities In System And Processes",
        "On-Site Network Firewall And Process Audits",
        "Cloud Attack Emulation"
      ]
    },
    {
      title: "Virtual CISO",
      description: "Continuous Vulnerability Scanning & Asset Monitoring",
      features: [
        "Auditing Weekly Feature Releases",
        "DevSecOps - Shift Left Culture",
        "Zero Trust Security Model",
        "Threat Modelling"
      ]
    },
    {
      title: "Cloud Watcher",
      description: "Comprehensive Cloud Security Monitoring",
      features: [
        "Asset Monitoring",
        "Cloud Security Posture Management",
        "Microservices Security",
        "Cloud Attack Emulation"
      ]
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Services</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive Cybersecurity Solutions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-900/20"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
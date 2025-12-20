export default function FeaturesSection() {
  const features = [
    {
      title: "Brand Protection Services",
      items: [
        "Cloud Watcher",
        "Asset Monitoring",
        "Cloud Security Posture Management",
        "Microservices Security",
        "Cloud Attack Emulation"
      ]
    },
    {
      title: "End-to-End VAPT",
      items: [
        "Web, API & Mobile Application Security",
        "Secure Code Review",
        "Vulnerability Assessment & Penetration Testing",
        "Network Security"
      ]
    },
    {
      title: "Threat Modelling",
      items: [
        "Social Engineering Simulations & Awareness Trainings",
        "Information Security Policy & Cyber Risk Maturity Plan",
        "Secure Architecture Review",
        "Bug Bounty Program Management",
        "Vendor Monitoring System",
        "Compliance As A Service"
      ]
    }
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Brand Protection Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>
              <ul className="space-y-4">
                {feature.items.map((item, i) => (
                  <li key={i} className="text-gray-300 border-l-4 border-cyan-500 pl-4 py-2">
                    {item}
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
export default function ProcessSection() {
  const steps = [
    {
      title: "Identify Critical Assets",
      description: "Primary Customer And Internet Facing Applications"
    },
    {
      title: "Watcher Onboarding",
      description: "Asset Monitoring, SCM, Dark Eye Watcher For Overall Monitoring"
    },
    {
      title: "Vulnerability Assessment",
      description: "Security Testing By Expertise Team Of Certified Hackers"
    },
    {
      title: "Reporting And Mitigation",
      description: "Regular Reporting, Patching, Re-Testing Patches With PR Reviews & Audit Certificate"
    },
    {
      title: "VCISO",
      description: "Acting As A Security Team With Regular Threat Modelling And Architecture & Code Reviews"
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How We Do It</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="hidden md:block w-1/2"></div>
              
              <div className="relative z-10">
                <div className="w-6 h-6 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
              </div>
              
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
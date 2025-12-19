export default function ServicesSection() {
  const services = [
    {
      title: 'Cloud Security',
      description: 'Comprehensive security solutions for your cloud infrastructure.',
      icon: '☁️'
    },
    {
      title: 'Reteam Assessment',
      description: 'Evaluate and optimize your security team structure and processes.',
      icon: '👥'
    },
    {
      title: 'VAPT',
      description: 'Vulnerability Assessment and Penetration Testing for robust security.',
      icon: '🔒'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Our Security Services
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive cybersecurity solutions tailored to your business needs
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
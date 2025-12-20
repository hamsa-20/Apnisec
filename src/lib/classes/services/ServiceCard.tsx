import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  color: 'blue' | 'cyan' | 'red' | 'purple' | 'green';
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  features, 
  href,
  color 
}: ServiceCardProps) {
  const colorClasses = {
    blue: 'border-blue-500 hover:border-blue-400',
    cyan: 'border-cyan-500 hover:border-cyan-400',
    red: 'border-red-500 hover:border-red-400',
    purple: 'border-purple-500 hover:border-purple-400',
    green: 'border-green-500 hover:border-green-400'
  };

  const iconBgClasses = {
    blue: 'bg-blue-900/30',
    cyan: 'bg-cyan-900/30',
    red: 'bg-red-900/30',
    purple: 'bg-purple-900/30',
    green: 'bg-green-900/30'
  };

  const iconColorClasses = {
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
    green: 'text-green-400'
  };

  return (
    <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border ${colorClasses[color]} transition-all hover:scale-[1.02] h-full`}>
      <div className="flex items-start mb-4">
        <div className={`p-3 rounded-lg ${iconBgClasses[color]} mr-4`}>
          <Icon className={`h-8 w-8 ${iconColorClasses[color]}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <span className="text-green-400 mr-2">✓</span>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        href={href}
        className={`inline-flex items-center justify-center w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border ${colorClasses[color]} text-white font-medium transition-all`}
      >
        Learn More
      </Link>
    </div>
  );
}
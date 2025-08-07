import React from 'react';
import {
  CheckCircle,
  Users,
  Zap,
  Shield,
  Smartphone,
  Star,
} from 'lucide-react'; // ✅ Adjust if you use a different icon library

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Smart Task Management',
      description:
        'Organize, prioritize, and track your tasks with intelligent automation and AI-powered suggestions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Real-time Collaboration',
      description:
        'Work seamlessly with your team in real-time. Share tasks, updates, and progress instantly.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description:
        'Built for speed and efficiency. Access your tasks instantly from anywhere, anytime.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description:
        'Your data is protected with enterprise-grade security and 99.9% uptime guarantee.',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Cross-Platform',
      description:
        'Access TodoCloudy on any device - desktop, tablet, or mobile. Your tasks sync everywhere.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Experience',
      description:
        'Beautiful design meets powerful functionality. Enjoy a delightful task management experience.',
    },
  ];

return (
    <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Stay organized effortlessly
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center text-center"
                    >
                        <div className="mb-3 text-blue-600">{feature.icon}</div>
                        <h3 className="text-base font-medium text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};

export default Features;

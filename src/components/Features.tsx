
import { 
  Layout, 
  LineChart, 
  AlertTriangle, 
  Bot, 
  ArrowRightLeft, 
  ShieldCheck, 
  BarChart4 
} from "lucide-react";

const features = [
  {
    title: "Policy Dashboard",
    description: "View and manage all your insurance policies in one place, with easy access to key details.",
    icon: Layout,
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "AI Policy Advisor",
    description: "Get personalized recommendations based on your profile, assets, and risk factors.",
    icon: Bot,
    color: "bg-purple-100 text-purple-700"
  },
  {
    title: "Policy Comparison",
    description: "Compare different insurance policies side-by-side to find the best coverage for your needs.",
    icon: ArrowRightLeft,
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Coverage Analysis",
    description: "Analyze your current coverage to identify gaps and optimize your protection.",
    icon: LineChart,
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    title: "Automated Alerts",
    description: "Receive timely notifications about policy renewals and claim status updates.",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700"
  },
  {
    title: "Security First",
    description: "Your data is protected with enterprise-grade security and encryption.",
    icon: ShieldCheck,
    color: "bg-teal-100 text-teal-700"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-insure-navy mb-4">
            All Your Insurance Needs in One Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insure360 provides powerful tools to manage, compare, and optimize your insurance coverage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm card-hover"
            >
              <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-insure-dark-slate">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

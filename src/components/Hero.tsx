
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center py-16 md:py-24">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Simplify Your Insurance Management
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-lg">
              One platform to manage all your insurance policies. Compare, analyze, and optimize your coverage with AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-insure-teal hover:bg-insure-teal/90 text-white">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-insure-teal mr-2" />
                <span>Save up to 30% on premiums</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-insure-teal mr-2" />
                <span>AI-powered policy analysis</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-insure-teal/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <Shield className="h-10 w-10 text-insure-teal" />
                  <h3 className="text-2xl font-bold ml-3">Policy Dashboard</h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Home Insurance</div>
                        <span className="text-insure-teal px-2 py-1 rounded-full text-xs bg-insure-teal/20">Active</span>
                      </div>
                      <div className="text-sm text-gray-100">Coverage: $250,000</div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span>Premium: $1,200/yr</span>
                        <span>Expires: 11/2023</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

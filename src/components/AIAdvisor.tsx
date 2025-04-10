
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight, Shield, AlertCircle, CheckCircle } from "lucide-react";

const AIAdvisor = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-insure-navy/5 to-insure-teal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-insure-teal/10 rounded-full mb-4">
            <Brain className="h-8 w-8 text-insure-teal" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-insure-navy mb-4">
            AI-Powered Insurance Advisor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations and identify gaps in your coverage with our advanced AI assistant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Coverage Gap Detected
                  </CardTitle>
                  <CardDescription>Your home insurance may have insufficient coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on your home's location and value, your current coverage of $350,000 may be inadequate. 
                    We recommend increasing to at least $425,000.
                  </p>
                  <Button variant="outline" size="sm">View Recommendation</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Savings Opportunity
                  </CardTitle>
                  <CardDescription>You could save on your auto insurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    By bundling your auto insurance with your home insurance provider, 
                    you could save approximately $240 annually.
                  </p>
                  <Button variant="outline" size="sm">Explore Options</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    Recommended Policy
                  </CardTitle>
                  <CardDescription>Based on your profile and needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Given your lifestyle and family situation, we recommend adding an umbrella insurance policy 
                    for additional liability protection.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 h-20 w-20 bg-insure-teal/10 rounded-bl-xl rounded-tr-xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-insure-navy">How It Works</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-insure-light-blue/20 flex items-center justify-center text-insure-navy font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-insure-navy">Connect Your Policies</h4>
                    <p className="text-gray-600 mt-1">Link your existing insurance policies to Insure360.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-insure-light-blue/20 flex items-center justify-center text-insure-navy font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-insure-navy">AI Analysis</h4>
                    <p className="text-gray-600 mt-1">Our AI analyzes your coverage, risks, and personal profile.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-insure-light-blue/20 flex items-center justify-center text-insure-navy font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-insure-navy">Get Recommendations</h4>
                    <p className="text-gray-600 mt-1">Receive personalized insights and recommendations.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-insure-light-blue/20 flex items-center justify-center text-insure-navy font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-insure-navy">Optimize Coverage</h4>
                    <p className="text-gray-600 mt-1">Take action on recommendations to improve your coverage.</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8 w-full bg-insure-teal hover:bg-insure-teal/90">
                Get Your Personalized Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;


import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  FileText, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Award,
  Building,
  FileQuestion,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Policy, PolicyStatus } from '@/types/policy';

// Mock policy data
const mockPolicy: Policy = {
  id: "p1",
  type: "auto",
  name: "Comprehensive Auto Insurance",
  description: "Full coverage for your vehicle with roadside assistance",
  provider: "SafeGuard Insurance",
  agencyId: "a1",
  coverage: "$250,000",
  premium: "$1,500/year",
  priceValue: 1500,
  deductible: "$500",
  deductibleValue: 500,
  term: "12 months",
  renewalDate: "2024-05-15",
  status: "active",
  documents: ["policy.pdf", "terms.pdf"],
  benefits: [
    "Collision coverage",
    "Comprehensive coverage",
    "Liability protection",
    "Roadside assistance",
    "Rental car reimbursement"
  ],
  exclusions: [
    "Racing or competitive driving",
    "Using vehicle for commercial purposes",
    "Intentional damage"
  ],
  createdAt: "2023-05-15T10:00:00Z",
  updatedAt: "2023-05-15T10:00:00Z"
};

const statusColors: Record<PolicyStatus, string> = {
  active: "text-green-600 bg-green-100",
  pending: "text-yellow-600 bg-yellow-100",
  expired: "text-red-600 bg-red-100",
  cancelled: "text-gray-600 bg-gray-100"
};

const PolicyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [policy] = useState<Policy>(mockPolicy);
  const { toast } = useToast();
  
  const handleFileClaim = () => {
    toast({
      title: "Filing Claim",
      description: "Redirecting to claim form",
    });
    // In a real app, this would redirect to the claim form
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center">
                <Link to="/dashboard" className="text-insure-teal hover:underline text-sm">
                  ← Back to Dashboard
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-insure-navy mt-2">{policy.name}</h1>
              <div className="flex items-center mt-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[policy.status]}`}>
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </span>
                <span className="text-gray-500 ml-4">Policy #12345-AB</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => window.print()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Print Details
              </Button>
              
              <Button 
                className="bg-insure-teal hover:bg-insure-teal/90"
                onClick={handleFileClaim}
              >
                <Shield className="h-4 w-4 mr-2" />
                File a Claim
              </Button>
            </div>
          </div>
          
          {policy.status === 'expired' && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0 mr-3" />
                <div>
                  <p className="font-medium text-amber-700">Your policy has expired</p>
                  <p className="text-sm text-amber-600 mt-1">
                    This policy expired on {new Date(policy.renewalDate).toLocaleDateString()}. 
                    Please contact {policy.provider} or renew your policy online.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Renew Policy
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="claims">Claims History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Policy Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Policy Type</p>
                          <p className="font-medium">Auto Insurance</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Provider</p>
                          <p className="font-medium">{policy.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage Amount</p>
                          <p className="font-medium">{policy.coverage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Premium</p>
                          <p className="font-medium">{policy.premium}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Deductible</p>
                          <p className="font-medium">{policy.deductible}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Term</p>
                          <p className="font-medium">{policy.term}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Effective Date</p>
                          <p className="font-medium">May 15, 2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Renewal Date</p>
                          <p className="font-medium">
                            {new Date(policy.renewalDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Policy Description</h3>
                        <p className="text-gray-600">{policy.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {policy.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Exclusions</CardTitle>
                      <CardDescription>Situations not covered by this policy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {policy.exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="border-t-4 border-t-insure-teal">
                    <CardHeader>
                      <CardTitle className="text-lg">Provider Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center mb-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                          <Building className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="font-medium text-lg">{policy.provider}</h3>
                        <p className="text-sm text-gray-500">Your Insurance Provider</p>
                      </div>
                      
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p className="font-medium">(555) 123-4567</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">support@safeguard.example</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Claims Hotline</p>
                          <p className="font-medium">(555) 999-8888</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        Contact Provider
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Policy Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <FileQuestion className="h-4 w-4 mr-2" />
                        Request Policy Changes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2" />
                        Add to Comparison
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Review Coverage
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6 bg-insure-navy text-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Need Assistance?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        Our insurance experts are available to help with any questions about your policy.
                      </p>
                      <Button className="w-full bg-white text-insure-navy hover:bg-gray-100">
                        Get Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="coverage" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Details</CardTitle>
                  <CardDescription>Comprehensive breakdown of your coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Coverage Summary</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Bodily Injury Liability</p>
                          <p className="text-lg font-medium">$100,000 per person</p>
                          <p className="text-lg font-medium">$300,000 per accident</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Property Damage Liability</p>
                          <p className="text-lg font-medium">$50,000 per accident</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Collision Coverage</p>
                          <p className="text-lg font-medium">$500 deductible</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Comprehensive Coverage</p>
                          <p className="text-lg font-medium">$500 deductible</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Medical Payments</p>
                          <p className="text-lg font-medium">$5,000 per person</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Uninsured Motorist</p>
                          <p className="text-lg font-medium">$100,000 per person</p>
                          <p className="text-lg font-medium">$300,000 per accident</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Additional Coverage</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Roadside Assistance</p>
                            <p className="text-gray-600 text-sm">24/7 emergency roadside assistance including towing, battery jump-start, flat tire change, lockout service, and fuel delivery.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Rental Car Reimbursement</p>
                            <p className="text-gray-600 text-sm">Up to $30 per day for a maximum of 30 days while your vehicle is being repaired due to a covered loss.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Gap Insurance</p>
                            <p className="text-gray-600 text-sm">Covers the difference between the actual cash value of your vehicle and the amount you still owe on your auto loan or lease.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Coverage Definitions</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Bodily Injury Liability</p>
                          <p className="text-gray-600 text-sm">Covers costs associated with injuries and death that you or another driver causes while driving your car.</p>
                        </div>
                        <div>
                          <p className="font-medium">Property Damage Liability</p>
                          <p className="text-gray-600 text-sm">Covers you if your car damages someone else's property.</p>
                        </div>
                        <div>
                          <p className="font-medium">Collision Coverage</p>
                          <p className="text-gray-600 text-sm">Covers damage to your car after an accident regardless of fault.</p>
                        </div>
                        <div>
                          <p className="font-medium">Comprehensive Coverage</p>
                          <p className="text-gray-600 text-sm">Covers damage to your car due to theft, vandalism, natural disasters, falling objects, etc.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Policy Documents</CardTitle>
                  <CardDescription>Access and download all your policy documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-insure-teal mr-3" />
                        <div>
                          <p className="font-medium">Policy Contract</p>
                          <p className="text-sm text-gray-500">PDF • 2.4 MB • Uploaded May 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-insure-teal mr-3" />
                        <div>
                          <p className="font-medium">Insurance ID Card</p>
                          <p className="text-sm text-gray-500">PDF • 0.5 MB • Uploaded May 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-insure-teal mr-3" />
                        <div>
                          <p className="font-medium">Coverage Summary</p>
                          <p className="text-sm text-gray-500">PDF • 1.2 MB • Uploaded May 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-insure-teal mr-3" />
                        <div>
                          <p className="font-medium">Terms and Conditions</p>
                          <p className="text-sm text-gray-500">PDF • 3.1 MB • Uploaded May 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Request Additional Documents</h3>
                    <p className="text-gray-600 mb-4">Need other policy documents? Submit a request and we'll make them available for download.</p>
                    <Button variant="outline">Request Documents</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="claims" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Claims History</CardTitle>
                  <CardDescription>View and manage your insurance claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Recent Claims</h3>
                    <Button 
                      className="bg-insure-teal hover:bg-insure-teal/90"
                      onClick={handleFileClaim}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      File a New Claim
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
                              In Review
                            </span>
                            <span className="text-gray-500 text-sm ml-2">Claim #ABC123456</span>
                          </div>
                          <p className="font-medium mt-2">Fender Bender Accident</p>
                          <p className="text-sm text-gray-600 mt-1">Filed on March 12, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      <div className="mt-3 border-t pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Claim Amount</p>
                            <p className="font-medium">$2,800</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Deductible Paid</p>
                            <p className="font-medium">$500</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Assigned Agent</p>
                            <p className="font-medium">Sarah Johnson</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                              Approved
                            </span>
                            <span className="text-gray-500 text-sm ml-2">Claim #ABC123123</span>
                          </div>
                          <p className="font-medium mt-2">Windshield Replacement</p>
                          <p className="text-sm text-gray-600 mt-1">Filed on January 5, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      <div className="mt-3 border-t pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Claim Amount</p>
                            <p className="font-medium">$650</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Deductible Paid</p>
                            <p className="font-medium">$100</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Assigned Agent</p>
                            <p className="font-medium">Michael Brown</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-4">No Claims Discount</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">You're eligible for a No Claims Discount!</p>
                          <p className="text-sm text-gray-600 mt-1">You've maintained a clean driving record for 2 years. You're receiving a 15% discount on your premium.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyDetails;

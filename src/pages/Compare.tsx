
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  XCircle, 
  Shield, 
  DollarSign, 
  Calendar, 
  Star, 
  Clock, 
  ShieldAlert, 
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Policy, PolicyType } from '@/types/policy';

// Mock data for comparison
const mockPolicies: Policy[] = [
  {
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
  },
  {
    id: "p2",
    type: "auto",
    name: "Standard Auto Insurance",
    description: "Basic coverage for your vehicle needs",
    provider: "SecureDrive Co.",
    agencyId: "a2",
    coverage: "$200,000",
    premium: "$1,200/year",
    priceValue: 1200,
    deductible: "$750",
    deductibleValue: 750,
    term: "12 months",
    renewalDate: "2024-06-22",
    status: "active",
    documents: ["policy.pdf"],
    benefits: [
      "Collision coverage",
      "Liability protection",
      "Uninsured motorist protection"
    ],
    exclusions: [
      "Racing or competitive driving",
      "Using vehicle for commercial purposes",
      "Intentional damage",
      "Natural disasters"
    ],
    createdAt: "2023-06-22T10:00:00Z",
    updatedAt: "2023-06-22T10:00:00Z"
  },
  {
    id: "p3",
    type: "auto",
    name: "Premium Auto Insurance",
    description: "Premium coverage with all benefits included",
    provider: "Elite Insurance Group",
    agencyId: "a3",
    coverage: "$300,000",
    premium: "$1,800/year",
    priceValue: 1800,
    deductible: "$250",
    deductibleValue: 250,
    term: "12 months",
    renewalDate: "2024-07-10",
    status: "active",
    documents: ["policy.pdf", "benefits.pdf"],
    benefits: [
      "Collision coverage",
      "Comprehensive coverage",
      "Liability protection",
      "Roadside assistance",
      "Rental car reimbursement",
      "New car replacement",
      "Gap insurance",
      "Personal item coverage"
    ],
    exclusions: [
      "Racing or competitive driving",
      "Intentional damage"
    ],
    createdAt: "2023-07-10T10:00:00Z",
    updatedAt: "2023-07-10T10:00:00Z"
  },
];

const Compare = () => {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>(mockPolicies.slice(0, 2));
  const [availablePolicies, setAvailablePolicies] = useState<Policy[]>(mockPolicies);
  const { toast } = useToast();

  const handleAddPolicy = (policy: Policy) => {
    if (selectedPolicies.length >= 3) {
      toast({
        title: "Limit Reached",
        description: "You can compare up to 3 policies at a time",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedPolicies([...selectedPolicies, policy]);
  };

  const handleRemovePolicy = (policyId: string) => {
    if (selectedPolicies.length <= 1) {
      toast({
        description: "You need at least one policy for comparison",
      });
      return;
    }
    
    setSelectedPolicies(selectedPolicies.filter(p => p.id !== policyId));
  };

  // Helper function to check if a policy has a specific benefit
  const hasBenefit = (policy: Policy, benefit: string) => {
    return policy.benefits.includes(benefit);
  };

  // Get all unique benefits from selected policies
  const getAllBenefits = () => {
    const allBenefits = new Set<string>();
    selectedPolicies.forEach(policy => {
      policy.benefits.forEach(benefit => {
        allBenefits.add(benefit);
      });
    });
    return Array.from(allBenefits);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-insure-navy mb-6">Policy Comparison</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Selected Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedPolicies.map((policy) => (
                <Card key={policy.id} className="border-t-4 border-t-insure-teal">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{policy.name}</CardTitle>
                    <p className="text-sm text-gray-500">{policy.provider}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Coverage:</span>
                        <span className="text-sm font-medium">{policy.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Premium:</span>
                        <span className="text-sm font-medium">{policy.premium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Deductible:</span>
                        <span className="text-sm font-medium">{policy.deductible}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full"
                      onClick={() => handleRemovePolicy(policy.id)}
                    >
                      Remove from Comparison
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {selectedPolicies.length < 3 && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const remainingPolicies = availablePolicies.filter(
                        p => !selectedPolicies.some(sp => sp.id === p.id)
                      );
                      if (remainingPolicies.length > 0) {
                        handleAddPolicy(remainingPolicies[0]);
                      } else {
                        toast({
                          description: "No more policies available to add",
                        });
                      }
                    }}
                  >
                    + Add Another Policy
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Detailed Comparison</h2>
            
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 bg-gray-50 font-medium text-gray-500">Features</th>
                  {selectedPolicies.map((policy) => (
                    <th key={policy.id} className="text-left py-4 px-6 font-medium">
                      {policy.name}
                      <div className="text-sm font-normal text-gray-500">{policy.provider}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic details */}
                <tr className="border-b">
                  <td className="py-4 px-6 bg-gray-50 font-medium flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-gray-400" />
                    Coverage
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id} className="py-4 px-6 font-medium">
                      {policy.coverage}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 bg-gray-50 font-medium flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                    Premium
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id} className="py-4 px-6">
                      {policy.premium}
                      {selectedPolicies.length > 1 && policy.priceValue === Math.min(...selectedPolicies.map(p => p.priceValue)) && (
                        <span className="ml-2 text-green-600 text-sm font-medium">Best Value</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 bg-gray-50 font-medium flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-gray-400" />
                    Deductible
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id} className="py-4 px-6">
                      {policy.deductible}
                      {selectedPolicies.length > 1 && policy.deductibleValue === Math.min(...selectedPolicies.map(p => p.deductibleValue)) && (
                        <span className="ml-2 text-green-600 text-sm font-medium">Lowest</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 bg-gray-50 font-medium flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                    Term
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id} className="py-4 px-6">
                      {policy.term}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 bg-gray-50 font-medium flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-gray-400" />
                    Renewal Date
                  </td>
                  {selectedPolicies.map((policy) => (
                    <td key={policy.id} className="py-4 px-6">
                      {new Date(policy.renewalDate).toLocaleDateString()}
                    </td>
                  ))}
                </tr>
                
                {/* Benefits comparison */}
                <tr className="border-b bg-gray-100">
                  <td colSpan={selectedPolicies.length + 1} className="py-4 px-6 font-semibold">
                    <Star className="inline-block mr-2 h-5 w-5 text-insure-teal" />
                    Benefits
                  </td>
                </tr>
                
                {getAllBenefits().map((benefit, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6 bg-gray-50">{benefit}</td>
                    {selectedPolicies.map((policy) => (
                      <td key={policy.id} className="py-3 px-6">
                        {hasBenefit(policy, benefit) ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Exclusions */}
                <tr className="border-b bg-gray-100">
                  <td colSpan={selectedPolicies.length + 1} className="py-4 px-6 font-semibold">
                    <HelpCircle className="inline-block mr-2 h-5 w-5 text-insure-teal" />
                    Exclusions
                  </td>
                </tr>
                
                {selectedPolicies.map((policy) => (
                  <tr key={policy.id} className="border-b">
                    <td className="py-3 px-6 bg-gray-50">
                      {policy.provider} Exclusions
                    </td>
                    <td colSpan={selectedPolicies.length} className="py-3 px-6">
                      <ul className="list-disc pl-5 space-y-1">
                        {policy.exclusions.map((exclusion, idx) => (
                          <li key={idx} className="text-sm">{exclusion}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-8 flex justify-center">
              <Button className="bg-insure-teal hover:bg-insure-teal/90">
                Get Expert Recommendation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;

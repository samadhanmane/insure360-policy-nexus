
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import PolicyCard from '@/components/PolicyCard';
import { Policy, PolicyType } from '@/types/policy';

// Sample policy data
const samplePolicies: Policy[] = [
  {
    id: "p1",
    type: "auto" as PolicyType,
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
    type: "home" as PolicyType,
    name: "Premium Home Insurance",
    description: "Complete protection for your home and belongings",
    provider: "SecureCover Co.",
    agencyId: "a2",
    coverage: "$450,000",
    premium: "$2,200/year",
    priceValue: 2200,
    deductible: "$1,000",
    deductibleValue: 1000,
    term: "12 months",
    renewalDate: "2024-06-10",
    status: "active",
    documents: ["policy.pdf", "terms.pdf"],
    benefits: [
      "Dwelling coverage",
      "Personal property coverage",
      "Liability protection",
      "Additional living expenses",
      "Water damage coverage"
    ],
    exclusions: [
      "Flood damage",
      "Earthquake damage",
      "Intentional damage",
      "Normal wear and tear"
    ],
    createdAt: "2023-06-10T10:00:00Z",
    updatedAt: "2023-06-10T10:00:00Z"
  },
  {
    id: "p3",
    type: "health" as PolicyType,
    name: "Family Health Insurance",
    description: "Comprehensive health coverage for the entire family",
    provider: "WellCare Health",
    agencyId: "a3",
    coverage: "Comprehensive",
    premium: "$450/month",
    priceValue: 5400,
    deductible: "$2,000",
    deductibleValue: 2000,
    term: "12 months",
    renewalDate: "2024-01-15",
    status: "active",
    documents: ["policy.pdf", "benefits.pdf"],
    benefits: [
      "Primary care visits",
      "Specialist visits",
      "Hospital stays",
      "Emergency services",
      "Prescription drugs",
      "Preventive care"
    ],
    exclusions: [
      "Cosmetic procedures",
      "Experimental treatments",
      "Pre-existing conditions (certain cases)"
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z"
  },
  {
    id: "p4",
    type: "life" as PolicyType,
    name: "Term Life Insurance",
    description: "20-year term life insurance policy",
    provider: "FutureSafe Inc.",
    agencyId: "a1",
    coverage: "$500,000",
    premium: "$35/month",
    priceValue: 420,
    deductible: "$0",
    deductibleValue: 0,
    term: "20 years",
    renewalDate: "2043-04-22",
    status: "active",
    documents: ["policy.pdf"],
    benefits: [
      "Death benefit",
      "Accelerated death benefit",
      "Convertible to permanent policy"
    ],
    exclusions: [
      "Suicide (first two years)",
      "War-related death",
      "Dangerous activities/hobbies"
    ],
    createdAt: "2023-04-22T10:00:00Z",
    updatedAt: "2023-04-22T10:00:00Z"
  },
  {
    id: "p5",
    type: "travel" as PolicyType,
    name: "International Travel Insurance",
    description: "Comprehensive coverage for international travel",
    provider: "JourneyProtect",
    agencyId: "a2",
    coverage: "$100,000",
    premium: "$150 (one-time)",
    priceValue: 150,
    deductible: "$100",
    deductibleValue: 100,
    term: "30 days",
    renewalDate: "2023-09-30",
    status: "expired",
    documents: ["policy.pdf"],
    benefits: [
      "Medical expenses",
      "Trip cancellation",
      "Lost baggage",
      "Emergency evacuation",
      "24/7 assistance"
    ],
    exclusions: [
      "Pre-existing conditions",
      "High-risk activities",
      "Alcohol/drug-related incidents",
      "Countries under travel advisory"
    ],
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-01T10:00:00Z"
  },
  {
    id: "p6",
    type: "business" as PolicyType,
    name: "Small Business Insurance",
    description: "Comprehensive coverage for small businesses",
    provider: "EnterpriseShield",
    agencyId: "a3",
    coverage: "$1,000,000",
    premium: "$3,600/year",
    priceValue: 3600,
    deductible: "$1,000",
    deductibleValue: 1000,
    term: "12 months",
    renewalDate: "2023-10-15",
    status: "pending",
    documents: ["policy.pdf", "terms.pdf"],
    benefits: [
      "General liability",
      "Property coverage",
      "Business interruption",
      "Professional liability",
      "Workers' compensation"
    ],
    exclusions: [
      "Intentional damage",
      "Criminal activities",
      "Certain high-risk operations"
    ],
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-10-15T10:00:00Z"
  }
];

const policyTypeLabels: Record<PolicyType, string> = {
  auto: "Auto Insurance",
  home: "Home Insurance",
  health: "Health Insurance",
  life: "Life Insurance",
  travel: "Travel Insurance",
  business: "Business Insurance",
  pet: "Pet Insurance",
  other: "Other Insurance"
};

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [policies] = useState<Policy[]>(samplePolicies);
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = 
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policyTypeLabels[policy.type].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || policy.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-insure-navy">Insurance Policies</h1>
              <p className="text-gray-600">Browse and compare our insurance offerings</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button className="bg-insure-teal hover:bg-insure-teal/90">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Compare Policies
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search policies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setSelectedType}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Policies</TabsTrigger>
              <TabsTrigger value="auto">Auto</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="life">Life</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedType} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="block">
                    <Link to={`/policies/${policy.id}`}>
                      <PolicyCard
                        type={policyTypeLabels[policy.type]}
                        provider={policy.provider}
                        coverage={policy.coverage}
                        premium={policy.premium}
                        renewalDate={new Date(policy.renewalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        status={policy.status === "cancelled" ? "expired" : policy.status}
                      />
                    </Link>
                  </div>
                ))}
                
                {filteredPolicies.length === 0 && (
                  <div className="col-span-3 py-12 text-center">
                    <p className="text-lg text-gray-500">No policies found matching your criteria.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policies;


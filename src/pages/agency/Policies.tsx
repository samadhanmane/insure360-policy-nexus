
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgencyLayout from '@/components/agency/AgencyLayout';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  FileText, 
  Search, 
  Filter, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download,
  FileUp,
  FileDown 
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Policy, PolicyStatus, PolicyType } from '@/types/policy';

// Mock policies data
const mockPolicies: Policy[] = [
  {
    id: "p1",
    type: "auto",
    name: "Comprehensive Auto Insurance",
    description: "Full coverage for your vehicle with roadside assistance",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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
    type: "home",
    name: "Premium Home Insurance",
    description: "Complete protection for your home and belongings",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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
    type: "health",
    name: "Family Health Insurance",
    description: "Comprehensive health coverage for the entire family",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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
    type: "life",
    name: "Term Life Insurance",
    description: "20-year term life insurance policy",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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
    type: "travel",
    name: "International Travel Insurance",
    description: "Comprehensive coverage for international travel",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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
    type: "business",
    name: "Small Business Insurance",
    description: "Comprehensive coverage for small businesses",
    provider: "SafeGuard Insurance",
    agencyId: "agency-123",
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

const statusLabels: Record<PolicyStatus, string> = {
  active: "Active",
  pending: "Pending",
  expired: "Expired",
  cancelled: "Cancelled"
};

const statusColors: Record<PolicyStatus, string> = {
  active: "text-green-600 bg-green-100",
  pending: "text-yellow-600 bg-yellow-100",
  expired: "text-red-600 bg-red-100",
  cancelled: "text-gray-600 bg-gray-100"
};

const AgencyPolicies = () => {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPolicyDialogOpen, setNewPolicyDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    toast({
      title: "Policy Deleted",
      description: "The policy has been successfully deleted.",
    });
  };
  
  const filteredPolicies = (status?: PolicyStatus) => {
    return policies
      .filter(policy => status ? policy.status === status : true)
      .filter(policy => 
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policyTypeLabels[policy.type].toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  return (
    <AgencyLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Insurance Policies</h1>
          <p className="text-gray-600">Manage and create insurance policy offerings</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Dialog open={newPolicyDialogOpen} onOpenChange={setNewPolicyDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-insure-teal hover:bg-insure-teal/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Insurance Policy</DialogTitle>
                <DialogDescription>
                  Define a new insurance policy that will be available to customers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Form would go here - simplified for now */}
                <p className="text-center text-gray-500 py-6">
                  Policy creation form would be implemented here with fields for
                  policy type, name, coverage, premium, benefits, etc.
                </p>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewPolicyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-insure-teal hover:bg-insure-teal/90"
                  onClick={() => {
                    setNewPolicyDialogOpen(false);
                    toast({
                      title: "Policy Created",
                      description: "The new policy has been created successfully.",
                    });
                  }}
                >
                  Create Policy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
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
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        
        {['all', 'active', 'pending', 'expired'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="bg-white rounded-md shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies(tab === 'all' ? undefined : tab as PolicyStatus).map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{policy.name}</span>
                          <span className="text-xs text-gray-500">ID: {policy.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{policyTypeLabels[policy.type]}</TableCell>
                      <TableCell>{policy.coverage}</TableCell>
                      <TableCell>{policy.premium}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[policy.status]}`}>
                          {policy.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {policy.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {policy.status === 'expired' && <XCircle className="h-3 w-3 mr-1" />}
                          {policy.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                          {statusLabels[policy.status]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <FileText className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeletePolicy(policy.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPolicies(tab === 'all' ? undefined : tab as PolicyStatus).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No policies found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AgencyLayout>
  );
};

export default AgencyPolicies;

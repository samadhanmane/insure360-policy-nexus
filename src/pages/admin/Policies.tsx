
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
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
import {
  Search, 
  Filter, 
  FileText,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

// Mock policy types
const policyTypes = [
  { id: "auto", name: "Auto Insurance" },
  { id: "home", name: "Home Insurance" },
  { id: "life", name: "Life Insurance" },
  { id: "health", name: "Health Insurance" },
  { id: "travel", name: "Travel Insurance" },
  { id: "business", name: "Business Insurance" },
];

// Mock policies data
const mockPolicies = [
  {
    id: "p1",
    policyNumber: "AUTO-12345",
    type: "auto",
    customerId: "c1",
    customerName: "John Smith",
    agencyId: "a1",
    agencyName: "SafeGuard Insurance",
    premium: 1200,
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    status: "active",
    coverage: 50000
  },
  {
    id: "p2",
    policyNumber: "HOME-23456",
    type: "home",
    customerId: "c2",
    customerName: "Emily Johnson",
    agencyId: "a2",
    agencyName: "SecureCover Co.",
    premium: 950,
    startDate: "2024-02-10",
    endDate: "2025-02-09",
    status: "active",
    coverage: 300000
  },
  {
    id: "p3",
    policyNumber: "LIFE-34567",
    type: "life",
    customerId: "c3",
    customerName: "Michael Brown",
    agencyId: "a1",
    agencyName: "SafeGuard Insurance",
    premium: 550,
    startDate: "2024-01-20",
    endDate: "2025-01-19",
    status: "active",
    coverage: 500000
  },
  {
    id: "p4",
    policyNumber: "AUTO-45678",
    type: "auto",
    customerId: "c4",
    customerName: "Sarah Davis",
    agencyId: "a3",
    agencyName: "TrustShield Insurance",
    premium: 1500,
    startDate: "2023-11-05",
    endDate: "2024-11-04",
    status: "active",
    coverage: 75000
  },
  {
    id: "p5",
    policyNumber: "HEALTH-56789",
    type: "health",
    customerId: "c5",
    customerName: "Robert Wilson",
    agencyId: "a2",
    agencyName: "SecureCover Co.",
    premium: 2200,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "pending",
    coverage: 100000
  },
  {
    id: "p6",
    policyNumber: "TRAVEL-67890",
    type: "travel",
    customerId: "c1",
    customerName: "John Smith",
    agencyId: "a3",
    agencyName: "TrustShield Insurance",
    premium: 180,
    startDate: "2024-04-10",
    endDate: "2024-04-25",
    status: "expired",
    coverage: 10000
  }
];

const AdminPolicies = () => {
  const [policies, setPolicies] = useState(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    
    toast({
      title: "Policy Deleted",
      description: "The policy has been successfully deleted.",
    });
  };
  
  const handleUpdateStatus = (id: string, newStatus: 'active' | 'pending' | 'expired' | 'cancelled') => {
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, status: newStatus } : policy
    ));
    
    toast({
      title: "Policy Status Updated",
      description: `The policy status has been set to ${newStatus}.`,
    });
  };
  
  const getPolicyTypeName = (typeId: string) => {
    const type = policyTypes.find(t => t.id === typeId);
    return type ? type.name : typeId;
  };
  
  const filteredPolicies = policies.filter(policy => 
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPolicyTypeName(policy.type).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Insurance Policies</h1>
          <p className="text-gray-600">Manage all policies across agencies and customers</p>
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
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPolicies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-insure-navy/10 flex items-center justify-center text-insure-navy mr-3">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{policy.policyNumber}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{policy.customerName}</div>
                  <div className="text-xs text-gray-500">ID: {policy.customerId}</div>
                </TableCell>
                <TableCell>
                  {getPolicyTypeName(policy.type)}
                </TableCell>
                <TableCell>
                  {policy.agencyName}
                </TableCell>
                <TableCell>
                  <div className="font-medium">${policy.premium.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">per year</div>
                </TableCell>
                <TableCell>
                  ${policy.coverage.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    policy.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : policy.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : policy.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {policy.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {policy.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {(policy.status === 'cancelled' || policy.status === 'expired') && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Policy
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                      {policy.status !== 'active' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(policy.id, 'active')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Activate Policy</span>
                        </DropdownMenuItem>
                      )}
                      
                      {policy.status === 'active' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(policy.id, 'cancelled')}>
                          <Shield className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-red-600">Cancel Policy</span>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem onClick={() => handleDeletePolicy(policy.id)}>
                        <Trash className="h-4 w-4 mr-2 text-red-600" />
                        <span className="text-red-600">Delete Policy</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredPolicies.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No policies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminPolicies;

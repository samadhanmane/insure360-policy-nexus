
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
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  FileText,
  User,
  Calendar,
  DollarSign,
  Building
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

// Mock claims data
const mockClaims = [
  {
    id: "cl1",
    claimNumber: "CLM-12345",
    policyId: "p1",
    policyNumber: "AUTO-12345",
    policyType: "Auto Insurance",
    customerId: "c1",
    customerName: "John Smith",
    agencyId: "a1",
    agencyName: "SafeGuard Insurance",
    claimDate: "2024-02-15T10:00:00Z",
    incidentDate: "2024-02-10T08:30:00Z",
    description: "Car accident, front bumper damage",
    claimAmount: 3500,
    status: "pending",
    documents: ["accident_report.pdf", "damage_photos.jpg"]
  },
  {
    id: "cl2",
    claimNumber: "CLM-23456",
    policyId: "p2",
    policyNumber: "HOME-23456",
    policyType: "Home Insurance",
    customerId: "c2",
    customerName: "Emily Johnson",
    agencyId: "a2",
    agencyName: "SecureCover Co.",
    claimDate: "2024-01-20T14:30:00Z",
    incidentDate: "2024-01-18T22:15:00Z",
    description: "Water damage from burst pipe in bathroom",
    claimAmount: 7800,
    status: "approved",
    documents: ["plumber_report.pdf", "damage_photos.jpg", "repair_estimate.pdf"]
  },
  {
    id: "cl3",
    claimNumber: "CLM-34567",
    policyId: "p4",
    policyNumber: "AUTO-45678",
    policyType: "Auto Insurance",
    customerId: "c4",
    customerName: "Sarah Davis",
    agencyId: "a3",
    agencyName: "TrustShield Insurance",
    claimDate: "2024-03-05T09:15:00Z",
    incidentDate: "2024-03-02T16:45:00Z",
    description: "Hit and run, significant damage to driver side",
    claimAmount: 5200,
    status: "investigation",
    documents: ["police_report.pdf", "damage_photos.jpg", "witness_statement.pdf"]
  },
  {
    id: "cl4",
    claimNumber: "CLM-45678",
    policyId: "p3",
    policyNumber: "LIFE-34567",
    policyType: "Life Insurance",
    customerId: "c5",
    customerName: "Robert Wilson",
    agencyId: "a1",
    agencyName: "SafeGuard Insurance",
    claimDate: "2024-01-10T11:20:00Z",
    incidentDate: "2024-01-01T00:00:00Z",
    description: "Beneficiary claim for life insurance policy",
    claimAmount: 250000,
    status: "approved",
    documents: ["death_certificate.pdf", "beneficiary_id.pdf"]
  },
  {
    id: "cl5",
    claimNumber: "CLM-56789",
    policyId: "p2",
    policyNumber: "HOME-23456",
    policyType: "Home Insurance",
    customerId: "c2",
    customerName: "Emily Johnson",
    agencyId: "a2",
    agencyName: "SecureCover Co.",
    claimDate: "2024-02-28T15:45:00Z",
    incidentDate: "2024-02-25T19:30:00Z",
    description: "Roof damage from fallen tree during storm",
    claimAmount: 12500,
    status: "pending",
    documents: ["damage_photos.jpg", "repair_estimate.pdf"]
  },
  {
    id: "cl6",
    claimNumber: "CLM-67890",
    policyId: "p4",
    policyNumber: "AUTO-45678",
    policyType: "Auto Insurance",
    customerId: "c4",
    customerName: "Sarah Davis",
    agencyId: "a3",
    agencyName: "TrustShield Insurance",
    claimDate: "2023-12-15T10:30:00Z",
    incidentDate: "2023-12-10T12:15:00Z",
    description: "Windshield crack from road debris",
    claimAmount: 850,
    status: "rejected",
    documents: ["damage_photos.jpg", "repair_estimate.pdf"]
  }
];

const AdminClaims = () => {
  const [claims, setClaims] = useState(mockClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'investigation' | 'approved' | 'rejected') => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: newStatus } : claim
    ));
    
    toast({
      title: "Claim Status Updated",
      description: `The claim status has been set to ${newStatus}.`,
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'rejected':
        return <XCircle className="h-3 w-3 mr-1" />;
      case 'investigation':
        return <Shield className="h-3 w-3 mr-1" />;
      default:
        return <Clock className="h-3 w-3 mr-1" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'investigation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  const filteredClaims = claims.filter(claim => 
    claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Insurance Claims</h1>
          <p className="text-gray-600">Monitor and manage all claim requests across the platform</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search claims..."
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
              <TableHead>Claim</TableHead>
              <TableHead>Policy</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-insure-navy/10 flex items-center justify-center text-insure-navy mr-3">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{claim.claimNumber}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(claim.claimDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{claim.policyNumber}</div>
                    <div className="text-xs text-gray-500">{claim.policyType}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    <span>{claim.customerName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    <span>{claim.agencyName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-insure-navy">
                    ${claim.claimAmount.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(claim.status)}`}>
                    {getStatusIcon(claim.status)}
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
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
                      <DropdownMenuSeparator />
                      
                      {claim.status !== 'approved' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, 'approved')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Approve Claim</span>
                        </DropdownMenuItem>
                      )}
                      
                      {claim.status !== 'rejected' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, 'rejected')}>
                          <XCircle className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-red-600">Reject Claim</span>
                        </DropdownMenuItem>
                      )}
                      
                      {claim.status !== 'investigation' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, 'investigation')}>
                          <Shield className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-blue-600">Mark for Investigation</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredClaims.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No claims found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminClaims;

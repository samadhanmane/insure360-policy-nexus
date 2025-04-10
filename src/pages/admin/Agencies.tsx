
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Building,
  CheckCircle, 
  XCircle, 
  Clock, 
  Users,
  FileText,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Shield,
  Eye,
  User,
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
import { Agency } from '@/types/policy';

// Mock agencies data
const mockAgencies: Agency[] = [
  {
    id: "a1",
    name: "SafeGuard Insurance",
    email: "contact@safeguard.example",
    phone: "555-123-4567",
    address: "123 Insurance Blvd, New York, NY 10001",
    description: "Providing comprehensive insurance solutions for auto, home, and business.",
    logo: "safeguard-logo.png",
    isVerified: true,
    status: "active",
    createdAt: "2022-05-15T10:00:00Z",
    updatedAt: "2023-09-22T14:30:00Z"
  },
  {
    id: "a2",
    name: "SecureCover Co.",
    email: "info@securecover.example",
    phone: "555-234-5678",
    address: "456 Protection Ave, Los Angeles, CA 90001",
    description: "Specialized in home and property insurance with excellent customer service.",
    isVerified: true,
    status: "active",
    createdAt: "2022-07-10T09:15:00Z",
    updatedAt: "2023-08-12T11:45:00Z"
  },
  {
    id: "a3",
    name: "TrustShield Insurance",
    email: "support@trustshield.example",
    phone: "555-345-6789",
    address: "789 Security St, Chicago, IL 60601",
    description: "Focused on life and health insurance for families and individuals.",
    logo: "trustshield-logo.png",
    isVerified: true,
    status: "active",
    createdAt: "2022-09-20T14:30:00Z",
    updatedAt: "2023-10-15T16:20:00Z"
  },
  {
    id: "a4",
    name: "PrimeProtect Group",
    email: "hello@primeprotect.example",
    phone: "555-456-7890",
    address: "321 Insurance Way, Houston, TX 77001",
    description: "Premium insurance products for high-value homes and luxury vehicles.",
    isVerified: false,
    status: "pending",
    createdAt: "2023-02-10T08:45:00Z",
    updatedAt: "2023-02-10T08:45:00Z"
  },
  {
    id: "a5",
    name: "AllianceCover Insurance",
    email: "sales@alliancecover.example",
    phone: "555-567-8901",
    address: "567 Protection Blvd, Miami, FL 33101",
    description: "Affordable insurance options for all needs with flexible payment plans.",
    isVerified: true,
    status: "suspended",
    createdAt: "2022-11-15T11:30:00Z",
    updatedAt: "2023-07-05T13:40:00Z"
  },
  {
    id: "a6",
    name: "InsureElite",
    email: "contact@insureelite.example",
    phone: "555-678-9012",
    address: "654 Premium Dr, Seattle, WA 98101",
    description: "Elite insurance services for businesses and high-net-worth individuals.",
    logo: "insureelite-logo.png",
    isVerified: true,
    status: "active",
    createdAt: "2023-01-25T15:20:00Z",
    updatedAt: "2023-09-30T10:15:00Z"
  }
];

// Mock policy and user counts per agency (in a real app, this would come from the database)
const agencyStats: Record<string, { policies: number; users: number; claims: number }> = {
  a1: { policies: 4325, users: 1245, claims: 187 },
  a2: { policies: 3867, users: 967, claims: 156 },
  a3: { policies: 3521, users: 876, claims: 142 },
  a4: { policies: 0, users: 0, claims: 0 },
  a5: { policies: 1845, users: 432, claims: 56 },
  a6: { policies: 2956, users: 721, claims: 98 }
};

const AdminAgencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [agencyDetailsOpen, setAgencyDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleViewAgency = (agency: Agency) => {
    setSelectedAgency(agency);
    setAgencyDetailsOpen(true);
  };
  
  const handleChangeAgencyStatus = (agencyId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    setAgencies(agencies.map(agency => 
      agency.id === agencyId 
        ? { ...agency, status: newStatus, updatedAt: new Date().toISOString() } 
        : agency
    ));
    
    const agency = agencies.find(a => a.id === agencyId);
    
    toast({
      title: `Agency ${newStatus === 'active' ? 'Activated' : newStatus === 'suspended' ? 'Suspended' : 'Set to Pending'}`,
      description: `${agency?.name}'s status has been updated.`,
    });
    
    if (selectedAgency && selectedAgency.id === agencyId) {
      setSelectedAgency({ ...selectedAgency, status: newStatus });
    }
  };
  
  const handleVerifyAgency = (agencyId: string) => {
    setAgencies(agencies.map(agency => 
      agency.id === agencyId 
        ? { ...agency, isVerified: true, updatedAt: new Date().toISOString() } 
        : agency
    ));
    
    const agency = agencies.find(a => a.id === agencyId);
    
    toast({
      title: "Agency Verified",
      description: `${agency?.name} has been verified.`,
    });
    
    if (selectedAgency && selectedAgency.id === agencyId) {
      setSelectedAgency({ ...selectedAgency, isVerified: true });
    }
  };
  
  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (agency.phone && agency.phone.includes(searchTerm))
  );
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Insurance Agencies</h1>
          <p className="text-gray-600">Manage and monitor all insurance providers on the platform</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button className="bg-insure-teal hover:bg-insure-teal/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Agency
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search agencies..."
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
              <TableHead>Agency</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgencies.map((agency) => (
              <TableRow key={agency.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-insure-navy/10 flex items-center justify-center text-insure-navy mr-3">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{agency.name}</div>
                      <div className="text-xs text-gray-500">Since {new Date(agency.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span className="truncate max-w-[200px]">{agency.email}</span>
                    </div>
                    {agency.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        <span>{agency.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span>{agencyStats[agency.id]?.users || 0} users</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span>{agencyStats[agency.id]?.policies || 0} policies</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span>{agencyStats[agency.id]?.claims || 0} claims</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {agency.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending Verification
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agency.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : agency.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {agency.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {agency.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {agency.status === 'suspended' && <XCircle className="h-3 w-3 mr-1" />}
                    {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
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
                      <DropdownMenuItem onClick={() => handleViewAgency(agency)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Policies
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        View Customers
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                      {!agency.isVerified && (
                        <DropdownMenuItem onClick={() => handleVerifyAgency(agency.id)}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Verify Agency</span>
                        </DropdownMenuItem>
                      )}
                      
                      {agency.status !== 'active' && (
                        <DropdownMenuItem onClick={() => handleChangeAgencyStatus(agency.id, 'active')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Activate Agency</span>
                        </DropdownMenuItem>
                      )}
                      
                      {agency.status === 'active' && (
                        <DropdownMenuItem onClick={() => handleChangeAgencyStatus(agency.id, 'suspended')}>
                          <XCircle className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-red-600">Suspend Agency</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredAgencies.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No agencies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Agency Details Dialog */}
      <Dialog open={agencyDetailsOpen} onOpenChange={setAgencyDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAgency && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-insure-navy/10 flex items-center justify-center text-insure-navy mr-2">
                    <Building className="h-5 w-5" />
                  </div>
                  <span>{selectedAgency.name}</span>
                </DialogTitle>
                <DialogDescription>
                  Agency ID: {selectedAgency.id} • Since {new Date(selectedAgency.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Agency Information</h3>
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedAgency.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedAgency.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedAgency.status.charAt(0).toUpperCase() + selectedAgency.status.slice(1)}
                    </span>
                    
                    {selectedAgency.isVerified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending Verification
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{selectedAgency.email}</span>
                  </div>
                  
                  {selectedAgency.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span>{selectedAgency.phone}</span>
                    </div>
                  )}
                  
                  {selectedAgency.address && (
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                      <span>{selectedAgency.address}</span>
                    </div>
                  )}
                </div>
                
                {selectedAgency.description && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedAgency.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-insure-teal mr-2" />
                      <h3 className="font-medium">Customers</h3>
                    </div>
                    <p className="text-2xl font-bold">{agencyStats[selectedAgency.id]?.users || 0}</p>
                    <p className="text-sm text-gray-500">Total customers</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-insure-teal mr-2" />
                      <h3 className="font-medium">Policies</h3>
                    </div>
                    <p className="text-2xl font-bold">{agencyStats[selectedAgency.id]?.policies || 0}</p>
                    <p className="text-sm text-gray-500">Active policies</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-insure-teal mr-2" />
                      <h3 className="font-medium">Claims</h3>
                    </div>
                    <p className="text-2xl font-bold">{agencyStats[selectedAgency.id]?.claims || 0}</p>
                    <p className="text-sm text-gray-500">Processed claims</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Admin Notes</h3>
                  <p className="text-sm text-gray-500 italic">No admin notes have been added for this agency.</p>
                </div>
              </div>
              
              <DialogFooter>
                {!selectedAgency.isVerified && (
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleVerifyAgency(selectedAgency.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Agency
                  </Button>
                )}
                
                {selectedAgency.status === 'active' ? (
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => handleChangeAgencyStatus(selectedAgency.id, 'suspended')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Suspend Agency
                  </Button>
                ) : (
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleChangeAgencyStatus(selectedAgency.id, 'active')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate Agency
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAgencies;

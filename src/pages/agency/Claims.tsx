
import { useState } from 'react';
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
  Search, 
  Filter, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  Eye,
  Check,
  Download,
  MessageSquare,
  User,
  Calendar,
  DollarSign
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Claim, ClaimStatus } from '@/types/policy';

// Mock claims data
const mockClaims: Claim[] = [
  {
    id: "c1",
    policyId: "p1",
    userId: "u1",
    policyNumber: "AUTO-12345",
    agencyId: "agency-123",
    type: "Collision",
    description: "Fender bender accident at intersection",
    amount: "$2,800",
    amountValue: 2800,
    date: "2023-03-12T10:00:00Z",
    incidentDate: "2023-03-10T15:30:00Z",
    status: "reviewing",
    documents: ["claim-form.pdf", "police-report.pdf"],
    images: ["damage-front.jpg", "damage-side.jpg"],
    notes: ["Claim received and under initial review"],
    reviewedBy: "Sarah Johnson",
    reviewDate: "2023-03-15T14:00:00Z",
    createdAt: "2023-03-12T10:00:00Z",
    updatedAt: "2023-03-15T14:00:00Z"
  },
  {
    id: "c2",
    policyId: "p1",
    userId: "u2",
    policyNumber: "AUTO-54321",
    agencyId: "agency-123",
    type: "Comprehensive",
    description: "Windshield cracked due to road debris",
    amount: "$650",
    amountValue: 650,
    date: "2023-01-05T09:15:00Z",
    incidentDate: "2023-01-03T11:45:00Z",
    status: "approved",
    documents: ["claim-form.pdf"],
    images: ["windshield-damage.jpg"],
    notes: ["Claim approved", "Payment processing"],
    reviewedBy: "Michael Brown",
    reviewDate: "2023-01-07T16:30:00Z",
    createdAt: "2023-01-05T09:15:00Z",
    updatedAt: "2023-01-07T16:30:00Z"
  },
  {
    id: "c3",
    policyId: "p2",
    userId: "u3",
    policyNumber: "HOME-54321",
    agencyId: "agency-123",
    type: "Water Damage",
    description: "Bathroom pipe leak causing damage to floor and ceiling below",
    amount: "$4,200",
    amountValue: 4200,
    date: "2023-02-18T13:20:00Z",
    incidentDate: "2023-02-17T07:00:00Z",
    status: "paid",
    documents: ["claim-form.pdf", "contractor-estimate.pdf", "repair-invoice.pdf"],
    images: ["water-damage-1.jpg", "water-damage-2.jpg", "water-damage-3.jpg"],
    notes: ["Claim approved", "Payment issued", "Claim closed"],
    reviewedBy: "Jennifer Lee",
    reviewDate: "2023-02-20T10:15:00Z",
    createdAt: "2023-02-18T13:20:00Z",
    updatedAt: "2023-02-25T09:30:00Z"
  },
  {
    id: "c4",
    policyId: "p3",
    userId: "u4",
    policyNumber: "HEALTH-98765",
    agencyId: "agency-123",
    type: "Medical",
    description: "Emergency room visit for broken ankle",
    amount: "$1,800",
    amountValue: 1800,
    date: "2023-04-02T18:45:00Z",
    incidentDate: "2023-04-02T16:00:00Z",
    status: "pending",
    documents: ["claim-form.pdf", "medical-report.pdf"],
    images: [],
    notes: ["Awaiting additional documentation from hospital"],
    createdAt: "2023-04-02T18:45:00Z",
    updatedAt: "2023-04-02T18:45:00Z"
  },
  {
    id: "c5",
    policyId: "p4",
    userId: "u5",
    policyNumber: "AUTO-67890",
    agencyId: "agency-123",
    type: "Theft",
    description: "Vehicle stolen from shopping mall parking lot",
    amount: "$18,500",
    amountValue: 18500,
    date: "2023-03-25T14:30:00Z",
    incidentDate: "2023-03-24T19:15:00Z",
    status: "pending",
    documents: ["claim-form.pdf", "police-report.pdf", "vehicle-registration.pdf"],
    images: [],
    notes: ["Awaiting police investigation results"],
    createdAt: "2023-03-25T14:30:00Z",
    updatedAt: "2023-03-25T14:30:00Z"
  },
  {
    id: "c6",
    policyId: "p2",
    userId: "u6",
    policyNumber: "HOME-24680",
    agencyId: "agency-123",
    type: "Fire Damage",
    description: "Kitchen fire causing damage to cabinets and appliances",
    amount: "$12,300",
    amountValue: 12300,
    date: "2023-02-10T08:15:00Z",
    incidentDate: "2023-02-09T20:45:00Z",
    status: "rejected",
    documents: ["claim-form.pdf", "fire-report.pdf", "contractor-estimate.pdf"],
    images: ["kitchen-damage-1.jpg", "kitchen-damage-2.jpg"],
    notes: ["Claim rejected due to policy exclusion - negligence identified as cause of fire"],
    reviewedBy: "Thomas White",
    reviewDate: "2023-02-15T11:20:00Z",
    createdAt: "2023-02-10T08:15:00Z",
    updatedAt: "2023-02-15T11:20:00Z"
  }
];

const statusLabels: Record<ClaimStatus, string> = {
  pending: "Pending",
  reviewing: "In Review",
  approved: "Approved",
  rejected: "Rejected",
  paid: "Paid"
};

const statusColors: Record<ClaimStatus, string> = {
  pending: "text-yellow-600 bg-yellow-100",
  reviewing: "text-blue-600 bg-blue-100",
  approved: "text-green-600 bg-green-100",
  rejected: "text-red-600 bg-red-100",
  paid: "text-purple-600 bg-purple-100"
};

const AgencyClaims = () => {
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claimDetailsOpen, setClaimDetailsOpen] = useState(false);
  const [responseNote, setResponseNote] = useState('');
  const { toast } = useToast();
  
  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setClaimDetailsOpen(true);
  };
  
  const handleUpdateClaimStatus = (id: string, newStatus: ClaimStatus) => {
    setClaims(claims.map(claim => 
      claim.id === id 
        ? { 
            ...claim, 
            status: newStatus, 
            notes: [...claim.notes, `Status updated to ${statusLabels[newStatus]}`],
            updatedAt: new Date().toISOString()
          } 
        : claim
    ));
    
    setClaimDetailsOpen(false);
    
    toast({
      title: "Claim Updated",
      description: `The claim status has been updated to ${statusLabels[newStatus]}.`,
    });
  };
  
  const handleAddNote = () => {
    if (!responseNote.trim() || !selectedClaim) return;
    
    setClaims(claims.map(claim => 
      claim.id === selectedClaim.id 
        ? { 
            ...claim, 
            notes: [...claim.notes, responseNote],
            updatedAt: new Date().toISOString()
          } 
        : claim
    ));
    
    setResponseNote('');
    
    toast({
      title: "Note Added",
      description: "Your note has been added to the claim.",
    });
  };
  
  const filteredClaims = (status?: ClaimStatus) => {
    return claims
      .filter(claim => status ? claim.status === status : true)
      .filter(claim => 
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  return (
    <AgencyLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Claims Management</h1>
          <p className="text-gray-600">Review and process insurance claims</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Claims
          </Button>
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
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Claims</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewing">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        
        {['all', 'pending', 'reviewing', 'approved', 'rejected', 'paid'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="bg-white rounded-md shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date Filed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims(tab === 'all' ? undefined : tab as ClaimStatus).map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>
                          {claim.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {claim.status === 'reviewing' && <Shield className="h-3 w-3 mr-1" />}
                          {claim.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {claim.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {claim.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {statusLabels[claim.status]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewClaim(claim)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredClaims(tab === 'all' ? undefined : tab as ClaimStatus).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No claims found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Claim Details Dialog */}
      <Dialog open={claimDetailsOpen} onOpenChange={setClaimDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedClaim && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Claim Details - {selectedClaim.id}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedClaim.status]}`}>
                    {statusLabels[selectedClaim.status]}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Policy #{selectedClaim.policyNumber} • Filed on {new Date(selectedClaim.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="font-medium mb-3">Claim Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Claim Type</p>
                        <p className="text-sm text-gray-600">{selectedClaim.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Claim Amount</p>
                        <p className="text-sm text-gray-600">{selectedClaim.amount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Incident Date</p>
                        <p className="text-sm text-gray-600">{new Date(selectedClaim.incidentDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Customer ID</p>
                        <p className="text-sm text-gray-600">{selectedClaim.userId}</p>
                      </div>
                    </div>
                    
                    {selectedClaim.reviewedBy && (
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Reviewed By</p>
                          <p className="text-sm text-gray-600">{selectedClaim.reviewedBy}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Description</h3>
                  <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                    {selectedClaim.description}
                  </p>
                  
                  <h3 className="font-medium mb-2">Attached Documents</h3>
                  <div className="space-y-2 mb-4">
                    {selectedClaim.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {selectedClaim.documents.length === 0 && (
                      <p className="text-sm text-gray-500">No documents attached</p>
                    )}
                  </div>
                  
                  <h3 className="font-medium mb-2">Photos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedClaim.images.map((img, index) => (
                      <div key={index} className="bg-gray-100 aspect-square rounded flex items-center justify-center text-gray-400">
                        <div className="text-xs">{img}</div>
                      </div>
                    ))}
                    
                    {selectedClaim.images.length === 0 && (
                      <p className="text-sm text-gray-500 col-span-3">No images attached</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Activity Log</h3>
                <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
                  {selectedClaim.notes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <div className="text-sm">{note}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="response">Add Response</Label>
                  <Textarea
                    id="response"
                    value={responseNote}
                    onChange={(e) => setResponseNote(e.target.value)}
                    placeholder="Add a note or response to this claim..."
                    rows={2}
                  />
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={handleAddNote}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedClaim.status === 'pending' && (
                  <Button 
                    onClick={() => handleUpdateClaimStatus(selectedClaim.id, 'reviewing')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Start Review
                  </Button>
                )}
                
                {(selectedClaim.status === 'pending' || selectedClaim.status === 'reviewing') && (
                  <>
                    <Button 
                      onClick={() => handleUpdateClaimStatus(selectedClaim.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve Claim
                    </Button>
                    
                    <Button 
                      onClick={() => handleUpdateClaimStatus(selectedClaim.id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject Claim
                    </Button>
                  </>
                )}
                
                {selectedClaim.status === 'approved' && (
                  <Button 
                    onClick={() => handleUpdateClaimStatus(selectedClaim.id, 'paid')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Mark as Paid
                  </Button>
                )}
                
                <Button variant="outline" onClick={() => setClaimDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AgencyLayout>
  );
};

export default AgencyClaims;

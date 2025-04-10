
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload,
  Calendar,
  PlusCircle,
  Search,
  AlertTriangle,
  MessageSquare,
  FileImage
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Claim, ClaimStatus } from '@/types/policy';

// Mock claims data
const mockClaims: Claim[] = [
  {
    id: "c1",
    policyId: "p1",
    userId: "u1",
    policyNumber: "AUTO-12345",
    agencyId: "a1",
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
    userId: "u1",
    policyNumber: "AUTO-12345",
    agencyId: "a1",
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
    userId: "u1",
    policyNumber: "HOME-54321",
    agencyId: "a2",
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
    userId: "u1",
    policyNumber: "HEALTH-98765",
    agencyId: "a3",
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

const statusIcons: Record<ClaimStatus, React.ReactNode> = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  reviewing: <Search className="h-5 w-5 text-blue-500" />,
  approved: <CheckCircle className="h-5 w-5 text-green-500" />,
  rejected: <XCircle className="h-5 w-5 text-red-500" />,
  paid: <CheckCircle className="h-5 w-5 text-purple-500" />
};

const Claims = () => {
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  const [newClaimDialogOpen, setNewClaimDialogOpen] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    policyNumber: "",
    type: "",
    description: "",
    amount: "",
    incidentDate: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClaimFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'documents') {
      setSelectedFiles(e.target.files);
    } else if (e.target.name === 'images') {
      setSelectedImages(e.target.files);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!claimFormData.policyNumber || !claimFormData.type || !claimFormData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newClaim: Claim = {
      id: `c${Date.now()}`,
      policyId: "p1",
      userId: "u1",
      policyNumber: claimFormData.policyNumber,
      agencyId: "a1",
      type: claimFormData.type,
      description: claimFormData.description,
      amount: claimFormData.amount || "To be determined",
      amountValue: parseFloat(claimFormData.amount) || 0,
      date: new Date().toISOString(),
      incidentDate: claimFormData.incidentDate || new Date().toISOString(),
      status: "pending",
      documents: selectedFiles ? Array.from(selectedFiles).map(file => file.name) : [],
      images: selectedImages ? Array.from(selectedImages).map(file => file.name) : [],
      notes: ["Claim submitted by policyholder"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setClaims([newClaim, ...claims]);
    setNewClaimDialogOpen(false);
    
    // Reset form
    setClaimFormData({
      policyNumber: "",
      type: "",
      description: "",
      amount: "",
      incidentDate: "",
    });
    setSelectedFiles(null);
    setSelectedImages(null);
    
    toast({
      title: "Claim Submitted",
      description: "Your claim has been successfully submitted and is now pending review",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-insure-navy">Claims Management</h1>
              <p className="text-gray-600 mt-1">Track and manage your insurance claims</p>
            </div>
            
            <Dialog open={newClaimDialogOpen} onOpenChange={setNewClaimDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-insure-teal hover:bg-insure-teal/90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  File New Claim
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>File a New Insurance Claim</DialogTitle>
                  <DialogDescription>
                    Please provide details about your claim. Fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number *</Label>
                      <Input
                        id="policyNumber"
                        name="policyNumber"
                        value={claimFormData.policyNumber}
                        onChange={handleChange}
                        placeholder="e.g., AUTO-12345"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Claim Type *</Label>
                      <Input
                        id="type"
                        name="type"
                        value={claimFormData.type}
                        onChange={handleChange}
                        placeholder="e.g., Collision, Theft, Fire"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Estimated Amount</Label>
                      <Input
                        id="amount"
                        name="amount"
                        value={claimFormData.amount}
                        onChange={handleChange}
                        placeholder="e.g., 1500"
                        type="number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="incidentDate">Date of Incident *</Label>
                      <Input
                        id="incidentDate"
                        name="incidentDate"
                        value={claimFormData.incidentDate}
                        onChange={handleChange}
                        type="date"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description of Incident *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={claimFormData.description}
                      onChange={handleChange}
                      placeholder="Please provide details about what happened..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="documents">Supporting Documents</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="documents"
                          name="documents"
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          className="hidden"
                        />
                        <div className="border rounded w-full px-3 py-2 flex items-center text-sm text-gray-500">
                          {selectedFiles ? `${selectedFiles.length} files selected` : "No files selected"}
                        </div>
                        <Label 
                          htmlFor="documents" 
                          className="bg-gray-200 px-3 py-2 rounded cursor-pointer hover:bg-gray-300"
                        >
                          <FileText className="h-4 w-4" />
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="images">Photos of Damage</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="images"
                          name="images"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          multiple
                          className="hidden"
                        />
                        <div className="border rounded w-full px-3 py-2 flex items-center text-sm text-gray-500">
                          {selectedImages ? `${selectedImages.length} images selected` : "No images selected"}
                        </div>
                        <Label 
                          htmlFor="images" 
                          className="bg-gray-200 px-3 py-2 rounded cursor-pointer hover:bg-gray-300"
                        >
                          <FileImage className="h-4 w-4" />
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mr-3" />
                      <div>
                        <p className="text-sm text-yellow-700">
                          Please ensure all information provided is accurate and truthful. 
                          Submitting false information may result in claim denial and possible legal action.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNewClaimDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-insure-teal hover:bg-insure-teal/90">
                      Submit Claim
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-6">
                {claims.map((claim) => (
                  <Card key={claim.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <div className="flex items-center">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>
                              {statusLabels[claim.status]}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">Claim #{claim.id}</span>
                          </div>
                          <CardTitle className="text-lg mt-2">{claim.type}</CardTitle>
                          <CardDescription className="text-sm">
                            Policy #{claim.policyNumber} • Filed on {new Date(claim.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        
                        <div className="mt-3 sm:mt-0">
                          <span className="font-medium text-lg">{claim.amount}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <p className="text-gray-600 mb-4">{claim.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Date of Incident</div>
                          <div className="font-medium">
                            {new Date(claim.incidentDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {claim.reviewedBy && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Assigned Agent</div>
                            <div className="font-medium">{claim.reviewedBy}</div>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Status Updated</div>
                          <div className="font-medium">
                            {new Date(claim.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {claim.notes.length > 0 && (
                        <div className="border-t pt-4 mt-2">
                          <h4 className="text-sm font-medium mb-2">Notes & Updates</h4>
                          <ul className="space-y-2">
                            {claim.notes.map((note, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 flex justify-between">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      
                      {claim.status === 'pending' || claim.status === 'reviewing' ? (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload Documents
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-insure-teal hover:bg-insure-teal/90">
                          {claim.status === 'approved' ? "Track Payment" : "View Settlement"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {['pending', 'reviewing', 'approved', 'rejected', 'paid'].map((status) => (
              <TabsContent key={status} value={status} className="mt-0">
                <div className="space-y-6">
                  {claims
                    .filter(claim => claim.status === status)
                    .map((claim) => (
                      <Card key={claim.id} className="overflow-hidden">
                        <CardHeader className="pb-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div>
                              <div className="flex items-center">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>
                                  {statusLabels[claim.status]}
                                </span>
                                <span className="text-gray-500 text-sm ml-2">Claim #{claim.id}</span>
                              </div>
                              <CardTitle className="text-lg mt-2">{claim.type}</CardTitle>
                              <CardDescription className="text-sm">
                                Policy #{claim.policyNumber} • Filed on {new Date(claim.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            
                            <div className="mt-3 sm:mt-0">
                              <span className="font-medium text-lg">{claim.amount}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-4">
                          <p className="text-gray-600 mb-4">{claim.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-500">Date of Incident</div>
                              <div className="font-medium">
                                {new Date(claim.incidentDate).toLocaleDateString()}
                              </div>
                            </div>
                            
                            {claim.reviewedBy && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm text-gray-500">Assigned Agent</div>
                                <div className="font-medium">{claim.reviewedBy}</div>
                              </div>
                            )}
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-500">Status Updated</div>
                              <div className="font-medium">
                                {new Date(claim.updatedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          {claim.notes.length > 0 && (
                            <div className="border-t pt-4 mt-2">
                              <h4 className="text-sm font-medium mb-2">Notes & Updates</h4>
                              <ul className="space-y-2">
                                {claim.notes.map((note, index) => (
                                  <li key={index} className="flex items-start text-sm">
                                    <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="bg-gray-50 flex justify-between">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          
                          {claim.status === 'pending' || claim.status === 'reviewing' ? (
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload Documents
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-insure-teal hover:bg-insure-teal/90">
                              {claim.status === 'approved' ? "Track Payment" : "View Settlement"}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  
                  {claims.filter(claim => claim.status === status).length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                        {statusIcons[status as ClaimStatus]}
                      </div>
                      <h3 className="text-lg font-medium mb-2">No {statusLabels[status as ClaimStatus]} Claims</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {status === 'pending' || status === 'reviewing' 
                          ? "You don't have any claims currently in this status. To file a new claim, click 'File New Claim' above."
                          : `You don't have any claims that are ${statusLabels[status as ClaimStatus].toLowerCase()} at this time.`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Claims;

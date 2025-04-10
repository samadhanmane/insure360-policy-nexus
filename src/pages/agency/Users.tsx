
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
  FileText, 
  Mail,
  Phone,
  Calendar,
  User,
  Shield,
  CheckCircle, 
  XCircle,
  MessageSquare,
  Download,
  AlertTriangle,
  MoreHorizontal
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
import { User as PolicyUser } from '@/types/policy';

// Mock users data
const mockUsers: PolicyUser[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, CA 12345",
    status: "active",
    createdAt: "2022-10-15T10:00:00Z",
    updatedAt: "2023-09-22T14:30:00Z"
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-234-5678",
    address: "456 Oak Ave, Somewhere, NY 67890",
    status: "active",
    createdAt: "2022-11-05T09:15:00Z",
    updatedAt: "2023-10-10T11:45:00Z"
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-345-6789",
    address: "789 Pine St, Elsewhere, TX 54321",
    status: "active",
    createdAt: "2023-01-20T14:30:00Z",
    updatedAt: "2023-08-15T16:20:00Z"
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-456-7890",
    address: "321 Cedar Rd, Another City, FL 13579",
    status: "suspended",
    createdAt: "2023-02-10T08:45:00Z",
    updatedAt: "2023-07-01T09:10:00Z"
  },
  {
    id: "u5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "555-567-8901",
    status: "active",
    createdAt: "2023-03-15T11:30:00Z",
    updatedAt: "2023-09-05T13:40:00Z"
  },
  {
    id: "u6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "555-678-9012",
    address: "654 Maple Dr, Somewhere Else, WA 24680",
    status: "active",
    createdAt: "2023-04-25T15:20:00Z",
    updatedAt: "2023-10-20T10:15:00Z"
  }
];

// Mock policy counts per user (in a real app, this would come from the database)
const userPolicyCounts: Record<string, number> = {
  u1: 3,
  u2: 2,
  u3: 1,
  u4: 0,
  u5: 4,
  u6: 2
};

// Mock claim counts per user (in a real app, this would come from the database)
const userClaimCounts: Record<string, number> = {
  u1: 2,
  u2: 1,
  u3: 0,
  u4: 0,
  u5: 3,
  u6: 1
};

const AgencyUsers = () => {
  const [users, setUsers] = useState<PolicyUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<PolicyUser | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleViewUser = (user: PolicyUser) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };
  
  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' } 
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'active' ? 'suspended' : 'active';
    
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Suspended'}`,
      description: `${user?.name}'s account has been ${newStatus === 'active' ? 'activated' : 'suspended'}.`,
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.includes(searchTerm))
  );
  
  return (
    <AgencyLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Customers</h1>
          <p className="text-gray-600">Manage your insurance customers</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button className="bg-insure-teal hover:bg-insure-teal/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search customers..."
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
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Policies</TableHead>
              <TableHead>Claims</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-insure-teal/10 flex items-center justify-center text-insure-teal mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">Customer since {new Date(user.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{userPolicyCounts[user.id] || 0}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{userClaimCounts[user.id] || 0}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {user.status === 'active' ? 'Active' : 'Suspended'}
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
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <User className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Policies
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                        {user.status === 'active' ? (
                          <>
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                            <span className="text-red-600">Suspend Customer</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-green-600">Activate Customer</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-insure-teal/10 flex items-center justify-center text-insure-teal mr-2">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <span>{selectedUser.name}</span>
                </DialogTitle>
                <DialogDescription>
                  Customer ID: {selectedUser.id} • Customer since {new Date(selectedUser.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Contact Information</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status === 'active' ? 'Active' : 'Suspended'}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{selectedUser.email}</span>
                  </div>
                  
                  {selectedUser.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span>{selectedUser.phone}</span>
                    </div>
                  )}
                  
                  {selectedUser.address && (
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                      <span>{selectedUser.address}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-insure-teal mr-2" />
                      <h3 className="font-medium">Policies</h3>
                    </div>
                    <p className="text-2xl font-bold">{userPolicyCounts[selectedUser.id] || 0}</p>
                    <p className="text-sm text-gray-500">Active insurance policies</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-insure-teal mr-2" />
                      <h3 className="font-medium">Claims</h3>
                    </div>
                    <p className="text-2xl font-bold">{userClaimCounts[selectedUser.id] || 0}</p>
                    <p className="text-sm text-gray-500">Total filed claims</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Activity</h3>
                  
                  {userPolicyCounts[selectedUser.id] > 0 ? (
                    <div className="bg-gray-50 p-3 rounded space-y-3">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 mr-3 flex-shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Policy Renewed</p>
                          <p className="text-xs text-gray-600">Auto Insurance - 2 weeks ago</p>
                        </div>
                      </div>
                      
                      {userClaimCounts[selectedUser.id] > 0 && (
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mt-0.5 mr-3 flex-shrink-0">
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Claim Filed</p>
                            <p className="text-xs text-gray-600">Home Insurance (Water Damage) - 1 month ago</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => handleSuspendUser(selectedUser.id)}>
                  {selectedUser.status === 'active' ? (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-red-600">Suspend Customer</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-600">Activate Customer</span>
                    </>
                  )}
                </Button>
                <Button className="bg-insure-teal hover:bg-insure-teal/90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Customer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AgencyLayout>
  );
};

export default AgencyUsers;


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
  Edit,
  Trash,
  Shield,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Calendar
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

// Mock users data
const mockUsers = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    role: "customer",
    isVerified: true,
    status: "active",
    registeredDate: "2023-05-10T10:00:00Z",
    policies: 3
  },
  {
    id: "u2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "555-234-5678",
    role: "customer",
    isVerified: true,
    status: "active",
    registeredDate: "2023-07-22T14:30:00Z",
    policies: 1
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-345-6789",
    role: "customer",
    isVerified: true,
    status: "inactive",
    registeredDate: "2023-03-15T09:15:00Z",
    policies: 2
  },
  {
    id: "u4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "555-456-7890",
    role: "customer",
    isVerified: false,
    status: "pending",
    registeredDate: "2024-01-05T11:20:00Z",
    policies: 0
  },
  {
    id: "u5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "555-567-8901",
    role: "customer",
    isVerified: true,
    status: "active",
    registeredDate: "2023-09-30T16:45:00Z",
    policies: 4
  },
  {
    id: "u6",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    phone: "555-678-9012",
    role: "customer",
    isVerified: true,
    status: "active",
    registeredDate: "2023-11-12T13:10:00Z",
    policies: 2
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };
  
  const handleUpdateStatus = (id: string, newStatus: 'active' | 'inactive' | 'pending') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "User Status Updated",
      description: `The user's status has been set to ${newStatus}.`,
    });
  };
  
  const handleVerifyUser = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isVerified: true } : user
    ));
    
    toast({
      title: "User Verified",
      description: "The user has been successfully verified.",
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.includes(searchTerm))
  );
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Users</h1>
          <p className="text-gray-600">Manage all customer accounts on the platform</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
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
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Policies</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-insure-navy/10 flex items-center justify-center text-insure-navy mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">ID: {user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span className="truncate max-w-[200px]">{user.email}</span>
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
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    <span>{new Date(user.registeredDate).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-insure-teal/10 text-insure-teal">
                    {user.policies} policies
                  </span>
                </TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Unverified
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {user.status === 'pending' && <Shield className="h-3 w-3 mr-1" />}
                    {user.status === 'inactive' && <XCircle className="h-3 w-3 mr-1" />}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                      {!user.isVerified && (
                        <DropdownMenuItem onClick={() => handleVerifyUser(user.id)}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Verify User</span>
                        </DropdownMenuItem>
                      )}
                      
                      {user.status !== 'active' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, 'active')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-green-600">Activate User</span>
                        </DropdownMenuItem>
                      )}
                      
                      {user.status === 'active' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, 'inactive')}>
                          <XCircle className="h-4 w-4 mr-2 text-red-600" />
                          <span className="text-red-600">Deactivate User</span>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                        <Trash className="h-4 w-4 mr-2 text-red-600" />
                        <span className="text-red-600">Delete User</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

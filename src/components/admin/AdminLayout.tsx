
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Users, 
  Settings, 
  Building, 
  AlertTriangle, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin/dashboard' },
    { label: 'Agencies', icon: <Building className="h-5 w-5" />, path: '/admin/agencies' },
    { label: 'Policies', icon: <FileText className="h-5 w-5" />, path: '/admin/policies' },
    { label: 'Claims', icon: <Shield className="h-5 w-5" />, path: '/admin/claims' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, path: '/admin/users' },
    { label: 'System Alerts', icon: <AlertTriangle className="h-5 w-5" />, path: '/admin/alerts' },
    { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings' },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="ml-4 font-bold text-insure-navy text-lg">Insure360 Admin</div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-insure-navy text-white">
                    {currentUser?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Mobile sidebar content */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-center border-b px-4">
            <div className="text-xl font-bold text-insure-navy">Insure360 Admin</div>
          </div>
          
          <nav className="mt-5 px-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-insure-navy/10 text-insure-navy'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
      
      {/* Desktop layout */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <span className="text-xl font-bold text-insure-navy">Insure360 Admin</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-insure-navy/10 text-insure-navy'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-insure-navy text-white">
                    {currentUser?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-gray-700">
                  {currentUser?.name || 'Admin User'}
                </div>
                <div className="truncate text-sm text-gray-500">
                  {currentUser?.email || 'admin@insure360.com'}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow lg:hidden">
          {/* Mobile top bar is rendered above */}
        </div>
        
        <main className="py-16 lg:py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AgencyRouteProps {
  children: React.ReactNode;
}

const AgencyRoute: React.FC<AgencyRouteProps> = ({ children }) => {
  const { isAuthenticated, isAgency, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-insure-teal" />
        <span className="ml-2 text-lg text-insure-teal">Loading...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/agency/login" />;
  }
  
  if (!isAgency) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this area.</p>
        <button 
          className="px-4 py-2 bg-insure-teal text-white rounded-md hover:bg-insure-teal/90"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default AgencyRoute;

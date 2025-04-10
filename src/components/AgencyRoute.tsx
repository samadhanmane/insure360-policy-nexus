
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AgencyRouteProps {
  children: React.ReactNode;
}

const AgencyRoute: React.FC<AgencyRouteProps> = ({ children }) => {
  const { isAuthenticated, isAgency, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated && isAgency ? <>{children}</> : <Navigate to="/agency/login" />;
};

export default AgencyRoute;

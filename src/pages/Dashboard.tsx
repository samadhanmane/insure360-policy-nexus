
import Navbar from "@/components/Navbar";
import PolicyDashboard from "@/components/PolicyDashboard";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-insure-navy mb-6">Your Dashboard</h1>
          <PolicyDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

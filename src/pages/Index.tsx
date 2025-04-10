
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PolicyDashboard from "@/components/PolicyDashboard";
import AIAdvisor from "@/components/AIAdvisor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PolicyDashboard />
        <AIAdvisor />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import Navbar from "@/components/Navbar";
import AIAdvisor from "@/components/AIAdvisor";
import Footer from "@/components/Footer";

const Advisor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-insure-navy mb-6">AI Insurance Advisor</h1>
          <AIAdvisor />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Advisor;

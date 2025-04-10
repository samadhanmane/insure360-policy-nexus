
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Download } from "lucide-react";
import PolicyCard from "./PolicyCard";

const samplePolicies = [
  {
    type: "Home Insurance",
    provider: "SafeGuard Insurance",
    coverage: "$350,000",
    premium: "$1,200/year",
    renewalDate: "Nov 15, 2023",
    status: "active" as const
  },
  {
    type: "Auto Insurance",
    provider: "SecureDrive Co.",
    coverage: "$100,000",
    premium: "$800/year",
    renewalDate: "Jan 10, 2024",
    status: "active" as const
  },
  {
    type: "Health Insurance",
    provider: "WellCare Health",
    coverage: "Comprehensive",
    premium: "$350/month",
    renewalDate: "Mar 22, 2024",
    status: "active" as const
  },
  {
    type: "Life Insurance",
    provider: "FutureSafe Inc.",
    coverage: "$500,000",
    premium: "$75/month",
    renewalDate: "Dec 05, 2023",
    status: "pending" as const
  },
  {
    type: "Travel Insurance",
    provider: "JourneyProtect",
    coverage: "$50,000",
    premium: "$120 (one-time)",
    renewalDate: "Sep 30, 2023",
    status: "expired" as const
  },
  {
    type: "Business Insurance",
    provider: "EnterpriseShield",
    coverage: "$750,000",
    premium: "$3,600/year",
    renewalDate: "Feb 18, 2024",
    status: "active" as const
  }
];

const PolicyDashboard = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-insure-navy">Your Insurance Policies</h2>
            <p className="text-gray-600">Manage and monitor all your policies in one place</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-insure-teal hover:bg-insure-teal/90">
              <Plus className="h-4 w-4 mr-1" />
              Add New Policy
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Policies</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            
            <div className="flex mt-4 sm:mt-0 space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePolicies.map((policy, index) => (
                <PolicyCard
                  key={index}
                  type={policy.type}
                  provider={policy.provider}
                  coverage={policy.coverage}
                  premium={policy.premium}
                  renewalDate={policy.renewalDate}
                  status={policy.status}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePolicies
                .filter(policy => policy.status === 'active')
                .map((policy, index) => (
                  <PolicyCard
                    key={index}
                    type={policy.type}
                    provider={policy.provider}
                    coverage={policy.coverage}
                    premium={policy.premium}
                    renewalDate={policy.renewalDate}
                    status={policy.status}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePolicies
                .filter(policy => policy.status === 'pending')
                .map((policy, index) => (
                  <PolicyCard
                    key={index}
                    type={policy.type}
                    provider={policy.provider}
                    coverage={policy.coverage}
                    premium={policy.premium}
                    renewalDate={policy.renewalDate}
                    status={policy.status}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="expired" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePolicies
                .filter(policy => policy.status === 'expired')
                .map((policy, index) => (
                  <PolicyCard
                    key={index}
                    type={policy.type}
                    provider={policy.provider}
                    coverage={policy.coverage}
                    premium={policy.premium}
                    renewalDate={policy.renewalDate}
                    status={policy.status}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PolicyDashboard;

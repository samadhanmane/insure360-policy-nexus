
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  FileText, 
  Shield, 
  AlertTriangle, 
  BarChart, 
  PieChart, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  Bell,
  DollarSign,
  UserX,
  XCircle,
  CheckCircle,
  ChevronRight
} from "lucide-react";

const AdminDashboard = () => {
  // Mock statistics
  const stats = [
    { id: 1, name: "Total Agencies", value: "48", icon: <Building className="h-5 w-5 text-blue-500" />, change: "+3 this month" },
    { id: 2, name: "Total Users", value: "12,854", icon: <Users className="h-5 w-5 text-green-500" />, change: "+432 this month" },
    { id: 3, name: "Active Policies", value: "35,647", icon: <FileText className="h-5 w-5 text-indigo-500" />, change: "+1,245 this month" },
    { id: 4, name: "Total Claims", value: "4,721", icon: <Shield className="h-5 w-5 text-purple-500" />, change: "+152 this month" },
  ];
  
  // Mock agency activations
  const recentAgencies = [
    { id: "a1", name: "SafeGuard Insurance", status: "active", users: 1245, policies: 3567, date: "2 days ago" },
    { id: "a2", name: "SecureCover Co.", status: "pending", users: 0, policies: 0, date: "3 days ago" },
    { id: "a3", name: "TrustShield Insurance", status: "active", users: 876, policies: 2352, date: "1 week ago" },
    { id: "a4", name: "PrimeProtect Group", status: "suspended", users: 432, policies: 1254, date: "2 weeks ago" },
  ];
  
  // Mock alerts
  const systemAlerts = [
    { id: 1, type: "warning", message: "High claim volume detected in Auto Insurance category", time: "2 hours ago" },
    { id: 2, type: "error", message: "Agency 'InsureElite' has compliance issues that require attention", time: "5 hours ago" },
    { id: 3, type: "info", message: "System maintenance scheduled for April 15, 2025 at 2:00 AM", time: "Yesterday" },
    { id: 4, type: "success", message: "Monthly security audit completed successfully", time: "2 days ago" },
  ];
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">Admin Dashboard</h1>
          <p className="text-gray-600">
            Platform-wide metrics and operations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-1" />
            Activity Log
          </Button>
          <Button size="sm" className="bg-insure-teal hover:bg-insure-teal/90">
            <Bell className="h-4 w-4 mr-1" />
            Alerts (3)
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center items-center h-[250px] bg-gray-50 rounded-lg">
              <BarChart className="h-16 w-16 text-gray-300" />
              <span className="ml-4 text-gray-400">Chart visualization will appear here</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Platform Revenue</p>
                  <span className="text-green-600 text-xs font-medium flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    18%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">$846,235</p>
                <p className="text-xs text-gray-500 mt-1">Compared to $723,560 last month</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Agency Commission</p>
                  <span className="text-green-600 text-xs font-medium flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    12%
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1">$423,118</p>
                <p className="text-xs text-gray-500 mt-1">Compared to $395,280 last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Agency Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentAgencies.map((agency) => (
                <div key={agency.id} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    agency.status === 'active' ? 'bg-green-100 text-green-600' :
                    agency.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <Building className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium truncate">{agency.name}</p>
                      <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        agency.status === 'active' ? 'bg-green-100 text-green-800' :
                        agency.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex mt-1 text-xs text-gray-500">
                      <span className="mr-3 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {agency.users} users
                      </span>
                      <span className="mr-3 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {agency.policies} policies
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {agency.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Agencies
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    alert.type === 'error' ? 'bg-red-100 text-red-600' :
                    alert.type === 'success' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {alert.type === 'error' && <XCircle className="h-4 w-4" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4" />}
                    {alert.type === 'info' && <Bell className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button className="w-full justify-start bg-insure-teal hover:bg-insure-teal/90">
                <Building className="h-4 w-4 mr-2" />
                Approve New Agency
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Review Flagged Claims
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Modify Policy Templates
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <UserX className="h-4 w-4 mr-2" />
                User Compliance Check
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Reports
              </Button>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">System Status</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Server Load</span>
                    <span className="text-blue-800">28%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Database</span>
                    <span className="text-blue-800">45%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">API Requests</span>
                    <span className="text-blue-800">62%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-blue-100 text-xs text-blue-800">
                Last system restart: April 8, 2025 - 01:15 AM
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

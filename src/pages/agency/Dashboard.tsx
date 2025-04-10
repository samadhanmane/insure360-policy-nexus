
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  Shield, 
  DollarSign, 
  PieChart, 
  BarChart, 
  Clock, 
  Bell,
  CalendarDays,
  ChevronRight,
  Inbox,
  UserCheck
} from "lucide-react";
import { useAuth } from '../../contexts/AuthContext';
import AgencyLayout from '@/components/agency/AgencyLayout';

const AgencyDashboard = () => {
  const { currentUser } = useAuth();
  const agencyName = currentUser?.name || "Agency Dashboard";
  
  // Mock statistics
  const stats = [
    { id: 1, name: "Active Policies", value: "245", icon: <FileText className="h-5 w-5 text-insure-teal" />, change: "+12% from last month" },
    { id: 2, name: "Total Customers", value: "182", icon: <Users className="h-5 w-5 text-insure-teal" />, change: "+8% from last month" },
    { id: 3, name: "Open Claims", value: "18", icon: <Shield className="h-5 w-5 text-insure-teal" />, change: "-5% from last month" },
    { id: 4, name: "Monthly Revenue", value: "$28,650", icon: <DollarSign className="h-5 w-5 text-insure-teal" />, change: "+15% from last month" },
  ];
  
  // Mock recent activities
  const recentActivities = [
    { id: 1, type: "New Policy", customer: "John Smith", details: "Auto Insurance", date: "2 hours ago" },
    { id: 2, type: "Claim Filed", customer: "Sarah Johnson", details: "Home Insurance - Water Damage", date: "5 hours ago" },
    { id: 3, type: "Payment Received", customer: "Robert Brown", details: "$1,250 for Policy #45678", date: "Yesterday" },
    { id: 4, type: "Policy Renewal", customer: "Emily Davis", details: "Health Insurance", date: "Yesterday" },
    { id: 5, type: "Claim Approved", customer: "Michael Wilson", details: "Auto Insurance - Collision", date: "2 days ago" },
  ];
  
  // Mock pending tasks
  const pendingTasks = [
    { id: 1, task: "Review claim #CL-789", deadline: "Today", priority: "High" },
    { id: 2, task: "Contact customer about policy renewal", deadline: "Tomorrow", priority: "Medium" },
    { id: 3, task: "Update policy terms for business insurance", deadline: "Apr 15", priority: "Medium" },
    { id: 4, task: "Submit monthly compliance report", deadline: "Apr 20", priority: "High" },
  ];
  
  return (
    <AgencyLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-insure-navy">
            Welcome back, {agencyName}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your insurance business today
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-1" />
            Activity Log
          </Button>
          <Button size="sm" className="bg-insure-teal hover:bg-insure-teal/90">
            <Bell className="h-4 w-4 mr-1" />
            Notifications
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
                <div className="h-12 w-12 bg-insure-teal/10 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Policy Performance</CardTitle>
            <CardDescription>Monthly policy sales and renewals</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center items-center h-[300px] bg-gray-50 rounded-lg">
              <BarChart className="h-16 w-16 text-gray-300" />
              <span className="ml-4 text-gray-400">Chart visualization will appear here</span>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-sm font-medium">Total New Policies This Month</p>
                <p className="text-2xl font-bold">32</p>
                <p className="text-xs text-green-600">+24% from last month</p>
              </div>
              <div>
                <p className="text-sm font-medium">Policy Renewal Rate</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Premium</p>
                <p className="text-2xl font-bold">$1,250</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Policy Distribution</CardTitle>
            <CardDescription>By insurance type</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center items-center h-[200px] bg-gray-50 rounded-lg">
              <PieChart className="h-16 w-16 text-gray-300" />
              <span className="ml-4 text-gray-400">Chart visualization will appear here</span>
            </div>
            
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Auto Insurance</span>
                </div>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Home Insurance</span>
                </div>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm">Health Insurance</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Life Insurance</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-gray-500 rounded-full mr-2"></div>
                  <span className="text-sm">Other</span>
                </div>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Pending Tasks</span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{task.task}</p>
                    <div className="flex items-center mt-1">
                      <CalendarDays className="h-3 w-3 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">{task.deadline}</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className={`text-xs ${
                        task.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {task.priority} Priority
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0 h-8 w-8 p-0 rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activities</span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    {activity.type.includes("Policy") ? (
                      <FileText className="h-4 w-4" />
                    ) : activity.type.includes("Claim") ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <DollarSign className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-gray-600 truncate">{activity.customer} - {activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0 h-8 w-8 p-0 rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Link to="/agency/policies/new">
                <Button className="w-full justify-start bg-insure-teal hover:bg-insure-teal/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Policy
                </Button>
              </Link>
              
              <Link to="/agency/claims">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Review Claims
                </Button>
              </Link>
              
              <Link to="/agency/users">
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Manage Customers
                </Button>
              </Link>
              
              <Link to="/agency/messages">
                <Button variant="outline" className="w-full justify-start">
                  <Inbox className="h-4 w-4 mr-2" />
                  Check Messages
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Weekly Goals</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">New Policies</span>
                    <span className="text-blue-800">8/10</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Customer Follow-ups</span>
                    <span className="text-blue-800">15/20</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Claim Processing</span>
                    <span className="text-blue-800">12/15</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgencyLayout>
  );
};

export default AgencyDashboard;

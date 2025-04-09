
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, BarChart3, Upload, AlertCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmployeeRiskTable from "@/components/EmployeeRiskTable";
import RecentUploads from "@/components/RecentUploads";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer } from "@/components/ui/chart";
import DepartmentChart from "@/components/DepartmentChart";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: employeesData, isLoading: employeesLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('risk_score', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: uploadsData, isLoading: uploadsLoading } = useQuery({
    queryKey: ['uploads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_uploads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  const totalEmployees = employeesData?.length || 0;
  const atRiskEmployees = employeesData?.filter(emp => (emp.risk_score || 0) > 65).length || 0;
  const predictedTurnoverRate = totalEmployees > 0 ? ((atRiskEmployees / totalEmployees) * 100).toFixed(1) : "0";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/upload")} variant="outline" className="gap-2">
              <Upload size={16} /> Upload Data
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            icon={<Users />} 
            title="Total Employees" 
            value={totalEmployees.toString()} 
          />
          <StatsCard 
            icon={<AlertCircle />} 
            title="At Risk Employees" 
            value={atRiskEmployees.toString()} 
            trend={{
              value: `${((atRiskEmployees / (totalEmployees || 1)) * 100).toFixed(1)}%`,
              positive: false
            }}
          />
          <StatsCard 
            icon={<BarChart3 />} 
            title="Predicted Turnover Rate" 
            value={`${predictedTurnoverRate}%`} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DepartmentChart employees={employeesData || []} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Employees at Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeRiskTable employees={employeesData || []} isLoading={employeesLoading} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Data Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUploads uploads={uploadsData || []} isLoading={uploadsLoading} />
          </CardContent>
        </Card>
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default Dashboard;

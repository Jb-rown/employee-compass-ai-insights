import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, BarChart3, UploadIcon, AlertCircle } from "lucide-react";
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
import RetentionTrendsChart from "@/components/RetentionTrendsChart";
import DepartmentAttritionChart from "@/components/DepartmentAttritionChart";
import RiskLevelDistributionChart from "@/components/RiskLevelDistributionChart";
import { Employee, Upload } from "@/types/database";
import { toast } from "sonner";
import { FloatingChatbotButton } from "@/components/FloatingChatbotButton";
import { NotificationsPanel } from "@/components/NotificationsPanel";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { 
    isNotificationsOpen, 
    openNotifications, 
    closeNotifications, 
    unreadCount,
    addNotification,
    addAuditLog
  } = useNotifications();

  // Add a sample notification when the dashboard loads
  useEffect(() => {
    // This is just for demonstration purposes
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome to Employee Compass AI',
        message: 'Your dashboard has been personalized based on your recent activity.',
        type: 'info'
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  const { data: employeesData, isLoading: employeesLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('risk_score', { ascending: false });
        
        if (error) throw error;
        
        // Add audit log for successful data fetch
        addAuditLog({
          action: 'data_fetch',
          details: `Fetched ${data?.length || 0} employee records`
        });
        
        return data as Employee[] || [];
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employee data");
        
        // Add audit log for failed data fetch
        addAuditLog({
          action: 'error',
          details: 'Failed to fetch employee data'
        });
        
        return [] as Employee[];
      }
    }
  });

  const { data: uploadsData, isLoading: uploadsLoading } = useQuery({
    queryKey: ['uploads'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('data_uploads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        return data as Upload[] || [];
      } catch (error) {
        console.error("Error fetching uploads:", error);
        toast.error("Failed to fetch upload data");
        return [] as Upload[];
      }
    }
  });

  const totalEmployees = employeesData?.length || 0;
  const atRiskEmployees = employeesData?.filter(emp => (emp.risk_score || 0) > 65).length || 0;
  const predictedTurnoverRate = totalEmployees > 0 ? ((atRiskEmployees / totalEmployees) * 100).toFixed(1) : "0";
  
  // Calculate retention rate (assuming we have join_date and leave_date fields)
  const retentionRate = employeesData ? 
    ((employeesData.filter(emp => !emp.leave_date).length / totalEmployees) * 100).toFixed(1) : "0";
  
  // Calculate new joiners and leavers (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const newJoiners = employeesData?.filter(emp => 
    new Date(emp.join_date) >= thirtyDaysAgo
  ).length || 0;
  
  const leavers = employeesData?.filter(emp => 
    emp.leave_date && new Date(emp.leave_date) >= thirtyDaysAgo
  ).length || 0;

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
            <Button 
              onClick={openNotifications} 
              variant="outline" 
              className="relative"
            >
              <AlertCircle size={16} className="mr-2" />
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
            <Button onClick={() => navigate("/upload")} variant="outline" className="gap-2">
              <UploadIcon size={16} /> Upload Data
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={<Users />} 
            title="Total Employees" 
            value={totalEmployees.toString()} 
          />
          <StatsCard 
            icon={<AlertCircle />} 
            title="Employees at Risk" 
            value={atRiskEmployees.toString()} 
            trend={{
              value: `${((atRiskEmployees / (totalEmployees || 1)) * 100).toFixed(1)}%`,
              positive: false
            }}
          />
          <StatsCard 
            icon={<BarChart3 />} 
            title="Retention Rate" 
            value={`${retentionRate}%`} 
            trend={{
              value: "Last 30 days",
              positive: true
            }}
          />
          <StatsCard 
            icon={<Users className="rotate-180" />} 
            title="New Joiners / Leavers" 
            value={`${newJoiners} / ${leavers}`} 
            trend={{
              value: "Last 30 days",
              positive: newJoiners > leavers
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Retention Trends</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <RetentionTrendsChart employees={employeesData || []} />
              )}
            </CardContent>
          </Card>
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Department-wise Attrition</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DepartmentAttritionChart employees={employeesData || []} />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <RiskLevelDistributionChart employees={employeesData || []} />
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
      <FloatingChatbotButton position="bottom-right" size="md" />
      
      {/* Notifications Panel */}
      {user && (
        <NotificationsPanel 
          isOpen={isNotificationsOpen} 
          onClose={closeNotifications} 
          userId={user.id} 
        />
      )}
    </div>
  );
};

export default Dashboard;


import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Briefcase, Calendar, DollarSign, LineChart, FileText, Plus, Send } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Employee } from "@/types/database";
import { PredictionHistory, Note, PerformanceMetric } from "@/types/admin";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [newNote, setNewNote] = React.useState("");

  // Fetch employee data
  const { data: employee, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data as Employee;
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Failed to fetch employee data");
        return null;
      }
    }
  });

  // Mock prediction history data
  const predictionHistory = [
    { id: '1', employeeId: id, riskScore: 25, date: '2025-01-15', factors: ['Salary below market', 'Long commute'] },
    { id: '2', employeeId: id, riskScore: 35, date: '2025-02-15', factors: ['Salary below market', 'Long commute', 'Low engagement'] },
    { id: '3', employeeId: id, riskScore: 42, date: '2025-03-15', factors: ['Salary below market', 'Low engagement', 'Missed promotion'] },
    { id: '4', employeeId: id, riskScore: 65, date: '2025-04-01', factors: ['Salary below market', 'Low engagement', 'Missed promotion', 'Recent manager change'] },
  ];

  // Mock performance metrics data
  const performanceData = [
    { id: '1', employeeId: id, metric: 'Productivity', value: 85, date: '2025-01-15' },
    { id: '2', employeeId: id, metric: 'Productivity', value: 82, date: '2025-02-15' },
    { id: '3', employeeId: id, metric: 'Productivity', value: 78, date: '2025-03-15' },
    { id: '4', employeeId: id, metric: 'Productivity', value: 75, date: '2025-04-01' },
  ];

  // Mock notes data
  const [notes, setNotes] = React.useState<Note[]>([
    { 
      id: '1', 
      employeeId: id || '', 
      content: 'Employee expressed interest in professional development opportunities, particularly in leadership training.',
      createdBy: 'Jane Smith', 
      createdAt: '2025-03-15T10:30:00Z'
    },
    {
      id: '2',
      employeeId: id || '',
      content: 'Discussed concerns about current compensation. Employee feels undervalued compared to market rates.',
      createdBy: 'Mark Johnson',
      createdAt: '2025-03-28T14:15:00Z'
    }
  ]);

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error("Note content is required");
      return;
    }

    const note: Note = {
      id: String(Date.now()),
      employeeId: id || '',
      content: newNote,
      createdBy: 'Current User', // In a real app, this would be the current user
      createdAt: new Date().toISOString()
    };

    setNotes([note, ...notes]);
    setNewNote("");
    toast.success("Note added successfully");
  };

  // Chart data for risk score
  const riskChartData = predictionHistory.map(ph => ({
    date: format(new Date(ph.date), 'MMM dd'),
    riskScore: ph.riskScore
  }));

  // Chart data for performance
  const performanceChartData = performanceData.map(pd => ({
    date: format(new Date(pd.date), 'MMM dd'),
    performance: pd.value
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/40">
        <NavBar />
        <DashboardLayout>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/40">
        <NavBar />
        <DashboardLayout>
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold">Employee not found</h2>
            <p className="mt-4">The employee you're looking for doesn't exist or you don't have access.</p>
            <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back
            </Button>
            <h1 className="text-3xl font-bold">Employee Profile</h1>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} />
                  <AvatarFallback>{employee.name?.[0]}{employee.name?.[1]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.position || 'No position set'}</p>
                <p className="text-muted-foreground">{employee.department || 'No department set'}</p>

                <div className="grid grid-cols-1 gap-4 w-full mt-6">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="text-sm">{employee.email || 'No email set'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm">Hired: {employee.hire_date ? format(new Date(employee.hire_date), 'MMMM d, yyyy') : 'No hire date set'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-muted-foreground" />
                    <span className="text-sm">{employee.position || 'No position set'}</span>
                  </div>
                </div>

                <div className="w-full mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Current Risk Score</span>
                    <span className={`text-lg font-bold ${
                      (employee.risk_score || 0) > 65 ? 'text-red-500' : 
                      (employee.risk_score || 0) > 30 ? 'text-yellow-500' : 
                      'text-green-500'
                    }`}>
                      {employee.risk_score || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        (employee.risk_score || 0) > 65 ? 'bg-red-500' : 
                        (employee.risk_score || 0) > 30 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`} 
                      style={{ width: `${employee.risk_score || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <Tabs defaultValue="predictions" className="w-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Employee Details</CardTitle>
                  <TabsList>
                    <TabsTrigger value="predictions">Predictions</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="predictions">
                  <div className="space-y-6">
                    <div className="h-[300px]">
                      <ChartContainer config={{}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={riskChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="riskScore" 
                              stroke="#ef4444" 
                              strokeWidth={2} 
                              dot={{ r: 5 }} 
                              name="Risk Score"
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    <h3 className="text-lg font-medium mt-8 mb-4">Prediction History</h3>
                    <div className="space-y-4">
                      {predictionHistory.map((prediction) => (
                        <Card key={prediction.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{format(new Date(prediction.date), 'MMMM d, yyyy')}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                prediction.riskScore > 65 ? 'bg-red-100 text-red-800' : 
                                prediction.riskScore > 30 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'
                              }`}>
                                Risk Score: {prediction.riskScore}%
                              </span>
                            </div>
                            <h4 className="text-sm font-medium mb-1">Contributing Factors:</h4>
                            <div className="flex flex-wrap gap-2">
                              {prediction.factors?.map((factor, idx) => (
                                <span key={idx} className="bg-muted px-2 py-1 rounded-md text-xs">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance">
                  <div className="space-y-6">
                    <div className="h-[300px]">
                      <ChartContainer config={{}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={performanceChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="performance" 
                              stroke="#3b82f6" 
                              strokeWidth={2} 
                              dot={{ r: 5 }} 
                              name="Performance"
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    <h3 className="text-lg font-medium mt-8 mb-4">Key Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <span className="text-muted-foreground text-sm">Current Productivity</span>
                          <span className="text-3xl font-bold mt-2">75%</span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <span className="text-muted-foreground text-sm">Team Contribution</span>
                          <span className="text-3xl font-bold mt-2">82%</span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <span className="text-muted-foreground text-sm">Engagement Score</span>
                          <span className="text-3xl font-bold mt-2">68%</span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes">
                  <div className="space-y-6">
                    <div className="mb-4">
                      <Label htmlFor="new-note" className="text-base font-medium">Add Note</Label>
                      <div className="flex gap-2 mt-2">
                        <Textarea 
                          id="new-note" 
                          placeholder="Enter note about this employee..." 
                          value={newNote} 
                          onChange={(e) => setNewNote(e.target.value)}
                          className="flex-1"
                        />
                        <Button className="self-end" onClick={handleAddNote}>
                          <Send size={16} />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Notes History</h3>
                    <div className="space-y-4">
                      {notes.length === 0 ? (
                        <p className="text-muted-foreground">No notes have been added yet.</p>
                      ) : (
                        notes.map((note) => (
                          <Card key={note.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{note.createdBy}</span>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(note.createdAt), 'MMMM d, yyyy')}
                                </span>
                              </div>
                              <p className="text-sm">{note.content}</p>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default EmployeeProfile;

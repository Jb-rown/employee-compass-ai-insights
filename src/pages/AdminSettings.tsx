
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { Trash2, Plus, Edit, RefreshCw, UserPlus, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Department, RiskThreshold, UserPermission } from "@/types/admin";

const AdminSettings = () => {
  const [newDepartment, setNewDepartment] = React.useState("");
  const [newDepartmentDesc, setNewDepartmentDesc] = React.useState("");
  const [thresholds, setThresholds] = React.useState<RiskThreshold[]>([
    { level: "low", minValue: 0, maxValue: 30 },
    { level: "medium", minValue: 31, maxValue: 65 },
    { level: "high", minValue: 66, maxValue: 100 },
  ]);

  const { data: departments, isLoading: isLoadingDepartments, refetch: refetchDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      // Mocked data for now - would be replaced with actual Supabase query
      return [
        { id: '1', name: 'Engineering', description: 'Software development team' },
        { id: '2', name: 'Marketing', description: 'Brand and growth' },
        { id: '3', name: 'Sales', description: 'Revenue generation' },
        { id: '4', name: 'Human Resources', description: 'Employee management' }
      ] as Department[];
    }
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Mocked data for now - would be replaced with actual Supabase query
      return [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'viewer' }
      ];
    }
  });

  const handleAddDepartment = () => {
    if (!newDepartment.trim()) {
      toast.error("Department name is required");
      return;
    }

    toast.success(`Department "${newDepartment}" added successfully`);
    setNewDepartment("");
    setNewDepartmentDesc("");
    refetchDepartments();
  };

  const handleDeleteDepartment = (id: string, name: string) => {
    toast.success(`Department "${name}" deleted successfully`);
    refetchDepartments();
  };

  const handleSaveThresholds = () => {
    toast.success("Risk thresholds updated successfully");
  };

  const handleRetrainModel = () => {
    toast.success("Model retraining triggered successfully");
    // Simulate retraining process
    setTimeout(() => {
      toast.success("Model retraining completed");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
        </div>

        <Tabs defaultValue="departments" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">Users & Permissions</TabsTrigger>
            <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
            <TabsTrigger value="model">Model Training</TabsTrigger>
          </TabsList>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building size={20} />
                  Manage Departments
                </CardTitle>
                <CardDescription>
                  Add, edit, or remove departments in your organization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="departmentName">Department Name</Label>
                    <Input 
                      id="departmentName" 
                      value={newDepartment} 
                      onChange={(e) => setNewDepartment(e.target.value)} 
                      placeholder="e.g. Marketing"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="departmentDesc">Description (Optional)</Label>
                    <Input 
                      id="departmentDesc" 
                      value={newDepartmentDesc} 
                      onChange={(e) => setNewDepartmentDesc(e.target.value)} 
                      placeholder="Brief description of this department"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddDepartment} className="gap-2">
                      <Plus size={16} /> Add Department
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingDepartments ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">Loading departments...</TableCell>
                      </TableRow>
                    ) : departments && departments.length > 0 ? (
                      departments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.description}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteDepartment(dept.id, dept.name)}>
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">No departments found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus size={20} />
                  Users & Permissions
                </CardTitle>
                <CardDescription>
                  Manage user access and permission levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button className="gap-2">
                    <Plus size={16} /> Add User
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingUsers ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">Loading users...</TableCell>
                      </TableRow>
                    ) : users && users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-red-100 text-red-800' 
                                : user.role === 'manager' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds">
            <Card>
              <CardHeader>
                <CardTitle>Risk Thresholds</CardTitle>
                <CardDescription>
                  Configure thresholds for different risk levels used in employee prediction models.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">Low Risk ({thresholds[0].minValue}-{thresholds[0].maxValue})</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Safe</span>
                    </div>
                    <Slider 
                      defaultValue={[thresholds[0].maxValue]} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        const newThresholds = [...thresholds];
                        newThresholds[0].maxValue = value[0];
                        newThresholds[1].minValue = value[0] + 1;
                        setThresholds(newThresholds);
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">Medium Risk ({thresholds[1].minValue}-{thresholds[1].maxValue})</h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Warning</span>
                    </div>
                    <Slider 
                      defaultValue={[thresholds[1].maxValue]} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        const newThresholds = [...thresholds];
                        newThresholds[1].maxValue = value[0];
                        newThresholds[2].minValue = value[0] + 1;
                        setThresholds(newThresholds);
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">High Risk ({thresholds[2].minValue}-{thresholds[2].maxValue})</h3>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</span>
                    </div>
                  </div>

                  <Button onClick={handleSaveThresholds}>Save Thresholds</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="model">
            <Card>
              <CardHeader>
                <CardTitle>Model Training</CardTitle>
                <CardDescription>
                  Trigger manual retraining of the prediction model with latest data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium">Model Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Last Trained:</div>
                      <div>April 10, 2025 (1 day ago)</div>
                      <div className="font-medium">Training Dataset:</div>
                      <div>1,452 employee records</div>
                      <div className="font-medium">Model Version:</div>
                      <div>v3.2.1</div>
                      <div className="font-medium">Accuracy:</div>
                      <div>87.3%</div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleRetrainModel} className="gap-2">
                  <RefreshCw size={16} /> Retrain Model
                </Button>
                <p className="text-sm text-muted-foreground">
                  Note: Retraining the model may take several minutes. You'll be notified when it completes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default AdminSettings;

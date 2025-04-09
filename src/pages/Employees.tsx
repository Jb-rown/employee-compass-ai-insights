
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Download, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import AddEmployeeDialog from "@/components/AddEmployeeDialog";
import { Employee } from "@/types/database";
import { toast } from "sonner";

const Employees = () => {
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('last_name', { ascending: true });
        
        if (error) throw error;
        return data as Employee[] || [];
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employee data");
        return [] as Employee[];
      }
    }
  });

  const filteredEmployees = employees.filter(
    (emp) => 
      emp.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.position && emp.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddEmployee = async (newEmployee: Partial<Employee>) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([
          { 
            ...newEmployee,
            user_id: user!.id 
          }
        ])
        .select();
        
      if (error) throw error;
      refetch();
      toast.success("Employee added successfully");
      return data as Employee[];
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee");
      throw error;
    }
  };

  const getRiskBadge = (score: number | null) => {
    if (score === null) return null;
    
    let bgColor = "bg-green-100 text-green-800";
    let text = "Low";
    
    if (score >= 80) {
      bgColor = "bg-red-100 text-red-800";
      text = "High";
    } else if (score >= 65) {
      bgColor = "bg-amber-100 text-amber-800";
      text = "Medium";
    }
    
    return (
      <span className={`${bgColor} text-xs font-medium px-2.5 py-0.5 rounded`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employees</h1>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download size={16} /> Export
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <PlusCircle size={16} /> Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Employee Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No employees found</p>
                <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                  Add Employee
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Hire Date</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          {employee.first_name} {employee.last_name}
                        </TableCell>
                        <TableCell>{employee.department || "—"}</TableCell>
                        <TableCell>{employee.position || "—"}</TableCell>
                        <TableCell>
                          {employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : "—"}
                        </TableCell>
                        <TableCell>
                          {getRiskBadge(employee.risk_score)}
                          {employee.risk_score !== null && <span className="ml-2 text-sm">{employee.risk_score}</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </DashboardLayout>
      <Footer />

      <AddEmployeeDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;

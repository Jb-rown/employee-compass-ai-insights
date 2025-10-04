import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Download, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import AddEmployeeDialog from "@/components/AddEmployeeDialog";
import { Employee } from "@/types/database";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const Employees = () => {
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    department: "",
    riskLevel: "",
    status: "",
  });

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) throw error;
        return data as Employee[] || [];
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employee data");
        return [] as Employee[];
      }
    }
  });

  const departments = useMemo(() => {
    const uniqueDepartments = [...new Set(employees.map(emp => emp.department))].filter(Boolean);
    return uniqueDepartments;
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.position && emp.position.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartment = !filters.department || emp.department === filters.department;
      
      const matchesRiskLevel = !filters.riskLevel || (
        filters.riskLevel === "high" && (emp.risk_score || 0) >= 80 ||
        filters.riskLevel === "medium" && (emp.risk_score || 0) >= 65 && (emp.risk_score || 0) < 80 ||
        filters.riskLevel === "low" && (emp.risk_score || 0) < 65
      );

      const matchesStatus = !filters.status || (
        filters.status === "at_risk" && (emp.risk_score || 0) >= 65 ||
        filters.status === "safe" && (emp.risk_score || 0) < 65
      );

      return matchesSearch && matchesDepartment && matchesRiskLevel && matchesStatus;
    });
  }, [employees, searchTerm, filters]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      // In a real implementation, you would generate and download the file
      // For now, we'll just show a success message
      toast.success(`Exporting to ${format.toUpperCase()}...`);
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      toast.error(`Failed to export to ${format}`);
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

  const getStatusBadge = (score: number | null) => {
    if (score === null) return null;
    
    if (score >= 65) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          At Risk
        </span>
      );
    }
    
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
        Safe
      </span>
    );
  };

  const handleAddEmployee = async (newEmployee: Partial<Employee>) => {
    try {
      // Ensure required fields are present
      if (!newEmployee.name) {
        throw new Error("Name is required");
      }
      
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          name: newEmployee.name,
          email: newEmployee.email,
          department: newEmployee.department,
          position: newEmployee.position,
          hire_date: newEmployee.hire_date,
          risk_score: newEmployee.risk_score,
          risk_level: newEmployee.risk_level,
          user_id: user!.id
        }])
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

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employees</h1>
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Download size={16} /> Export
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleExport('csv')}
                  >
                    Export as CSV
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select
                        value={filters.department}
                        onValueChange={(value) => setFilters({ ...filters, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Risk Level</Label>
                      <Select
                        value={filters.riskLevel}
                        onValueChange={(value) => setFilters({ ...filters, riskLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Risk Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Risk Levels</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="low">Low Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({ ...filters, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Statuses</SelectItem>
                          <SelectItem value="at_risk">At Risk</SelectItem>
                          <SelectItem value="safe">Safe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({ department: "", riskLevel: "", status: "" })}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name/ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Evaluation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">
                            <div>{employee.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {employee.id}</div>
                          </TableCell>
                          <TableCell>{employee.department || "—"}</TableCell>
                          <TableCell>
                            {getRiskBadge(employee.risk_score)}
                            {employee.risk_score !== null && (
                              <span className="ml-2 text-sm">{employee.risk_score.toFixed(1)}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(employee.risk_score)}
                          </TableCell>
                          <TableCell>
                            {employee.updated_at ? new Date(employee.updated_at).toLocaleDateString() : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredEmployees.length)} of {filteredEmployees.length} employees
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </>
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

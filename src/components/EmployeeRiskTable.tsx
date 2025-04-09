
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/types/database";

interface EmployeeRiskTableProps {
  employees: Employee[];
  isLoading: boolean;
}

const EmployeeRiskTable = ({ employees, isLoading }: EmployeeRiskTableProps) => {
  const navigate = useNavigate();
  
  // Filter to just show employees at risk (score > 65) and limit to 5
  const atRiskEmployees = employees
    .filter(emp => (emp.risk_score || 0) > 65)
    .sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0))
    .slice(0, 5);

  const getRiskColor = (score: number | null) => {
    if (!score) return "text-gray-500";
    if (score >= 80) return "text-red-600 font-semibold";
    if (score >= 65) return "text-orange-500 font-semibold";
    return "text-green-600";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (atRiskEmployees.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No employees at risk</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Risk Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {atRiskEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {employee.first_name} {employee.last_name}
              </TableCell>
              <TableCell>{employee.department || "—"}</TableCell>
              <TableCell>{employee.position || "—"}</TableCell>
              <TableCell className={getRiskColor(employee.risk_score)}>
                {employee.risk_score || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/employees")}>
          View All Employees
        </Button>
      </div>
    </div>
  );
};

export default EmployeeRiskTable;

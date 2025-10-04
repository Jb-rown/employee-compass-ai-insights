
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types/database';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface EmployeeRiskTableProps {
  employees: Employee[];
  isLoading: boolean;
}

const EmployeeRiskTable = ({ employees, isLoading }: EmployeeRiskTableProps) => {
  const navigate = useNavigate();
  const sortedEmployees = [...employees].sort((a, b) => {
    const riskA = a.risk_score || 0;
    const riskB = b.risk_score || 0;
    return riskB - riskA;
  }).slice(0, 5);

  const handleViewProfile = (id: string) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : sortedEmployees.length > 0 ? (
            sortedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  {employee.name}
                </TableCell>
                <TableCell>{employee.department || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                    <span className="font-medium whitespace-nowrap">
                      {employee.risk_score || 0}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewProfile(employee.id)}
                  >
                    <ExternalLink size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No employees found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeRiskTable;


import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type Employee = {
  id: string;
  department: string | null;
  risk_score: number | null;
  [key: string]: any;
};

interface DepartmentChartProps {
  employees: Employee[];
}

const COLORS = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EC4899", // pink-500
  "#8B5CF6", // violet-500
  "#6366F1", // indigo-500
  "#EF4444", // red-500
  "#14B8A6", // teal-500
];

const DEFAULT_DEPARTMENT = "Unassigned";

const DepartmentChart = ({ employees }: DepartmentChartProps) => {
  const departmentData = useMemo(() => {
    const departments: Record<string, number> = {};
    
    employees.forEach((employee) => {
      const department = employee.department || DEFAULT_DEPARTMENT;
      departments[department] = (departments[department] || 0) + 1;
    });
    
    return Object.entries(departments).map(([name, value]) => ({
      name,
      value,
    })).sort((a, b) => b.value - a.value);
  }, [employees]);

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No employee data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={departmentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => 
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {departmentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value} employees`, 'Count']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DepartmentChart;

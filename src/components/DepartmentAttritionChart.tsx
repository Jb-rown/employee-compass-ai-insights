import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Employee } from "@/types/database";

interface DepartmentAttritionChartProps {
  employees: Employee[];
}

const COLORS = {
  attrition: "#EF4444", // red-500
  retention: "#10B981", // emerald-500
};

const DEFAULT_DEPARTMENT = "Unassigned";

const DepartmentAttritionChart = ({ employees }: DepartmentAttritionChartProps) => {
  const departmentData = useMemo(() => {
    const departments: Record<string, { total: number; left: number }> = {};
    
    employees.forEach((employee) => {
      const department = employee.department || DEFAULT_DEPARTMENT;
      if (!departments[department]) {
        departments[department] = { total: 0, left: 0 };
      }
      departments[department].total += 1;
      // Note: leave_date is not in current schema, so left count is 0
    });
    
    return Object.entries(departments)
      .map(([name, data]) => ({
        name,
        total: data.total,
        left: data.left,
        attritionRate: Number(((data.left / data.total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.attritionRate - a.attritionRate);
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
      <BarChart data={departmentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Attrition Rate']}
        />
        <Legend />
        <Bar
          dataKey="attritionRate"
          name="Attrition Rate"
          fill={COLORS.attrition}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentAttritionChart; 
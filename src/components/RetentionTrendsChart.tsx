import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Employee } from "@/types/database";

interface RetentionTrendsChartProps {
  employees: Employee[];
}

const RetentionTrendsChart = ({ employees }: RetentionTrendsChartProps) => {
  const retentionData = useMemo(() => {
    // Get the last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date;
    }).reverse();

    return months.map(date => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      // Calculate employees hired before this month (using hire_date)
      const activeEmployees = employees.filter(emp => {
        if (!emp.hire_date) return false;
        const hireDate = new Date(emp.hire_date);
        return hireDate <= monthEnd;
      }).length;

      // Calculate total employees hired before this month
      const totalEmployees = employees.filter(emp => {
        if (!emp.hire_date) return false;
        return new Date(emp.hire_date) <= monthEnd;
      }).length;

      const retentionRate = totalEmployees > 0 
        ? (activeEmployees / totalEmployees) * 100 
        : 0;

      return {
        month: date.toLocaleString('default', { month: 'short' }),
        retentionRate: Number(retentionRate.toFixed(1))
      };
    });
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
      <LineChart data={retentionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Retention Rate']}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="retentionRate"
          name="Retention Rate"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RetentionTrendsChart; 
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Employee } from "@/types/database";

interface RiskLevelDistributionChartProps {
  employees: Employee[];
}

const COLORS = {
  low: "#10B981", // emerald-500
  medium: "#F59E0B", // amber-500
  high: "#EF4444", // red-500
};

const RISK_LEVELS = {
  low: { min: 0, max: 33, label: "Low Risk" },
  medium: { min: 34, max: 66, label: "Medium Risk" },
  high: { min: 67, max: 100, label: "High Risk" },
};

const RiskLevelDistributionChart = ({ employees }: RiskLevelDistributionChartProps) => {
  const riskData = useMemo(() => {
    const distribution = {
      low: 0,
      medium: 0,
      high: 0,
    };
    
    employees.forEach((employee) => {
      const riskScore = employee.risk_score || 0;
      if (riskScore <= RISK_LEVELS.low.max) {
        distribution.low += 1;
      } else if (riskScore <= RISK_LEVELS.medium.max) {
        distribution.medium += 1;
      } else {
        distribution.high += 1;
      }
    });
    
    return Object.entries(distribution).map(([key, value]) => ({
      name: RISK_LEVELS[key as keyof typeof RISK_LEVELS].label,
      value,
      percentage: Number(((value / employees.length) * 100).toFixed(1))
    }));
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
          data={riskData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percentage }) => `${name}: ${percentage}%`}
        >
          {riskData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[Object.keys(COLORS)[index] as keyof typeof COLORS]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string) => [`${value} employees`, name]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RiskLevelDistributionChart; 
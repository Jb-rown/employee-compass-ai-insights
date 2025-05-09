
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({ icon, title, value, trend, className }: StatsCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg", 
      "transform hover:-translate-y-1 border border-border/50",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="text-primary p-2 rounded-md bg-primary/10">
            {icon}
          </div>
          {trend && (
            <div className={`text-xs font-medium flex items-center ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
              <span className="mr-1">{trend.positive ? '↑' : '↓'}</span>
              <span className="animate-fade-in">{trend.value}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

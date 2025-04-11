
export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface UserPermission {
  id: string;
  userId: string;
  role: 'admin' | 'manager' | 'viewer';
  createdAt?: string;
  updatedAt?: string;
}

export interface RiskThreshold {
  level: 'low' | 'medium' | 'high';
  minValue: number;
  maxValue: number;
}

export interface Note {
  id: string;
  employeeId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface PerformanceMetric {
  id: string;
  employeeId: string;
  metric: string;
  value: number;
  date: string;
}

export interface PredictionHistory {
  id: string;
  employeeId: string;
  riskScore: number;
  date: string;
  factors?: string[];
}

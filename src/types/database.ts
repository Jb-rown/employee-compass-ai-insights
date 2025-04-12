export interface Employee {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  join_date?: string;  // Date when employee joined
  leave_date?: string; // Date when employee left (if applicable)
  salary?: number;
  risk_score?: number;
  created_at?: string;
  updated_at?: string;
  last_evaluation_date?: string; // Date of the last evaluation
  next_evaluation_date?: string; // Date of the next scheduled evaluation
}

export interface Upload {
  id: string;
  user_id: string;
  filename: string;
  row_count: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'high_risk' | 'evaluation' | 'system' | 'retraining';
  is_read: boolean;
  created_at: string;
  employee_id?: string; // Reference to employee if notification is about an employee
  link?: string; // Optional link to navigate to
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: 'login' | 'logout' | 'prediction' | 'employee_edit' | 'employee_add' | 'employee_delete' | 'data_upload';
  details: string;
  created_at: string;
  employee_id?: string; // Reference to employee if action is about an employee
  metadata?: Record<string, any>; // Additional data about the action
}

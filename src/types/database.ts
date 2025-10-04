export interface Employee {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  risk_score?: number;
  risk_level?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Upload {
  id: string;
  user_id: string;
  file_name: string;
  file_size?: number;
  records_count?: number;
  status: string;
  upload_date?: string;
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

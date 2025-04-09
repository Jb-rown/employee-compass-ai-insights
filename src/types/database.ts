
export interface Employee {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  salary?: number;
  risk_score?: number;
  created_at?: string;
  updated_at?: string;
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

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { X, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Users, Calendar } from 'lucide-react';

interface RiskFactor {
  name: string;
  value: number;
  color: string;
}

interface DepartmentRisk {
  name: string;
  riskScore: number;
  employeeCount: number;
}

interface DataInsightsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataInsightsPanel: React.FC<DataInsightsPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'factors' | 'departments' | 'trends'>('factors');
  const [isExpanded, setIsExpanded] = useState(true);

  // Sample data - in a real app, this would come from your API
  const riskFactors: RiskFactor[] = [
    { name: 'Attendance Issues', value: 35, color: '#FF6384' },
    { name: 'Performance Decline', value: 28, color: '#36A2EB' },
    { name: 'Engagement Drop', value: 22, color: '#FFCE56' },
    { name: 'Communication Problems', value: 15, color: '#4BC0C0' },
  ];

  const departmentRisks: DepartmentRisk[] = [
    { name: 'Engineering', riskScore: 0.42, employeeCount: 45 },
    { name: 'Sales', riskScore: 0.38, employeeCount: 32 },
    { name: 'Marketing', riskScore: 0.25, employeeCount: 18 },
    { name: 'HR', riskScore: 0.15, employeeCount: 12 },
    { name: 'Finance', riskScore: 0.10, employeeCount: 8 },
  ];

  const monthlyTrends = [
    { month: 'Jan', highRisk: 5, mediumRisk: 12, lowRisk: 25 },
    { month: 'Feb', highRisk: 4, mediumRisk: 14, lowRisk: 28 },
    { month: 'Mar', highRisk: 6, mediumRisk: 15, lowRisk: 30 },
    { month: 'Apr', highRisk: 7, mediumRisk: 16, lowRisk: 32 },
    { month: 'May', highRisk: 5, mediumRisk: 13, lowRisk: 29 },
    { month: 'Jun', highRisk: 4, mediumRisk: 11, lowRisk: 27 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-20 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-40 flex flex-col max-h-[calc(100vh-6rem)]">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">Data Insights</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="p-2 border-b dark:border-gray-700">
            <div className="flex space-x-1">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'factors'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('factors')}
              >
                Risk Factors
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'departments'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('departments')}
              >
                Departments
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'trends'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('trends')}
              >
                Trends
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'factors' && (
              <div className="space-y-4">
                <h4 className="font-medium dark:text-white">Factors Most Influencing Risk</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskFactors}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskFactors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: factor.color }}></div>
                        <span className="text-sm dark:text-gray-300">{factor.name}</span>
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">{factor.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'departments' && (
              <div className="space-y-4">
                <h4 className="font-medium dark:text-white">Department Risk Analysis</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentRisks}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="riskScore" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {departmentRisks.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm dark:text-gray-300">{dept.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm mr-2 dark:text-gray-300">{dept.employeeCount} employees</span>
                        <span className={`text-sm font-medium ${
                          dept.riskScore > 0.3 ? 'text-red-500' : 
                          dept.riskScore > 0.15 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {(dept.riskScore * 100).toFixed(0)}% risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'trends' && (
              <div className="space-y-4">
                <h4 className="font-medium dark:text-white">Monthly Risk Trends</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="highRisk" stackId="a" fill="#FF6384" />
                      <Bar dataKey="mediumRisk" stackId="a" fill="#FFCE56" />
                      <Bar dataKey="lowRisk" stackId="a" fill="#4BC0C0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
                    <span className="text-sm dark:text-gray-300">High Risk</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-yellow-500"></div>
                    <span className="text-sm dark:text-gray-300">Medium Risk</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                    <span className="text-sm dark:text-gray-300">Low Risk</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 
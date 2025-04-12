import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Users, User, BarChart2, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  metrics: {
    performance: number;
    attendance: number;
    engagement: number;
    communication: number;
    teamwork: number;
    riskScore: number;
  };
}

interface Department {
  id: string;
  name: string;
  employeeCount: number;
  metrics: {
    performance: number;
    attendance: number;
    engagement: number;
    communication: number;
    teamwork: number;
    riskScore: number;
  };
}

interface ComparisonToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({ isOpen, onClose }) => {
  const [comparisonType, setComparisonType] = useState<'departments' | 'employees'>('departments');
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample data - in a real app, this would come from your API
  const departments: Department[] = [
    {
      id: 'dept1',
      name: 'Engineering',
      employeeCount: 45,
      metrics: {
        performance: 0.85,
        attendance: 0.92,
        engagement: 0.78,
        communication: 0.65,
        teamwork: 0.88,
        riskScore: 0.42,
      },
    },
    {
      id: 'dept2',
      name: 'Sales',
      employeeCount: 32,
      metrics: {
        performance: 0.82,
        attendance: 0.88,
        engagement: 0.75,
        communication: 0.80,
        teamwork: 0.70,
        riskScore: 0.38,
      },
    },
    {
      id: 'dept3',
      name: 'Marketing',
      employeeCount: 18,
      metrics: {
        performance: 0.78,
        attendance: 0.95,
        engagement: 0.82,
        communication: 0.85,
        teamwork: 0.75,
        riskScore: 0.25,
      },
    },
    {
      id: 'dept4',
      name: 'HR',
      employeeCount: 12,
      metrics: {
        performance: 0.90,
        attendance: 0.98,
        engagement: 0.88,
        communication: 0.92,
        teamwork: 0.95,
        riskScore: 0.15,
      },
    },
  ];

  const employees: Employee[] = [
    {
      id: 'emp1',
      name: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      metrics: {
        performance: 0.92,
        attendance: 0.95,
        engagement: 0.88,
        communication: 0.75,
        teamwork: 0.90,
        riskScore: 0.18,
      },
    },
    {
      id: 'emp2',
      name: 'Jane Smith',
      department: 'Sales',
      position: 'Sales Manager',
      metrics: {
        performance: 0.85,
        attendance: 0.90,
        engagement: 0.82,
        communication: 0.88,
        teamwork: 0.85,
        riskScore: 0.25,
      },
    },
    {
      id: 'emp3',
      name: 'Robert Johnson',
      department: 'Marketing',
      position: 'Marketing Specialist',
      metrics: {
        performance: 0.78,
        attendance: 0.85,
        engagement: 0.75,
        communication: 0.80,
        teamwork: 0.70,
        riskScore: 0.35,
      },
    },
    {
      id: 'emp4',
      name: 'Emily Davis',
      department: 'HR',
      position: 'HR Coordinator',
      metrics: {
        performance: 0.88,
        attendance: 0.92,
        engagement: 0.85,
        communication: 0.90,
        teamwork: 0.88,
        riskScore: 0.22,
      },
    },
  ];

  const handleItemSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const getSelectedData = () => {
    if (comparisonType === 'departments') {
      return departments.filter(dept => selectedItems.includes(dept.id));
    } else {
      return employees.filter(emp => selectedItems.includes(emp.id));
    }
  };

  const formatRadarData = () => {
    const selectedData = getSelectedData();
    if (selectedData.length === 0) return [];

    const metrics = ['performance', 'attendance', 'engagement', 'communication', 'teamwork'];
    
    return metrics.map(metric => {
      const dataPoint: any = { metric };
      selectedData.forEach(item => {
        dataPoint[item.name || item.id] = item.metrics[metric as keyof typeof item.metrics] * 100;
      });
      return dataPoint;
    });
  };

  const formatBarData = () => {
    const selectedData = getSelectedData();
    if (selectedData.length === 0) return [];

    return selectedData.map(item => ({
      name: item.name || item.id,
      riskScore: item.metrics.riskScore * 100,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-4 top-20 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-40 flex flex-col max-h-[calc(100vh-6rem)]">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">Comparison Tool</h3>
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
                  comparisonType === 'departments'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setComparisonType('departments')}
              >
                <Users className="h-4 w-4 inline mr-1" />
                Departments
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  comparisonType === 'employees'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setComparisonType('employees')}
              >
                <User className="h-4 w-4 inline mr-1" />
                Employees
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2 dark:text-white">Select up to 3 {comparisonType === 'departments' ? 'departments' : 'employees'} to compare:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {(comparisonType === 'departments' ? departments : employees).map((item) => (
                <div 
                  key={item.id}
                  className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                    selectedItems.includes(item.id)
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleItemSelect(item.id)}
                >
                  <div className="flex items-center">
                    {comparisonType === 'departments' ? (
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                    ) : (
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                    )}
                    <span className="text-sm dark:text-gray-300">
                      {comparisonType === 'departments' 
                        ? `${item.name} (${(item as Department).employeeCount} employees)`
                        : `${(item as Employee).name} - ${(item as Employee).position}`}
                    </span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedItems.includes(item.id) ? 'bg-blue-500' : 'border border-gray-300'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {selectedItems.length > 0 ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Risk Score Comparison</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={formatBarData()}
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
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Metrics Comparison</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formatRadarData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        {getSelectedData().map((item, index) => (
                          <Radar
                            key={item.id}
                            name={item.name || item.id}
                            dataKey={item.name || item.id}
                            stroke={`hsl(${index * 120}, 70%, 50%)`}
                            fill={`hsl(${index * 120}, 70%, 50%)`}
                            fillOpacity={0.3}
                          />
                        ))}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ArrowRight className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select {comparisonType === 'departments' ? 'departments' : 'employees'} from the list above to compare their metrics
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 
import React, { useState, useEffect } from 'react';
import { Bell, History, X, Check, AlertTriangle, Calendar, RefreshCw, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'High Risk Employee Alert',
    message: 'Employee John Doe has been identified as high risk for turnover.',
    type: 'high_risk',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    user_id: 'user-1'
  },
  {
    id: '2',
    title: 'Performance Review Due',
    message: 'Performance review for the Engineering team is due in 3 days.',
    type: 'evaluation',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    user_id: 'user-1'
  },
  {
    id: '3',
    title: 'System Update',
    message: 'The system has been updated with new features for risk assessment.',
    type: 'system',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    user_id: 'user-1'
  }
];

// Mock audit logs
const mockAuditLogs = [
  {
    id: '1',
    action: 'login',
    details: 'User logged in from Chrome on Windows',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    user_id: 'user-1'
  },
  {
    id: '2',
    action: 'prediction',
    details: 'Generated retention prediction for 5 employees',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    user_id: 'user-1'
  },
  {
    id: '3',
    action: 'employee_edit',
    details: 'Updated employee record for Jane Smith',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    user_id: 'user-1'
  }
];

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, userId }) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'audit' | 'settings'>('notifications');
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [isLoadingAuditLogs, setIsLoadingAuditLogs] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const { 
    notifications, 
    auditLogs, 
    markAllAsRead 
  } = useNotifications();

  // Mark notifications as read when panel is opened
  useEffect(() => {
    if (isOpen) {
      markAllAsRead();
    }
  }, [isOpen, markAllAsRead]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'high_risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'evaluation':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <RefreshCw className="h-5 w-5 text-yellow-500" />;
      case 'retraining':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'logout':
        return <X className="h-4 w-4 text-gray-500" />;
      case 'prediction':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'employee_edit':
      case 'employee_add':
      case 'employee_delete':
        return <History className="h-4 w-4 text-yellow-500" />;
      case 'data_upload':
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className={`px-3 py-1 rounded-md ${
                activeTab === 'notifications'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                activeTab === 'audit'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('audit')}
            >
              <History className="h-5 w-5" />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'notifications' ? (
            isLoadingNotifications ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No notifications
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.is_read ? 'bg-white' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === 'audit' ? (
            isLoadingAuditLogs ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No audit logs
              </div>
            ) : (
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border bg-white"
                  >
                    <div className="flex items-start space-x-3">
                      {getActionIcon(log.action)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {log.action.replace('_', ' ').toUpperCase()}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {log.details}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {format(new Date(log.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-notifications">Sound Notifications</Label>
                  <Switch 
                    id="sound-notifications" 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Clear All Notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
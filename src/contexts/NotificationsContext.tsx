import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

// Notification types
export type NotificationType = 'high_risk' | 'evaluation' | 'system' | 'retraining' | 'info';

// Notification interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  user_id: string;
}

// Audit log interface
export interface AuditLog {
  id: string;
  action: string;
  details: string;
  created_at: string;
  user_id: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
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
const mockAuditLogs: AuditLog[] = [
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

type NotificationsContextType = {
  notifications: Notification[];
  auditLogs: AuditLog[];
  unreadCount: number;
  isNotificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'is_read' | 'user_id'>) => void;
  addAuditLog: (auditLog: Omit<AuditLog, 'id' | 'created_at' | 'user_id'>) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(n => !n.is_read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Play notification sound when new unread notifications are added
  useEffect(() => {
    if (unreadCount > 0 && !isNotificationsOpen) {
      // Play notification sound
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Error playing notification sound:', err));
    }
  }, [unreadCount, isNotificationsOpen]);

  const openNotifications = () => {
    setIsNotificationsOpen(true);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, is_read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at' | 'is_read' | 'user_id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      is_read: false,
      user_id: user?.id || 'user-1'
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      duration: 5000,
    });
  };

  const addAuditLog = (auditLog: Omit<AuditLog, 'id' | 'created_at' | 'user_id'>) => {
    const newAuditLog: AuditLog = {
      ...auditLog,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      user_id: user?.id || 'user-1'
    };

    setAuditLogs(prev => [newAuditLog, ...prev]);
  };

  const value = {
    notifications,
    auditLogs,
    unreadCount,
    isNotificationsOpen,
    openNotifications,
    closeNotifications,
    markAllAsRead,
    addNotification,
    addAuditLog
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
} 
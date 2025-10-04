import { supabase } from '@/integrations/supabase/client';
import { Notification, AuditLog } from '../types/database';

/**
 * Create a new notification
 */
export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: Notification['type'],
  employeeId?: string,
  link?: string
): Promise<Notification | null> {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title,
      message,
      type,
      employee_id: employeeId,
      link,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    return null;
  }

  return data;
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }

  return true;
}

/**
 * Create a new audit log entry
 */
export async function createAuditLog(
  userId: string,
  action: AuditLog['action'],
  details: string,
  employeeId?: string,
  metadata?: Record<string, any>
): Promise<AuditLog | null> {
  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      user_id: userId,
      action,
      details,
      employee_id: employeeId,
      metadata,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating audit log:', error);
    return null;
  }

  return data;
}

/**
 * Get unread notifications count for a user
 */
export async function getUnreadNotificationsCount(
  userId: string
): Promise<number> {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) {
    console.error('Error getting unread notifications count:', error);
    return 0;
  }

  return count || 0;
} 
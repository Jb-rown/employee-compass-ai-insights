# Notifications and Audit Logs

This document describes the notifications and audit logs functionality in the Employee Compass AI application.

## Overview

The application includes a comprehensive notification system and audit logging functionality to keep users informed about important events and track system activities.

## Components

### NotificationsPanel

The `NotificationsPanel` component provides a sliding panel interface for displaying both notifications and audit logs. It includes:

- A tabbed interface to switch between notifications and audit logs
- Visual indicators for different notification types
- Timestamps for all entries
- Loading states and empty states

### NotificationBadge

The `NotificationBadge` component displays a count of unread notifications in the header. It includes:

- A bell icon
- A badge showing the number of unread notifications
- Automatic refreshing of the count

## Database Tables

### Notifications Table

The `notifications` table stores user notifications with the following fields:

- `id`: UUID primary key
- `user_id`: UUID foreign key to auth.users
- `title`: Text title of the notification
- `message`: Text message content
- `type`: Text type of notification (high_risk, evaluation, system, retraining)
- `is_read`: Boolean indicating if the notification has been read
- `created_at`: Timestamp of when the notification was created
- `employee_id`: UUID foreign key to employees (optional)
- `link`: Text URL to navigate to (optional)

### Audit Logs Table

The `audit_logs` table stores system activity logs with the following fields:

- `id`: UUID primary key
- `user_id`: UUID foreign key to auth.users
- `action`: Text action type (login, logout, prediction, employee_edit, employee_add, employee_delete, data_upload)
- `details`: Text details about the action
- `created_at`: Timestamp of when the log was created
- `employee_id`: UUID foreign key to employees (optional)
- `metadata`: JSONB field for additional data (optional)

## Utility Functions

### Notifications

- `createNotification`: Creates a new notification
- `markNotificationAsRead`: Marks a notification as read
- `getUnreadNotificationsCount`: Gets the count of unread notifications for a user

### Audit Logs

- `createAuditLog`: Creates a new audit log entry

## Example Usage

```typescript
// Create a notification for a high-risk employee
await notifyHighRiskEmployee(
  userId,
  employeeId,
  'John Doe',
  0.85
);

// Create a notification for an upcoming evaluation
await notifyUpcomingEvaluation(
  userId,
  employeeId,
  'Jane Smith',
  new Date('2023-12-15')
);

// Create a notification for system maintenance
await notifySystemMaintenance(
  userId,
  new Date('2023-12-20'),
  '2 hours'
);
```

## Integration

To integrate the notifications functionality into your application:

1. Add the `NotificationBadge` component to your header
2. Add the `NotificationsPanel` component to your layout
3. Use the utility functions to create notifications and audit logs at appropriate points in your application

## Setup

1. Run the SQL script in `supabase/schema.sql` to create the necessary tables
2. Set up your Supabase environment variables in `.env.local`
3. Import and use the components and utility functions in your application 
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUnreadNotificationsCount } from '../lib/notifications';

interface NotificationBadgeProps {
  userId: string;
  onClick: () => void;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ userId, onClick }) => {
  const [count, setCount] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['unreadNotifications', userId],
    queryFn: () => getUnreadNotificationsCount(userId),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (data !== undefined) {
      setCount(data);
    }
  }, [data]);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      aria-label="Notifications"
    >
      <Bell className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}; 
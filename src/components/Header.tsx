import React, { useState } from 'react';
import { NotificationBadge } from './NotificationBadge';
import { NotificationsPanel } from './NotificationsPanel';

interface HeaderProps {
  userId: string;
}

export const Header: React.FC<HeaderProps> = ({ userId }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Employee Compass AI</h1>
            </div>
          </div>
          <div className="flex items-center">
            <NotificationBadge 
              userId={userId} 
              onClick={() => setIsNotificationsOpen(true)} 
            />
            {/* Add other header items here */}
          </div>
        </div>
      </div>
      
      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        userId={userId}
      />
    </header>
  );
}; 
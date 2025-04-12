import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatbotAssistant } from './ChatbotAssistant';

interface ChatbotButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  label = 'Chat with HR',
  position = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  return (
    <>
      <button
        type="button"
        className={getButtonClasses()}
        onClick={openChatbot}
        aria-label="Open HR chatbot"
      >
        <MessageSquare className={`mr-2 ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
        {label}
      </button>
      
      <ChatbotAssistant isOpen={isOpen} onClose={closeChatbot} />
    </>
  );
}; 
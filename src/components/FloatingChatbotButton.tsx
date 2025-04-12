import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { ChatbotAssistant } from './ChatbotAssistant';

interface FloatingChatbotButtonProps {
  position?: 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FloatingChatbotButton: React.FC<FloatingChatbotButtonProps> = ({
  position = 'bottom-right',
  size = 'md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  const getPositionClasses = () => {
    return position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-5 w-5';
      case 'lg':
        return 'h-8 w-8';
      default:
        return 'h-6 w-6';
    }
  };

  return (
    <>
      <button
        type="button"
        className={`fixed ${getPositionClasses()} ${getSizeClasses()} bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-all duration-200 ${className}`}
        onClick={openChatbot}
        aria-label="Open HR chatbot"
      >
        {isOpen ? (
          <X className={getIconSize()} />
        ) : (
          <MessageSquare className={getIconSize()} />
        )}
      </button>
      
      <ChatbotAssistant isOpen={isOpen} onClose={closeChatbot} />
    </>
  );
}; 
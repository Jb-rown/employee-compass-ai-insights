import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your HR assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call to get bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple response generator - in a real app, this would be an API call to an AI service
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I assist you with HR matters today?';
    }
    
    if (lowerMessage.includes('policy') || lowerMessage.includes('policies')) {
      return 'Our company policies can be found in the employee handbook. Would you like me to direct you to specific sections?';
    }
    
    if (lowerMessage.includes('leave') || lowerMessage.includes('vacation') || lowerMessage.includes('time off')) {
      return 'To request time off, please use the leave management system. You can access it from your employee dashboard.';
    }
    
    if (lowerMessage.includes('benefits') || lowerMessage.includes('insurance')) {
      return 'Our benefits package includes health insurance, dental coverage, and a 401(k) plan. You can review your options in the benefits portal.';
    }
    
    if (lowerMessage.includes('payroll') || lowerMessage.includes('salary') || lowerMessage.includes('payment')) {
      return 'Payroll is processed bi-weekly. You can view your payment history and download pay stubs from the payroll section of your employee portal.';
    }
    
    if (lowerMessage.includes('training') || lowerMessage.includes('development')) {
      return 'We offer various training programs and professional development opportunities. Check the learning management system for available courses.';
    }
    
    if (lowerMessage.includes('complaint') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
      return 'I\'m sorry to hear you\'re experiencing an issue. Please contact your HR representative directly for confidential assistance.';
    }
    
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }
    
    return 'I\'m not sure I understand. Could you please rephrase your question or contact HR directly for assistance?';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col max-h-[600px]">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">HR Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              <div className="flex items-start">
                {message.sender === 'bot' && (
                  <Bot className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <User className="h-5 w-5 ml-2 text-white flex-shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-500" />
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}; 
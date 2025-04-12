import React from 'react';
import { ChatbotButton } from './ChatbotButton';
import { FloatingChatbotButton } from './FloatingChatbotButton';

export const ChatbotExamples: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">HR Chatbot Examples</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          The HR chatbot provides instant answers to common HR questions. Try out the different button styles below.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
            <ChatbotButton variant="primary" label="Primary Button" />
            <ChatbotButton variant="secondary" label="Secondary Button" />
            <ChatbotButton variant="outline" label="Outline Button" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <ChatbotButton size="sm" label="Small" />
            <ChatbotButton size="md" label="Medium" />
            <ChatbotButton size="lg" label="Large" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Custom Styling</h3>
          <div className="flex flex-wrap gap-4">
            <ChatbotButton 
              className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500" 
              label="Custom Color" 
            />
            <ChatbotButton 
              className="rounded-full" 
              label="Rounded Button" 
            />
            <ChatbotButton 
              className="shadow-lg" 
              label="With Shadow" 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Floating Chatbot</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The floating chatbot button can be placed anywhere in your application and will always be accessible.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bottom Right (Default)</p>
              <FloatingChatbotButton position="bottom-right" />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bottom Left</p>
              <FloatingChatbotButton position="bottom-left" />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Small Size</p>
              <FloatingChatbotButton size="sm" />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Large Size</p>
              <FloatingChatbotButton size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
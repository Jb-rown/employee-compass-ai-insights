import React from 'react';
import { ComparisonButton } from './ComparisonButton';

export const ComparisonButtonExample: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Comparison Tool Examples</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          The comparison tool allows you to compare departments or employees using various metrics.
          Click on any of the buttons below to open the tool.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
            <ComparisonButton variant="primary" label="Primary Button" />
            <ComparisonButton variant="secondary" label="Secondary Button" />
            <ComparisonButton variant="outline" label="Outline Button" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <ComparisonButton size="sm" label="Small" />
            <ComparisonButton size="md" label="Medium" />
            <ComparisonButton size="lg" label="Large" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Custom Styling</h3>
          <div className="flex flex-wrap gap-4">
            <ComparisonButton 
              className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500" 
              label="Custom Color" 
            />
            <ComparisonButton 
              className="rounded-full" 
              label="Rounded Button" 
            />
            <ComparisonButton 
              className="shadow-lg" 
              label="With Shadow" 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Icon Only</h3>
          <div className="flex flex-wrap gap-4">
            <ComparisonButton 
              className="rounded-full p-2" 
              label="" 
              aria-label="Compare data"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 
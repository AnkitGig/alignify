
import React from 'react';
import { BarChartStyleTemplate } from './BarChartStyleTemplate';

interface BarChartTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function BarChartTemplates({ selectedTemplate, onSelectTemplate }: BarChartTemplatesProps) {
  const templates = [
    {
      id: 'bar',
      name: 'Default',
      description: 'Simple bar chart',
      display: (
        <div className="p-3 border rounded-lg bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Jan 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '40%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Feb 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '60%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Mar 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '25%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Apr 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'dropdown-bar',
      name: 'Dropdown-Bar',
      description: 'Bar chart with dropdown controls',
      display: (
        <div className="p-3 border rounded-lg bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="flex justify-end mb-2">
            <div className="text-xs border px-2 py-1 rounded flex items-center text-gray-600">
              Title 1 ▼
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Jan 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '40%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Feb 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'kpi-bar',
      name: 'KPI-Bar',
      description: 'Bar chart with KPI indicators',
      display: (
        <div className="p-3 border rounded-lg bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="flex items-center mb-2 text-xs">
            <span className="text-blue-600 mr-1">●</span>
            <span className="text-gray-700">Metric 1</span>
            <span className="ml-2 text-gray-700">1234 | 12% </span>
            <span className="text-green-600">▲</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Jan 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '40%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Feb 22</div>
              <div className="bg-indigo-600 h-3 rounded" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'multi-bar',
      name: 'Multi-Bar',
      description: 'Multiple series bar chart',
      display: (
        <div className="p-3 border rounded-lg bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="flex items-center mb-2 text-xs">
            <span className="text-emerald-600 mr-1">●</span>
            <span className="text-gray-700 mr-3">Dataset 1</span>
            <span className="text-emerald-400 mr-1">●</span>
            <span className="text-gray-700">Dataset 2</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Jan 22</div>
              <div className="flex space-x-1">
                <div className="bg-emerald-600 h-3 rounded" style={{ width: '20px' }}></div>
                <div className="bg-emerald-400 h-3 rounded" style={{ width: '25px' }}></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Feb 22</div>
              <div className="flex space-x-1">
                <div className="bg-emerald-600 h-3 rounded" style={{ width: '30px' }}></div>
                <div className="bg-emerald-400 h-3 rounded" style={{ width: '20px' }}></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'stacked-bar',
      name: 'Stacked-Bar',
      description: 'Stacked bar chart',
      display: (
        <div className="p-3 border rounded-lg bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="flex items-center mb-2 text-xs">
            <span className="text-amber-600 mr-1">●</span>
            <span className="text-gray-700 mr-2">Dataset 1</span>
            <span className="text-amber-400 mr-1">●</span>
            <span className="text-gray-700 mr-2">Dataset 2</span>
            <span className="text-amber-300 mr-1">●</span>
            <span className="text-gray-700">Dataset 3</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Jan 22</div>
              <div className="flex">
                <div className="bg-amber-600 h-3" style={{ width: '15px' }}></div>
                <div className="bg-amber-400 h-3" style={{ width: '15px' }}></div>
                <div className="bg-amber-300 h-3 rounded-r" style={{ width: '15px' }}></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 w-12">Feb 22</div>
              <div className="flex">
                <div className="bg-amber-600 h-3" style={{ width: '20px' }}></div>
                <div className="bg-amber-400 h-3" style={{ width: '20px' }}></div>
                <div className="bg-amber-300 h-3 rounded-r" style={{ width: '20px' }}></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0">Available styles</span>
        <span className="text-sm text-blue-600">Default</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <BarChartStyleTemplate
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>
    </div>
  );
}

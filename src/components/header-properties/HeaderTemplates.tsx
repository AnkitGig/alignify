
import React from 'react';

// These are the template displays that will be used in the HeaderStyleDialog
export const headerTemplateDisplays = [
  {
    id: 'default',
    name: 'Default',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center">
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
          <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
        </div>
      </div>
    )
  },
  {
    id: 'centered-navigation-purple',
    name: 'Centered Navigation (Purple)',
    preview: (
      <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
        <div className="flex flex-col items-center">
          <div className="font-bold text-xs text-center mt-1">DASHBOARD TITLE</div>
          <div className="flex justify-center space-x-6 mt-1">
            <div className="text-[8px]">Navigation 1</div>
            <div className="text-[8px]">Navigation 2</div>
            <div className="text-[8px]">Navigation 3</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'navigation-buttons',
    name: 'Navigation Buttons',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="flex space-x-2">
            <div className="px-2 py-1 bg-blue-500 text-white text-[8px] rounded">Navigation 1</div>
            <div className="px-2 py-1 bg-gray-200 text-[8px] rounded">Navigation 2</div>
            <div className="px-2 py-1 bg-gray-200 text-[8px] rounded">Navigation 3</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'minimal-title',
    name: 'Minimal Title',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center">
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
          <div className="font-bold ml-4 text-xs flex items-center">
            <span className="mr-2">📊</span>
            DASHBOARD TITLE
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'with-description',
    name: 'With Description',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="ml-4">
              <div className="font-bold text-xs">DASHBOARD TITLE</div>
              <div className="text-[8px] text-gray-500 mt-1">Some dummy description text</div>
            </div>
          </div>
          <div className="bg-blue-600 text-white text-[8px] px-2 py-1 rounded">
            Data Last Updated on | 1st Jan 2024
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'with-metrics',
    name: 'With Metrics',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="flex space-x-4">
            <div className="text-[8px] text-center">
              <div className="text-gray-500">Title 1</div>
              <div className="font-bold">Metric 1</div>
            </div>
            <div className="text-[8px] text-center">
              <div className="text-gray-500">Title 2</div>
              <div className="font-bold">Metric 1</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'simple-header',
    name: 'Simple Header',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center">
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
          <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
        </div>
      </div>
    )
  }
];

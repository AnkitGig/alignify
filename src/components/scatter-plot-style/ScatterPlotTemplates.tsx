
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const sampleData = [
  { name: 'A', x: 25, y: 35 },
  { name: 'B', x: 45, y: 55 },
  { name: 'C', x: 65, y: 30 },
  { name: 'D', x: 75, y: 70 }
];

export const scatterPlotTemplateDisplays = [
  {
    id: 'default',
    name: 'Default',
    primaryColor: '#3B82F6',
    secondaryColor: '#EFF6FF',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Scatter Plot</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <Scatter data={sampleData} fill="#3B82F6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  },
  {
    id: 'correlation-analysis',
    name: 'Correlation Analysis',
    primaryColor: '#10B981',
    secondaryColor: '#ECFDF5',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-1">Correlation Analysis</div>
        <div className="text-xs text-gray-500 mb-2">R = 0.75</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <ReferenceLine segment={[{x: 20, y: 25}, {x: 80, y: 75}]} stroke="#10B981" strokeDasharray="3 3" />
            <Scatter data={sampleData} fill="#10B981" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  },
  {
    id: 'performance-comparison',
    name: 'Performance Comparison',
    primaryColor: '#F59E0B',
    secondaryColor: '#FFFBEB',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Performance vs Quality</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <Scatter data={sampleData} fill="#F59E0B" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
          <div className="text-center p-1 bg-amber-50 rounded text-amber-700">Performance</div>
          <div className="text-center p-1 bg-amber-50 rounded text-amber-700">Quality</div>
        </div>
      </div>
    )
  },
  {
    id: 'trend-analysis',
    name: 'Trend Analysis',
    primaryColor: '#EF4444',
    secondaryColor: '#FEF2F2',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Trend Analysis</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <ReferenceLine segment={[{x: 20, y: 30}, {x: 80, y: 70}]} stroke="#EF4444" strokeDasharray="2 2" />
            <Scatter data={sampleData} fill="#EF4444" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="text-center mt-1 text-xs bg-red-50 rounded p-1 text-red-700">
          Upward Trend
        </div>
      </div>
    )
  }
];

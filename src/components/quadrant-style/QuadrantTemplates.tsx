
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const sampleData = [
  { name: 'A', x: 1.5, y: 3.5 },
  { name: 'B', x: 3.5, y: 1.5 },
  { name: 'C', x: 1, y: 2 },
  { name: 'D', x: 4, y: 4 }
];

export const quadrantTemplateDisplays = [
  {
    id: 'default',
    name: 'Default',
    primaryColor: '#3B82F6',
    secondaryColor: '#EFF6FF',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Title goes here</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 5]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 5]} hide />
            <ReferenceLine x={2.5} stroke="#666" strokeDasharray="2 2" />
            <ReferenceLine y={2.5} stroke="#666" strokeDasharray="2 2" />
            <Scatter data={sampleData} fill="#3B82F6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  },
  {
    id: 'priority-matrix',
    name: 'Priority Matrix',
    primaryColor: '#10B981',
    secondaryColor: '#ECFDF5',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Priority Matrix</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 5]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 5]} hide />
            <ReferenceLine x={2.5} stroke="#10B981" strokeDasharray="2 2" />
            <ReferenceLine y={2.5} stroke="#10B981" strokeDasharray="2 2" />
            <Scatter data={sampleData} fill="#10B981" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
          <div className="text-center p-1 bg-green-50 rounded text-green-700">High Impact</div>
          <div className="text-center p-1 bg-green-50 rounded text-green-700">Low Effort</div>
        </div>
      </div>
    )
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    primaryColor: '#EF4444',
    secondaryColor: '#FEF2F2',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Risk Assessment</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 5]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 5]} hide />
            <ReferenceLine x={2.5} stroke="#EF4444" strokeDasharray="2 2" />
            <ReferenceLine y={2.5} stroke="#EF4444" strokeDasharray="2 2" />
            <Scatter data={sampleData} fill="#EF4444" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
          <div className="text-center p-1 bg-red-50 rounded text-red-700">Probability</div>
          <div className="text-center p-1 bg-red-50 rounded text-red-700">Impact</div>
        </div>
      </div>
    )
  },
  {
    id: 'performance-potential',
    name: 'Performance-Potential',
    primaryColor: '#F59E0B',
    secondaryColor: '#FFFBEB',
    display: (
      <div className="border rounded-md p-3 bg-white">
        <div className="text-sm font-medium mb-2">Performance Matrix</div>
        <ResponsiveContainer width="100%" height={120}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" dataKey="x" domain={[0, 5]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 5]} hide />
            <ReferenceLine x={2.5} stroke="#F59E0B" strokeDasharray="2 2" />
            <ReferenceLine y={2.5} stroke="#F59E0B" strokeDasharray="2 2" />
            <Scatter data={sampleData} fill="#F59E0B" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
          <div className="text-center p-1 bg-amber-50 rounded text-amber-700">Performance</div>
          <div className="text-center p-1 bg-amber-50 rounded text-amber-700">Potential</div>
        </div>
      </div>
    )
  }
];

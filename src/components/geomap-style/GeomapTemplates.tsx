
import React from 'react';
import { GeomapStyleTemplate } from './GeomapStyleTemplate';
import { Globe, Map, Circle, Zap } from 'lucide-react';

interface GeomapTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function GeomapTemplates({ selectedTemplate, onSelectTemplate }: GeomapTemplatesProps) {
  const templates = [
    {
      id: 'default',
      name: 'Standard Map',
      primaryColor: '#3B82F6',
      secondaryColor: '#EFF6FF',
      display: (
        <div className="h-24 bg-blue-50 border rounded relative overflow-hidden">
          <div className="absolute inset-2 border border-blue-200 rounded bg-blue-25">
            <Globe className="w-4 h-4 text-blue-600 absolute top-1 left-1" />
            <div className="absolute bottom-1 left-1 text-xs text-blue-600">Legend</div>
          </div>
        </div>
      ),
    },
    {
      id: 'choropleth',
      name: 'Choropleth Map',
      primaryColor: '#059669',
      secondaryColor: '#D1FAE5',
      display: (
        <div className="h-24 bg-green-50 border rounded relative overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 h-full gap-1 p-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="rounded border border-green-200"
                style={{
                  backgroundColor: '#059669',
                  opacity: (i + 1) / 6
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'bubble-map',
      name: 'Bubble Map',
      primaryColor: '#DC2626',
      secondaryColor: '#FEE2E2',
      display: (
        <div className="h-24 bg-red-50 border rounded relative overflow-hidden">
          <div className="absolute inset-2 bg-red-25 rounded">
            {Array.from({ length: 5 }, (_, i) => (
              <Circle
                key={i}
                className="absolute text-red-600"
                style={{
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`
                }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'heat-intensity',
      name: 'Heat Intensity',
      primaryColor: '#7C3AED',
      secondaryColor: '#EDE9FE',
      display: (
        <div className="h-24 bg-purple-900 border rounded relative overflow-hidden">
          <div className="grid grid-cols-4 grid-rows-3 h-full gap-1 p-1">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  background: `linear-gradient(45deg, #7C3AED${Math.floor((i / 12) * 255).toString(16).padStart(2, '0')}, #EDE9FE)`
                }}
              />
            ))}
          </div>
          <Zap className="w-3 h-3 text-purple-300 absolute top-1 right-1" />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {templates.map((template) => (
        <GeomapStyleTemplate
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
}

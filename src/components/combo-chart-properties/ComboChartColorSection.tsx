
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ComboChartColorSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartColorSection({ element, updateElementProperties }: ComboChartColorSectionProps) {
  const handleColorChange = (property: string, value: string) => {
    updateElementProperties(element.id, { [property]: value });
  };

  const addColorPalette = () => {
    const currentPalettes = element.properties?.colorPalettes || [];
    const newPalette = {
      id: Date.now().toString(),
      name: `Palette ${currentPalettes.length + 1}`,
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    };
    updateElementProperties(element.id, { 
      colorPalettes: [...currentPalettes, newPalette] 
    });
  };

  const removeColorPalette = (paletteId: string) => {
    const currentPalettes = element.properties?.colorPalettes || [];
    updateElementProperties(element.id, { 
      colorPalettes: currentPalettes.filter(p => p.id !== paletteId) 
    });
  };

  const updatePaletteColor = (paletteId: string, colorIndex: number, color: string) => {
    const currentPalettes = element.properties?.colorPalettes || [];
    const updatedPalettes = currentPalettes.map(palette => {
      if (palette.id === paletteId) {
        const newColors = [...palette.colors];
        newColors[colorIndex] = color;
        return { ...palette, colors: newColors };
      }
      return palette;
    });
    updateElementProperties(element.id, { colorPalettes: updatedPalettes });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Color Customization</h4>
      
      <div className="space-y-4">
        {/* Primary Colors */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Primary Colors</h5>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="bar-color" className="text-xs text-gray-600">Bar Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="bar-color"
                  type="color"
                  value={element.properties?.barColor || '#3b82f6'}
                  onChange={(e) => handleColorChange('barColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.barColor || '#3b82f6'}
                  onChange={(e) => handleColorChange('barColor', e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="line-color" className="text-xs text-gray-600">Line Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="line-color"
                  type="color"
                  value={element.properties?.lineColor || '#10b981'}
                  onChange={(e) => handleColorChange('lineColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.lineColor || '#10b981'}
                  onChange={(e) => handleColorChange('lineColor', e.target.value)}
                  placeholder="#10b981"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="secondary-bar-color" className="text-xs text-gray-600">Secondary Bar</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="secondary-bar-color"
                  type="color"
                  value={element.properties?.secondaryBarColor || '#f59e0b'}
                  onChange={(e) => handleColorChange('secondaryBarColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.secondaryBarColor || '#f59e0b'}
                  onChange={(e) => handleColorChange('secondaryBarColor', e.target.value)}
                  placeholder="#f59e0b"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tertiary-bar-color" className="text-xs text-gray-600">Tertiary Bar</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="tertiary-bar-color"
                  type="color"
                  value={element.properties?.tertiaryBarColor || '#ef4444'}
                  onChange={(e) => handleColorChange('tertiaryBarColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.tertiaryBarColor || '#ef4444'}
                  onChange={(e) => handleColorChange('tertiaryBarColor', e.target.value)}
                  placeholder="#ef4444"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Colors */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Background Colors</h5>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="chart-bg" className="text-xs text-gray-600">Chart Background</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="chart-bg"
                  type="color"
                  value={element.properties?.chartBackground || '#ffffff'}
                  onChange={(e) => handleColorChange('chartBackground', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.chartBackground || '#ffffff'}
                  onChange={(e) => handleColorChange('chartBackground', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="plot-bg" className="text-xs text-gray-600">Plot Background</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="plot-bg"
                  type="color"
                  value={element.properties?.plotBackground || '#f8fafc'}
                  onChange={(e) => handleColorChange('plotBackground', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={element.properties?.plotBackground || '#f8fafc'}
                  onChange={(e) => handleColorChange('plotBackground', e.target.value)}
                  placeholder="#f8fafc"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palettes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-medium text-gray-600">Color Palettes</h5>
            <Button
              onClick={addColorPalette}
              size="sm"
              variant="outline"
              className="h-6 px-2"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          {(element.properties?.colorPalettes || []).map((palette: any, paletteIndex: number) => (
            <div key={palette.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{palette.name}</span>
                <Button
                  onClick={() => removeColorPalette(palette.id)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {palette.colors.map((color: string, colorIndex: number) => (
                  <Input
                    key={colorIndex}
                    type="color"
                    value={color}
                    onChange={(e) => updatePaletteColor(palette.id, colorIndex, e.target.value)}
                    className="w-full h-8 p-1 border rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

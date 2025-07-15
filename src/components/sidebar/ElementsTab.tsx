import { useState } from "react";
import { ElementType } from "@/hooks/useWireframe";
import { SidebarCategoryFilter } from "./SidebarCategoryFilter";
import { ComponentGrid } from "./ComponentGrid";

export function ElementsTab() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'charts' | 'tables' | 'basic' | 'tools'>('all');
  
  const components: { type: ElementType; label: string; category: 'basic' | 'charts' | 'tables' | 'other' | 'tools' }[] = [
    // Basic elements
    { type: 'header', label: 'Header', category: 'basic' },
    { type: 'filter', label: 'Filter', category: 'basic' },
    { type: 'kpi', label: 'KPIs', category: 'basic' },
    { type: 'button', label: 'Button', category: 'basic' },
    { type: 'textbox', label: 'Text Box', category: 'basic' },
    { type: 'image', label: 'Image', category: 'basic' },
    { type: 'shapes', label: 'Shapes', category: 'basic' },
    
    // Chart elements
    { type: 'column-chart', label: 'Column Chart', category: 'charts' },
    { type: 'bar-chart', label: 'Bar Chart', category: 'charts' },
    { type: 'line-chart', label: 'Line Chart', category: 'charts' },
    // { type: 'area-chart', label: 'Area Chart', category: 'charts' },
    { type: 'combo-chart', label: 'Combo Chart', category: 'charts' },
    { type: 'pie-chart', label: 'Pie Chart', category: 'charts' },
    { type: 'histogram', label: 'Histogram', category: 'charts' },
    { type: 'scatter-plot', label: 'Scatter Plot', category: 'charts' },
    { type: 'waterfall', label: 'Waterfall', category: 'charts' },
    { type: 'quadrant-chart', label: 'Quadrant Chart', category: 'charts' },
    
    // Table elements
    { type: 'simple-table', label: 'Simple Table', category: 'tables' },
    
    // Other visualizations
    { type: 'treemap', label: 'Treemap', category: 'other' },
    { type: 'heatmap', label: 'Heatmap', category: 'other' },
  ];
  
  // Filter components based on category
  const filteredComponents = components.filter(component => 
    categoryFilter === 'all' || component.category === categoryFilter
  );

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input
            className="w-full px-3 py-2 border rounded-md text-sm"
            placeholder="Find any element"
          />
        </div>
      </div>
      
      <SidebarCategoryFilter 
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      
      <ComponentGrid components={filteredComponents} />
    </div>
  );
}

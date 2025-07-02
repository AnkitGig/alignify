
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CategoryType = 'all' | 'basic' | 'charts' | 'tables' | 'tools';

interface SidebarCategoryFilterProps {
  categoryFilter: CategoryType;
  setCategoryFilter: (category: CategoryType) => void;
}

export function SidebarCategoryFilter({ 
  categoryFilter, 
  setCategoryFilter 
}: SidebarCategoryFilterProps) {
  return (
    <div className="flex mb-4 flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "text-xs h-8",
          categoryFilter === 'all' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
        )}
        onClick={() => setCategoryFilter('all')}
      >
        All
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "text-xs h-8",
          categoryFilter === 'basic' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
        )}
        onClick={() => setCategoryFilter('basic')}
      >
        Basic
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "text-xs h-8",
          categoryFilter === 'charts' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
        )}
        onClick={() => setCategoryFilter('charts')}
      >
        Charts
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "text-xs h-8",
          categoryFilter === 'tables' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
        )}
        onClick={() => setCategoryFilter('tables')}
      >
        Tables
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "text-xs h-8",
          categoryFilter === 'tools' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
        )}
        onClick={() => setCategoryFilter('tools')}
      >
        Tools
      </Button>
    </div>
  );
}

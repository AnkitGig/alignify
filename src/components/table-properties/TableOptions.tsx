
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table2 } from "lucide-react";

interface TableOptionsProps {
  showTableBorder: boolean;
  onBorderToggle: (checked: boolean) => void;
  onOpenStyleDialog: () => void;
}

export function TableOptions({ 
  showTableBorder, 
  onBorderToggle, 
  onOpenStyleDialog 
}: TableOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="showTableBorder"
          checked={showTableBorder}
          onCheckedChange={onBorderToggle}
        />
        <Label htmlFor="showTableBorder">Show Table Border</Label>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={onOpenStyleDialog}
      >
        <Table2 className="h-4 w-4 mr-2" />
        Table Style Options
      </Button>
    </div>
  );
}

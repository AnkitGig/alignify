
import React from 'react';
import { Input } from "@/components/ui/input";

interface ColorInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorInput({ id, value, onChange, label }: ColorInputProps) {
  return (
    <div className="flex mt-2">
      <input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 cursor-pointer"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
        aria-label={label || id}
      />
    </div>
  );
}

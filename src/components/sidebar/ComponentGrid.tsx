
import { ElementType } from "@/hooks/useWireframe";
import { ComponentItem } from "@/components/ComponentItem";

interface ComponentGridProps {
  components: { type: ElementType; label: string; category: 'basic' | 'charts' | 'tables' | 'other' | 'tools' }[];
}

export function ComponentGrid({ components }: ComponentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {components.map((component) => (
        <ComponentItem
          key={component.type}
          label={component.label}
          type={component.type}
        />
      ))}
    </div>
  );
}

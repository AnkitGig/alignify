import { ElementType } from "@/hooks/useWireframe";
import { useDrag } from "react-dnd";

interface ComponentItemProps {
  label: string;
  type: ElementType;
}

export function ComponentItem({ label, type }: ComponentItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [type]);

  return (
    <div
      ref={drag}
      className={`aspect-w-5 aspect-h-3 bg-gray-50 border rounded-md flex flex-col items-center justify-center cursor-grab hover:border-blue-500 hover:shadow-sm transition-all ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="p-2 text-center">
        <div className="mb-1 flex justify-center">
          <ComponentIcon type={type} />
        </div>
        <div className="text-xs text-gray-600">{label}</div>
      </div>
    </div>
  );
}

function ComponentIcon({ type }: { type: ElementType }) {
  switch (type) {
    case 'header':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'button':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'filter':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'kpi':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 14l2-3 3 3 5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'column-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="5" y="10" width="3" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10.5" y="6" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="13" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="5" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="10.5" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="16" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'line-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 12L8 9 13 15 21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'area-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 12L8 9 13 15 21 6V18H3V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'combo-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="5" y="12" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="8" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="15" y="14" width="3" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 10L11.5 6L16.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="10" r="2" fill="currentColor" />
          <circle cx="11.5" cy="6" r="2" fill="currentColor" />
          <circle cx="16.5" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'pie-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3V12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'simple-table':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 13H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 5V19" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 5V19" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'hierarchy-table':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 4V20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 16H21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'textbox':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10H17" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 14H14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'image':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M6 16l3-3 2 2 5-5 3 3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}


import { cn } from "@/lib/utils";
import { SidebarTabs } from "./SidebarTabs";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-white flex flex-col h-full", className)}>
      <SidebarTabs />
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface TabItem {
  label: string;
  value: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface InfoTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

export default function InfoTabs({ tabs, defaultValue, className = "" }: InfoTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0].value} className={`space-y-4 ${className}`}>
      <TabsList className={`grid w-full ${`grid-cols-${tabs.length}` as any}`}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

import { type ReactNode, useMemo, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  const active = useMemo(() => tabs.find((tab) => tab.id === activeId) ?? tabs[0], [activeId, tabs]);

  return (
    <div className="space-y-8">
      <div className="surface-glass flex flex-wrap gap-3 rounded-full p-2">
        {tabs.map((tab) => {
          const activeTab = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                activeTab
                  ? "bg-[var(--accent-soft)] text-[var(--page-bg)] shadow-[0_12px_32px_rgba(255,255,255,0.16)]"
                  : "text-[var(--text-soft)] hover:bg-white/6 hover:text-[var(--accent-soft)]"
              }`}
              type="button"
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>{active?.content}</div>
    </div>
  );
}

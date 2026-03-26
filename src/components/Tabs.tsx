import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: string;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

  return (
    <div className="card-surface p-4 sm:p-6">
      <div aria-label="Документы NIVIM" className="mb-5 flex flex-wrap gap-2" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isActive}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                  : "border border-white/10 bg-white/5 text-[var(--color-text-muted)] hover:border-white/20 hover:text-[var(--color-text)]"
              }`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <section
            key={tab.id}
            aria-labelledby={`tab-${tab.id}`}
            className={`rich-copy ${isActive ? "block" : "hidden"}`}
            dangerouslySetInnerHTML={{ __html: tab.content }}
            id={`panel-${tab.id}`}
            role="tabpanel"
          />
        );
      })}
    </div>
  );
}

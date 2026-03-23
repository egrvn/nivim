import { useId, useRef, useState } from "react";

export function Tabs({ tabs }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const rootId = useId();
  const tabRefs = useRef({});

  function moveFocus(nextIndex) {
    const nextTab = tabs[nextIndex];

    if (!nextTab) {
      return;
    }

    setActiveTabId(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  return (
    <div className="space-y-6">
      <div aria-label="Документы" className="tab-list" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === activeTabId;
          const tabId = `${rootId}-${tab.id}-tab`;
          const panelId = `${rootId}-${tab.id}-panel`;

          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={`tab-list__button ${selected ? "tab-list__button--active" : ""}`}
              id={tabId}
              key={tab.id}
              onKeyDown={(event) => {
                const currentIndex = tabs.findIndex((item) => item.id === tab.id);

                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveFocus((currentIndex + 1) % tabs.length);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveFocus((currentIndex - 1 + tabs.length) % tabs.length);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  moveFocus(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  moveFocus(tabs.length - 1);
                }
              }}
              onClick={() => setActiveTabId(tab.id)}
              ref={(node) => {
                if (node) {
                  tabRefs.current[tab.id] = node;
                }
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const selected = tab.id === activeTabId;
        const tabId = `${rootId}-${tab.id}-tab`;
        const panelId = `${rootId}-${tab.id}-panel`;

        return (
          <section
            aria-labelledby={tabId}
            className={`${selected ? "block" : "hidden"}`}
            id={panelId}
            key={tab.id}
            role="tabpanel"
          >
            <div className="document-card">
              <div className="space-y-4">
                {tab.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="document-card__paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

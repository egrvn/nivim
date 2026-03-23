import { useState } from "react";

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="faq-card">
            <button
              aria-controls={`faq-panel-${index}`}
              aria-expanded={isOpen}
              className="faq-card__trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span className={`faq-card__marker ${isOpen ? "faq-card__marker--open" : ""}`}>+</span>
            </button>
            <div
              className={`faq-card__panel ${isOpen ? "faq-card__panel--open" : ""}`}
              id={`faq-panel-${index}`}
              role="region"
            >
              <p className="faq-card__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

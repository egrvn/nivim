import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { FaqItem } from "../content/site";

type AccordionProps = {
  items: FaqItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div key={item.question} className="surface-glass overflow-hidden rounded-[28px]">
            <button
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[var(--accent-soft)] transition-colors duration-200 hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:px-8"
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <span className="text-base font-semibold tracking-[-0.02em] sm:text-[1.15rem]">{item.question}</span>
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(227,239,239,0.1)] bg-[rgba(227,239,239,0.04)] text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="border-t border-white/6 px-6 pb-6 pt-5 text-sm leading-7 text-[var(--text-soft)] sm:px-8 sm:text-base">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

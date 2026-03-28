import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { catalog, type CatalogItem } from "../content/cart";

export type CartItem = {
  itemId: string;
  quantity: number;
};

export type CartLine = {
  item: CatalogItem;
  quantity: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (itemId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "nivim-cart";

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CartItem => typeof item?.itemId === "string" && Number.isFinite(item?.quantity))
      .map((item) => ({
        itemId: item.itemId,
        quantity: Math.max(1, Math.min(99, Math.round(item.quantity))),
      }))
      .filter((item) => catalog.some((product) => product.id === item.itemId));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const lines = items
      .map((cartItem) => {
        const item = catalog.find((product) => product.id === cartItem.itemId);

        if (!item) {
          return null;
        }

        return {
          item,
          quantity: cartItem.quantity,
          lineTotal: item.price * cartItem.quantity,
        };
      })
      .filter((line): line is CartLine => Boolean(line));

    return {
      items,
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      addItem: (itemId, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((item) => item.itemId === itemId);

          if (existing) {
            return current.map((item) =>
              item.itemId === itemId ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item,
            );
          }

          return [...current, { itemId, quantity: Math.max(1, Math.min(99, quantity)) }];
        });
      },
      removeItem: (itemId) => setItems((current) => current.filter((item) => item.itemId !== itemId)),
      setQuantity: (itemId, quantity) => {
        const nextQuantity = Math.max(1, Math.min(99, Math.round(quantity)));
        setItems((current) => current.map((item) => (item.itemId === itemId ? { ...item, quantity: nextQuantity } : item)));
      },
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

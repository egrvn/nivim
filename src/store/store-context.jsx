import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { products, promoCodes } from "../data/site-data";

const CART_KEY = "nivim-cart";
const ORDERS_KEY = "nivim-orders";
const LEADS_KEY = "nivim-leads";

const StoreContext = createContext(null);

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const formatPrice = (value) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_KEY, []));
  const [leads, setLeads] = useState(() => readStorage(LEADS_KEY, []));

  useEffect(() => {
    writeStorage(CART_KEY, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(ORDERS_KEY, orders);
  }, [orders]);

  useEffect(() => {
    writeStorage(LEADS_KEY, leads);
  }, [leads]);

  const detailedCart = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          return {
            ...item,
            product,
            total: product.price * item.quantity,
          };
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => detailedCart.reduce((sum, item) => sum + item.total, 0),
    [detailedCart]
  );

  const addToCart = (productId, quantity = 1) => {
    setCart((current) => {
      const nextQuantity = Number(quantity) || 1;
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + nextQuantity }
            : item
        );
      }

      return [...current, { productId, quantity: nextQuantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    const nextQuantity = Math.max(0, Number(quantity) || 0);
    setCart((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code, localSubtotal = subtotal) => {
    const promo = promoCodes[code?.trim().toUpperCase()];
    if (!promo || promo.type !== "percent") {
      return { valid: false, discount: 0, title: "" };
    }

    return {
      valid: true,
      discount: Math.round((localSubtotal * promo.value) / 100),
      title: promo.title,
    };
  };

  const createOrder = (payload) => {
    const order = {
      id: `NIV-${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString(),
      items: detailedCart,
      payload,
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    return order;
  };

  const saveLead = (payload) => {
    setLeads((current) => [payload, ...current]);
  };

  const value = {
    products,
    cart,
    orders,
    leads,
    detailedCart,
    cartCount,
    subtotal,
    formatPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromo,
    createOrder,
    saveLead,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type CartContextType = {
  cartCount: number;
  addToCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const stored = localStorage.getItem("cartCount");
    return stored ? parseInt(stored) : 0;
  });

  const addToCart = () => {
    setCartCount((prev) => {
      const updated = prev + 1;
      localStorage.setItem("cartCount", updated.toString());
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

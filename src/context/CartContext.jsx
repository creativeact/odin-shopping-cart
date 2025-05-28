import { createContext, useState, useEffect } from "react";

const CartContext = createContext({
  items: [],
  itemCount: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);

    const price = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    setTotalPrice(price);

    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    // Don't allow negative quantities
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const cartContextValue = {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };

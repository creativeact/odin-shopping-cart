import { useState } from 'react';
import { CartContext } from '../context/CartContext';

function MockCartProvider({ children, initialItems = [] }) {
    const [items, setItems] = useState(initialItems);

    const updateQuantity = (productId, newQuantity) => {
    setItems((prevItems) =>
        prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
        )
    );
    };

    const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    );

    return (
        <CartContext.Provider
            value={{
            items,
            itemCount,
            totalPrice,
            updateQuantity,
            removeFromCart,
            }}
        >
        {children}
        </CartContext.Provider>
    );
}

export { MockCartProvider }
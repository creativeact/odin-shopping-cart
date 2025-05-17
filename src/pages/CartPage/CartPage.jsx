import { Trash } from 'lucide-react';
import { useContext } from 'react';
import styles from './CartPage.module.css';
import { CartContext } from '../../context/CartContext.jsx';
import { displayTotalPrice } from '../../utils/displayTotalPrice.js';
import { formatMoney } from '../../utils/formatMoney.js';

function CartPage() {
    const { items, itemCount, totalPrice, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleDecrease = (productId, currentQuantity) => {
        if (currentQuantity === 1) return
        else updateQuantity(productId, currentQuantity - 1);
    };
    
    const handleIncrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.cart}>
                <h2>Your Cart</h2>
                {itemCount === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                <>
                    <div className={styles.itemsContainer}>
                        {items.map((product) => (
                            <div key={product.id} className={styles.cartItem}>
                                <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
                                <div className={styles.titlePriceContainer}>
                                    <p className={styles.productTitle}>{product.title}</p>
                                    <p className={styles.price}>${displayTotalPrice(product.price, 1)}</p>
                                </div>
                                <div className={styles.quantitySelector}>
                                    {product.quantity === 1 ? (
                                        <button className={styles.removeFromCartButton} onClick={() => removeFromCart(product.id)}>
                                            <Trash color='white' height='20px' />
                                        </button>
                                    ) : (
                                        <button className={styles.quantityButton} onClick={() => handleDecrease(product.id, product.quantity)}>-</button>
                                    )}
                                    <span className={styles.quantityDisplay}>
                                        {product.quantity}
                                    </span>
                                    <button className={styles.quantityButton} onClick={() => handleIncrease(product.id, product.quantity)}>+</button>
                                </div>
                                <div className={styles.itemTotal}>
                                    <p>Item Total:</p>
                                    <br />
                                    <p>${displayTotalPrice(product.price, product.quantity)}</p>
                                </div>
                                <button className={styles.deleteItem} onClick={() => removeFromCart(product.id)}>Delete</button>
                    
                            </div>
                        ))}
                        <p className={styles.subTotal}>{`Subtotal (${itemCount} Items)`} ${formatMoney(totalPrice)}</p>
                    </div>
                     <button className={styles.checkout}>
                     Proceed to Checkout
                    </button>
                </>
                )}
            </div>
        </div>
    )
}

export { CartPage }
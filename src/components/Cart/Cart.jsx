/* import { useState } from 'react'; */
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/useCart.js';
import styles from './Cart.module.css';

function Cart() {
    const { itemCount } = useCart();

    return (
        <Link to="/cart" className={styles.cartContainer}>
            <ShoppingCart color='white' height='35px' width='35px'/>
            {itemCount > 0 && (
            <div className={styles.itemCountBadge}>
                {itemCount}
            </div>
        )}
        </Link>

    );
};

export { Cart }
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {
    const { itemCount } = useContext(CartContext);

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
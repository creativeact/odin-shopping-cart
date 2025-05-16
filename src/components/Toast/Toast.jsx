import { ProductContext } from '../../context/ProductContext';
import styles from './Toast.module.css'

function Toast({ product, quantity }) {
    return(
        <div className={styles.toastNotificationContainer}>
            <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
            <p className={styles.toastMessage}>
                {quantity > 1 ?
                `${product.title} x ${quantity} added to cart` :
                `${product.title} added to cart`}
            </p>
        </div>
    );
}

export { Toast }
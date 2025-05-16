import { useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import styles from './Toast.module.css'

function Toast({ product, quantity, onDismiss, autoClose = 2000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!autoClose) return;
        
        const timer = setTimeout(() => {
            setIsVisible(false);
            const animationDuration = 300;
            setTimeout(() => {
                onDismiss();
            }, animationDuration);
        }, autoClose);
        
        return () => clearTimeout(timer);
    }, [autoClose, onDismiss]);

    if(!isVisible) {
        return null;
    }

    return(
        <div className={`${styles.toastNotificationContainer} ${isVisible ? styles.visible : styles.hidden}`}>
            <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
            <p className={styles.toastMessage}>
                {quantity > 1 ?
                `${product.title} x ${quantity} added to cart` :
                `${product.title} added to cart`}
            </p>
            <button onClick={onDismiss} className={styles.dismissButton} >X</button>
        </div>
    );
}

export { Toast }
import { useEffect } from 'react';
import { useToast } from '../../utils/useToast.js';
import { Toast } from './Toast.jsx';
import styles from './ToastManager.module.css';

function ToastManager() {
    const { toasts, removeToast } = useToast();

    useEffect(() => {
        const timers = toasts.map((toast, index) =>
            setTimeout(() => removeToast(index), 2000)
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [toasts, removeToast]);

    return (
        <div className={styles.toastsContainer}>
            {toasts.map((toast, index) => (
                <Toast 
                    key={index}
                    product={toast.product}
                    quantity={toast.quantity}
                />
            ))}
        </div>
    )
}

export { ToastManager }
import { useToast } from '../../utils/useToast.js';
import { Toast } from './Toast.jsx';
import styles from './ToastManager.module.css';

function ToastManager() {
    const { toasts, removeToast } = useToast();

    return (
        <div className={styles.toastsContainer}>
            {toasts.map((toast, index) => (
                <Toast 
                    key={index}
                    product={toast.product}
                    quantity={toast.quantity}
                    onDismiss={() => removeToast(index)}
                    autoClose={2000}
                />
            ))}
        </div>
    );
}

export { ToastManager }
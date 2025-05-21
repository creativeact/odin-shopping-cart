import { useContext } from 'react';
import { Toast } from './Toast.jsx';
import styles from './ToastManager.module.css';
import { ToastContext } from '../../context/ToastContext.jsx';

function ToastManager() {
    const { toasts, removeToast } = useContext(ToastContext);
    return (
        <div className={styles.toastsContainer}>
            {toasts.map((toast, index) => (
                <Toast 
                    key={index}
                    message={toast.message}
                    image={toast.image}
                    onDismiss={() => removeToast(index)}
                    autoClose={2000}
                />
            ))}
        </div>
    );
}

export { ToastManager }
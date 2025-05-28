import { useState, useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ message, image = null, onDismiss, autoClose = 2000 }) {
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

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.toastNotificationContainer} ${isVisible ? styles.visible : styles.hidden}`}
    >
      {image && (
        <img src={image} alt="toast icon" className={styles.productImage} />
      )}
      <p className={styles.toastMessage}>{message}</p>
      <button onClick={onDismiss} className={styles.dismissButton}>
        X
      </button>
    </div>
  );
}

export { Toast };

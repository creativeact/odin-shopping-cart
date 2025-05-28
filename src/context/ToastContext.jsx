import { createContext, useState } from "react";

const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (targetIndex) => {
    setToasts((prev) =>
      prev.filter((_, currentIndex) => currentIndex !== targetIndex),
    );
  };

  const toastContextValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };

import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

function useToast() {
    const { addToast } = useContext(ToastContext);

    return {
        productAdded: (product, quantity = 1) =>
            addToast({
                message:
                quantity > 1
                    ? `${product.title} (x${quantity}) added to cart`
                    : `${product.title} added to cart`,
                image: product.thumbnail,
                type: 'success',
            }),
        checkoutSuccess: () =>
            addToast({
                message: 'Thanks for demoing my app!',
                type: 'success',
            }),
    };
}

export { useToast }
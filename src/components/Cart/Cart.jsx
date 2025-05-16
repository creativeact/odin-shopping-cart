/* import { useState } from 'react'; */
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../utils/useCart.js';

function Cart() {
    const { itemCount } = useCart();

    return (
        <button>
            <ShoppingCart />
             {/* Show item count badge when items exist */}
            {itemCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
            </div>
        )}
        </button>

    );
};

export { Cart }
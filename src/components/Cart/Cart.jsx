/* import { useState } from 'react'; */
import { ShoppingCart } from 'lucide-react';

function Cart() {
    const itemCount = 0;
    /* const [isOpen, setIsOpen] = useState(false);

    const handleCartClick = () => {
        setIsOpen(!isOpen);
    } */

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
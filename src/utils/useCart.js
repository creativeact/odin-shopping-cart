import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const useCart= () => useContext(CartContext);

export { useCart }
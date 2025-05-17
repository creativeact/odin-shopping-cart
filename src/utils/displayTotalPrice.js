import { formatMoney } from '../utils/formatMoney.js'; 

function displayTotalPrice(price, quantity) {
    const priceInCents = Math.round(price * 100);
    const totalInCents = priceInCents * quantity;
    const total = totalInCents / 100;

    return formatMoney(total.toFixed(2));
}

export { displayTotalPrice }
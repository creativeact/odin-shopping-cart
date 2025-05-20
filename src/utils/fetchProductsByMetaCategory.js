import { fetchProductsByCategory } from './fetchProductsByCategory';
import { categoryConfig } from './categoryConfig';

async function fetchProductsByMetacategory(metaCategory) {
    try {
        const categories = categoryConfig.getApiCategories(metaCategory);
        const promises = categories.map(category => fetchProductsByCategory(category));
        const products = await Promise.all(promises);
        return products.flat(); // Consolidate all category arrays into one product array
    } catch (error) {
        console.error('Error fetching products by meta category', error);
        throw error;
    }
}

export { fetchProductsByMetacategory }
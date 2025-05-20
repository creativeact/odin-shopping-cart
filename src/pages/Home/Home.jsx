import styles from './Home.module.css';
import { fetchProduct } from '../../utils/fetchProduct.js';
import { Carousel } from '../../components/Carousel/Carousel.jsx';
import { useState, useEffect } from 'react';

const featuredProductIds = [83, 84, 85, 86, 87]

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([])
    
    useEffect(() => {
        async function loadFeaturedProducts() {
            try {
                const promises = featuredProductIds.map(id => fetchProduct(id));
                console.log('Promises', promises);
                const products = await Promise.all(promises);
                setFeaturedProducts(products.flat());
            } catch(error) {
                console.error('Error fetching featured products', error);
                throw error;
            }
        }
        loadFeaturedProducts();
    }, [])

    return (
        <>
            <div className={styles.deals}>
                <h2 className={styles.sectionHeader}>Today's Deals</h2>
                <Carousel products={featuredProducts} />
            </div>
        </>
    );
}

export { Home }
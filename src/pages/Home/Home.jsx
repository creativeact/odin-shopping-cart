import styles from './Home.module.css';
import { useContext } from 'react';
import { Carousel } from '../../components/Carousel/Carousel.jsx';
import { ProductContext } from '../../context/ProductContext.jsx'

const DealsCarousel = () => {
    const products = useContext(ProductContext);
    console.log('Raw products in context', products);

    const featuredDeals = products.slice(0,3);

    return (
        <Carousel products={featuredDeals} />

    )
};

function Home() {
    return (
        <>
            <div className={styles.deals}>
                <h2 className={styles.sectionHeader}>Today's Deals</h2>
                <DealsCarousel />
            </div>
        </>
    );
}

export { Home }
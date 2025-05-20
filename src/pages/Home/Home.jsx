import styles from './Home.module.css';
import { Carousel } from '../../components/Carousel/Carousel.jsx';
import { ProductContext } from '../../context/ProductContext.jsx'

/* const DealsCarousel = () => {
    const products = useContext(ProductContext);

    const featuredDeals = products.slice(82,85);

    return (
        <Carousel products={featuredDeals} />

    )
}; */

function Home() {
    return (
        <>
            <div className={styles.deals}>
                <h2 className={styles.sectionHeader}>Today's Deals</h2>
                {/* <DealsCarousel /> */}
            </div>
        </>
    );
}

export { Home }
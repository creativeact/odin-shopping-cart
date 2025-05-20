import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify.js';
import { formatMoney } from '../../utils/formatMoney';
import styles from './Carousel.module.css';

function Carousel({ products }) {
    console.log('Products received by carousel', products);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const currentProduct = products?.[currentIndex];
    if (!currentProduct) return <p>Loading...</p>;

    return (
        <div className={styles.carousel}>
            <div className={styles.slideWrapper}>
                <button onClick={prevSlide} className={`${styles.arrow} ${styles.left}`}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <div className={styles.slide}>
                    <Link className={styles.link} to={`/product/${slugify(currentProduct.title)}-${currentProduct.id}}`}>
                        <div className={styles.imageContainer}>
                            <img
                            src={currentProduct.images[0]}
                            alt={currentProduct.title}
                            className={styles.image}
                            />
                        </div>
                        <div className={styles.caption}>
                            <h3>{currentProduct.title}</h3>
                            <p>${formatMoney(currentProduct.price)}</p>
                        </div>
                    </Link>
                </div>
                <button onClick={nextSlide} className={`${styles.arrow} ${styles.right}`}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            <div className={styles.indicators}>
                {products.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={styles.dot}
                    style={{
                        backgroundColor: currentIndex === index ? "#333" : "#ccc",
                    }}
                />
                ))}
            </div>

        </div>
    )
}

export { Carousel }
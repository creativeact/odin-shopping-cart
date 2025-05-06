import { useState } from 'react';
import styles from './Carousel.module.css';

function Carousel({ products }) {
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

    const currentProduct = products[currentIndex];

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
                    <img
                        src={currentProduct.images[0]}
                        alt={currentProduct.title}
                        className={styles.image}
                    />
                    <div className={styles.caption}>
                        <h3>{currentProduct.title}</h3>
                        <p>{currentProduct.price}</p>
                    </div>
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
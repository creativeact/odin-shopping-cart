import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify.js';
import { formatMoney } from '../../utils/formatMoney';
import styles from './Carousel.module.css';

function Carousel({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const backgroundColors = ['#e0edee', '#dfdddd', '#f4f0e3', '#f6e7e7', '#f2f0f0'];

    const goToSlide = (index) => {
        setDirection( index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const currentProduct = products?.[currentIndex];
    if (!currentProduct) return <p>Loading...</p>;

    return (
        <div className={styles.carousel}>
                <button onClick={prevSlide} className={`${styles.arrow} ${styles.left}`}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className={styles.slideWrapper} style={{ backgroundColor: backgroundColors[currentIndex % backgroundColors.length] }}>
                    {products.map((product, index) => {
                        if (index !== currentIndex) return null
                        const directionClass = direction === 'left'
                            ? styles.slideInRight
                            : styles.slideInLeft;

                        return (
                            <Link
                                key={product.id}
                                className={`${styles.link} ${index === currentIndex ? styles.active : ''} ${directionClass}`}
                                to={`/product/${slugify(product.title)}-${product.id}`}
                            >
                                <div className={styles.slide}>
                                    <div className={styles.imageContainer}>
                                        <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className={styles.image}
                                        />
                                    </div>
                                    <div className={styles.caption}>
                                        <h3>{product.title}</h3>
                                        <p>${formatMoney(product.price)}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    )}
                </div>

                <button onClick={nextSlide} className={`${styles.arrow} ${styles.right}`}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

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


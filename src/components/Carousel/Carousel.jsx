import { useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify.js";
import { formatMoney } from "../../utils/formatMoney";
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./Carousel.module.css";

function Carousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className={styles.carousel}>
      <button
        onClick={prevSlide}
        className={`${styles.slideButton} ${styles.left}`}
      >
        <ChevronLeft className={styles.arrow} />
      </button>

      {products.map((product, index) => (
        <div
          key={index} className={`${styles.slideWrapper} ${index === currentIndex ? styles.active : ""}`}
        >
          <div className={styles.slide}>
            <div className={styles.imageContainer}>
              <img
                src={product.images[0]}
                alt={product.title}
                className={styles.image}
              />
            </div>
            <div className={styles.productDetails}>
              <div className={styles.caption}>
                <h3>{product.title}</h3>
                <p>${formatMoney(product.price)}</p>
              </div>
              <Link
                key={product.id}
                className={styles.link}
                to={`/product/${slugify(product.title)}-${product.id}`}
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={nextSlide}
        className={`${styles.slideButton} ${styles.right}`}
      >
        <ChevronRight className={styles.arrow} />
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
  );
}

export { Carousel };

import styles from "./Home.module.css";
import { fetchProduct } from "../../utils/fetchProduct.js";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { useState, useEffect } from "react";

const featuredProductIds = [83, 84, 85, 86, 87];

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      setLoading(true);
      setError(null);
      try {
        const promises = featuredProductIds.map((id) => fetchProduct(id));
        const products = await Promise.all(promises);
        setFeaturedProducts(products.flat());
      } catch (error) {
        console.error("Error fetching featured products", error);
        setError("Failed loading products in slider. Please try again");
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <Carousel products={featuredProducts} />
      </div>
    </>
  );
}

export { Home };

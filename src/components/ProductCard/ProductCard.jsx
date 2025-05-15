import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify.js';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
    const slug = slugify(product.title || product.name);

    return (
        <Link to={`/product/${slug}`}>
            <div key={product.id} className={styles.productCard}>
                <img
                    src={product.thumbnail}
                    alt={product.title || product.name}
                    className={styles.productImage}
                 />
                <h3 className={styles.productTitle}>
                    {product.title || product.name}
                </h3>
                <p className={styles.price}>
                    ${product.price}
                </p>
            </div>
        </Link>
    )
}

export { ProductCard }
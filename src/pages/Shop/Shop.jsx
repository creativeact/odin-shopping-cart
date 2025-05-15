import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext.jsx';
import styles from './Shop.module.css';

function Shop() {
    const products = useContext(ProductContext);
    console.log('Shop Context result', products);

    return (
        <div className={styles.productList}>
        {products.map(product => (
          <ProductCard
            product={product}
          />
        ))}
      </div>
    )
}

export { Shop }
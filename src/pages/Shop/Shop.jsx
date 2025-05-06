import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext.jsx';

function Shop() {
    const products = useContext(ProductContext);
    console.log('Shop Context result', products);

    return (
        <div className="product-list">
        {products.map(product => (
          <ProductCard
            key={product.id}
            image={product.images[0]}
            title={product.title}
            price={product.price}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    )
}

export { Shop }
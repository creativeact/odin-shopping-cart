import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import { categoryConfig } from '../../utils/categoryConfig.js';

function CategoryPage({ products = [] }) {
  const { categoryName } = useParams();
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  
  const displayName = categoryConfig.getDisplayName(categoryName);
  const apiCategories = categoryConfig.getApiCategories(categoryName);
  console.log('Api Categories:', apiCategories);
  
  let filteredProducts = [];

  if (products && products.length > 0) {
    const categoryProducts = products.filter(product =>
      apiCategories.includes(product.category)
    );
  
    if (activeSubCategory !== 'all') {
      filteredProducts = categoryProducts.filter(product =>
        product.category === activeSubCategory
      );
    } else {
      filteredProducts = categoryProducts;
    }
  }

  // Handle clicking on a subcategory tile
  const handleSubCategoryClick = (category) => {
    setActiveSubCategory(category === activeSubCategory ? 'all' : category);
  };
  
  // If products array is empty, show loading
  if (!products || products.length === 0) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.categoryPage}>
      <h1>{displayName}</h1>
      
      {/* Subcategory tiles */}
      <div className={styles.subCategories}>
        <div 
          className={`${styles.subCategoryTile} ${activeSubCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveSubCategory('all')}
        >
          All
        </div>
        {apiCategories.map(apiCategory => (
          <div 
            key={apiCategory} 
            className={`${styles.subCategoryTile} ${activeSubCategory === apiCategory ? styles.active : ''}`}
            onClick={() => handleSubCategoryClick(apiCategory)}
          >
            {formatApiCategoryName(apiCategory)}
          </div>
        ))}
      </div>
      
      {/* Product count */}
      <div className={styles.productCount}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </div>
      
      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img 
                src={product.thumbnail || product.imageUrl} 
                alt={product.title || product.name} 
                className={styles.productImage} 
              />
              <h3>{product.title || product.name}</h3>
              <p className={styles.productPrice}>
                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
              </p>
              <div className={styles.productCategory}>
                {formatApiCategoryName(product.category)}
              </div>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Format API category names for display (convert "womens-dresses" to "Women's Dresses")
function formatApiCategoryName(name) {
  if (!name) return '';
  
  return name
    .split('-')
    .map(word => {
      // Handle possessives
      if (word === 'womens') return "Women's";
      if (word === 'mens') return "Men's";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export { CategoryPage }
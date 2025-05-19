import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext.jsx';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import { categoryConfig } from '../../utils/categoryConfig.js';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
 
function CategoryPage() {
  const { categoryName } = useParams();
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const products = useContext(ProductContext);

  useEffect(() => {
    // Reset active subcategory to all when user clicks on new category page
    setActiveSubCategory('all');
  }, [categoryName]);

  if (!products) {
    return <div className={styles.loading}>Loading products...</div>;
  }
  const displayName = categoryConfig.getDisplayName(categoryName);
  const apiCategories = categoryConfig.getApiCategories(categoryName);

  const categoryProducts = products.filter(product =>
    apiCategories.includes(product.category)
  );

  // Valid & resolved subcategory logic prevents UI flashing on category page change
  const isValidSubCategory = apiCategories.includes(activeSubCategory);
  const resolvedSubCategory = isValidSubCategory ? activeSubCategory : 'all';

  const filteredProducts =
    resolvedSubCategory === 'all'
      ? categoryProducts
      : categoryProducts.filter(product => product.category === resolvedSubCategory);

  const handleSubCategoryClick = (category) => {
    setActiveSubCategory(category === activeSubCategory ? 'all' : category);
  };

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
            <ProductCard key={product.id} product={product} />
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
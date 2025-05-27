import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import { fetchProductsByMetacategory } from '../../utils/fetchProductsByMetacategory.js';
import { categoryConfig } from '../../utils/categoryConfig.js';
import { formatSubcategoryName } from '../../utils/formatSubcategoryName.js';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
 
function CategoryPage() {
  const { categoryName } = useParams();
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset active subcategory to all when user clicks on new category page
    setActiveSubCategory('all');
  }, [categoryName]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null)
      try {
        const result = await fetchProductsByMetacategory(categoryName);
        setProducts(result);
      } catch (error) {
        console.error('Failed to load products', error);
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [categoryName])

  const displayName = categoryConfig.getDisplayName(categoryName);
  const subCategories = categoryConfig.getApiCategories(categoryName);

  if (loading) {
    return (
      <div className={styles.categoryPage}>
        <h1>{displayName}</h1>
        
        <div className={styles.subCategories}>
          <div
            role='button'
            className={`${styles.subCategoryTile} ${activeSubCategory === 'all' ? styles.active : ''}`}
            onClick={() => setActiveSubCategory('all')}
          >
            All
          </div>
          {subCategories.map(subCategory => (
            <div
              role='button'
              key={subCategory}
              className={`${styles.subCategoryTile} ${activeSubCategory === subCategory ? styles.active : ''}`}
              onClick={() => handleSubCategoryClick(subCategory)}
            >
              {formatSubcategoryName(subCategory)}
            </div>
          ))}
        </div>
        <div className={styles.productsGrid}>
          <div className={styles.loadingCard} role='status'>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingDetails}></div>
          </div>
          <div className={styles.loadingCard} role='status'>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingDetails}></div>
          </div>
          <div className={styles.loadingCard} role='status'>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingDetails}></div>
          </div>
          <div className={styles.loadingCard} role='status'>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingDetails}></div>
          </div>
        </div>
      </div>

    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>
  }

  const filteredProducts =
    activeSubCategory === 'all'
      ? products
      : products.filter(product => product.category === activeSubCategory)

  const handleSubCategoryClick = (category) => {
    setActiveSubCategory(category === activeSubCategory ? 'all' : category);
  };

  return (
    <div className={styles.categoryPage}>
      <h1>{displayName}</h1>
      
      <div className={styles.subCategories}>
        <div
          role='button' 
          className={`${styles.subCategoryTile} ${activeSubCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveSubCategory('all')}
        >
          All
        </div>
        {subCategories.map(subCategory => (
          <div 
            role='button'
            key={subCategory} 
            className={`${styles.subCategoryTile} ${activeSubCategory === subCategory ? styles.active : ''}`}
            onClick={() => handleSubCategoryClick(subCategory)}
          >
            {formatSubcategoryName(subCategory)}
          </div>
        ))}
      </div>
      
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




export { CategoryPage }
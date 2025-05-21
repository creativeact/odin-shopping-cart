import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import { ToastContext } from '../../context/ToastContext.jsx';
import { fetchProduct } from '../../utils/fetchProduct.js';
import { StarRating } from '../../components/StarRating/StarRating.jsx';
import { CircleUserRound } from 'lucide-react';
import { formatMoney } from '../../utils/formatMoney.js';
import styles from './ProductPage.module.css';

function ProductPage() {
    const { slugAndProductId } = useParams();
    const productId = slugAndProductId.split('-').pop();

    const { addToCart } = useContext(CartContext);
    const { addToast } = useContext(ToastContext);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState('');

    useEffect(() => {
        async function loadProduct() {
            try {
                const result = await fetchProduct(productId);
                setProduct(result);
            } catch (error) {
                console.error('Failed to load product', error);
            }
        }
        loadProduct();
    }, [productId])

    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleIncrease = () => setQuantity(prev => prev + 1);

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <img src={product.images[0]} alt={product.title} className={styles.productImage} />
                </div>
            
                <div className={styles.productDetails}>
                    <h1 className={styles.productTitle}>{product.title}</h1>
                    <div className={styles.productRating}>
                        <StarRating rating={product.rating} />
                        ({product.rating})
                    </div>
                    <div className={styles.priceAvailabilityContainer}>
                        <p className={styles.productPrice}>${formatMoney(product.price)}</p>
                        <p
                            className={`${styles.productAvailability} ${
                                product.availabilityStatus === "Low Stock" ? styles.low : ''
                            }`}>
                            {product.availabilityStatus}
                        </p>
                    </div>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className={styles.addProductContainer}>
                        <div className={styles.quantitySelector}>
                            <button className={styles.quantityButton} onClick={handleDecrease}>-</button>
                            <span className={styles.quantityDisplay}>
                                {quantity}
                            </span>
                            <button className={styles.quantityButton} onClick={handleIncrease}>+</button>
                        </div>
            
                        <button onClick={() => {
                            addToCart(product, quantity);
                            addToast(product, quantity);
                            console.log('Product Quantity', product.quantity)
                            }}
                            className={styles.addToCartButton}
                            >
                            Add to Cart
                            </button>
                    </div>
                    <div className={styles.reviewsSection}>
                        <h3 className={styles.reviewsHeader}>Reviews</h3>
                            <div className={styles.reviewsContainer}>
                                {product.reviews.map((review, index) => (
                                    <div key={index} className={styles.review}>
                                        <div className={styles.user}>
                                            <CircleUserRound />
                                            <p className={styles.reviewerName}>{review.reviewerName} on {new Date(review.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className={styles.comment}>
                                            <StarRating rating={review.rating} />
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export { ProductPage }
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
 return (
    <nav className={styles.navBar}>
      <div className={styles.navBarBrand}>
         <Link to='/'>My Store</Link>
      </div>
      <ul className={styles.navBarLinks}>
         <li><Link className={styles.link} to='/'>Home</Link></li>
         <li><Link className={styles.link} to='/shop'>Shop</Link></li>
         <li><Link className={styles.link} to='/checkout'>Checkout</Link></li>
      </ul>
      <div className='navBar-cart'>
         {/* Cart icon / component goes here */}
      </div>
    </nav>
 )   
}

export { NavBar }

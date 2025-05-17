import { Link } from 'react-router-dom';
import { Cart } from '../Cart/Cart.jsx'
import { SearchBar } from '../Searchbar/SearchBar.jsx';
import styles from './NavBar.module.css';
import Logo from '../../assets/BigOStore_Logo_White.png';

function NavBar() {

const productCategories = [
   { name: 'Clothing', path: '/category/clothing' },
   { name: 'Home & Kitchen', path: '/category/home-kitchen' },
   { name: 'Groceries', path: '/category/groceries' },
   { name: 'Health & Beauty', path: '/category/health-beauty' },
   { name: 'Electronics', path: '/category/electronics' },
   { name: 'Vehicles', path: '/category/vehicles' }
];

 return (
    <div className={styles.navBar}>
       <nav className={styles.navBarMain}>
         <Link to='/'>
            <img className={styles.navLogo} src={Logo}></img>
         </Link>
         <SearchBar/>
         <Cart />
       </nav>
       <nav className={styles.navBarSecondary}>
         <ul className={styles.navBarSecondaryLinks}>
            {productCategories.map((category, index) => (
            <li key={index}>
               <Link className={`${styles.link} ${styles.secondaryLink}`} to={category.path}>
                  {category.name}
               </Link>
            </li>
            ))}
        </ul>
       </nav>
    </div>
 )   
}

export { NavBar }

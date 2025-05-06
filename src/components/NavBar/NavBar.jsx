import { Link } from 'react-router-dom';
import { Cart } from '../Cart/Cart.jsx'
import { SearchBar } from '../Searchbar/SearchBar.jsx';
import styles from './NavBar.module.css';
import Logo from '../../assets/BigOStore_Logo.png';

function NavBar() {
 return (
    <div className={styles.navBar}>
       <nav className={styles.navBarMain}>
         <Link to='/'>
            <img className={styles.navLogo} src={Logo}></img>
         </Link>
         <SearchBar/>
         <ul className={styles.navBarMainLinks}>
            <li><Link className={styles.link} to='/shop'>Shop</Link></li>
         </ul>
         <Cart />
       </nav>
       <nav className={styles.navBarSecondary}>
         <ul className={styles.navBarSecondaryLinks}>
            <li><Link className={styles.link} to='/clothing'>Clothing</Link></li>
            <li><Link className={styles.link} to='/clothing'>Home & Kitchen</Link></li>
            <li><Link className={styles.link} to='/clothing'>Groceries</Link></li>
            <li><Link className={styles.link} to='/clothing'>Health & Beauty</Link></li>
            <li><Link className={styles.link} to='/clothing'>Electronics</Link></li>
            <li><Link className={styles.link} to='/clothing'>Vehicles</Link></li>
         </ul>
       </nav>
    </div>
 )   
}

export { NavBar }

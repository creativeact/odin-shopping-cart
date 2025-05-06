import { useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.jsx';
import styles from './SearchBar.module.css';


function SearchBar({ placeholder = 'Search all products' }) {
    const [isFocused, setIsFocused] = useState(false);
    const { handleSearch, searchQuery } = useContext(SearchContext);

    const handleInput = (event) => {
        handleSearch(event.target.value);
    };

    const handleClear = () => {
        handleSearch('');
    }

    return(
        <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
        <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        
        <input 
            type="text"
            className={styles.searchInput}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search products"
        />
        
        {searchQuery && (
            <button 
                className={styles.clearButton} 
                onClick={handleClear}
                aria-label="Clear search"
            >
                ×
            </button>
        )}
    </div>
    )
}

export { SearchBar }
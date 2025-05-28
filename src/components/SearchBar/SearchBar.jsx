import { useState } from "react";
import { Search } from 'lucide-react';
import styles from "./SearchBar.module.css";

function SearchBar({ placeholder = "Search all products" }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${styles.searchContainer} ${isFocused ? styles.focused : ""}`}
    >
      <Search />

      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search products"
      />

    </div>
  );
}

export { SearchBar };

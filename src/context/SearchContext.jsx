import { createContext, useState } from 'react';

const SearchContext = createContext({
    searchQuery: '',
    searchResults: [],
    handleSearch: () => {},
});

const SearchProvider = ({ children, products }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
      
      if (!query.trim() || !products) {
        setSearchResults([]);
        return;
      }
      
      const filteredResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(filteredResults);
    };
  
    const searchContextValue = {
      searchQuery,
      searchResults,
      handleSearch
    };
  
    return (
        <SearchContext.Provider value={searchContextValue}>
          {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider }
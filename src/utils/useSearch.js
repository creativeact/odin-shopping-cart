import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext.jsx';

const useSearch = () => useContext(SearchContext);

export { useSearch }
// Format API category names for display (convert "womens-dresses" to "Women's Dresses")

function formatApiCategoryName(name) {
  if (!name) return '';
  
  return name
    .split('-')
    .map(word => {
      if (word === 'womens') return "Women's";
      if (word === 'mens') return "Men's";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export { formatApiCategoryName }
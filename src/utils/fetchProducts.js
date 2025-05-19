async function fetchProductsByCategory(category) {

  const response = await fetch(`https://dummyjson.com/products/category/${category}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.products;
}

export { fetchProductsByCategory };
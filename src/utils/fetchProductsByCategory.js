async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(`Error fetching product by category: ${category}`, error);
    throw error;
  }
}

export { fetchProductsByCategory };

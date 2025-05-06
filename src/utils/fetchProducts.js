async function fetchProducts() {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/category/tops",
      );
      const data = await response.json();
      return data.products;
    } catch (err) {
    console.error("Error retrieving products", err);
    }
};

export { fetchProducts }
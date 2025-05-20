async function fetchProduct(productId) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`)
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
    console.error(`Error fetching product`, error);
    throw error;
  }
}

export { fetchProduct }
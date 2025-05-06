function ProductCard({ image, title, price, description, category }) {
    return (
        <div className="product-card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{category}</p>
            <p>{description}</p>
            <p>${price}</p>
        </div>
    )
}

export { ProductCard }
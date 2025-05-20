const categoryConfig = {
    metaCategories: {
        'clothing': {
            displayName: 'Clothing',
            apiCategories: ['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches', 'tops']
        },
        'home-kitchen': {
            displayName: 'Home & Kitchen',
            apiCategories: ['furniture', 'home-decoration', 'kitchen-accessories']
        },
        'groceries': {
            displayName: 'Groceries',
            apiCategories: ['groceries']
        },
        'health-beauty': {
            displayName: 'Health & Beauty',
            apiCategories: ['beauty', 'fragrances', 'skin-care', 'sports-accessories', 'sunglasses']
        },
        'electronics': {
            displayName: 'Electronics',
            apiCategories: ['laptops', 'mobile-accessories', 'smartphones', 'tablets']
        },
        'vehicles': {
            displayName: 'Vehicles',
            apiCategories: ['motorcycle', 'vehicle']
        }
    },

    getApiCategories(metaCategory) {
        return this.metaCategories[metaCategory]?.apiCategories || [];
    },

    getDisplayName(metaCategory) {
        return this.metaCategories[metaCategory]?.displayName || 
        metaCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
}

export { categoryConfig }
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
            apiCategories: ['beauty', 'fragrance', 'skin-care', 'sports-accesories', 'sunglasses']
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

    getApiCategories(metaCategorySlug) {
        return this.metaCategories[metaCategorySlug]?.apiCategories || [];
    },

    // Get display name for a meta-category
    getDisplayName(metaCategorySlug) {
        return this.metaCategories[metaCategorySlug]?.displayName || 
        metaCategorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    
    // Check if a meta-category exists
    isValidMetaCategory(metaCategorySlug) {
        return Object.keys(this.metaCategories).includes(metaCategorySlug);
    },
    
    // Find which meta-category an API category belongs to
    findMetaCategory(apiCategory) {
        for (const [metaCategory, data] of Object.entries(this.metaCategories)) {
        if (data.apiCategories.includes(apiCategory)) {
            return metaCategory;
        }
        }
        return null;
    },
    
    // Get all meta-categories
    getAllMetaCategories() {
        return Object.keys(this.metaCategories).map(slug => ({
        slug,
        displayName: this.getDisplayName(slug)
        }));
    }
};

export { categoryConfig }

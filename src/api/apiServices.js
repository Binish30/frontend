const API_URL = 'process.env.REACT_APP_API_URL';  // Use the backend URL here

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/allproducts`);
        if (!response.ok) throw new Error('Error fetching products');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetch user's cart
export const fetchCart = async (authToken) => {
    try {
        const response = await fetch(`${API_URL}/getcart`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Error fetching cart');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Add item to cart
export const addToCartAPI = async (authToken, itemId) => {
    try {
        const response = await fetch(`${API_URL}/addtocart`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
        });
        if (!response.ok) throw new Error('Error adding item to cart');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCartAPI = async (authToken, itemId) => {
    try {
        const response = await fetch(`${API_URL}/removefromcart`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
        });
        if (!response.ok) throw new Error('Error removing item from cart');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetch new collections
export const fetchNewCollections = async () => {
    try {
        const response = await fetch(`${API_URL}/api/new-collections`);  // Update to use backend URL
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching new collections:', error);
    }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
    try {
        const response = await fetch(`${API_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) throw new Error('Error subscribing to newsletter');
        return await response.json();
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        throw error;
    }
};

// Fetch popular products
export const fetchPopularProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/popular-products`);  // Update to use backend URL
        if (!response.ok) {
            throw new Error(`Failed to fetch popular products: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular products:', error);
        throw error;  // Rethrow the error to propagate it
    }
};

// Fetch related products
export const getRelatedProducts = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/related-products/${productId}`);
        if (!response.ok) throw new Error('Error fetching related products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching related products:', error);
        throw error;
    }
};

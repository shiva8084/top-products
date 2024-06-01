import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchProducts = async (category, n, page, minPrice, maxPrice, sortBy, order) => {
    const params = {
        n,
        page,
        minPrice,
        maxPrice,
        sort_by: sortBy,
        order,
    };
    const response = await axios.get(`${API_BASE_URL}/categories/${category}/products`, { params });
    return response.data;
};

export const fetchProductDetails = async (category, productId) => {
    const response = await axios.get(`${API_BASE_URL}/categories/${category}/products/${productId}`);
    return response.data;
};

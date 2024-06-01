import React, { useState } from 'react';
import { fetchProducts, fetchProductDetails } from './api';

function App() {
    const [category, setCategory] = useState('');
    const [n, setN] = useState(10);
    const [page, setPage] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [sortBy, setSortBy] = useState('price');
    const [order, setOrder] = useState('asc');
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    const handleFetchProducts = async () => {
        const data = await fetchProducts(category, n, page, minPrice, maxPrice, sortBy, order);
        setProducts(data);
    };

    const handleFetchProductDetails = async (productId) => {
        const data = await fetchProductDetails(category, productId);
        setProductDetails(data);
    };

    return (
        <div className="App">
            <h1>Top Products</h1>
            <div>
                <label>Category: </label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Number of Products: </label>
                <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
            </div>
            <div>
                <label>Page: </label>
                <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
            </div>
            <div>
                <label>Min Price: </label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
                <label>Max Price: </label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div>
                <label>Sort By: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="discount">Discount</option>
                    <option value="company">Company</option>
                </select>
            </div>
            <div>
                <label>Order: </label>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button onClick={handleFetchProducts}>Fetch Products</button>

            <div>
                <h2>Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.productName} - {product.price}
                            <button onClick={() => handleFetchProductDetails(product.id)}>Details</button>
                        </li>
                    ))}
                </ul>
            </div>

            {productDetails && (
                <div>
                    <h2>Product Details</h2>
                    <p>Name: {productDetails.productName}</p>
                    <p>Price: {productDetails.price}</p>
                    <p>Rating: {productDetails.rating}</p>
                    <p>Discount: {productDetails.discount}</p>
                    <p>Availability: {productDetails.availability}</p>
                </div>
            )}
        </div>
    );
}

export default App;

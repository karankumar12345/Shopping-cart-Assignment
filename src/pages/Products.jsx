import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ onCartChange }) => {
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      setAllCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  // Fetch products
  const fetchProducts = async (category = 'all') => {
    setLoading(true);
    try {
      const url =
        category === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${category}`;

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // Add to Cart
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // prevent navigation on button click
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    onCartChange && onCartChange(cart.length);
    alert('Product added to cart ✅');
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="p-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border capitalize ${
              selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap gap-6 justify-center items-start">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border p-4 rounded-xl shadow-[0px_0px_48px_-6px_#ff24e1b3] w-[220px] h-[400px] bg-white hover:shadow-2xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-4 hover:scale-[1.1] transition duration-300"
            />
            <h2 className="text-md font-semibold mb-1 line-clamp-2 h-[48px]">
              {product.title}
            </h2>
            <p className="text-gray-700 mb-3 font-medium">${product.price}</p>

            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

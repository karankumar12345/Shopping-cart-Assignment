import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

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
   
    alert('Product added to cart ✅');
  };
  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!product) return <div className="text-center mt-10 text-lg">Product not found</div>;

  return (
    <div className="flex flex-col  gap-10 p-6 items-center justify-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-lg shadow-md"
      />

      <div className="max-w-xl">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600 mb-6">${product.price}</p>

        <button
          onClick={(e) => handleAddToCart(e, product)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

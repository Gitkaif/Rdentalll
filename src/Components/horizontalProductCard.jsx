import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const HorizontalProductCard = ({ product, onDelete, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
    onQuantityChange?.(updatedQuantity);
  };

  const handleRemove = () => {
    onDelete?.(product.id);
  };

  const savedAmount = product.mrp - product.price;
  const savingsPercentage = ((savedAmount) / product.mrp * 100).toFixed(0);

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/products/${product.catagory}/${product.name}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div 
      className="w-full cursor-pointer max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] bg-white mb-4"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="relative w-40 h-40">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2" title={product.name}>
                {product.name}
              </h2>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <p 
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
              className={`text-gray-600 text-sm mb-4 cursor-pointer ${!showFullDescription ? 'line-clamp-2' : 'whitespace-pre-wrap'}`}
            >
              {product.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-400 line-through">${product.mrp}</span>
              <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
                Save {savingsPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(quantity - 1);
                }}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="text-red-500 font-bold animate-pulse">-</span>
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(quantity + 1);
                }}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="text-green-500 font-bold animate-pulse">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HorizontalProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    mrp: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    catagory: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired
};

export default HorizontalProductCard;

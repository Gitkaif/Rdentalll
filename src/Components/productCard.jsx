import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, description, price, image , catagory}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-64 h-96 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 bg-white
    hover:cursor-pointer hover:shadow-xl hover:shadow-green-500 hover:border-2 hover:border-green-500"
      onClick={() => navigate(`/products/${catagory}/${title}`)}
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isLiked ? 'bg-green-500' : 'bg-gray-200'
          } transition-colors duration-300`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill={isLiked ? "white" : "none"}
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate" title={title}>
          {title}
        </h2>
        <div className="relative">
          <p 
            onClick={() => setShowFullDescription(!showFullDescription)}
            className={`text-gray-600 text-sm mb-4 cursor-pointer ${!showFullDescription ? 'line-clamp-2' : 'whitespace-pre-wrap'}`}
          >
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-green-600">${price}</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




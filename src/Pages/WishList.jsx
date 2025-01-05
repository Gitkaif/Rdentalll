import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WishlistProductCard from '../Components/WishlistProductCard';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WishList() {

  const notify = () => {
    toast.success(' Item removed Successfully!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation", 
      price: 99.99,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation", 
      price: 99.99,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 3,
      title: "Boat Earbudssssss",
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation", 
      price: 99.99,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
  ]);

  // Function to remove item from wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    notify();
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };


  return (
    <>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col relative bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)]"
    >
      <div className="container mx-auto px-4 pt-28 flex-grow relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-500 text-center">My Wishlist</h1>
        </div>
        
        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50"
          >
            <div className="text-gray-500 mb-4">
              <svg className="w-24 h-24 mx-auto animate-pulse text-green-400 hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-green-500 rounded-lg hover:bg-green-600 focus:shadow-outline focus:outline-none"
              >
                <span className="mr-2">Browse Items</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <div>
            {wishlistItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
                catagory={item.catagory}
                rating={item.rating}
                mrp={item.mrp}
                onRemove={() => handleRemove(item.id)}
                
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
    <ToastContainer />
    </>
  );
}

export default WishList;
import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../Components/emptyCart";
import HorizontalProductCard from "../Components/horizontalProductCard";
import { toast,ToastContainer } from 'react-toastify';

const Cart = () => {
  const itemRemoved = () => {
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

  const quantityUpdated = () => {
    toast.success(' Quantity updated Successfully!', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  // Sample cart data - replace with actual cart state management
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      originalPrice: 100,
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      name: "Product 1",
      price: 100,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      quantity: 1,
    },
    {
      id: 2,
      originalPrice: 150,
      description: "High quality wireless earbuds with noise ", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      name: "Product 2",
      price: 150,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      quantity: 2,
    },
    {
      id: 3,
      originalPrice: 200,
      description: "High quality wireless earbuds with noise jgkjdfhkgjhdkfjhgkdhkfjghkjdhfgjhdkjfghkjdfhgkjhcancellation", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      name: "Product 3",
      price: 200,
      catagory: "Electronics",
      rating: 4.5,
      mrp: 100,
      quantity: 3,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
    quantityUpdated();
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    itemRemoved();
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)] py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <HorizontalProductCard
                    key={item.id}
                    product={item}
                    onDelete={() => removeItem(item.id)}
                    onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}

                  />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/wishlist"
                  className="group inline-flex items-center gap-2 relative px-6 py-2 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="font-semibold tracking-wide">
                      Browse from Wishlist
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full mt-6 relative px-6 py-3 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Cart;

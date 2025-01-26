import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaBox, FaClock, FaMoneyBillWave, FaShippingFast, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, onSnapshot, query, where, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import { useContext } from "react";
import myContext from "../context/data/myContext";
import EmptyOrderPage from './emptyOrderPage';
import Loader from '../Components/Loader';

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  try {
    let date;
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp._seconds) {
      // Handle Firestore timestamp object
      date = new Timestamp(timestamp._seconds, timestamp._nanoseconds || 0).toDate();
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      console.error('Invalid timestamp format:', timestamp);
      return 'N/A';
    }

    if (isNaN(date.getTime())) {
      console.error('Invalid date object:', date);
      return 'N/A';
    }

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure order has default values to prevent undefined errors
  const safeOrder = {
    id: order.id || 'N/A',
    status: order.status || 'Processing',
    items: order.items || [],
    total: order.total || 0,
    createdAt: order.createdAt || new Date(),
    shippingAddress: order.shippingAddress || {},
    paymentMethod: order.paymentMethod || 'N/A'
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 mt-[-90px]"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FaClipboardList className="text-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Order #{safeOrder.id}</h2>
              <p className="text-sm text-gray-500">
                {formatDate(safeOrder.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(safeOrder.status)}`}>
              {safeOrder.status}
            </span>
            <div className="mt-2 text-right">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="font-bold text-lg text-primary">₹{safeOrder.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaBox className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="font-semibold">{safeOrder.items.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaShippingFast className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Shipping Method</p>
              <p className="font-semibold">{safeOrder.shippingMethod || 'Standard Delivery'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <FaMoneyBillWave className="text-primary" />
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold">{safeOrder.paymentMethod}</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '0' }}
          className="overflow-hidden"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 pt-4 border-t border-gray-200"
              >
                {safeOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FaBoxOpen className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.title || 'Unnamed Item'}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{(item.price || 0).toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-600">Per Unit</p>
                    </div>
                  </div>
                ))}

                {safeOrder.shippingAddress && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                    <div className="text-gray-600">
                      <p className="font-medium">{safeOrder.shippingAddress.firstName} {safeOrder.shippingAddress.lastName}</p>
                      <p>{safeOrder.shippingAddress.street}</p>
                      <p>{safeOrder.shippingAddress.city}, {safeOrder.shippingAddress.state}</p>
                      <p>PIN: {safeOrder.shippingAddress.pincode}</p>
                      {safeOrder.shippingAddress.phone && (
                        <p className="mt-1">Phone: {safeOrder.shippingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full text-center text-primary font-semibold hover:text-primary-dark transition-colors"
        >
          {isExpanded ? 'Show Less' : 'View Details'}
        </button>
      </div>
    </motion.div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUserId } = useContext(myContext);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!currentUserId) return;

      try {
        const userDocRef = doc(fireDB, "users", currentUserId);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists() || !userDocSnap.data().orders || userDocSnap.data().orders.length === 0) {
          setOrders([]);
          setIsLoading(false);
          return;
        }

        const orderIds = userDocSnap.data().orders;
        
        const orderPromises = orderIds.map(async (orderId) => {
          const orderDocRef = doc(fireDB, "orders", orderId);
          const orderDocSnap = await getDoc(orderDocRef);
          
          if (orderDocSnap.exists()) {
            const orderData = orderDocSnap.data();
            console.log("Raw Order Data:", orderData); // Debug log
            
            const itemsWithDetails = await Promise.all(
              (orderData.orderDetails?.items || []).map(async (item) => {
                try {
                  const productDocRef = doc(fireDB, "products", item.productId || item.id);
                  const productDocSnap = await getDoc(productDocRef);
                  
                  if (productDocSnap.exists()) {
                    const productData = productDocSnap.data();
                    return {
                      ...item,
                      title: productData.title || item.title,
                      image: productData.thumbnail || productData.imageUrl || item.image,
                      price: item.price || productData.price,
                      quantity: item.quantity || 1,
                      description: productData.description
                    };
                  }
                  return {
                    ...item,
                    image: item.thumbnail || item.imageUrl || item.image,
                    title: item.title || 'Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1
                  };
                } catch (err) {
                  console.error("Error fetching product details:", err);
                  return {
                    ...item,
                    image: item.thumbnail || item.imageUrl || item.image,
                    title: item.title || 'Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1
                  };
                }
              })
            );

            let createdAt;
            try {
              if (orderData.createdAt instanceof Timestamp) {
                createdAt = orderData.createdAt;
              } else if (orderData.createdAt?._seconds) {
                createdAt = new Timestamp(
                  orderData.createdAt._seconds,
                  orderData.createdAt._nanoseconds || 0
                );
              } else if (typeof orderData.createdAt === 'string') {
                const parsedDate = new Date(orderData.createdAt);
                if (!isNaN(parsedDate.getTime())) {
                  createdAt = Timestamp.fromDate(parsedDate);
                } else {
                  createdAt = Timestamp.now();
                }
              } else if (orderData.createdAt instanceof Date) {
                createdAt = Timestamp.fromDate(orderData.createdAt);
              } else {
                console.warn("Invalid or missing createdAt format:", orderData.createdAt);
                createdAt = Timestamp.now();
              }
            } catch (error) {
              console.error("Error processing date:", error);
              createdAt = Timestamp.now();
            }

            const total = orderData.orderDetails?.total || 
                         orderData.total || 
                         itemsWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Extract shipping address from various possible locations
            let shippingAddress = null;
            
            if (orderData.userInfo) {
              shippingAddress = {
                street: orderData.userInfo.address || '',
                city: orderData.userInfo.city || '',
                state: orderData.userInfo.state || '',
                pincode: orderData.userInfo.pincode || '',
                firstName: orderData.userInfo.firstName || '',
                lastName: orderData.userInfo.lastName || '',
                phone: orderData.userInfo.phone || ''
              };
            } else if (orderData.addressInfo) {
              shippingAddress = orderData.addressInfo;
            }

            console.log("Extracted Shipping Address:", shippingAddress); // Debug log

            return {
              ...orderData,
              id: orderDocSnap.id,
              createdAt: createdAt,
              status: orderData.orderStatus || orderData.status || 'Processing',
              items: itemsWithDetails,
              total: total,
              shippingAddress: shippingAddress,
              paymentMethod: orderData.paymentMethod || orderData.paymentDetails?.method || 'Standard Payment'
            };
          }
          return null;
        });

        const fetchedOrders = await Promise.all(orderPromises);
        const validOrders = fetchedOrders.filter(order => order !== null);

        const sortedOrders = validOrders.sort((a, b) => {
          const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        setOrders(sortedOrders);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, [currentUserId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to Load Orders
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-8 bg-primary">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FaClipboardList className="text-white text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                My Orders
              </h1>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence>
              {orders.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="space-y-6"
                >
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </motion.div>
              ) : (
                <EmptyOrderPage />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;

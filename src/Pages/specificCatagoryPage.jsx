import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import endodentics from '../assets/Endodentics.jpg';
import equipment from '../assets/equipments.jpg';
import restoratives from '../assets/restoratives.jpg';
import instruments from '../assets/instruments.webp';
import sterilization from '../assets/sterilization.webp';
import general from '../assets/general.jpg';

const SpecificCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add this useEffect for scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]); // Scroll to top whenever category changes

  // Get poster image based on category
  const getPosterImage = () => {
    switch(category.toLowerCase()) {
      case 'endodentics':
        return endodentics;
      case 'equipment':
        return equipment;
      case 'restoratives':
        return restoratives;
      case 'instruments':
        return instruments;
      case 'sterilization':
        return sterilization;
      case 'general Dentistry':
        return general;
      default:
        return endodentics; // Default fallback image
    }
  };

  // Simulated product data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "Dental Drill Kit",
          description: "Professional-grade dental drill kit with multiple attachments and speeds",
          price: 1299.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 2,
          title: "Dental Chair",
          description: "Ergonomic fully-adjustable dental chair with LED lighting",
          price: 4999.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 3,
          title: "Sterilization Unit",
          description: "Advanced autoclave sterilizer for dental instruments",
          price: 2499.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 4,
          title: "Dental Forceps Set",
          description: "Complete set of dental extraction forceps",
          price: 399.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 5,
          title: "Dental Curing Light",
          description: "LED curing light for dental composites",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 6,
          title: "Dental X-Ray Machine",
          description: "Digital dental X-ray system with sensor",
          price: 5999.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 7,
          title: "Dental Scaler",
          description: "Ultrasonic dental scaler for cleaning",
          price: 799.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 8,
          title: "Composite Kit",
          description: "Complete dental composite restoration kit",
          price: 449.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 9,
          title: "Dental Mirror Set",
          description: "Set of dental mirrors with handles",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 10,
          title: "Dental Suction Unit",
          description: "High-power dental suction system",
          price: 1499.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 11,
          title: "Root Canal Files",
          description: "Professional endodontic file set",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 12,
          title: "Dental Impression Material",
          description: "Premium dental impression material kit",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 13,
          title: "Dental Light",
          description: "LED dental operatory light",
          price: 899.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 14,
          title: "Dental Burs Kit",
          description: "Comprehensive dental bur set",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 15,
          title: "Dental Cabinet",
          description: "Mobile dental storage cabinet",
          price: 699.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 16,
          title: "Dental Cement",
          description: "Professional dental cement kit",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 17,
          title: "Dental Handpiece",
          description: "High-speed dental handpiece",
          price: 899.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 18,
          title: "Dental Implant Kit",
          description: "Complete dental implant system",
          price: 2999.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 19,
          title: "Dental Loupes",
          description: "Magnifying dental loupes with light",
          price: 999.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 20,
          title: "Dental Matrix System",
          description: "Professional dental matrix kit",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 21,
          title: "Dental Polishing Kit",
          description: "Complete dental polishing system",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 22,
          title: "Dental Retractor Set",
          description: "Professional dental retractor kit",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 23,
          title: "Dental Sealant Kit",
          description: "Complete dental sealant system",
          price: 179.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 24,
          title: "Dental Surgical Kit",
          description: "Professional dental surgery instruments",
          price: 1499.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 25,
          title: "Dental Tray Set",
          description: "Stainless steel dental instrument trays",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 26,
          title: "Dental Unit Water System",
          description: "Complete dental unit water purification system",
          price: 899.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 27,
          title: "Dental Vacuum Former",
          description: "Professional dental vacuum forming machine",
          price: 1299.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 28,
          title: "Dental Wax Kit",
          description: "Complete dental wax modeling kit",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 29,
          title: "Dental X-Ray Sensor",
          description: "Digital dental X-ray sensor",
          price: 3999.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 30,
          title: "Dental Zirconia Blocks",
          description: "Premium dental zirconia CAD/CAM blocks",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        },
        {
          id: 31,
          title: "Dental Articulator",
          description: "Professional dental articulator system",
          price: 599.99,
          image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe"
        },
        {
          id: 32,
          title: "Dental Bleaching Kit",
          description: "Professional teeth whitening system",
          price: 399.99,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
        },
        {
          id: 33,
          title: "Dental Camera System",
          description: "Intraoral dental camera with display",
          price: 1999.99,
          image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787"
        },
        {
          id: 34,
          title: "Dental Developer Unit",
          description: "Automatic X-ray film developer",
          price: 2499.99,
          image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
        },
        {
          id: 35,
          title: "Dental Education Model",
          description: "Professional dental teaching model",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        }
        // Add more sample products
      ]);
      setLoading(false);
    }, 1000);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Banner/Poster */}
        <div className="relative h-[300px] mb-12 rounded-xl overflow-hidden">
          <img
            src={getPosterImage()}
            alt={`${category} category`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/40 flex items-end justify-end">
            <h1 className="text-5xl font-bold text-white capitalize p-8">
              {category.replace(/-/g, ' ')}
            </h1>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex gap-8 pb-12">
          {/* Left Sidebar - 20% */}
          <div className="w-1/5 sticky top-24">
            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 transform transition duration-500 border-2 border-green-100 hover:border-green-500 backdrop-blur-sm bg-white/90">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-green-600 border-b-2 border-green-200 pb-2">Sort By</h3>
                <button 
                  onClick={() => {
                    // Get all radio buttons
                    const radioButtons = document.getElementsByName('sort');
                    // Uncheck all radio buttons
                    radioButtons.forEach(radio => {
                      radio.checked = false;
                    });
                  }}
                  className="text-sm px-2 py-1 text-green-600 hover:text-white border border-green-500 hover:bg-green-500 rounded transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-2">
                {['Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Popular'].map((option) => (
                  <label 
                    key={option} 
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-all duration-300 hover:bg-green-50 group relative overflow-hidden"
                  >
                    <input 
                      type="radio" 
                      name="sort"
                      onChange={(e) => {
                        if (e.target.checked) {
                          // Get all radio buttons in the group
                          const radioButtons = document.getElementsByName('sort');
                          // Uncheck all other radio buttons
                          radioButtons.forEach(radio => {
                            if (radio !== e.target) {
                              radio.checked = false;
                            }
                          });
                        }
                      }}
                      className="text-green-500 focus:ring-green-500 relative z-10"
                    />
                    <span className={`
                      text-gray-700 transition-colors duration-300 font-medium relative z-10
                      group-hover:text-green-600
                      [input:checked+&]:text-green-700
                      [input:checked+&]:rounded-md
                    `}>
                      {option}
                    </span>
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-green-50 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      [input:checked~&]:opacity-100
                      [input:checked~&]:bg-gradient-to-r 
                      [input:checked~&]:from-green-200/50
                      [input:checked~&]:to-transparent
                    `}/>
                  </label>
                ))}
              </div>
            </div>

            {/* Mini Category Banner */}
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <img
                src={getPosterImage()}
                alt="Category promotion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 flex items-end ">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg">Special Offer</h3>
                  <p className="text-sm">Up to 20% off on selected items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 80% */}
          <div className="w-4/5">
            {/* Products Grid - Fixed heights for different screen sizes */}
            <div className="h-[calc(120vh)] overflow-y-auto">
              {/* Products Count */}
              <div className="mb-6 flex justify-between items-center h-14 bg-slate-50 py-4 px-6 rounded-lg shadow-lg hover:shadow-xl border-2 border-green-400 transform  transition-all duration-300 animate-fadeIn">
                <h2 className="text-[clamp(1rem,2vw,1.25rem)] ml-[-10px] py-0 font-bold text-emerald-600 drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)] tracking-wider bg-gradient-to-r from-emerald-200/70 to-transparent p-2 rounded-lg animate-pulse transition-all duration-300">
                  {category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Products
                </h2>
                <span className="text-gray-600">
                  Showing {products.length} products
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 pb-12">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCategoryPage;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import MyState from './context/data/myState.jsx'
import './index.css'
import Home from './Home.jsx'
import AboutUs from './Pages/aboutUs.jsx'
import RootLayout from './RootLayout.jsx'
import SpecificCatagoryPage from './Pages/specificCatagoryPage.jsx'
import ProductDetailPage from './Pages/ProductDetailPage.jsx'
import Cart from './Pages/Cart.jsx'
import WishList from './Pages/WishList.jsx'
import ContactUs from './Components/contactUs.jsx'
import Profile from './Pages/profile.jsx'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './admin/AdminDashboard.jsx'
import { ProtectedRouteForUser, ProtectedRouteForAdmin } from './ProtectedRoute/ProtectedRoute.jsx'

// Protected Route Components

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyState>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />} >
              <Route path="/" element={<Home />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/products/:category" element={<SpecificCatagoryPage />} />
              <Route path="/products/:category/:title" element={<ProductDetailPage />} />
              <Route path="/cart" element={
                <ProtectedRouteForUser>
                  <Cart />
                </ProtectedRouteForUser>
              }/>
              <Route path="/wishlist" element={
                <ProtectedRouteForUser>
                  <WishList />
                </ProtectedRouteForUser>
              }/>
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/profile" element={
                <ProtectedRouteForUser>
                  <Profile />
                </ProtectedRouteForUser>
              }/>
              <Route path="/admin" element={
                <ProtectedRouteForAdmin>
                  <AdminDashboard />
                </ProtectedRouteForAdmin>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </MyState>
  </StrictMode>,
)

import { Outlet } from 'react-router-dom';
import Login from './pages/AuthPages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './pages/Admin/Admin';
import Register from './pages/Register/Register';
import RequireAuth from './redux/auth/RequireAuth';
import PersistLogin from './redux/auth/PersistLogin';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
// import Prefetch from './redux/auth/Prefetch';
import NewNote from './redux/Products/NewProduct';
import EditNote from './redux/Products/EditProduct';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import AccountDetails from './pages/AccountDetails/AccountDetails';
// import Test from './components/Test';
import RestaurantNew from './redux/Restaurant/RestaurantNew';
import RestaurantEdit from './redux/Restaurant/RestaurantEdit';
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails';
import ShoppingCartStepper from './pages/ShoppingCartStepper/ShoppingCartStepper';
import { useEffect } from 'react';

function App() {

  const Layout = () => {

    return (
      <>
        <Navbar />
        <Outlet />
        <div className=' relative mt-[15em]'>
          <Footer />
        </div>
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route element={<PersistLogin />}>
          {/* <Route element={<Prefetch />}> */}
          <Route index element={<Home />} />
          <Route path="prductDetails/:id" element={<ProductDetails />} />
          <Route path="accountSettings" element={<AccountDetails />} />
          <Route path="restaurantDetails/:id" element={<RestaurantDetails />} />
          <Route path="shoppingDetails" element={<ShoppingCartStepper />} />
          {/* </Route> */}
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PersistLogin />}>
          {/* <Route element={<Prefetch />}> */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new" element={<NewNote />} />
            <Route path="/admin/edit/:id" element={<EditNote />} />
            <Route path="/admin/restaurant/new" element={<RestaurantNew />} />
            <Route path="/admin/restaurant/:id" element={<RestaurantEdit />} />
          </Route>
        </Route>
        {/* </Route> */}
        {/* End Dash */}
      </Route>
    </Routes>

  )
}

export default App;

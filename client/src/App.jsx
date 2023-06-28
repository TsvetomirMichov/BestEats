import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/AuthPages/Login';
import Navbar from './components/Navbar';
import Category from './components/Category';
import Admin from './pages/Admin/Admin';
import Register from './pages/Register/Register';
import RequireAuth from './redux/auth/RequireAuth';
import PersistLogin from './redux/auth/PersistLogin';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import NotesList from './redux/notes/NotesList';
import Prefetch from './redux/auth/Prefetch';
import NewNote from './redux/notes/NewNote';
import EditNote from './redux/notes/EditNote';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Category />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Prefetch />}>
              <Route index element={<Home />} />
              <Route path="prductDetails/:id" element={<ProductDetails />} />
            </Route>
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Prefetch />}>
              <Route path="/admin" element={<Admin />}>
                {/* <Route path=":id" element={<EditNote />} /> */}
              </Route>
              <Route path="/admin/new" element={<NewNote />} />
              <Route path="/admin/edit/:id" element={<EditNote />} />
            </Route>
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>

  )
}

export default App;

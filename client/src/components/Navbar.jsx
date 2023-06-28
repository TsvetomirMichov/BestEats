import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag, AiFillShopping } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb'
import { FaUserFriends, FaWallet } from 'react-icons/fa'
import { MdFavorite, MdHelp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { useGetSeachDataQuery } from '../redux/notes/noteApiSlice';
import { addProduct } from '../redux/cart/cartSlice';
import SearchedItems from './SearchedItems';
import { useLogoutMutation } from '../redux/auth/authApiSlice';
import { useAppselector } from '../redux/store';


const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [opened, setOpened] = useState(false)
  const [query, setQuery] = useState("")
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dataFromQuery, setDataFromQuery] = useState(null);

  const [sendLogout, {isSuccess}] = useLogoutMutation()

  const token = useAppselector((state) => state.auth.token)

  const { data = [], isLoading, isFetching, isError } = useGetSeachDataQuery()

  const PF = "http://localhost:1337/images/";

  // Function to toggle the menu state
  const toggleMenu = async () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let res = data.filter((item) => {
      return query.toLowerCase() === '' ? item : item.title.toLowerCase().includes(query.toLowerCase());
    }).map(item => item)
    // console.log("res data", res)
    setDataFromQuery(res)
    // console.log(dataFromQuery)

  }, [isMenuOpen, query])

  const products = useSelector((state) => state.cart.products)

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-1'>
      {/* Left side */}
      <div className='flex items-center'>
        {/* <div onClick={() => setNav(!nav)} className='cursor-pointer block sm:hidden'>
          <AiOutlineMenu size={30} />
        </div> */}
        <Link to="/" className='no-underline'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            Best <span className='font-bold'>Eats</span>
          </h1>
        </Link>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
          <p className='bg-black text-white rounded-full p-2'>Delivery</p>
          <p className='p-2'>Pickup</p>
        </div>
      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full  flex items-center px-2 w-[150px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
          onChange={(e) => setQuery(e.target.value)}
          onClick={toggleMenu}
        />
      </div>
      {/* Query data form search */}

      {/* Cart button */}
      <div className='flex flex-row-reverse '>
        <button className="bg-black text-white flex md:flex items-center p-3 m-2 rounded-full relative" onClick={() => setOpened(prev => !prev)}>
          <BsFillCartFill size={20} className="mr-2" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-orange-500 text-white text-[1.2em] rounded-full h-6 w-6 flex items-center justify-center">
            {/* Replace '5' with your actual data */}
            {products.length}
          </span>
          Cart
        </button>
        {token ?
          <button onClick={sendLogout} className='flex items-center  rounded-full  text-[14px]'>
            <p className='bg-black text-white rounded-full p-2'>Log out</p>
          </button>
          : null}
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}

      {opened && <Cart />}
      {isMenuOpen && <SearchedItems items={dataFromQuery} />}
    </div>
  );
};

export default Navbar;
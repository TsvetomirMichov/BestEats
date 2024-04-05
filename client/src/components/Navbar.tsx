import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { useGetSeachDataQuery } from '../redux/Products/productApiSlice';
import SearchedItems from './SearchedItems';
import { useLogoutMutation } from '../redux/auth/authApiSlice';
import { RootState, useAppselector } from '../redux/store';
import jwt_decode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

type DecodetTokenType = {
  id: number,
  name: string,
  email: string,
  phone: number,
  role: string
} | null


type ProductDataType = {
  _id: number,
  title: string,
  text: string,
  category: string,
  price: number,
  todoImage: string
}

const Navbar = () => {

  const [opened, setOpened] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAccountOpen, setAccountOpen] = useState<boolean>(false);
  const [dataFromQuery, setDataFromQuery] = useState<ProductDataType[]>([]);

  const [sendLogout] = useLogoutMutation()

  const token = useAppselector((state: RootState) => state.auth.token)

  let decodedToken: DecodetTokenType = null
  if (token) {
    decodedToken = jwt_decode(token)
  }


  const { t } = useTranslation()

  const { data = [] } = useGetSeachDataQuery('')

  // Function to toggle the menu state
  const toggleMenu = async () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let res = data.filter((item: ProductDataType) => {
      return query.toLowerCase() === '' ? item : item?.title.toLowerCase().includes(query.toLowerCase());
    }).map((item: ProductDataType) => item)
    console.log("res data", res)
    setDataFromQuery(res)
    // console.log(dataFromQuery)

  }, [isMenuOpen, query])

  const products = useSelector((state: RootState) => state.cart.products)

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-1'>
      {/* Left side */}
      <div className='flex items-center'>

        <Link to="/" className='no-underline'>
          <h1 className='text-md sm:text-3xl lg:text-4xl px-2 flex'>
            {t("headerSiteName.text1")} <span className='font-bold'>{t('headerSiteName.text2')} </span>
          </h1>

        </Link>

      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[150px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder={t("headerSeachPlaceHolder")}
          onChange={(e) => setQuery(e.target.value)}
          onClick={toggleMenu}
        />
      </div>
      {/* Query data form search */}

      {/* Cart button */}
      <div className='flex flex-row-reverse items-center justify-center'>
        <button className="bg-black  flex md:flex items-center text-white p-2 m-1 sm:p-3 sm:m-2 rounded-full relative" onClick={() => setOpened(prev => !prev)}>
          <BsFillCartFill size={20} className="mr-2" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-orange-500 text-white text-[1.2em] rounded-full h-6 w-6 flex items-center justify-center">
            {/* Replace '5' with your actual data */}
            {products.length}
          </span>
          <span className='text-white hidden sm:flex'>
            {t('cart')}
          </span>
        </button>

        {token ?
          <div className="relative inline-block text-left align-middle justify-center">
            <div>
              <button onClick={() => setAccountOpen(prev => !prev)} className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-black p-1 px-1 sm:p-2 sm:px-2 text-3xl font-semibold text-white shadow-sm  hover:bg-black" >
                <CgProfile class="image-user" />
              </button>
            </div>

            <div className={isAccountOpen ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} >
              <div className="py-1 " role="none">
                <Link to={'/accountSettings'} onClick={() => setAccountOpen(prev => !prev)} className="text-gray-700 block px-4 py-2 text-sm" >
                  {t("account.myAccount")}
                </Link>
                {
                  decodedToken?.role == 'Admin'
                    ?
                    <Link onClick={() => setAccountOpen(prev => !prev)} to={'/admin'} className="text-gray-700 block px-4 py-2 text-sm" >
                      {t("account.adminPage")}
                    </Link>
                    :
                    <></>
                }
                <button onClick={sendLogout} className='flex items-center rounded-full text-[14px] py-2 ml-2'>
                  <p className='px-2 py-1 bg-orange-100'>
                    {t("account.logout")}
                  </p>
                </button>
              </div>
            </div>

          </div>
          :
          <div className="relative inline-block text-left align-middle justify-center">
            <div>
              <button onClick={() => setAccountOpen(prev => !prev)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 sm:px-2 sm:py-2 text-3xl font-semibold text-gray-900 shadow-sm  hover:bg-gray-50" >
                <CgProfile />
              </button>
            </div>

            <div className={isAccountOpen ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"} >
              <div className="py-1" role="none">
                <Link onClick={() => setAccountOpen(prev => !prev)} className='none md:flex text-1xl text-white  rounded-3xl p-3' to={'/login'}>Log in</Link>
              </div>
            </div>
          </div>
        }
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {/* {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''} */}

      {opened && <Cart />}
      {isMenuOpen && <SearchedItems itemData={dataFromQuery} />}
    </div>
  );
};

export default Navbar;
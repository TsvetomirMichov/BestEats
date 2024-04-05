import  { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../redux/cart/cartSlice'
import jwt_decode from "jwt-decode";
import { RootState, useAppselector } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { useCreateNewOrderMutation } from '../redux/cart/cartApiSlice'
import { useTranslation } from 'react-i18next';


type DecodetTokenType = {
  id: number,
  name: string,
  email: string,
  phone: number,
  role: string
}

const Cart = () => {
  const productsList = useSelector((state: RootState) => state.cart.products)
  const token = useAppselector((state: RootState) => state.auth.token)
  
  const [createOrder, result] = useCreateNewOrderMutation()
  
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null);
  const navigate = useNavigate()
  
  const { t } = useTranslation()

  let totalPrice: number = 0;
  const total = () => {
    productsList.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    if (token) {
      const decodedToken: DecodetTokenType = jwt_decode(token);
      setUserName(decodedToken.name);
      setPhone(decodedToken.phone);
    }
  }, [token]);

  const handlePayment = async (e:any) => {
    e.preventDefault()
    let orderDetails:any = [];

    try {
      productsList?.forEach((item) => {
        orderDetails.push(item);
      });

      if (userName !== "" && phone !== null && orderDetails.length > 0 && totalPrice > 0) {
        await createOrder({ orderDetails, userName, phone, totalPrice }).unwrap()
        if (result) {
          dispatch(resetCart());

        }

      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart absolute right-10 top-20 z-50 bg-orange-100 p-8 shadow-lg max-w-[20.5em]">
    <h1 className="mb-6 text-gray-700 font-bold text-1xl">{t('cartTranslation.title')}</h1>
    {productsList?.map((item:any, index) => (
      <div className="item flex items-center gap-6 mb-6" key={index}>
        <img className="w-[5.5em] h-[5em] object-cover" src={item.img} alt="" />
        <div className="max-w-[6.5em] flex flex-col">
          <p className="text-lg font-medium flex-wrap">{item.title}</p>
          <div className="price text-gray-500 mb-2 text-sm">
            {item.quantity} x ${item.price}
          </div>
        </div>
        <AiFillDelete className="text-red-500 text-2xl cursor-pointer" onClick={() => dispatch(removeItem(item.id))} />
      </div>
    ))}
    <div className="total flex justify-between font-medium text-xl mb-4">
      <span>{t('cartTranslation.subtotal')}</span>
      <span>${total()}</span>
    </div>
    <button className="w-36 py-2 flex items-center justify-center gap-4 cursor-pointer bg-orange-500 text-white font-medium mb-4" onClick={(e) => handlePayment(e)}>{t('cartTranslation.proceedToCheckout')}</button>
    <span className="reset text-red-700 text-xl cursor-pointer" onClick={() => dispatch(resetCart())}>{t('cartTranslation.resetCart')}</span>
  </div>
  );
};

export default Cart;
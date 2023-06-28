import React, { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, resetCart } from '../redux/cart/cartSlice'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useAppselector } from '../redux/store'


const Cart = () => {
    const productsList = useSelector(state => state.cart.products)
    const token = useAppselector((state) => state.auth.token)

    const dispatch = useDispatch()
    let orderDetails= [];
    let [userName, setCurrentUser] = useState("")
    let phone 
    const effRan=useRef(false)
   
    const PF = "http://localhost:1337/images/";

    const totalPrice = () => {
        let total = 0;
        productsList.forEach((item) => total += item.price * item.quantity)
        return total.toFixed(2)
    }
 
    useEffect(() => {
        if(effRan.current == true){
            productsList?.forEach((item) => {
                orderDetails.push(item)
              });

            if (token) {
                const decodedToken = jwt_decode(token)
                setCurrentUser(decodedToken.name)
            }
        }
        return ()=>effRan.current=true
    }, [productsList])

    const handlePayment = async (e) => {
        try {
             await axios.post('http://localhost:1337/createOrder', {  orderDetails ,userName ,phone }).then( dispatch(resetCart()));

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="cart absolute right-10 top-20 z-50 bg-orange-100 p-8 shadow-lg max-w-[20.5em]">
            <h1 className="mb-6 text-gray-700 font-bold text-1xl">Products in your cart</h1>
            {productsList?.map((item) => (
                <div className="item flex items-center gap-6 mb-6" key={item.id}>
                    <img className="w-[5.5em] h-[5em] object-cover" src={PF + item.img} alt="" />
                    <div className="details">
                        <h1 className="text-xl font-medium">{item.title}</h1>
                        <div className="price text-gray-500 mb-2 text-sm">
                            {item.quantity} x ${item.price}
                        </div>
                    </div>
                    <AiFillDelete className="delete text-red-500 text-2xl cursor-pointer" onClick={() => dispatch(removeItem(item.id))} />
                </div>
            ))}
            <div className="total flex justify-between font-medium text-xl mb-4">
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button className="w-36 py-2 flex items-center justify-center gap-4 cursor-pointer bg-orange-500 text-white font-medium mb-4" onClick={() => handlePayment()}>PROCEED TO CHECKOUT</button>
            <span className="reset text-red-700 text-xl  cursor-pointer" onClick={() => dispatch(resetCart())}>Reset Cart</span>
        </div>
    )
}

export default Cart
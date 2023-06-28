import React, { useState } from 'react'
import { useGetNotesQuery } from '../redux/notes/noteApiSlice'
import { useDispatch } from 'react-redux'
import { AiFillShopping } from 'react-icons/ai'
import { addProduct } from '../redux/cart/cartSlice'
import { Link } from 'react-router-dom'

export const FoodsHolder = ({ noteId }) => {
    const [quantity, setQuantity] = useState(1);

    const { productData } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            productData: data?.entities[noteId]
        }),
    })
    const dispatch = useDispatch()

    const PF = "http://localhost:1337/images/";

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 pt-4' >
            <div
                key={productData.id}
                className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
                <Link to={`prductDetails/${productData.id}`}>
                    <img
                        src={PF + productData.todoImage}
                        alt={productData.title}
                        className='w-full h-[15em] object-cover rounded-t-lg'
                    />
                </Link>
                <div className='flex justify-between px-2 py-4'>
                    <p className='font-bold text-1xl'>{productData.title}</p>
                    <div className="flex items-center">
                        <button
                            className="flex items-center justify-center"
                            onClick={() =>
                                dispatch(
                                    addProduct({
                                        id: productData.id,
                                        title: productData.title,
                                        desc: productData.text,
                                        price: productData.price,
                                        img: productData.todoImage,
                                        quantity
                                    })
                                )
                            }
                        >
                            <AiFillShopping className="w-6 h-6" /> {/* Adjust the width and height as needed */}
                        </button>
                        <span className="bg-orange-500 text-white p-1 rounded-full ml-2">
                            {productData.price}
                        </span>
                    </div>
                </div>
            </div>
        </div> 
    )
}
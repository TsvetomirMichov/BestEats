import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetNotesQuery } from '../../redux/notes/noteApiSlice'
import { AiFillShopping } from 'react-icons/ai'
import { addProduct } from '../../redux/cart/cartSlice'
import { useDispatch } from 'react-redux'

const ProductDetails = () => {

  let { id } = useParams()
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    }),
  })
  console.log(note.price)

  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(note.price);
  const dispatch = useDispatch()

  const PF = "http://localhost:1337/images/";

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <div className="flex flex-row mr-8 ml-8 mt-8 ">
        <img
          className="w-full h-[20em] object-cover cursor-pointer mb-4 rounded-2xl "
          src={PF + note.todoImage}
          alt=""
        />
      </div>

      <div className="flex flex-col ml-[2.5em] md:ml-0">
        <h1 className='text-[2em] font-bold'>{note.title}</h1>
        <span className="my-3 text-xl font-semibold  ">${currentPrice}</span>
        <div className="quantity flex items-center">
          <button
            className="border px-2 py-1"
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button className="border px-2 py-1" onClick={() => setQuantity((prev) => prev + 1)}>
            +
          </button>
        </div>
        <button
          className="flex w-[10em] items-center gap-2 bg-blue-500 text-white font-medium py-2 px-4 mt-4"
          onClick={() =>
            dispatch(
              addProduct({
                id: note.id,
                title: note.title,
                desc: note.text,
                price: currentPrice,
                img: note.todoImage,
                quantity
              })
            )
          }
        >
          <AiFillShopping /> ADD TO CART
        </button>
        <hr className="my-4 w-[5em]" />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr className="my-4 w-[5em]" />
          <p className='w-[25em]'>{note.text}</p>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails
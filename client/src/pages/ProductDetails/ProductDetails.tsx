import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSignleProductQuery } from '../../redux/Products/productApiSlice'
import { AiFillShopping } from 'react-icons/ai'
import { addProduct } from '../../redux/cart/cartSlice'
import { useDispatch } from 'react-redux'
import RelatedProducts from './RelatedProducts'
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa";

const ProductDetails = () => {

  let { id } = useParams()

  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(1);
  const [category, setCategory] = useState("");

  const { data: product, isLoading } = useGetSignleProductQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.price)
      setCategory(product.category)
    }

  }, [product])

  const dispatch = useDispatch()

  if (isLoading) return <div>Loading...</div>
  if (!product) return <div>Missing post!</div>

  // console.log(category)

  return (
    <div className='flex flex-col h-full '>
      <div className="flex flex-col md:flex-row mt-[5em] ">
        <div className="flex flex-row sm:mr-[6em] sm:ml-[5em]">
          <img
            className="w-full h-[30em] object-cover mb-4 rounded-2xl "
            src={product.todoImage}
            alt=""
          />
        </div>
        <div className="flex flex-col ml-[2.5em] md:ml-0">
          <h1 className='text-[2em] font-bold'>{product.title}</h1>
          <span className="my-5 text-2xl font-semibold  ">${currentPrice}</span>
          <div className="quantity flex items-center my-2">
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
            className="flex w-[11em] items-center gap-2 bg-orange-400 text-white font-medium py-2 px-4 mt-4"
            onClick={() =>
              dispatch(
                addProduct({
                  id: product.id,
                  title: product.title,
                  desc: product.text,
                  price: currentPrice,
                  img: product.todoImage,
                  quantity
                })
              )
            }
          >
            <AiFillShopping />  ADD TO CART
          </button>
          <div className='flex w-full flex-col'>

            <hr className="my-4 w-[100%] block" />
            <div className="w-full flex flex-col gap-5 flex-wrap">
              <span className='font-bold text-2xl'>DESCRIPTION</span>
              <p className='max-w-[25em] text-xl '>{product.text}</p>
            </div>

          </div>
        </div>
      </div>
      <div className=' h-full  mt-[10em]'>
        <div className='flex gap-2 items-center mb-2 ml-[1em] md:ml-[2em]'>
        <h1 className='text-white bg-orange-400 p-5 rounded-lg text-xl font-bold w-fit'>Simular Products </h1> <div className=' items-center justify-center'><FaLongArrowAltDown class="arrow" /> </div> 
        </div>
        {category.length > 0 ? <RelatedProducts category={category} filterItem={product?.title} /> : <></>}
      </div>
    </div>
  )
}

export default ProductDetails

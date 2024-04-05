import React, { useState } from 'react';
import { useGetSeachDataQuery } from '../redux/Products/productApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux'
import { AiFillShopping } from 'react-icons/ai'
import { addProduct } from '../redux/cart/cartSlice'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next';


type ProductDataType = {
  _id: number,
  title: string,
  text: string,
  category: string,
  price: number,
  todoImage: string
}


const Food = () => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);

  const [category, setGategorySelected] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const { data = [] } = useGetSeachDataQuery('') // Pull all product data


const { t } = useTranslation()

  const handleChange = (event: any) => {
    setGategorySelected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  let categories: string[] = [];

  data.forEach((item: ProductDataType) => {
    categories.push(item.category);
  });


  // Use Set to eliminate duplicates
  const uniqueCategories = [...new Set(categories)];

  return (

    <div className='flex w-full flex-col bg-[#FFFCF2]'>
      <div className='flex w-full flex-col'>
        <h1 className='text-[#CC3333] font-bold text-4xl m-auto'>
        {t("mainFoodItems.heading")}
        </h1>
        <div className='flex flex-row w-full justify-between items-center'>
          <p className='flex flex-row font-extrabold space-x-1 ml-[5%] '>
            <span className='text-[1.5em] sm:text-[2em] text-[#2A435D]'>  {t("mainFoodItems.superDeals.text1")} </span>
            <span className='text-[1.5em] sm:text-[2em] text-[#CC3333]'>  {t("mainFoodItems.superDeals.text2")} </span>
          </p>
          <div className='w-auto flex justify-center items-center pr-5'>
            <FormControl sx={{ m: 1, minWidth: 120, }}>
              <InputLabel id="demo-controlled-open-select-label" sx={{ color: "#CC3333" }}>Products</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={category}
                label="Age"
                onChange={handleChange}
                sx={{ borderColor: "#CC3333", color: "#CC3333" }}
              >
                <MenuItem value="" sx={{ color: "#CC3333", fontWeight: 600 }} className="uppercase text-md font-bold">
                  <p>None</p>
                </MenuItem>
                {uniqueCategories?.map(((item, index) => (
                  <MenuItem sx={{ p: "1em", color: "#CC3333", fontWeight: 700 }} key={index} value={item} className="uppercase text-sm font-bold">{item}</MenuItem>
                )
                ))}

              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1'>
        {
          data?.filter((item: ProductDataType) => category !== "" ? item.category === category : item).map((productData: ProductDataType, index: number) => {
            return (
              <div className=" m-auto my-10" key={index}>
                <div
                  key={productData._id}
                  className="border shadow-lg rounded-lg hover:scale-105 duration-300 w-[20em]  sm:w-[25em]"
                >
                  <Link to={`prductDetails/${productData._id}`}>
                    <img
                      src={productData.todoImage}
                      alt={productData.title}
                      className="w-[100%] h-[20em] object-cover rounded-t-md"
                    />
                  </Link>
                  <div className="flex justify-between px-2 py-4">
                    <p className="font-bold text-1xl">{productData.title}</p>
                    <div className="flex items-center">
                      <button
                        className="flex items-center justify-center"
                        onClick={() =>
                          dispatch(
                            addProduct({
                              id: productData._id,
                              title: productData.title,
                              desc: productData.text,
                              price: productData.price,
                              img: productData.todoImage,
                              quantity
                            })
                          )
                        }
                      >
                        <AiFillShopping className="w-6 h-6" />
                      </button>
                      <span className="bg-orange-500 text-white p-1 rounded-full ml-2">
                        {productData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  );

}

export default Food;
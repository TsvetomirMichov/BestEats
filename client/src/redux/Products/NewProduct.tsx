import axios from 'axios'
import { useState } from 'react'
import { BsFileArrowUp } from "react-icons/bs"
import DefautrPic from "../../assets/uloadFIle.png"
import { useNavigate } from "react-router-dom";
import React from 'react';

const NewNote = () => {
    const [text, setTodo] = useState('');
    const [title, setTodoTitle] = useState("");
    const [category, setTodoCategory] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [todoImage, settodoImage] = useState<File | null>(null); // Explicit type for clarity

    const navigate = useNavigate()

    const newPost = {
        title,
        text,
        todoImage,
        category,
        price
    }

    const fetchTodos = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (todoImage) {
            const data = new FormData()
            data.append("file", todoImage)
            data.append('upload_preset', "foodordering");

            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", data)

                const secure_ulr = res.data.secure_url

                newPost.todoImage = secure_ulr
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const newProductCreated = await axios.post("https://besteats-production.up.railway.app/newProduct", newPost)
            if (newProductCreated.status === 200) {
                navigate("/admin")
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className='w-full h-full '>
            <p className='text-5xl font-bold mt-[1em] ml-[1em]'>Create new Product</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-900" />
            <form onSubmit={fetchTodos} className=" h-full gap-4 pt-5 grid grid-cols-1 md:grid-cols-2 rounded-3xl mb-[100px] ml-[2em]  mt-[50px]" encType="multipart/form-data"  >
                <div className='flex flex-col w-[20em] sm:w-[30em] md:w-[20em] lg:w-[35em] gap-5 '>
                    <input className="border-orange-300 border-2 h-[50px] border-rounded  text-[25px]"
                        placeholder="Enter todo title"
                        name="title"
                        maxLength={100}
                        onChange={e => setTodoTitle(e.target.value)}
                    />
                    <textarea className="border-orange-300 border-2 h-[350px] border-rounded text-[25px]"
                        placeholder="Enter todo text"
                        rows={10}
                        cols={150}
                        name="text"
                        maxLength={500}
                        onChange={e => setTodo(e.target.value)}
                    />
                    {/* <ReactQuill className='h-full ' theme="snow" value={text} onChange={setTodo} />; */}
                </div>
                <div className='flex flex-col md:flex-col w-[15em] gap-5 mt-[-1em] '>
                    <fieldset className='flex flex-col gap-3 border border-1 border-orange-300 w-full py-2 p-2'>
                        <legend className='flex text-center text-[20px] font-sans font-bold'>Select a category</legend>
                        <div>
                            <input type="radio" id="Art" name="Radio1" onChange={() => setTodoCategory('Burgers')} />
                            <label htmlFor="Art" className='p-2 text-black  font-bold text-[20px]'>Burgers</label>
                        </div>
                        <div>
                            <input type="radio" id="Science" name="Radio1" onChange={() => setTodoCategory('Pizza')} />
                            <label htmlFor="Science" className='p-2 text-black  font-bold text-[20px]'>Pizza</label>
                        </div>
                        <div>
                            <input type="radio" id="Technology" name="Radio1" onChange={() => setTodoCategory('Salad')} />
                            <label htmlFor="Technology" className='p-2 text-black  font-bold text-[20px]'>Salad</label>
                        </div>
                        <div>
                            <input type="radio" id="Technology" name="Radio1" onChange={() => setTodoCategory('Chicken')} />
                            <label htmlFor="Technology" className='p-2 text-black  font-bold text-[20px]'>Chicken</label>
                        </div>
                        <div>
                            <input type="radio" id="Technology" name="Radio1" onChange={() => setTodoCategory('Appetizers')} />
                            <label htmlFor="Technology" className='p-2 text-black  font-bold text-[20px]'>Appetizers</label>
                        </div>
                        <div className='flex'>
                            <input className='border border-orange-700 border-1' type="number" id="price" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                            />
                            <label htmlFor="price" className='p-2 text-black font-bold text-[20px]'>Price</label>
                        </div>
                    </fieldset>

                    <div className='flex flex-col justify-center items-center border border-1 border-orange-300 w-full p-2'>
                        <img className='w-[10em] h-[10em] ' src={todoImage ? URL.createObjectURL(todoImage) : DefautrPic} alt="" />
                        <div className='flex flex-row justify-center items-center gap-5 p-2'>
                            <span className='text-[1.5em]  text-black font-bold mt-3'>Upload</span>
                            <label htmlFor="file" className='text-[2em] animate-pulse mt-5 '> <BsFileArrowUp /></label>   {/* The image that's gettign the input*/}
                            <input type="file" id='file' style={{ display: "none" }} onChange={e => settodoImage(e.target?.files![0])} />
                        </div>
                        <button className="bg-transparent font-semibold text-[1.5em] bg-orange-400 text-black  py-2 px-4 mt-5  rounded-md" type="submit"  >Submit Todo</button>
                    </div>

                </div>
            </form>
        </main>
    )
}

export default NewNote

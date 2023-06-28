import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { useGetNotesQuery, useUpdateRecepiMutation } from './noteApiSlice'
import axios from 'axios'
import { BsFileArrowUp } from 'react-icons/bs'


const EditNote = () => {
    let { id } = useParams()
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })
    console.log(note)
    const PF = "http://localhost:1337/images/";
    const [text, setTodo] = useState('');
    const [title, setTodoTitle] = useState("");
    const [category, setTodoCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [todoImage, settodoImage] = useState(null);
    const [updatedRecepi, { isSuccess }] = useUpdateRecepiMutation()

    useEffect(() => {
        if (note) {
            setTodoTitle(note.title);
            setTodo(note.text);
            setTodoCategory(note.category);
            setPrice(note.price);
        }
    }, [note]);
    const initialNote = {
        id,
        title,
        text,
        todoImage: todoImage !== null ? todoImage : " ",
        category,
        price
    }
    const fetchTodos = async (e) => {
        e.preventDefault();
        if (todoImage !== null) {
            const data = new FormData()
            const filename = Date.now() + todoImage.name
            data.append("name", filename)
            data.append("file", todoImage)
            initialNote.todoImage = filename
            // console.log(filename)
            // console.log(todoImage)
             try {
                await axios.post("http://localhost:1337/upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            // await axios.post("http://localhost:1337/home", {text,title,createdBy:user.name,picture})
            await updatedRecepi({ initialNote })
            redirect('/admin')
        } catch (err) {
            console.log(err)
        }
    }
    if (note) {
        return (
            <div>
                <p className='text-5xl font-bold mt-[1em] ml-[1em]'>Update Product</p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-900" />
                <form onSubmit={fetchTodos} className=" h-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 rounded-3xl  mb-[100px] ml-[1em] md:ml-[5em]  mt-[50px]" encType="multipart/form-data"  >
                    <div className='col-start-1 col-end-2 flex flex-col gap-5'>
                        <input className="border-orange-300 border-2 h-[50px] border-rounded  text-[25px]"
                            placeholder="Enter todo title"
                            name="title"
                            maxLength={100}
                            value={title}
                            onChange={e => setTodoTitle(e.target.value)}
                        />
                        <textarea className="border-orange-300 border-2 h-[350px] border-rounded text-[25px]"
                            placeholder="Enter todo text"
                            rows={10}
                            cols={150}
                            value={text}
                            name="text"
                            maxLength={500}
                            onChange={e => setTodo(e.target.value)}
                        />
                        <div className='flex flex-row p-2'>
                            <fieldset className='flex flex-col gap-3 mt-[10px] h-auto  border border-1 border-orange-300 w-[25em] p-5'>
                                <legend className='flex text-center text-[2em] font-sans font-bold'>Select a category</legend>
                                <div>
                                    <input type="radio" id="Art" checked={category == "Burgers" ? true : false} name="Radio1" onChange={() => setTodoCategory('Burgers')} />
                                    <label htmlFor="Art" className='p-2 text-teal-900 font-bold text-[1.5em]'>Burgers</label>
                                </div>
                                <div>
                                    <input type="radio" id="Science" name="Radio1" checked={category == "Pizza" ? true : false} onChange={() => setTodoCategory('Pizza')} />
                                    <label htmlFor="Science" className='p-2 text-teal-900 font-bold text-[1.5em]'>Pizza</label>
                                </div>
                                <div>
                                    <input type="radio" id="Technology" name="Radio1" onChange={() => setTodoCategory('Fruit')} />
                                    <label htmlFor="Technology" className='pt-2 text-teal-900 font-bold text-[1.5em]'>Fruit</label>
                                </div>
                                <div className='flex flex-row '>
                                    <input className='w-[4em] border-orange-700 border-1' type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <label htmlFor="price" className='p-2 text-teal-900 font-bold text-[1.5em] '>Update Price</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className='flex flex-col w-[10em] gap-4 ml-5 md:ml-10  '>
                        <div className='flex flex-col  h-1/2 border border-1 border-orange-300 w-[20em] pb-10'>
                            {/* <img className='w-full h-full ' src={note.todoImage ? URL.createObjectURL(PF+todoImage) : DefautrPic} alt="" /> */}
                            <img className='w-full h-[20em] ' src={todoImage !== null ? URL.createObjectURL(todoImage) : PF + note.todoImage} alt="" />
                            <div className='flex flex-row gap-5'>
                                <span className='text-[1.5em]  text-black font-bold mt-3 capitalize'>Upload</span>
                                <label htmlFor="file" className='text-[2em] animate-pulse mt-3 '> <BsFileArrowUp /></label>   {/* The image that's gettign the input*/}
                                <input type="file" id='file' style={{ display: "none" }} onChange={e => settodoImage(e.target.files[0])} />
                            </div>
                            <button className="bg-transparent hover:bg-orange-500 text-[1.5em] text-black font-bold hover:text-white py-2 px-4  hover:border-transparent rounded" type="submit"  >UPDATE</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default EditNote
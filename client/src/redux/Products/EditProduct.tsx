import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSignleProductQuery, useUpdateProductMutation } from './productApiSlice'
import axios from 'axios'
import { BsFileArrowUp } from 'react-icons/bs'

type ProductType = {
    _id: string,
    title: string,
    text: string,
    price: number,
    todoImage: string,
    category: string
}

const EditNote = () => {
    let { id } = useParams()
    // console.log(typeof id)

    const note = useGetSignleProductQuery<ProductType>(id, {
        pollingInterval: 10000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    // console.log(note)
    const [text, setTodo] = useState('');
    const [title, setTodoTitle] = useState("");
    const [category, setTodoCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [productImage, setProductImage] = useState<File | undefined>();
    const [previewImage, setPreviewImage] = useState<ArrayBuffer | string | null | undefined>();

    let navigate = useNavigate()

    const [updatedRecepi, result] = useUpdateProductMutation()

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
        todoImage: productImage == null ? note.todoImage : [],
        category,
        price
    }

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLElement & {
            files: FileList
        }
        setProductImage(target.files[0])

        const file = new FileReader

        file.onload = function () {
            setPreviewImage(file.result)
        }

        file.readAsDataURL(target.files[0])

    }

    // console.log("todo image ", todoImage)

    const fetchTodos = async () => {
        // e.preventDefault()
        if (productImage !== undefined) {

            const data = new FormData()
            data.append("file", productImage)
            data.append('upload_preset', "foodordering");

            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/tsmichov/image/upload", data)

                const secure_ulr = res.data.secure_url

                initialNote.todoImage = secure_ulr
            } catch (error) {
                console.log(error)
            }
        }

        // console.log("Todo image ",todoImage)
        // console.log( "Text props title ",title)
        // console.log( "Text props text: ",text)

        if (text !== null && title !== null && category !== null && price !== null) {
            try {
                console.log(productImage)
                console.log("Text props title ", title)
                console.log("Text props text: ", text)
                //    const updteP= await updatedRecepi({ initialNote });
                //    console.log(updteP)
                // if (isSuccess) {
                //     navigate('/admin')
                // }
            } catch (error) {
                console.log(error)
            }
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
                                    <input type="radio" id="Technology" name="Radio1" checked={category == "Salad" ? true : false} onChange={() => setTodoCategory('Salad')} />
                                    <label htmlFor="Technology" className='pt-2 text-teal-900 font-bold text-[1.5em]'>Salad</label>
                                </div>
                                <div className='flex flex-row '>
                                    <input className='w-[4em] border-orange-700 border-1' type="number" id="price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
                                    <label htmlFor="price" className='p-2 text-teal-900 font-bold text-[1.5em] '>Update Price</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className='flex flex-col w-[10em] gap-4 ml-5 md:ml-10  '>
                        <div className='flex flex-col  h-1/2 border border-1 border-orange-300 w-[20em] pb-10'>
                            {/* <img className='w-full h-full ' src={note.todoImage ? URL.createObjectURL(PF+todoImage) : DefautrPic} alt="" /> */}
                            {/* <img className='w-full h-[20em] ' src={productImage !== null ? URL.createObjectURL(productImage) : note.todoImage} alt="" /> */}
                            <img className='w-full h-[20em] ' src={previewImage as string | undefined} alt="" />
                            <div className='flex flex-row gap-5'>
                                <span className='text-[1.5em]  text-black font-bold mt-3 capitalize'>Upload</span>
                                <label htmlFor="file" className='text-[2em] animate-pulse mt-3 '> <BsFileArrowUp /></label>   {/* The image that's gettign the input*/}
                                <input type="file" id='file' style={{ display: "none" }} onChange={handleOnChange} />
                            </div>
                            <button className="bg-transparent hover:bg-orange-500 text-[1.5em] text-black font-bold hover:text-white py-2 px-4  hover:border-transparent rounded" type='submit' >UPDATE</button>
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
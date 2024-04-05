import { useDeleteProductMutation, useGetAllProductsQuery } from "./productApiSlice"
import { useNavigate } from "react-router-dom"


type ProductType = {
    _id:number,
    title: string,
    text: string,
    price: number,
    todoImage: string,
    category: string
}

const NotesList = () => {
    const {
        data: products,
        isLoading,
        isSuccess,
    } = useGetAllProductsQuery('notesList', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let content

    const navigate = useNavigate()

    const [deleteNote] = useDeleteProductMutation()

    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNote({ id }).unwrap();

        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (id: number) => navigate(`/admin/edit/${id}`)

    if (isLoading) content = <p>Loading...</p>


    if (isSuccess) {

        content = (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="mx-2">
                            <th scope="col" className="px-3 py-3 ">
                                Image
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-3 py-3 ">
                                Description
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item:ProductType, index: number) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-3 py-4">
                                        <img className="min-w-[12em] max-w-[12em] h-[12em] object-cover  rounded-md border-1 border-teal-900" src={item.todoImage} alt="" />
                                    </td>
                                    <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                    </td>
                                    <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                        <p className="max-w-[20em]  ">{item.text}</p>
                                    </td>
                                    <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.category}
                                    </td>
                                    <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.price}
                                    </td>
                                    <td className="px-3 py-4">
                                        <button onClick={() => handleDeleteNote(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                    </td>
                                    <td className="px-3 py-4">
                                        <button onClick={() => handleEdit(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Update</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        )
    }

    return content
}
export default NotesList
import { useDeleteNoteMutation } from './orderApiSlice'
import { memo } from 'react'
const Order = ({ orderId }) => {

  // const note = useSelector((state) => selectNoteById(state, noteId))

  const { note } = ("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[orderId]
    }),
  })

  const [deleteNote, { isSuccess }] = useDeleteNoteMutation()

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote({id}).unwrap();
    } catch (err) {
      console.log(err)
    }
  }
  // const navigate = useNavigate()

  const PF = "https://foodordering-api-1q9i.onrender.com/images/";

  if (note) {
   
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td >
          <img className="w-[6em] h-[5em] md:w-[5em] cover rounded-md border-1 border-teal-900" src={PF + note.todoImage} alt="" />
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.title}
        </td>
        <td className="px-3 py-4 w-[2em] font-semibold text-gray-900 dark:text-white">
          {note.text}
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.category}
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.price}
        </td>
        <td className="px-3 py-4">
          <button onClick={()=>handleDeleteNote(note.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
        <td className="px-3 py-4">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Update</a>
        </td>
      </tr>
    )

  } else return null
}

const memoizedNote = memo(Order)

export default memoizedNote
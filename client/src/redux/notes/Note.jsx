import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectNoteById, useDeleteNoteMutation } from './noteApiSlice'
import { useGetNotesQuery } from './noteApiSlice'
import axios from 'axios'
import { memo } from 'react'
const Note = ({ noteId }) => {

  // const note = useSelector((state) => selectNoteById(state, noteId))

  const navigate=useNavigate()

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId]
    }),
  })

  const [deleteNote, { isSuccess }] = useDeleteNoteMutation()

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote({ id }).unwrap();
    } catch (err) {
      console.log(err)
    }
  }

  // const navigate = useNavigate()

  const PF = "https://foodordering-api-1q9i.onrender.com/images/";

  if (note) {
    // const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    // const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

     const handleEdit = (id) => navigate(`/admin/edit/${id}`)

    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-3 py-4">
          <img className="w-full h-[10em] md:w-[10em] cover rounded-md border-1 border-teal-900" src={PF + note.todoImage} alt="" />
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.title}
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          <p className="max-w-[20em]  ">{note.text}</p>
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.category}
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {note.price}
        </td>
        <td className="px-3 py-4">
          <button onClick={() => handleDeleteNote(note.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
        <td className="px-3 py-4">
          <button onClick={()=>handleEdit(note.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Update</button>
        </td>
      </tr>
    )

  } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote
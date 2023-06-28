import { useGetNotesQuery } from "./noteApiSlice"
import Note from "./Note"

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId =>
                <tbody key={noteId}>
                <Note noteId={noteId} key={noteId}/>
                </tbody>
           )
            :null

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
                    {tableContent}
                </table>
            </div>
        )
    }

    return content
}
export default NotesList
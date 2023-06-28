import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "./userApiSlice"

const UserList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [updateUser, { Success }] = useUpdateUserMutation()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
    const handleUpdateUsers = async (id) => {

        try {
            await updateUser({ id }).unwrap();
        } catch (err) {
            console.log(err)
        }
    }

    const [deleteUser, { isSuccessDel }] = useDeleteUserMutation()

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser({ id }).unwrap();
        } catch (err) {
            console.log(err)
        }
    }

    if (isSuccess) {
        let orders = users.map((item, index) => (
            <div className="m-5" key={index}>
              
                <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="mx-2">
                            <th scope="col" className="px-3 py-3 ">
                                ID
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                            {
                                item.role === "Customer" ?
                                    <th scope="col" className="px-3 py-3">
                                        Action
                                    </th> : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {item._id}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <p className="max-w-[10em]">{item.name}</p>
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.email}
                            </td>
                            <td className={item.status === 'in-progress' ? "px-3 py-4 font-semibold text-red-500 dark:text-white" : "px-3 py-4 font-semibold text-green-500 dark:text-white"}>
                                {item.role}
                            </td>
                            <td className="px-3 py-4">
                                <button onClick={() => handleDeleteUser(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                            </td>
                            {
                                item.role === "Customer" ?
                                <td className="px-3 py-4">
                                <button onClick={() => handleUpdateUsers(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Update</button>
                            </td> : null
                            }
                          

                        </tr>
                    </tbody>
                </table>
            </div>
        ))
        content = orders
        //console.log(users)
    }

    return content
}
export default UserList
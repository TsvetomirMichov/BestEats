import { useGetOrdersQuery, useUpdateOrderMutation } from "./orderApiSlice"

const OrdersList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrdersQuery('ordersList', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [updatedOrder, { Success }] = useUpdateOrderMutation()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    const PF = "https://foodordering-api-1q9i.onrender.com/images/";

    const updateOrderState = async (id)=>{
     
      try{
       await updatedOrder({id}).unwrap();
      }catch(err){
        console.log(err)
      }
    }

    if (isSuccess) {
        let orders = notes.map((item, index) => (
            <div className="m-5" key={index}>
                <div className="flex justify-between p-2">
                <p key={index} className="text-xl font-semibold">Order ID - {item._id}</p>
                <button onClick={()=>updateOrderState(item._id)}  className="text-lg p-2 bg-black text-white rounded-md">Deliver now</button>
                </div>
                <div>
                    {item.orderDetails.map((order, index) => (
                        <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="mx-2">
                                    <th scope="col" className="px-3 py-3 ">
                                        Image
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                    Quantity
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                    Phone
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                    Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-3 py-4">
                                    <img className="w-full h-[10em] md:w-[10em] cover rounded-md border-1 border-teal-900" src={PF + order.img} alt="" />
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {order.title}
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <p className="max-w-[10em]">{order.price}</p>
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {order.quantity}
                                </td>
                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {order.phone}
                                </td>
                                <td className={item.status === 'in-progress' ? "px-3 py-4 font-semibold text-red-500 dark:text-white" : "px-3 py-4 font-semibold text-green-500 dark:text-white"}>
                                    {item.status }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        ))
        content = orders
        //console.log(notes)
    }

    return content
}
export default OrdersList
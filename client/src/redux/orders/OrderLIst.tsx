import { useGetOrdersQuery, useUpdateOrderMutation } from "./orderApiSlice";

type OrderType = {
    desc: string,
    id: string,
    img: string,
    price: number,
    quantity: number,
    title: string
}


type OrderDetailsType = {
    orderDetails: [OrderType],
    _id: number,
    userName: string,
    email: string,
    role: string,
    status: string,
    phone: string
}

const OrdersList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
    } = useGetOrdersQuery("ordersList", {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [updatedOrder] = useUpdateOrderMutation();

    let content;

    if (isLoading) content = <p>Loading...</p>;


    const updateOrderState = async (id: number) => {
        try {
            await updatedOrder({ id }).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    if (isSuccess) {
        let orders = notes.map((item: OrderDetailsType, index: number) => (
            <div className="m-5 overflow-x-auto " key={index}>
                <div className="flex justify-between p-2">
                    <p key={index} className="text-xl font-semibold">
                        Order ID - {item._id}
                    </p>
                    <button
                        onClick={() => updateOrderState(item._id)}
                        className="text-lg p-2 bg-black text-white rounded-md"
                    >
                        Deliver now
                    </button>
                </div>
                <div>
                    {item.orderDetails.map((order: OrderType, index: number) => (
                        <div key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2">
                                    <table className="w-full">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="mx-2">
                                                <th scope="col" className="px-3 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-3 py-4">
                                                    <img className=" min-w-[10em] h-[10em] md:w-[10em] cover rounded-md border-1 border-teal-900" src={order.img} alt="" />
                                                </td>
                                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {order.title}
                                                </td>
                                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                                    <p className="max-w-[10em]">{order.price}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <table className="w-full">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="mx-2">
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
                                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {order.quantity}
                                                </td>
                                                <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.phone ? item.phone : "no phone available"}
                                                </td>
                                                <td className={item.status === "in-progress" ? "px-3 py-4 font-semibold text-red-500 dark:text-white" : "px-3 py-4 font-semibold text-green-500 dark:text-white"}>
                                                    {item.status}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
        content = orders;
        //console.log(notes)
    }

    return content;
};

export default OrdersList;
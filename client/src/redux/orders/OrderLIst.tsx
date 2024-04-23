import { useState } from "react";
import { useGetOrdersQuery, useUpdateOrderMutation } from "./orderApiSlice";
import PaginationItems from '@mui/material/Pagination';

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
        data: orders,
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

    // Pagination states
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const ITEMS_PER_PAGE = 5;  // number of items to show per page

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Pagination states


    if (isSuccess) {
        let ordersTableData = orders.slice(startIndex, endIndex).map((item: OrderDetailsType, index: number) => (
            <div className="m-5 overflow-x-auto " key={index}>
                <div className="flex justify-between p-2">
                    <div className="flex flex-row gap-5 items-center ">
                        <p key={index} className="text-md font-semibold">
                            Order ID - {item._id}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Created At: {new Date(item.date).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-row gap-5 items-center ">
                        <p key={index} className="text-md font-semibold capitalize">
                            Deliver To- {item.userName}
                        </p>
                        <button
                            onClick={() => updateOrderState(item._id)}
                            className="text-lg p-2 bg-black text-white rounded-md"
                        >
                            Deliver now
                        </button>

                    </div>
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
                                                    <img className=" w-[15em] h-[10em] object-cover rounded-md border-1 border-teal-900" src={order.img} alt="" />
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
        content = ordersTableData;
        //console.log(orders)
    }

    return <div>
        {content}
        <PaginationItems count={Math.ceil(orders?.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChange} />
    </div>;
};

export default OrdersList;

